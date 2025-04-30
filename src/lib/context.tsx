import { convertToAscii } from "./convertToascii";
import { getEmbeddings } from "./embeddings";

import { Pinecone } from "@pinecone-database/pinecone";
export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string,
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.index("cosc405");
  const namespace = convertToAscii(fileKey);

  try {
    const queryResult = await index.namespace(namespace).query({
      vector: embeddings,
      topK: 5,
      includeMetadata: true,
    });

    return queryResult.matches ?? [];
  } catch (error) {
    console.error("Error querying embeddings:", error);
    throw new Error("Failed to get matches from Pinecone");
  }
}
export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  const qualifyingDocuments = matches.filter(
    (match) => match.score && match.score > 0.7,
  );
  type Metadata = {
    text: string;
    pageNumber: number;
  };
  let docs = qualifyingDocuments.map(
    (match) => (match.metadata as Metadata).text,
  );

  return docs.join("\n").substring(0, 3000);
}
