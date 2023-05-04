import { addVector } from "./db";
import { createEmbedding } from "./openai";

export async function createVector(name: string, body: string): Promise<number[]> {
    const embeddingInput = `${name} ${body}`;
    const vector = await createEmbedding(embeddingInput);

    const id = await addVector(name, body);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Api-Key': process.env.PINECONE_KEY,
        },
        body: JSON.stringify({
            vectors: [{
                id,
                vector,
                metadata: {},
            }],
            namespace: "",
        })

    };

    const response = await fetch('https://catalog-aff3af1.svc.us-west1-gcp-free.pinecone.io/vectors/upsert', options);
    const parsedResponse = await response.json();

    console.log(response);
    console.log('****');
}
