import { IsString } from "class-validator";

export class ResponseDto {
    @IsString()
    access_token: string
}