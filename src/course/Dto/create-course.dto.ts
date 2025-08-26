import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateCourseDto {

    @ApiProperty({ example: "Java", description: "Nome do curso!" })
    @IsString()
    name: string

    @ApiProperty({ example: "Só pra doido!", description: "Descrição do curso de desenvolvomento" })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({ example: 360, description: "quantidade de horas do curso!" })
    @IsNumber()
    @IsPositive()
    workload: number

    @ApiProperty({ example: 0, description: "valor do curso" })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    price: number
}