import { Column, Entity } from 'typeorm';

@Entity({name:'reporte_rango_monto'})
export class ReporteRangoMonto {
    @Column({name:'categoria'})
    public categoria: string;
    @Column({name:'rangoMonto'})
    public rangoMonto:number;
    @Column({name:'cantidadTransacciones'})
    public cantidadTransacciones:number;
}