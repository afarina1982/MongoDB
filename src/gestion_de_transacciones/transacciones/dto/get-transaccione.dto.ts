import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsIn, Matches, IsNumber } from 'class-validator';

export class GetTransaccioneDto {
  @IsUUID('4', { message: 'El ID debe ser un UUID válido (v4).' })
  @ApiProperty({
    description: 'Identificador único en formato UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id_transaccion: string;

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

  @ApiProperty({
    description: 'RUT del usuario en formato 11.111.111-1',
    example: '12.345.678-9',
  })
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}\-\d{1}$/, {
    message: 'El formato del RUT debe ser xx.xxx.xxx-x.',
  })
  rut_usuario: string;
}
