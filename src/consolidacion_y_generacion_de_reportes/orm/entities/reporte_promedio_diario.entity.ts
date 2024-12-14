import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reporte_promedio_diario' })
export class ReportePromedioDiario {
  @PrimaryColumn({ name: 'rut_usuario' })
  public rut_usuario: string;

  @PrimaryColumn({ name: 'categoria' })
  public categoria: string;

  @Column({ name: 'promedio_diario' })
  public promedioDiario: number;
}
