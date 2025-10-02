import OpenAI from "openai";

interface Options {
    prompt: string;
    title: string;
}

export const orthographyUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, title } = options;

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        max_tokens: 150,
        messages: [
            { role: 'system', content: 'Eres un asistente que ayuda a los desarrolladores a crear código limpio y eficiente.' },
            { role: 'user', content: `Eres un desarrollador experto en ${title}. Crea un programa que ${prompt}` },
        ],
       /*  response_format: { type: 'text' }, */
        response_format: { type: 'json_object' },
    });

    console.log('Response LLMs:', completion.choices[0].message); 

    return {  
        code: 200,
        message: `Developer in: ${title} for ${prompt}`,
        apikey: process.env.OPENAI_API_KEY || 'No API Key found',
    };
}
    