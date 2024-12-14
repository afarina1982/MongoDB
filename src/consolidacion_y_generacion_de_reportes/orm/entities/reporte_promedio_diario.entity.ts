import { Column, Entity } from 'typeorm';

@Entity({name:'reporte_promedio_diario'})
export class ReportePromedioDiario {
    @Column({name:'usuarioid'})
    public usuarioId: number;
    @Column({name:'promedioDiario'})
    public promedioDiario: number;
    @Column({name:'categoria'})
    public categoria: string;
}
