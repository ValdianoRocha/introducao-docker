import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({ example: '8d85f29e-6cfb-4c0e-9313-1b3bb6ad6fa1', description: 'ID único do curso (UUID)' })
  id: string;

  @ApiProperty({ example: 'Curso de NestJS', description: 'Nome do curso' })
  name: string;

  @ApiPropertyOptional({ example: 'Curso completo de NestJS com práticas de mercado', description: 'Descrição do curso (opcional)' })
  descripton?: string;

  @ApiProperty({ example: 40, description: 'Carga horária do curso em horas' })
  workload: number;

  @ApiPropertyOptional({ example: 499, description: 'Preço do curso em reais (opcional)' })
  price?: number;

  @ApiProperty({ example: '2025-08-07T14:00:00.000Z', description: 'Data de criação do curso' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-07T15:30:00.000Z', description: 'Data da última atualização do curso' })
  updatedAt: Date;
}
