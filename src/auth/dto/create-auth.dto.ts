import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsString, Matches, MinLength } from "class-validator"

export class CreateAuthDto {

  @ApiProperty({ example: 'Valdiano Rocha', description: 'Nome completo do estudante' })
  @IsString()
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({ example: '+55 11 91234-5678', description: 'Número de telefone com DDD' })
  @IsString()
  @Matches(/^\+?[0-9\s\-()]{8,20}$/, { message: 'Telefone inválido' })
  phone: string;

  @ApiProperty({ example: 'valdiano@email.com', description: 'E-mail válido do estudante' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha com pelo menos 6 caracteres, incluindo letra e número' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, { 
    message: 'A senha deve conter ao menos uma letra e um número' 
  })
  password: string;

  @ApiProperty({ example: '123.456.789-00', description: 'CPF válido' })
  @IsString()
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: 'CPF inválido' })
  cpf: string;

  @ApiProperty({ example: 'Travessa maria sinha de castro - amontada-Ce', description: 'Endereço completo' })
  @IsString()
  @MinLength(5, { message: 'Endereço muito curto' })
  address: string;

  @ApiProperty({ example: '2000-05-20', description: 'Data de nascimento no formato YYYY-MM-DD' })
  @IsDateString({}, { message: 'Data de nascimento inválida' })
  date_of_birth: string;

}

