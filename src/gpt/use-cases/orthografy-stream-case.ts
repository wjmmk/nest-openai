import OpenAI from "openai";


interface ProsConsOptions {
    prompt: string;
}

export const orthographyConsDiscusserStream = async (openai: OpenAI, options: ProsConsOptions): Promise<any> => {
    const { prompt } = options;
      const stream = await openai.chat.completions.create({ 
            stream: true, 
            model: 'gemini-2.5-flash',
            messages: [
               /* { role: 'system', content: 'You are a helpful assistant that translates English to Spanish.' }, */
                { role: 'user', content: prompt },
                { 
                  role: 'system', 
                  content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras, la respuesta debe de ser en formato markdown,
                           los pros y contras deben de estar en una lista` 
                },
            ],
            temperature: 0.3,
      });

      return stream || undefined;
 }