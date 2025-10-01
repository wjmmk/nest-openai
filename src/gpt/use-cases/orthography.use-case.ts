import { CreateGptDto } from "../dto/create-gpt.dto";


export const orthographyUseCase = ({ title }: CreateGptDto) => {
    return {  
        code: 200,
        message: `Developer in: ${title}`,
    };
}
    