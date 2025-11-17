import { env } from "./config";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

function sanitizeMetadata(
  metadata: Record<string, any>,
): Record<string, string | number | boolean | string[]> {
  const sanitized: Record<string, string | number | boolean | string[]> = {};

  for (const [key, value] of Object.entries(metadata)) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      (Array.isArray(value) && value.every((v) => typeof v === "string"))
    ) {
      sanitized[key] = value;
    }
    if (key === "loc" && value?.lines) {
      sanitized["lineFrom"] = value.lines.from;
      sanitized["lineTo"] = value.lines.to;
    }
  }

  return sanitized;
}

export async function embedAndStoreDocs(
  client: Pinecone,

  // @ts-ignore
  docs: Document<Record<string, any>>[],
  nameSpace?: string,
) {
  try {
    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-3-small",
      openAIApiKey: process.env.OPENAI_API_KEY,
      batchSize: 128,
      maxConcurrency: 5,
    });
    const index = client.index(env.PINECONE_INDEX_NAME);

    console.log("[vector-store] Embedding documents", {
      docCount: docs.length,
      indexName: env.PINECONE_INDEX_NAME,
      namespace: nameSpace,
    });

    const vectors = await embeddings.embedDocuments(
      docs.map((doc) => doc.pageContent),
    );

    console.log("[vector-store] Embeddings created", {
      vectorCount: vectors.length,
    });

    const records = docs.map((doc, i) => ({
      id: `doc-${i}`,
      values: vectors[i],
      metadata: sanitizeMetadata(doc.metadata || {}),
    }));

    console.log("[vector-store] Upserting records into Pinecone", {
      recordCount: records.length,
      namespace: nameSpace,
    });

    await index.namespace(nameSpace!).upsert(records);

    console.log("[vector-store] Upsert complete", {
      recordCount: records.length,
      namespace: nameSpace,
    });
  } catch (error) {
    console.error("[vector-store] Failed to embed and store docs", error);
    throw new Error("Failed to load your docs!");
  }
}

export const courseChoices = ["", ""];

export async function getVectorStore(client: Pinecone, nameSpace: string) {
  try {
    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-3-small",
      openAIApiKey: process.env.OPENAI_API_KEY,
      batchSize: 128,
      maxConcurrency: 5,
    });
    const index = client.index(env.PINECONE_INDEX_NAME);
    console.log("[vector-store] Getting vector store", {
      indexName: env.PINECONE_INDEX_NAME,
      namespace: nameSpace,
    });
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
      namespace: nameSpace,
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}
