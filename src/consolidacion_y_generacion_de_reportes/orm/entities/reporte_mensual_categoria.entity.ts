import { Column, Entity } from "typeorm";

@Entity({ name: 'reporte_mensual_categoria' })
export class ReporteMensualCategoria {
    @Column({name:'rut_usuario' })
    public rut_usuario: string;
    @Column({name:'mes' })
    public mes: number;
    @Column({name:'anio' })
    public anio: number;
    @Column({name:'categoria' })
    public categoria: string;
    @Column({name:'total_gasto' })
    public totalGasto: number;
}
