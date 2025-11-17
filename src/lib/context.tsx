import { convertToAscii } from "./convertToascii";
import { getEmbeddings } from "./embeddings";
import { getPineconeClient } from "./pinecone-client";
import { env } from "./config";
export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string,
) {
  const pinecone = await getPineconeClient();

  const index = pinecone.index(env.PINECONE_INDEX_NAME);
  const namespace = convertToAscii(fileKey);

  try {
    console.log("[context] Querying Pinecone for matches", {
      indexName: env.PINECONE_INDEX_NAME,
      namespace,
    });
    const queryResult = await index.namespace(namespace).query({
      vector: embeddings,
      topK: 5,
      includeMetadata: true,
    });
    const matches = queryResult.matches ?? [];
    console.log("[context] Pinecone query result", {
      matchCount: matches.length,
      scores: matches.map((m) => m.score),
    });

    return matches;
  } catch (error) {
    console.error("[context] Error querying embeddings", error);
    throw new Error("Failed to get matches from Pinecone");
  }
}
export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const MIN_SCORE = 0.1;

  let qualifyingDocuments = matches.filter((match) => {
    const score = match.score ?? 0;
    return score >= MIN_SCORE;
  });

  if (qualifyingDocuments.length === 0 && matches.length > 0) {
    // Fallback: if nothing passes the threshold, use the top matches anyway
    qualifyingDocuments = matches.slice(0, 3);
    console.log("[context] No matches passed threshold, using top matches", {
      usedCount: qualifyingDocuments.length,
      scores: qualifyingDocuments.map((m) => m.score),
    });
  }

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  const docs = qualifyingDocuments
    .map((match) => {
      const metadata = match.metadata as Metadata | undefined;
      return metadata?.text ?? "";
    })
    .filter(Boolean);

  const context = docs.join("\n").substring(0, 3000);
  console.log("[context] Built context string", {
    qualifyingCount: qualifyingDocuments.length,
    contextLength: context.length,
  });

  return context;
}
