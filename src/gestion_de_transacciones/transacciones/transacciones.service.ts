import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaccion } from 'src/gestion_de_transacciones/odm/schema/transacciones.schema';
import { TransaccionMapper } from './mapper/transacciones.mapper';
import { GetTransaccioneDto } from './dto/get-transaccione.dto';
import { BulkTransaccionDto } from './dto/bulk-transaccione.dto';
import { NotFoundException } from '@nestjs/common';
import { FilterTransaccionesDto } from './dto/filterTransacciones.dto';
import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteMensualCategoria } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_mensual_categoria.entity';
import { Repository } from 'typeorm';
import { ReporteRangoMonto } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_rango_monto.entity';
import { ReportePromedioDiario } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_promedio_diario.entity';




@Injectable()
export class TransaccionesService {

  constructor(
    @InjectModel(Transaccion.name) private readonly transaccionModel: Model<Transaccion>,
    @InjectRepository(ReportePromedioDiario)
    private readonly reportePromedioDiarioRepository: Repository<ReportePromedioDiario>,
    @InjectRepository(ReporteRangoMonto)
    private readonly reporteRangoMontoRepository: Repository<ReporteRangoMonto>,
    @InjectRepository(ReporteMensualCategoria)
    private reporteMensualCategoriaRepository: Repository<ReporteMensualCategoria>,
  ) { }
  //================================================================================================
  async generarReporteMensual(rut_usuario: string): Promise<any[]> {
    const reporteMongo = await this.transaccionModel.aggregate([
      {
        $addFields: {
          fecha: { $toDate: "$fecha" },
          month: { $month: { date: { $toDate: "$fecha" }, timezone: "America/Santiago" } },
          year: { $year: { date: { $toDate: "$fecha" }, timezone: "America/Santiago" } }
        }
      },
      {
        $group: {
          _id: { categoria: "$categoria", month: "$month", year: "$year", rut_usuario: "$rut_usuario" },
          total_gasto: { $sum: "$monto" }
        }
      },
      {
        $project: {
          categoria: "$_id.categoria",
          mes: "$_id.month",
          anio: "$_id.year",  // Asegúrate de incluir 'anio'
          rut_usuario: "$_id.rut_usuario",
          total_gasto: 1,
          _id: 0
        }
      }
    ]);

    // Filtrar por rut_usuario
    const reporteFiltrado = reporteMongo.filter(
      (registro) => registro.rut_usuario === rut_usuario,
    );

    // Insertar los resultados en la base de datos MySQL
    await this.reporteMensualCategoriaRepository.save(
      reporteFiltrado.map((registro) => ({
        rut_usuario: registro.rut_usuario,
        mes: registro.mes,
        anio: registro.anio,  // Asegúrate de que 'anio' esté presente
        categoria: registro.categoria,
        totalGasto: registro.total_gasto
      })),
    );

    // Consulta los reportes insertados, ordenados por año, mes y total_gasto
    const reporteOrdenado = await this.reporteMensualCategoriaRepository.find({
      where: { rut_usuario },
      order: {
        anio: 'DESC', // Ordenar por año (más reciente primero)
        mes: 'DESC',  // Ordenar por mes (más reciente primero)
        totalGasto: 'DESC' // Ordenar por gasto total (mayores primero)
      }
    });

    return reporteOrdenado; // Devuelve los reportes ordenados
  }
  //================================================================================================
  async create(rut_usuario: string, createTransaccioneDto: CreateTransaccioneDto): Promise<GetTransaccioneDto> {
    const transaccion: Transaccion = TransaccionMapper.dtoToSchema(createTransaccioneDto, rut_usuario);
    const transaccionGuardado: Transaccion = await this.transaccionModel.create(transaccion);
    return TransaccionMapper.schemaToDto(transaccionGuardado);
  }

  //================================================================================================
  async registrarTransacciones(rut_usuario: string, bulkTransaccionDto: BulkTransaccionDto) {
    const { transacciones } = bulkTransaccionDto;

    // Añadimos el rut_usuario a cada transacción
    const transaccionesConUsuario = transacciones.map((transaccion) => ({
      ...transaccion,
      rut_usuario, // Añadimos el rut_usuario a cada transacción
    }));

    console.log('Transacciones con rut añadido:', transaccionesConUsuario);

    try {
      // Guardamos las transacciones en la base de datos
      const resultado = await this.transaccionModel.insertMany(transaccionesConUsuario);
      return resultado;
    } catch (error) {
      // Si ocurre un error, lanzamos una excepción
      throw new Error(`Error al registrar transacciones: ${error.message}`);
    }
  }

  //================================================================================================

  async update(id_transaccion: string, updateTransaccioneDto: UpdateTransaccioneDto, rut_usuario: string): Promise<Transaccion> {
    // Verificar si el RUT existe en alguna transacción
    const rutExists = await this.transaccionModel.exists({ rut_usuario });  // Busca si existe el RUT
    if (!rutExists) {
      // Si no existe el RUT, lanzamos un error 404
      throw new NotFoundException(`No existe transacción con el RUT ${rut_usuario}`);
    }

    // Buscar la transacción por ID
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion }) // Busca la transacción por su ID
      .exec();

    if (!transaccion) {
      // Si no se encuentra la transacción, lanzamos un error 404
      throw new NotFoundException(`No se encontró una transacción con el ID ${id_transaccion} para ese rut`);
    }

    // Verificar si el RUT coincide con el RUT de la transacción
    if (transaccion.rut_usuario !== rut_usuario) {
      // Si el RUT no coincide, lanzamos un error 403
      throw new ForbiddenException('No se puede actualizar la transacción porque no corresponde al RUT del usuario');
    }

    // Actualizamos los campos si están presentes en el DTO
    if (updateTransaccioneDto.monto !== undefined) {
      transaccion.monto = updateTransaccioneDto.monto;
    }
    if (updateTransaccioneDto.fecha !== undefined) {
      transaccion.fecha = updateTransaccioneDto.fecha;
    }
    if (updateTransaccioneDto.categoria !== undefined) {
      transaccion.categoria = updateTransaccioneDto.categoria;
    }
    if (updateTransaccioneDto.descripcion !== undefined) {
      transaccion.descripcion = updateTransaccioneDto.descripcion;
    }

    // Guardamos la transacción actualizada en la base de datos
    const transaccionActualizada = await transaccion.save();
    return transaccionActualizada;  // Retornamos la transacción actualizada

  }

  //================================================================================================

  async delete(id_transaccion: string, rut_usuario: string): Promise<void> {
    // Busca la transacción por el ID
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion }) // Busca la transacción por su ID
      .exec();

    // Si la transacción no existe, lanza un NotFoundException
    if (!transaccion) {
      throw new NotFoundException(
        `No se encontró una transacción con el ID ${id_transaccion}`,
      );
    }

    // Verifica si el rut_usuario coincide con el rut de la transacción
    if (transaccion.rut_usuario !== rut_usuario) {
      throw new ForbiddenException(
        'No se puede eliminar la transacción porque no corresponde al RUT proporcionado.',
      );
    }

    // Elimina la transacción
    await this.transaccionModel.deleteOne({ id_transaccion }).exec();
  }

  //================================================================================================

  async obtenerTransaccionesConFiltros(filtros: FilterTransaccionesDto): Promise<Transaccion[]> {
    const query: any = {};

    // Aseguramos que el rut_usuario esté en los filtros
    if (filtros.rut_usuario) {
      query.rut_usuario = filtros.rut_usuario; // Filtro por rut_usuario
    }

    // Otros filtros
    if (filtros.categoria) {
      query.categoria = filtros.categoria;
    }
    if (filtros.montoMayorA) {
      query.monto = { ...query.monto, $gte: filtros.montoMayorA };
    }
    if (filtros.montoMenorA) {
      query.monto = { ...query.monto, $lte: filtros.montoMenorA };
    }
    if (filtros.fechaMayorA) {
      query.fecha = { ...query.fecha, $gte: filtros.fechaMayorA };
    }
    if (filtros.fechaMenorA) {
      query.fecha = { ...query.fecha, $lte: filtros.fechaMenorA };
    }

    // Verificar la consulta antes de ejecutarla
    console.log('Consulta generada:', query);

    // Realizamos la consulta a la base de datos
    return this.transaccionModel.find(query).exec();
  }
  //falta vadidar formato rut
  //================================================================================================
  async sincronizarReporteMensual(rut_usuario: string): Promise<void> {
    const reporteMongo = await this.transaccionModel.aggregate([
      {
        $addFields: {
          fecha: { $toDate: "$fecha" },
          month: { $month: { date: { $toDate: "$fecha" }, timezone: "America/Santiago" } },
          year: { $year: { date: { $toDate: "$fecha" }, timezone: "America/Santiago" } }
        }
      },
      {
        $group: {
          _id: { categoria: "$categoria", month: "$month", year: "$year", rut_usuario: "$rut_usuario" },
          total_gasto: { $sum: "$monto" }
        }
      },
      {
        $project: {
          categoria: "$_id.categoria",
          mes: "$_id.month",
          anio: "$_id.year",
          rut_usuario: "$_id.rut_usuario",
          total_gasto: 1,
          _id: 0
        }
      }
    ]);

    const reporteFiltrado = reporteMongo.filter(
      (registro) => registro.rut_usuario === rut_usuario,
    );

    await this.reporteMensualCategoriaRepository.delete({ rut_usuario });

    await this.reporteMensualCategoriaRepository.save(
      reporteFiltrado.map((registro) => ({
        rut_usuario: registro.rut_usuario,
        mes: registro.mes,
        anio: registro.anio,
        categoria: registro.categoria,
        totalGasto: registro.total_gasto
      })),
    );
  }
  //================================================================================================
  async getReportePorRangoMonto(categoria: string) {
    const pipeline = [
      {
        $match: { categoria },
      },
      {
        $bucket: {
          groupBy: '$monto',
          boundaries: [0, 5000, 30000, 100000, 500000, Infinity],
          default: 'Otros',
          output: {
            cantidad_transacciones: { $sum: 1 },
          },
        },
      },
      {
        $addFields: {
          categoria,
          rango_monto: {
            $switch: {
              branches: [
                { case: { $lt: ['$_id', 5000] }, then: '0-5.000' },
                { case: { $and: [{ $gte: ['$_id', 5000] }, { $lt: ['$_id', 30000] }] }, then: '5.001-30.000' },
                { case: { $and: [{ $gte: ['$_id', 30000] }, { $lt: ['$_id', 100000] }] }, then: '30.001-100.000' },
                { case: { $and: [{ $gte: ['$_id', 100000] }, { $lt: ['$_id', 500000] }] }, then: '100.001-500.000' },
                { case: { $gte: ['$_id', 500000] }, then: '>500.001' },
              ],
              default: 'Otros',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          categoria: 1,
          rango_monto: 1,
          cantidad_transacciones: 1,
        },
      },
    ];

    // Obtener resultados desde MongoDB
    const resultados = await this.transaccionModel.aggregate(pipeline).exec();

    // Guardar los resultados en MySQL
    for (const resultado of resultados) {
      const reporte = this.reporteRangoMontoRepository.create({
        categoria: resultado.categoria,
        rangoMonto: resultado.rango_monto,
        cantidadTransacciones: resultado.cantidad_transacciones,
      });

      await this.reporteRangoMontoRepository.save(reporte);
    }

    // Opcional: Devolver los resultados almacenados
    return resultados;
  }
  //================================================================================================
  async sincronizarReporteRangoMonto(): Promise<void> {
    // Obtener todas las transacciones desde MongoDB
    const transacciones = await this.transaccionModel.find().exec();
    const reportes: { categoria: string; rangoMonto: string; cantidadTransacciones: number }[] = [];
  
    const rangos = [
      { rango: '0-5.000', min: 0, max: 5000 },
      { rango: '5.001-30.000', min: 5001, max: 30000 },
      { rango: '30.001-100.000', min: 30001, max: 100000 },
      { rango: '100.001-500.000', min: 100001, max: 500000 },
      { rango: '>500.001', min: 500001, max: Infinity },
    ];
  
    // Obtener las categorías únicas de las transacciones
    const categorias = [...new Set(transacciones.map(t => t.categoria))];
  
    // Calcular la cantidad de transacciones por categoría y rango de monto
    for (const categoria of categorias) {
      for (const rango of rangos) {
        const cantidadTransacciones = transacciones.reduce((count, transaccion) => {
          if (
            transaccion.categoria === categoria &&
            transaccion.monto >= rango.min &&
            transaccion.monto <= rango.max
          ) {
            count++;
          }
          return count;
        }, 0);
  
        // Solo agregar el reporte si hay transacciones en ese rango y categoría
        if (cantidadTransacciones > 0) {
          reportes.push({
            categoria,
            rangoMonto: rango.rango,
            cantidadTransacciones,
          });
        }
      }
    }
  
    // Eliminar los datos previos de la tabla (en MySQL)
    await this.reporteRangoMontoRepository.clear();
  
    // Insertar los nuevos reportes en la tabla (en MySQL)
    for (const reporte of reportes) {
      await this.reporteRangoMontoRepository.save(reporte);
    }
  }
  //================================================================================================
  async getPromedioDiario(categoria: string) {
    const result = await this.transaccionModel.aggregate([
      { $match: { categoria: categoria } },
      {
        $group: {
          _id: { rut_usuario: '$rut_usuario', fecha: { $substr: ['$fecha', 0, 10] } },
          totalGasto: { $sum: '$monto' },
        },
      },
      {
        $group: {
          _id: '$_id.rut_usuario',
          totalGasto: { $sum: '$totalGasto' },
          dias: { $addToSet: '$_id.fecha' },
        },
      },
      {
        $project: {
          rut_usuario: '$_id',
          promedioDiario: {
            $cond: {
              if: { $eq: [{ $size: '$dias' }, 0] },
              then: 0,
              else: { $divide: ['$totalGasto', { $size: '$dias' }] },
            },
          },
        },
      },
      {
        $addFields: {
          categoria: categoria,
        },
      },
      { $sort: { rut_usuario: 1 } },
    ]);

    // Insertar los resultados en MySQL
    for (const item of result) {
      const reportePromedioDiario = new ReportePromedioDiario();
      reportePromedioDiario.rut_usuario = item.rut_usuario;
      reportePromedioDiario.categoria = item.categoria;
      reportePromedioDiario.promedioDiario = item.promedioDiario;

      // Guardar en la tabla de MySQL
      await this.reportePromedioDiarioRepository.save(reportePromedioDiario);
    }

    // Devolver los resultados
    return result.map(item => ({
      rut_usuario: item.rut_usuario,
      categoria: item.categoria,
      promedio_diario: item.promedioDiario,
    }));
  }
  
}
