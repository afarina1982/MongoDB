import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reporte_rango_monto' })
export class ReporteRangoMonto {
  @PrimaryColumn({ name: 'categoria' })
  public categoria: string;

  @PrimaryColumn({ name: 'rango_monto' })
  public rangoMonto: string;

  @Column({ name: 'cantidad_transacciones' })
  public cantidadTransacciones: number;
}
