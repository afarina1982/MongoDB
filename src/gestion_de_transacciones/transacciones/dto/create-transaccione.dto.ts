import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNumber, IsString, IsIn, IsDateString, Min } from "class-validator";

export class CreateTransaccioneDto {
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
  @IsNumber()
  @Min(0, { message: 'El monto debe ser un número positivo.' })
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

  @ApiProperty({
    description: 'Fecha de la transacción en formato ISO (YYYY-MM-DD)',
    example: '2021-10-10',
  })
  @IsDateString({}, { message: 'La fecha debe estar en formato ISO (YYYY-MM-DD).' })
  fecha: string;

  @ApiProperty({
    description: 'Descripción de la transacción',
    example: 'compra de comida',
  })
  @IsString()
  descripcion: string;
}
