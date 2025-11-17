import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import md5 from "md5";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./convertToascii";
import { embedAndStoreDocs } from "./vector-store";
import { getPineconeClient } from "./pinecone-client";

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. obtain the pdf -> download and read from pdf
  console.log("[pinecone] Starting loadS3IntoPinecone", { fileKey });
  console.log("[pinecone] Downloading from S3 to file system...");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    console.error("[pinecone] Could not download from S3", { fileKey });
    throw new Error("could not download from s3");
  }
  console.log("[pinecone] Downloaded file", { file_name });
  console.log("[pinecone] Loading PDF into memory...");

  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];
  console.log("[pinecone] PDF loaded", { pageCount: pages.length });
  // 2. split and segment the pdf
  console.log("[pinecone] Preparing documents (splitting into chunks)...");
  const documents = await prepareDocument(pages);
  console.log("[pinecone] Documents prepared", { docCount: documents.length });

  // 3. vectorise and embed individual documents

  // 4. upload to pinecone
  const client = await getPineconeClient();
  const namespace = convertToAscii(fileKey);
  console.log("[pinecone] Embedding and storing docs in Pinecone", {
    namespace,
    indexName: process.env.PINECONE_INDEX_NAME,
  });

  await embedAndStoreDocs(client, documents, namespace);

  console.log("[pinecone] Finished loadS3IntoPinecone", {
    fileKey,
    namespace,
    storedDocs: documents.length,
  });

  return documents[0];
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(pages: PDFPage[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.splitDocuments(pages);
  console.log("[pinecone] Split documents into chunks", {
    rawChunkCount: docs.length,
  });

  // Filter out extremely small/low-signal chunks to reduce embeddings work
  const filtered = docs.filter(
    (doc) => doc.pageContent && doc.pageContent.trim().length > 80,
  );

  console.log("[pinecone] Filtered chunks", { filteredCount: filtered.length });

  return filtered.map((doc) => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      text: doc.pageContent, // this is critical for PineconeStore
    },
  }));
}
