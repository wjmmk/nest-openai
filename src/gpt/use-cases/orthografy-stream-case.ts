import OpenAI from "openai";

interface ProsConsOptions {
    prompt: string;
}

export const orthographyConsDiscusserStream = async (openai: OpenAI, { prompt }: ProsConsOptions): Promise<any> => {
  const resp = await openai.chat.completions.create({
    stream: true,
    model: 'gemini-2.5-flash',
    messages: [
      { role: 'user', content: prompt },
      {
        role: 'system',
        content: ` Debes responder con mucha amabilidad y dependiendo del tono como te pregunten. Se te dará un enunciado y tu tarea es dar una respuesta
                   con pros y contras, los pros y contras deben de estar en una lista. Sé conciso y responde en no más de dos oraciones con la 
                   información esencial, evitando detalles superfluos. Al final responde por favor usando una lista de tres puntos clave.`
      },
    ],
    temperature: 0.5,
    max_tokens: 500,
  });

  return JSON.stringify(resp);
}
