# AI Virtual Source Analyzer (AI VSA)



## 📚 Overview

**AI Virtual Source Analyzer (AI VSA)** is an intelligent educational platform that empowers students to interact with their course materials through AI-powered conversations. Upload PDF documents, and engage in natural, context-aware discussions with an AI assistant that understands your study materials.

Transform static PDFs into dynamic learning experiences - ask questions, get explanations, extract key insights, and study smarter, not harder.

## ✨ Features

### 🎯 Core Capabilities

- **📄 PDF Upload & Processing**: Seamlessly upload course materials (PDFs) to AWS S3 for secure storage
- **🤖 AI-Powered Chat Interface**: Engage in intelligent conversations about your uploaded documents
- **🔍 Contextual Understanding**: AI retrieves relevant sections from your PDFs to provide accurate, context-aware responses
- **💬 Conversational Memory**: Chat history is preserved, allowing for natural, flowing conversations
- **🎨 Modern UI/UX**: Beautiful, responsive interface with dark mode support
- **🔐 Secure Authentication**: User authentication and authorization powered by Clerk
- **⚡ Real-time Streaming**: Get AI responses in real-time with streaming support

### 🎓 Educational Benefits

- **Personalized Learning**: Get explanations tailored to your specific questions
- **Quick Information Retrieval**: Find answers without manually searching through lengthy documents
- **Interactive Study Sessions**: Make studying more engaging and efficient
- **24/7 Availability**: Access your AI study assistant anytime, anywhere

## 🛠️ Tech Stack

### Frontend
- **[Next.js 13](https://nextjs.org/)** - React framework with App Router for server-side rendering and optimal performance
- **[React 18](https://react.dev/)** - Modern UI library with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for smooth interactions
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript-first ORM for database operations
- **[Neon Database](https://neon.tech/)** - Serverless PostgreSQL database
  - Stores chat sessions and message history
  - User data and file metadata
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database

### AI & Machine Learning
- **[OpenAI API](https://openai.com/)** - GPT models for natural language understanding and generation
  - `gpt-3.5-turbo` for chat responses
  - `text-embedding-3-small` for document embeddings
- **[LangChain](https://js.langchain.com/)** - Framework for building LLM applications
  - Conversational Retrieval QA Chain
  - Document splitting and processing
  - Prompt template management
- **[Pinecone](https://www.pinecone.io/)** - Vector database for semantic search
  - Stores document embeddings
  - Enables fast similarity search for context retrieval

### Cloud Services
- **[AWS S3](https://aws.amazon.com/s3/)** - Object storage for PDF files
  - Secure file upload and storage
  - File retrieval for processing
- **[Clerk](https://clerk.com/)** - Authentication and user management
  - Sign-up/Sign-in flows
  - User session management
  - Protected routes

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution for scripts

## 🏗️ Architecture

### System Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ 1. Upload PDF
       ▼
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         │ 2. Store PDF
         ▼
    ┌────────┐
    │ AWS S3 │
    └────┬───┘
         │
         │ 3. Download & Process
         ▼
┌──────────────────┐
│  PDF Processing  │
│  (LangChain)     │
└────────┬─────────┘
         │
         │ 4. Generate Embeddings
         ▼
    ┌──────────┐
    │  OpenAI  │
    │Embeddings│
    └────┬─────┘
         │
         │ 5. Store Vectors
         ▼
   ┌──────────┐
   │ Pinecone │
   │  Vector  │
   │    DB    │
   └────┬─────┘
        │
        │ 6. User asks question
        ▼
┌────────────────────┐
│  Similarity Search │
│    (Pinecone)      │
└─────────┬──────────┘
          │
          │ 7. Retrieve context
          ▼
    ┌──────────┐
    │  OpenAI  │
    │   GPT    │
    └────┬─────┘
         │
         │ 8. Stream response
         ▼
┌─────────────────┐
│   User Chat     │
│   Interface     │
└─────────────────┘
```

### Database Schema

**Chats Table**
```typescript
{
  id: serial (primary key)
  pdfName: text
  pdfUrl: text
  createdAt: timestamp
  userId: varchar(256)
  fileKey: text
}
```

**Messages Table**
```typescript
{
  id: serial (primary key)
  chatId: integer (foreign key → chats.id)
  content: text
  createdAt: timestamp
  role: enum ('system' | 'user')
}
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (Neon recommended)
- **AWS Account** (for S3)
- **Pinecone Account**
- **OpenAI API Key**
- **Clerk Account**

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=your_neon_database_url

# AWS S3
NEXT_PUBLIC_S3_ACCESS_KEY_ID=your_aws_access_key
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=your_aws_secret_key
NEXT_PUBLIC_S3_BUCKET_NAME=your_s3_bucket_name

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=your_pinecone_index_name

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aivsa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate database migrations
   npx drizzle-kit generate:pg
   
   # Push schema to database
   npx drizzle-kit push:pg
   ```

4. **Configure AWS S3**
   - Create an S3 bucket in the `eu-central-1` region
   - Set up appropriate CORS policies
   - Create IAM credentials with S3 access

5. **Set up Pinecone**
   - Create a Pinecone index with dimension `1536` (for OpenAI embeddings)
   - Note your environment and index name

6. **Configure Clerk**
   - Create a Clerk application
   - Set up sign-in/sign-up flows
   - Copy API keys to `.env`

### Running the Application

#### Development Mode

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Production Build

```bash
npm run build
npm start
```

#### Linting

```bash
npm run lint
```

## 📖 Usage

### For Students

1. **Sign Up/Sign In**
   - Create an account or sign in using Clerk authentication

2. **Upload Your Course Material**
   - Navigate to the selector page
   - Upload a PDF document (course notes, textbook chapter, etc.)
   - Wait for the system to process and embed the document

3. **Start Chatting**
   - Ask questions about the content
   - Request explanations of complex topics
   - Get summaries of specific sections
   - Explore concepts interactively

4. **Continue Learning**
   - Access your existing chat sessions
   - Build on previous conversations
   - Study more efficiently

### Example Interactions

**Student**: "What are the main principles of object-oriented programming discussed in this document?"

**AI VSA**: "Based on the uploaded material, the main principles of object-oriented programming are:
1. **Encapsulation**: Bundling data and methods that operate on that data within a single unit...
2. **Inheritance**: Creating new classes based on existing ones...
3. **Polymorphism**: The ability of objects to take on multiple forms..."

## 🔧 Key Components

### PDF Processing Pipeline

1. **Upload**: User uploads PDF → stored in AWS S3
2. **Download**: Server retrieves PDF from S3
3. **Parse**: LangChain's PDFLoader extracts text content
4. **Split**: RecursiveCharacterTextSplitter chunks the document (1000 chars, 200 overlap)
5. **Embed**: OpenAI generates embeddings for each chunk
6. **Store**: Vectors stored in Pinecone with metadata

### Chat System

1. **Question Input**: User submits a question
2. **Embedding**: Question is converted to a vector
3. **Similarity Search**: Pinecone finds relevant document chunks
4. **Context Assembly**: Retrieved chunks form the context
5. **LLM Processing**: OpenAI GPT generates a response using the context
6. **Streaming**: Response is streamed back to the user in real-time
7. **Storage**: Message saved to PostgreSQL

## 🎨 Customization

### Fonts

The application uses custom Google Fonts:
- **Poppins**: Body text
- **Outfit**: Headings
- **Quantico**: Branding

### Theming

Dark mode is supported via `next-themes`. Toggle between light and dark modes seamlessly.

### Prompt Templates

Customize AI behavior by modifying prompt templates in `src/lib/prompt-templates.ts`

## 📊 Performance Optimization

- **Namespace Caching**: Documents are only embedded once per file
- **Chunk Filtering**: Small, low-signal chunks are filtered out
- **Streaming Responses**: Real-time response delivery
- **Memory Management**: Increased Node.js heap size for large documents

## 🔒 Security

- **Authentication**: Clerk handles secure user authentication
- **Authorization**: Middleware protects routes
- **Environment Variables**: Sensitive data stored in `.env`
- **File Upload Limits**: Users limited to 1 PDF upload (configurable)
- **Input Sanitization**: User inputs are sanitized before processing

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Upload limit reached"
- **Solution**: Each user can upload 1 PDF. Delete existing chat to upload a new one.

**Issue**: Embedding errors
- **Solution**: Check OpenAI API key and rate limits

**Issue**: Database connection errors
- **Solution**: Verify DATABASE_URL and Neon database status

**Issue**: S3 upload failures
- **Solution**: Check AWS credentials and bucket permissions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI** for powerful language models
- **Pinecone** for vector database infrastructure
- **LangChain** for LLM application framework
- **Clerk** for authentication services
- **Vercel** for Next.js framework

## 📧 Contact

For questions, feedback, or support, please contact the development team or open an issue on GitHub.

---

**Built with ❤️ for students who want to learn smarter**

*AI VSA - Innovation and Technology*
