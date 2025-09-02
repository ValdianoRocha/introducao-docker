import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";



export class loginDto {

    @ApiProperty({ example: 'valdiano@email.com', description: 'E-mail válido do estudante' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'Senha@123', description: 'Senha com pelo menos 6 caracteres, incluindo letra e número' })
    @IsString()
    password: string
}
