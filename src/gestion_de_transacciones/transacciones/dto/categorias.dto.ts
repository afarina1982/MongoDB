import { IsString, IsIn } from 'class-validator';

export class CategoriaParamDto {
  @IsString()
  @IsIn([
    'comida',
    'ropa',
    'tecnologia',
    'salud',
    'educacion',
    'transporte',
    'entretenimiento',
    'servicios',
    'otros',
  ], { message: 'La categoría debe ser uno de los valores permitidos.' })
  categoria: string;
}
