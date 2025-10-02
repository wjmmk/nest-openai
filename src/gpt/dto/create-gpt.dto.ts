import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGptDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsString()
    readonly prompt: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'max_tokens must be a number' })
    readonly max_tokens?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'temperature must be a number with at most 2 decimal places' })
    readonly temperature?: number;
}