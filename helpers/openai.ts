export async function createEmbedding(text: string): Promise<number[]> {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
        },
        body: JSON.stringify({
            input: [text],
            model: 'text-embedding-ada-002',
        })
    };

    console.log('called');
    console.log(process.env.OPENAI_KEY);

    const response = await fetch('https://api.openai.com/v1/embeddings', options);
    const parsedResponse = await response.json();

    return parsedResponse.data[0].embedding;
}
