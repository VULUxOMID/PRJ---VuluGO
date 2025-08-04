# 🚀 Vibe AI Builder - Lovable.dev Clone

An AI-powered app builder that generates full-stack applications from simple prompts, similar to Lovable.dev.

## 🎯 Project Overview

**Goal**: Build a SaaS AI website builder that can generate, preview, and deploy applications from natural language prompts.

**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, tRPC, Prisma, Neon Database, Gemini AI

## 📊 Progress Tracker

### ✅ **Phase 1: Foundation (COMPLETED)**
- [x] Next.js 15 project setup
- [x] TypeScript configuration
- [x] Tailwind CSS integration
- [x] Basic project structure

### ✅ **Phase 2: Database & API (COMPLETED)**
- [x] Neon PostgreSQL database setup
- [x] Prisma ORM configuration
- [x] Database schema (User, Project, Message models)
- [x] tRPC setup for type-safe APIs

### ✅ **Phase 3: AI Integration (COMPLETED)**
- [x] Gemini AI API integration
- [x] AI code generation from prompts
- [x] Self-contained component generation
- [x] Mock data instead of external APIs

### ✅ **Phase 4: Live Preview System (COMPLETED)**
- [x] Split-screen layout (Code generation + Live preview)
- [x] Iframe-based component rendering
- [x] React 18 sandboxed environment
- [x] Real-time code preview
- [x] Test component system

### 🔄 **Phase 5: Project Management (IN PROGRESS)**
- [ ] User authentication with Clerk
- [ ] Project saving and management
- [ ] Project dashboard
- [ ] Project history and versions

### ⏳ **Phase 6: Deployment System (PENDING)**
- [ ] Individual project URLs
- [ ] Vercel deployment integration
- [ ] Custom domain support
- [ ] Project sharing

### ⏳ **Phase 7: Advanced Features (PENDING)**
- [ ] Code editor integration
- [ ] Component library
- [ ] Template system
- [ ] Collaboration features

### ⏳ **Phase 8: Billing & Monetization (PENDING)**
- [ ] Clerk billing integration
- [ ] Usage tracking
- [ ] Subscription plans
- [ ] Credit system

## 🛠️ Current Status

**Latest Achievement**: ✅ **Live Preview System Working**
- Generated code now renders as interactive components
- Split-screen interface like Lovable.dev
- Test component system for debugging
- Real-time preview with React 18 support

**Next Priority**: 🔄 **User Authentication & Project Management**

## 🔑 Required API Keys & Accounts

### ✅ **Completed Setup**
- [x] **Neon Database**: PostgreSQL connection configured
- [x] **Gemini AI**: API key configured and working
- [x] **Vercel**: Deployment platform connected
- [x] **GitHub**: Repository connected

### 🔄 **In Progress**
- [ ] **Clerk**: Authentication and billing setup
- [ ] **Inngest**: Background job orchestration (partially configured)

### ⏳ **Pending**
- [ ] **E2B**: Cloud sandboxes for code execution
- [ ] **CodeRabbit**: AI-powered PR reviews

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/VULUxOMID/PRJ---VuluGO.git
   cd PRJ---VuluGO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 How to Use

1. **Generate Code**: Enter a prompt describing what you want to build
2. **Live Preview**: See your generated app running in real-time
3. **Test System**: Use the test button to verify the preview works
4. **Copy Code**: Copy the generated React component code

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (tRPC, Inngest)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page with AI builder
├── trpc/                  # tRPC configuration
│   ├── client.ts          # Client setup
│   ├── provider.tsx       # React Query provider
│   ├── server.ts          # Server setup
│   ├── init.ts            # tRPC initialization
│   └── routers/           # API routes
│       ├── app.ts         # Main router
│       └── ai.ts          # AI generation routes
├── inngest/               # Background job functions
│   ├── client.ts          # Inngest client
│   └── functions/         # Job functions
└── prisma/                # Database schema
    └── schema.prisma      # Prisma schema
```

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="your-neon-postgresql-url"

# AI APIs
GEMINI_API_KEY="your-gemini-api-key"

# Services
INGEST_EVENT_KEY="your-inngest-event-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
E2B_API_KEY="your-e2b-api-key"

# Deployment
VERCEL_URL="your-vercel-url"
```

## 🎯 Next Steps

1. **Implement User Authentication** with Clerk
2. **Add Project Management** - save and load projects
3. **Create Project Dashboard** - manage multiple projects
4. **Add Deployment System** - generate live URLs for projects
5. **Integrate Code Editor** - edit generated code in real-time

## 📚 Resources

- [Lovable.dev](https://lovable.dev) - Original inspiration
- [Code With Antonio Tutorial](https://youtu.be/xs8mWnbMcmc) - Building Vibe
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io)
- [Prisma Documentation](https://prisma.io)

## 🤝 Contributing

This is a learning project to build a Lovable.dev clone. Feel free to contribute or fork for your own projects!

---

**Current Progress**: 4/8 phases completed (50% done) 🎉
