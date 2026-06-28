# @resume/backend

NestJS API for the resume builder. See the [root README](../README.md) for
monorepo-wide setup; this covers the backend specifically.

## Run

```bash
# from the repo root
npm run db:up                 # Postgres via docker-compose
cp backend/.env.example backend/.env
npm run prisma:migrate        # apply migrations + generate the client
npm run dev:backend           # nest start --watch  ->  http://localhost:4000
```

Swagger/OpenAPI UI: **http://localhost:4000/docs** (JSON at `/docs-json`).

## Architecture

```
src/
├── main.ts               # bootstrap: global ValidationPipe, CORS, static /uploads, Swagger
├── app.module.ts         # wires modules + the global JWT guard (routes opt out with @Public)
├── config/               # typed configuration + env validation (fail-fast)
├── prisma/               # PrismaService (global)
├── common/               # @CurrentUser/@Public decorators, Prisma exception filter, hashing
├── auth/                 # JWT access+refresh + Google OAuth (Passport strategies/guards)
├── users/                # User repository
├── resumes/             # owned CRUD + sharing + the ResumeData <-> DB serializer/writer
├── share/                # public read-only resume-by-token
├── uploads/              # profile-image upload (local | s3 | cloudinary providers)
└── pdf/                  # Puppeteer A4 render via the frontend /print route
```

### ResumeData ⇄ database

The Prisma schema maps **1:1** to the frontend `ResumeData` contract
(`packages/types`, mirrored from `frontend/src/types`):

- List sections (experience, skills, education, …) are **normalized child
  tables** with a `position` column so array order round-trips exactly.
- Item primary keys are the **client-provided UUIDs**, so ids stay stable across
  the store, the API and the DB.
- Singletons (`theme`, `personalInfo`) are 1:1 tables with explicit scalar
  columns — no JSON blobs for content — guaranteeing a shape-identical
  `DB → API → store` round-trip (proven by `test/resume.e2e-spec.ts`).

`src/resumes/resume.serializer.ts` does the read mapping; `resume-writer.ts`
performs the transactional create/replace write (shared with the seed script).

## Tests

```bash
npm run test --workspace @resume/backend       # unit (no DB)
npm run test:e2e --workspace @resume/backend    # HTTP round-trip (needs the DB up)
```
