

interface Options {
    prompt: string;
    title: string;
}

export const orthographyUseCase = (options: Options) => {
    const { prompt, title } = options;
    return {  
        code: 200,
        message: `Developer in: ${title} for ${prompt}`,
        apikey: process.env.OPENAI_API_KEY || 'No API Key found',
    };
}
    