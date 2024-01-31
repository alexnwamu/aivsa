import { PineconeClient } from "@pinecone-database/pinecone";
import { convertToAscii } from "./convertToascii";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string,
) {
  const pinecone = new PineconeClient();

  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index('cosc405');
  try {
    const namespace = convertToAscii(fileKey);
    const queryResult = await index.query({
      queryRequest: {
        topK: 5,
        vector: embeddings,
        includeMetadata: true,
        namespace,
      },
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("error quering embeddings", error);
    throw error;
  }
}
export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
    const qualifyingDocuments = matches.filter(
(match)=> match.score && match.score >0.7

    )
type Metadata = {
        text: string;
        pageNumber : number

    }
    let docs = qualifyingDocuments.map((match)=> (match.metadata as Metadata).text)

    return docs.join('\n').substring(0,3000)
}
