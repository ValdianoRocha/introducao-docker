import { IsNumber, IsOptional, IsString } from "class-validator"

export class courseDto {

    @IsString()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    workload: number

    @IsNumber()
    @IsOptional()
    price: number
}