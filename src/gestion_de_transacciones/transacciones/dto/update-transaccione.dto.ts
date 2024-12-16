import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn, Matches } from 'class-validator';

export class UpdateTransaccioneDto {
  @ApiProperty({
    description: 'Monto de la transacción',
    example: 10000,
  })
  @IsNumber({}, { message: 'El monto debe ser un número válido.' })
  monto: number;

  @ApiProperty({
    description: 'Categoría de la transacción',
    example: 'comida',
    enum: [
      'comida',
      'ropa',
      'tecnologia',
      'salud',
      'educacion',
      'transporte',
      'entretenimiento',
      'servicios',
      'otros',
    ],
  })
  @IsString({ message: 'La categoría debe ser un texto válido.' })
  @IsIn(
    [
      'comida',
      'ropa',
      'tecnologia',
      'salud',
      'educacion',
      'transporte',
      'entretenimiento',
      'servicios',
      'otros',
    ],
    { message: 'La categoría debe ser uno de los valores permitidos.' },
  )
  categoria: string;

  @ApiProperty({
    description: 'Fecha de la transacción (formato YYYY-MM-DD)',
    example: '2021-10-10',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe estar en el formato YYYY-MM-DD.',
  })
  fecha: string;

  @ApiProperty({
    description: 'Descripción de la transacción',
    example: 'compra de comida',
  })
  @IsString({ message: 'La descripción debe ser un texto válido.' })
  descripcion: string;
}
