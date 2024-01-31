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
// export const getPineconeClient = () => {
//   return new Pinecone({
//     environment: process.env.PINECONE_ENVIRONMENT!,
//     apiKey: process.env.PINECONE_API_KEY!,
//   });
// };
type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading s3 into file system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
  console.log("loading pdf into memory" + file_name);

  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];
  console.log(pages);
  // 2. split and segment the pdf
  const documents = await prepareDocument(pages);

  // 3. vectorise and embed individual documents

  // 4. upload to pinecone
  const client = await getPineconeClient() 
  const namespace = convertToAscii(fileKey);

  await embedAndStoreDocs(client, documents, namespace);

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
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments(pages);
  return docs;
}
