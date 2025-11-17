import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  if (!text || text.trim().length === 0) {
    throw new Error("No text provided for embeddings");
  }

  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-3-small", // <-- Updated model
      input: text.replace(/\n/g, " "),
    });

    const result = await response.json();

    if (!result?.data?.[0]?.embedding) {
      console.error("Embedding API did not return data:", result);
      throw new Error("No embedding returned from Embeddings API");
    }

    return result.data[0].embedding as number[];
  } catch (error) {
    console.error("Error calling embeddings API:", error);
    throw error;
  }
}
