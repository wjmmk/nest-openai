export class CreateGptDto {
    readonly title?: string | null | undefined;
    readonly prompt: string;
    readonly max_tokens?: number;
    readonly temperature?: number;
}
