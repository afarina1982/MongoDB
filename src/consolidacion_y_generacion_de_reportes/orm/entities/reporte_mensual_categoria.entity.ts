import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reporte_mensual_categoria' })
export class ReporteMensualCategoria {
  @PrimaryColumn({ name: 'rut_usuario' })
  public rut_usuario: string;

  @PrimaryColumn({ name: 'mes' })
  public mes: number;

  @PrimaryColumn({ name: 'anio' })
  public anio: number;

  @PrimaryColumn({ name: 'categoria' })
  public categoria: string;

  @Column({ name: 'total_gasto' })
  public totalGasto: number;
}
