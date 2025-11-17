import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getEmbeddings(text: string) {
  if (!text || text.trim().length === 0) {
    throw new Error("No text provided for embeddings");
  }

  try {
    console.log("[embeddings] getEmbeddings called", {
      textLength: text.length,
    });
    const result = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });

    if (!result?.data?.[0]?.embedding) {
      console.error("[embeddings] Embedding API did not return data", result);
      throw new Error("No embedding returned from Embeddings API");
    }

    return result.data[0].embedding as number[];
  } catch (error) {
    console.error("[embeddings] Error calling embeddings API", error);
    throw error;
  }
}
