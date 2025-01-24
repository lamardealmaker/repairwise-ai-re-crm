Project Structure:
├── README.md
├── actions
│   └── stripe-actions.ts
├── app
│   ├── globals.css
│   ├── layout.tsx
├── components
│   ├── header.tsx
├── components.json
├── db
│   ├── db.ts
├── drizzle.config.ts
├── hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib
│   ├── stripe.ts
│   └── utils.ts
├── license
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prettier.config.cjs
├── project-docs
│   ├── ai-todos.md
│   ├── current-project-overview.md
│   ├── roles-invites-todo.md
│   └── schema-info.md
├── prompts
│   ├── perplexity.md
│   └── v0.md
├── public
│   └── hero.png
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── types
    ├── actions-types.ts
    ├── auth-types.ts
    ├── index.ts
    ├── invites-types.ts
    ├── organizations-types.ts
    ├── profiles-types.ts
    ├── properties-types.ts
    ├── roles-types.ts
    └── tickets-types.ts


.cursorrules
```
1 | # Project Instructions
2 | 
3 | Use specification and guidelines as you build the app.
4 | 
5 | Write the complete code for every step. Do not get lazy.
6 | 
7 | Your goal is to completely finish whatever I ask for.
8 | 
9 | You will see <ai_context> tags in the code. These are context tags that you should use to help you understand the codebase.
10 | 
11 | ## Overview
12 | 
13 | This is a web app template.
14 | 
15 | ## Tech Stack
16 | 
17 | - Frontend: Next.js, Tailwind, Shadcn, Framer Motion
18 | - Backend: Postgres, Supabase, Drizzle ORM, Server Actions
19 | - Auth: Clerk
20 | - Payments: Stripe
21 | - Analytics: PostHog
22 | - Deployment: Vercel
23 | 
24 | ## Project Structure
25 | 
26 | - `actions` - Server actions
27 |   - `db` - Database related actions
28 |   - Other actions
29 | - `app` - Next.js app router
30 |   - `api` - API routes
31 |   - `route` - An example route
32 |     - `_components` - One-off components for the route
33 |     - `layout.tsx` - Layout for the route
34 |     - `page.tsx` - Page for the route
35 | - `components` - Shared components
36 |   - `ui` - UI components
37 |   - `utilities` - Utility components
38 | - `db` - Database
39 |   - `schema` - Database schemas
40 | - `lib` - Library code
41 |   - `hooks` - Custom hooks
42 | - `prompts` - Prompt files
43 | - `public` - Static assets
44 | - `types` - Type definitions
45 | 
46 | ## Rules
47 | 
48 | Follow these rules when building the app.
49 | 
50 | ### General Rules
51 | 
52 | - Use `@` to import anything from the app unless otherwise specified
53 | - Use kebab case for all files and folders unless otherwise specified
54 | - Don't update shadcn components unless otherwise specified
55 | 
56 | #### Env Rules
57 | 
58 | - If you update environment variables, update the `.env.example` file
59 | - All environment variables should go in `.env.local`
60 | - Do not expose environment variables to the frontend
61 | - Use `NEXT_PUBLIC_` prefix for environment variables that need to be accessed from the frontend
62 | - You may import environment variables in server actions and components by using `process.env.VARIABLE_NAME`
63 | 
64 | #### Type Rules
65 | 
66 | Follow these rules when working with types.
67 | 
68 | - When importing types, use `@/types`
69 | - Name files like `example-types.ts`
70 | - All types should go in `types`
71 | - Make sure to export the types in `types/index.ts`
72 | - Prefer interfaces over type aliases
73 | - If referring to db types, use `@/db/schema` such as `SelectTodo` from `todos-schema.ts`
74 | 
75 | An example of a type:
76 | 
77 | `types/actions-types.ts`
78 | 
79 | ```ts
80 | export type ActionState<T> =
81 |   | { isSuccess: true; message: string; data: T }
82 |   | { isSuccess: false; message: string; data?: never }
83 | ```
84 | 
85 | And exporting it:
86 | 
87 | `types/index.ts`
88 | 
89 | ```ts
90 | export * from "./actions-types"
91 | ```
92 | 
93 | ### Frontend Rules
94 | 
95 | Follow these rules when working on the frontend.
96 | 
97 | It uses Next.js, Tailwind, Shadcn, and Framer Motion.
98 | 
99 | #### General Rules
100 | 
101 | - Use `lucide-react` for icons
102 | 
103 | #### Components
104 | 
105 | - Use divs instead of other html tags unless otherwise specified
106 | - Separate the main parts of a component's html with an extra blank line for visual spacing
107 | - Always tag a component with either `use server` or `use client` at the top, including layouts and pages
108 | 
109 | ##### Organization
110 | 
111 | - All components be named using kebab case like `example-component.tsx` unless otherwise specified
112 | - Put components in `/_components` in the route if one-off components
113 | - Put components in `/components` from the root if shared components
114 | 
115 | ##### Data Fetching
116 | 
117 | - Fetch data in server components and pass the data down as props to client components.
118 | - Use server actions from `/actions` to mutate data.
119 | 
120 | ##### Server Components
121 | 
122 | - Use `"use server"` at the top of the file.
123 | - Implement Suspense for asynchronous data fetching to show loading states while data is being fetched.
124 | - If no asynchronous logic is required for a given server component, you do not need to wrap the component in `<Suspense>`. You can simply return the final UI directly since there is no async boundary needed.
125 | - If asynchronous fetching is required, you can use a `<Suspense>` boundary and a fallback to indicate a loading state while data is loading.
126 | - Server components cannot be imported into client components. If you want to use a server component in a client component, you must pass the as props using the "children" prop
127 | 
128 | Example of a server layout:
129 | 
130 | ```tsx
131 | "use server"
132 | 
133 | export default async function ExampleServerLayout({
134 |   children
135 | }: {
136 |   children: React.ReactNode
137 | }) {
138 |   return children
139 | }
140 | ```
141 | 
142 | Example of a server page (with async logic):
143 | 
144 | ```tsx
145 | "use server"
146 | 
147 | import { Suspense } from "react"
148 | import { SomeAction } from "@/actions/some-actions"
149 | import SomeComponent from "./_components/some-component"
150 | import SomeSkeleton from "./_components/some-skeleton"
151 | 
152 | export default async function ExampleServerPage() {
153 |   return (
154 |     <Suspense fallback={<SomeSkeleton className="some-class" />}>
155 |       <SomeComponentFetcher />
156 |     </Suspense>
157 |   )
158 | }
159 | 
160 | async function SomeComponentFetcher() {
161 |   const { data } = await SomeAction()
162 |   return <SomeComponent className="some-class" initialData={data || []} />
163 | }
164 | ```
165 | 
166 | Example of a server page (no async logic required):
167 | 
168 | ```tsx
169 | "use server"
170 | 
171 | import SomeClientComponent from "./_components/some-client-component"
172 | 
173 | // In this case, no asynchronous work is being done, so no Suspense or fallback is required.
174 | export default async function ExampleServerPage() {
175 |   return <SomeClientComponent initialData={[]} />
176 | }
177 | ```
178 | 
179 | Example of a server component:
180 | 
181 | ```tsx
182 | "use server"
183 | 
184 | interface ExampleServerComponentProps {
185 |   // Your props here
186 | }
187 | 
188 | export async function ExampleServerComponent({
189 |   props
190 | }: ExampleServerComponentProps) {
191 |   // Your code here
192 | }
193 | ```
194 | 
195 | ##### Client Components
196 | 
197 | - Use `"use client"` at the top of the file
198 | - Client components can safely rely on props passed down from server components, or handle UI interactions without needing <Suspense> if there’s no async logic.
199 | 
200 | Example of a client page:
201 | 
202 | ```tsx
203 | "use client"
204 | 
205 | export default function ExampleClientPage() {
206 |   // Your code here
207 | }
208 | ```
209 | 
210 | Example of a client component:
211 | 
212 | ```tsx
213 | "use client"
214 | 
215 | interface ExampleClientComponentProps {
216 |   initialData: any[]
217 | }
218 | 
219 | export default function ExampleClientComponent({
220 |   initialData
221 | }: ExampleClientComponentProps) {
222 |   // Client-side logic here
223 |   return <div>{initialData.length} items</div>
224 | }
225 | ```
226 | 
227 | ### Backend Rules
228 | 
229 | Follow these rules when working on the backend.
230 | 
231 | It uses Postgres, Supabase, Drizzle ORM, and Server Actions.
232 | 
233 | #### General Rules
234 | 
235 | - Never generate migrations. You do not have to do anything in the `db/migrations` folder inluding migrations and metadata. Ignore it.
236 | 
237 | #### Organization
238 | 
239 | #### Schemas
240 | 
241 | - When importing schemas, use `@/db/schema`
242 | - Name files like `example-schema.ts`
243 | - All schemas should go in `db/schema`
244 | - Make sure to export the schema in `db/schema/index.ts`
245 | - Make sure to add the schema to the `schema` object in `db/db.ts`
246 | - If using a userId, always use `userId: text("user_id").notNull()`
247 | - Always include createdAt and updatedAt columns in all tables
248 | - Make sure to cascade delete when necessary
249 | - Use enums for columns that have a limited set of possible values such as:
250 | 
251 | ```ts
252 | import { pgEnum } from "drizzle-orm/pg-core"
253 | 
254 | export const membershipEnum = pgEnum("membership", ["free", "pro"])
255 | 
256 | membership: membershipEnum("membership").notNull().default("free")
257 | ```
258 | 
259 | Example of a schema:
260 | 
261 | `db/schema/todos-schema.ts`
262 | 
263 | ```ts
264 | import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
265 | 
266 | export const todosTable = pgTable("todos", {
267 |   id: uuid("id").defaultRandom().primaryKey(),
268 |   userId: text("user_id").notNull(),
269 |   content: text("content").notNull(),
270 |   completed: boolean("completed").default(false).notNull(),
271 |   createdAt: timestamp("created_at").defaultNow().notNull(),
272 |   updatedAt: timestamp("updated_at")
273 |     .defaultNow()
274 |     .notNull()
275 |     .$onUpdate(() => new Date())
276 | })
277 | 
278 | export type InsertTodo = typeof todosTable.$inferInsert
279 | export type SelectTodo = typeof todosTable.$inferSelect
280 | ```
281 | 
282 | And exporting it:
283 | 
284 | `db/schema/index.ts`
285 | 
286 | ```ts
287 | export * from "./todos-schema"
288 | ```
289 | 
290 | And adding it to the schema in `db/db.ts`:
291 | 
292 | `db/db.ts`
293 | 
294 | ```ts
295 | import { todosTable } from "@/db/schema"
296 | 
297 | const schema = {
298 |   todos: todosTable
299 | }
300 | ```
301 | 
302 | And a more complex schema:
303 | 
304 | ```ts
305 | import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
306 | 
307 | export const chatsTable = pgTable("chats", {
308 |   id: uuid("id").defaultRandom().primaryKey(),
309 |   userId: text("user_id").notNull(),
310 |   name: text("name").notNull(),
311 |   createdAt: timestamp("created_at").defaultNow().notNull(),
312 |   updatedAt: timestamp("updated_at")
313 |     .defaultNow()
314 |     .notNull()
315 |     .$onUpdate(() => new Date())
316 | })
317 | 
318 | export type InsertChat = typeof chatsTable.$inferInsert
319 | export type SelectChat = typeof chatsTable.$inferSelect
320 | ```
321 | 
322 | ```ts
323 | import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
324 | import { chatsTable } from "./chats-schema"
325 | 
326 | export const roleEnum = pgEnum("role", ["assistant", "user"])
327 | 
328 | export const messagesTable = pgTable("messages", {
329 |   id: uuid("id").defaultRandom().primaryKey(),
330 |   chatId: uuid("chat_id")
331 |     .references(() => chatsTable.id, { onDelete: "cascade" })
332 |     .notNull(),
333 |   content: text("content").notNull(),
334 |   role: roleEnum("role").notNull(),
335 |   createdAt: timestamp("created_at").defaultNow().notNull(),
336 |   updatedAt: timestamp("updated_at")
337 |     .defaultNow()
338 |     .notNull()
339 |     .$onUpdate(() => new Date())
340 | })
341 | 
342 | export type InsertMessage = typeof messagesTable.$inferInsert
343 | export type SelectMessage = typeof messagesTable.$inferSelect
344 | ```
345 | 
346 | And exporting it:
347 | 
348 | `db/schema/index.ts`
349 | 
350 | ```ts
351 | export * from "./chats-schema"
352 | export * from "./messages-schema"
353 | ```
354 | 
355 | And adding it to the schema in `db/db.ts`:
356 | 
357 | `db/db.ts`
358 | 
359 | ```ts
360 | import { chatsTable, messagesTable } from "@/db/schema"
361 | 
362 | const schema = {
363 |   chats: chatsTable,
364 |   messages: messagesTable
365 | }
366 | ```
367 | 
368 | #### Server Actions
369 | 
370 | - When importing actions, use `@/actions` or `@/actions/db` if db related
371 | - DB related actions should go in the `actions/db` folder
372 | - Other actions should go in the `actions` folder
373 | - Name files like `example-actions.ts`
374 | - All actions should go in the `actions` folder
375 | - Only write the needed actions
376 | - Return an ActionState with the needed data type from actions
377 | - Include Action at the end of function names `Ex: exampleFunction -> exampleFunctionAction`
378 | - Actions should return a Promise<ActionState<T>>
379 | - Sort in CRUD order: Create, Read, Update, Delete
380 | - Make sure to return undefined as the data type if the action is not supposed to return any data
381 | 
382 | ```ts
383 | export type ActionState<T> =
384 |   | { isSuccess: true; message: string; data: T }
385 |   | { isSuccess: false; message: string; data?: never }
386 | ```
387 | 
388 | Example of an action:
389 | 
390 | `actions/db/todos-actions.ts`
391 | 
392 | ```ts
393 | "use server"
394 | 
395 | import { db } from "@/db/db"
396 | import { InsertTodo, SelectTodo, todosTable } from "@/db/schema/todos-schema"
397 | import { ActionState } from "@/types"
398 | import { eq } from "drizzle-orm"
399 | 
400 | export async function createTodoAction(
401 |   todo: InsertTodo
402 | ): Promise<ActionState<SelectTodo>> {
403 |   try {
404 |     const [newTodo] = await db.insert(todosTable).values(todo).returning()
405 |     return {
406 |       isSuccess: true,
407 |       message: "Todo created successfully",
408 |       data: newTodo
409 |     }
410 |   } catch (error) {
411 |     console.error("Error creating todo:", error)
412 |     return { isSuccess: false, message: "Failed to create todo" }
413 |   }
414 | }
415 | 
416 | export async function getTodosAction(
417 |   userId: string
418 | ): Promise<ActionState<SelectTodo[]>> {
419 |   try {
420 |     const todos = await db.query.todos.findMany({
421 |       where: eq(todosTable.userId, userId)
422 |     })
423 |     return {
424 |       isSuccess: true,
425 |       message: "Todos retrieved successfully",
426 |       data: todos
427 |     }
428 |   } catch (error) {
429 |     console.error("Error getting todos:", error)
430 |     return { isSuccess: false, message: "Failed to get todos" }
431 |   }
432 | }
433 | 
434 | export async function updateTodoAction(
435 |   id: string,
436 |   data: Partial<InsertTodo>
437 | ): Promise<ActionState<SelectTodo>> {
438 |   try {
439 |     const [updatedTodo] = await db
440 |       .update(todosTable)
441 |       .set(data)
442 |       .where(eq(todosTable.id, id))
443 |       .returning()
444 | 
445 |     return {
446 |       isSuccess: true,
447 |       message: "Todo updated successfully",
448 |       data: updatedTodo
449 |     }
450 |   } catch (error) {
451 |     console.error("Error updating todo:", error)
452 |     return { isSuccess: false, message: "Failed to update todo" }
453 |   }
454 | }
455 | 
456 | export async function deleteTodoAction(id: string): Promise<ActionState<void>> {
457 |   try {
458 |     await db.delete(todosTable).where(eq(todosTable.id, id))
459 |     return {
460 |       isSuccess: true,
461 |       message: "Todo deleted successfully",
462 |       data: undefined
463 |     }
464 |   } catch (error) {
465 |     console.error("Error deleting todo:", error)
466 |     return { isSuccess: false, message: "Failed to delete todo" }
467 |   }
468 | }
469 | ```
470 | 
471 | ### Auth Rules
472 | 
473 | Follow these rules when working on auth.
474 | 
475 | It uses Clerk for authentication.
476 | 
477 | #### General Rules
478 | 
479 | - Import the auth helper with `import { auth } from "@clerk/nextjs/server"` in server components
480 | - await the auth helper in server actions
481 | 
482 | ### Payments Rules
483 | 
484 | Follow these rules when working on payments.
485 | 
486 | It uses Stripe for payments.
487 | 
488 | ### Analytics Rules
489 | 
490 | Follow these rules when working on analytics.
491 | 
492 | It uses PostHog for analytics.
```

.repo_ignore
```
1 | # Package manager caches
2 | **/node_modules/
3 | **/.npm/
4 | **/__pycache__/
5 | **/.pytest_cache/
6 | **/.mypy_cache/
7 | 
8 | # Build caches
9 | **/.gradle/
10 | **/.nuget/
11 | **/.cargo/
12 | **/.stack-work/
13 | **/.ccache/
14 | 
15 | # IDE and Editor caches
16 | **/.idea/
17 | **/.vscode/
18 | **/*.swp
19 | **/*~
20 | 
21 | # Temp files
22 | **/*.tmp
23 | **/*.temp
24 | **/*.bak
25 | 
26 | **/*.meta
27 | **/package-lock.json
28 | 
29 | # AI Specific
30 | .repo_ignore
31 | .cursorrules
32 | 
33 | # Project Specific
34 | **/.github
35 | **/.husky
36 | **/prompts
37 | **/migrations
38 | **/public
```

components.json
```
1 | {
2 |   "$schema": "https://ui.shadcn.com/schema.json",
3 |   "style": "default",
4 |   "rsc": true,
5 |   "tsx": true,
6 |   "tailwind": {
7 |     "config": "tailwind.config.ts",
8 |     "css": "app/globals.css",
9 |     "baseColor": "neutral",
10 |     "cssVariables": true,
11 |     "prefix": ""
12 |   },
13 |   "aliases": {
14 |     "components": "@/components",
15 |     "utils": "@/lib/utils"
16 |   }
17 | }
```

drizzle.config.ts
```
1 | /*
2 | <ai_context>
3 | Configures Drizzle for the app.
4 | </ai_context>
5 | */
6 | 
7 | import { config } from "dotenv"
8 | import { defineConfig } from "drizzle-kit"
9 | 
10 | config({ path: ".env.local" })
11 | 
12 | export default defineConfig({
13 |   schema: "./db/schema/index.ts",
14 |   out: "./db/migrations",
15 |   dialect: "postgresql",
16 |   dbCredentials: {
17 |     url: process.env.DATABASE_URL!
18 |   }
19 | })
```

middleware.ts
```
1 | /*
2 | <ai_context>
3 | Contains middleware for protecting routes, checking user authentication, and redirecting as needed.
4 | </ai_context>
5 | */
6 | 
7 | import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
8 | import { NextResponse } from "next/server"
9 | 
10 | const isProtectedRoute = createRouteMatcher(["/tenant/(.*)", "/staff/(.*)"])
11 | 
12 | export default clerkMiddleware(async (auth, req) => {
13 |   const { userId, redirectToSignIn } = await auth()
14 | 
15 |   // If the user isn't signed in and the route is private, redirect to sign-in
16 |   if (!userId && isProtectedRoute(req)) {
17 |     return redirectToSignIn({ returnBackUrl: "/login" })
18 |   }
19 | 
20 |   // If the user is logged in and the route is protected, let them view.
21 |   if (userId && isProtectedRoute(req)) {
22 |     return NextResponse.next()
23 |   }
24 | })
25 | 
26 | export const config = {
27 |   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
28 | }
```

next.config.js
```
1 | /** @type {import('next').NextConfig} */
2 | const nextConfig = {
3 |   typescript: {
4 |     // !! WARN !!
5 |     // Dangerously allow production builds to successfully complete even if
6 |     // your project has type errors.
7 |     // !! WARN !!
8 |     ignoreBuildErrors: true,
9 |   },
10 |   async headers() {
11 |     return [
12 |       {
13 |         source: '/:path*',
14 |         headers: [
15 |           {
16 |             key: 'Content-Security-Policy',
17 |             value: "frame-ancestors 'self' https://challenges.cloudflare.com",
18 |           },
19 |         ],
20 |       },
21 |     ]
22 |   },
23 | }
24 | 
25 | module.exports = nextConfig 
```

next.config.mjs
```
1 | /*
2 | <ai_context>
3 | Configures Next.js for the app.
4 | </ai_context>
5 | */
6 | 
7 | /** @type {import('next').NextConfig} */
8 | const nextConfig = {
9 |   images: {
10 |     remotePatterns: [{ hostname: "localhost" }]
11 |   }
12 | }
13 | 
14 | export default nextConfig
```

package.json
```
1 | {
2 |   "name": "repairwise",
3 |   "version": "0.1.0",
4 |   "private": true,
5 |   "scripts": {
6 |     "dev": "next dev",
7 |     "build": "next build",
8 |     "start": "next start",
9 |     "lint": "next lint",
10 |     "clean": "npm run lint:fix && npm run format:write",
11 |     "type-check": "tsc --noEmit",
12 |     "lint:fix": "next lint --fix",
13 |     "format:write": "prettier --write \"{app,lib,db,components,context,types}/**/*.{ts,tsx}\" --cache",
14 |     "format:check": "prettier --check \"{app,lib,db,components,context,types}**/*.{ts,tsx}\" --cache",
15 |     "analyze": "ANALYZE=true npm run build",
16 |     "db:generate": "npx drizzle-kit generate",
17 |     "db:migrate": "npx drizzle-kit migrate",
18 |     "prepare": "husky install"
19 |   },
20 |   "dependencies": {
21 |     "@clerk/backend": "^1.20.1",
22 |     "@clerk/nextjs": "^6.8.1",
23 |     "@clerk/themes": "^2.1.53",
24 |     "@hookform/resolvers": "^3.9.1",
25 |     "@radix-ui/react-accordion": "^1.2.2",
26 |     "@radix-ui/react-alert-dialog": "^1.1.4",
27 |     "@radix-ui/react-aspect-ratio": "^1.1.1",
28 |     "@radix-ui/react-avatar": "^1.1.2",
29 |     "@radix-ui/react-checkbox": "^1.1.3",
30 |     "@radix-ui/react-collapsible": "^1.1.2",
31 |     "@radix-ui/react-context-menu": "^2.2.4",
32 |     "@radix-ui/react-dialog": "^1.1.4",
33 |     "@radix-ui/react-dropdown-menu": "^2.1.4",
34 |     "@radix-ui/react-hover-card": "^1.1.4",
35 |     "@radix-ui/react-label": "^2.1.1",
36 |     "@radix-ui/react-menubar": "^1.1.4",
37 |     "@radix-ui/react-navigation-menu": "^1.2.3",
38 |     "@radix-ui/react-popover": "^1.1.4",
39 |     "@radix-ui/react-progress": "^1.1.1",
40 |     "@radix-ui/react-radio-group": "^1.2.2",
41 |     "@radix-ui/react-scroll-area": "^1.2.2",
42 |     "@radix-ui/react-select": "^2.1.4",
43 |     "@radix-ui/react-separator": "^1.1.1",
44 |     "@radix-ui/react-slider": "^1.2.2",
45 |     "@radix-ui/react-slot": "^1.1.1",
46 |     "@radix-ui/react-switch": "^1.1.2",
47 |     "@radix-ui/react-tabs": "^1.1.2",
48 |     "@radix-ui/react-toast": "^1.2.4",
49 |     "@radix-ui/react-toggle": "^1.1.1",
50 |     "@radix-ui/react-toggle-group": "^1.1.1",
51 |     "@radix-ui/react-tooltip": "^1.1.6",
52 |     "class-variance-authority": "^0.7.1",
53 |     "clsx": "^2.1.1",
54 |     "cmdk": "^1.0.0",
55 |     "codefetch": "^1.5.0",
56 |     "date-fns": "^3.6.0",
57 |     "drizzle-orm": "^0.33.0",
58 |     "embla-carousel-react": "^8.5.1",
59 |     "framer-motion": "^11.11.8",
60 |     "input-otp": "^1.4.1",
61 |     "lucide-react": "^0.436.0",
62 |     "next": "^15.0.3",
63 |     "next-themes": "^0.3.0",
64 |     "postgres": "^3.4.4",
65 |     "posthog-js": "^1.201.0",
66 |     "react": "^16.8 || ^17.0 || ^18.0 || ^19.0",
67 |     "react-day-picker": "^8.10.1",
68 |     "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0",
69 |     "react-hook-form": "^7.54.1",
70 |     "react-resizable-panels": "^2.1.7",
71 |     "recharts": "^2.15.0",
72 |     "sonner": "^1.7.1",
73 |     "stripe": "^16.9.0",
74 |     "svix": "^1.45.1",
75 |     "tailwind-merge": "^2.5.2",
76 |     "tailwindcss-animate": "^1.0.7",
77 |     "vaul": "^0.9.9",
78 |     "zod": "^3.24.1"
79 |   },
80 |   "devDependencies": {
81 |     "@tailwindcss/typography": "^0.5.15",
82 |     "@types/node": "^20",
83 |     "@types/react": "^16.8 || ^17.0 || ^18.0 || ^19.0",
84 |     "@types/react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0",
85 |     "dotenv": "^16.4.5",
86 |     "drizzle-kit": "^0.24.2",
87 |     "eslint": "^8",
88 |     "eslint-config-next": "14.2.7",
89 |     "eslint-config-prettier": "^9.1.0",
90 |     "eslint-plugin-tailwindcss": "^3.17.5",
91 |     "husky": "^9.1.6",
92 |     "postcss": "^8",
93 |     "prettier": "^3.3.3",
94 |     "tailwindcss": "^3.4.1",
95 |     "typescript": "^5"
96 |   }
97 | }
```

postcss.config.mjs
```
1 | /*
2 | <ai_context>
3 | Configures PostCSS for the app.
4 | </ai_context>
5 | */
6 | 
7 | /** @type {import('postcss-load-config').Config} */
8 | const config = {
9 |   plugins: {
10 |     tailwindcss: {}
11 |   }
12 | }
13 | 
14 | export default config
```

prettier.config.cjs
```
1 | /*
2 | <ai_context>
3 | Configures Prettier for the app.
4 | </ai_context>
5 | */
6 | 
7 | /** @type {import('prettier').Config} */
8 | module.exports = {
9 |   endOfLine: "lf",
10 |   semi: false,
11 |   useTabs: false,
12 |   singleQuote: false,
13 |   arrowParens: "avoid",
14 |   tabWidth: 2,
15 |   trailingComma: "none",
16 |   importOrder: [
17 |     "^.+\\.scss$",
18 |     "^.+\\.css$",
19 |     "^(react/(.*)$)|^(react$)",
20 |     "^(next/(.*)$)|^(next$)",
21 |     "<THIRD_PARTY_MODULES>",
22 |     "",
23 |     "^types$",
24 |     "^@/types/(.*)$",
25 |     "^@/config/(.*)$",
26 |     "^@/lib/(.*)$",
27 |     "^@/hooks/(.*)$",
28 |     "^@/components/ui/(.*)$",
29 |     "^@/components/(.*)$",
30 |     "^@/registry/(.*)$",
31 |     "^@/styles/(.*)$",
32 |     "^@/app/(.*)$",
33 |     "",
34 |     "^[./]"
35 |   ],
36 |   importOrderSeparation: false,
37 |   importOrderSortSpecifiers: true,
38 |   importOrderBuiltinModulesToTop: true,
39 |   importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
40 |   importOrderMergeDuplicateImports: true,
41 |   importOrderCombineTypeAndValueImports: true
42 | }
```

tailwind.config.ts
```
1 | /*
2 | <ai_context>
3 | Configures Tailwind CSS for the app.
4 | </ai_context>
5 | */
6 | 
7 | import type { Config } from "tailwindcss"
8 | 
9 | const config = {
10 |   darkMode: ["class"],
11 |   content: [
12 |     "./pages/**/*.{ts,tsx}",
13 |     "./components/**/*.{ts,tsx}",
14 |     "./app/**/*.{ts,tsx}",
15 |     "./src/**/*.{ts,tsx}"
16 |   ],
17 |   prefix: "",
18 |   theme: {
19 |     container: {
20 |       center: true,
21 |       padding: "2rem",
22 |       screens: {
23 |         "2xl": "1400px"
24 |       }
25 |     },
26 |     extend: {
27 |       colors: {
28 |         border: "hsl(var(--border))",
29 |         input: "hsl(var(--input))",
30 |         ring: "hsl(var(--ring))",
31 |         background: "hsl(var(--background))",
32 |         foreground: "hsl(var(--foreground))",
33 |         primary: {
34 |           DEFAULT: "hsl(var(--primary))",
35 |           foreground: "hsl(var(--primary-foreground))"
36 |         },
37 |         secondary: {
38 |           DEFAULT: "hsl(var(--secondary))",
39 |           foreground: "hsl(var(--secondary-foreground))"
40 |         },
41 |         destructive: {
42 |           DEFAULT: "hsl(var(--destructive))",
43 |           foreground: "hsl(var(--destructive-foreground))"
44 |         },
45 |         muted: {
46 |           DEFAULT: "hsl(var(--muted))",
47 |           foreground: "hsl(var(--muted-foreground))"
48 |         },
49 |         accent: {
50 |           DEFAULT: "hsl(var(--accent))",
51 |           foreground: "hsl(var(--accent-foreground))"
52 |         },
53 |         popover: {
54 |           DEFAULT: "hsl(var(--popover))",
55 |           foreground: "hsl(var(--popover-foreground))"
56 |         },
57 |         card: {
58 |           DEFAULT: "hsl(var(--card))",
59 |           foreground: "hsl(var(--card-foreground))"
60 |         },
61 |         sidebar: {
62 |           DEFAULT: "hsl(var(--sidebar-background))",
63 |           foreground: "hsl(var(--sidebar-foreground))",
64 |           primary: "hsl(var(--sidebar-primary))",
65 |           "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
66 |           accent: "hsl(var(--sidebar-accent))",
67 |           "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
68 |           border: "hsl(var(--sidebar-border))",
69 |           ring: "hsl(var(--sidebar-ring))"
70 |         }
71 |       },
72 |       borderRadius: {
73 |         lg: "var(--radius)",
74 |         md: "calc(var(--radius) - 2px)",
75 |         sm: "calc(var(--radius) - 4px)"
76 |       },
77 |       keyframes: {
78 |         "accordion-down": {
79 |           from: {
80 |             height: "0"
81 |           },
82 |           to: {
83 |             height: "var(--radix-accordion-content-height)"
84 |           }
85 |         },
86 |         "accordion-up": {
87 |           from: {
88 |             height: "var(--radix-accordion-content-height)"
89 |           },
90 |           to: {
91 |             height: "0"
92 |           }
93 |         },
94 |         gradient: {
95 |           to: {
96 |             backgroundPosition: "var(--bg-size) 0"
97 |           }
98 |         }
99 |       },
100 |       animation: {
101 |         "accordion-down": "accordion-down 0.2s ease-out",
102 |         "accordion-up": "accordion-up 0.2s ease-out",
103 |         gradient: "gradient 8s linear infinite"
104 |       }
105 |     }
106 |   },
107 |   plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
108 | } satisfies Config
109 | 
110 | export default config
```

tsconfig.json
```
1 | /*
2 | <ai_context>
3 | Configures the TypeScript compiler options for the app.
4 | </ai_context>
5 | */
6 | 
7 | {
8 |   "compilerOptions": {
9 |     "lib": ["dom", "dom.iterable", "esnext"],
10 |     "allowJs": true,
11 |     "skipLibCheck": true,
12 |     "strict": true,
13 |     "noEmit": true,
14 |     "esModuleInterop": true,
15 |     "module": "esnext",
16 |     "moduleResolution": "bundler",
17 |     "resolveJsonModule": true,
18 |     "isolatedModules": true,
19 |     "jsx": "preserve",
20 |     "incremental": true,
21 |     "plugins": [
22 |       {
23 |         "name": "next"
24 |       }
25 |     ],
26 |     "paths": {
27 |       "@/*": ["./*"]
28 |     },
29 |     "target": "ES2017"
30 |   },
31 |   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
32 |   "exclude": ["node_modules"]
33 | }
```

.husky/pre-commit
```
1 | #!/usr/bin/env sh
2 | 
3 | . "$(dirname -- "$0")/_/husky.sh"
4 | 
5 | npm run lint:fix && npm run format:write && git add .
```

actions/stripe-actions.ts
```
1 | /*
2 | <ai_context>
3 | Contains server actions related to Stripe.
4 | </ai_context>
5 | */
6 | 
7 | import {
8 |   updateProfileAction,
9 |   updateProfileByStripeCustomerIdAction
10 | } from "@/actions/db/profiles-actions"
11 | import { SelectProfile } from "@/db/schema"
12 | import { stripe } from "@/lib/stripe"
13 | import Stripe from "stripe"
14 | 
15 | type MembershipStatus = SelectProfile["membership"]
16 | 
17 | const getMembershipStatus = (
18 |   status: Stripe.Subscription.Status,
19 |   membership: MembershipStatus
20 | ): MembershipStatus => {
21 |   switch (status) {
22 |     case "active":
23 |     case "trialing":
24 |       return membership
25 |     case "canceled":
26 |     case "incomplete":
27 |     case "incomplete_expired":
28 |     case "past_due":
29 |     case "paused":
30 |     case "unpaid":
31 |       return "free"
32 |     default:
33 |       return "free"
34 |   }
35 | }
36 | 
37 | const getSubscription = async (subscriptionId: string) => {
38 |   return stripe.subscriptions.retrieve(subscriptionId, {
39 |     expand: ["default_payment_method"]
40 |   })
41 | }
42 | 
43 | export const updateStripeCustomer = async (
44 |   userId: string,
45 |   subscriptionId: string,
46 |   customerId: string
47 | ) => {
48 |   try {
49 |     if (!userId || !subscriptionId || !customerId) {
50 |       throw new Error("Missing required parameters for updateStripeCustomer")
51 |     }
52 | 
53 |     const subscription = await getSubscription(subscriptionId)
54 | 
55 |     const result = await updateProfileAction(userId, {
56 |       stripeCustomerId: customerId,
57 |       stripeSubscriptionId: subscription.id
58 |     })
59 | 
60 |     if (!result.isSuccess) {
61 |       throw new Error("Failed to update customer profile")
62 |     }
63 | 
64 |     return result.data
65 |   } catch (error) {
66 |     console.error("Error in updateStripeCustomer:", error)
67 |     throw error instanceof Error
68 |       ? error
69 |       : new Error("Failed to update Stripe customer")
70 |   }
71 | }
72 | 
73 | export const manageSubscriptionStatusChange = async (
74 |   subscriptionId: string,
75 |   customerId: string,
76 |   productId: string
77 | ): Promise<MembershipStatus> => {
78 |   try {
79 |     if (!subscriptionId || !customerId || !productId) {
80 |       throw new Error(
81 |         "Missing required parameters for manageSubscriptionStatusChange"
82 |       )
83 |     }
84 | 
85 |     const subscription = await getSubscription(subscriptionId)
86 |     const product = await stripe.products.retrieve(productId)
87 |     const membership = product.metadata.membership as MembershipStatus
88 | 
89 |     if (!["free", "pro"].includes(membership)) {
90 |       throw new Error(
91 |         `Invalid membership type in product metadata: ${membership}`
92 |       )
93 |     }
94 | 
95 |     const membershipStatus = getMembershipStatus(
96 |       subscription.status,
97 |       membership
98 |     )
99 | 
100 |     const updateResult = await updateProfileByStripeCustomerIdAction(
101 |       customerId,
102 |       {
103 |         stripeSubscriptionId: subscription.id,
104 |         membership: membershipStatus
105 |       }
106 |     )
107 | 
108 |     if (!updateResult.isSuccess) {
109 |       throw new Error("Failed to update subscription status")
110 |     }
111 | 
112 |     return membershipStatus
113 |   } catch (error) {
114 |     console.error("Error in manageSubscriptionStatusChange:", error)
115 |     throw error instanceof Error
116 |       ? error
117 |       : new Error("Failed to update subscription status")
118 |   }
119 | }
```

app/globals.css
```
1 | /*
2 | <ai_context>
3 | Global styles for the app.
4 | </ai_context>
5 | */
6 | 
7 | @tailwind base;
8 | @tailwind components;
9 | @tailwind utilities;
10 | 
11 | @layer base {
12 |   :root {
13 |     --background: 0 0% 100%;
14 |     --foreground: 0 0% 3.9%;
15 |     --card: 0 0% 100%;
16 |     --card-foreground: 0 0% 3.9%;
17 |     --popover: 0 0% 100%;
18 |     --popover-foreground: 0 0% 3.9%;
19 |     --primary: 0 0% 9%;
20 |     --primary-foreground: 0 0% 98%;
21 |     --secondary: 0 0% 96.1%;
22 |     --secondary-foreground: 0 0% 9%;
23 |     --muted: 0 0% 96.1%;
24 |     --muted-foreground: 0 0% 45.1%;
25 |     --accent: 0 0% 96.1%;
26 |     --accent-foreground: 0 0% 9%;
27 |     --destructive: 0 84.2% 60.2%;
28 |     --destructive-foreground: 0 0% 98%;
29 |     --border: 0 0% 89.8%;
30 |     --input: 0 0% 89.8%;
31 |     --ring: 0 0% 3.9%;
32 |     --radius: 0.5rem;
33 |     --chart-1: 12 76% 61%;
34 |     --chart-2: 173 58% 39%;
35 |     --chart-3: 197 37% 24%;
36 |     --chart-4: 43 74% 66%;
37 |     --chart-5: 27 87% 67%;
38 |     --sidebar-background: 0 0% 98%;
39 |     --sidebar-foreground: 240 5.3% 26.1%;
40 |     --sidebar-primary: 240 5.9% 10%;
41 |     --sidebar-primary-foreground: 0 0% 98%;
42 |     --sidebar-accent: 240 4.8% 95.9%;
43 |     --sidebar-accent-foreground: 240 5.9% 10%;
44 |     --sidebar-border: 220 13% 91%;
45 |     --sidebar-ring: 217.2 91.2% 59.8%;
46 |   }
47 | 
48 |   .dark {
49 |     --background: 0 0% 3.9%;
50 |     --foreground: 0 0% 98%;
51 |     --card: 0 0% 3.9%;
52 |     --card-foreground: 0 0% 98%;
53 |     --popover: 0 0% 3.9%;
54 |     --popover-foreground: 0 0% 98%;
55 |     --primary: 0 0% 98%;
56 |     --primary-foreground: 0 0% 9%;
57 |     --secondary: 0 0% 14.9%;
58 |     --secondary-foreground: 0 0% 98%;
59 |     --muted: 0 0% 14.9%;
60 |     --muted-foreground: 0 0% 63.9%;
61 |     --accent: 0 0% 14.9%;
62 |     --accent-foreground: 0 0% 98%;
63 |     --destructive: 0 62.8% 30.6%;
64 |     --destructive-foreground: 0 0% 98%;
65 |     --border: 0 0% 14.9%;
66 |     --input: 0 0% 14.9%;
67 |     --ring: 0 0% 83.1%;
68 |     --chart-1: 220 70% 50%;
69 |     --chart-2: 160 60% 45%;
70 |     --chart-3: 30 80% 55%;
71 |     --chart-4: 280 65% 60%;
72 |     --chart-5: 340 75% 55%;
73 |     --sidebar-background: 240 5.9% 10%;
74 |     --sidebar-foreground: 240 4.8% 95.9%;
75 |     --sidebar-primary: 224.3 76.3% 48%;
76 |     --sidebar-primary-foreground: 0 0% 100%;
77 |     --sidebar-accent: 240 3.7% 15.9%;
78 |     --sidebar-accent-foreground: 240 4.8% 95.9%;
79 |     --sidebar-border: 240 3.7% 15.9%;
80 |     --sidebar-ring: 217.2 91.2% 59.8%;
81 |   }
82 | }
83 | 
84 | @layer base {
85 |   * {
86 |     @apply border-border;
87 |   }
88 |   body {
89 |     @apply bg-background text-foreground;
90 |   }
91 | }
```

app/layout.tsx
```
1 | /*
2 | <ai_context>
3 | The root server layout for the app.
4 | </ai_context>
5 | */
6 | 
7 | import {
8 |   createProfileAction,
9 |   getProfileByUserIdAction
10 | } from "@/actions/db/profiles-actions"
11 | import {
12 |   createUserAction,
13 |   getUserByClerkIdAction
14 | } from "@/actions/db/users-actions"
15 | import { Toaster } from "@/components/ui/toaster"
16 | import { PostHogPageview } from "@/components/utilities/posthog/posthog-pageview"
17 | import { PostHogUserIdentify } from "@/components/utilities/posthog/posthog-user-identity"
18 | import { Providers } from "@/components/utilities/providers"
19 | import { TailwindIndicator } from "@/components/utilities/tailwind-indicator"
20 | import { cn } from "@/lib/utils"
21 | import { ClerkProvider } from "@clerk/nextjs"
22 | import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
23 | import type { Metadata } from "next"
24 | import { Inter } from "next/font/google"
25 | import "./globals.css"
26 | 
27 | const inter = Inter({ subsets: ["latin"] })
28 | 
29 | export const metadata: Metadata = {
30 |   title: "RepairWise AI | Smart Apartment Maintenance Management",
31 |   description:
32 |     "AI-powered apartment maintenance and repair management system. Streamline tenant requests, automate responses, and manage repairs efficiently."
33 | }
34 | 
35 | export default async function RootLayout({
36 |   children
37 | }: {
38 |   children: React.ReactNode
39 | }) {
40 |   const { userId } = await auth()
41 | 
42 |   if (userId) {
43 |     // Get user data from Clerk
44 |     const user = await currentUser()
45 |     const clerk = await clerkClient()
46 | 
47 |     // Check if user exists in our DB
48 |     const userResult = await getUserByClerkIdAction(userId)
49 | 
50 |     // If user doesn't exist in our DB, create them
51 |     if (!userResult.isSuccess || !userResult.data) {
52 |       if (user) {
53 |         const newUser = await createUserAction({
54 |           id: userId,
55 |           clerkId: userId,
56 |           email: user.emailAddresses[0]?.emailAddress || "",
57 |           fullName: `${user.firstName} ${user.lastName}`.trim(),
58 |           role: "tenant"
59 |         })
60 | 
61 |         // Sync role to Clerk metadata
62 |         if (newUser.isSuccess) {
63 |           await clerk.users.updateUser(userId, {
64 |             publicMetadata: { role: "tenant" }
65 |           })
66 |         }
67 |       }
68 |     } else {
69 |       // Sync existing user's role to Clerk metadata
70 |       await clerk.users.updateUser(userId, {
71 |         publicMetadata: { role: userResult.data.role }
72 |       })
73 |     }
74 | 
75 |     // Create profile if it doesn't exist
76 |     const profileRes = await getProfileByUserIdAction(userId)
77 |     if (!profileRes.isSuccess) {
78 |       await createProfileAction({ userId })
79 |     }
80 |   }
81 | 
82 |   return (
83 |     <ClerkProvider>
84 |       <html lang="en" suppressHydrationWarning>
85 |         <body
86 |           className={cn(
87 |             "bg-background mx-auto min-h-screen w-full scroll-smooth antialiased",
88 |             inter.className
89 |           )}
90 |         >
91 |           <Providers
92 |             attribute="class"
93 |             defaultTheme="light"
94 |             enableSystem={false}
95 |             disableTransitionOnChange
96 |           >
97 |             <PostHogUserIdentify />
98 |             <PostHogPageview />
99 | 
100 |             {children}
101 | 
102 |             <TailwindIndicator />
103 | 
104 |             <Toaster />
105 |           </Providers>
106 |         </body>
107 |       </html>
108 |     </ClerkProvider>
109 |   )
110 | }
```

components/header.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides the header for the app.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { Button } from "@/components/ui/button"
10 | import {
11 |   SignedIn,
12 |   SignedOut,
13 |   SignInButton,
14 |   SignUpButton,
15 |   UserButton,
16 |   useUser
17 | } from "@clerk/nextjs"
18 | import { Menu, Rocket, X } from "lucide-react"
19 | import Link from "next/link"
20 | import { useEffect, useState } from "react"
21 | import { ThemeSwitcher } from "./utilities/theme-switcher"
22 | 
23 | const navLinks = [
24 |   { href: "/about", label: "About" },
25 |   { href: "/pricing", label: "Pricing" },
26 |   { href: "/contact", label: "Contact" }
27 | ]
28 | 
29 | export default function Header() {
30 |   const [isMenuOpen, setIsMenuOpen] = useState(false)
31 |   const [isScrolled, setIsScrolled] = useState(false)
32 |   const { user } = useUser()
33 |   const userRole = user?.publicMetadata?.role as string
34 | 
35 |   const signedInLinks = [
36 |     {
37 |       href: userRole === "staff" ? "/staff/tickets" : "/tenant/tickets",
38 |       label: "Maintenance"
39 |     }
40 |   ]
41 | 
42 |   const toggleMenu = () => {
43 |     setIsMenuOpen(!isMenuOpen)
44 |   }
45 | 
46 |   useEffect(() => {
47 |     const handleScroll = () => {
48 |       setIsScrolled(window.scrollY > 0)
49 |     }
50 | 
51 |     window.addEventListener("scroll", handleScroll)
52 |     return () => window.removeEventListener("scroll", handleScroll)
53 |   }, [])
54 | 
55 |   return (
56 |     <header
57 |       className={`sticky top-0 z-50 transition-colors ${
58 |         isScrolled
59 |           ? "bg-background/80 shadow-sm backdrop-blur-sm"
60 |           : "bg-background"
61 |       }`}
62 |     >
63 |       <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-4">
64 |         <div className="flex items-center space-x-2 hover:cursor-pointer hover:opacity-80">
65 |           <Rocket className="size-6" />
66 |           <Link href="/" className="flex items-center">
67 |             <span className="text-lg font-semibold">RepairWise</span>
68 |           </Link>
69 |         </div>
70 | 
71 |         <nav className="absolute left-1/2 hidden -translate-x-1/2 space-x-2 font-semibold md:flex">
72 |           {navLinks.map(link => (
73 |             <Link
74 |               key={link.href}
75 |               href={link.href}
76 |               className="rounded-full px-3 py-1 hover:opacity-80"
77 |             >
78 |               {link.label}
79 |             </Link>
80 |           ))}
81 | 
82 |           <SignedIn>
83 |             {signedInLinks.map(link => (
84 |               <Link
85 |                 key={link.href}
86 |                 href={link.href}
87 |                 className="rounded-full px-3 py-1 hover:opacity-80"
88 |               >
89 |                 {link.label}
90 |               </Link>
91 |             ))}
92 |           </SignedIn>
93 |         </nav>
94 | 
95 |         <div className="flex items-center space-x-4">
96 |           <ThemeSwitcher />
97 | 
98 |           <SignedOut>
99 |             <Link href="/login">
100 |               <Button variant="outline">Login</Button>
101 |             </Link>
102 | 
103 |             <Link href="/signup">
104 |               <Button className="bg-blue-500 hover:bg-blue-600">Sign Up</Button>
105 |             </Link>
106 |           </SignedOut>
107 | 
108 |           <SignedIn>
109 |             <UserButton afterSignOutUrl="/" />
110 |           </SignedIn>
111 | 
112 |           <div className="md:hidden">
113 |             <Button
114 |               variant="ghost"
115 |               size="icon"
116 |               onClick={toggleMenu}
117 |               aria-label="Toggle menu"
118 |             >
119 |               {isMenuOpen ? (
120 |                 <X className="size-6" />
121 |               ) : (
122 |                 <Menu className="size-6" />
123 |               )}
124 |             </Button>
125 |           </div>
126 |         </div>
127 |       </div>
128 | 
129 |       {isMenuOpen && (
130 |         <nav className="bg-primary-foreground text-primary p-4 md:hidden">
131 |           <ul className="space-y-2">
132 |             <li>
133 |               <Link
134 |                 href="/"
135 |                 className="block hover:underline"
136 |                 onClick={toggleMenu}
137 |               >
138 |                 Home
139 |               </Link>
140 |             </li>
141 |             {navLinks.map(link => (
142 |               <li key={link.href}>
143 |                 <Link
144 |                   href={link.href}
145 |                   className="block hover:underline"
146 |                   onClick={toggleMenu}
147 |                 >
148 |                   {link.label}
149 |                 </Link>
150 |               </li>
151 |             ))}
152 |             <SignedIn>
153 |               {signedInLinks.map(link => (
154 |                 <li key={link.href}>
155 |                   <Link
156 |                     href={link.href}
157 |                     className="block hover:underline"
158 |                     onClick={toggleMenu}
159 |                   >
160 |                     {link.label}
161 |                   </Link>
162 |                 </li>
163 |               ))}
164 |             </SignedIn>
165 |           </ul>
166 |         </nav>
167 |       )}
168 |     </header>
169 |   )
170 | }
```

db/db.ts
```
1 | /*
2 | <ai_context>
3 | Initializes the database connection and schema for the app.
4 | </ai_context>
5 | */
6 | 
7 | import {
8 |   profilesTable,
9 |   ticketMessagesTable,
10 |   ticketsTable,
11 |   todosTable,
12 |   usersTable,
13 |   organizationsTable,
14 |   propertiesTable,
15 |   userRolesTable,
16 |   invitesTable
17 | } from "@/db/schema"
18 | import { relations } from "drizzle-orm"
19 | import { drizzle } from "drizzle-orm/postgres-js"
20 | import postgres from "postgres"
21 | 
22 | if (!process.env.DATABASE_URL) {
23 |   throw new Error("DATABASE_URL is not set")
24 | }
25 | 
26 | const connectionString = process.env.DATABASE_URL
27 | 
28 | // Log connection attempt without exposing credentials
29 | console.log(
30 |   "Connecting to database:",
31 |   connectionString.replace(/postgres:\/\/[^@]+@/, "postgres://****:****@")
32 | )
33 | 
34 | const client = postgres(connectionString, {
35 |   prepare: false,
36 |   ssl: process.env.NODE_ENV === "production"
37 | })
38 | 
39 | // Define relations
40 | export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
41 |   user: one(usersTable, {
42 |     fields: [userRolesTable.userId],
43 |     references: [usersTable.id]
44 |   }),
45 |   organization: one(organizationsTable, {
46 |     fields: [userRolesTable.orgId],
47 |     references: [organizationsTable.id]
48 |   }),
49 |   property: one(propertiesTable, {
50 |     fields: [userRolesTable.propertyId],
51 |     references: [propertiesTable.id]
52 |   })
53 | }))
54 | 
55 | export const invitesRelations = relations(invitesTable, ({ one }) => ({
56 |   organization: one(organizationsTable, {
57 |     fields: [invitesTable.orgId],
58 |     references: [organizationsTable.id]
59 |   }),
60 |   property: one(propertiesTable, {
61 |     fields: [invitesTable.propertyId],
62 |     references: [propertiesTable.id]
63 |   }),
64 |   invitedBy: one(usersTable, {
65 |     fields: [invitesTable.invitedByUserId],
66 |     references: [usersTable.id]
67 |   })
68 | }))
69 | 
70 | const schema = {
71 |   profiles: profilesTable,
72 |   todos: todosTable,
73 |   users: usersTable,
74 |   tickets: ticketsTable,
75 |   ticketMessages: ticketMessagesTable,
76 |   organizations: organizationsTable,
77 |   properties: propertiesTable,
78 |   userRoles: userRolesTable,
79 |   invites: invitesTable
80 | }
81 | 
82 | export const db = drizzle(client, { schema })
```

hooks/use-mobile.tsx
```
1 | import * as React from "react"
2 | 
3 | const MOBILE_BREAKPOINT = 768
4 | 
5 | export function useIsMobile() {
6 |   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
7 | 
8 |   React.useEffect(() => {
9 |     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
10 |     const onChange = () => {
11 |       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
12 |     }
13 |     mql.addEventListener("change", onChange)
14 |     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
15 |     return () => mql.removeEventListener("change", onChange)
16 |   }, [])
17 | 
18 |   return !!isMobile
19 | }
```

hooks/use-toast.ts
```
1 | "use client"
2 | 
3 | // Inspired by react-hot-toast library
4 | import * as React from "react"
5 | 
6 | import type {
7 |   ToastActionElement,
8 |   ToastProps,
9 | } from "@/components/ui/toast"
10 | 
11 | const TOAST_LIMIT = 1
12 | const TOAST_REMOVE_DELAY = 1000000
13 | 
14 | type ToasterToast = ToastProps & {
15 |   id: string
16 |   title?: React.ReactNode
17 |   description?: React.ReactNode
18 |   action?: ToastActionElement
19 | }
20 | 
21 | const actionTypes = {
22 |   ADD_TOAST: "ADD_TOAST",
23 |   UPDATE_TOAST: "UPDATE_TOAST",
24 |   DISMISS_TOAST: "DISMISS_TOAST",
25 |   REMOVE_TOAST: "REMOVE_TOAST",
26 | } as const
27 | 
28 | let count = 0
29 | 
30 | function genId() {
31 |   count = (count + 1) % Number.MAX_SAFE_INTEGER
32 |   return count.toString()
33 | }
34 | 
35 | type ActionType = typeof actionTypes
36 | 
37 | type Action =
38 |   | {
39 |       type: ActionType["ADD_TOAST"]
40 |       toast: ToasterToast
41 |     }
42 |   | {
43 |       type: ActionType["UPDATE_TOAST"]
44 |       toast: Partial<ToasterToast>
45 |     }
46 |   | {
47 |       type: ActionType["DISMISS_TOAST"]
48 |       toastId?: ToasterToast["id"]
49 |     }
50 |   | {
51 |       type: ActionType["REMOVE_TOAST"]
52 |       toastId?: ToasterToast["id"]
53 |     }
54 | 
55 | interface State {
56 |   toasts: ToasterToast[]
57 | }
58 | 
59 | const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
60 | 
61 | const addToRemoveQueue = (toastId: string) => {
62 |   if (toastTimeouts.has(toastId)) {
63 |     return
64 |   }
65 | 
66 |   const timeout = setTimeout(() => {
67 |     toastTimeouts.delete(toastId)
68 |     dispatch({
69 |       type: "REMOVE_TOAST",
70 |       toastId: toastId,
71 |     })
72 |   }, TOAST_REMOVE_DELAY)
73 | 
74 |   toastTimeouts.set(toastId, timeout)
75 | }
76 | 
77 | export const reducer = (state: State, action: Action): State => {
78 |   switch (action.type) {
79 |     case "ADD_TOAST":
80 |       return {
81 |         ...state,
82 |         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
83 |       }
84 | 
85 |     case "UPDATE_TOAST":
86 |       return {
87 |         ...state,
88 |         toasts: state.toasts.map((t) =>
89 |           t.id === action.toast.id ? { ...t, ...action.toast } : t
90 |         ),
91 |       }
92 | 
93 |     case "DISMISS_TOAST": {
94 |       const { toastId } = action
95 | 
96 |       // ! Side effects ! - This could be extracted into a dismissToast() action,
97 |       // but I'll keep it here for simplicity
98 |       if (toastId) {
99 |         addToRemoveQueue(toastId)
100 |       } else {
101 |         state.toasts.forEach((toast) => {
102 |           addToRemoveQueue(toast.id)
103 |         })
104 |       }
105 | 
106 |       return {
107 |         ...state,
108 |         toasts: state.toasts.map((t) =>
109 |           t.id === toastId || toastId === undefined
110 |             ? {
111 |                 ...t,
112 |                 open: false,
113 |               }
114 |             : t
115 |         ),
116 |       }
117 |     }
118 |     case "REMOVE_TOAST":
119 |       if (action.toastId === undefined) {
120 |         return {
121 |           ...state,
122 |           toasts: [],
123 |         }
124 |       }
125 |       return {
126 |         ...state,
127 |         toasts: state.toasts.filter((t) => t.id !== action.toastId),
128 |       }
129 |   }
130 | }
131 | 
132 | const listeners: Array<(state: State) => void> = []
133 | 
134 | let memoryState: State = { toasts: [] }
135 | 
136 | function dispatch(action: Action) {
137 |   memoryState = reducer(memoryState, action)
138 |   listeners.forEach((listener) => {
139 |     listener(memoryState)
140 |   })
141 | }
142 | 
143 | type Toast = Omit<ToasterToast, "id">
144 | 
145 | function toast({ ...props }: Toast) {
146 |   const id = genId()
147 | 
148 |   const update = (props: ToasterToast) =>
149 |     dispatch({
150 |       type: "UPDATE_TOAST",
151 |       toast: { ...props, id },
152 |     })
153 |   const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
154 | 
155 |   dispatch({
156 |     type: "ADD_TOAST",
157 |     toast: {
158 |       ...props,
159 |       id,
160 |       open: true,
161 |       onOpenChange: (open) => {
162 |         if (!open) dismiss()
163 |       },
164 |     },
165 |   })
166 | 
167 |   return {
168 |     id: id,
169 |     dismiss,
170 |     update,
171 |   }
172 | }
173 | 
174 | function useToast() {
175 |   const [state, setState] = React.useState<State>(memoryState)
176 | 
177 |   React.useEffect(() => {
178 |     listeners.push(setState)
179 |     return () => {
180 |       const index = listeners.indexOf(setState)
181 |       if (index > -1) {
182 |         listeners.splice(index, 1)
183 |       }
184 |     }
185 |   }, [state])
186 | 
187 |   return {
188 |     ...state,
189 |     toast,
190 |     dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
191 |   }
192 | }
193 | 
194 | export { useToast, toast }
```

lib/stripe.ts
```
1 | /*
2 | <ai_context>
3 | Contains the Stripe configuration for the app.
4 | </ai_context>
5 | */
6 | 
7 | import Stripe from "stripe"
8 | 
9 | export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
10 |   apiVersion: "2024-06-20",
11 |   appInfo: {
12 |     name: "RepairWise",
13 |     version: "0.1.0"
14 |   }
15 | })
```

lib/utils.ts
```
1 | /*
2 | <ai_context>
3 | Contains the utility functions for the app.
4 | </ai_context>
5 | */
6 | 
7 | import { type ClassValue, clsx } from "clsx"
8 | import { twMerge } from "tailwind-merge"
9 | 
10 | export function cn(...inputs: ClassValue[]) {
11 |   return twMerge(clsx(inputs))
12 | }
```

project-docs/ai-todos.md
```
1 | # AI Tenant Management System - Phase 1 Checklist
2 | 
3 | ## Database Setup ✅
4 | - [x] Create robust database schema with AI-ready fields
5 | - [x] Set up user roles (Tenant and Staff)
6 | - [x] Configure Supabase and environment
7 | - [x] Create database actions
8 | 
9 | ## Core Schema Implementation ✅
10 | - [x] Users table with Clerk integration
11 | - [x] Tickets table with all necessary fields
12 | - [x] Ticket Messages table
13 | - [x] Status enums (Open, In Progress, Completed, etc.)
14 | - [x] Category enums (Maintenance, Billing, etc.)
15 | - [x] Priority levels (Low to Critical)
16 | 
17 | ## UI Components ✅
18 | ### Tenant Portal ✅
19 | - [x] Ticket submission form
20 | - [x] Ticket list view
21 | - [x] Individual ticket view
22 | 
23 | ### Staff Portal ✅
24 | - [x] Ticket management dashboard
25 | - [x] Ticket status updates
26 | - [x] Resolution details form
27 | 
28 | ## Routes Setup ✅
29 | - [x] Set up tenant routes (`/tenant/tickets/`)
30 | - [x] Set up staff routes (`/staff/tickets/`)
31 | - [x] Configure layouts for tenant portal
32 | - [x] Configure layouts for staff portal
33 | 
34 | ## Shared Components ✅
35 | - [x] `TicketForm.tsx` for creation/editing
36 | - [x] `TicketList.tsx` for displaying tickets
37 | - [x] Status update components
38 | - [x] Message thread component
39 | 
40 | ## Authentication & Authorization ✅
41 | - [x] Integrate Clerk auth for tenant routes
42 | - [x] Set up role-based access control
43 | - [x] Configure protected routes for staff
44 | 
45 | ### Important Implementation Notes
46 | - User creation happens automatically in root layout (`app/layout.tsx`)
47 | - All new users are created with "tenant" role by default
48 | - This ensures no foreign key errors when creating tickets/profiles
49 | - Future Considerations:
50 |   - Admin invite system will need to modify this flow
51 |   - Staff user creation will need a separate flow
52 |   - Role updates may need to be handled via admin dashboard
53 |   - Consider adding role verification webhooks with Clerk
54 | 
55 | ## Basic Functionality ✅
56 | - [x] Ticket creation flow
57 | - [x] Status update workflow
58 | - [x] Message thread system
59 | - [x] Basic filtering and sorting
60 | 
61 | ## Progress Updates
62 | 
63 | ### Update 1 - Database Setup Complete
64 | - ✅ All database schemas created
65 | - ✅ Enums and relationships established
66 | - ✅ Database actions implemented for CRUD operations
67 | - ✅ Supabase configuration completed
68 | 
69 | ### Update 2 - Core Shared Components
70 | - ✅ Created `TicketForm.tsx` with:
71 |   - Form validation using Zod
72 |   - All required fields (title, description, category, priority)
73 |   - Success/error handling with toasts
74 |   - Proper TypeScript types
75 | - ✅ Created `TicketList.tsx` with:
76 |   - Responsive table layout
77 |   - Visual status and priority indicators
78 |   - Clickable ticket titles
79 |   - Empty state handling
80 |   - Proper date formatting
81 | 
82 | ### Update 3 - Additional Shared Components
83 | - ✅ Created `TicketStatusUpdate.tsx` with:
84 |   - Status change functionality
85 |   - Resolution details for completed/closed tickets
86 |   - Time and cost tracking
87 |   - Conditional form fields based on status
88 | - ✅ Created `TicketMessageThread.tsx` with:
89 |   - Real-time message display
90 |   - Message composition
91 |   - Proper message styling and layout
92 |   - Empty state handling
93 |   - Date formatting for messages
94 | 
95 | ### Update 4 - Tenant Portal Implementation
96 | - ✅ Created tenant routes and layout
97 | - ✅ Implemented ticket list page with:
98 |   - List of all tenant's tickets
99 |   - New ticket button
100 |   - Status and priority indicators
101 | - ✅ Implemented new ticket page with:
102 |   - Ticket submission form
103 |   - Validation and error handling
104 |   - Redirect on success
105 | - ✅ Implemented ticket detail page with:
106 |   - Ticket information display
107 |   - Status and priority badges
108 |   - Message thread integration
109 |   - Resolution details when available
110 | 
111 | ### Update 5 - Staff Portal Implementation
112 | - ✅ Created staff routes and layout with role-based protection
113 | - ✅ Implemented ticket management dashboard with:
114 |   - List of all tickets
115 |   - Status and priority filters
116 |   - Quick status updates
117 | - ✅ Implemented staff ticket detail page with:
118 |   - Full ticket information display
119 |   - Status management panel
120 |   - Resolution details form
121 |   - Message thread integration
122 |   - Time and cost tracking
123 | 
124 | _All planned features for Phase 1 have been implemented. Ready for testing and review._ 
```

project-docs/current-project-overview.md
```
1 | # Current Project Overview
2 | 
3 | This is a tenant management system with the following structure and features:
4 | 
5 | ## Authentication & Authorization
6 | - Uses Clerk for authentication
7 | - Has two user roles: `tenant` and `staff`
8 | - Each user has a profile with membership status (`free` or `pro`)
9 | 
10 | ## Database Structure
11 | - `users`: Core user information with Clerk integration
12 | - `profiles`: Extended user information with Stripe subscription details
13 | - `tickets`: Support ticket system with rich metadata
14 | - `ticket_messages`: Communication thread for tickets
15 | - `todos`: Task management system
16 | 
17 | ## Application Structure
18 | - Separate routes for tenants and staff (`/tenant` and `/staff`)
19 | - Marketing pages under `(marketing)`
20 | - Authentication pages under `(auth)`
21 | - API routes under `api`
22 | 
23 | ## Key Features
24 | 
25 | ### Ticket Management System
26 | - Multiple categories:
27 |   - Maintenance
28 |   - Billing
29 |   - Noise complaints
30 |   - Other
31 | - Priority levels:
32 |   - Low
33 |   - Medium
34 |   - High
35 |   - Critical
36 | - Status tracking:
37 |   - Open
38 |   - In progress
39 |   - Completed
40 |   - Closed
41 |   - Completed by chat
42 | - Rich metadata:
43 |   - Cost and time estimation
44 |   - Chat history and summaries
45 |   - Resolution details
46 |   - Time spent tracking
47 |   - Cost tracking
48 | 
49 | ### User Management
50 | - Profile management
51 | - Role-based access control
52 | - Membership levels
53 | 
54 | ### Payment Integration
55 | - Stripe integration for pro memberships
56 | - Customer and subscription tracking
57 | 
58 | ## Tech Stack
59 | 
60 | ### Frontend
61 | - Next.js
62 | - Tailwind CSS
63 | - Shadcn components
64 | - Framer Motion
65 | 
66 | ### Backend
67 | - Server Actions
68 | - Drizzle ORM
69 | - PostgreSQL (via Supabase)
70 | 
71 | ### Services
72 | - Authentication: Clerk
73 | - Database: Supabase
74 | - Payments: Stripe
75 | - Analytics: PostHog
76 | - Deployment: Vercel
77 | 
78 | ## Best Practices Implementation
79 | - Type safety throughout with TypeScript
80 | - Server-side rendering with Next.js
81 | - Structured database schema with relationships
82 | - Clear separation of concerns between tenant and staff interfaces
83 | - Comprehensive error handling and state management
84 | 
85 | ## Project Structure
86 | - `actions` - Server actions
87 |   - `db` - Database related actions
88 |   - Other actions
89 | - `app` - Next.js app router
90 |   - `api` - API routes
91 |   - Route-specific components and layouts
92 | - `components` - Shared components
93 |   - `ui` - UI components
94 |   - `utilities` - Utility components
95 | - `db` - Database
96 |   - `schema` - Database schemas
97 | - `lib` - Library code
98 |   - `hooks` - Custom hooks
99 | - `prompts` - Prompt files
100 | - `public` - Static assets
101 | - `types` - Type definitions 
102 | 
103 | ## How to Update This Document
104 | 
105 | When updating this document after adding new features or making changes, follow these steps:
106 | 
107 | 1. **Code Analysis**
108 |    ```bash
109 |    # Directories to check for changes
110 |    - app/          # New routes or pages
111 |    - actions/      # New server actions
112 |    - components/   # New shared components
113 |    - db/schema/    # Schema changes
114 |    - types/        # New type definitions
115 |    ```
116 | 
117 | 2. **Feature Updates**
118 |    - Add new features under the appropriate section in "Key Features"
119 |    - If creating a new feature category, add a new subsection
120 |    - Update feature lists to reflect any removed or modified features
121 | 
122 | 3. **Structure Changes**
123 |    - Update "Application Structure" if new route patterns are added
124 |    - Update "Project Structure" if new directories or major files are added
125 |    - Update "Database Structure" if new tables or relationships are added
126 | 
127 | 4. **Tech Stack Updates**
128 |    - Add new technologies under the appropriate category
129 |    - Remove deprecated technologies
130 |    - Update versions if significant changes occur
131 | 
132 | 5. **Best Practices**
133 |    - Update if new patterns or practices are established
134 |    - Remove outdated practices
135 | 
136 | 6. **Verification Steps**
137 |    - Cross-reference with `schema-info.md` for database changes
138 |    - Check app router structure for route changes
139 |    - Review server actions for new functionality
140 |    - Check component library for UI changes
141 | 
142 | 7. **Date and Version**
143 |    - Add a note at the top of the document with the date of the last update
144 |    - If versioning is implemented, update the version number
145 | 
146 | Note: This document should be updated whenever significant changes are made to the application structure, features, or technology stack. Minor changes (like bug fixes or small tweaks) don't need to be documented here unless they affect the overall architecture or feature set. 
```

project-docs/roles-invites-todo.md
```
1 | # Multi-Org, Multi-Property Roles & Invites - Todo List
2 | 
3 | ## Completed Features ✅
4 | 
5 | ### 1. Database Schema
6 | - [x] Organizations table
7 | - [x] Properties table
8 | - [x] User Roles table
9 | - [x] Invites table
10 | - [x] Added propertyId to Tickets table
11 | 
12 | ### 2. Server Actions
13 | - [x] Create organization
14 | - [x] Create property
15 | - [x] Create/manage invites
16 | - [x] Accept invites
17 | - [x] Bulk assign users to properties
18 | 
19 | ### 3. Invite System
20 | - [x] Invite creation
21 | - [x] Token generation
22 | - [x] Invite acceptance flow
23 | - [x] Status management
24 | 
25 | ### 4. UI Components
26 | - [x] Property management
27 | - [x] Invite management
28 | - [x] Bulk assignment interface
29 | 
30 | ## Remaining Tasks 🔄
31 | 
32 | ### 1. New User Flow
33 | - [ ] Create organization page after signup
34 | - [ ] Initial property creation wizard
35 | - [ ] Organization selection interface
36 | 
37 | ### 2. Role-Based Access Control
38 | - [ ] Implement ticket filtering based on user roles
39 | - [ ] Add role checks to existing ticket pages
40 | - [ ] Update ticket queries to respect property access
41 | 
42 | ### 3. Dashboard Updates
43 | - [ ] Organization switcher
44 | - [ ] Role-based navigation
45 | - [ ] Property-specific views
46 | 
47 | ### 4. Type Fixes
48 | - [ ] Add missing ActionState type
49 | - [ ] Fix Clerk auth type issues
50 | - [ ] Fix component import errors
51 | 
52 | ### 5. Testing Setup
53 | - [ ] Add test data creation scripts
54 | - [ ] Add role-based test cases
55 | - [ ] Test invite flow end-to-end
56 | 
57 | ## Implementation Priority
58 | 
59 | 1. Fix type issues
60 | 2. Implement new user flow
61 | 3. Add role-based access control
62 | 4. Update dashboard
63 | 5. Add testing setup
64 | 
65 | ## Notes
66 | 
67 | - Type fixes should be addressed first to ensure stable development
68 | - New user flow is critical for onboarding
69 | - Role-based access control is essential for security
70 | - Dashboard updates will improve UX
71 | - Testing setup will ensure reliability
72 | 
73 | ## Next Steps
74 | 
75 | 1. Begin with type fixes:
76 |    - Add ActionState type
77 |    - Resolve Clerk auth types
78 |    - Fix component imports
79 | 
80 | 2. Then move to new user flow:
81 |    - Design organization creation flow
82 |    - Implement property creation wizard
83 |    - Add organization selection
84 | 
85 | 3. Follow with role-based access:
86 |    - Implement ticket filtering
87 |    - Add role checks
88 |    - Update queries 
```

project-docs/schema-info.md
```
1 | # Database Schema Documentation
2 | 
3 | ## How to Get Current Schema
4 | 
5 | Run these queries in the Supabase SQL Editor or via psql (requires PostgreSQL client) to get the current schema:
6 | 
7 | ```sql
8 | -- Show all enum types and their values
9 | SELECT 
10 |     t.typname AS enum_name,
11 |     e.enumlabel AS enum_value
12 | FROM pg_type t 
13 | JOIN pg_enum e ON t.oid = e.enumtypid  
14 | JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
15 | WHERE n.nspname = 'public'
16 | ORDER BY enum_name, e.enumsortorder;
17 | 
18 | -- Show all tables and their columns
19 | SELECT 
20 |     t.table_name,
21 |     c.column_name,
22 |     c.data_type,
23 |     c.column_default,
24 |     c.is_nullable,
25 |     c.character_maximum_length,
26 |     tc.constraint_type,
27 |     cc.table_name as referenced_table,
28 |     cc.column_name as referenced_column
29 | FROM information_schema.tables t
30 | LEFT JOIN information_schema.columns c 
31 |     ON t.table_name = c.table_name 
32 |     AND t.table_schema = c.table_schema
33 | LEFT JOIN information_schema.key_column_usage kcu
34 |     ON c.column_name = kcu.column_name 
35 |     AND c.table_name = kcu.table_name
36 |     AND c.table_schema = kcu.table_schema
37 | LEFT JOIN information_schema.table_constraints tc
38 |     ON kcu.constraint_name = tc.constraint_name
39 |     AND kcu.table_schema = tc.table_schema
40 | LEFT JOIN information_schema.constraint_column_usage cc
41 |     ON tc.constraint_name = cc.constraint_name
42 |     AND tc.table_schema = cc.table_schema
43 | WHERE t.table_schema = 'public'
44 |     AND t.table_type = 'BASE TABLE'
45 | ORDER BY 
46 |     t.table_name,
47 |     c.ordinal_position;
48 | 
49 | -- Show all indexes
50 | SELECT
51 |     tablename as table_name,
52 |     indexname as index_name,
53 |     indexdef as index_definition
54 | FROM pg_indexes
55 | WHERE schemaname = 'public'
56 | ORDER BY tablename, indexname;
57 | ```
58 | 
59 | ## Current Schema (as of January 23, 2024)
60 | 
61 | ### Enum Types
62 | 
63 | ```sql
64 | enum membership {
65 |     free
66 |     pro
67 | }
68 | 
69 | enum ticket_category {
70 |     maintenance
71 |     billing
72 |     noise_complaint
73 |     other
74 | }
75 | 
76 | enum ticket_priority {
77 |     low
78 |     medium
79 |     high
80 |     critical
81 | }
82 | 
83 | enum ticket_status {
84 |     open
85 |     in_progress
86 |     completed
87 |     closed
88 |     completed_by_chat
89 | }
90 | 
91 | enum user_role {
92 |     tenant
93 |     staff
94 | }
95 | ```
96 | 
97 | ### Tables
98 | 
99 | #### users
100 | ```sql
101 | CREATE TABLE users (
102 |     id text PRIMARY KEY NOT NULL,
103 |     clerk_id text NOT NULL UNIQUE,
104 |     role user_role NOT NULL DEFAULT 'tenant',
105 |     email text NOT NULL,
106 |     full_name text,
107 |     created_at timestamp NOT NULL DEFAULT now(),
108 |     updated_at timestamp NOT NULL DEFAULT now()
109 | );
110 | ```
111 | 
112 | #### profiles
113 | ```sql
114 | CREATE TABLE profiles (
115 |     user_id text PRIMARY KEY NOT NULL,
116 |     membership membership NOT NULL DEFAULT 'free',
117 |     stripe_customer_id text,
118 |     stripe_subscription_id text,
119 |     created_at timestamp NOT NULL DEFAULT now(),
120 |     updated_at timestamp NOT NULL DEFAULT now()
121 | );
122 | ```
123 | 
124 | #### tickets
125 | ```sql
126 | CREATE TABLE tickets (
127 |     id text PRIMARY KEY NOT NULL,
128 |     tenant_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
129 |     title text NOT NULL,
130 |     description text NOT NULL,
131 |     status ticket_status NOT NULL DEFAULT 'open',
132 |     category ticket_category NOT NULL,
133 |     priority ticket_priority NOT NULL DEFAULT 'low',
134 |     cost_estimate text,
135 |     time_estimate text,
136 |     emergency_level text,
137 |     user_tone text,
138 |     chat_history jsonb,
139 |     chat_summary text,
140 |     resolution_details text,
141 |     time_spent text,
142 |     cost_incurred text,
143 |     created_at timestamp NOT NULL DEFAULT now(),
144 |     updated_at timestamp NOT NULL DEFAULT now(),
145 |     closed_at timestamp
146 | );
147 | ```
148 | 
149 | #### ticket_messages
150 | ```sql
151 | CREATE TABLE ticket_messages (
152 |     id text PRIMARY KEY NOT NULL,
153 |     ticket_id text NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
154 |     sender_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
155 |     message text NOT NULL,
156 |     created_at timestamp NOT NULL DEFAULT now(),
157 |     updated_at timestamp NOT NULL DEFAULT now()
158 | );
159 | ```
160 | 
161 | #### todos
162 | ```sql
163 | CREATE TABLE todos (
164 |     id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
165 |     user_id text NOT NULL,
166 |     content text NOT NULL,
167 |     completed boolean NOT NULL DEFAULT false,
168 |     created_at timestamp NOT NULL DEFAULT now(),
169 |     updated_at timestamp NOT NULL DEFAULT now()
170 | );
171 | ```
172 | 
173 | ### Indexes
174 | ```sql
175 | -- profiles
176 | CREATE UNIQUE INDEX profiles_pkey ON profiles USING btree (user_id);
177 | 
178 | -- ticket_messages
179 | CREATE UNIQUE INDEX ticket_messages_pkey ON ticket_messages USING btree (id);
180 | 
181 | -- tickets
182 | CREATE UNIQUE INDEX tickets_pkey ON tickets USING btree (id);
183 | 
184 | -- todos
185 | CREATE UNIQUE INDEX todos_pkey ON todos USING btree (id);
186 | 
187 | -- users
188 | CREATE UNIQUE INDEX users_clerk_id_unique ON users USING btree (clerk_id);
189 | CREATE UNIQUE INDEX users_pkey ON users USING btree (id);
190 | ```
191 | 
192 | ## How to Update This Document
193 | 
194 | 1. Get access to the database (either through Supabase SQL Editor or database connection string)
195 | 2. Run the queries from the "How to Get Current Schema" section
196 | 3. Update the sections in this document with the new schema information
197 | 4. Add a note in the document header with the new date of the update
198 | 
199 | Note: Never include sensitive information like connection strings or credentials in this document. These should be stored in environment variables and accessed securely when needed. 
```

prompts/perplexity.md
```
1 | # Perplexity Instructions
2 | 
3 | Follow these instructions to use Perplexity:
4 | 
5 | - think carefully about the user's query
6 | - generate a prompt to help search for an answer
7 | - then with the prompt create a clickable link: [component name](https://www.perplexity.ai/?q={prompt})
8 | - make sure prompt is url encoded
9 | - only return the link
```

prompts/v0.md
```
1 | # V0 Instructions
2 | 
3 | Follow these instructions to use V0:
4 | 
5 | - think carefully about the component
6 | - generate a prompt
7 | - then with the prompt create a clickable link: [component name](https://v0.dev/chat?q={prompt})
8 | - make sure prompt is url encoded
```

types/actions-types.ts
```
1 | /*
2 | <ai_context>
3 | Contains the general server action types.
4 | </ai_context>
5 | */
6 | 
7 | export type ActionState<T> =
8 |   | { isSuccess: true; message: string; data: T }
9 |   | { isSuccess: false; message: string; data?: never } 
```

types/auth-types.ts
```
1 | /*
2 | <ai_context>
3 | Defines the auth types for the app.
4 | </ai_context>
5 | */
6 | 
7 | import { auth } from "@clerk/nextjs/server"
8 | 
9 | // Extend the auth type to include userId
10 | export type Auth = Awaited<ReturnType<typeof auth>> & {
11 |   userId: string | null
12 | } 
```

types/index.ts
```
1 | /*
2 | <ai_context>
3 | Exports the types for the app.
4 | </ai_context>
5 | */
6 | 
7 | // Action Types
8 | export * from "./actions-types"
9 | 
10 | // Auth Types
11 | export * from "./auth-types"
12 | 
13 | // Organization Types
14 | export * from "./organizations-types"
15 | export * from "./properties-types"
16 | export * from "./roles-types"
17 | export * from "./invites-types"
18 | 
19 | // Feature Types
20 | export * from "./tickets-types"
21 | export * from "./profiles-types"
```

types/invites-types.ts
```
1 | import { SelectInvite } from "@/db/schema"
2 | import { OrgRole } from "./roles-types"
3 | 
4 | export type InviteStatus = "PENDING" | "ACCEPTED" | "EXPIRED" | "CANCELED"
5 | 
6 | export interface Invite extends SelectInvite {
7 |   id: string
8 |   email: string
9 |   orgId: string
10 |   propertyId: string | null
11 |   role: OrgRole
12 |   token: string
13 |   status: InviteStatus
14 |   expiresAt: Date
15 |   invitedByUserId: string
16 |   createdAt: Date
17 | }
18 | 
19 | export interface CreateInviteInput {
20 |   email: string
21 |   orgId: string
22 |   propertyId?: string
23 |   role: OrgRole
24 |   expiresInDays?: number // Optional, defaults to 7 in the action
25 | }
26 | 
27 | export interface UpdateInviteInput {
28 |   id: string
29 |   status: InviteStatus
30 | }
31 | 
32 | export interface InviteWithDetails extends Invite {
33 |   organization: {
34 |     id: string
35 |     name: string
36 |   }
37 |   property?: {
38 |     id: string
39 |     name: string
40 |   } | null
41 |   invitedBy: {
42 |     id: string
43 |     fullName: string | null
44 |     email: string
45 |   }
46 | } 
```

types/organizations-types.ts
```
1 | import { SelectOrganization } from "@/db/schema"
2 | 
3 | export interface Organization extends SelectOrganization {
4 |   id: string
5 |   name: string
6 |   createdAt: Date
7 |   updatedAt: Date
8 | }
9 | 
10 | export interface CreateOrganizationInput {
11 |   name: string
12 | }
13 | 
14 | export interface UpdateOrganizationInput extends Partial<CreateOrganizationInput> {
15 |   id: string
16 | } 
```

types/profiles-types.ts
```
1 | import { SelectProfile } from "@/db/schema"
2 | 
3 | export interface Profile extends SelectProfile {
4 |   id: string
5 |   userId: string
6 |   fullName: string | null
7 |   email: string
8 |   createdAt: Date
9 |   updatedAt: Date
10 | }
11 | 
12 | export interface CreateProfileInput {
13 |   userId: string
14 |   fullName: string | null
15 |   email: string
16 | }
17 | 
18 | export interface UpdateProfileInput {
19 |   id: string
20 |   fullName: string | null
21 | } 
```

types/properties-types.ts
```
1 | import { SelectProperty } from "@/db/schema"
2 | 
3 | export interface Property extends SelectProperty {
4 |   id: string
5 |   orgId: string
6 |   name: string
7 |   createdAt: Date
8 |   updatedAt: Date
9 | }
10 | 
11 | export interface CreatePropertyInput {
12 |   orgId: string
13 |   name: string
14 | }
15 | 
16 | export interface UpdatePropertyInput extends Partial<Omit<CreatePropertyInput, "orgId">> {
17 |   id: string
18 | } 
```

types/roles-types.ts
```
1 | import { SelectUserRole } from "@/db/schema"
2 | 
3 | export type OrgRole = "ADMIN" | "EMPLOYEE" | "MAINTENANCE" | "TENANT"
4 | 
5 | export interface UserRole extends SelectUserRole {
6 |   id: string
7 |   userId: string
8 |   orgId: string
9 |   propertyId: string | null
10 |   role: OrgRole
11 |   createdAt: Date
12 | }
13 | 
14 | export interface CreateUserRoleInput {
15 |   userId: string
16 |   orgId: string
17 |   propertyId?: string
18 |   role: OrgRole
19 | }
20 | 
21 | export interface UpdateUserRoleInput extends Partial<Omit<CreateUserRoleInput, "userId" | "orgId">> {
22 |   id: string
23 | }
24 | 
25 | export interface UserRoleWithDetails extends UserRole {
26 |   organization: {
27 |     id: string
28 |     name: string
29 |   }
30 |   property?: {
31 |     id: string
32 |     name: string
33 |   } | null
34 | } 
```

types/tickets-types.ts
```
1 | import { SelectTicket } from "@/db/schema"
2 | 
3 | export type TicketStatus = "open" | "in_progress" | "completed" | "closed" | "completed_by_chat"
4 | export type TicketPriority = "low" | "medium" | "high" | "critical"
5 | export type TicketCategory = "maintenance" | "other" | "billing" | "noise_complaint"
6 | 
7 | export interface Ticket extends SelectTicket {
8 |   id: string
9 |   title: string
10 |   description: string
11 |   category: TicketCategory
12 |   priority: TicketPriority
13 |   status: TicketStatus
14 |   propertyId: string
15 |   userId: string
16 |   createdAt: Date
17 |   updatedAt: Date
18 | }
19 | 
20 | export interface CreateTicketInput {
21 |   title: string
22 |   description: string
23 |   category: TicketCategory
24 |   priority: TicketPriority
25 |   propertyId: string
26 | }
27 | 
28 | export interface UpdateTicketInput {
29 |   id: string
30 |   status: TicketStatus
31 |   resolution?: string
32 |   timeSpent?: number
33 |   costIncurred?: number
34 | } 
```

.husky/_/applypatch-msg
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/commit-msg
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/h
```
1 | #!/usr/bin/env sh
2 | [ "$HUSKY" = "2" ] && set -x
3 | n=$(basename "$0")
4 | s=$(dirname "$(dirname "$0")")/$n
5 | 
6 | [ ! -f "$s" ] && exit 0
7 | 
8 | if [ -f "$HOME/.huskyrc" ]; then
9 | 	echo "husky - '~/.huskyrc' is DEPRECATED, please move your code to ~/.config/husky/init.sh"
10 | fi
11 | i="${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh"
12 | [ -f "$i" ] && . "$i"
13 | 
14 | [ "${HUSKY-}" = "0" ] && exit 0
15 | 
16 | export PATH="node_modules/.bin:$PATH"
17 | sh -e "$s" "$@"
18 | c=$?
19 | 
20 | [ $c != 0 ] && echo "husky - $n script failed (code $c)"
21 | [ $c = 127 ] && echo "husky - command not found in PATH=$PATH"
22 | exit $c
```

.husky/_/husky.sh
```
1 | echo "husky - DEPRECATED
2 | 
3 | Please remove the following two lines from $0:
4 | 
5 | #!/usr/bin/env sh
6 | . \"\$(dirname -- \"\$0\")/_/husky.sh\"
7 | 
8 | They WILL FAIL in v10.0.0
9 | "
```

.husky/_/post-applypatch
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/post-checkout
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/post-commit
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/post-merge
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/post-rewrite
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/pre-applypatch
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/pre-auto-gc
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/pre-commit
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/pre-merge-commit
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/pre-push
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/pre-rebase
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

.husky/_/prepare-commit-msg
```
1 | #!/usr/bin/env sh
2 | . "$(dirname "$0")/h"
```

actions/db/invites-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import { invitesTable, userRolesTable, organizationsTable, propertiesTable, usersTable } from "@/db/schema"
5 | import {
6 |   ActionState,
7 |   CreateInviteInput,
8 |   Invite,
9 |   InviteWithDetails
10 | } from "@/types"
11 | import { auth } from "@clerk/nextjs/server"
12 | import { and, eq } from "drizzle-orm"
13 | import { nanoid } from "nanoid"
14 | 
15 | export async function createInviteAction(
16 |   input: CreateInviteInput
17 | ): Promise<ActionState<{ invite: Invite; inviteLink: string }>> {
18 |   try {
19 |     const authData = await auth()
20 |     const userId = authData.userId
21 | 
22 |     if (!userId) {
23 |       return {
24 |         isSuccess: false,
25 |         message: "You must be logged in to create an invite"
26 |       }
27 |     }
28 | 
29 |     const token = nanoid()
30 |     const expiresAt = new Date()
31 |     expiresAt.setDate(expiresAt.getDate() + (input.expiresInDays || 7))
32 | 
33 |     const [invite] = await db
34 |       .insert(invitesTable)
35 |       .values({
36 |         email: input.email,
37 |         orgId: input.orgId,
38 |         propertyId: input.propertyId,
39 |         role: input.role,
40 |         token,
41 |         expiresAt,
42 |         invitedByUserId: userId
43 |       })
44 |       .returning()
45 | 
46 |     const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite?token=${token}`
47 | 
48 |     return {
49 |       isSuccess: true,
50 |       message: "Invite created successfully",
51 |       data: {
52 |         invite: invite as Invite,
53 |         inviteLink
54 |       }
55 |     }
56 |   } catch (error) {
57 |     console.error("Error creating invite:", error)
58 |     return { isSuccess: false, message: "Failed to create invite" }
59 |   }
60 | }
61 | 
62 | export async function getInviteByTokenAction(
63 |   token: string
64 | ): Promise<ActionState<InviteWithDetails>> {
65 |   try {
66 |     const [invite] = await db
67 |       .select({
68 |         id: invitesTable.id,
69 |         email: invitesTable.email,
70 |         orgId: invitesTable.orgId,
71 |         propertyId: invitesTable.propertyId,
72 |         role: invitesTable.role,
73 |         token: invitesTable.token,
74 |         status: invitesTable.status,
75 |         expiresAt: invitesTable.expiresAt,
76 |         invitedByUserId: invitesTable.invitedByUserId,
77 |         createdAt: invitesTable.createdAt,
78 |         organization: {
79 |           id: organizationsTable.id,
80 |           name: organizationsTable.name
81 |         },
82 |         property: {
83 |           id: propertiesTable.id,
84 |           name: propertiesTable.name
85 |         },
86 |         invitedBy: {
87 |           id: usersTable.id,
88 |           fullName: usersTable.fullName,
89 |           email: usersTable.email
90 |         }
91 |       })
92 |       .from(invitesTable)
93 |       .leftJoin(
94 |         organizationsTable,
95 |         eq(invitesTable.orgId, organizationsTable.id)
96 |       )
97 |       .leftJoin(
98 |         propertiesTable,
99 |         eq(invitesTable.propertyId, propertiesTable.id)
100 |       )
101 |       .leftJoin(
102 |         usersTable,
103 |         eq(invitesTable.invitedByUserId, usersTable.id)
104 |       )
105 |       .where(eq(invitesTable.token, token))
106 | 
107 |     if (!invite) {
108 |       return {
109 |         isSuccess: false,
110 |         message: "Invite not found"
111 |       }
112 |     }
113 | 
114 |     return {
115 |       isSuccess: true,
116 |       message: "Invite retrieved successfully",
117 |       data: invite as InviteWithDetails
118 |     }
119 |   } catch (error) {
120 |     console.error("Error getting invite:", error)
121 |     return { isSuccess: false, message: "Failed to get invite" }
122 |   }
123 | }
124 | 
125 | export async function acceptInviteAction(
126 |   token: string
127 | ): Promise<ActionState<void>> {
128 |   try {
129 |     const authData = await auth()
130 |     const userId = authData.userId
131 | 
132 |     if (!userId) {
133 |       return {
134 |         isSuccess: false,
135 |         message: "You must be logged in to accept an invite"
136 |       }
137 |     }
138 | 
139 |     // Get the invite
140 |     const [invite] = await db
141 |       .select()
142 |       .from(invitesTable)
143 |       .where(
144 |         and(
145 |           eq(invitesTable.token, token),
146 |           eq(invitesTable.status, "PENDING")
147 |         )
148 |       )
149 | 
150 |     if (!invite) {
151 |       return {
152 |         isSuccess: false,
153 |         message: "Invalid or expired invite"
154 |       }
155 |     }
156 | 
157 |     if (invite.expiresAt < new Date()) {
158 |       // Update invite status to expired
159 |       await db
160 |         .update(invitesTable)
161 |         .set({ status: "EXPIRED" })
162 |         .where(eq(invitesTable.id, invite.id))
163 | 
164 |       return {
165 |         isSuccess: false,
166 |         message: "This invite has expired"
167 |       }
168 |     }
169 | 
170 |     // Create user role
171 |     await db.insert(userRolesTable).values({
172 |       userId,
173 |       orgId: invite.orgId,
174 |       propertyId: invite.propertyId,
175 |       role: invite.role
176 |     })
177 | 
178 |     // Update invite status
179 |     await db
180 |       .update(invitesTable)
181 |       .set({ status: "ACCEPTED" })
182 |       .where(eq(invitesTable.id, invite.id))
183 | 
184 |     return {
185 |       isSuccess: true,
186 |       message: "Invite accepted successfully",
187 |       data: undefined
188 |     }
189 |   } catch (error) {
190 |     console.error("Error accepting invite:", error)
191 |     return { isSuccess: false, message: "Failed to accept invite" }
192 |   }
193 | }
194 | 
195 | export async function cancelInviteAction(
196 |   id: string
197 | ): Promise<ActionState<void>> {
198 |   try {
199 |     await db
200 |       .update(invitesTable)
201 |       .set({ status: "CANCELED" })
202 |       .where(eq(invitesTable.id, id))
203 | 
204 |     return {
205 |       isSuccess: true,
206 |       message: "Invite canceled successfully",
207 |       data: undefined
208 |     }
209 |   } catch (error) {
210 |     console.error("Error canceling invite:", error)
211 |     return { isSuccess: false, message: "Failed to cancel invite" }
212 |   }
213 | }
214 | 
215 | export async function getInvitesAction(
216 |   orgId: string
217 | ): Promise<ActionState<InviteWithDetails[]>> {
218 |   try {
219 |     const invites = await db
220 |       .select({
221 |         id: invitesTable.id,
222 |         email: invitesTable.email,
223 |         orgId: invitesTable.orgId,
224 |         propertyId: invitesTable.propertyId,
225 |         role: invitesTable.role,
226 |         token: invitesTable.token,
227 |         status: invitesTable.status,
228 |         expiresAt: invitesTable.expiresAt,
229 |         invitedByUserId: invitesTable.invitedByUserId,
230 |         createdAt: invitesTable.createdAt,
231 |         organization: {
232 |           id: organizationsTable.id,
233 |           name: organizationsTable.name
234 |         },
235 |         property: {
236 |           id: propertiesTable.id,
237 |           name: propertiesTable.name
238 |         },
239 |         invitedBy: {
240 |           id: usersTable.id,
241 |           fullName: usersTable.fullName,
242 |           email: usersTable.email
243 |         }
244 |       })
245 |       .from(invitesTable)
246 |       .leftJoin(
247 |         organizationsTable,
248 |         eq(invitesTable.orgId, organizationsTable.id)
249 |       )
250 |       .leftJoin(
251 |         propertiesTable,
252 |         eq(invitesTable.propertyId, propertiesTable.id)
253 |       )
254 |       .leftJoin(
255 |         usersTable,
256 |         eq(invitesTable.invitedByUserId, usersTable.id)
257 |       )
258 |       .where(eq(invitesTable.orgId, orgId))
259 | 
260 |     return {
261 |       isSuccess: true,
262 |       message: "Invites retrieved successfully",
263 |       data: invites as InviteWithDetails[]
264 |     }
265 |   } catch (error) {
266 |     console.error("Error getting invites:", error)
267 |     return { isSuccess: false, message: "Failed to get invites" }
268 |   }
269 | } 
```

actions/db/organizations-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import { organizationsTable, userRolesTable } from "@/db/schema"
5 | import { ActionState, CreateOrganizationInput, Organization } from "@/types"
6 | import { auth } from "@clerk/nextjs/server"
7 | import { eq } from "drizzle-orm"
8 | 
9 | export async function createOrganizationAction(
10 |   input: CreateOrganizationInput
11 | ): Promise<ActionState<Organization>> {
12 |   try {
13 |     const authData = await auth()
14 |     const userId = authData.userId
15 | 
16 |     if (!userId) {
17 |       return {
18 |         isSuccess: false,
19 |         message: "You must be logged in to create an organization"
20 |       }
21 |     }
22 | 
23 |     // Create the organization
24 |     const [organization] = await db
25 |       .insert(organizationsTable)
26 |       .values({
27 |         name: input.name
28 |       })
29 |       .returning()
30 | 
31 |     // Assign the creator as an admin
32 |     await db.insert(userRolesTable).values({
33 |       userId,
34 |       orgId: organization.id,
35 |       role: "ADMIN"
36 |     })
37 | 
38 |     return {
39 |       isSuccess: true,
40 |       message: "Organization created successfully",
41 |       data: organization as Organization
42 |     }
43 |   } catch (error) {
44 |     console.error("Error creating organization:", error)
45 |     return { isSuccess: false, message: "Failed to create organization" }
46 |   }
47 | }
48 | 
49 | export async function getOrganizationAction(
50 |   id: string
51 | ): Promise<ActionState<Organization>> {
52 |   try {
53 |     const [organization] = await db
54 |       .select()
55 |       .from(organizationsTable)
56 |       .where(eq(organizationsTable.id, id))
57 | 
58 |     if (!organization) {
59 |       return {
60 |         isSuccess: false,
61 |         message: "Organization not found"
62 |       }
63 |     }
64 | 
65 |     return {
66 |       isSuccess: true,
67 |       message: "Organization retrieved successfully",
68 |       data: organization as Organization
69 |     }
70 |   } catch (error) {
71 |     console.error("Error getting organization:", error)
72 |     return { isSuccess: false, message: "Failed to get organization" }
73 |   }
74 | }
75 | 
76 | export async function updateOrganizationAction(
77 |   id: string,
78 |   input: Partial<CreateOrganizationInput>
79 | ): Promise<ActionState<Organization>> {
80 |   try {
81 |     const [organization] = await db
82 |       .update(organizationsTable)
83 |       .set(input)
84 |       .where(eq(organizationsTable.id, id))
85 |       .returning()
86 | 
87 |     return {
88 |       isSuccess: true,
89 |       message: "Organization updated successfully",
90 |       data: organization as Organization
91 |     }
92 |   } catch (error) {
93 |     console.error("Error updating organization:", error)
94 |     return { isSuccess: false, message: "Failed to update organization" }
95 |   }
96 | }
97 | 
98 | export async function deleteOrganizationAction(
99 |   id: string
100 | ): Promise<ActionState<void>> {
101 |   try {
102 |     await db.delete(organizationsTable).where(eq(organizationsTable.id, id))
103 | 
104 |     return {
105 |       isSuccess: true,
106 |       message: "Organization deleted successfully",
107 |       data: undefined
108 |     }
109 |   } catch (error) {
110 |     console.error("Error deleting organization:", error)
111 |     return { isSuccess: false, message: "Failed to delete organization" }
112 |   }
113 | } 
```

actions/db/profiles-actions.ts
```
1 | /*
2 | <ai_context>
3 | Contains server actions related to profiles in the DB.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | import { db } from "@/db/db"
10 | import {
11 |   InsertProfile,
12 |   profilesTable,
13 |   SelectProfile
14 | } from "@/db/schema/profiles-schema"
15 | import { ActionState } from "@/types"
16 | import { eq } from "drizzle-orm"
17 | 
18 | export async function createProfileAction(
19 |   data: InsertProfile
20 | ): Promise<ActionState<SelectProfile>> {
21 |   try {
22 |     const [newProfile] = await db.insert(profilesTable).values(data).returning()
23 |     return {
24 |       isSuccess: true,
25 |       message: "Profile created successfully",
26 |       data: newProfile
27 |     }
28 |   } catch (error) {
29 |     console.error("Error creating profile:", error)
30 |     return { isSuccess: false, message: "Failed to create profile" }
31 |   }
32 | }
33 | 
34 | export async function getProfileByUserIdAction(
35 |   userId: string
36 | ): Promise<ActionState<SelectProfile>> {
37 |   try {
38 |     const profile = await db.query.profiles.findFirst({
39 |       where: eq(profilesTable.userId, userId)
40 |     })
41 |     if (!profile) {
42 |       return { isSuccess: false, message: "Profile not found" }
43 |     }
44 | 
45 |     return {
46 |       isSuccess: true,
47 |       message: "Profile retrieved successfully",
48 |       data: profile
49 |     }
50 |   } catch (error) {
51 |     console.error("Error getting profile by user id", error)
52 |     return { isSuccess: false, message: "Failed to get profile" }
53 |   }
54 | }
55 | 
56 | export async function updateProfileAction(
57 |   userId: string,
58 |   data: Partial<InsertProfile>
59 | ): Promise<ActionState<SelectProfile>> {
60 |   try {
61 |     const [updatedProfile] = await db
62 |       .update(profilesTable)
63 |       .set(data)
64 |       .where(eq(profilesTable.userId, userId))
65 |       .returning()
66 | 
67 |     if (!updatedProfile) {
68 |       return { isSuccess: false, message: "Profile not found to update" }
69 |     }
70 | 
71 |     return {
72 |       isSuccess: true,
73 |       message: "Profile updated successfully",
74 |       data: updatedProfile
75 |     }
76 |   } catch (error) {
77 |     console.error("Error updating profile:", error)
78 |     return { isSuccess: false, message: "Failed to update profile" }
79 |   }
80 | }
81 | 
82 | export async function updateProfileByStripeCustomerIdAction(
83 |   stripeCustomerId: string,
84 |   data: Partial<InsertProfile>
85 | ): Promise<ActionState<SelectProfile>> {
86 |   try {
87 |     const [updatedProfile] = await db
88 |       .update(profilesTable)
89 |       .set(data)
90 |       .where(eq(profilesTable.stripeCustomerId, stripeCustomerId))
91 |       .returning()
92 | 
93 |     if (!updatedProfile) {
94 |       return {
95 |         isSuccess: false,
96 |         message: "Profile not found by Stripe customer ID"
97 |       }
98 |     }
99 | 
100 |     return {
101 |       isSuccess: true,
102 |       message: "Profile updated by Stripe customer ID successfully",
103 |       data: updatedProfile
104 |     }
105 |   } catch (error) {
106 |     console.error("Error updating profile by stripe customer ID:", error)
107 |     return {
108 |       isSuccess: false,
109 |       message: "Failed to update profile by Stripe customer ID"
110 |     }
111 |   }
112 | }
113 | 
114 | export async function deleteProfileAction(
115 |   userId: string
116 | ): Promise<ActionState<void>> {
117 |   try {
118 |     await db.delete(profilesTable).where(eq(profilesTable.userId, userId))
119 |     return {
120 |       isSuccess: true,
121 |       message: "Profile deleted successfully",
122 |       data: undefined
123 |     }
124 |   } catch (error) {
125 |     console.error("Error deleting profile:", error)
126 |     return { isSuccess: false, message: "Failed to delete profile" }
127 |   }
128 | }
```

actions/db/properties-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import { propertiesTable, userRolesTable } from "@/db/schema"
5 | import { ActionState, CreatePropertyInput, Property, UserRole } from "@/types"
6 | import { eq } from "drizzle-orm"
7 | 
8 | export async function createPropertyAction(
9 |   input: CreatePropertyInput
10 | ): Promise<ActionState<Property>> {
11 |   try {
12 |     // Create the property
13 |     const [property] = await db
14 |       .insert(propertiesTable)
15 |       .values({
16 |         orgId: input.orgId,
17 |         name: input.name
18 |       })
19 |       .returning()
20 | 
21 |     return {
22 |       isSuccess: true,
23 |       message: "Property created successfully",
24 |       data: property as Property
25 |     }
26 |   } catch (error) {
27 |     console.error("Error creating property:", error)
28 |     return { isSuccess: false, message: "Failed to create property" }
29 |   }
30 | }
31 | 
32 | export async function createPropertyWithStaffAction(
33 |   input: CreatePropertyInput,
34 |   staffUserIds: string[]
35 | ): Promise<ActionState<Property>> {
36 |   try {
37 |     // Create the property
38 |     const [property] = await db
39 |       .insert(propertiesTable)
40 |       .values({
41 |         orgId: input.orgId,
42 |         name: input.name
43 |       })
44 |       .returning()
45 | 
46 |     // If there are staff members to assign
47 |     if (staffUserIds.length > 0) {
48 |       // Create user roles for each staff member
49 |       const userRoles = staffUserIds.map((userId) => ({
50 |         userId,
51 |         orgId: input.orgId,
52 |         propertyId: property.id,
53 |         role: "EMPLOYEE" as const
54 |       }))
55 | 
56 |       await db.insert(userRolesTable).values(userRoles)
57 |     }
58 | 
59 |     return {
60 |       isSuccess: true,
61 |       message: "Property created and staff assigned successfully",
62 |       data: property as Property
63 |     }
64 |   } catch (error) {
65 |     console.error("Error creating property with staff:", error)
66 |     return { isSuccess: false, message: "Failed to create property with staff" }
67 |   }
68 | }
69 | 
70 | export async function getPropertyAction(
71 |   id: string
72 | ): Promise<ActionState<Property>> {
73 |   try {
74 |     const [property] = await db
75 |       .select()
76 |       .from(propertiesTable)
77 |       .where(eq(propertiesTable.id, id))
78 | 
79 |     if (!property) {
80 |       return {
81 |         isSuccess: false,
82 |         message: "Property not found"
83 |       }
84 |     }
85 | 
86 |     return {
87 |       isSuccess: true,
88 |       message: "Property retrieved successfully",
89 |       data: property as Property
90 |     }
91 |   } catch (error) {
92 |     console.error("Error getting property:", error)
93 |     return { isSuccess: false, message: "Failed to get property" }
94 |   }
95 | }
96 | 
97 | export async function updatePropertyAction(
98 |   id: string,
99 |   input: Partial<CreatePropertyInput>
100 | ): Promise<ActionState<Property>> {
101 |   try {
102 |     const [property] = await db
103 |       .update(propertiesTable)
104 |       .set(input)
105 |       .where(eq(propertiesTable.id, id))
106 |       .returning()
107 | 
108 |     return {
109 |       isSuccess: true,
110 |       message: "Property updated successfully",
111 |       data: property as Property
112 |     }
113 |   } catch (error) {
114 |     console.error("Error updating property:", error)
115 |     return { isSuccess: false, message: "Failed to update property" }
116 |   }
117 | }
118 | 
119 | export async function deletePropertyAction(
120 |   id: string
121 | ): Promise<ActionState<void>> {
122 |   try {
123 |     await db.delete(propertiesTable).where(eq(propertiesTable.id, id))
124 | 
125 |     return {
126 |       isSuccess: true,
127 |       message: "Property deleted successfully",
128 |       data: undefined
129 |     }
130 |   } catch (error) {
131 |     console.error("Error deleting property:", error)
132 |     return { isSuccess: false, message: "Failed to delete property" }
133 |   }
134 | }
135 | 
136 | export async function getPropertiesForOrgAction(
137 |   orgId: string
138 | ): Promise<ActionState<Property[]>> {
139 |   try {
140 |     const properties = await db
141 |       .select()
142 |       .from(propertiesTable)
143 |       .where(eq(propertiesTable.orgId, orgId))
144 | 
145 |     return {
146 |       isSuccess: true,
147 |       message: "Properties retrieved successfully",
148 |       data: properties as Property[]
149 |     }
150 |   } catch (error) {
151 |     console.error("Error getting properties:", error)
152 |     return { isSuccess: false, message: "Failed to get properties" }
153 |   }
154 | } 
```

actions/db/ticket-messages-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import {
5 |   InsertTicketMessage,
6 |   SelectTicketMessage,
7 |   ticketMessagesTable
8 | } from "@/db/schema"
9 | import { ActionState } from "@/types"
10 | import { eq } from "drizzle-orm"
11 | 
12 | export async function createTicketMessageAction(
13 |   message: InsertTicketMessage
14 | ): Promise<ActionState<SelectTicketMessage>> {
15 |   try {
16 |     const [newMessage] = await db
17 |       .insert(ticketMessagesTable)
18 |       .values(message)
19 |       .returning()
20 |     return {
21 |       isSuccess: true,
22 |       message: "Message created successfully",
23 |       data: newMessage
24 |     }
25 |   } catch (error) {
26 |     console.error("Error creating message:", error)
27 |     return { isSuccess: false, message: "Failed to create message" }
28 |   }
29 | }
30 | 
31 | export async function getTicketMessagesAction(
32 |   ticketId: string
33 | ): Promise<ActionState<SelectTicketMessage[]>> {
34 |   try {
35 |     const messages = await db
36 |       .select()
37 |       .from(ticketMessagesTable)
38 |       .where(eq(ticketMessagesTable.ticketId, ticketId))
39 |       .orderBy(ticketMessagesTable.createdAt)
40 | 
41 |     return {
42 |       isSuccess: true,
43 |       message: "Messages retrieved successfully",
44 |       data: messages
45 |     }
46 |   } catch (error) {
47 |     console.error("Error getting messages:", error)
48 |     return { isSuccess: false, message: "Failed to get messages" }
49 |   }
50 | }
51 | 
52 | export async function updateTicketMessageAction(
53 |   id: string,
54 |   data: Partial<InsertTicketMessage>
55 | ): Promise<ActionState<SelectTicketMessage>> {
56 |   try {
57 |     const [updatedMessage] = await db
58 |       .update(ticketMessagesTable)
59 |       .set(data)
60 |       .where(eq(ticketMessagesTable.id, id))
61 |       .returning()
62 | 
63 |     return {
64 |       isSuccess: true,
65 |       message: "Message updated successfully",
66 |       data: updatedMessage
67 |     }
68 |   } catch (error) {
69 |     console.error("Error updating message:", error)
70 |     return { isSuccess: false, message: "Failed to update message" }
71 |   }
72 | }
73 | 
74 | export async function deleteTicketMessageAction(
75 |   id: string
76 | ): Promise<ActionState<void>> {
77 |   try {
78 |     await db.delete(ticketMessagesTable).where(eq(ticketMessagesTable.id, id))
79 |     return {
80 |       isSuccess: true,
81 |       message: "Message deleted successfully",
82 |       data: undefined
83 |     }
84 |   } catch (error) {
85 |     console.error("Error deleting message:", error)
86 |     return { isSuccess: false, message: "Failed to delete message" }
87 |   }
88 | } 
```

actions/db/tickets-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import { InsertTicket, SelectTicket, ticketsTable } from "@/db/schema"
5 | import { ActionState } from "@/types"
6 | import { and, eq, desc } from "drizzle-orm"
7 | 
8 | export async function createTicketAction(
9 |   ticket: InsertTicket
10 | ): Promise<ActionState<SelectTicket>> {
11 |   try {
12 |     console.log("Creating ticket in database:", ticket)
13 |     const [newTicket] = await db.insert(ticketsTable).values(ticket).returning()
14 |     console.log("Successfully created ticket:", newTicket)
15 |     return {
16 |       isSuccess: true,
17 |       message: "Ticket created successfully",
18 |       data: newTicket
19 |     }
20 |   } catch (error) {
21 |     console.error("Error creating ticket:", {
22 |       error,
23 |       errorMessage: error instanceof Error ? error.message : "Unknown error",
24 |       errorStack: error instanceof Error ? error.stack : undefined,
25 |       ticket
26 |     })
27 |     return { 
28 |       isSuccess: false, 
29 |       message: error instanceof Error 
30 |         ? `Database error: ${error.message}`
31 |         : "Failed to create ticket" 
32 |     }
33 |   }
34 | }
35 | 
36 | export async function getTicketsByTenantAction(
37 |   tenantId: string
38 | ): Promise<ActionState<SelectTicket[]>> {
39 |   try {
40 |     console.log("Fetching tickets for tenant:", tenantId)
41 |     const tickets = await db
42 |       .select()
43 |       .from(ticketsTable)
44 |       .where(eq(ticketsTable.tenantId, tenantId))
45 |       .orderBy(ticketsTable.createdAt)
46 |     console.log("Successfully fetched tickets:", tickets.length)
47 |     return {
48 |       isSuccess: true,
49 |       message: "Tickets retrieved successfully",
50 |       data: tickets
51 |     }
52 |   } catch (error) {
53 |     console.error("Error getting tickets:", {
54 |       error,
55 |       errorMessage: error instanceof Error ? error.message : "Unknown error",
56 |       errorStack: error instanceof Error ? error.stack : undefined,
57 |       tenantId
58 |     })
59 |     return { 
60 |       isSuccess: false, 
61 |       message: error instanceof Error 
62 |         ? `Database error: ${error.message}`
63 |         : "Failed to get tickets" 
64 |     }
65 |   }
66 | }
67 | 
68 | export async function getTicketByIdAction(
69 |   id: string,
70 |   tenantId?: string
71 | ): Promise<ActionState<SelectTicket | undefined>> {
72 |   try {
73 |     console.log("Fetching ticket:", { id, tenantId })
74 |     const conditions = tenantId
75 |       ? and(eq(ticketsTable.id, id), eq(ticketsTable.tenantId, tenantId))
76 |       : eq(ticketsTable.id, id)
77 | 
78 |     const [ticket] = await db
79 |       .select()
80 |       .from(ticketsTable)
81 |       .where(conditions)
82 | 
83 |     console.log("Successfully fetched ticket:", ticket)
84 |     return {
85 |       isSuccess: true,
86 |       message: "Ticket retrieved successfully",
87 |       data: ticket
88 |     }
89 |   } catch (error) {
90 |     console.error("Error getting ticket:", {
91 |       error,
92 |       errorMessage: error instanceof Error ? error.message : "Unknown error",
93 |       errorStack: error instanceof Error ? error.stack : undefined,
94 |       id,
95 |       tenantId
96 |     })
97 |     return { 
98 |       isSuccess: false, 
99 |       message: error instanceof Error 
100 |         ? `Database error: ${error.message}`
101 |         : "Failed to get ticket" 
102 |     }
103 |   }
104 | }
105 | 
106 | export async function updateTicketAction(
107 |   id: string,
108 |   data: Partial<InsertTicket>
109 | ): Promise<ActionState<SelectTicket>> {
110 |   try {
111 |     console.log("Updating ticket:", { id, data })
112 |     const [updatedTicket] = await db
113 |       .update(ticketsTable)
114 |       .set(data)
115 |       .where(eq(ticketsTable.id, id))
116 |       .returning()
117 | 
118 |     console.log("Successfully updated ticket:", updatedTicket)
119 |     return {
120 |       isSuccess: true,
121 |       message: "Ticket updated successfully",
122 |       data: updatedTicket
123 |     }
124 |   } catch (error) {
125 |     console.error("Error updating ticket:", {
126 |       error,
127 |       errorMessage: error instanceof Error ? error.message : "Unknown error",
128 |       errorStack: error instanceof Error ? error.stack : undefined,
129 |       id,
130 |       data
131 |     })
132 |     return { 
133 |       isSuccess: false, 
134 |       message: error instanceof Error 
135 |         ? `Database error: ${error.message}`
136 |         : "Failed to update ticket" 
137 |     }
138 |   }
139 | }
140 | 
141 | export async function deleteTicketAction(id: string): Promise<ActionState<void>> {
142 |   try {
143 |     console.log("Deleting ticket:", id)
144 |     await db.delete(ticketsTable).where(eq(ticketsTable.id, id))
145 |     console.log("Successfully deleted ticket:", id)
146 |     return {
147 |       isSuccess: true,
148 |       message: "Ticket deleted successfully",
149 |       data: undefined
150 |     }
151 |   } catch (error) {
152 |     console.error("Error deleting ticket:", {
153 |       error,
154 |       errorMessage: error instanceof Error ? error.message : "Unknown error",
155 |       errorStack: error instanceof Error ? error.stack : undefined,
156 |       id
157 |     })
158 |     return { 
159 |       isSuccess: false, 
160 |       message: error instanceof Error 
161 |         ? `Database error: ${error.message}`
162 |         : "Failed to delete ticket" 
163 |     }
164 |   }
165 | }
166 | 
167 | export async function getAllTicketsAction(
168 |   filters?: {
169 |     status?: "open" | "in_progress" | "completed" | "closed" | "completed_by_chat" | "all"
170 |     priority?: "low" | "medium" | "high" | "critical" | "all"
171 |   }
172 | ): Promise<ActionState<SelectTicket[]>> {
173 |   try {
174 |     console.log("Fetching all tickets with filters:", filters)
175 |     
176 |     const conditions = []
177 |     if (filters?.status && filters.status !== "all") {
178 |       conditions.push(eq(ticketsTable.status, filters.status))
179 |     }
180 |     if (filters?.priority && filters.priority !== "all") {
181 |       conditions.push(eq(ticketsTable.priority, filters.priority))
182 |     }
183 | 
184 |     const tickets = await db
185 |       .select()
186 |       .from(ticketsTable)
187 |       .where(and(...conditions))
188 |       .orderBy(desc(ticketsTable.createdAt))
189 | 
190 |     console.log("Successfully fetched tickets:", tickets.length)
191 |     return {
192 |       isSuccess: true,
193 |       message: "Tickets retrieved successfully",
194 |       data: tickets
195 |     }
196 |   } catch (error) {
197 |     console.error("Error getting tickets:", {
198 |       error,
199 |       errorMessage: error instanceof Error ? error.message : "Unknown error",
200 |       errorStack: error instanceof Error ? error.stack : undefined,
201 |       filters
202 |     })
203 |     return { 
204 |       isSuccess: false, 
205 |       message: error instanceof Error 
206 |         ? `Database error: ${error.message}`
207 |         : "Failed to get tickets" 
208 |     }
209 |   }
210 | } 
```

actions/db/todos-actions.ts
```
1 | /*
2 | <ai_context>
3 | Contains server actions related to todos in the DB.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | import { db } from "@/db/db"
10 | import { InsertTodo, SelectTodo, todosTable } from "@/db/schema/todos-schema"
11 | import { ActionState } from "@/types"
12 | import { eq } from "drizzle-orm"
13 | 
14 | export async function createTodoAction(
15 |   todo: InsertTodo
16 | ): Promise<ActionState<SelectTodo>> {
17 |   try {
18 |     const [newTodo] = await db.insert(todosTable).values(todo).returning()
19 |     return {
20 |       isSuccess: true,
21 |       message: "Todo created successfully",
22 |       data: newTodo
23 |     }
24 |   } catch (error) {
25 |     console.error("Error creating todo:", error)
26 |     return { isSuccess: false, message: "Failed to create todo" }
27 |   }
28 | }
29 | 
30 | export async function getTodosAction(
31 |   userId: string
32 | ): Promise<ActionState<SelectTodo[]>> {
33 |   try {
34 |     const todos = await db.query.todos.findMany({
35 |       where: eq(todosTable.userId, userId)
36 |     })
37 |     return {
38 |       isSuccess: true,
39 |       message: "Todos retrieved successfully",
40 |       data: todos
41 |     }
42 |   } catch (error) {
43 |     console.error("Error getting todos:", error)
44 |     return { isSuccess: false, message: "Failed to get todos" }
45 |   }
46 | }
47 | 
48 | export async function updateTodoAction(
49 |   id: string,
50 |   data: Partial<InsertTodo>
51 | ): Promise<ActionState<SelectTodo>> {
52 |   try {
53 |     const [updatedTodo] = await db
54 |       .update(todosTable)
55 |       .set(data)
56 |       .where(eq(todosTable.id, id))
57 |       .returning()
58 | 
59 |     return {
60 |       isSuccess: true,
61 |       message: "Todo updated successfully",
62 |       data: updatedTodo
63 |     }
64 |   } catch (error) {
65 |     console.error("Error updating todo:", error)
66 |     return { isSuccess: false, message: "Failed to update todo" }
67 |   }
68 | }
69 | 
70 | export async function deleteTodoAction(id: string): Promise<ActionState<void>> {
71 |   try {
72 |     await db.delete(todosTable).where(eq(todosTable.id, id))
73 |     return {
74 |       isSuccess: true,
75 |       message: "Todo deleted successfully",
76 |       data: undefined
77 |     }
78 |   } catch (error) {
79 |     console.error("Error deleting todo:", error)
80 |     return { isSuccess: false, message: "Failed to delete todo" }
81 |   }
82 | }
```

actions/db/user-roles-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import { propertiesTable, userRolesTable, organizationsTable } from "@/db/schema"
5 | import {
6 |   ActionState,
7 |   CreateUserRoleInput,
8 |   UserRole,
9 |   UserRoleWithDetails
10 | } from "@/types"
11 | import { eq } from "drizzle-orm"
12 | 
13 | export async function assignUserRoleAction(
14 |   input: CreateUserRoleInput
15 | ): Promise<ActionState<UserRole>> {
16 |   try {
17 |     const [userRole] = await db
18 |       .insert(userRolesTable)
19 |       .values({
20 |         userId: input.userId,
21 |         orgId: input.orgId,
22 |         propertyId: input.propertyId,
23 |         role: input.role
24 |       })
25 |       .returning()
26 | 
27 |     return {
28 |       isSuccess: true,
29 |       message: "Role assigned successfully",
30 |       data: userRole as UserRole
31 |     }
32 |   } catch (error) {
33 |     console.error("Error assigning role:", error)
34 |     return { isSuccess: false, message: "Failed to assign role" }
35 |   }
36 | }
37 | 
38 | export async function assignUserToAllPropertiesAction(
39 |   input: Omit<CreateUserRoleInput, "propertyId">
40 | ): Promise<ActionState<UserRole[]>> {
41 |   try {
42 |     // Get all properties for the org
43 |     const properties = await db
44 |       .select()
45 |       .from(propertiesTable)
46 |       .where(eq(propertiesTable.orgId, input.orgId))
47 | 
48 |     if (properties.length === 0) {
49 |       return {
50 |         isSuccess: false,
51 |         message: "No properties found for this organization"
52 |       }
53 |     }
54 | 
55 |     // Create user roles for each property
56 |     const userRoles = properties.map((property) => ({
57 |       userId: input.userId,
58 |       orgId: input.orgId,
59 |       propertyId: property.id,
60 |       role: input.role
61 |     }))
62 | 
63 |     const createdRoles = await db
64 |       .insert(userRolesTable)
65 |       .values(userRoles)
66 |       .returning()
67 | 
68 |     return {
69 |       isSuccess: true,
70 |       message: "User assigned to all properties successfully",
71 |       data: createdRoles as UserRole[]
72 |     }
73 |   } catch (error) {
74 |     console.error("Error assigning user to all properties:", error)
75 |     return {
76 |       isSuccess: false,
77 |       message: "Failed to assign user to all properties"
78 |     }
79 |   }
80 | }
81 | 
82 | export async function removeUserRoleAction(
83 |   id: string
84 | ): Promise<ActionState<void>> {
85 |   try {
86 |     await db.delete(userRolesTable).where(eq(userRolesTable.id, id))
87 | 
88 |     return {
89 |       isSuccess: true,
90 |       message: "Role removed successfully",
91 |       data: undefined
92 |     }
93 |   } catch (error) {
94 |     console.error("Error removing role:", error)
95 |     return { isSuccess: false, message: "Failed to remove role" }
96 |   }
97 | }
98 | 
99 | export async function getUserRolesAction(
100 |   userId: string
101 | ): Promise<ActionState<UserRoleWithDetails[]>> {
102 |   try {
103 |     const userRoles = await db
104 |       .select({
105 |         id: userRolesTable.id,
106 |         userId: userRolesTable.userId,
107 |         orgId: userRolesTable.orgId,
108 |         propertyId: userRolesTable.propertyId,
109 |         role: userRolesTable.role,
110 |         createdAt: userRolesTable.createdAt,
111 |         organization: {
112 |           id: organizationsTable.id,
113 |           name: organizationsTable.name
114 |         },
115 |         property: {
116 |           id: propertiesTable.id,
117 |           name: propertiesTable.name
118 |         }
119 |       })
120 |       .from(userRolesTable)
121 |       .leftJoin(
122 |         organizationsTable,
123 |         eq(userRolesTable.orgId, organizationsTable.id)
124 |       )
125 |       .leftJoin(
126 |         propertiesTable,
127 |         eq(userRolesTable.propertyId, propertiesTable.id)
128 |       )
129 |       .where(eq(userRolesTable.userId, userId))
130 | 
131 |     return {
132 |       isSuccess: true,
133 |       message: "User roles retrieved successfully",
134 |       data: userRoles as UserRoleWithDetails[]
135 |     }
136 |   } catch (error) {
137 |     console.error("Error getting user roles:", error)
138 |     return { isSuccess: false, message: "Failed to get user roles" }
139 |   }
140 | } 
```

actions/db/users-actions.ts
```
1 | "use server"
2 | 
3 | import { db } from "@/db/db"
4 | import { InsertUser, SelectUser, usersTable } from "@/db/schema"
5 | import { ActionState } from "@/types"
6 | import { eq } from "drizzle-orm"
7 | 
8 | export async function createUserAction(
9 |   user: InsertUser
10 | ): Promise<ActionState<SelectUser>> {
11 |   try {
12 |     const [newUser] = await db.insert(usersTable).values(user).returning()
13 |     return {
14 |       isSuccess: true,
15 |       message: "User created successfully",
16 |       data: newUser
17 |     }
18 |   } catch (error) {
19 |     console.error("Error creating user:", error)
20 |     return { isSuccess: false, message: "Failed to create user" }
21 |   }
22 | }
23 | 
24 | export async function getUserByClerkIdAction(
25 |   clerkId: string
26 | ): Promise<ActionState<SelectUser | undefined>> {
27 |   try {
28 |     const [user] = await db
29 |       .select()
30 |       .from(usersTable)
31 |       .where(eq(usersTable.clerkId, clerkId))
32 |     return {
33 |       isSuccess: true,
34 |       message: "User retrieved successfully",
35 |       data: user
36 |     }
37 |   } catch (error) {
38 |     console.error("Error getting user:", error)
39 |     return { isSuccess: false, message: "Failed to get user" }
40 |   }
41 | }
42 | 
43 | export async function updateUserAction(
44 |   id: string,
45 |   data: Partial<InsertUser>
46 | ): Promise<ActionState<SelectUser>> {
47 |   try {
48 |     const [updatedUser] = await db
49 |       .update(usersTable)
50 |       .set(data)
51 |       .where(eq(usersTable.id, id))
52 |       .returning()
53 |     return {
54 |       isSuccess: true,
55 |       message: "User updated successfully",
56 |       data: updatedUser
57 |     }
58 |   } catch (error) {
59 |     console.error("Error updating user:", error)
60 |     return { isSuccess: false, message: "Failed to update user" }
61 |   }
62 | }
63 | 
64 | export async function deleteUserAction(id: string): Promise<ActionState<void>> {
65 |   try {
66 |     await db.delete(usersTable).where(eq(usersTable.id, id))
67 |     return {
68 |       isSuccess: true,
69 |       message: "User deleted successfully",
70 |       data: undefined
71 |     }
72 |   } catch (error) {
73 |     console.error("Error deleting user:", error)
74 |     return { isSuccess: false, message: "Failed to delete user" }
75 |   }
76 | }
77 | 
78 | export async function updateUserRoleToStaffAction(
79 |   clerkId: string
80 | ): Promise<ActionState<SelectUser>> {
81 |   try {
82 |     const [updatedUser] = await db
83 |       .update(usersTable)
84 |       .set({ role: "staff" })
85 |       .where(eq(usersTable.clerkId, clerkId))
86 |       .returning()
87 | 
88 |     if (!updatedUser) {
89 |       return { isSuccess: false, message: "User not found" }
90 |     }
91 | 
92 |     return {
93 |       isSuccess: true,
94 |       message: "User role updated to staff successfully",
95 |       data: updatedUser
96 |     }
97 |   } catch (error) {
98 |     console.error("Error updating user role:", error)
99 |     return { isSuccess: false, message: "Failed to update user role" }
100 |   }
101 | } 
```

app/(marketing)/layout.tsx
```
1 | /*
2 | <ai_context>
3 | This server layout provides a shared header and basic structure for (marketing) routes.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | import Header from "@/components/header"
10 | 
11 | export default async function MarketingLayout({
12 |   children
13 | }: {
14 |   children: React.ReactNode
15 | }) {
16 |   return (
17 |     <div className="flex min-h-screen flex-col">
18 |       <Header />
19 | 
20 |       <div className="flex-1">{children}</div>
21 |     </div>
22 |   )
23 | }
```

app/(marketing)/page.tsx
```
1 | /*
2 | <ai_context>
3 | This server page is the marketing homepage.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | import { FeaturesSection } from "@/components/landing/features"
10 | import { HeroSection } from "@/components/landing/hero"
11 | 
12 | export default async function HomePage() {
13 |   return (
14 |     <div className="pb-20">
15 |       <HeroSection />
16 |       {/* social proof */}
17 |       <FeaturesSection />
18 |       {/* pricing */}
19 |       {/* faq */}
20 |       {/* blog */}
21 |       {/* footer */}
22 |     </div>
23 |   )
24 | }
```

app/(auth)/layout.tsx
```
1 | /*
2 | <ai_context>
3 | This server layout provides a centered layout for (auth) pages.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | interface AuthLayoutProps {
10 |   children: React.ReactNode
11 | }
12 | 
13 | export default async function AuthLayout({ children }: AuthLayoutProps) {
14 |   return (
15 |     <div className="flex h-screen items-center justify-center">{children}</div>
16 |   )
17 | }
```

app/staff/layout.tsx
```
1 | "use server"
2 | 
3 | import { getUserByClerkIdAction } from "@/actions/db/users-actions"
4 | import { DashboardHeader } from "@/components/dashboard/dashboard-header"
5 | import { auth } from "@clerk/nextjs/server"
6 | import { redirect } from "next/navigation"
7 | 
8 | export default async function StaffLayout({
9 |   children
10 | }: {
11 |   children: React.ReactNode
12 | }) {
13 |   const { userId } = await auth()
14 | 
15 |   if (!userId) {
16 |     console.log("No userId found, redirecting to login")
17 |     redirect("/login")
18 |   }
19 | 
20 |   // Check if user is staff
21 |   const userResult = await getUserByClerkIdAction(userId)
22 |   console.log("Staff check result:", {
23 |     userId,
24 |     success: userResult.isSuccess,
25 |     user: userResult.data,
26 |     role: userResult.data?.role
27 |   })
28 | 
29 |   if (
30 |     !userResult.isSuccess ||
31 |     !userResult.data ||
32 |     userResult.data.role !== "staff"
33 |   ) {
34 |     console.log("User is not staff, redirecting to home")
35 |     redirect("/") // Redirect non-staff users to home
36 |   }
37 | 
38 |   return (
39 |     <div className="min-h-screen">
40 |       <DashboardHeader userRole="staff" />
41 |       <main>{children}</main>
42 |     </div>
43 |   )
44 | }
```

app/tenant/layout.tsx
```
1 | "use server"
2 | 
3 | import { getUserByClerkIdAction } from "@/actions/db/users-actions"
4 | import { DashboardHeader } from "@/components/dashboard/dashboard-header"
5 | import { auth } from "@clerk/nextjs/server"
6 | import { redirect } from "next/navigation"
7 | 
8 | export default async function TenantLayout({
9 |   children
10 | }: {
11 |   children: React.ReactNode
12 | }) {
13 |   const { userId } = await auth()
14 | 
15 |   if (!userId) {
16 |     redirect("/login")
17 |   }
18 | 
19 |   // Check if user is tenant
20 |   const userResult = await getUserByClerkIdAction(userId)
21 |   console.log("Tenant check result:", {
22 |     userId,
23 |     success: userResult.isSuccess,
24 |     user: userResult.data,
25 |     role: userResult.data?.role
26 |   })
27 | 
28 |   if (
29 |     !userResult.isSuccess ||
30 |     !userResult.data ||
31 |     userResult.data.role !== "tenant"
32 |   ) {
33 |     console.log("User is not tenant, redirecting to staff dashboard")
34 |     redirect("/staff/tickets") // Redirect staff users to their dashboard
35 |   }
36 | 
37 |   return (
38 |     <div className="min-h-screen">
39 |       <DashboardHeader userRole="tenant" />
40 |       <main>{children}</main>
41 |     </div>
42 |   )
43 | }
```

components/dashboard/dashboard-header.tsx
```
1 | "use client"
2 | 
3 | import { UserButton } from "@clerk/nextjs"
4 | import { Building2, Menu, Wrench } from "lucide-react"
5 | import Link from "next/link"
6 | import { usePathname } from "next/navigation"
7 | import { Button } from "../ui/button"
8 | import { ThemeSwitcher } from "../utilities/theme-switcher"
9 | 
10 | interface DashboardHeaderProps {
11 |   userRole: "tenant" | "staff"
12 | }
13 | 
14 | export function DashboardHeader({ userRole }: DashboardHeaderProps) {
15 |   const pathname = usePathname()
16 |   const isStaff = userRole === "staff"
17 |   const baseUrl = isStaff ? "/staff" : "/tenant"
18 | 
19 |   const navigation = [
20 |     {
21 |       name: isStaff ? "Maintenance Dashboard" : "My Maintenance Requests",
22 |       href: `${baseUrl}/tickets`,
23 |       icon: Wrench,
24 |       current: pathname.includes("/tickets")
25 |     }
26 |   ]
27 | 
28 |   return (
29 |     <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
30 |       <div className="container flex h-14 items-center">
31 |         <div className="flex items-center gap-2 font-semibold">
32 |           <Building2 className="size-5" />
33 |           <span>RepairWise</span>
34 |         </div>
35 | 
36 |         <nav className="flex flex-1 items-center justify-center space-x-6">
37 |           {navigation.map(item => (
38 |             <Link
39 |               key={item.name}
40 |               href={item.href}
41 |               className={`hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors ${
42 |                 item.current ? "text-foreground" : "text-foreground/60"
43 |               }`}
44 |             >
45 |               <item.icon className="size-4" />
46 |               {item.name}
47 |             </Link>
48 |           ))}
49 |         </nav>
50 | 
51 |         <div className="flex items-center gap-2">
52 |           <ThemeSwitcher />
53 |           <UserButton afterSignOutUrl="/" />
54 |         </div>
55 |       </div>
56 |     </header>
57 |   )
58 | }
```

components/magicui/animated-gradient-text.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides an animated gradient text.
4 | </ai_context>
5 | */
6 | 
7 | import { ReactNode } from "react"
8 | 
9 | import { cn } from "@/lib/utils"
10 | 
11 | export default function AnimatedGradientText({
12 |   children,
13 |   className
14 | }: {
15 |   children: ReactNode
16 |   className?: string
17 | }) {
18 |   return (
19 |     <div
20 |       className={cn(
21 |         "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
22 |         className
23 |       )}
24 |     >
25 |       <div
26 |         className={`animate-gradient absolute inset-0 block size-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] [border-radius:inherit] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
27 |       />
28 | 
29 |       {children}
30 |     </div>
31 |   )
32 | }
```

components/magicui/hero-video-dialog.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides a video dialog for the hero section.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { AnimatePresence, motion } from "framer-motion"
10 | import { Play, XIcon } from "lucide-react"
11 | import { useState } from "react"
12 | 
13 | import { cn } from "@/lib/utils"
14 | 
15 | type AnimationStyle =
16 |   | "from-bottom"
17 |   | "from-center"
18 |   | "from-top"
19 |   | "from-left"
20 |   | "from-right"
21 |   | "fade"
22 |   | "top-in-bottom-out"
23 |   | "left-in-right-out"
24 | 
25 | interface HeroVideoProps {
26 |   animationStyle?: AnimationStyle
27 |   videoSrc: string
28 |   thumbnailSrc: string
29 |   thumbnailAlt?: string
30 |   className?: string
31 | }
32 | 
33 | const animationVariants = {
34 |   "from-bottom": {
35 |     initial: { y: "100%", opacity: 0 },
36 |     animate: { y: 0, opacity: 1 },
37 |     exit: { y: "100%", opacity: 0 }
38 |   },
39 |   "from-center": {
40 |     initial: { scale: 0.5, opacity: 0 },
41 |     animate: { scale: 1, opacity: 1 },
42 |     exit: { scale: 0.5, opacity: 0 }
43 |   },
44 |   "from-top": {
45 |     initial: { y: "-100%", opacity: 0 },
46 |     animate: { y: 0, opacity: 1 },
47 |     exit: { y: "-100%", opacity: 0 }
48 |   },
49 |   "from-left": {
50 |     initial: { x: "-100%", opacity: 0 },
51 |     animate: { x: 0, opacity: 1 },
52 |     exit: { x: "-100%", opacity: 0 }
53 |   },
54 |   "from-right": {
55 |     initial: { x: "100%", opacity: 0 },
56 |     animate: { x: 0, opacity: 1 },
57 |     exit: { x: "100%", opacity: 0 }
58 |   },
59 |   fade: {
60 |     initial: { opacity: 0 },
61 |     animate: { opacity: 1 },
62 |     exit: { opacity: 0 }
63 |   },
64 |   "top-in-bottom-out": {
65 |     initial: { y: "-100%", opacity: 0 },
66 |     animate: { y: 0, opacity: 1 },
67 |     exit: { y: "100%", opacity: 0 }
68 |   },
69 |   "left-in-right-out": {
70 |     initial: { x: "-100%", opacity: 0 },
71 |     animate: { x: 0, opacity: 1 },
72 |     exit: { x: "100%", opacity: 0 }
73 |   }
74 | }
75 | 
76 | export default function HeroVideoDialog({
77 |   animationStyle = "from-center",
78 |   videoSrc,
79 |   thumbnailSrc,
80 |   thumbnailAlt = "Video thumbnail",
81 |   className
82 | }: HeroVideoProps) {
83 |   const [isVideoOpen, setIsVideoOpen] = useState(false)
84 |   const selectedAnimation = animationVariants[animationStyle]
85 | 
86 |   return (
87 |     <div className={cn("relative", className)}>
88 |       <div
89 |         className="group relative cursor-pointer"
90 |         onClick={() => setIsVideoOpen(true)}
91 |       >
92 |         <img
93 |           src={thumbnailSrc}
94 |           alt={thumbnailAlt}
95 |           width={1920}
96 |           height={1080}
97 |           className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
98 |         />
99 |         <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
100 |           <div className="bg-primary/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md">
101 |             <div
102 |               className={`from-primary/30 to-primary relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]`}
103 |             >
104 |               <Play
105 |                 className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
106 |                 style={{
107 |                   filter:
108 |                     "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
109 |                 }}
110 |               />
111 |             </div>
112 |           </div>
113 |         </div>
114 |       </div>
115 |       <AnimatePresence>
116 |         {isVideoOpen && (
117 |           <motion.div
118 |             initial={{ opacity: 0 }}
119 |             animate={{ opacity: 1 }}
120 |             onClick={() => setIsVideoOpen(false)}
121 |             exit={{ opacity: 0 }}
122 |             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
123 |           >
124 |             <motion.div
125 |               {...selectedAnimation}
126 |               transition={{ type: "spring", damping: 30, stiffness: 300 }}
127 |               className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
128 |             >
129 |               <motion.button className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black">
130 |                 <XIcon className="size-5" />
131 |               </motion.button>
132 |               <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
133 |                 <iframe
134 |                   src={videoSrc}
135 |                   className="size-full rounded-2xl"
136 |                   allowFullScreen
137 |                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
138 |                 ></iframe>
139 |               </div>
140 |             </motion.div>
141 |           </motion.div>
142 |         )}
143 |       </AnimatePresence>
144 |     </div>
145 |   )
146 | }
```

components/tickets/ticket-form.tsx
```
1 | "use client"
2 | 
3 | import { createTicketAction } from "@/actions/db/tickets-actions"
4 | import { getUserRolesAction } from "@/actions/db/user-roles-actions"
5 | import { Button } from "@/components/ui/button"
6 | import {
7 |   Form,
8 |   FormControl,
9 |   FormDescription,
10 |   FormField,
11 |   FormItem,
12 |   FormLabel,
13 |   FormMessage
14 | } from "@/components/ui/form"
15 | import { Input } from "@/components/ui/input"
16 | import {
17 |   Select,
18 |   SelectContent,
19 |   SelectItem,
20 |   SelectTrigger,
21 |   SelectValue
22 | } from "@/components/ui/select"
23 | import { Textarea } from "@/components/ui/textarea"
24 | import { toast } from "@/components/ui/use-toast"
25 | import { InsertTicket } from "@/db/schema"
26 | import { UserRoleWithDetails } from "@/types"
27 | import { zodResolver } from "@hookform/resolvers/zod"
28 | import { useRouter } from "next/navigation"
29 | import { useEffect, useState } from "react"
30 | import { useForm } from "react-hook-form"
31 | import { z } from "zod"
32 | 
33 | const ticketFormSchema = z.object({
34 |   title: z
35 |     .string()
36 |     .min(5, "Title must be at least 5 characters")
37 |     .max(100, "Title must not exceed 100 characters"),
38 |   description: z
39 |     .string()
40 |     .min(10, "Description must be at least 10 characters")
41 |     .max(1000, "Description must not exceed 1000 characters"),
42 |   category: z.enum(["maintenance", "billing", "noise_complaint", "other"]),
43 |   priority: z.enum(["low", "medium", "high", "critical"]).default("low"),
44 |   propertyId: z.string({
45 |     required_error: "Please select a property"
46 |   })
47 | })
48 | 
49 | type TicketFormValues = z.infer<typeof ticketFormSchema>
50 | 
51 | interface TicketFormProps {
52 |   tenantId: string
53 |   onSuccess?: () => void
54 | }
55 | 
56 | export function TicketForm({ tenantId, onSuccess }: TicketFormProps) {
57 |   const router = useRouter()
58 |   const [isSubmitting, setIsSubmitting] = useState(false)
59 |   const [properties, setProperties] = useState<{ id: string; name: string }[]>([])
60 |   const [isLoadingProperties, setIsLoadingProperties] = useState(true)
61 | 
62 |   const form = useForm<TicketFormValues>({
63 |     resolver: zodResolver(ticketFormSchema),
64 |     defaultValues: {
65 |       title: "",
66 |       description: "",
67 |       priority: "low"
68 |     }
69 |   })
70 | 
71 |   useEffect(() => {
72 |     async function loadProperties() {
73 |       try {
74 |         const result = await getUserRolesAction(tenantId)
75 |         if (result.isSuccess) {
76 |           const propertyRoles = result.data.filter(
77 |             (role: UserRoleWithDetails) => role.role === "TENANT" && role.property
78 |           )
79 |           setProperties(
80 |             propertyRoles.map((role: UserRoleWithDetails) => ({
81 |               id: role.property!.id,
82 |               name: role.property!.name
83 |             }))
84 |           )
85 |         }
86 |       } catch (error) {
87 |         console.error("Error loading properties:", error)
88 |         toast({
89 |           title: "Error",
90 |           description: "Failed to load properties. Please try again.",
91 |           variant: "destructive"
92 |         })
93 |       } finally {
94 |         setIsLoadingProperties(false)
95 |       }
96 |     }
97 | 
98 |     loadProperties()
99 |   }, [tenantId])
100 | 
101 |   async function onSubmit(data: TicketFormValues) {
102 |     try {
103 |       setIsSubmitting(true)
104 |       console.log("Starting ticket submission with data:", {
105 |         ...data,
106 |         tenantId
107 |       })
108 | 
109 |       const ticket: InsertTicket = {
110 |         id: crypto.randomUUID(),
111 |         tenantId,
112 |         propertyId: data.propertyId,
113 |         title: data.title,
114 |         description: data.description,
115 |         category: data.category,
116 |         priority: data.priority,
117 |         status: "open"
118 |       }
119 | 
120 |       console.log("Submitting ticket:", ticket)
121 |       const result = await createTicketAction(ticket)
122 |       console.log("Submission result:", result)
123 | 
124 |       if (result.isSuccess) {
125 |         toast({
126 |           title: "Success",
127 |           description: "Your ticket has been submitted successfully."
128 |         })
129 |         form.reset()
130 |         onSuccess?.()
131 |         router.refresh()
132 |       } else {
133 |         console.error("Ticket submission failed:", result)
134 |         toast({
135 |           title: "Error",
136 |           description:
137 |             result.message || "Failed to submit ticket. Please try again.",
138 |           variant: "destructive"
139 |         })
140 |       }
141 |     } catch (error) {
142 |       console.error("Error submitting ticket:", {
143 |         error,
144 |         errorMessage: error instanceof Error ? error.message : "Unknown error",
145 |         errorStack: error instanceof Error ? error.stack : undefined
146 |       })
147 |       toast({
148 |         title: "Error",
149 |         description:
150 |           error instanceof Error
151 |             ? `Error: ${error.message}`
152 |             : "An unexpected error occurred. Please try again.",
153 |         variant: "destructive"
154 |       })
155 |     } finally {
156 |       setIsSubmitting(false)
157 |     }
158 |   }
159 | 
160 |   if (isLoadingProperties) {
161 |     return <div>Loading properties...</div>
162 |   }
163 | 
164 |   if (!properties.length) {
165 |     return (
166 |       <div className="text-center p-4 rounded-lg border">
167 |         <p className="text-muted-foreground">
168 |           You are not assigned to any properties. Please contact your property manager.
169 |         </p>
170 |       </div>
171 |     )
172 |   }
173 | 
174 |   return (
175 |     <Form {...form}>
176 |       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
177 |         <FormField
178 |           control={form.control}
179 |           name="propertyId"
180 |           render={({ field }) => (
181 |             <FormItem>
182 |               <FormLabel>Property</FormLabel>
183 |               <Select onValueChange={field.onChange} defaultValue={field.value}>
184 |                 <FormControl>
185 |                   <SelectTrigger>
186 |                     <SelectValue placeholder="Select a property" />
187 |                   </SelectTrigger>
188 |                 </FormControl>
189 |                 <SelectContent>
190 |                   {properties.map(property => (
191 |                     <SelectItem key={property.id} value={property.id}>
192 |                       {property.name}
193 |                     </SelectItem>
194 |                   ))}
195 |                 </SelectContent>
196 |               </Select>
197 |               <FormDescription>
198 |                 Select the property this ticket is for
199 |               </FormDescription>
200 |               <FormMessage />
201 |             </FormItem>
202 |           )}
203 |         />
204 | 
205 |         <FormField
206 |           control={form.control}
207 |           name="title"
208 |           render={({ field }) => (
209 |             <FormItem>
210 |               <FormLabel>Title</FormLabel>
211 |               <FormControl>
212 |                 <Input
213 |                   placeholder="Brief description of the issue"
214 |                   {...field}
215 |                 />
216 |               </FormControl>
217 |               <FormDescription>
218 |                 Provide a clear, concise title for your ticket
219 |               </FormDescription>
220 |               <FormMessage />
221 |             </FormItem>
222 |           )}
223 |         />
224 | 
225 |         <FormField
226 |           control={form.control}
227 |           name="category"
228 |           render={({ field }) => (
229 |             <FormItem>
230 |               <FormLabel>Category</FormLabel>
231 |               <Select onValueChange={field.onChange} defaultValue={field.value}>
232 |                 <FormControl>
233 |                   <SelectTrigger>
234 |                     <SelectValue placeholder="Select a category" />
235 |                   </SelectTrigger>
236 |                 </FormControl>
237 |                 <SelectContent>
238 |                   <SelectItem value="maintenance">Maintenance</SelectItem>
239 |                   <SelectItem value="billing">Billing</SelectItem>
240 |                   <SelectItem value="noise_complaint">
241 |                     Noise Complaint
242 |                   </SelectItem>
243 |                   <SelectItem value="other">Other</SelectItem>
244 |                 </SelectContent>
245 |               </Select>
246 |               <FormDescription>Choose the type of issue</FormDescription>
247 |               <FormMessage />
248 |             </FormItem>
249 |           )}
250 |         />
251 | 
252 |         <FormField
253 |           control={form.control}
254 |           name="priority"
255 |           render={({ field }) => (
256 |             <FormItem>
257 |               <FormLabel>Priority</FormLabel>
258 |               <Select onValueChange={field.onChange} defaultValue={field.value}>
259 |                 <FormControl>
260 |                   <SelectTrigger>
261 |                     <SelectValue placeholder="Select priority level" />
262 |                   </SelectTrigger>
263 |                 </FormControl>
264 |                 <SelectContent>
265 |                   <SelectItem value="low">Low</SelectItem>
266 |                   <SelectItem value="medium">Medium</SelectItem>
267 |                   <SelectItem value="high">High</SelectItem>
268 |                   <SelectItem value="critical">Critical</SelectItem>
269 |                 </SelectContent>
270 |               </Select>
271 |               <FormDescription>
272 |                 Select the urgency level of your issue
273 |               </FormDescription>
274 |               <FormMessage />
275 |             </FormItem>
276 |           )}
277 |         />
278 | 
279 |         <FormField
280 |           control={form.control}
281 |           name="description"
282 |           render={({ field }) => (
283 |             <FormItem>
284 |               <FormLabel>Description</FormLabel>
285 |               <FormControl>
286 |                 <Textarea
287 |                   placeholder="Detailed description of the issue"
288 |                   className="min-h-[100px]"
289 |                   {...field}
290 |                 />
291 |               </FormControl>
292 |               <FormDescription>
293 |                 Provide as much detail as possible about the issue
294 |               </FormDescription>
295 |               <FormMessage />
296 |             </FormItem>
297 |           )}
298 |         />
299 | 
300 |         <Button type="submit" disabled={isSubmitting} className="w-full">
301 |           {isSubmitting ? "Submitting..." : "Submit Ticket"}
302 |         </Button>
303 |       </form>
304 |     </Form>
305 |   )
306 | }
```

components/tickets/ticket-list.tsx
```
1 | "use client"
2 | 
3 | import { Badge } from "@/components/ui/badge"
4 | import {
5 |   Table,
6 |   TableBody,
7 |   TableCell,
8 |   TableHead,
9 |   TableHeader,
10 |   TableRow
11 | } from "@/components/ui/table"
12 | import { SelectTicket } from "@/db/schema"
13 | import { formatDistanceToNow } from "date-fns"
14 | import Link from "next/link"
15 | 
16 | interface TicketListProps {
17 |   tickets: SelectTicket[]
18 |   baseUrl: string // e.g., "/tenant/tickets" or "/staff/tickets"
19 | }
20 | 
21 | export function TicketList({ tickets, baseUrl }: TicketListProps) {
22 |   function getPriorityColor(priority: string) {
23 |     switch (priority) {
24 |       case "critical":
25 |         return "bg-red-500"
26 |       case "high":
27 |         return "bg-orange-500"
28 |       case "medium":
29 |         return "bg-yellow-500"
30 |       default:
31 |         return "bg-green-500"
32 |     }
33 |   }
34 | 
35 |   function getStatusColor(status: string) {
36 |     switch (status) {
37 |       case "open":
38 |         return "bg-blue-500"
39 |       case "in_progress":
40 |         return "bg-yellow-500"
41 |       case "completed":
42 |         return "bg-green-500"
43 |       case "completed_by_chat":
44 |         return "bg-purple-500"
45 |       case "closed":
46 |         return "bg-gray-500"
47 |       default:
48 |         return "bg-gray-500"
49 |     }
50 |   }
51 | 
52 |   return (
53 |     <Table>
54 |       <TableHeader>
55 |         <TableRow>
56 |           <TableHead>Title</TableHead>
57 |           <TableHead>Category</TableHead>
58 |           <TableHead>Priority</TableHead>
59 |           <TableHead>Status</TableHead>
60 |           <TableHead>Created</TableHead>
61 |         </TableRow>
62 |       </TableHeader>
63 |       <TableBody>
64 |         {tickets.map(ticket => (
65 |           <TableRow key={ticket.id}>
66 |             <TableCell>
67 |               <Link
68 |                 href={`${baseUrl}/${ticket.id}`}
69 |                 className="text-blue-500 hover:underline"
70 |               >
71 |                 {ticket.title}
72 |               </Link>
73 |             </TableCell>
74 |             <TableCell className="capitalize">
75 |               {ticket.category.replace(/_/g, " ")}
76 |             </TableCell>
77 |             <TableCell>
78 |               <Badge
79 |                 className={`${getPriorityColor(
80 |                   ticket.priority
81 |                 )} capitalize text-white`}
82 |               >
83 |                 {ticket.priority}
84 |               </Badge>
85 |             </TableCell>
86 |             <TableCell>
87 |               <Badge
88 |                 className={`${getStatusColor(ticket.status)} capitalize text-white`}
89 |               >
90 |                 {ticket.status.replace(/_/g, " ")}
91 |               </Badge>
92 |             </TableCell>
93 |             <TableCell>
94 |               {formatDistanceToNow(new Date(ticket.createdAt), {
95 |                 addSuffix: true
96 |               })}
97 |             </TableCell>
98 |           </TableRow>
99 |         ))}
100 |         {tickets.length === 0 && (
101 |           <TableRow>
102 |             <TableCell colSpan={5} className="py-8 text-center">
103 |               No tickets found
104 |             </TableCell>
105 |           </TableRow>
106 |         )}
107 |       </TableBody>
108 |     </Table>
109 |   )
110 | }
```

components/tickets/ticket-message-thread.tsx
```
1 | "use client"
2 | 
3 | import { createTicketMessageAction } from "@/actions/db/ticket-messages-actions"
4 | import { Button } from "@/components/ui/button"
5 | import {
6 |   Form,
7 |   FormControl,
8 |   FormField,
9 |   FormItem,
10 |   FormMessage
11 | } from "@/components/ui/form"
12 | import { Textarea } from "@/components/ui/textarea"
13 | import { toast } from "@/components/ui/use-toast"
14 | import { InsertTicketMessage, SelectTicketMessage } from "@/db/schema"
15 | import { cn } from "@/lib/utils"
16 | import { zodResolver } from "@hookform/resolvers/zod"
17 | import { formatDistanceToNow } from "date-fns"
18 | import { useRouter } from "next/navigation"
19 | import { useForm } from "react-hook-form"
20 | import { z } from "zod"
21 | 
22 | const messageSchema = z.object({
23 |   message: z
24 |     .string()
25 |     .min(1, "Message cannot be empty")
26 |     .max(1000, "Message must not exceed 1000 characters")
27 | })
28 | 
29 | type MessageValues = z.infer<typeof messageSchema>
30 | 
31 | interface TicketMessageThreadProps {
32 |   ticketId: string
33 |   messages: SelectTicketMessage[]
34 |   currentUserId: string
35 |   className?: string
36 | }
37 | 
38 | export function TicketMessageThread({
39 |   ticketId,
40 |   messages,
41 |   currentUserId,
42 |   className
43 | }: TicketMessageThreadProps) {
44 |   const router = useRouter()
45 |   const form = useForm<MessageValues>({
46 |     resolver: zodResolver(messageSchema),
47 |     defaultValues: {
48 |       message: ""
49 |     }
50 |   })
51 | 
52 |   async function onSubmit(data: MessageValues) {
53 |     const message: InsertTicketMessage = {
54 |       id: crypto.randomUUID(),
55 |       ticketId,
56 |       senderId: currentUserId,
57 |       message: data.message
58 |     }
59 | 
60 |     const result = await createTicketMessageAction(message)
61 | 
62 |     if (result.isSuccess) {
63 |       form.reset()
64 |       router.refresh()
65 |     } else {
66 |       toast({
67 |         title: "Error",
68 |         description: "Failed to send message. Please try again.",
69 |         variant: "destructive"
70 |       })
71 |     }
72 |   }
73 | 
74 |   return (
75 |     <div className={cn("space-y-4", className)}>
76 |       <div className="max-h-[500px] space-y-4 overflow-y-auto rounded-lg border p-4">
77 |         {messages.map(message => (
78 |           <div
79 |             key={message.id}
80 |             className={cn(
81 |               "flex flex-col rounded-lg p-3",
82 |               message.senderId === currentUserId
83 |                 ? "ml-auto max-w-[80%] bg-blue-500 text-white"
84 |                 : "mr-auto max-w-[80%] bg-gray-100"
85 |             )}
86 |           >
87 |             <div className="break-words text-sm">{message.message}</div>
88 |             <div
89 |               className={cn(
90 |                 "mt-1 text-xs",
91 |                 message.senderId === currentUserId
92 |                   ? "text-blue-100"
93 |                   : "text-gray-500"
94 |               )}
95 |             >
96 |               {formatDistanceToNow(new Date(message.createdAt), {
97 |                 addSuffix: true
98 |               })}
99 |             </div>
100 |           </div>
101 |         ))}
102 |         {messages.length === 0 && (
103 |           <div className="py-8 text-center text-gray-500">
104 |             No messages yet. Start the conversation!
105 |           </div>
106 |         )}
107 |       </div>
108 | 
109 |       <Form {...form}>
110 |         <form
111 |           onSubmit={form.handleSubmit(onSubmit)}
112 |           className="flex items-end gap-2"
113 |         >
114 |           <FormField
115 |             control={form.control}
116 |             name="message"
117 |             render={({ field }) => (
118 |               <FormItem className="flex-1">
119 |                 <FormControl>
120 |                   <Textarea
121 |                     placeholder="Type your message..."
122 |                     className="resize-none"
123 |                     {...field}
124 |                   />
125 |                 </FormControl>
126 |                 <FormMessage />
127 |               </FormItem>
128 |             )}
129 |           />
130 |           <Button type="submit" className="shrink-0">
131 |             Send
132 |           </Button>
133 |         </form>
134 |       </Form>
135 |     </div>
136 |   )
137 | }
```

components/tickets/ticket-status-update.tsx
```
1 | "use client"
2 | 
3 | import { updateTicketAction } from "@/actions/db/tickets-actions"
4 | import { Button } from "@/components/ui/button"
5 | import {
6 |   Form,
7 |   FormControl,
8 |   FormDescription,
9 |   FormField,
10 |   FormItem,
11 |   FormLabel,
12 |   FormMessage
13 | } from "@/components/ui/form"
14 | import {
15 |   Select,
16 |   SelectContent,
17 |   SelectItem,
18 |   SelectTrigger,
19 |   SelectValue
20 | } from "@/components/ui/select"
21 | import { Textarea } from "@/components/ui/textarea"
22 | import { toast } from "@/components/ui/use-toast"
23 | import { InsertTicket, SelectTicket } from "@/db/schema"
24 | import { zodResolver } from "@hookform/resolvers/zod"
25 | import { useRouter } from "next/navigation"
26 | import { useForm } from "react-hook-form"
27 | import { z } from "zod"
28 | 
29 | const statusUpdateSchema = z.object({
30 |   status: z.enum([
31 |     "open",
32 |     "in_progress",
33 |     "completed",
34 |     "completed_by_chat",
35 |     "closed"
36 |   ]),
37 |   resolutionDetails: z
38 |     .string()
39 |     .min(10, "Resolution details must be at least 10 characters")
40 |     .max(1000, "Resolution details must not exceed 1000 characters")
41 |     .optional()
42 |     .nullable(),
43 |   timeSpent: z
44 |     .string()
45 |     .max(50, "Time spent must not exceed 50 characters")
46 |     .optional()
47 |     .nullable(),
48 |   costIncurred: z
49 |     .string()
50 |     .max(50, "Cost incurred must not exceed 50 characters")
51 |     .optional()
52 |     .nullable()
53 | })
54 | 
55 | type StatusUpdateValues = z.infer<typeof statusUpdateSchema>
56 | 
57 | interface TicketStatusUpdateProps {
58 |   ticket: SelectTicket
59 |   onSuccess?: () => void
60 | }
61 | 
62 | export function TicketStatusUpdate({
63 |   ticket,
64 |   onSuccess
65 | }: TicketStatusUpdateProps) {
66 |   const router = useRouter()
67 |   const form = useForm<StatusUpdateValues>({
68 |     resolver: zodResolver(statusUpdateSchema),
69 |     defaultValues: {
70 |       status: ticket.status,
71 |       resolutionDetails: ticket.resolutionDetails || "",
72 |       timeSpent: ticket.timeSpent || "",
73 |       costIncurred: ticket.costIncurred || ""
74 |     }
75 |   })
76 | 
77 |   async function onSubmit(data: StatusUpdateValues) {
78 |     // If status is being changed to completed/closed, resolution details are required
79 |     if (
80 |       (data.status === "completed" || data.status === "closed") &&
81 |       !data.resolutionDetails
82 |     ) {
83 |       form.setError("resolutionDetails", {
84 |         type: "manual",
85 |         message:
86 |           "Resolution details are required when completing or closing a ticket"
87 |       })
88 |       return
89 |     }
90 | 
91 |     const updateData: Partial<InsertTicket> = {
92 |       status: data.status,
93 |       resolutionDetails: data.resolutionDetails || null,
94 |       timeSpent: data.timeSpent || null,
95 |       costIncurred: data.costIncurred || null,
96 |       ...(data.status === "closed" ? { closedAt: new Date() } : {})
97 |     }
98 | 
99 |     const result = await updateTicketAction(ticket.id, updateData)
100 | 
101 |     if (result.isSuccess) {
102 |       toast({
103 |         title: "Success",
104 |         description: "Ticket status updated successfully."
105 |       })
106 |       onSuccess?.()
107 |       router.refresh()
108 |     } else {
109 |       toast({
110 |         title: "Error",
111 |         description: "Failed to update ticket status. Please try again.",
112 |         variant: "destructive"
113 |       })
114 |     }
115 |   }
116 | 
117 |   const currentStatus = form.watch("status")
118 |   const showResolutionFields =
119 |     currentStatus === "completed" || currentStatus === "closed"
120 | 
121 |   return (
122 |     <Form {...form}>
123 |       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
124 |         <FormField
125 |           control={form.control}
126 |           name="status"
127 |           render={({ field }) => (
128 |             <FormItem>
129 |               <FormLabel>Status</FormLabel>
130 |               <Select onValueChange={field.onChange} defaultValue={field.value}>
131 |                 <FormControl>
132 |                   <SelectTrigger>
133 |                     <SelectValue placeholder="Select status" />
134 |                   </SelectTrigger>
135 |                 </FormControl>
136 |                 <SelectContent>
137 |                   <SelectItem value="open">Open</SelectItem>
138 |                   <SelectItem value="in_progress">In Progress</SelectItem>
139 |                   <SelectItem value="completed">Completed</SelectItem>
140 |                   <SelectItem value="completed_by_chat">
141 |                     Completed by Chat
142 |                   </SelectItem>
143 |                   <SelectItem value="closed">Closed</SelectItem>
144 |                 </SelectContent>
145 |               </Select>
146 |               <FormDescription>
147 |                 Update the current status of the ticket
148 |               </FormDescription>
149 |               <FormMessage />
150 |             </FormItem>
151 |           )}
152 |         />
153 | 
154 |         {showResolutionFields && (
155 |           <>
156 |             <FormField
157 |               control={form.control}
158 |               name="resolutionDetails"
159 |               render={({ field }) => (
160 |                 <FormItem>
161 |                   <FormLabel>Resolution Details</FormLabel>
162 |                   <FormControl>
163 |                     <Textarea
164 |                       placeholder="Describe how the issue was resolved"
165 |                       className="min-h-[100px]"
166 |                       {...field}
167 |                       value={field.value || ""}
168 |                     />
169 |                   </FormControl>
170 |                   <FormDescription>
171 |                     Provide details about how the issue was resolved
172 |                   </FormDescription>
173 |                   <FormMessage />
174 |                 </FormItem>
175 |               )}
176 |             />
177 | 
178 |             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
179 |               <FormField
180 |                 control={form.control}
181 |                 name="timeSpent"
182 |                 render={({ field }) => (
183 |                   <FormItem>
184 |                     <FormLabel>Time Spent</FormLabel>
185 |                     <FormControl>
186 |                       <Textarea
187 |                         placeholder="e.g., 2 hours"
188 |                         {...field}
189 |                         value={field.value || ""}
190 |                       />
191 |                     </FormControl>
192 |                     <FormDescription>
193 |                       Record the time spent on resolution
194 |                     </FormDescription>
195 |                     <FormMessage />
196 |                   </FormItem>
197 |                 )}
198 |               />
199 | 
200 |               <FormField
201 |                 control={form.control}
202 |                 name="costIncurred"
203 |                 render={({ field }) => (
204 |                   <FormItem>
205 |                     <FormLabel>Cost Incurred</FormLabel>
206 |                     <FormControl>
207 |                       <Textarea
208 |                         placeholder="e.g., $150"
209 |                         {...field}
210 |                         value={field.value || ""}
211 |                       />
212 |                     </FormControl>
213 |                     <FormDescription>
214 |                       Record any costs associated with the resolution
215 |                     </FormDescription>
216 |                     <FormMessage />
217 |                   </FormItem>
218 |                 )}
219 |               />
220 |             </div>
221 |           </>
222 |         )}
223 | 
224 |         <Button type="submit" className="w-full">
225 |           Update Status
226 |         </Button>
227 |       </form>
228 |     </Form>
229 |   )
230 | }
```

components/sidebar/app-sidebar.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides the sidebar for the app.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import {
10 |   AudioWaveform,
11 |   BookOpen,
12 |   Bot,
13 |   Command,
14 |   Frame,
15 |   GalleryVerticalEnd,
16 |   Map,
17 |   PieChart,
18 |   Settings2,
19 |   SquareTerminal
20 | } from "lucide-react"
21 | import * as React from "react"
22 | 
23 | import {
24 |   Sidebar,
25 |   SidebarContent,
26 |   SidebarFooter,
27 |   SidebarHeader,
28 |   SidebarRail
29 | } from "@/components/ui/sidebar"
30 | import { NavMain } from "./nav-main"
31 | import { NavProjects } from "./nav-projects"
32 | import { NavUser } from "./nav-user"
33 | import { TeamSwitcher } from "./team-switcher"
34 | 
35 | // Sample data
36 | const data = {
37 |   user: {
38 |     name: "shadcn",
39 |     email: "m@example.com",
40 |     avatar: "/avatars/shadcn.jpg"
41 |   },
42 |   teams: [
43 |     {
44 |       name: "Acme Inc",
45 |       logo: GalleryVerticalEnd,
46 |       plan: "Enterprise"
47 |     },
48 |     {
49 |       name: "Acme Corp.",
50 |       logo: AudioWaveform,
51 |       plan: "Startup"
52 |     },
53 |     {
54 |       name: "Evil Corp.",
55 |       logo: Command,
56 |       plan: "Free"
57 |     }
58 |   ],
59 |   navMain: [
60 |     {
61 |       title: "Playground",
62 |       url: "#",
63 |       icon: SquareTerminal,
64 |       isActive: true,
65 |       items: [
66 |         { title: "History", url: "#" },
67 |         { title: "Starred", url: "#" },
68 |         { title: "Settings", url: "#" }
69 |       ]
70 |     },
71 |     {
72 |       title: "Models",
73 |       url: "#",
74 |       icon: Bot,
75 |       items: [
76 |         { title: "Genesis", url: "#" },
77 |         { title: "Explorer", url: "#" },
78 |         { title: "Quantum", url: "#" }
79 |       ]
80 |     },
81 |     {
82 |       title: "Documentation",
83 |       url: "#",
84 |       icon: BookOpen,
85 |       items: [
86 |         { title: "Introduction", url: "#" },
87 |         { title: "Get Started", url: "#" },
88 |         { title: "Tutorials", url: "#" },
89 |         { title: "Changelog", url: "#" }
90 |       ]
91 |     },
92 |     {
93 |       title: "Settings",
94 |       url: "#",
95 |       icon: Settings2,
96 |       items: [
97 |         { title: "General", url: "#" },
98 |         { title: "Team", url: "#" },
99 |         { title: "Billing", url: "#" },
100 |         { title: "Limits", url: "#" }
101 |       ]
102 |     }
103 |   ],
104 |   projects: [
105 |     { name: "Design Engineering", url: "#", icon: Frame },
106 |     { name: "Sales & Marketing", url: "#", icon: PieChart },
107 |     { name: "Travel", url: "#", icon: Map }
108 |   ]
109 | }
110 | 
111 | export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
112 |   return (
113 |     <Sidebar collapsible="icon" {...props}>
114 |       <SidebarHeader>
115 |         <TeamSwitcher teams={data.teams} />
116 |       </SidebarHeader>
117 |       <SidebarContent>
118 |         <NavMain items={data.navMain} />
119 |         <NavProjects projects={data.projects} />
120 |       </SidebarContent>
121 |       <SidebarFooter>
122 |         <NavUser />
123 |       </SidebarFooter>
124 |       <SidebarRail />
125 |     </Sidebar>
126 |   )
127 | }
```

components/sidebar/nav-main.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides a main navigation for the sidebar.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import {
10 |   Collapsible,
11 |   CollapsibleContent,
12 |   CollapsibleTrigger
13 | } from "@/components/ui/collapsible"
14 | import {
15 |   SidebarGroup,
16 |   SidebarGroupLabel,
17 |   SidebarMenu,
18 |   SidebarMenuButton,
19 |   SidebarMenuItem,
20 |   SidebarMenuSub,
21 |   SidebarMenuSubButton,
22 |   SidebarMenuSubItem
23 | } from "@/components/ui/sidebar"
24 | import { ChevronRight, type LucideIcon } from "lucide-react"
25 | 
26 | export function NavMain({
27 |   items
28 | }: {
29 |   items: {
30 |     title: string
31 |     url: string
32 |     icon?: LucideIcon
33 |     isActive?: boolean
34 |     items?: { title: string; url: string }[]
35 |   }[]
36 | }) {
37 |   return (
38 |     <SidebarGroup>
39 |       <SidebarGroupLabel>Platform</SidebarGroupLabel>
40 |       <SidebarMenu>
41 |         {items.map(item => (
42 |           <Collapsible
43 |             key={item.title}
44 |             asChild
45 |             defaultOpen={item.isActive}
46 |             className="group/collapsible"
47 |           >
48 |             <SidebarMenuItem>
49 |               <CollapsibleTrigger asChild>
50 |                 <SidebarMenuButton tooltip={item.title}>
51 |                   {item.icon && <item.icon />}
52 |                   <span>{item.title}</span>
53 |                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
54 |                 </SidebarMenuButton>
55 |               </CollapsibleTrigger>
56 |               <CollapsibleContent>
57 |                 <SidebarMenuSub>
58 |                   {item.items?.map(subItem => (
59 |                     <SidebarMenuSubItem key={subItem.title}>
60 |                       <SidebarMenuSubButton asChild>
61 |                         <a href={subItem.url}>
62 |                           <span>{subItem.title}</span>
63 |                         </a>
64 |                       </SidebarMenuSubButton>
65 |                     </SidebarMenuSubItem>
66 |                   ))}
67 |                 </SidebarMenuSub>
68 |               </CollapsibleContent>
69 |             </SidebarMenuItem>
70 |           </Collapsible>
71 |         ))}
72 |       </SidebarMenu>
73 |     </SidebarGroup>
74 |   )
75 | }
```

components/sidebar/nav-projects.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides a list of projects for the sidebar.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import {
10 |   DropdownMenu,
11 |   DropdownMenuContent,
12 |   DropdownMenuItem,
13 |   DropdownMenuSeparator,
14 |   DropdownMenuTrigger
15 | } from "@/components/ui/dropdown-menu"
16 | import {
17 |   SidebarGroup,
18 |   SidebarGroupLabel,
19 |   SidebarMenu,
20 |   SidebarMenuAction,
21 |   SidebarMenuButton,
22 |   SidebarMenuItem,
23 |   useSidebar
24 | } from "@/components/ui/sidebar"
25 | import {
26 |   Folder,
27 |   Forward,
28 |   MoreHorizontal,
29 |   Trash2,
30 |   type LucideIcon
31 | } from "lucide-react"
32 | 
33 | export function NavProjects({
34 |   projects
35 | }: {
36 |   projects: {
37 |     name: string
38 |     url: string
39 |     icon: LucideIcon
40 |   }[]
41 | }) {
42 |   const { isMobile } = useSidebar()
43 | 
44 |   return (
45 |     <SidebarGroup className="group-data-[collapsible=icon]:hidden">
46 |       <SidebarGroupLabel>Projects</SidebarGroupLabel>
47 |       <SidebarMenu>
48 |         {projects.map(item => (
49 |           <SidebarMenuItem key={item.name}>
50 |             <SidebarMenuButton asChild>
51 |               <a href={item.url}>
52 |                 <item.icon />
53 |                 <span>{item.name}</span>
54 |               </a>
55 |             </SidebarMenuButton>
56 |             <DropdownMenu>
57 |               <DropdownMenuTrigger asChild>
58 |                 <SidebarMenuAction showOnHover>
59 |                   <MoreHorizontal />
60 |                   <span className="sr-only">More</span>
61 |                 </SidebarMenuAction>
62 |               </DropdownMenuTrigger>
63 |               <DropdownMenuContent
64 |                 className="w-48 rounded-lg"
65 |                 side={isMobile ? "bottom" : "right"}
66 |                 align={isMobile ? "end" : "start"}
67 |               >
68 |                 <DropdownMenuItem>
69 |                   <Folder className="text-muted-foreground" />
70 |                   <span>View Project</span>
71 |                 </DropdownMenuItem>
72 |                 <DropdownMenuItem>
73 |                   <Forward className="text-muted-foreground" />
74 |                   <span>Share Project</span>
75 |                 </DropdownMenuItem>
76 |                 <DropdownMenuSeparator />
77 |                 <DropdownMenuItem>
78 |                   <Trash2 className="text-muted-foreground" />
79 |                   <span>Delete Project</span>
80 |                 </DropdownMenuItem>
81 |               </DropdownMenuContent>
82 |             </DropdownMenu>
83 |           </SidebarMenuItem>
84 |         ))}
85 |         <SidebarMenuItem>
86 |           <SidebarMenuButton className="text-sidebar-foreground/70">
87 |             <MoreHorizontal className="text-sidebar-foreground/70" />
88 |             <span>More</span>
89 |           </SidebarMenuButton>
90 |         </SidebarMenuItem>
91 |       </SidebarMenu>
92 |     </SidebarGroup>
93 |   )
94 | }
```

components/sidebar/nav-user.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides a user button for the sidebar via Clerk.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
10 | import { UserButton, useUser } from "@clerk/nextjs"
11 | 
12 | export function NavUser() {
13 |   const { user } = useUser()
14 | 
15 |   return (
16 |     <SidebarMenu>
17 |       <SidebarMenuItem className="flex items-center gap-2 font-medium">
18 |         <UserButton afterSignOutUrl="/" />
19 |         {user?.fullName}
20 |       </SidebarMenuItem>
21 |     </SidebarMenu>
22 |   )
23 | }
```

components/sidebar/team-switcher.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides a team switcher for the sidebar.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { ChevronsUpDown, Plus } from "lucide-react"
10 | import * as React from "react"
11 | 
12 | import {
13 |   DropdownMenu,
14 |   DropdownMenuContent,
15 |   DropdownMenuItem,
16 |   DropdownMenuLabel,
17 |   DropdownMenuSeparator,
18 |   DropdownMenuShortcut,
19 |   DropdownMenuTrigger
20 | } from "@/components/ui/dropdown-menu"
21 | import {
22 |   SidebarMenu,
23 |   SidebarMenuButton,
24 |   SidebarMenuItem,
25 |   useSidebar
26 | } from "@/components/ui/sidebar"
27 | 
28 | export function TeamSwitcher({
29 |   teams
30 | }: {
31 |   teams: {
32 |     name: string
33 |     logo: React.ElementType
34 |     plan: string
35 |   }[]
36 | }) {
37 |   const { isMobile } = useSidebar()
38 |   const [activeTeam, setActiveTeam] = React.useState(teams[0])
39 | 
40 |   return (
41 |     <SidebarMenu>
42 |       <SidebarMenuItem>
43 |         <DropdownMenu>
44 |           <DropdownMenuTrigger asChild>
45 |             <SidebarMenuButton
46 |               size="lg"
47 |               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
48 |             >
49 |               <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
50 |                 <activeTeam.logo className="size-4" />
51 |               </div>
52 |               <div className="grid flex-1 text-left text-sm leading-tight">
53 |                 <span className="truncate font-semibold">
54 |                   {activeTeam.name}
55 |                 </span>
56 |                 <span className="truncate text-xs">{activeTeam.plan}</span>
57 |               </div>
58 |               <ChevronsUpDown className="ml-auto" />
59 |             </SidebarMenuButton>
60 |           </DropdownMenuTrigger>
61 |           <DropdownMenuContent
62 |             className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
63 |             align="start"
64 |             side={isMobile ? "bottom" : "right"}
65 |             sideOffset={4}
66 |           >
67 |             <DropdownMenuLabel className="text-muted-foreground text-xs">
68 |               Teams
69 |             </DropdownMenuLabel>
70 |             {teams.map((team, index) => (
71 |               <DropdownMenuItem
72 |                 key={team.name}
73 |                 onClick={() => setActiveTeam(team)}
74 |                 className="gap-2 p-2"
75 |               >
76 |                 <div className="flex size-6 items-center justify-center rounded-sm border">
77 |                   <team.logo className="size-4 shrink-0" />
78 |                 </div>
79 |                 {team.name}
80 |                 <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
81 |               </DropdownMenuItem>
82 |             ))}
83 |             <DropdownMenuSeparator />
84 |             <DropdownMenuItem className="gap-2 p-2">
85 |               <div className="bg-background flex size-6 items-center justify-center rounded-md border">
86 |                 <Plus className="size-4" />
87 |               </div>
88 |               <div className="text-muted-foreground font-medium">Add team</div>
89 |             </DropdownMenuItem>
90 |           </DropdownMenuContent>
91 |         </DropdownMenu>
92 |       </SidebarMenuItem>
93 |     </SidebarMenu>
94 |   )
95 | }
```

components/utilities/providers.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides the providers for the app.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { TooltipProvider } from "@/components/ui/tooltip"
10 | import { ThemeProvider as NextThemesProvider } from "next-themes"
11 | import { ThemeProviderProps } from "next-themes/dist/types"
12 | import { CSPostHogProvider } from "./posthog/posthog-provider"
13 | 
14 | export const Providers = ({ children, ...props }: ThemeProviderProps) => {
15 |   return (
16 |     <NextThemesProvider {...props}>
17 |       <TooltipProvider>
18 |         <CSPostHogProvider>{children}</CSPostHogProvider>
19 |       </TooltipProvider>
20 |     </NextThemesProvider>
21 |   )
22 | }
```

components/utilities/tailwind-indicator.tsx
```
1 | /*
2 | <ai_context>
3 | This server component provides a tailwind indicator for the app in dev mode.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | export async function TailwindIndicator() {
10 |   // Don't show in production
11 |   if (process.env.NODE_ENV === "production") return null
12 | 
13 |   return (
14 |     <div className="fixed bottom-12 left-3 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
15 |       <div className="block sm:hidden">xs</div>
16 |       <div className="hidden sm:block md:hidden">sm</div>
17 |       <div className="hidden md:block lg:hidden">md</div>
18 |       <div className="hidden lg:block xl:hidden">lg</div>
19 |       <div className="hidden xl:block 2xl:hidden">xl</div>
20 |       <div className="hidden 2xl:block">2xl</div>
21 |     </div>
22 |   )
23 | }
```

components/utilities/theme-switcher.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides a theme switcher for the app.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { cn } from "@/lib/utils"
10 | import { Moon, Sun } from "lucide-react"
11 | import { useTheme } from "next-themes"
12 | import { HTMLAttributes, ReactNode, useEffect, useState } from "react"
13 | 
14 | interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {
15 |   children?: ReactNode
16 | }
17 | 
18 | export const ThemeSwitcher = ({ children, ...props }: ThemeSwitcherProps) => {
19 |   const { setTheme, theme } = useTheme()
20 |   const [mounted, setMounted] = useState(false)
21 | 
22 |   useEffect(() => {
23 |     setMounted(true)
24 |   }, [])
25 | 
26 |   if (!mounted) {
27 |     return null
28 |   }
29 | 
30 |   const handleChange = (theme: "dark" | "light") => {
31 |     localStorage.setItem("theme", theme)
32 |     setTheme(theme)
33 |   }
34 | 
35 |   return (
36 |     <div
37 |       className={cn(
38 |         "p-1 hover:cursor-pointer hover:opacity-50",
39 |         props.className
40 |       )}
41 |       onClick={() => handleChange(theme === "light" ? "dark" : "light")}
42 |     >
43 |       {theme === "dark" ? (
44 |         <Moon className="size-6" />
45 |       ) : (
46 |         <Sun className="size-6" />
47 |       )}
48 |     </div>
49 |   )
50 | }
```

components/ui/accordion.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as AccordionPrimitive from "@radix-ui/react-accordion"
5 | import { ChevronDown } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const Accordion = AccordionPrimitive.Root
10 | 
11 | const AccordionItem = React.forwardRef<
12 |   React.ElementRef<typeof AccordionPrimitive.Item>,
13 |   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
14 | >(({ className, ...props }, ref) => (
15 |   <AccordionPrimitive.Item
16 |     ref={ref}
17 |     className={cn("border-b", className)}
18 |     {...props}
19 |   />
20 | ))
21 | AccordionItem.displayName = "AccordionItem"
22 | 
23 | const AccordionTrigger = React.forwardRef<
24 |   React.ElementRef<typeof AccordionPrimitive.Trigger>,
25 |   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
26 | >(({ className, children, ...props }, ref) => (
27 |   <AccordionPrimitive.Header className="flex">
28 |     <AccordionPrimitive.Trigger
29 |       ref={ref}
30 |       className={cn(
31 |         "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
32 |         className
33 |       )}
34 |       {...props}
35 |     >
36 |       {children}
37 |       <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
38 |     </AccordionPrimitive.Trigger>
39 |   </AccordionPrimitive.Header>
40 | ))
41 | AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName
42 | 
43 | const AccordionContent = React.forwardRef<
44 |   React.ElementRef<typeof AccordionPrimitive.Content>,
45 |   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
46 | >(({ className, children, ...props }, ref) => (
47 |   <AccordionPrimitive.Content
48 |     ref={ref}
49 |     className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
50 |     {...props}
51 |   >
52 |     <div className={cn("pb-4 pt-0", className)}>{children}</div>
53 |   </AccordionPrimitive.Content>
54 | ))
55 | 
56 | AccordionContent.displayName = AccordionPrimitive.Content.displayName
57 | 
58 | export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

components/ui/alert-dialog.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
5 | 
6 | import { cn } from "@/lib/utils"
7 | import { buttonVariants } from "@/components/ui/button"
8 | 
9 | const AlertDialog = AlertDialogPrimitive.Root
10 | 
11 | const AlertDialogTrigger = AlertDialogPrimitive.Trigger
12 | 
13 | const AlertDialogPortal = AlertDialogPrimitive.Portal
14 | 
15 | const AlertDialogOverlay = React.forwardRef<
16 |   React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
17 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
18 | >(({ className, ...props }, ref) => (
19 |   <AlertDialogPrimitive.Overlay
20 |     className={cn(
21 |       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80",
22 |       className
23 |     )}
24 |     {...props}
25 |     ref={ref}
26 |   />
27 | ))
28 | AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName
29 | 
30 | const AlertDialogContent = React.forwardRef<
31 |   React.ElementRef<typeof AlertDialogPrimitive.Content>,
32 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
33 | >(({ className, ...props }, ref) => (
34 |   <AlertDialogPortal>
35 |     <AlertDialogOverlay />
36 |     <AlertDialogPrimitive.Content
37 |       ref={ref}
38 |       className={cn(
39 |         "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
40 |         className
41 |       )}
42 |       {...props}
43 |     />
44 |   </AlertDialogPortal>
45 | ))
46 | AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName
47 | 
48 | const AlertDialogHeader = ({
49 |   className,
50 |   ...props
51 | }: React.HTMLAttributes<HTMLDivElement>) => (
52 |   <div
53 |     className={cn(
54 |       "flex flex-col space-y-2 text-center sm:text-left",
55 |       className
56 |     )}
57 |     {...props}
58 |   />
59 | )
60 | AlertDialogHeader.displayName = "AlertDialogHeader"
61 | 
62 | const AlertDialogFooter = ({
63 |   className,
64 |   ...props
65 | }: React.HTMLAttributes<HTMLDivElement>) => (
66 |   <div
67 |     className={cn(
68 |       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
69 |       className
70 |     )}
71 |     {...props}
72 |   />
73 | )
74 | AlertDialogFooter.displayName = "AlertDialogFooter"
75 | 
76 | const AlertDialogTitle = React.forwardRef<
77 |   React.ElementRef<typeof AlertDialogPrimitive.Title>,
78 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
79 | >(({ className, ...props }, ref) => (
80 |   <AlertDialogPrimitive.Title
81 |     ref={ref}
82 |     className={cn("text-lg font-semibold", className)}
83 |     {...props}
84 |   />
85 | ))
86 | AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName
87 | 
88 | const AlertDialogDescription = React.forwardRef<
89 |   React.ElementRef<typeof AlertDialogPrimitive.Description>,
90 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
91 | >(({ className, ...props }, ref) => (
92 |   <AlertDialogPrimitive.Description
93 |     ref={ref}
94 |     className={cn("text-muted-foreground text-sm", className)}
95 |     {...props}
96 |   />
97 | ))
98 | AlertDialogDescription.displayName =
99 |   AlertDialogPrimitive.Description.displayName
100 | 
101 | const AlertDialogAction = React.forwardRef<
102 |   React.ElementRef<typeof AlertDialogPrimitive.Action>,
103 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
104 | >(({ className, ...props }, ref) => (
105 |   <AlertDialogPrimitive.Action
106 |     ref={ref}
107 |     className={cn(buttonVariants(), className)}
108 |     {...props}
109 |   />
110 | ))
111 | AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName
112 | 
113 | const AlertDialogCancel = React.forwardRef<
114 |   React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
115 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
116 | >(({ className, ...props }, ref) => (
117 |   <AlertDialogPrimitive.Cancel
118 |     ref={ref}
119 |     className={cn(
120 |       buttonVariants({ variant: "outline" }),
121 |       "mt-2 sm:mt-0",
122 |       className
123 |     )}
124 |     {...props}
125 |   />
126 | ))
127 | AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName
128 | 
129 | export {
130 |   AlertDialog,
131 |   AlertDialogPortal,
132 |   AlertDialogOverlay,
133 |   AlertDialogTrigger,
134 |   AlertDialogContent,
135 |   AlertDialogHeader,
136 |   AlertDialogFooter,
137 |   AlertDialogTitle,
138 |   AlertDialogDescription,
139 |   AlertDialogAction,
140 |   AlertDialogCancel
141 | }
```

components/ui/alert.tsx
```
1 | import * as React from "react"
2 | import { cva, type VariantProps } from "class-variance-authority"
3 | 
4 | import { cn } from "@/lib/utils"
5 | 
6 | const alertVariants = cva(
7 |   "[&>svg]:text-foreground relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
8 |   {
9 |     variants: {
10 |       variant: {
11 |         default: "bg-background text-foreground",
12 |         destructive:
13 |           "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
14 |       }
15 |     },
16 |     defaultVariants: {
17 |       variant: "default"
18 |     }
19 |   }
20 | )
21 | 
22 | const Alert = React.forwardRef<
23 |   HTMLDivElement,
24 |   React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
25 | >(({ className, variant, ...props }, ref) => (
26 |   <div
27 |     ref={ref}
28 |     role="alert"
29 |     className={cn(alertVariants({ variant }), className)}
30 |     {...props}
31 |   />
32 | ))
33 | Alert.displayName = "Alert"
34 | 
35 | const AlertTitle = React.forwardRef<
36 |   HTMLParagraphElement,
37 |   React.HTMLAttributes<HTMLHeadingElement>
38 | >(({ className, ...props }, ref) => (
39 |   <h5
40 |     ref={ref}
41 |     className={cn("mb-1 font-medium leading-none tracking-tight", className)}
42 |     {...props}
43 |   />
44 | ))
45 | AlertTitle.displayName = "AlertTitle"
46 | 
47 | const AlertDescription = React.forwardRef<
48 |   HTMLParagraphElement,
49 |   React.HTMLAttributes<HTMLParagraphElement>
50 | >(({ className, ...props }, ref) => (
51 |   <div
52 |     ref={ref}
53 |     className={cn("text-sm [&_p]:leading-relaxed", className)}
54 |     {...props}
55 |   />
56 | ))
57 | AlertDescription.displayName = "AlertDescription"
58 | 
59 | export { Alert, AlertTitle, AlertDescription }
```

components/ui/aspect-ratio.tsx
```
1 | "use client"
2 | 
3 | import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
4 | 
5 | const AspectRatio = AspectRatioPrimitive.Root
6 | 
7 | export { AspectRatio }
```

components/ui/avatar.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as AvatarPrimitive from "@radix-ui/react-avatar"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Avatar = React.forwardRef<
9 |   React.ElementRef<typeof AvatarPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
11 | >(({ className, ...props }, ref) => (
12 |   <AvatarPrimitive.Root
13 |     ref={ref}
14 |     className={cn(
15 |       "relative flex size-10 shrink-0 overflow-hidden rounded-full",
16 |       className
17 |     )}
18 |     {...props}
19 |   />
20 | ))
21 | Avatar.displayName = AvatarPrimitive.Root.displayName
22 | 
23 | const AvatarImage = React.forwardRef<
24 |   React.ElementRef<typeof AvatarPrimitive.Image>,
25 |   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
26 | >(({ className, ...props }, ref) => (
27 |   <AvatarPrimitive.Image
28 |     ref={ref}
29 |     className={cn("aspect-square size-full", className)}
30 |     {...props}
31 |   />
32 | ))
33 | AvatarImage.displayName = AvatarPrimitive.Image.displayName
34 | 
35 | const AvatarFallback = React.forwardRef<
36 |   React.ElementRef<typeof AvatarPrimitive.Fallback>,
37 |   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
38 | >(({ className, ...props }, ref) => (
39 |   <AvatarPrimitive.Fallback
40 |     ref={ref}
41 |     className={cn(
42 |       "bg-muted flex size-full items-center justify-center rounded-full",
43 |       className
44 |     )}
45 |     {...props}
46 |   />
47 | ))
48 | AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
49 | 
50 | export { Avatar, AvatarImage, AvatarFallback }
```

components/ui/badge.tsx
```
1 | import * as React from "react"
2 | import { cva, type VariantProps } from "class-variance-authority"
3 | 
4 | import { cn } from "@/lib/utils"
5 | 
6 | const badgeVariants = cva(
7 |   "focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
8 |   {
9 |     variants: {
10 |       variant: {
11 |         default:
12 |           "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
13 |         secondary:
14 |           "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
15 |         destructive:
16 |           "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
17 |         outline: "text-foreground"
18 |       }
19 |     },
20 |     defaultVariants: {
21 |       variant: "default"
22 |     }
23 |   }
24 | )
25 | 
26 | export interface BadgeProps
27 |   extends React.HTMLAttributes<HTMLDivElement>,
28 |     VariantProps<typeof badgeVariants> {}
29 | 
30 | function Badge({ className, variant, ...props }: BadgeProps) {
31 |   return (
32 |     <div className={cn(badgeVariants({ variant }), className)} {...props} />
33 |   )
34 | }
35 | 
36 | export { Badge, badgeVariants }
```

components/ui/breadcrumb.tsx
```
1 | import * as React from "react"
2 | import { Slot } from "@radix-ui/react-slot"
3 | import { ChevronRight, MoreHorizontal } from "lucide-react"
4 | 
5 | import { cn } from "@/lib/utils"
6 | 
7 | const Breadcrumb = React.forwardRef<
8 |   HTMLElement,
9 |   React.ComponentPropsWithoutRef<"nav"> & {
10 |     separator?: React.ReactNode
11 |   }
12 | >(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
13 | Breadcrumb.displayName = "Breadcrumb"
14 | 
15 | const BreadcrumbList = React.forwardRef<
16 |   HTMLOListElement,
17 |   React.ComponentPropsWithoutRef<"ol">
18 | >(({ className, ...props }, ref) => (
19 |   <ol
20 |     ref={ref}
21 |     className={cn(
22 |       "text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5",
23 |       className
24 |     )}
25 |     {...props}
26 |   />
27 | ))
28 | BreadcrumbList.displayName = "BreadcrumbList"
29 | 
30 | const BreadcrumbItem = React.forwardRef<
31 |   HTMLLIElement,
32 |   React.ComponentPropsWithoutRef<"li">
33 | >(({ className, ...props }, ref) => (
34 |   <li
35 |     ref={ref}
36 |     className={cn("inline-flex items-center gap-1.5", className)}
37 |     {...props}
38 |   />
39 | ))
40 | BreadcrumbItem.displayName = "BreadcrumbItem"
41 | 
42 | const BreadcrumbLink = React.forwardRef<
43 |   HTMLAnchorElement,
44 |   React.ComponentPropsWithoutRef<"a"> & {
45 |     asChild?: boolean
46 |   }
47 | >(({ asChild, className, ...props }, ref) => {
48 |   const Comp = asChild ? Slot : "a"
49 | 
50 |   return (
51 |     <Comp
52 |       ref={ref}
53 |       className={cn("hover:text-foreground transition-colors", className)}
54 |       {...props}
55 |     />
56 |   )
57 | })
58 | BreadcrumbLink.displayName = "BreadcrumbLink"
59 | 
60 | const BreadcrumbPage = React.forwardRef<
61 |   HTMLSpanElement,
62 |   React.ComponentPropsWithoutRef<"span">
63 | >(({ className, ...props }, ref) => (
64 |   <span
65 |     ref={ref}
66 |     role="link"
67 |     aria-disabled="true"
68 |     aria-current="page"
69 |     className={cn("text-foreground font-normal", className)}
70 |     {...props}
71 |   />
72 | ))
73 | BreadcrumbPage.displayName = "BreadcrumbPage"
74 | 
75 | const BreadcrumbSeparator = ({
76 |   children,
77 |   className,
78 |   ...props
79 | }: React.ComponentProps<"li">) => (
80 |   <li
81 |     role="presentation"
82 |     aria-hidden="true"
83 |     className={cn("[&>svg]:size-3.5", className)}
84 |     {...props}
85 |   >
86 |     {children ?? <ChevronRight />}
87 |   </li>
88 | )
89 | BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
90 | 
91 | const BreadcrumbEllipsis = ({
92 |   className,
93 |   ...props
94 | }: React.ComponentProps<"span">) => (
95 |   <span
96 |     role="presentation"
97 |     aria-hidden="true"
98 |     className={cn("flex size-9 items-center justify-center", className)}
99 |     {...props}
100 |   >
101 |     <MoreHorizontal className="size-4" />
102 |     <span className="sr-only">More</span>
103 |   </span>
104 | )
105 | BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"
106 | 
107 | export {
108 |   Breadcrumb,
109 |   BreadcrumbList,
110 |   BreadcrumbItem,
111 |   BreadcrumbLink,
112 |   BreadcrumbPage,
113 |   BreadcrumbSeparator,
114 |   BreadcrumbEllipsis
115 | }
```

components/ui/button.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import { Slot } from "@radix-ui/react-slot"
5 | import { cva, type VariantProps } from "class-variance-authority"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const buttonVariants = cva(
10 |   "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
11 |   {
12 |     variants: {
13 |       variant: {
14 |         default: "bg-primary text-primary-foreground hover:bg-primary/90",
15 |         destructive:
16 |           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
17 |         outline:
18 |           "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
19 |         secondary:
20 |           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
21 |         ghost: "hover:bg-accent hover:text-accent-foreground",
22 |         link: "text-primary underline-offset-4 hover:underline"
23 |       },
24 |       size: {
25 |         default: "h-10 px-4 py-2",
26 |         sm: "h-9 rounded-md px-3",
27 |         lg: "h-11 rounded-md px-8",
28 |         icon: "size-10"
29 |       }
30 |     },
31 |     defaultVariants: {
32 |       variant: "default",
33 |       size: "default"
34 |     }
35 |   }
36 | )
37 | 
38 | export interface ButtonProps
39 |   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
40 |     VariantProps<typeof buttonVariants> {
41 |   asChild?: boolean
42 | }
43 | 
44 | const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
45 |   ({ className, variant, size, asChild = false, ...props }, ref) => {
46 |     const Comp = asChild ? Slot : "button"
47 |     return (
48 |       <Comp
49 |         className={cn(buttonVariants({ variant, size, className }))}
50 |         ref={ref}
51 |         {...props}
52 |       />
53 |     )
54 |   }
55 | )
56 | Button.displayName = "Button"
57 | 
58 | export { Button, buttonVariants }
```

components/ui/calendar.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import { ChevronLeft, ChevronRight } from "lucide-react"
5 | import { DayPicker } from "react-day-picker"
6 | 
7 | import { cn } from "@/lib/utils"
8 | import { buttonVariants } from "@/components/ui/button"
9 | 
10 | export type CalendarProps = React.ComponentProps<typeof DayPicker>
11 | 
12 | function Calendar({
13 |   className,
14 |   classNames,
15 |   showOutsideDays = true,
16 |   ...props
17 | }: CalendarProps) {
18 |   return (
19 |     <DayPicker
20 |       showOutsideDays={showOutsideDays}
21 |       className={cn("p-3", className)}
22 |       classNames={{
23 |         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
24 |         month: "space-y-4",
25 |         caption: "flex justify-center pt-1 relative items-center",
26 |         caption_label: "text-sm font-medium",
27 |         nav: "space-x-1 flex items-center",
28 |         nav_button: cn(
29 |           buttonVariants({ variant: "outline" }),
30 |           "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
31 |         ),
32 |         nav_button_previous: "absolute left-1",
33 |         nav_button_next: "absolute right-1",
34 |         table: "w-full border-collapse space-y-1",
35 |         head_row: "flex",
36 |         head_cell:
37 |           "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
38 |         row: "flex w-full mt-2",
39 |         cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
40 |         day: cn(
41 |           buttonVariants({ variant: "ghost" }),
42 |           "size-9 p-0 font-normal aria-selected:opacity-100"
43 |         ),
44 |         day_range_end: "day-range-end",
45 |         day_selected:
46 |           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
47 |         day_today: "bg-accent text-accent-foreground",
48 |         day_outside:
49 |           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
50 |         day_disabled: "text-muted-foreground opacity-50",
51 |         day_range_middle:
52 |           "aria-selected:bg-accent aria-selected:text-accent-foreground",
53 |         day_hidden: "invisible",
54 |         ...classNames
55 |       }}
56 |       components={{
57 |         IconLeft: ({ className, ...props }) => (
58 |           <ChevronLeft className={cn("size-4", className)} {...props} />
59 |         ),
60 |         IconRight: ({ className, ...props }) => (
61 |           <ChevronRight className={cn("size-4", className)} {...props} />
62 |         )
63 |       }}
64 |       {...props}
65 |     />
66 |   )
67 | }
68 | Calendar.displayName = "Calendar"
69 | 
70 | export { Calendar }
```

components/ui/card.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Card = React.forwardRef<
6 |   HTMLDivElement,
7 |   React.HTMLAttributes<HTMLDivElement>
8 | >(({ className, ...props }, ref) => (
9 |   <div
10 |     ref={ref}
11 |     className={cn(
12 |       "bg-card text-card-foreground rounded-lg border shadow-sm",
13 |       className
14 |     )}
15 |     {...props}
16 |   />
17 | ))
18 | Card.displayName = "Card"
19 | 
20 | const CardHeader = React.forwardRef<
21 |   HTMLDivElement,
22 |   React.HTMLAttributes<HTMLDivElement>
23 | >(({ className, ...props }, ref) => (
24 |   <div
25 |     ref={ref}
26 |     className={cn("flex flex-col space-y-1.5 p-6", className)}
27 |     {...props}
28 |   />
29 | ))
30 | CardHeader.displayName = "CardHeader"
31 | 
32 | const CardTitle = React.forwardRef<
33 |   HTMLDivElement,
34 |   React.HTMLAttributes<HTMLDivElement>
35 | >(({ className, ...props }, ref) => (
36 |   <div
37 |     ref={ref}
38 |     className={cn(
39 |       "text-2xl font-semibold leading-none tracking-tight",
40 |       className
41 |     )}
42 |     {...props}
43 |   />
44 | ))
45 | CardTitle.displayName = "CardTitle"
46 | 
47 | const CardDescription = React.forwardRef<
48 |   HTMLDivElement,
49 |   React.HTMLAttributes<HTMLDivElement>
50 | >(({ className, ...props }, ref) => (
51 |   <div
52 |     ref={ref}
53 |     className={cn("text-muted-foreground text-sm", className)}
54 |     {...props}
55 |   />
56 | ))
57 | CardDescription.displayName = "CardDescription"
58 | 
59 | const CardContent = React.forwardRef<
60 |   HTMLDivElement,
61 |   React.HTMLAttributes<HTMLDivElement>
62 | >(({ className, ...props }, ref) => (
63 |   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
64 | ))
65 | CardContent.displayName = "CardContent"
66 | 
67 | const CardFooter = React.forwardRef<
68 |   HTMLDivElement,
69 |   React.HTMLAttributes<HTMLDivElement>
70 | >(({ className, ...props }, ref) => (
71 |   <div
72 |     ref={ref}
73 |     className={cn("flex items-center p-6 pt-0", className)}
74 |     {...props}
75 |   />
76 | ))
77 | CardFooter.displayName = "CardFooter"
78 | 
79 | export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

components/ui/carousel.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import useEmblaCarousel, {
5 |   type UseEmblaCarouselType
6 | } from "embla-carousel-react"
7 | import { ArrowLeft, ArrowRight } from "lucide-react"
8 | 
9 | import { cn } from "@/lib/utils"
10 | import { Button } from "@/components/ui/button"
11 | 
12 | type CarouselApi = UseEmblaCarouselType[1]
13 | type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
14 | type CarouselOptions = UseCarouselParameters[0]
15 | type CarouselPlugin = UseCarouselParameters[1]
16 | 
17 | type CarouselProps = {
18 |   opts?: CarouselOptions
19 |   plugins?: CarouselPlugin
20 |   orientation?: "horizontal" | "vertical"
21 |   setApi?: (api: CarouselApi) => void
22 | }
23 | 
24 | type CarouselContextProps = {
25 |   carouselRef: ReturnType<typeof useEmblaCarousel>[0]
26 |   api: ReturnType<typeof useEmblaCarousel>[1]
27 |   scrollPrev: () => void
28 |   scrollNext: () => void
29 |   canScrollPrev: boolean
30 |   canScrollNext: boolean
31 | } & CarouselProps
32 | 
33 | const CarouselContext = React.createContext<CarouselContextProps | null>(null)
34 | 
35 | function useCarousel() {
36 |   const context = React.useContext(CarouselContext)
37 | 
38 |   if (!context) {
39 |     throw new Error("useCarousel must be used within a <Carousel />")
40 |   }
41 | 
42 |   return context
43 | }
44 | 
45 | const Carousel = React.forwardRef<
46 |   HTMLDivElement,
47 |   React.HTMLAttributes<HTMLDivElement> & CarouselProps
48 | >(
49 |   (
50 |     {
51 |       orientation = "horizontal",
52 |       opts,
53 |       setApi,
54 |       plugins,
55 |       className,
56 |       children,
57 |       ...props
58 |     },
59 |     ref
60 |   ) => {
61 |     const [carouselRef, api] = useEmblaCarousel(
62 |       {
63 |         ...opts,
64 |         axis: orientation === "horizontal" ? "x" : "y"
65 |       },
66 |       plugins
67 |     )
68 |     const [canScrollPrev, setCanScrollPrev] = React.useState(false)
69 |     const [canScrollNext, setCanScrollNext] = React.useState(false)
70 | 
71 |     const onSelect = React.useCallback((api: CarouselApi) => {
72 |       if (!api) {
73 |         return
74 |       }
75 | 
76 |       setCanScrollPrev(api.canScrollPrev())
77 |       setCanScrollNext(api.canScrollNext())
78 |     }, [])
79 | 
80 |     const scrollPrev = React.useCallback(() => {
81 |       api?.scrollPrev()
82 |     }, [api])
83 | 
84 |     const scrollNext = React.useCallback(() => {
85 |       api?.scrollNext()
86 |     }, [api])
87 | 
88 |     const handleKeyDown = React.useCallback(
89 |       (event: React.KeyboardEvent<HTMLDivElement>) => {
90 |         if (event.key === "ArrowLeft") {
91 |           event.preventDefault()
92 |           scrollPrev()
93 |         } else if (event.key === "ArrowRight") {
94 |           event.preventDefault()
95 |           scrollNext()
96 |         }
97 |       },
98 |       [scrollPrev, scrollNext]
99 |     )
100 | 
101 |     React.useEffect(() => {
102 |       if (!api || !setApi) {
103 |         return
104 |       }
105 | 
106 |       setApi(api)
107 |     }, [api, setApi])
108 | 
109 |     React.useEffect(() => {
110 |       if (!api) {
111 |         return
112 |       }
113 | 
114 |       onSelect(api)
115 |       api.on("reInit", onSelect)
116 |       api.on("select", onSelect)
117 | 
118 |       return () => {
119 |         api?.off("select", onSelect)
120 |       }
121 |     }, [api, onSelect])
122 | 
123 |     return (
124 |       <CarouselContext.Provider
125 |         value={{
126 |           carouselRef,
127 |           api: api,
128 |           opts,
129 |           orientation:
130 |             orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
131 |           scrollPrev,
132 |           scrollNext,
133 |           canScrollPrev,
134 |           canScrollNext
135 |         }}
136 |       >
137 |         <div
138 |           ref={ref}
139 |           onKeyDownCapture={handleKeyDown}
140 |           className={cn("relative", className)}
141 |           role="region"
142 |           aria-roledescription="carousel"
143 |           {...props}
144 |         >
145 |           {children}
146 |         </div>
147 |       </CarouselContext.Provider>
148 |     )
149 |   }
150 | )
151 | Carousel.displayName = "Carousel"
152 | 
153 | const CarouselContent = React.forwardRef<
154 |   HTMLDivElement,
155 |   React.HTMLAttributes<HTMLDivElement>
156 | >(({ className, ...props }, ref) => {
157 |   const { carouselRef, orientation } = useCarousel()
158 | 
159 |   return (
160 |     <div ref={carouselRef} className="overflow-hidden">
161 |       <div
162 |         ref={ref}
163 |         className={cn(
164 |           "flex",
165 |           orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
166 |           className
167 |         )}
168 |         {...props}
169 |       />
170 |     </div>
171 |   )
172 | })
173 | CarouselContent.displayName = "CarouselContent"
174 | 
175 | const CarouselItem = React.forwardRef<
176 |   HTMLDivElement,
177 |   React.HTMLAttributes<HTMLDivElement>
178 | >(({ className, ...props }, ref) => {
179 |   const { orientation } = useCarousel()
180 | 
181 |   return (
182 |     <div
183 |       ref={ref}
184 |       role="group"
185 |       aria-roledescription="slide"
186 |       className={cn(
187 |         "min-w-0 shrink-0 grow-0 basis-full",
188 |         orientation === "horizontal" ? "pl-4" : "pt-4",
189 |         className
190 |       )}
191 |       {...props}
192 |     />
193 |   )
194 | })
195 | CarouselItem.displayName = "CarouselItem"
196 | 
197 | const CarouselPrevious = React.forwardRef<
198 |   HTMLButtonElement,
199 |   React.ComponentProps<typeof Button>
200 | >(({ className, variant = "outline", size = "icon", ...props }, ref) => {
201 |   const { orientation, scrollPrev, canScrollPrev } = useCarousel()
202 | 
203 |   return (
204 |     <Button
205 |       ref={ref}
206 |       variant={variant}
207 |       size={size}
208 |       className={cn(
209 |         "absolute  size-8 rounded-full",
210 |         orientation === "horizontal"
211 |           ? "-left-12 top-1/2 -translate-y-1/2"
212 |           : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
213 |         className
214 |       )}
215 |       disabled={!canScrollPrev}
216 |       onClick={scrollPrev}
217 |       {...props}
218 |     >
219 |       <ArrowLeft className="size-4" />
220 |       <span className="sr-only">Previous slide</span>
221 |     </Button>
222 |   )
223 | })
224 | CarouselPrevious.displayName = "CarouselPrevious"
225 | 
226 | const CarouselNext = React.forwardRef<
227 |   HTMLButtonElement,
228 |   React.ComponentProps<typeof Button>
229 | >(({ className, variant = "outline", size = "icon", ...props }, ref) => {
230 |   const { orientation, scrollNext, canScrollNext } = useCarousel()
231 | 
232 |   return (
233 |     <Button
234 |       ref={ref}
235 |       variant={variant}
236 |       size={size}
237 |       className={cn(
238 |         "absolute size-8 rounded-full",
239 |         orientation === "horizontal"
240 |           ? "-right-12 top-1/2 -translate-y-1/2"
241 |           : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
242 |         className
243 |       )}
244 |       disabled={!canScrollNext}
245 |       onClick={scrollNext}
246 |       {...props}
247 |     >
248 |       <ArrowRight className="size-4" />
249 |       <span className="sr-only">Next slide</span>
250 |     </Button>
251 |   )
252 | })
253 | CarouselNext.displayName = "CarouselNext"
254 | 
255 | export {
256 |   type CarouselApi,
257 |   Carousel,
258 |   CarouselContent,
259 |   CarouselItem,
260 |   CarouselPrevious,
261 |   CarouselNext
262 | }
```

components/ui/chart.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as RechartsPrimitive from "recharts"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | // Format: { THEME_NAME: CSS_SELECTOR }
9 | const THEMES = { light: "", dark: ".dark" } as const
10 | 
11 | export type ChartConfig = {
12 |   [k in string]: {
13 |     label?: React.ReactNode
14 |     icon?: React.ComponentType
15 |   } & (
16 |     | { color?: string; theme?: never }
17 |     | { color?: never; theme: Record<keyof typeof THEMES, string> }
18 |   )
19 | }
20 | 
21 | type ChartContextProps = {
22 |   config: ChartConfig
23 | }
24 | 
25 | const ChartContext = React.createContext<ChartContextProps | null>(null)
26 | 
27 | function useChart() {
28 |   const context = React.useContext(ChartContext)
29 | 
30 |   if (!context) {
31 |     throw new Error("useChart must be used within a <ChartContainer />")
32 |   }
33 | 
34 |   return context
35 | }
36 | 
37 | const ChartContainer = React.forwardRef<
38 |   HTMLDivElement,
39 |   React.ComponentProps<"div"> & {
40 |     config: ChartConfig
41 |     children: React.ComponentProps<
42 |       typeof RechartsPrimitive.ResponsiveContainer
43 |     >["children"]
44 |   }
45 | >(({ id, className, children, config, ...props }, ref) => {
46 |   const uniqueId = React.useId()
47 |   const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
48 | 
49 |   return (
50 |     <ChartContext.Provider value={{ config }}>
51 |       <div
52 |         data-chart={chartId}
53 |         ref={ref}
54 |         className={cn(
55 |           "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
56 |           className
57 |         )}
58 |         {...props}
59 |       >
60 |         <ChartStyle id={chartId} config={config} />
61 |         <RechartsPrimitive.ResponsiveContainer>
62 |           {children}
63 |         </RechartsPrimitive.ResponsiveContainer>
64 |       </div>
65 |     </ChartContext.Provider>
66 |   )
67 | })
68 | ChartContainer.displayName = "Chart"
69 | 
70 | const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
71 |   const colorConfig = Object.entries(config).filter(
72 |     ([, config]) => config.theme || config.color
73 |   )
74 | 
75 |   if (!colorConfig.length) {
76 |     return null
77 |   }
78 | 
79 |   return (
80 |     <style
81 |       dangerouslySetInnerHTML={{
82 |         __html: Object.entries(THEMES)
83 |           .map(
84 |             ([theme, prefix]) => `
85 | ${prefix} [data-chart=${id}] {
86 | ${colorConfig
87 |   .map(([key, itemConfig]) => {
88 |     const color =
89 |       itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
90 |       itemConfig.color
91 |     return color ? `  --color-${key}: ${color};` : null
92 |   })
93 |   .join("\n")}
94 | }
95 | `
96 |           )
97 |           .join("\n")
98 |       }}
99 |     />
100 |   )
101 | }
102 | 
103 | const ChartTooltip = RechartsPrimitive.Tooltip
104 | 
105 | const ChartTooltipContent = React.forwardRef<
106 |   HTMLDivElement,
107 |   React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
108 |     React.ComponentProps<"div"> & {
109 |       hideLabel?: boolean
110 |       hideIndicator?: boolean
111 |       indicator?: "line" | "dot" | "dashed"
112 |       nameKey?: string
113 |       labelKey?: string
114 |     }
115 | >(
116 |   (
117 |     {
118 |       active,
119 |       payload,
120 |       className,
121 |       indicator = "dot",
122 |       hideLabel = false,
123 |       hideIndicator = false,
124 |       label,
125 |       labelFormatter,
126 |       labelClassName,
127 |       formatter,
128 |       color,
129 |       nameKey,
130 |       labelKey
131 |     },
132 |     ref
133 |   ) => {
134 |     const { config } = useChart()
135 | 
136 |     const tooltipLabel = React.useMemo(() => {
137 |       if (hideLabel || !payload?.length) {
138 |         return null
139 |       }
140 | 
141 |       const [item] = payload
142 |       const key = `${labelKey || item.dataKey || item.name || "value"}`
143 |       const itemConfig = getPayloadConfigFromPayload(config, item, key)
144 |       const value =
145 |         !labelKey && typeof label === "string"
146 |           ? config[label as keyof typeof config]?.label || label
147 |           : itemConfig?.label
148 | 
149 |       if (labelFormatter) {
150 |         return (
151 |           <div className={cn("font-medium", labelClassName)}>
152 |             {labelFormatter(value, payload)}
153 |           </div>
154 |         )
155 |       }
156 | 
157 |       if (!value) {
158 |         return null
159 |       }
160 | 
161 |       return <div className={cn("font-medium", labelClassName)}>{value}</div>
162 |     }, [
163 |       label,
164 |       labelFormatter,
165 |       payload,
166 |       hideLabel,
167 |       labelClassName,
168 |       config,
169 |       labelKey
170 |     ])
171 | 
172 |     if (!active || !payload?.length) {
173 |       return null
174 |     }
175 | 
176 |     const nestLabel = payload.length === 1 && indicator !== "dot"
177 | 
178 |     return (
179 |       <div
180 |         ref={ref}
181 |         className={cn(
182 |           "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
183 |           className
184 |         )}
185 |       >
186 |         {!nestLabel ? tooltipLabel : null}
187 |         <div className="grid gap-1.5">
188 |           {payload.map((item, index) => {
189 |             const key = `${nameKey || item.name || item.dataKey || "value"}`
190 |             const itemConfig = getPayloadConfigFromPayload(config, item, key)
191 |             const indicatorColor = color || item.payload.fill || item.color
192 | 
193 |             return (
194 |               <div
195 |                 key={item.dataKey}
196 |                 className={cn(
197 |                   "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5",
198 |                   indicator === "dot" && "items-center"
199 |                 )}
200 |               >
201 |                 {formatter && item?.value !== undefined && item.name ? (
202 |                   formatter(item.value, item.name, item, index, item.payload)
203 |                 ) : (
204 |                   <>
205 |                     {itemConfig?.icon ? (
206 |                       <itemConfig.icon />
207 |                     ) : (
208 |                       !hideIndicator && (
209 |                         <div
210 |                           className={cn(
211 |                             "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
212 |                             {
213 |                               "h-2.5 w-2.5": indicator === "dot",
214 |                               "w-1": indicator === "line",
215 |                               "w-0 border-[1.5px] border-dashed bg-transparent":
216 |                                 indicator === "dashed",
217 |                               "my-0.5": nestLabel && indicator === "dashed"
218 |                             }
219 |                           )}
220 |                           style={
221 |                             {
222 |                               "--color-bg": indicatorColor,
223 |                               "--color-border": indicatorColor
224 |                             } as React.CSSProperties
225 |                           }
226 |                         />
227 |                       )
228 |                     )}
229 |                     <div
230 |                       className={cn(
231 |                         "flex flex-1 justify-between leading-none",
232 |                         nestLabel ? "items-end" : "items-center"
233 |                       )}
234 |                     >
235 |                       <div className="grid gap-1.5">
236 |                         {nestLabel ? tooltipLabel : null}
237 |                         <span className="text-muted-foreground">
238 |                           {itemConfig?.label || item.name}
239 |                         </span>
240 |                       </div>
241 |                       {item.value && (
242 |                         <span className="text-foreground font-mono font-medium tabular-nums">
243 |                           {item.value.toLocaleString()}
244 |                         </span>
245 |                       )}
246 |                     </div>
247 |                   </>
248 |                 )}
249 |               </div>
250 |             )
251 |           })}
252 |         </div>
253 |       </div>
254 |     )
255 |   }
256 | )
257 | ChartTooltipContent.displayName = "ChartTooltip"
258 | 
259 | const ChartLegend = RechartsPrimitive.Legend
260 | 
261 | const ChartLegendContent = React.forwardRef<
262 |   HTMLDivElement,
263 |   React.ComponentProps<"div"> &
264 |     Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
265 |       hideIcon?: boolean
266 |       nameKey?: string
267 |     }
268 | >(
269 |   (
270 |     { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
271 |     ref
272 |   ) => {
273 |     const { config } = useChart()
274 | 
275 |     if (!payload?.length) {
276 |       return null
277 |     }
278 | 
279 |     return (
280 |       <div
281 |         ref={ref}
282 |         className={cn(
283 |           "flex items-center justify-center gap-4",
284 |           verticalAlign === "top" ? "pb-3" : "pt-3",
285 |           className
286 |         )}
287 |       >
288 |         {payload.map(item => {
289 |           const key = `${nameKey || item.dataKey || "value"}`
290 |           const itemConfig = getPayloadConfigFromPayload(config, item, key)
291 | 
292 |           return (
293 |             <div
294 |               key={item.value}
295 |               className={cn(
296 |                 "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:size-3"
297 |               )}
298 |             >
299 |               {itemConfig?.icon && !hideIcon ? (
300 |                 <itemConfig.icon />
301 |               ) : (
302 |                 <div
303 |                   className="size-2 shrink-0 rounded-[2px]"
304 |                   style={{
305 |                     backgroundColor: item.color
306 |                   }}
307 |                 />
308 |               )}
309 |               {itemConfig?.label}
310 |             </div>
311 |           )
312 |         })}
313 |       </div>
314 |     )
315 |   }
316 | )
317 | ChartLegendContent.displayName = "ChartLegend"
318 | 
319 | // Helper to extract item config from a payload.
320 | function getPayloadConfigFromPayload(
321 |   config: ChartConfig,
322 |   payload: unknown,
323 |   key: string
324 | ) {
325 |   if (typeof payload !== "object" || payload === null) {
326 |     return undefined
327 |   }
328 | 
329 |   const payloadPayload =
330 |     "payload" in payload &&
331 |     typeof payload.payload === "object" &&
332 |     payload.payload !== null
333 |       ? payload.payload
334 |       : undefined
335 | 
336 |   let configLabelKey: string = key
337 | 
338 |   if (
339 |     key in payload &&
340 |     typeof payload[key as keyof typeof payload] === "string"
341 |   ) {
342 |     configLabelKey = payload[key as keyof typeof payload] as string
343 |   } else if (
344 |     payloadPayload &&
345 |     key in payloadPayload &&
346 |     typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
347 |   ) {
348 |     configLabelKey = payloadPayload[
349 |       key as keyof typeof payloadPayload
350 |     ] as string
351 |   }
352 | 
353 |   return configLabelKey in config
354 |     ? config[configLabelKey]
355 |     : config[key as keyof typeof config]
356 | }
357 | 
358 | export {
359 |   ChartContainer,
360 |   ChartTooltip,
361 |   ChartTooltipContent,
362 |   ChartLegend,
363 |   ChartLegendContent,
364 |   ChartStyle
365 | }
```

components/ui/checkbox.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
5 | import { Check } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const Checkbox = React.forwardRef<
10 |   React.ElementRef<typeof CheckboxPrimitive.Root>,
11 |   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
12 | >(({ className, ...props }, ref) => (
13 |   <CheckboxPrimitive.Root
14 |     ref={ref}
15 |     className={cn(
16 |       "border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer size-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
17 |       className
18 |     )}
19 |     {...props}
20 |   >
21 |     <CheckboxPrimitive.Indicator
22 |       className={cn("flex items-center justify-center text-current")}
23 |     >
24 |       <Check className="size-4" />
25 |     </CheckboxPrimitive.Indicator>
26 |   </CheckboxPrimitive.Root>
27 | ))
28 | Checkbox.displayName = CheckboxPrimitive.Root.displayName
29 | 
30 | export { Checkbox }
```

components/ui/collapsible.tsx
```
1 | "use client"
2 | 
3 | import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
4 | 
5 | const Collapsible = CollapsiblePrimitive.Root
6 | 
7 | const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
8 | 
9 | const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent
10 | 
11 | export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

components/ui/command.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import { type DialogProps } from "@radix-ui/react-dialog"
5 | import { Command as CommandPrimitive } from "cmdk"
6 | import { Search } from "lucide-react"
7 | 
8 | import { cn } from "@/lib/utils"
9 | import { Dialog, DialogContent } from "@/components/ui/dialog"
10 | 
11 | const Command = React.forwardRef<
12 |   React.ElementRef<typeof CommandPrimitive>,
13 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive>
14 | >(({ className, ...props }, ref) => (
15 |   <CommandPrimitive
16 |     ref={ref}
17 |     className={cn(
18 |       "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md",
19 |       className
20 |     )}
21 |     {...props}
22 |   />
23 | ))
24 | Command.displayName = CommandPrimitive.displayName
25 | 
26 | const CommandDialog = ({ children, ...props }: DialogProps) => {
27 |   return (
28 |     <Dialog {...props}>
29 |       <DialogContent className="overflow-hidden p-0 shadow-lg">
30 |         <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
31 |           {children}
32 |         </Command>
33 |       </DialogContent>
34 |     </Dialog>
35 |   )
36 | }
37 | 
38 | const CommandInput = React.forwardRef<
39 |   React.ElementRef<typeof CommandPrimitive.Input>,
40 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
41 | >(({ className, ...props }, ref) => (
42 |   <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
43 |     <Search className="mr-2 size-4 shrink-0 opacity-50" />
44 |     <CommandPrimitive.Input
45 |       ref={ref}
46 |       className={cn(
47 |         "placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
48 |         className
49 |       )}
50 |       {...props}
51 |     />
52 |   </div>
53 | ))
54 | 
55 | CommandInput.displayName = CommandPrimitive.Input.displayName
56 | 
57 | const CommandList = React.forwardRef<
58 |   React.ElementRef<typeof CommandPrimitive.List>,
59 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
60 | >(({ className, ...props }, ref) => (
61 |   <CommandPrimitive.List
62 |     ref={ref}
63 |     className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
64 |     {...props}
65 |   />
66 | ))
67 | 
68 | CommandList.displayName = CommandPrimitive.List.displayName
69 | 
70 | const CommandEmpty = React.forwardRef<
71 |   React.ElementRef<typeof CommandPrimitive.Empty>,
72 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
73 | >((props, ref) => (
74 |   <CommandPrimitive.Empty
75 |     ref={ref}
76 |     className="py-6 text-center text-sm"
77 |     {...props}
78 |   />
79 | ))
80 | 
81 | CommandEmpty.displayName = CommandPrimitive.Empty.displayName
82 | 
83 | const CommandGroup = React.forwardRef<
84 |   React.ElementRef<typeof CommandPrimitive.Group>,
85 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
86 | >(({ className, ...props }, ref) => (
87 |   <CommandPrimitive.Group
88 |     ref={ref}
89 |     className={cn(
90 |       "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
91 |       className
92 |     )}
93 |     {...props}
94 |   />
95 | ))
96 | 
97 | CommandGroup.displayName = CommandPrimitive.Group.displayName
98 | 
99 | const CommandSeparator = React.forwardRef<
100 |   React.ElementRef<typeof CommandPrimitive.Separator>,
101 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
102 | >(({ className, ...props }, ref) => (
103 |   <CommandPrimitive.Separator
104 |     ref={ref}
105 |     className={cn("bg-border -mx-1 h-px", className)}
106 |     {...props}
107 |   />
108 | ))
109 | CommandSeparator.displayName = CommandPrimitive.Separator.displayName
110 | 
111 | const CommandItem = React.forwardRef<
112 |   React.ElementRef<typeof CommandPrimitive.Item>,
113 |   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
114 | >(({ className, ...props }, ref) => (
115 |   <CommandPrimitive.Item
116 |     ref={ref}
117 |     className={cn(
118 |       "data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
119 |       className
120 |     )}
121 |     {...props}
122 |   />
123 | ))
124 | 
125 | CommandItem.displayName = CommandPrimitive.Item.displayName
126 | 
127 | const CommandShortcut = ({
128 |   className,
129 |   ...props
130 | }: React.HTMLAttributes<HTMLSpanElement>) => {
131 |   return (
132 |     <span
133 |       className={cn(
134 |         "text-muted-foreground ml-auto text-xs tracking-widest",
135 |         className
136 |       )}
137 |       {...props}
138 |     />
139 |   )
140 | }
141 | CommandShortcut.displayName = "CommandShortcut"
142 | 
143 | export {
144 |   Command,
145 |   CommandDialog,
146 |   CommandInput,
147 |   CommandList,
148 |   CommandEmpty,
149 |   CommandGroup,
150 |   CommandItem,
151 |   CommandShortcut,
152 |   CommandSeparator
153 | }
```

components/ui/context-menu.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
5 | import { Check, ChevronRight, Circle } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const ContextMenu = ContextMenuPrimitive.Root
10 | 
11 | const ContextMenuTrigger = ContextMenuPrimitive.Trigger
12 | 
13 | const ContextMenuGroup = ContextMenuPrimitive.Group
14 | 
15 | const ContextMenuPortal = ContextMenuPrimitive.Portal
16 | 
17 | const ContextMenuSub = ContextMenuPrimitive.Sub
18 | 
19 | const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup
20 | 
21 | const ContextMenuSubTrigger = React.forwardRef<
22 |   React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
23 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
24 |     inset?: boolean
25 |   }
26 | >(({ className, inset, children, ...props }, ref) => (
27 |   <ContextMenuPrimitive.SubTrigger
28 |     ref={ref}
29 |     className={cn(
30 |       "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
31 |       inset && "pl-8",
32 |       className
33 |     )}
34 |     {...props}
35 |   >
36 |     {children}
37 |     <ChevronRight className="ml-auto size-4" />
38 |   </ContextMenuPrimitive.SubTrigger>
39 | ))
40 | ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName
41 | 
42 | const ContextMenuSubContent = React.forwardRef<
43 |   React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
44 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
45 | >(({ className, ...props }, ref) => (
46 |   <ContextMenuPrimitive.SubContent
47 |     ref={ref}
48 |     className={cn(
49 |       "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
50 |       className
51 |     )}
52 |     {...props}
53 |   />
54 | ))
55 | ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName
56 | 
57 | const ContextMenuContent = React.forwardRef<
58 |   React.ElementRef<typeof ContextMenuPrimitive.Content>,
59 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
60 | >(({ className, ...props }, ref) => (
61 |   <ContextMenuPrimitive.Portal>
62 |     <ContextMenuPrimitive.Content
63 |       ref={ref}
64 |       className={cn(
65 |         "bg-popover text-popover-foreground animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
66 |         className
67 |       )}
68 |       {...props}
69 |     />
70 |   </ContextMenuPrimitive.Portal>
71 | ))
72 | ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName
73 | 
74 | const ContextMenuItem = React.forwardRef<
75 |   React.ElementRef<typeof ContextMenuPrimitive.Item>,
76 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
77 |     inset?: boolean
78 |   }
79 | >(({ className, inset, ...props }, ref) => (
80 |   <ContextMenuPrimitive.Item
81 |     ref={ref}
82 |     className={cn(
83 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
84 |       inset && "pl-8",
85 |       className
86 |     )}
87 |     {...props}
88 |   />
89 | ))
90 | ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName
91 | 
92 | const ContextMenuCheckboxItem = React.forwardRef<
93 |   React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
94 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
95 | >(({ className, children, checked, ...props }, ref) => (
96 |   <ContextMenuPrimitive.CheckboxItem
97 |     ref={ref}
98 |     className={cn(
99 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
100 |       className
101 |     )}
102 |     checked={checked}
103 |     {...props}
104 |   >
105 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
106 |       <ContextMenuPrimitive.ItemIndicator>
107 |         <Check className="size-4" />
108 |       </ContextMenuPrimitive.ItemIndicator>
109 |     </span>
110 |     {children}
111 |   </ContextMenuPrimitive.CheckboxItem>
112 | ))
113 | ContextMenuCheckboxItem.displayName =
114 |   ContextMenuPrimitive.CheckboxItem.displayName
115 | 
116 | const ContextMenuRadioItem = React.forwardRef<
117 |   React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
118 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
119 | >(({ className, children, ...props }, ref) => (
120 |   <ContextMenuPrimitive.RadioItem
121 |     ref={ref}
122 |     className={cn(
123 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
124 |       className
125 |     )}
126 |     {...props}
127 |   >
128 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
129 |       <ContextMenuPrimitive.ItemIndicator>
130 |         <Circle className="size-2 fill-current" />
131 |       </ContextMenuPrimitive.ItemIndicator>
132 |     </span>
133 |     {children}
134 |   </ContextMenuPrimitive.RadioItem>
135 | ))
136 | ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName
137 | 
138 | const ContextMenuLabel = React.forwardRef<
139 |   React.ElementRef<typeof ContextMenuPrimitive.Label>,
140 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
141 |     inset?: boolean
142 |   }
143 | >(({ className, inset, ...props }, ref) => (
144 |   <ContextMenuPrimitive.Label
145 |     ref={ref}
146 |     className={cn(
147 |       "text-foreground px-2 py-1.5 text-sm font-semibold",
148 |       inset && "pl-8",
149 |       className
150 |     )}
151 |     {...props}
152 |   />
153 | ))
154 | ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName
155 | 
156 | const ContextMenuSeparator = React.forwardRef<
157 |   React.ElementRef<typeof ContextMenuPrimitive.Separator>,
158 |   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
159 | >(({ className, ...props }, ref) => (
160 |   <ContextMenuPrimitive.Separator
161 |     ref={ref}
162 |     className={cn("bg-border -mx-1 my-1 h-px", className)}
163 |     {...props}
164 |   />
165 | ))
166 | ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName
167 | 
168 | const ContextMenuShortcut = ({
169 |   className,
170 |   ...props
171 | }: React.HTMLAttributes<HTMLSpanElement>) => {
172 |   return (
173 |     <span
174 |       className={cn(
175 |         "text-muted-foreground ml-auto text-xs tracking-widest",
176 |         className
177 |       )}
178 |       {...props}
179 |     />
180 |   )
181 | }
182 | ContextMenuShortcut.displayName = "ContextMenuShortcut"
183 | 
184 | export {
185 |   ContextMenu,
186 |   ContextMenuTrigger,
187 |   ContextMenuContent,
188 |   ContextMenuItem,
189 |   ContextMenuCheckboxItem,
190 |   ContextMenuRadioItem,
191 |   ContextMenuLabel,
192 |   ContextMenuSeparator,
193 |   ContextMenuShortcut,
194 |   ContextMenuGroup,
195 |   ContextMenuPortal,
196 |   ContextMenuSub,
197 |   ContextMenuSubContent,
198 |   ContextMenuSubTrigger,
199 |   ContextMenuRadioGroup
200 | }
```

components/ui/dialog.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as DialogPrimitive from "@radix-ui/react-dialog"
5 | import { X } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const Dialog = DialogPrimitive.Root
10 | 
11 | const DialogTrigger = DialogPrimitive.Trigger
12 | 
13 | const DialogPortal = DialogPrimitive.Portal
14 | 
15 | const DialogClose = DialogPrimitive.Close
16 | 
17 | const DialogOverlay = React.forwardRef<
18 |   React.ElementRef<typeof DialogPrimitive.Overlay>,
19 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
20 | >(({ className, ...props }, ref) => (
21 |   <DialogPrimitive.Overlay
22 |     ref={ref}
23 |     className={cn(
24 |       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80",
25 |       className
26 |     )}
27 |     {...props}
28 |   />
29 | ))
30 | DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
31 | 
32 | const DialogContent = React.forwardRef<
33 |   React.ElementRef<typeof DialogPrimitive.Content>,
34 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
35 | >(({ className, children, ...props }, ref) => (
36 |   <DialogPortal>
37 |     <DialogOverlay />
38 |     <DialogPrimitive.Content
39 |       ref={ref}
40 |       className={cn(
41 |         "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
42 |         className
43 |       )}
44 |       {...props}
45 |     >
46 |       {children}
47 |       <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
48 |         <X className="size-4" />
49 |         <span className="sr-only">Close</span>
50 |       </DialogPrimitive.Close>
51 |     </DialogPrimitive.Content>
52 |   </DialogPortal>
53 | ))
54 | DialogContent.displayName = DialogPrimitive.Content.displayName
55 | 
56 | const DialogHeader = ({
57 |   className,
58 |   ...props
59 | }: React.HTMLAttributes<HTMLDivElement>) => (
60 |   <div
61 |     className={cn(
62 |       "flex flex-col space-y-1.5 text-center sm:text-left",
63 |       className
64 |     )}
65 |     {...props}
66 |   />
67 | )
68 | DialogHeader.displayName = "DialogHeader"
69 | 
70 | const DialogFooter = ({
71 |   className,
72 |   ...props
73 | }: React.HTMLAttributes<HTMLDivElement>) => (
74 |   <div
75 |     className={cn(
76 |       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
77 |       className
78 |     )}
79 |     {...props}
80 |   />
81 | )
82 | DialogFooter.displayName = "DialogFooter"
83 | 
84 | const DialogTitle = React.forwardRef<
85 |   React.ElementRef<typeof DialogPrimitive.Title>,
86 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
87 | >(({ className, ...props }, ref) => (
88 |   <DialogPrimitive.Title
89 |     ref={ref}
90 |     className={cn(
91 |       "text-lg font-semibold leading-none tracking-tight",
92 |       className
93 |     )}
94 |     {...props}
95 |   />
96 | ))
97 | DialogTitle.displayName = DialogPrimitive.Title.displayName
98 | 
99 | const DialogDescription = React.forwardRef<
100 |   React.ElementRef<typeof DialogPrimitive.Description>,
101 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
102 | >(({ className, ...props }, ref) => (
103 |   <DialogPrimitive.Description
104 |     ref={ref}
105 |     className={cn("text-muted-foreground text-sm", className)}
106 |     {...props}
107 |   />
108 | ))
109 | DialogDescription.displayName = DialogPrimitive.Description.displayName
110 | 
111 | export {
112 |   Dialog,
113 |   DialogPortal,
114 |   DialogOverlay,
115 |   DialogClose,
116 |   DialogTrigger,
117 |   DialogContent,
118 |   DialogHeader,
119 |   DialogFooter,
120 |   DialogTitle,
121 |   DialogDescription
122 | }
```

components/ui/drawer.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import { Drawer as DrawerPrimitive } from "vaul"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Drawer = ({
9 |   shouldScaleBackground = true,
10 |   ...props
11 | }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
12 |   <DrawerPrimitive.Root
13 |     shouldScaleBackground={shouldScaleBackground}
14 |     {...props}
15 |   />
16 | )
17 | Drawer.displayName = "Drawer"
18 | 
19 | const DrawerTrigger = DrawerPrimitive.Trigger
20 | 
21 | const DrawerPortal = DrawerPrimitive.Portal
22 | 
23 | const DrawerClose = DrawerPrimitive.Close
24 | 
25 | const DrawerOverlay = React.forwardRef<
26 |   React.ElementRef<typeof DrawerPrimitive.Overlay>,
27 |   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
28 | >(({ className, ...props }, ref) => (
29 |   <DrawerPrimitive.Overlay
30 |     ref={ref}
31 |     className={cn("fixed inset-0 z-50 bg-black/80", className)}
32 |     {...props}
33 |   />
34 | ))
35 | DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName
36 | 
37 | const DrawerContent = React.forwardRef<
38 |   React.ElementRef<typeof DrawerPrimitive.Content>,
39 |   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
40 | >(({ className, children, ...props }, ref) => (
41 |   <DrawerPortal>
42 |     <DrawerOverlay />
43 |     <DrawerPrimitive.Content
44 |       ref={ref}
45 |       className={cn(
46 |         "bg-background fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border",
47 |         className
48 |       )}
49 |       {...props}
50 |     >
51 |       <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
52 |       {children}
53 |     </DrawerPrimitive.Content>
54 |   </DrawerPortal>
55 | ))
56 | DrawerContent.displayName = "DrawerContent"
57 | 
58 | const DrawerHeader = ({
59 |   className,
60 |   ...props
61 | }: React.HTMLAttributes<HTMLDivElement>) => (
62 |   <div
63 |     className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
64 |     {...props}
65 |   />
66 | )
67 | DrawerHeader.displayName = "DrawerHeader"
68 | 
69 | const DrawerFooter = ({
70 |   className,
71 |   ...props
72 | }: React.HTMLAttributes<HTMLDivElement>) => (
73 |   <div
74 |     className={cn("mt-auto flex flex-col gap-2 p-4", className)}
75 |     {...props}
76 |   />
77 | )
78 | DrawerFooter.displayName = "DrawerFooter"
79 | 
80 | const DrawerTitle = React.forwardRef<
81 |   React.ElementRef<typeof DrawerPrimitive.Title>,
82 |   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
83 | >(({ className, ...props }, ref) => (
84 |   <DrawerPrimitive.Title
85 |     ref={ref}
86 |     className={cn(
87 |       "text-lg font-semibold leading-none tracking-tight",
88 |       className
89 |     )}
90 |     {...props}
91 |   />
92 | ))
93 | DrawerTitle.displayName = DrawerPrimitive.Title.displayName
94 | 
95 | const DrawerDescription = React.forwardRef<
96 |   React.ElementRef<typeof DrawerPrimitive.Description>,
97 |   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
98 | >(({ className, ...props }, ref) => (
99 |   <DrawerPrimitive.Description
100 |     ref={ref}
101 |     className={cn("text-muted-foreground text-sm", className)}
102 |     {...props}
103 |   />
104 | ))
105 | DrawerDescription.displayName = DrawerPrimitive.Description.displayName
106 | 
107 | export {
108 |   Drawer,
109 |   DrawerPortal,
110 |   DrawerOverlay,
111 |   DrawerTrigger,
112 |   DrawerClose,
113 |   DrawerContent,
114 |   DrawerHeader,
115 |   DrawerFooter,
116 |   DrawerTitle,
117 |   DrawerDescription
118 | }
```

components/ui/dropdown-menu.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
5 | import { Check, ChevronRight, Circle } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const DropdownMenu = DropdownMenuPrimitive.Root
10 | 
11 | const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
12 | 
13 | const DropdownMenuGroup = DropdownMenuPrimitive.Group
14 | 
15 | const DropdownMenuPortal = DropdownMenuPrimitive.Portal
16 | 
17 | const DropdownMenuSub = DropdownMenuPrimitive.Sub
18 | 
19 | const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
20 | 
21 | const DropdownMenuSubTrigger = React.forwardRef<
22 |   React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
23 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
24 |     inset?: boolean
25 |   }
26 | >(({ className, inset, children, ...props }, ref) => (
27 |   <DropdownMenuPrimitive.SubTrigger
28 |     ref={ref}
29 |     className={cn(
30 |       "focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
31 |       inset && "pl-8",
32 |       className
33 |     )}
34 |     {...props}
35 |   >
36 |     {children}
37 |     <ChevronRight className="ml-auto" />
38 |   </DropdownMenuPrimitive.SubTrigger>
39 | ))
40 | DropdownMenuSubTrigger.displayName =
41 |   DropdownMenuPrimitive.SubTrigger.displayName
42 | 
43 | const DropdownMenuSubContent = React.forwardRef<
44 |   React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
45 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
46 | >(({ className, ...props }, ref) => (
47 |   <DropdownMenuPrimitive.SubContent
48 |     ref={ref}
49 |     className={cn(
50 |       "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
51 |       className
52 |     )}
53 |     {...props}
54 |   />
55 | ))
56 | DropdownMenuSubContent.displayName =
57 |   DropdownMenuPrimitive.SubContent.displayName
58 | 
59 | const DropdownMenuContent = React.forwardRef<
60 |   React.ElementRef<typeof DropdownMenuPrimitive.Content>,
61 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
62 | >(({ className, sideOffset = 4, ...props }, ref) => (
63 |   <DropdownMenuPrimitive.Portal>
64 |     <DropdownMenuPrimitive.Content
65 |       ref={ref}
66 |       sideOffset={sideOffset}
67 |       className={cn(
68 |         "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
69 |         className
70 |       )}
71 |       {...props}
72 |     />
73 |   </DropdownMenuPrimitive.Portal>
74 | ))
75 | DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName
76 | 
77 | const DropdownMenuItem = React.forwardRef<
78 |   React.ElementRef<typeof DropdownMenuPrimitive.Item>,
79 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
80 |     inset?: boolean
81 |   }
82 | >(({ className, inset, ...props }, ref) => (
83 |   <DropdownMenuPrimitive.Item
84 |     ref={ref}
85 |     className={cn(
86 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
87 |       inset && "pl-8",
88 |       className
89 |     )}
90 |     {...props}
91 |   />
92 | ))
93 | DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName
94 | 
95 | const DropdownMenuCheckboxItem = React.forwardRef<
96 |   React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
97 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
98 | >(({ className, children, checked, ...props }, ref) => (
99 |   <DropdownMenuPrimitive.CheckboxItem
100 |     ref={ref}
101 |     className={cn(
102 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
103 |       className
104 |     )}
105 |     checked={checked}
106 |     {...props}
107 |   >
108 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
109 |       <DropdownMenuPrimitive.ItemIndicator>
110 |         <Check className="size-4" />
111 |       </DropdownMenuPrimitive.ItemIndicator>
112 |     </span>
113 |     {children}
114 |   </DropdownMenuPrimitive.CheckboxItem>
115 | ))
116 | DropdownMenuCheckboxItem.displayName =
117 |   DropdownMenuPrimitive.CheckboxItem.displayName
118 | 
119 | const DropdownMenuRadioItem = React.forwardRef<
120 |   React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
121 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
122 | >(({ className, children, ...props }, ref) => (
123 |   <DropdownMenuPrimitive.RadioItem
124 |     ref={ref}
125 |     className={cn(
126 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
127 |       className
128 |     )}
129 |     {...props}
130 |   >
131 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
132 |       <DropdownMenuPrimitive.ItemIndicator>
133 |         <Circle className="size-2 fill-current" />
134 |       </DropdownMenuPrimitive.ItemIndicator>
135 |     </span>
136 |     {children}
137 |   </DropdownMenuPrimitive.RadioItem>
138 | ))
139 | DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName
140 | 
141 | const DropdownMenuLabel = React.forwardRef<
142 |   React.ElementRef<typeof DropdownMenuPrimitive.Label>,
143 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
144 |     inset?: boolean
145 |   }
146 | >(({ className, inset, ...props }, ref) => (
147 |   <DropdownMenuPrimitive.Label
148 |     ref={ref}
149 |     className={cn(
150 |       "px-2 py-1.5 text-sm font-semibold",
151 |       inset && "pl-8",
152 |       className
153 |     )}
154 |     {...props}
155 |   />
156 | ))
157 | DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName
158 | 
159 | const DropdownMenuSeparator = React.forwardRef<
160 |   React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
161 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
162 | >(({ className, ...props }, ref) => (
163 |   <DropdownMenuPrimitive.Separator
164 |     ref={ref}
165 |     className={cn("bg-muted -mx-1 my-1 h-px", className)}
166 |     {...props}
167 |   />
168 | ))
169 | DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName
170 | 
171 | const DropdownMenuShortcut = ({
172 |   className,
173 |   ...props
174 | }: React.HTMLAttributes<HTMLSpanElement>) => {
175 |   return (
176 |     <span
177 |       className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
178 |       {...props}
179 |     />
180 |   )
181 | }
182 | DropdownMenuShortcut.displayName = "DropdownMenuShortcut"
183 | 
184 | export {
185 |   DropdownMenu,
186 |   DropdownMenuTrigger,
187 |   DropdownMenuContent,
188 |   DropdownMenuItem,
189 |   DropdownMenuCheckboxItem,
190 |   DropdownMenuRadioItem,
191 |   DropdownMenuLabel,
192 |   DropdownMenuSeparator,
193 |   DropdownMenuShortcut,
194 |   DropdownMenuGroup,
195 |   DropdownMenuPortal,
196 |   DropdownMenuSub,
197 |   DropdownMenuSubContent,
198 |   DropdownMenuSubTrigger,
199 |   DropdownMenuRadioGroup
200 | }
```

components/ui/form.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as LabelPrimitive from "@radix-ui/react-label"
5 | import { Slot } from "@radix-ui/react-slot"
6 | import {
7 |   Controller,
8 |   ControllerProps,
9 |   FieldPath,
10 |   FieldValues,
11 |   FormProvider,
12 |   useFormContext
13 | } from "react-hook-form"
14 | 
15 | import { cn } from "@/lib/utils"
16 | import { Label } from "@/components/ui/label"
17 | 
18 | const Form = FormProvider
19 | 
20 | type FormFieldContextValue<
21 |   TFieldValues extends FieldValues = FieldValues,
22 |   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
23 | > = {
24 |   name: TName
25 | }
26 | 
27 | const FormFieldContext = React.createContext<FormFieldContextValue>(
28 |   {} as FormFieldContextValue
29 | )
30 | 
31 | const FormField = <
32 |   TFieldValues extends FieldValues = FieldValues,
33 |   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
34 | >({
35 |   ...props
36 | }: ControllerProps<TFieldValues, TName>) => {
37 |   return (
38 |     <FormFieldContext.Provider value={{ name: props.name }}>
39 |       <Controller {...props} />
40 |     </FormFieldContext.Provider>
41 |   )
42 | }
43 | 
44 | const useFormField = () => {
45 |   const fieldContext = React.useContext(FormFieldContext)
46 |   const itemContext = React.useContext(FormItemContext)
47 |   const { getFieldState, formState } = useFormContext()
48 | 
49 |   const fieldState = getFieldState(fieldContext.name, formState)
50 | 
51 |   if (!fieldContext) {
52 |     throw new Error("useFormField should be used within <FormField>")
53 |   }
54 | 
55 |   const { id } = itemContext
56 | 
57 |   return {
58 |     id,
59 |     name: fieldContext.name,
60 |     formItemId: `${id}-form-item`,
61 |     formDescriptionId: `${id}-form-item-description`,
62 |     formMessageId: `${id}-form-item-message`,
63 |     ...fieldState
64 |   }
65 | }
66 | 
67 | type FormItemContextValue = {
68 |   id: string
69 | }
70 | 
71 | const FormItemContext = React.createContext<FormItemContextValue>(
72 |   {} as FormItemContextValue
73 | )
74 | 
75 | const FormItem = React.forwardRef<
76 |   HTMLDivElement,
77 |   React.HTMLAttributes<HTMLDivElement>
78 | >(({ className, ...props }, ref) => {
79 |   const id = React.useId()
80 | 
81 |   return (
82 |     <FormItemContext.Provider value={{ id }}>
83 |       <div ref={ref} className={cn("space-y-2", className)} {...props} />
84 |     </FormItemContext.Provider>
85 |   )
86 | })
87 | FormItem.displayName = "FormItem"
88 | 
89 | const FormLabel = React.forwardRef<
90 |   React.ElementRef<typeof LabelPrimitive.Root>,
91 |   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
92 | >(({ className, ...props }, ref) => {
93 |   const { error, formItemId } = useFormField()
94 | 
95 |   return (
96 |     <Label
97 |       ref={ref}
98 |       className={cn(error && "text-destructive", className)}
99 |       htmlFor={formItemId}
100 |       {...props}
101 |     />
102 |   )
103 | })
104 | FormLabel.displayName = "FormLabel"
105 | 
106 | const FormControl = React.forwardRef<
107 |   React.ElementRef<typeof Slot>,
108 |   React.ComponentPropsWithoutRef<typeof Slot>
109 | >(({ ...props }, ref) => {
110 |   const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
111 | 
112 |   return (
113 |     <Slot
114 |       ref={ref}
115 |       id={formItemId}
116 |       aria-describedby={
117 |         !error
118 |           ? `${formDescriptionId}`
119 |           : `${formDescriptionId} ${formMessageId}`
120 |       }
121 |       aria-invalid={!!error}
122 |       {...props}
123 |     />
124 |   )
125 | })
126 | FormControl.displayName = "FormControl"
127 | 
128 | const FormDescription = React.forwardRef<
129 |   HTMLParagraphElement,
130 |   React.HTMLAttributes<HTMLParagraphElement>
131 | >(({ className, ...props }, ref) => {
132 |   const { formDescriptionId } = useFormField()
133 | 
134 |   return (
135 |     <p
136 |       ref={ref}
137 |       id={formDescriptionId}
138 |       className={cn("text-muted-foreground text-sm", className)}
139 |       {...props}
140 |     />
141 |   )
142 | })
143 | FormDescription.displayName = "FormDescription"
144 | 
145 | const FormMessage = React.forwardRef<
146 |   HTMLParagraphElement,
147 |   React.HTMLAttributes<HTMLParagraphElement>
148 | >(({ className, children, ...props }, ref) => {
149 |   const { error, formMessageId } = useFormField()
150 |   const body = error ? String(error?.message) : children
151 | 
152 |   if (!body) {
153 |     return null
154 |   }
155 | 
156 |   return (
157 |     <p
158 |       ref={ref}
159 |       id={formMessageId}
160 |       className={cn("text-destructive text-sm font-medium", className)}
161 |       {...props}
162 |     >
163 |       {body}
164 |     </p>
165 |   )
166 | })
167 | FormMessage.displayName = "FormMessage"
168 | 
169 | export {
170 |   useFormField,
171 |   Form,
172 |   FormItem,
173 |   FormLabel,
174 |   FormControl,
175 |   FormDescription,
176 |   FormMessage,
177 |   FormField
178 | }
```

components/ui/hover-card.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const HoverCard = HoverCardPrimitive.Root
9 | 
10 | const HoverCardTrigger = HoverCardPrimitive.Trigger
11 | 
12 | const HoverCardContent = React.forwardRef<
13 |   React.ElementRef<typeof HoverCardPrimitive.Content>,
14 |   React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
15 | >(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
16 |   <HoverCardPrimitive.Content
17 |     ref={ref}
18 |     align={align}
19 |     sideOffset={sideOffset}
20 |     className={cn(
21 |       "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-none",
22 |       className
23 |     )}
24 |     {...props}
25 |   />
26 | ))
27 | HoverCardContent.displayName = HoverCardPrimitive.Content.displayName
28 | 
29 | export { HoverCard, HoverCardTrigger, HoverCardContent }
```

components/ui/input-otp.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import { OTPInput, OTPInputContext } from "input-otp"
5 | import { Dot } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const InputOTP = React.forwardRef<
10 |   React.ElementRef<typeof OTPInput>,
11 |   React.ComponentPropsWithoutRef<typeof OTPInput>
12 | >(({ className, containerClassName, ...props }, ref) => (
13 |   <OTPInput
14 |     ref={ref}
15 |     containerClassName={cn(
16 |       "flex items-center gap-2 has-[:disabled]:opacity-50",
17 |       containerClassName
18 |     )}
19 |     className={cn("disabled:cursor-not-allowed", className)}
20 |     {...props}
21 |   />
22 | ))
23 | InputOTP.displayName = "InputOTP"
24 | 
25 | const InputOTPGroup = React.forwardRef<
26 |   React.ElementRef<"div">,
27 |   React.ComponentPropsWithoutRef<"div">
28 | >(({ className, ...props }, ref) => (
29 |   <div ref={ref} className={cn("flex items-center", className)} {...props} />
30 | ))
31 | InputOTPGroup.displayName = "InputOTPGroup"
32 | 
33 | const InputOTPSlot = React.forwardRef<
34 |   React.ElementRef<"div">,
35 |   React.ComponentPropsWithoutRef<"div"> & { index: number }
36 | >(({ index, className, ...props }, ref) => {
37 |   const inputOTPContext = React.useContext(OTPInputContext)
38 |   const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]
39 | 
40 |   return (
41 |     <div
42 |       ref={ref}
43 |       className={cn(
44 |         "border-input relative flex size-10 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
45 |         isActive && "ring-ring ring-offset-background z-10 ring-2",
46 |         className
47 |       )}
48 |       {...props}
49 |     >
50 |       {char}
51 |       {hasFakeCaret && (
52 |         <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
53 |           <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
54 |         </div>
55 |       )}
56 |     </div>
57 |   )
58 | })
59 | InputOTPSlot.displayName = "InputOTPSlot"
60 | 
61 | const InputOTPSeparator = React.forwardRef<
62 |   React.ElementRef<"div">,
63 |   React.ComponentPropsWithoutRef<"div">
64 | >(({ ...props }, ref) => (
65 |   <div ref={ref} role="separator" {...props}>
66 |     <Dot />
67 |   </div>
68 | ))
69 | InputOTPSeparator.displayName = "InputOTPSeparator"
70 | 
71 | export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
```

components/ui/input.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
6 |   ({ className, type, ...props }, ref) => {
7 |     return (
8 |       <input
9 |         type={type}
10 |         className={cn(
11 |           "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
12 |           className
13 |         )}
14 |         ref={ref}
15 |         {...props}
16 |       />
17 |     )
18 |   }
19 | )
20 | Input.displayName = "Input"
21 | 
22 | export { Input }
```

components/ui/label.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as LabelPrimitive from "@radix-ui/react-label"
5 | import { cva, type VariantProps } from "class-variance-authority"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const labelVariants = cva(
10 |   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
11 | )
12 | 
13 | const Label = React.forwardRef<
14 |   React.ElementRef<typeof LabelPrimitive.Root>,
15 |   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
16 |     VariantProps<typeof labelVariants>
17 | >(({ className, ...props }, ref) => (
18 |   <LabelPrimitive.Root
19 |     ref={ref}
20 |     className={cn(labelVariants(), className)}
21 |     {...props}
22 |   />
23 | ))
24 | Label.displayName = LabelPrimitive.Root.displayName
25 | 
26 | export { Label }
```

components/ui/menubar.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as MenubarPrimitive from "@radix-ui/react-menubar"
5 | import { Check, ChevronRight, Circle } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const MenubarMenu = MenubarPrimitive.Menu
10 | 
11 | const MenubarGroup = MenubarPrimitive.Group
12 | 
13 | const MenubarPortal = MenubarPrimitive.Portal
14 | 
15 | const MenubarSub = MenubarPrimitive.Sub
16 | 
17 | const MenubarRadioGroup = MenubarPrimitive.RadioGroup
18 | 
19 | const Menubar = React.forwardRef<
20 |   React.ElementRef<typeof MenubarPrimitive.Root>,
21 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
22 | >(({ className, ...props }, ref) => (
23 |   <MenubarPrimitive.Root
24 |     ref={ref}
25 |     className={cn(
26 |       "bg-background flex h-10 items-center space-x-1 rounded-md border p-1",
27 |       className
28 |     )}
29 |     {...props}
30 |   />
31 | ))
32 | Menubar.displayName = MenubarPrimitive.Root.displayName
33 | 
34 | const MenubarTrigger = React.forwardRef<
35 |   React.ElementRef<typeof MenubarPrimitive.Trigger>,
36 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
37 | >(({ className, ...props }, ref) => (
38 |   <MenubarPrimitive.Trigger
39 |     ref={ref}
40 |     className={cn(
41 |       "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none",
42 |       className
43 |     )}
44 |     {...props}
45 |   />
46 | ))
47 | MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName
48 | 
49 | const MenubarSubTrigger = React.forwardRef<
50 |   React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
51 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
52 |     inset?: boolean
53 |   }
54 | >(({ className, inset, children, ...props }, ref) => (
55 |   <MenubarPrimitive.SubTrigger
56 |     ref={ref}
57 |     className={cn(
58 |       "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
59 |       inset && "pl-8",
60 |       className
61 |     )}
62 |     {...props}
63 |   >
64 |     {children}
65 |     <ChevronRight className="ml-auto size-4" />
66 |   </MenubarPrimitive.SubTrigger>
67 | ))
68 | MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName
69 | 
70 | const MenubarSubContent = React.forwardRef<
71 |   React.ElementRef<typeof MenubarPrimitive.SubContent>,
72 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
73 | >(({ className, ...props }, ref) => (
74 |   <MenubarPrimitive.SubContent
75 |     ref={ref}
76 |     className={cn(
77 |       "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1",
78 |       className
79 |     )}
80 |     {...props}
81 |   />
82 | ))
83 | MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName
84 | 
85 | const MenubarContent = React.forwardRef<
86 |   React.ElementRef<typeof MenubarPrimitive.Content>,
87 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
88 | >(
89 |   (
90 |     { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
91 |     ref
92 |   ) => (
93 |     <MenubarPrimitive.Portal>
94 |       <MenubarPrimitive.Content
95 |         ref={ref}
96 |         align={align}
97 |         alignOffset={alignOffset}
98 |         sideOffset={sideOffset}
99 |         className={cn(
100 |           "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
101 |           className
102 |         )}
103 |         {...props}
104 |       />
105 |     </MenubarPrimitive.Portal>
106 |   )
107 | )
108 | MenubarContent.displayName = MenubarPrimitive.Content.displayName
109 | 
110 | const MenubarItem = React.forwardRef<
111 |   React.ElementRef<typeof MenubarPrimitive.Item>,
112 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
113 |     inset?: boolean
114 |   }
115 | >(({ className, inset, ...props }, ref) => (
116 |   <MenubarPrimitive.Item
117 |     ref={ref}
118 |     className={cn(
119 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
120 |       inset && "pl-8",
121 |       className
122 |     )}
123 |     {...props}
124 |   />
125 | ))
126 | MenubarItem.displayName = MenubarPrimitive.Item.displayName
127 | 
128 | const MenubarCheckboxItem = React.forwardRef<
129 |   React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
130 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
131 | >(({ className, children, checked, ...props }, ref) => (
132 |   <MenubarPrimitive.CheckboxItem
133 |     ref={ref}
134 |     className={cn(
135 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
136 |       className
137 |     )}
138 |     checked={checked}
139 |     {...props}
140 |   >
141 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
142 |       <MenubarPrimitive.ItemIndicator>
143 |         <Check className="size-4" />
144 |       </MenubarPrimitive.ItemIndicator>
145 |     </span>
146 |     {children}
147 |   </MenubarPrimitive.CheckboxItem>
148 | ))
149 | MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName
150 | 
151 | const MenubarRadioItem = React.forwardRef<
152 |   React.ElementRef<typeof MenubarPrimitive.RadioItem>,
153 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
154 | >(({ className, children, ...props }, ref) => (
155 |   <MenubarPrimitive.RadioItem
156 |     ref={ref}
157 |     className={cn(
158 |       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
159 |       className
160 |     )}
161 |     {...props}
162 |   >
163 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
164 |       <MenubarPrimitive.ItemIndicator>
165 |         <Circle className="size-2 fill-current" />
166 |       </MenubarPrimitive.ItemIndicator>
167 |     </span>
168 |     {children}
169 |   </MenubarPrimitive.RadioItem>
170 | ))
171 | MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName
172 | 
173 | const MenubarLabel = React.forwardRef<
174 |   React.ElementRef<typeof MenubarPrimitive.Label>,
175 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
176 |     inset?: boolean
177 |   }
178 | >(({ className, inset, ...props }, ref) => (
179 |   <MenubarPrimitive.Label
180 |     ref={ref}
181 |     className={cn(
182 |       "px-2 py-1.5 text-sm font-semibold",
183 |       inset && "pl-8",
184 |       className
185 |     )}
186 |     {...props}
187 |   />
188 | ))
189 | MenubarLabel.displayName = MenubarPrimitive.Label.displayName
190 | 
191 | const MenubarSeparator = React.forwardRef<
192 |   React.ElementRef<typeof MenubarPrimitive.Separator>,
193 |   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
194 | >(({ className, ...props }, ref) => (
195 |   <MenubarPrimitive.Separator
196 |     ref={ref}
197 |     className={cn("bg-muted -mx-1 my-1 h-px", className)}
198 |     {...props}
199 |   />
200 | ))
201 | MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName
202 | 
203 | const MenubarShortcut = ({
204 |   className,
205 |   ...props
206 | }: React.HTMLAttributes<HTMLSpanElement>) => {
207 |   return (
208 |     <span
209 |       className={cn(
210 |         "text-muted-foreground ml-auto text-xs tracking-widest",
211 |         className
212 |       )}
213 |       {...props}
214 |     />
215 |   )
216 | }
217 | MenubarShortcut.displayname = "MenubarShortcut"
218 | 
219 | export {
220 |   Menubar,
221 |   MenubarMenu,
222 |   MenubarTrigger,
223 |   MenubarContent,
224 |   MenubarItem,
225 |   MenubarSeparator,
226 |   MenubarLabel,
227 |   MenubarCheckboxItem,
228 |   MenubarRadioGroup,
229 |   MenubarRadioItem,
230 |   MenubarPortal,
231 |   MenubarSubContent,
232 |   MenubarSubTrigger,
233 |   MenubarGroup,
234 |   MenubarSub,
235 |   MenubarShortcut
236 | }
```

components/ui/navigation-menu.tsx
```
1 | import * as React from "react"
2 | import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
3 | import { cva } from "class-variance-authority"
4 | import { ChevronDown } from "lucide-react"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const NavigationMenu = React.forwardRef<
9 |   React.ElementRef<typeof NavigationMenuPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
11 | >(({ className, children, ...props }, ref) => (
12 |   <NavigationMenuPrimitive.Root
13 |     ref={ref}
14 |     className={cn(
15 |       "relative z-10 flex max-w-max flex-1 items-center justify-center",
16 |       className
17 |     )}
18 |     {...props}
19 |   >
20 |     {children}
21 |     <NavigationMenuViewport />
22 |   </NavigationMenuPrimitive.Root>
23 | ))
24 | NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName
25 | 
26 | const NavigationMenuList = React.forwardRef<
27 |   React.ElementRef<typeof NavigationMenuPrimitive.List>,
28 |   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
29 | >(({ className, ...props }, ref) => (
30 |   <NavigationMenuPrimitive.List
31 |     ref={ref}
32 |     className={cn(
33 |       "group flex flex-1 list-none items-center justify-center space-x-1",
34 |       className
35 |     )}
36 |     {...props}
37 |   />
38 | ))
39 | NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName
40 | 
41 | const NavigationMenuItem = NavigationMenuPrimitive.Item
42 | 
43 | const navigationMenuTriggerStyle = cva(
44 |   "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
45 | )
46 | 
47 | const NavigationMenuTrigger = React.forwardRef<
48 |   React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
49 |   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
50 | >(({ className, children, ...props }, ref) => (
51 |   <NavigationMenuPrimitive.Trigger
52 |     ref={ref}
53 |     className={cn(navigationMenuTriggerStyle(), "group", className)}
54 |     {...props}
55 |   >
56 |     {children}{" "}
57 |     <ChevronDown
58 |       className="relative top-[1px] ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180"
59 |       aria-hidden="true"
60 |     />
61 |   </NavigationMenuPrimitive.Trigger>
62 | ))
63 | NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName
64 | 
65 | const NavigationMenuContent = React.forwardRef<
66 |   React.ElementRef<typeof NavigationMenuPrimitive.Content>,
67 |   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
68 | >(({ className, ...props }, ref) => (
69 |   <NavigationMenuPrimitive.Content
70 |     ref={ref}
71 |     className={cn(
72 |       "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 w-full md:absolute md:w-auto ",
73 |       className
74 |     )}
75 |     {...props}
76 |   />
77 | ))
78 | NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName
79 | 
80 | const NavigationMenuLink = NavigationMenuPrimitive.Link
81 | 
82 | const NavigationMenuViewport = React.forwardRef<
83 |   React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
84 |   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
85 | >(({ className, ...props }, ref) => (
86 |   <div className={cn("absolute left-0 top-full flex justify-center")}>
87 |     <NavigationMenuPrimitive.Viewport
88 |       className={cn(
89 |         "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
90 |         className
91 |       )}
92 |       ref={ref}
93 |       {...props}
94 |     />
95 |   </div>
96 | ))
97 | NavigationMenuViewport.displayName =
98 |   NavigationMenuPrimitive.Viewport.displayName
99 | 
100 | const NavigationMenuIndicator = React.forwardRef<
101 |   React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
102 |   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
103 | >(({ className, ...props }, ref) => (
104 |   <NavigationMenuPrimitive.Indicator
105 |     ref={ref}
106 |     className={cn(
107 |       "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
108 |       className
109 |     )}
110 |     {...props}
111 |   >
112 |     <div className="bg-border relative top-[60%] size-2 rotate-45 rounded-tl-sm shadow-md" />
113 |   </NavigationMenuPrimitive.Indicator>
114 | ))
115 | NavigationMenuIndicator.displayName =
116 |   NavigationMenuPrimitive.Indicator.displayName
117 | 
118 | export {
119 |   navigationMenuTriggerStyle,
120 |   NavigationMenu,
121 |   NavigationMenuList,
122 |   NavigationMenuItem,
123 |   NavigationMenuContent,
124 |   NavigationMenuTrigger,
125 |   NavigationMenuLink,
126 |   NavigationMenuIndicator,
127 |   NavigationMenuViewport
128 | }
```

components/ui/pagination.tsx
```
1 | import * as React from "react"
2 | import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
3 | 
4 | import { cn } from "@/lib/utils"
5 | import { ButtonProps, buttonVariants } from "@/components/ui/button"
6 | 
7 | const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
8 |   <nav
9 |     role="navigation"
10 |     aria-label="pagination"
11 |     className={cn("mx-auto flex w-full justify-center", className)}
12 |     {...props}
13 |   />
14 | )
15 | Pagination.displayName = "Pagination"
16 | 
17 | const PaginationContent = React.forwardRef<
18 |   HTMLUListElement,
19 |   React.ComponentProps<"ul">
20 | >(({ className, ...props }, ref) => (
21 |   <ul
22 |     ref={ref}
23 |     className={cn("flex flex-row items-center gap-1", className)}
24 |     {...props}
25 |   />
26 | ))
27 | PaginationContent.displayName = "PaginationContent"
28 | 
29 | const PaginationItem = React.forwardRef<
30 |   HTMLLIElement,
31 |   React.ComponentProps<"li">
32 | >(({ className, ...props }, ref) => (
33 |   <li ref={ref} className={cn("", className)} {...props} />
34 | ))
35 | PaginationItem.displayName = "PaginationItem"
36 | 
37 | type PaginationLinkProps = {
38 |   isActive?: boolean
39 | } & Pick<ButtonProps, "size"> &
40 |   React.ComponentProps<"a">
41 | 
42 | const PaginationLink = ({
43 |   className,
44 |   isActive,
45 |   size = "icon",
46 |   ...props
47 | }: PaginationLinkProps) => (
48 |   <a
49 |     aria-current={isActive ? "page" : undefined}
50 |     className={cn(
51 |       buttonVariants({
52 |         variant: isActive ? "outline" : "ghost",
53 |         size
54 |       }),
55 |       className
56 |     )}
57 |     {...props}
58 |   />
59 | )
60 | PaginationLink.displayName = "PaginationLink"
61 | 
62 | const PaginationPrevious = ({
63 |   className,
64 |   ...props
65 | }: React.ComponentProps<typeof PaginationLink>) => (
66 |   <PaginationLink
67 |     aria-label="Go to previous page"
68 |     size="default"
69 |     className={cn("gap-1 pl-2.5", className)}
70 |     {...props}
71 |   >
72 |     <ChevronLeft className="size-4" />
73 |     <span>Previous</span>
74 |   </PaginationLink>
75 | )
76 | PaginationPrevious.displayName = "PaginationPrevious"
77 | 
78 | const PaginationNext = ({
79 |   className,
80 |   ...props
81 | }: React.ComponentProps<typeof PaginationLink>) => (
82 |   <PaginationLink
83 |     aria-label="Go to next page"
84 |     size="default"
85 |     className={cn("gap-1 pr-2.5", className)}
86 |     {...props}
87 |   >
88 |     <span>Next</span>
89 |     <ChevronRight className="size-4" />
90 |   </PaginationLink>
91 | )
92 | PaginationNext.displayName = "PaginationNext"
93 | 
94 | const PaginationEllipsis = ({
95 |   className,
96 |   ...props
97 | }: React.ComponentProps<"span">) => (
98 |   <span
99 |     aria-hidden
100 |     className={cn("flex size-9 items-center justify-center", className)}
101 |     {...props}
102 |   >
103 |     <MoreHorizontal className="size-4" />
104 |     <span className="sr-only">More pages</span>
105 |   </span>
106 | )
107 | PaginationEllipsis.displayName = "PaginationEllipsis"
108 | 
109 | export {
110 |   Pagination,
111 |   PaginationContent,
112 |   PaginationEllipsis,
113 |   PaginationItem,
114 |   PaginationLink,
115 |   PaginationNext,
116 |   PaginationPrevious
117 | }
```

components/ui/popover.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as PopoverPrimitive from "@radix-ui/react-popover"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Popover = PopoverPrimitive.Root
9 | 
10 | const PopoverTrigger = PopoverPrimitive.Trigger
11 | 
12 | const PopoverContent = React.forwardRef<
13 |   React.ElementRef<typeof PopoverPrimitive.Content>,
14 |   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
15 | >(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
16 |   <PopoverPrimitive.Portal>
17 |     <PopoverPrimitive.Content
18 |       ref={ref}
19 |       align={align}
20 |       sideOffset={sideOffset}
21 |       className={cn(
22 |         "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none",
23 |         className
24 |       )}
25 |       {...props}
26 |     />
27 |   </PopoverPrimitive.Portal>
28 | ))
29 | PopoverContent.displayName = PopoverPrimitive.Content.displayName
30 | 
31 | export { Popover, PopoverTrigger, PopoverContent }
```

components/ui/progress.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as ProgressPrimitive from "@radix-ui/react-progress"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Progress = React.forwardRef<
9 |   React.ElementRef<typeof ProgressPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
11 | >(({ className, value, ...props }, ref) => (
12 |   <ProgressPrimitive.Root
13 |     ref={ref}
14 |     className={cn(
15 |       "bg-secondary relative h-4 w-full overflow-hidden rounded-full",
16 |       className
17 |     )}
18 |     {...props}
19 |   >
20 |     <ProgressPrimitive.Indicator
21 |       className="bg-primary size-full flex-1 transition-all"
22 |       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
23 |     />
24 |   </ProgressPrimitive.Root>
25 | ))
26 | Progress.displayName = ProgressPrimitive.Root.displayName
27 | 
28 | export { Progress }
```

components/ui/radio-group.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
5 | import { Circle } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const RadioGroup = React.forwardRef<
10 |   React.ElementRef<typeof RadioGroupPrimitive.Root>,
11 |   React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
12 | >(({ className, ...props }, ref) => {
13 |   return (
14 |     <RadioGroupPrimitive.Root
15 |       className={cn("grid gap-2", className)}
16 |       {...props}
17 |       ref={ref}
18 |     />
19 |   )
20 | })
21 | RadioGroup.displayName = RadioGroupPrimitive.Root.displayName
22 | 
23 | const RadioGroupItem = React.forwardRef<
24 |   React.ElementRef<typeof RadioGroupPrimitive.Item>,
25 |   React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
26 | >(({ className, ...props }, ref) => {
27 |   return (
28 |     <RadioGroupPrimitive.Item
29 |       ref={ref}
30 |       className={cn(
31 |         "border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square size-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
32 |         className
33 |       )}
34 |       {...props}
35 |     >
36 |       <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
37 |         <Circle className="size-2.5 fill-current text-current" />
38 |       </RadioGroupPrimitive.Indicator>
39 |     </RadioGroupPrimitive.Item>
40 |   )
41 | })
42 | RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
43 | 
44 | export { RadioGroup, RadioGroupItem }
```

components/ui/resizable.tsx
```
1 | "use client"
2 | 
3 | import { GripVertical } from "lucide-react"
4 | import * as ResizablePrimitive from "react-resizable-panels"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const ResizablePanelGroup = ({
9 |   className,
10 |   ...props
11 | }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
12 |   <ResizablePrimitive.PanelGroup
13 |     className={cn(
14 |       "flex size-full data-[panel-group-direction=vertical]:flex-col",
15 |       className
16 |     )}
17 |     {...props}
18 |   />
19 | )
20 | 
21 | const ResizablePanel = ResizablePrimitive.Panel
22 | 
23 | const ResizableHandle = ({
24 |   withHandle,
25 |   className,
26 |   ...props
27 | }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
28 |   withHandle?: boolean
29 | }) => (
30 |   <ResizablePrimitive.PanelResizeHandle
31 |     className={cn(
32 |       "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
33 |       className
34 |     )}
35 |     {...props}
36 |   >
37 |     {withHandle && (
38 |       <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border">
39 |         <GripVertical className="size-2.5" />
40 |       </div>
41 |     )}
42 |   </ResizablePrimitive.PanelResizeHandle>
43 | )
44 | 
45 | export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```

components/ui/scroll-area.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const ScrollArea = React.forwardRef<
9 |   React.ElementRef<typeof ScrollAreaPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
11 | >(({ className, children, ...props }, ref) => (
12 |   <ScrollAreaPrimitive.Root
13 |     ref={ref}
14 |     className={cn("relative overflow-hidden", className)}
15 |     {...props}
16 |   >
17 |     <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
18 |       {children}
19 |     </ScrollAreaPrimitive.Viewport>
20 |     <ScrollBar />
21 |     <ScrollAreaPrimitive.Corner />
22 |   </ScrollAreaPrimitive.Root>
23 | ))
24 | ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
25 | 
26 | const ScrollBar = React.forwardRef<
27 |   React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
28 |   React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
29 | >(({ className, orientation = "vertical", ...props }, ref) => (
30 |   <ScrollAreaPrimitive.ScrollAreaScrollbar
31 |     ref={ref}
32 |     orientation={orientation}
33 |     className={cn(
34 |       "flex touch-none select-none transition-colors",
35 |       orientation === "vertical" &&
36 |         "h-full w-2.5 border-l border-l-transparent p-[1px]",
37 |       orientation === "horizontal" &&
38 |         "h-2.5 flex-col border-t border-t-transparent p-[1px]",
39 |       className
40 |     )}
41 |     {...props}
42 |   >
43 |     <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
44 |   </ScrollAreaPrimitive.ScrollAreaScrollbar>
45 | ))
46 | ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName
47 | 
48 | export { ScrollArea, ScrollBar }
```

components/ui/select.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as SelectPrimitive from "@radix-ui/react-select"
5 | import { Check, ChevronDown, ChevronUp } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const Select = SelectPrimitive.Root
10 | 
11 | const SelectGroup = SelectPrimitive.Group
12 | 
13 | const SelectValue = SelectPrimitive.Value
14 | 
15 | const SelectTrigger = React.forwardRef<
16 |   React.ElementRef<typeof SelectPrimitive.Trigger>,
17 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
18 | >(({ className, children, ...props }, ref) => (
19 |   <SelectPrimitive.Trigger
20 |     ref={ref}
21 |     className={cn(
22 |       "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
23 |       className
24 |     )}
25 |     {...props}
26 |   >
27 |     {children}
28 |     <SelectPrimitive.Icon asChild>
29 |       <ChevronDown className="size-4 opacity-50" />
30 |     </SelectPrimitive.Icon>
31 |   </SelectPrimitive.Trigger>
32 | ))
33 | SelectTrigger.displayName = SelectPrimitive.Trigger.displayName
34 | 
35 | const SelectScrollUpButton = React.forwardRef<
36 |   React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
37 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
38 | >(({ className, ...props }, ref) => (
39 |   <SelectPrimitive.ScrollUpButton
40 |     ref={ref}
41 |     className={cn(
42 |       "flex cursor-default items-center justify-center py-1",
43 |       className
44 |     )}
45 |     {...props}
46 |   >
47 |     <ChevronUp className="size-4" />
48 |   </SelectPrimitive.ScrollUpButton>
49 | ))
50 | SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName
51 | 
52 | const SelectScrollDownButton = React.forwardRef<
53 |   React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
54 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
55 | >(({ className, ...props }, ref) => (
56 |   <SelectPrimitive.ScrollDownButton
57 |     ref={ref}
58 |     className={cn(
59 |       "flex cursor-default items-center justify-center py-1",
60 |       className
61 |     )}
62 |     {...props}
63 |   >
64 |     <ChevronDown className="size-4" />
65 |   </SelectPrimitive.ScrollDownButton>
66 | ))
67 | SelectScrollDownButton.displayName =
68 |   SelectPrimitive.ScrollDownButton.displayName
69 | 
70 | const SelectContent = React.forwardRef<
71 |   React.ElementRef<typeof SelectPrimitive.Content>,
72 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
73 | >(({ className, children, position = "popper", ...props }, ref) => (
74 |   <SelectPrimitive.Portal>
75 |     <SelectPrimitive.Content
76 |       ref={ref}
77 |       className={cn(
78 |         "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
79 |         position === "popper" &&
80 |           "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
81 |         className
82 |       )}
83 |       position={position}
84 |       {...props}
85 |     >
86 |       <SelectScrollUpButton />
87 |       <SelectPrimitive.Viewport
88 |         className={cn(
89 |           "p-1",
90 |           position === "popper" &&
91 |             "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
92 |         )}
93 |       >
94 |         {children}
95 |       </SelectPrimitive.Viewport>
96 |       <SelectScrollDownButton />
97 |     </SelectPrimitive.Content>
98 |   </SelectPrimitive.Portal>
99 | ))
100 | SelectContent.displayName = SelectPrimitive.Content.displayName
101 | 
102 | const SelectLabel = React.forwardRef<
103 |   React.ElementRef<typeof SelectPrimitive.Label>,
104 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
105 | >(({ className, ...props }, ref) => (
106 |   <SelectPrimitive.Label
107 |     ref={ref}
108 |     className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
109 |     {...props}
110 |   />
111 | ))
112 | SelectLabel.displayName = SelectPrimitive.Label.displayName
113 | 
114 | const SelectItem = React.forwardRef<
115 |   React.ElementRef<typeof SelectPrimitive.Item>,
116 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
117 | >(({ className, children, ...props }, ref) => (
118 |   <SelectPrimitive.Item
119 |     ref={ref}
120 |     className={cn(
121 |       "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
122 |       className
123 |     )}
124 |     {...props}
125 |   >
126 |     <span className="absolute left-2 flex size-3.5 items-center justify-center">
127 |       <SelectPrimitive.ItemIndicator>
128 |         <Check className="size-4" />
129 |       </SelectPrimitive.ItemIndicator>
130 |     </span>
131 | 
132 |     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
133 |   </SelectPrimitive.Item>
134 | ))
135 | SelectItem.displayName = SelectPrimitive.Item.displayName
136 | 
137 | const SelectSeparator = React.forwardRef<
138 |   React.ElementRef<typeof SelectPrimitive.Separator>,
139 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
140 | >(({ className, ...props }, ref) => (
141 |   <SelectPrimitive.Separator
142 |     ref={ref}
143 |     className={cn("bg-muted -mx-1 my-1 h-px", className)}
144 |     {...props}
145 |   />
146 | ))
147 | SelectSeparator.displayName = SelectPrimitive.Separator.displayName
148 | 
149 | export {
150 |   Select,
151 |   SelectGroup,
152 |   SelectValue,
153 |   SelectTrigger,
154 |   SelectContent,
155 |   SelectLabel,
156 |   SelectItem,
157 |   SelectSeparator,
158 |   SelectScrollUpButton,
159 |   SelectScrollDownButton
160 | }
```

components/ui/separator.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as SeparatorPrimitive from "@radix-ui/react-separator"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Separator = React.forwardRef<
9 |   React.ElementRef<typeof SeparatorPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
11 | >(
12 |   (
13 |     { className, orientation = "horizontal", decorative = true, ...props },
14 |     ref
15 |   ) => (
16 |     <SeparatorPrimitive.Root
17 |       ref={ref}
18 |       decorative={decorative}
19 |       orientation={orientation}
20 |       className={cn(
21 |         "bg-border shrink-0",
22 |         orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
23 |         className
24 |       )}
25 |       {...props}
26 |     />
27 |   )
28 | )
29 | Separator.displayName = SeparatorPrimitive.Root.displayName
30 | 
31 | export { Separator }
```

components/ui/sheet.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as SheetPrimitive from "@radix-ui/react-dialog"
5 | import { cva, type VariantProps } from "class-variance-authority"
6 | import { X } from "lucide-react"
7 | 
8 | import { cn } from "@/lib/utils"
9 | 
10 | const Sheet = SheetPrimitive.Root
11 | 
12 | const SheetTrigger = SheetPrimitive.Trigger
13 | 
14 | const SheetClose = SheetPrimitive.Close
15 | 
16 | const SheetPortal = SheetPrimitive.Portal
17 | 
18 | const SheetOverlay = React.forwardRef<
19 |   React.ElementRef<typeof SheetPrimitive.Overlay>,
20 |   React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
21 | >(({ className, ...props }, ref) => (
22 |   <SheetPrimitive.Overlay
23 |     className={cn(
24 |       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80",
25 |       className
26 |     )}
27 |     {...props}
28 |     ref={ref}
29 |   />
30 | ))
31 | SheetOverlay.displayName = SheetPrimitive.Overlay.displayName
32 | 
33 | const sheetVariants = cva(
34 |   "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
35 |   {
36 |     variants: {
37 |       side: {
38 |         top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
39 |         bottom:
40 |           "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
41 |         left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
42 |         right:
43 |           "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0  h-full w-3/4 border-l sm:max-w-sm"
44 |       }
45 |     },
46 |     defaultVariants: {
47 |       side: "right"
48 |     }
49 |   }
50 | )
51 | 
52 | interface SheetContentProps
53 |   extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
54 |     VariantProps<typeof sheetVariants> {}
55 | 
56 | const SheetContent = React.forwardRef<
57 |   React.ElementRef<typeof SheetPrimitive.Content>,
58 |   SheetContentProps
59 | >(({ side = "right", className, children, ...props }, ref) => (
60 |   <SheetPortal>
61 |     <SheetOverlay />
62 |     <SheetPrimitive.Content
63 |       ref={ref}
64 |       className={cn(sheetVariants({ side }), className)}
65 |       {...props}
66 |     >
67 |       {children}
68 |       <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
69 |         <X className="size-4" />
70 |         <span className="sr-only">Close</span>
71 |       </SheetPrimitive.Close>
72 |     </SheetPrimitive.Content>
73 |   </SheetPortal>
74 | ))
75 | SheetContent.displayName = SheetPrimitive.Content.displayName
76 | 
77 | const SheetHeader = ({
78 |   className,
79 |   ...props
80 | }: React.HTMLAttributes<HTMLDivElement>) => (
81 |   <div
82 |     className={cn(
83 |       "flex flex-col space-y-2 text-center sm:text-left",
84 |       className
85 |     )}
86 |     {...props}
87 |   />
88 | )
89 | SheetHeader.displayName = "SheetHeader"
90 | 
91 | const SheetFooter = ({
92 |   className,
93 |   ...props
94 | }: React.HTMLAttributes<HTMLDivElement>) => (
95 |   <div
96 |     className={cn(
97 |       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
98 |       className
99 |     )}
100 |     {...props}
101 |   />
102 | )
103 | SheetFooter.displayName = "SheetFooter"
104 | 
105 | const SheetTitle = React.forwardRef<
106 |   React.ElementRef<typeof SheetPrimitive.Title>,
107 |   React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
108 | >(({ className, ...props }, ref) => (
109 |   <SheetPrimitive.Title
110 |     ref={ref}
111 |     className={cn("text-foreground text-lg font-semibold", className)}
112 |     {...props}
113 |   />
114 | ))
115 | SheetTitle.displayName = SheetPrimitive.Title.displayName
116 | 
117 | const SheetDescription = React.forwardRef<
118 |   React.ElementRef<typeof SheetPrimitive.Description>,
119 |   React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
120 | >(({ className, ...props }, ref) => (
121 |   <SheetPrimitive.Description
122 |     ref={ref}
123 |     className={cn("text-muted-foreground text-sm", className)}
124 |     {...props}
125 |   />
126 | ))
127 | SheetDescription.displayName = SheetPrimitive.Description.displayName
128 | 
129 | export {
130 |   Sheet,
131 |   SheetPortal,
132 |   SheetOverlay,
133 |   SheetTrigger,
134 |   SheetClose,
135 |   SheetContent,
136 |   SheetHeader,
137 |   SheetFooter,
138 |   SheetTitle,
139 |   SheetDescription
140 | }
```

components/ui/sidebar.tsx
```
1 | "use client"
2 | 
3 | import { Slot } from "@radix-ui/react-slot"
4 | import { VariantProps, cva } from "class-variance-authority"
5 | import { PanelLeft } from "lucide-react"
6 | import * as React from "react"
7 | 
8 | import { Button } from "@/components/ui/button"
9 | import { Input } from "@/components/ui/input"
10 | import { Separator } from "@/components/ui/separator"
11 | import { Sheet, SheetContent } from "@/components/ui/sheet"
12 | import { Skeleton } from "@/components/ui/skeleton"
13 | import {
14 |   Tooltip,
15 |   TooltipContent,
16 |   TooltipProvider,
17 |   TooltipTrigger
18 | } from "@/components/ui/tooltip"
19 | import { useIsMobile } from "@/lib/hooks/use-mobile"
20 | import { cn } from "@/lib/utils"
21 | 
22 | const SIDEBAR_COOKIE_NAME = "sidebar:state"
23 | const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
24 | const SIDEBAR_WIDTH = "16rem"
25 | const SIDEBAR_WIDTH_MOBILE = "18rem"
26 | const SIDEBAR_WIDTH_ICON = "3rem"
27 | const SIDEBAR_KEYBOARD_SHORTCUT = "b"
28 | 
29 | type SidebarContext = {
30 |   state: "expanded" | "collapsed"
31 |   open: boolean
32 |   setOpen: (open: boolean) => void
33 |   openMobile: boolean
34 |   setOpenMobile: (open: boolean) => void
35 |   isMobile: boolean
36 |   toggleSidebar: () => void
37 | }
38 | 
39 | const SidebarContext = React.createContext<SidebarContext | null>(null)
40 | 
41 | function useSidebar() {
42 |   const context = React.useContext(SidebarContext)
43 |   if (!context) {
44 |     throw new Error("useSidebar must be used within a SidebarProvider.")
45 |   }
46 | 
47 |   return context
48 | }
49 | 
50 | const SidebarProvider = React.forwardRef<
51 |   HTMLDivElement,
52 |   React.ComponentProps<"div"> & {
53 |     defaultOpen?: boolean
54 |     open?: boolean
55 |     onOpenChange?: (open: boolean) => void
56 |   }
57 | >(
58 |   (
59 |     {
60 |       defaultOpen = true,
61 |       open: openProp,
62 |       onOpenChange: setOpenProp,
63 |       className,
64 |       style,
65 |       children,
66 |       ...props
67 |     },
68 |     ref
69 |   ) => {
70 |     const isMobile = useIsMobile()
71 |     const [openMobile, setOpenMobile] = React.useState(false)
72 | 
73 |     // This is the internal state of the sidebar.
74 |     // We use openProp and setOpenProp for control from outside the component.
75 |     const [_open, _setOpen] = React.useState(defaultOpen)
76 |     const open = openProp ?? _open
77 |     const setOpen = React.useCallback(
78 |       (value: boolean | ((value: boolean) => boolean)) => {
79 |         const openState = typeof value === "function" ? value(open) : value
80 |         if (setOpenProp) {
81 |           setOpenProp(openState)
82 |         } else {
83 |           _setOpen(openState)
84 |         }
85 | 
86 |         // This sets the cookie to keep the sidebar state.
87 |         document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
88 |       },
89 |       [setOpenProp, open]
90 |     )
91 | 
92 |     // Helper to toggle the sidebar.
93 |     const toggleSidebar = React.useCallback(() => {
94 |       return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open)
95 |     }, [isMobile, setOpen, setOpenMobile])
96 | 
97 |     // Adds a keyboard shortcut to toggle the sidebar.
98 |     React.useEffect(() => {
99 |       const handleKeyDown = (event: KeyboardEvent) => {
100 |         if (
101 |           event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
102 |           (event.metaKey || event.ctrlKey)
103 |         ) {
104 |           event.preventDefault()
105 |           toggleSidebar()
106 |         }
107 |       }
108 | 
109 |       window.addEventListener("keydown", handleKeyDown)
110 |       return () => window.removeEventListener("keydown", handleKeyDown)
111 |     }, [toggleSidebar])
112 | 
113 |     // We add a state so that we can do data-state="expanded" or "collapsed".
114 |     // This makes it easier to style the sidebar with Tailwind classes.
115 |     const state = open ? "expanded" : "collapsed"
116 | 
117 |     const contextValue = React.useMemo<SidebarContext>(
118 |       () => ({
119 |         state,
120 |         open,
121 |         setOpen,
122 |         isMobile,
123 |         openMobile,
124 |         setOpenMobile,
125 |         toggleSidebar
126 |       }),
127 |       [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
128 |     )
129 | 
130 |     return (
131 |       <SidebarContext.Provider value={contextValue}>
132 |         <TooltipProvider delayDuration={0}>
133 |           <div
134 |             style={
135 |               {
136 |                 "--sidebar-width": SIDEBAR_WIDTH,
137 |                 "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
138 |                 ...style
139 |               } as React.CSSProperties
140 |             }
141 |             className={cn(
142 |               "group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full",
143 |               className
144 |             )}
145 |             ref={ref}
146 |             {...props}
147 |           >
148 |             {children}
149 |           </div>
150 |         </TooltipProvider>
151 |       </SidebarContext.Provider>
152 |     )
153 |   }
154 | )
155 | SidebarProvider.displayName = "SidebarProvider"
156 | 
157 | const Sidebar = React.forwardRef<
158 |   HTMLDivElement,
159 |   React.ComponentProps<"div"> & {
160 |     side?: "left" | "right"
161 |     variant?: "sidebar" | "floating" | "inset"
162 |     collapsible?: "offcanvas" | "icon" | "none"
163 |   }
164 | >(
165 |   (
166 |     {
167 |       side = "left",
168 |       variant = "sidebar",
169 |       collapsible = "offcanvas",
170 |       className,
171 |       children,
172 |       ...props
173 |     },
174 |     ref
175 |   ) => {
176 |     const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
177 | 
178 |     if (collapsible === "none") {
179 |       return (
180 |         <div
181 |           className={cn(
182 |             "bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col",
183 |             className
184 |           )}
185 |           ref={ref}
186 |           {...props}
187 |         >
188 |           {children}
189 |         </div>
190 |       )
191 |     }
192 | 
193 |     if (isMobile) {
194 |       return (
195 |         <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
196 |           <SheetContent
197 |             data-sidebar="sidebar"
198 |             data-mobile="true"
199 |             className="bg-sidebar text-sidebar-foreground w-[--sidebar-width] p-0 [&>button]:hidden"
200 |             style={
201 |               {
202 |                 "--sidebar-width": SIDEBAR_WIDTH_MOBILE
203 |               } as React.CSSProperties
204 |             }
205 |             side={side}
206 |           >
207 |             <div className="flex size-full flex-col">{children}</div>
208 |           </SheetContent>
209 |         </Sheet>
210 |       )
211 |     }
212 | 
213 |     return (
214 |       <div
215 |         ref={ref}
216 |         className="text-sidebar-foreground group peer hidden md:block"
217 |         data-state={state}
218 |         data-collapsible={state === "collapsed" ? collapsible : ""}
219 |         data-variant={variant}
220 |         data-side={side}
221 |       >
222 |         {/* This is what handles the sidebar gap on desktop */}
223 |         <div
224 |           className={cn(
225 |             "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
226 |             "group-data-[collapsible=offcanvas]:w-0",
227 |             "group-data-[side=right]:rotate-180",
228 |             variant === "floating" || variant === "inset"
229 |               ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
230 |               : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
231 |           )}
232 |         />
233 |         <div
234 |           className={cn(
235 |             "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
236 |             side === "left"
237 |               ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
238 |               : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
239 |             // Adjust the padding for floating and inset variants.
240 |             variant === "floating" || variant === "inset"
241 |               ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
242 |               : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
243 |             className
244 |           )}
245 |           {...props}
246 |         >
247 |           <div
248 |             data-sidebar="sidebar"
249 |             className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
250 |           >
251 |             {children}
252 |           </div>
253 |         </div>
254 |       </div>
255 |     )
256 |   }
257 | )
258 | Sidebar.displayName = "Sidebar"
259 | 
260 | const SidebarTrigger = React.forwardRef<
261 |   React.ElementRef<typeof Button>,
262 |   React.ComponentProps<typeof Button>
263 | >(({ className, onClick, ...props }, ref) => {
264 |   const { toggleSidebar } = useSidebar()
265 | 
266 |   return (
267 |     <Button
268 |       ref={ref}
269 |       data-sidebar="trigger"
270 |       variant="ghost"
271 |       size="icon"
272 |       className={cn("size-7", className)}
273 |       onClick={event => {
274 |         onClick?.(event)
275 |         toggleSidebar()
276 |       }}
277 |       {...props}
278 |     >
279 |       <PanelLeft />
280 |       <span className="sr-only">Toggle Sidebar</span>
281 |     </Button>
282 |   )
283 | })
284 | SidebarTrigger.displayName = "SidebarTrigger"
285 | 
286 | const SidebarRail = React.forwardRef<
287 |   HTMLButtonElement,
288 |   React.ComponentProps<"button">
289 | >(({ className, ...props }, ref) => {
290 |   const { toggleSidebar } = useSidebar()
291 | 
292 |   return (
293 |     <button
294 |       ref={ref}
295 |       data-sidebar="rail"
296 |       aria-label="Toggle Sidebar"
297 |       tabIndex={-1}
298 |       onClick={toggleSidebar}
299 |       title="Toggle Sidebar"
300 |       className={cn(
301 |         "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
302 |         "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
303 |         "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
304 |         "group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
305 |         "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
306 |         "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
307 |         className
308 |       )}
309 |       {...props}
310 |     />
311 |   )
312 | })
313 | SidebarRail.displayName = "SidebarRail"
314 | 
315 | const SidebarInset = React.forwardRef<
316 |   HTMLDivElement,
317 |   React.ComponentProps<"main">
318 | >(({ className, ...props }, ref) => {
319 |   return (
320 |     <main
321 |       ref={ref}
322 |       className={cn(
323 |         "bg-background relative flex min-h-svh flex-1 flex-col",
324 |         "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
325 |         className
326 |       )}
327 |       {...props}
328 |     />
329 |   )
330 | })
331 | SidebarInset.displayName = "SidebarInset"
332 | 
333 | const SidebarInput = React.forwardRef<
334 |   React.ElementRef<typeof Input>,
335 |   React.ComponentProps<typeof Input>
336 | >(({ className, ...props }, ref) => {
337 |   return (
338 |     <Input
339 |       ref={ref}
340 |       data-sidebar="input"
341 |       className={cn(
342 |         "bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2",
343 |         className
344 |       )}
345 |       {...props}
346 |     />
347 |   )
348 | })
349 | SidebarInput.displayName = "SidebarInput"
350 | 
351 | const SidebarHeader = React.forwardRef<
352 |   HTMLDivElement,
353 |   React.ComponentProps<"div">
354 | >(({ className, ...props }, ref) => {
355 |   return (
356 |     <div
357 |       ref={ref}
358 |       data-sidebar="header"
359 |       className={cn("flex flex-col gap-2 p-2", className)}
360 |       {...props}
361 |     />
362 |   )
363 | })
364 | SidebarHeader.displayName = "SidebarHeader"
365 | 
366 | const SidebarFooter = React.forwardRef<
367 |   HTMLDivElement,
368 |   React.ComponentProps<"div">
369 | >(({ className, ...props }, ref) => {
370 |   return (
371 |     <div
372 |       ref={ref}
373 |       data-sidebar="footer"
374 |       className={cn("flex flex-col gap-2 p-2", className)}
375 |       {...props}
376 |     />
377 |   )
378 | })
379 | SidebarFooter.displayName = "SidebarFooter"
380 | 
381 | const SidebarSeparator = React.forwardRef<
382 |   React.ElementRef<typeof Separator>,
383 |   React.ComponentProps<typeof Separator>
384 | >(({ className, ...props }, ref) => {
385 |   return (
386 |     <Separator
387 |       ref={ref}
388 |       data-sidebar="separator"
389 |       className={cn("bg-sidebar-border mx-2 w-auto", className)}
390 |       {...props}
391 |     />
392 |   )
393 | })
394 | SidebarSeparator.displayName = "SidebarSeparator"
395 | 
396 | const SidebarContent = React.forwardRef<
397 |   HTMLDivElement,
398 |   React.ComponentProps<"div">
399 | >(({ className, ...props }, ref) => {
400 |   return (
401 |     <div
402 |       ref={ref}
403 |       data-sidebar="content"
404 |       className={cn(
405 |         "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
406 |         className
407 |       )}
408 |       {...props}
409 |     />
410 |   )
411 | })
412 | SidebarContent.displayName = "SidebarContent"
413 | 
414 | const SidebarGroup = React.forwardRef<
415 |   HTMLDivElement,
416 |   React.ComponentProps<"div">
417 | >(({ className, ...props }, ref) => {
418 |   return (
419 |     <div
420 |       ref={ref}
421 |       data-sidebar="group"
422 |       className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
423 |       {...props}
424 |     />
425 |   )
426 | })
427 | SidebarGroup.displayName = "SidebarGroup"
428 | 
429 | const SidebarGroupLabel = React.forwardRef<
430 |   HTMLDivElement,
431 |   React.ComponentProps<"div"> & { asChild?: boolean }
432 | >(({ className, asChild = false, ...props }, ref) => {
433 |   const Comp = asChild ? Slot : "div"
434 | 
435 |   return (
436 |     <Comp
437 |       ref={ref}
438 |       data-sidebar="group-label"
439 |       className={cn(
440 |         "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
441 |         "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
442 |         className
443 |       )}
444 |       {...props}
445 |     />
446 |   )
447 | })
448 | SidebarGroupLabel.displayName = "SidebarGroupLabel"
449 | 
450 | const SidebarGroupAction = React.forwardRef<
451 |   HTMLButtonElement,
452 |   React.ComponentProps<"button"> & { asChild?: boolean }
453 | >(({ className, asChild = false, ...props }, ref) => {
454 |   const Comp = asChild ? Slot : "button"
455 | 
456 |   return (
457 |     <Comp
458 |       ref={ref}
459 |       data-sidebar="group-action"
460 |       className={cn(
461 |         "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
462 |         // Increases the hit area of the button on mobile.
463 |         "after:absolute after:-inset-2 after:md:hidden",
464 |         "group-data-[collapsible=icon]:hidden",
465 |         className
466 |       )}
467 |       {...props}
468 |     />
469 |   )
470 | })
471 | SidebarGroupAction.displayName = "SidebarGroupAction"
472 | 
473 | const SidebarGroupContent = React.forwardRef<
474 |   HTMLDivElement,
475 |   React.ComponentProps<"div">
476 | >(({ className, ...props }, ref) => (
477 |   <div
478 |     ref={ref}
479 |     data-sidebar="group-content"
480 |     className={cn("w-full text-sm", className)}
481 |     {...props}
482 |   />
483 | ))
484 | SidebarGroupContent.displayName = "SidebarGroupContent"
485 | 
486 | const SidebarMenu = React.forwardRef<
487 |   HTMLUListElement,
488 |   React.ComponentProps<"ul">
489 | >(({ className, ...props }, ref) => (
490 |   <ul
491 |     ref={ref}
492 |     data-sidebar="menu"
493 |     className={cn("flex w-full min-w-0 flex-col gap-1", className)}
494 |     {...props}
495 |   />
496 | ))
497 | SidebarMenu.displayName = "SidebarMenu"
498 | 
499 | const SidebarMenuItem = React.forwardRef<
500 |   HTMLLIElement,
501 |   React.ComponentProps<"li">
502 | >(({ className, ...props }, ref) => (
503 |   <li
504 |     ref={ref}
505 |     data-sidebar="menu-item"
506 |     className={cn("group/menu-item relative", className)}
507 |     {...props}
508 |   />
509 | ))
510 | SidebarMenuItem.displayName = "SidebarMenuItem"
511 | 
512 | const sidebarMenuButtonVariants = cva(
513 |   "peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
514 |   {
515 |     variants: {
516 |       variant: {
517 |         default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
518 |         outline:
519 |           "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
520 |       },
521 |       size: {
522 |         default: "h-8 text-sm",
523 |         sm: "h-7 text-xs",
524 |         lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
525 |       }
526 |     },
527 |     defaultVariants: {
528 |       variant: "default",
529 |       size: "default"
530 |     }
531 |   }
532 | )
533 | 
534 | const SidebarMenuButton = React.forwardRef<
535 |   HTMLButtonElement,
536 |   React.ComponentProps<"button"> & {
537 |     asChild?: boolean
538 |     isActive?: boolean
539 |     tooltip?: string | React.ComponentProps<typeof TooltipContent>
540 |   } & VariantProps<typeof sidebarMenuButtonVariants>
541 | >(
542 |   (
543 |     {
544 |       asChild = false,
545 |       isActive = false,
546 |       variant = "default",
547 |       size = "default",
548 |       tooltip,
549 |       className,
550 |       ...props
551 |     },
552 |     ref
553 |   ) => {
554 |     const Comp = asChild ? Slot : "button"
555 |     const { isMobile, state } = useSidebar()
556 | 
557 |     const button = (
558 |       <Comp
559 |         ref={ref}
560 |         data-sidebar="menu-button"
561 |         data-size={size}
562 |         data-active={isActive}
563 |         className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
564 |         {...props}
565 |       />
566 |     )
567 | 
568 |     if (!tooltip) {
569 |       return button
570 |     }
571 | 
572 |     if (typeof tooltip === "string") {
573 |       tooltip = {
574 |         children: tooltip
575 |       }
576 |     }
577 | 
578 |     return (
579 |       <Tooltip>
580 |         <TooltipTrigger asChild>{button}</TooltipTrigger>
581 |         <TooltipContent
582 |           side="right"
583 |           align="center"
584 |           hidden={state !== "collapsed" || isMobile}
585 |           {...tooltip}
586 |         />
587 |       </Tooltip>
588 |     )
589 |   }
590 | )
591 | SidebarMenuButton.displayName = "SidebarMenuButton"
592 | 
593 | const SidebarMenuAction = React.forwardRef<
594 |   HTMLButtonElement,
595 |   React.ComponentProps<"button"> & {
596 |     asChild?: boolean
597 |     showOnHover?: boolean
598 |   }
599 | >(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
600 |   const Comp = asChild ? Slot : "button"
601 | 
602 |   return (
603 |     <Comp
604 |       ref={ref}
605 |       data-sidebar="menu-action"
606 |       className={cn(
607 |         "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
608 |         // Increases the hit area of the button on mobile.
609 |         "after:absolute after:-inset-2 after:md:hidden",
610 |         "peer-data-[size=sm]/menu-button:top-1",
611 |         "peer-data-[size=default]/menu-button:top-1.5",
612 |         "peer-data-[size=lg]/menu-button:top-2.5",
613 |         "group-data-[collapsible=icon]:hidden",
614 |         showOnHover &&
615 |           "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
616 |         className
617 |       )}
618 |       {...props}
619 |     />
620 |   )
621 | })
622 | SidebarMenuAction.displayName = "SidebarMenuAction"
623 | 
624 | const SidebarMenuBadge = React.forwardRef<
625 |   HTMLDivElement,
626 |   React.ComponentProps<"div">
627 | >(({ className, ...props }, ref) => (
628 |   <div
629 |     ref={ref}
630 |     data-sidebar="menu-badge"
631 |     className={cn(
632 |       "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums",
633 |       "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
634 |       "peer-data-[size=sm]/menu-button:top-1",
635 |       "peer-data-[size=default]/menu-button:top-1.5",
636 |       "peer-data-[size=lg]/menu-button:top-2.5",
637 |       "group-data-[collapsible=icon]:hidden",
638 |       className
639 |     )}
640 |     {...props}
641 |   />
642 | ))
643 | SidebarMenuBadge.displayName = "SidebarMenuBadge"
644 | 
645 | const SidebarMenuSkeleton = React.forwardRef<
646 |   HTMLDivElement,
647 |   React.ComponentProps<"div"> & {
648 |     showIcon?: boolean
649 |   }
650 | >(({ className, showIcon = false, ...props }, ref) => {
651 |   // Random width between 50 to 90%.
652 |   const width = React.useMemo(() => {
653 |     return `${Math.floor(Math.random() * 40) + 50}%`
654 |   }, [])
655 | 
656 |   return (
657 |     <div
658 |       ref={ref}
659 |       data-sidebar="menu-skeleton"
660 |       className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
661 |       {...props}
662 |     >
663 |       {showIcon && (
664 |         <Skeleton
665 |           className="size-4 rounded-md"
666 |           data-sidebar="menu-skeleton-icon"
667 |         />
668 |       )}
669 |       <Skeleton
670 |         className="h-4 max-w-[--skeleton-width] flex-1"
671 |         data-sidebar="menu-skeleton-text"
672 |         style={
673 |           {
674 |             "--skeleton-width": width
675 |           } as React.CSSProperties
676 |         }
677 |       />
678 |     </div>
679 |   )
680 | })
681 | SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"
682 | 
683 | const SidebarMenuSub = React.forwardRef<
684 |   HTMLUListElement,
685 |   React.ComponentProps<"ul">
686 | >(({ className, ...props }, ref) => (
687 |   <ul
688 |     ref={ref}
689 |     data-sidebar="menu-sub"
690 |     className={cn(
691 |       "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
692 |       "group-data-[collapsible=icon]:hidden",
693 |       className
694 |     )}
695 |     {...props}
696 |   />
697 | ))
698 | SidebarMenuSub.displayName = "SidebarMenuSub"
699 | 
700 | const SidebarMenuSubItem = React.forwardRef<
701 |   HTMLLIElement,
702 |   React.ComponentProps<"li">
703 | >(({ ...props }, ref) => <li ref={ref} {...props} />)
704 | SidebarMenuSubItem.displayName = "SidebarMenuSubItem"
705 | 
706 | const SidebarMenuSubButton = React.forwardRef<
707 |   HTMLAnchorElement,
708 |   React.ComponentProps<"a"> & {
709 |     asChild?: boolean
710 |     size?: "sm" | "md"
711 |     isActive?: boolean
712 |   }
713 | >(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
714 |   const Comp = asChild ? Slot : "a"
715 | 
716 |   return (
717 |     <Comp
718 |       ref={ref}
719 |       data-sidebar="menu-sub-button"
720 |       data-size={size}
721 |       data-active={isActive}
722 |       className={cn(
723 |         "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
724 |         "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
725 |         size === "sm" && "text-xs",
726 |         size === "md" && "text-sm",
727 |         "group-data-[collapsible=icon]:hidden",
728 |         className
729 |       )}
730 |       {...props}
731 |     />
732 |   )
733 | })
734 | SidebarMenuSubButton.displayName = "SidebarMenuSubButton"
735 | 
736 | export {
737 |   Sidebar,
738 |   SidebarContent,
739 |   SidebarFooter,
740 |   SidebarGroup,
741 |   SidebarGroupAction,
742 |   SidebarGroupContent,
743 |   SidebarGroupLabel,
744 |   SidebarHeader,
745 |   SidebarInput,
746 |   SidebarInset,
747 |   SidebarMenu,
748 |   SidebarMenuAction,
749 |   SidebarMenuBadge,
750 |   SidebarMenuButton,
751 |   SidebarMenuItem,
752 |   SidebarMenuSkeleton,
753 |   SidebarMenuSub,
754 |   SidebarMenuSubButton,
755 |   SidebarMenuSubItem,
756 |   SidebarProvider,
757 |   SidebarRail,
758 |   SidebarSeparator,
759 |   SidebarTrigger,
760 |   useSidebar
761 | }
```

components/ui/skeleton.tsx
```
1 | import { cn } from "@/lib/utils"
2 | 
3 | function Skeleton({
4 |   className,
5 |   ...props
6 | }: React.HTMLAttributes<HTMLDivElement>) {
7 |   return (
8 |     <div
9 |       className={cn("bg-muted animate-pulse rounded-md", className)}
10 |       {...props}
11 |     />
12 |   )
13 | }
14 | 
15 | export { Skeleton }
```

components/ui/slider.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as SliderPrimitive from "@radix-ui/react-slider"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Slider = React.forwardRef<
9 |   React.ElementRef<typeof SliderPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
11 | >(({ className, ...props }, ref) => (
12 |   <SliderPrimitive.Root
13 |     ref={ref}
14 |     className={cn(
15 |       "relative flex w-full touch-none select-none items-center",
16 |       className
17 |     )}
18 |     {...props}
19 |   >
20 |     <SliderPrimitive.Track className="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full">
21 |       <SliderPrimitive.Range className="bg-primary absolute h-full" />
22 |     </SliderPrimitive.Track>
23 |     <SliderPrimitive.Thumb className="border-primary bg-background ring-offset-background focus-visible:ring-ring block size-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
24 |   </SliderPrimitive.Root>
25 | ))
26 | Slider.displayName = SliderPrimitive.Root.displayName
27 | 
28 | export { Slider }
```

components/ui/sonner.tsx
```
1 | "use client"
2 | 
3 | import { useTheme } from "next-themes"
4 | import { Toaster as Sonner } from "sonner"
5 | 
6 | type ToasterProps = React.ComponentProps<typeof Sonner>
7 | 
8 | const Toaster = ({ ...props }: ToasterProps) => {
9 |   const { theme = "system" } = useTheme()
10 | 
11 |   return (
12 |     <Sonner
13 |       theme={theme as ToasterProps["theme"]}
14 |       className="toaster group"
15 |       toastOptions={{
16 |         classNames: {
17 |           toast:
18 |             "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
19 |           description: "group-[.toast]:text-muted-foreground",
20 |           actionButton:
21 |             "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
22 |           cancelButton:
23 |             "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
24 |         }
25 |       }}
26 |       {...props}
27 |     />
28 |   )
29 | }
30 | 
31 | export { Toaster }
```

components/ui/switch.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as SwitchPrimitives from "@radix-ui/react-switch"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Switch = React.forwardRef<
9 |   React.ElementRef<typeof SwitchPrimitives.Root>,
10 |   React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
11 | >(({ className, ...props }, ref) => (
12 |   <SwitchPrimitives.Root
13 |     className={cn(
14 |       "focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
15 |       className
16 |     )}
17 |     {...props}
18 |     ref={ref}
19 |   >
20 |     <SwitchPrimitives.Thumb
21 |       className={cn(
22 |         "bg-background pointer-events-none block size-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
23 |       )}
24 |     />
25 |   </SwitchPrimitives.Root>
26 | ))
27 | Switch.displayName = SwitchPrimitives.Root.displayName
28 | 
29 | export { Switch }
```

components/ui/table.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Table = React.forwardRef<
6 |   HTMLTableElement,
7 |   React.HTMLAttributes<HTMLTableElement>
8 | >(({ className, ...props }, ref) => (
9 |   <div className="relative w-full overflow-auto">
10 |     <table
11 |       ref={ref}
12 |       className={cn("w-full caption-bottom text-sm", className)}
13 |       {...props}
14 |     />
15 |   </div>
16 | ))
17 | Table.displayName = "Table"
18 | 
19 | const TableHeader = React.forwardRef<
20 |   HTMLTableSectionElement,
21 |   React.HTMLAttributes<HTMLTableSectionElement>
22 | >(({ className, ...props }, ref) => (
23 |   <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
24 | ))
25 | TableHeader.displayName = "TableHeader"
26 | 
27 | const TableBody = React.forwardRef<
28 |   HTMLTableSectionElement,
29 |   React.HTMLAttributes<HTMLTableSectionElement>
30 | >(({ className, ...props }, ref) => (
31 |   <tbody
32 |     ref={ref}
33 |     className={cn("[&_tr:last-child]:border-0", className)}
34 |     {...props}
35 |   />
36 | ))
37 | TableBody.displayName = "TableBody"
38 | 
39 | const TableFooter = React.forwardRef<
40 |   HTMLTableSectionElement,
41 |   React.HTMLAttributes<HTMLTableSectionElement>
42 | >(({ className, ...props }, ref) => (
43 |   <tfoot
44 |     ref={ref}
45 |     className={cn(
46 |       "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
47 |       className
48 |     )}
49 |     {...props}
50 |   />
51 | ))
52 | TableFooter.displayName = "TableFooter"
53 | 
54 | const TableRow = React.forwardRef<
55 |   HTMLTableRowElement,
56 |   React.HTMLAttributes<HTMLTableRowElement>
57 | >(({ className, ...props }, ref) => (
58 |   <tr
59 |     ref={ref}
60 |     className={cn(
61 |       "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
62 |       className
63 |     )}
64 |     {...props}
65 |   />
66 | ))
67 | TableRow.displayName = "TableRow"
68 | 
69 | const TableHead = React.forwardRef<
70 |   HTMLTableCellElement,
71 |   React.ThHTMLAttributes<HTMLTableCellElement>
72 | >(({ className, ...props }, ref) => (
73 |   <th
74 |     ref={ref}
75 |     className={cn(
76 |       "text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
77 |       className
78 |     )}
79 |     {...props}
80 |   />
81 | ))
82 | TableHead.displayName = "TableHead"
83 | 
84 | const TableCell = React.forwardRef<
85 |   HTMLTableCellElement,
86 |   React.TdHTMLAttributes<HTMLTableCellElement>
87 | >(({ className, ...props }, ref) => (
88 |   <td
89 |     ref={ref}
90 |     className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
91 |     {...props}
92 |   />
93 | ))
94 | TableCell.displayName = "TableCell"
95 | 
96 | const TableCaption = React.forwardRef<
97 |   HTMLTableCaptionElement,
98 |   React.HTMLAttributes<HTMLTableCaptionElement>
99 | >(({ className, ...props }, ref) => (
100 |   <caption
101 |     ref={ref}
102 |     className={cn("text-muted-foreground mt-4 text-sm", className)}
103 |     {...props}
104 |   />
105 | ))
106 | TableCaption.displayName = "TableCaption"
107 | 
108 | export {
109 |   Table,
110 |   TableHeader,
111 |   TableBody,
112 |   TableFooter,
113 |   TableHead,
114 |   TableRow,
115 |   TableCell,
116 |   TableCaption
117 | }
```

components/ui/tabs.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as TabsPrimitive from "@radix-ui/react-tabs"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Tabs = TabsPrimitive.Root
9 | 
10 | const TabsList = React.forwardRef<
11 |   React.ElementRef<typeof TabsPrimitive.List>,
12 |   React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
13 | >(({ className, ...props }, ref) => (
14 |   <TabsPrimitive.List
15 |     ref={ref}
16 |     className={cn(
17 |       "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
18 |       className
19 |     )}
20 |     {...props}
21 |   />
22 | ))
23 | TabsList.displayName = TabsPrimitive.List.displayName
24 | 
25 | const TabsTrigger = React.forwardRef<
26 |   React.ElementRef<typeof TabsPrimitive.Trigger>,
27 |   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
28 | >(({ className, ...props }, ref) => (
29 |   <TabsPrimitive.Trigger
30 |     ref={ref}
31 |     className={cn(
32 |       "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
33 |       className
34 |     )}
35 |     {...props}
36 |   />
37 | ))
38 | TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
39 | 
40 | const TabsContent = React.forwardRef<
41 |   React.ElementRef<typeof TabsPrimitive.Content>,
42 |   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
43 | >(({ className, ...props }, ref) => (
44 |   <TabsPrimitive.Content
45 |     ref={ref}
46 |     className={cn(
47 |       "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
48 |       className
49 |     )}
50 |     {...props}
51 |   />
52 | ))
53 | TabsContent.displayName = TabsPrimitive.Content.displayName
54 | 
55 | export { Tabs, TabsList, TabsTrigger, TabsContent }
```

components/ui/textarea.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Textarea = React.forwardRef<
6 |   HTMLTextAreaElement,
7 |   React.ComponentProps<"textarea">
8 | >(({ className, ...props }, ref) => {
9 |   return (
10 |     <textarea
11 |       className={cn(
12 |         "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
13 |         className
14 |       )}
15 |       ref={ref}
16 |       {...props}
17 |     />
18 |   )
19 | })
20 | Textarea.displayName = "Textarea"
21 | 
22 | export { Textarea }
```

components/ui/toast.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as ToastPrimitives from "@radix-ui/react-toast"
5 | import { cva, type VariantProps } from "class-variance-authority"
6 | import { X } from "lucide-react"
7 | 
8 | import { cn } from "@/lib/utils"
9 | 
10 | const ToastProvider = ToastPrimitives.Provider
11 | 
12 | const ToastViewport = React.forwardRef<
13 |   React.ElementRef<typeof ToastPrimitives.Viewport>,
14 |   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
15 | >(({ className, ...props }, ref) => (
16 |   <ToastPrimitives.Viewport
17 |     ref={ref}
18 |     className={cn(
19 |       "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
20 |       className
21 |     )}
22 |     {...props}
23 |   />
24 | ))
25 | ToastViewport.displayName = ToastPrimitives.Viewport.displayName
26 | 
27 | const toastVariants = cva(
28 |   "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
29 |   {
30 |     variants: {
31 |       variant: {
32 |         default: "bg-background text-foreground border",
33 |         destructive:
34 |           "destructive border-destructive bg-destructive text-destructive-foreground group"
35 |       }
36 |     },
37 |     defaultVariants: {
38 |       variant: "default"
39 |     }
40 |   }
41 | )
42 | 
43 | const Toast = React.forwardRef<
44 |   React.ElementRef<typeof ToastPrimitives.Root>,
45 |   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
46 |     VariantProps<typeof toastVariants>
47 | >(({ className, variant, ...props }, ref) => {
48 |   return (
49 |     <ToastPrimitives.Root
50 |       ref={ref}
51 |       className={cn(toastVariants({ variant }), className)}
52 |       {...props}
53 |     />
54 |   )
55 | })
56 | Toast.displayName = ToastPrimitives.Root.displayName
57 | 
58 | const ToastAction = React.forwardRef<
59 |   React.ElementRef<typeof ToastPrimitives.Action>,
60 |   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
61 | >(({ className, ...props }, ref) => (
62 |   <ToastPrimitives.Action
63 |     ref={ref}
64 |     className={cn(
65 |       "ring-offset-background hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
66 |       className
67 |     )}
68 |     {...props}
69 |   />
70 | ))
71 | ToastAction.displayName = ToastPrimitives.Action.displayName
72 | 
73 | const ToastClose = React.forwardRef<
74 |   React.ElementRef<typeof ToastPrimitives.Close>,
75 |   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
76 | >(({ className, ...props }, ref) => (
77 |   <ToastPrimitives.Close
78 |     ref={ref}
79 |     className={cn(
80 |       "text-foreground/50 hover:text-foreground absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
81 |       className
82 |     )}
83 |     toast-close=""
84 |     {...props}
85 |   >
86 |     <X className="size-4" />
87 |   </ToastPrimitives.Close>
88 | ))
89 | ToastClose.displayName = ToastPrimitives.Close.displayName
90 | 
91 | const ToastTitle = React.forwardRef<
92 |   React.ElementRef<typeof ToastPrimitives.Title>,
93 |   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
94 | >(({ className, ...props }, ref) => (
95 |   <ToastPrimitives.Title
96 |     ref={ref}
97 |     className={cn("text-sm font-semibold", className)}
98 |     {...props}
99 |   />
100 | ))
101 | ToastTitle.displayName = ToastPrimitives.Title.displayName
102 | 
103 | const ToastDescription = React.forwardRef<
104 |   React.ElementRef<typeof ToastPrimitives.Description>,
105 |   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
106 | >(({ className, ...props }, ref) => (
107 |   <ToastPrimitives.Description
108 |     ref={ref}
109 |     className={cn("text-sm opacity-90", className)}
110 |     {...props}
111 |   />
112 | ))
113 | ToastDescription.displayName = ToastPrimitives.Description.displayName
114 | 
115 | type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
116 | 
117 | type ToastActionElement = React.ReactElement<typeof ToastAction>
118 | 
119 | export {
120 |   type ToastProps,
121 |   type ToastActionElement,
122 |   ToastProvider,
123 |   ToastViewport,
124 |   Toast,
125 |   ToastTitle,
126 |   ToastDescription,
127 |   ToastClose,
128 |   ToastAction
129 | }
```

components/ui/toaster.tsx
```
1 | "use client"
2 | 
3 | import {
4 |   Toast,
5 |   ToastClose,
6 |   ToastDescription,
7 |   ToastProvider,
8 |   ToastTitle,
9 |   ToastViewport
10 | } from "@/components/ui/toast"
11 | import { useToast } from "@/components/ui/use-toast"
12 | 
13 | export function Toaster() {
14 |   const { toasts } = useToast()
15 | 
16 |   return (
17 |     <ToastProvider>
18 |       {toasts.map(function ({ id, title, description, action, ...props }) {
19 |         return (
20 |           <Toast key={id} {...props}>
21 |             <div className="grid gap-1">
22 |               {title && <ToastTitle>{title}</ToastTitle>}
23 |               {description && (
24 |                 <ToastDescription>{description}</ToastDescription>
25 |               )}
26 |             </div>
27 |             {action}
28 |             <ToastClose />
29 |           </Toast>
30 |         )
31 |       })}
32 |       <ToastViewport />
33 |     </ToastProvider>
34 |   )
35 | }
```

components/ui/toggle-group.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
5 | import { type VariantProps } from "class-variance-authority"
6 | 
7 | import { cn } from "@/lib/utils"
8 | import { toggleVariants } from "@/components/ui/toggle"
9 | 
10 | const ToggleGroupContext = React.createContext<
11 |   VariantProps<typeof toggleVariants>
12 | >({
13 |   size: "default",
14 |   variant: "default"
15 | })
16 | 
17 | const ToggleGroup = React.forwardRef<
18 |   React.ElementRef<typeof ToggleGroupPrimitive.Root>,
19 |   React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
20 |     VariantProps<typeof toggleVariants>
21 | >(({ className, variant, size, children, ...props }, ref) => (
22 |   <ToggleGroupPrimitive.Root
23 |     ref={ref}
24 |     className={cn("flex items-center justify-center gap-1", className)}
25 |     {...props}
26 |   >
27 |     <ToggleGroupContext.Provider value={{ variant, size }}>
28 |       {children}
29 |     </ToggleGroupContext.Provider>
30 |   </ToggleGroupPrimitive.Root>
31 | ))
32 | 
33 | ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName
34 | 
35 | const ToggleGroupItem = React.forwardRef<
36 |   React.ElementRef<typeof ToggleGroupPrimitive.Item>,
37 |   React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
38 |     VariantProps<typeof toggleVariants>
39 | >(({ className, children, variant, size, ...props }, ref) => {
40 |   const context = React.useContext(ToggleGroupContext)
41 | 
42 |   return (
43 |     <ToggleGroupPrimitive.Item
44 |       ref={ref}
45 |       className={cn(
46 |         toggleVariants({
47 |           variant: context.variant || variant,
48 |           size: context.size || size
49 |         }),
50 |         className
51 |       )}
52 |       {...props}
53 |     >
54 |       {children}
55 |     </ToggleGroupPrimitive.Item>
56 |   )
57 | })
58 | 
59 | ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName
60 | 
61 | export { ToggleGroup, ToggleGroupItem }
```

components/ui/toggle.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as TogglePrimitive from "@radix-ui/react-toggle"
5 | import { cva, type VariantProps } from "class-variance-authority"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const toggleVariants = cva(
10 |   "ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
11 |   {
12 |     variants: {
13 |       variant: {
14 |         default: "bg-transparent",
15 |         outline:
16 |           "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent"
17 |       },
18 |       size: {
19 |         default: "h-10 min-w-10 px-3",
20 |         sm: "h-9 min-w-9 px-2.5",
21 |         lg: "h-11 min-w-11 px-5"
22 |       }
23 |     },
24 |     defaultVariants: {
25 |       variant: "default",
26 |       size: "default"
27 |     }
28 |   }
29 | )
30 | 
31 | const Toggle = React.forwardRef<
32 |   React.ElementRef<typeof TogglePrimitive.Root>,
33 |   React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
34 |     VariantProps<typeof toggleVariants>
35 | >(({ className, variant, size, ...props }, ref) => (
36 |   <TogglePrimitive.Root
37 |     ref={ref}
38 |     className={cn(toggleVariants({ variant, size, className }))}
39 |     {...props}
40 |   />
41 | ))
42 | 
43 | Toggle.displayName = TogglePrimitive.Root.displayName
44 | 
45 | export { Toggle, toggleVariants }
```

components/ui/tooltip.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as TooltipPrimitive from "@radix-ui/react-tooltip"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const TooltipProvider = TooltipPrimitive.Provider
9 | 
10 | const Tooltip = TooltipPrimitive.Root
11 | 
12 | const TooltipTrigger = TooltipPrimitive.Trigger
13 | 
14 | const TooltipContent = React.forwardRef<
15 |   React.ElementRef<typeof TooltipPrimitive.Content>,
16 |   React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
17 | >(({ className, sideOffset = 4, ...props }, ref) => (
18 |   <TooltipPrimitive.Content
19 |     ref={ref}
20 |     sideOffset={sideOffset}
21 |     className={cn(
22 |       "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md",
23 |       className
24 |     )}
25 |     {...props}
26 |   />
27 | ))
28 | TooltipContent.displayName = TooltipPrimitive.Content.displayName
29 | 
30 | export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

components/ui/use-toast.ts
```
1 | "use client"
2 | 
3 | // Inspired by react-hot-toast library
4 | import * as React from "react"
5 | 
6 | import type { ToastActionElement, ToastProps } from "@/components/ui/toast"
7 | 
8 | const TOAST_LIMIT = 1
9 | const TOAST_REMOVE_DELAY = 1000000
10 | 
11 | type ToasterToast = ToastProps & {
12 |   id: string
13 |   title?: React.ReactNode
14 |   description?: React.ReactNode
15 |   action?: ToastActionElement
16 | }
17 | 
18 | const actionTypes = {
19 |   ADD_TOAST: "ADD_TOAST",
20 |   UPDATE_TOAST: "UPDATE_TOAST",
21 |   DISMISS_TOAST: "DISMISS_TOAST",
22 |   REMOVE_TOAST: "REMOVE_TOAST"
23 | } as const
24 | 
25 | let count = 0
26 | 
27 | function genId() {
28 |   count = (count + 1) % Number.MAX_SAFE_INTEGER
29 |   return count.toString()
30 | }
31 | 
32 | type ActionType = typeof actionTypes
33 | 
34 | type Action =
35 |   | {
36 |       type: ActionType["ADD_TOAST"]
37 |       toast: ToasterToast
38 |     }
39 |   | {
40 |       type: ActionType["UPDATE_TOAST"]
41 |       toast: Partial<ToasterToast>
42 |     }
43 |   | {
44 |       type: ActionType["DISMISS_TOAST"]
45 |       toastId?: ToasterToast["id"]
46 |     }
47 |   | {
48 |       type: ActionType["REMOVE_TOAST"]
49 |       toastId?: ToasterToast["id"]
50 |     }
51 | 
52 | interface State {
53 |   toasts: ToasterToast[]
54 | }
55 | 
56 | const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
57 | 
58 | const addToRemoveQueue = (toastId: string) => {
59 |   if (toastTimeouts.has(toastId)) {
60 |     return
61 |   }
62 | 
63 |   const timeout = setTimeout(() => {
64 |     toastTimeouts.delete(toastId)
65 |     dispatch({
66 |       type: "REMOVE_TOAST",
67 |       toastId: toastId
68 |     })
69 |   }, TOAST_REMOVE_DELAY)
70 | 
71 |   toastTimeouts.set(toastId, timeout)
72 | }
73 | 
74 | export const reducer = (state: State, action: Action): State => {
75 |   switch (action.type) {
76 |     case "ADD_TOAST":
77 |       return {
78 |         ...state,
79 |         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
80 |       }
81 | 
82 |     case "UPDATE_TOAST":
83 |       return {
84 |         ...state,
85 |         toasts: state.toasts.map(t =>
86 |           t.id === action.toast.id ? { ...t, ...action.toast } : t
87 |         )
88 |       }
89 | 
90 |     case "DISMISS_TOAST": {
91 |       const { toastId } = action
92 | 
93 |       // ! Side effects ! - This could be extracted into a dismissToast() action,
94 |       // but I'll keep it here for simplicity
95 |       if (toastId) {
96 |         addToRemoveQueue(toastId)
97 |       } else {
98 |         state.toasts.forEach(toast => {
99 |           addToRemoveQueue(toast.id)
100 |         })
101 |       }
102 | 
103 |       return {
104 |         ...state,
105 |         toasts: state.toasts.map(t =>
106 |           t.id === toastId || toastId === undefined
107 |             ? {
108 |                 ...t,
109 |                 open: false
110 |               }
111 |             : t
112 |         )
113 |       }
114 |     }
115 |     case "REMOVE_TOAST":
116 |       if (action.toastId === undefined) {
117 |         return {
118 |           ...state,
119 |           toasts: []
120 |         }
121 |       }
122 |       return {
123 |         ...state,
124 |         toasts: state.toasts.filter(t => t.id !== action.toastId)
125 |       }
126 |   }
127 | }
128 | 
129 | const listeners: Array<(state: State) => void> = []
130 | 
131 | let memoryState: State = { toasts: [] }
132 | 
133 | function dispatch(action: Action) {
134 |   memoryState = reducer(memoryState, action)
135 |   listeners.forEach(listener => {
136 |     listener(memoryState)
137 |   })
138 | }
139 | 
140 | type Toast = Omit<ToasterToast, "id">
141 | 
142 | function toast({ ...props }: Toast) {
143 |   const id = genId()
144 | 
145 |   const update = (props: ToasterToast) =>
146 |     dispatch({
147 |       type: "UPDATE_TOAST",
148 |       toast: { ...props, id }
149 |     })
150 |   const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
151 | 
152 |   dispatch({
153 |     type: "ADD_TOAST",
154 |     toast: {
155 |       ...props,
156 |       id,
157 |       open: true,
158 |       onOpenChange: open => {
159 |         if (!open) dismiss()
160 |       }
161 |     }
162 |   })
163 | 
164 |   return {
165 |     id: id,
166 |     dismiss,
167 |     update
168 |   }
169 | }
170 | 
171 | function useToast() {
172 |   const [state, setState] = React.useState<State>(memoryState)
173 | 
174 |   React.useEffect(() => {
175 |     listeners.push(setState)
176 |     return () => {
177 |       const index = listeners.indexOf(setState)
178 |       if (index > -1) {
179 |         listeners.splice(index, 1)
180 |       }
181 |     }
182 |   }, [state])
183 | 
184 |   return {
185 |     ...state,
186 |     toast,
187 |     dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId })
188 |   }
189 | }
190 | 
191 | export { useToast, toast }
```

components/landing/features.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides the features section for the landing page.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import {
10 |   Card,
11 |   CardDescription,
12 |   CardHeader,
13 |   CardTitle
14 | } from "@/components/ui/card"
15 | import { motion } from "framer-motion"
16 | import {
17 |   AppWindow,
18 |   Database,
19 |   DollarSign,
20 |   LucideIcon,
21 |   Shield,
22 |   Bot,
23 |   Clock,
24 |   ClipboardCheck,
25 |   MessageSquare,
26 |   LineChart
27 | } from "lucide-react"
28 | 
29 | interface FeatureProps {
30 |   title: string
31 |   description: string
32 |   icon: LucideIcon
33 | }
34 | 
35 | const features: FeatureProps[] = [
36 |   {
37 |     title: "AI-Powered Triage",
38 |     description:
39 |       "Intelligent system automatically prioritizes and routes maintenance requests for faster response times",
40 |     icon: Bot
41 |   },
42 |   {
43 |     title: "Real-Time Updates",
44 |     description:
45 |       "Keep tenants informed with automated status updates and estimated completion times",
46 |     icon: Clock
47 |   },
48 |   {
49 |     title: "Smart Scheduling",
50 |     description:
51 |       "Efficiently coordinate maintenance staff and contractors with automated scheduling",
52 |     icon: ClipboardCheck
53 |   },
54 |   {
55 |     title: "Instant Communication",
56 |     description:
57 |       "Built-in chat system for seamless communication between tenants, staff, and management",
58 |     icon: MessageSquare
59 |   }
60 | ]
61 | 
62 | const FeatureCard = ({ title, description, icon: Icon }: FeatureProps) => (
63 |   <motion.div
64 |     whileHover={{ scale: 1.05 }}
65 |     transition={{ type: "spring", stiffness: 300 }}
66 |     className="transform-gpu"
67 |   >
68 |     <Card className="group transition-shadow duration-200 hover:shadow-lg">
69 |       <CardHeader>
70 |         <Icon className="text-primary mb-2 size-12" />
71 |         <CardTitle>{title}</CardTitle>
72 |         <CardDescription>{description}</CardDescription>
73 |       </CardHeader>
74 |     </Card>
75 |   </motion.div>
76 | )
77 | 
78 | export const FeaturesSection = () => {
79 |   return (
80 |     <section className="mt-20 bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-800 dark:to-gray-900">
81 |       <div className="container mx-auto px-4">
82 |         <motion.div
83 |           initial={{ opacity: 0, y: 20 }}
84 |           animate={{ opacity: 1, y: 0 }}
85 |           transition={{ duration: 0.8, ease: "easeOut" }}
86 |         >
87 |           <h2 className="mb-4 text-center text-4xl font-bold">
88 |             Streamline Your Property Maintenance
89 |           </h2>
90 |           <p className="text-muted-foreground mb-12 text-center text-xl">
91 |             Powerful features to make property maintenance effortless
92 |           </p>
93 |           <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
94 |             {features.map((feature, index) => (
95 |               <FeatureCard key={index} {...feature} />
96 |             ))}
97 |           </div>
98 |         </motion.div>
99 |       </div>
100 |     </section>
101 |   )
102 | }
```

components/landing/hero.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides the hero section for the landing page.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { Button } from "@/components/ui/button"
10 | import { cn } from "@/lib/utils"
11 | import { motion } from "framer-motion"
12 | import { ChevronRight, Rocket } from "lucide-react"
13 | import Link from "next/link"
14 | import posthog from "posthog-js"
15 | import AnimatedGradientText from "../magicui/animated-gradient-text"
16 | 
17 | export const HeroSection = () => {
18 |   const handleGetStartedClick = () => {
19 |     posthog.capture("clicked_get_started")
20 |   }
21 | 
22 |   return (
23 |     <div className="flex flex-col items-center justify-center px-8 pt-32 text-center">
24 |       <motion.div
25 |         initial={{ opacity: 0, y: -20 }}
26 |         animate={{ opacity: 1, y: 0 }}
27 |         transition={{ duration: 0.6, ease: "easeOut" }}
28 |         className="flex items-center justify-center"
29 |       >
30 |         <Link href="/signup">
31 |           <AnimatedGradientText>
32 |             🏢 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
33 |             <span
34 |               className={cn(
35 |                 `animate-gradient inline bg-gradient-to-r from-[#40b0ff] via-[#409cff] to-[#4040ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
36 |               )}
37 |             >
38 |               Transform your property maintenance today
39 |             </span>
40 |             <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
41 |           </AnimatedGradientText>
42 |         </Link>
43 |       </motion.div>
44 | 
45 |       <motion.div
46 |         initial={{ opacity: 0, y: 20 }}
47 |         animate={{ opacity: 1, y: 0 }}
48 |         transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
49 |         className="mt-8 flex max-w-2xl flex-col items-center justify-center gap-6"
50 |       >
51 |         <motion.div
52 |           initial={{ scale: 0.95, opacity: 0 }}
53 |           animate={{ scale: 1, opacity: 1 }}
54 |           transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
55 |           className="text-balance text-6xl font-bold"
56 |         >
57 |           AI-Powered Property Maintenance Made Simple.
58 |         </motion.div>
59 | 
60 |         <motion.div
61 |           initial={{ opacity: 0 }}
62 |           animate={{ opacity: 1 }}
63 |           transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
64 |           className="max-w-xl text-balance text-xl"
65 |         >
66 |           RepairWise AI streamlines your apartment maintenance with intelligent
67 |           request handling, automated responses, and efficient repair
68 |           management.
69 |         </motion.div>
70 | 
71 |         <motion.div
72 |           initial={{ opacity: 0, y: 10 }}
73 |           animate={{ opacity: 1, y: 0 }}
74 |           transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
75 |         >
76 |           <Link href="/signup" onClick={handleGetStartedClick}>
77 |             <Button className="bg-blue-500 text-lg hover:bg-blue-600">
78 |               <Rocket className="mr-2 size-5" />
79 |               Start Managing Smarter &rarr;
80 |             </Button>
81 |           </Link>
82 |         </motion.div>
83 |       </motion.div>
84 |     </div>
85 |   )
86 | }
```

db/schema/index.ts
```
1 | /*
2 | <ai_context>
3 | Exports the database schema for the app.
4 | </ai_context>
5 | */
6 | 
7 | export * from "./profiles-schema"
8 | export * from "./todos-schema"
9 | export * from "./users-schema"
10 | export * from "./tickets-schema"
11 | export * from "./ticket-messages-schema"
12 | export * from "./organizations-schema"
13 | export * from "./properties-schema"
14 | export * from "./user-roles-schema"
15 | export * from "./invites-schema"
```

db/schema/invites-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for invites.
4 | </ai_context>
5 | */
6 | 
7 | import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
8 | import { organizationsTable } from "./organizations-schema"
9 | import { propertiesTable } from "./properties-schema"
10 | import { usersTable } from "./users-schema"
11 | import { orgRoleEnum } from "./user-roles-schema"
12 | 
13 | export const inviteStatusEnum = pgEnum("invite_status", [
14 |   "PENDING",
15 |   "ACCEPTED",
16 |   "EXPIRED",
17 |   "CANCELED"
18 | ])
19 | 
20 | export const invitesTable = pgTable("invites", {
21 |   id: uuid("id").defaultRandom().primaryKey(),
22 |   email: text("email").notNull(),
23 |   orgId: uuid("org_id")
24 |     .references(() => organizationsTable.id, { onDelete: "cascade" })
25 |     .notNull(),
26 |   propertyId: uuid("property_id")
27 |     .references(() => propertiesTable.id, { onDelete: "cascade" }),
28 |   role: orgRoleEnum("role").notNull(),
29 |   token: text("token").notNull().unique(),
30 |   status: inviteStatusEnum("status").notNull().default("PENDING"),
31 |   expiresAt: timestamp("expires_at").notNull(),
32 |   invitedByUserId: text("invited_by_user_id")
33 |     .references(() => usersTable.id, { onDelete: "cascade" })
34 |     .notNull(),
35 |   createdAt: timestamp("created_at").defaultNow().notNull()
36 | })
37 | 
38 | export type InsertInvite = typeof invitesTable.$inferInsert
39 | export type SelectInvite = typeof invitesTable.$inferSelect 
```

db/schema/organizations-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for organizations.
4 | </ai_context>
5 | */
6 | 
7 | import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
8 | 
9 | export const organizationsTable = pgTable("organizations", {
10 |   id: uuid("id").defaultRandom().primaryKey(),
11 |   name: text("name").notNull(),
12 |   createdAt: timestamp("created_at").defaultNow().notNull(),
13 |   updatedAt: timestamp("updated_at")
14 |     .defaultNow()
15 |     .notNull()
16 |     .$onUpdate(() => new Date())
17 | })
18 | 
19 | export type InsertOrganization = typeof organizationsTable.$inferInsert
20 | export type SelectOrganization = typeof organizationsTable.$inferSelect 
```

db/schema/profiles-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for profiles.
4 | </ai_context>
5 | */
6 | 
7 | import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
8 | 
9 | export const membershipEnum = pgEnum("membership", ["free", "pro"])
10 | 
11 | export const profilesTable = pgTable("profiles", {
12 |   userId: text("user_id").primaryKey().notNull(),
13 |   membership: membershipEnum("membership").notNull().default("free"),
14 |   stripeCustomerId: text("stripe_customer_id"),
15 |   stripeSubscriptionId: text("stripe_subscription_id"),
16 |   createdAt: timestamp("created_at").defaultNow().notNull(),
17 |   updatedAt: timestamp("updated_at")
18 |     .defaultNow()
19 |     .notNull()
20 |     .$onUpdate(() => new Date())
21 | })
22 | 
23 | export type InsertProfile = typeof profilesTable.$inferInsert
24 | export type SelectProfile = typeof profilesTable.$inferSelect
```

db/schema/properties-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for properties.
4 | </ai_context>
5 | */
6 | 
7 | import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
8 | import { organizationsTable } from "./organizations-schema"
9 | 
10 | export const propertiesTable = pgTable("properties", {
11 |   id: uuid("id").defaultRandom().primaryKey(),
12 |   orgId: uuid("org_id")
13 |     .references(() => organizationsTable.id, { onDelete: "cascade" })
14 |     .notNull(),
15 |   name: text("name").notNull(),
16 |   createdAt: timestamp("created_at").defaultNow().notNull(),
17 |   updatedAt: timestamp("updated_at")
18 |     .defaultNow()
19 |     .notNull()
20 |     .$onUpdate(() => new Date())
21 | })
22 | 
23 | export type InsertProperty = typeof propertiesTable.$inferInsert
24 | export type SelectProperty = typeof propertiesTable.$inferSelect 
```

db/schema/ticket-messages-schema.ts
```
1 | import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
2 | import { ticketsTable } from "./tickets-schema"
3 | import { usersTable } from "./users-schema"
4 | 
5 | export const ticketMessagesTable = pgTable("ticket_messages", {
6 |   id: text("id").primaryKey().notNull(),
7 |   ticketId: text("ticket_id")
8 |     .references(() => ticketsTable.id, { onDelete: "cascade" })
9 |     .notNull(),
10 |   senderId: text("sender_id")
11 |     .references(() => usersTable.id, { onDelete: "cascade" })
12 |     .notNull(),
13 |   message: text("message").notNull(),
14 |   createdAt: timestamp("created_at").defaultNow().notNull(),
15 |   updatedAt: timestamp("updated_at")
16 |     .defaultNow()
17 |     .notNull()
18 |     .$onUpdate(() => new Date())
19 | })
20 | 
21 | export type InsertTicketMessage = typeof ticketMessagesTable.$inferInsert
22 | export type SelectTicketMessage = typeof ticketMessagesTable.$inferSelect
```

db/schema/tickets-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for tickets.
4 | </ai_context>
5 | */
6 | 
7 | import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
8 | import { usersTable } from "./users-schema"
9 | import { propertiesTable } from "./properties-schema"
10 | 
11 | export const ticketStatusEnum = pgEnum("ticket_status", [
12 |   "open",
13 |   "in_progress",
14 |   "completed",
15 |   "closed",
16 |   "completed_by_chat"
17 | ])
18 | 
19 | export const ticketCategoryEnum = pgEnum("ticket_category", [
20 |   "maintenance",
21 |   "billing",
22 |   "noise_complaint",
23 |   "other"
24 | ])
25 | 
26 | export const ticketPriorityEnum = pgEnum("ticket_priority", [
27 |   "low",
28 |   "medium",
29 |   "high",
30 |   "critical"
31 | ])
32 | 
33 | export const ticketsTable = pgTable("tickets", {
34 |   id: text("id").primaryKey().notNull(),
35 |   tenantId: text("tenant_id")
36 |     .references(() => usersTable.id, { onDelete: "cascade" })
37 |     .notNull(),
38 |   propertyId: uuid("property_id")
39 |     .references(() => propertiesTable.id, { onDelete: "cascade" })
40 |     .notNull(),
41 |   title: text("title").notNull(),
42 |   description: text("description").notNull(),
43 |   status: ticketStatusEnum("status").notNull().default("open"),
44 |   category: ticketCategoryEnum("category").notNull(),
45 |   priority: ticketPriorityEnum("priority").notNull().default("low"),
46 |   costEstimate: text("cost_estimate"),
47 |   timeEstimate: text("time_estimate"),
48 |   emergencyLevel: text("emergency_level"),
49 |   userTone: text("user_tone"),
50 |   chatHistory: jsonb("chat_history"),
51 |   chatSummary: text("chat_summary"),
52 |   resolutionDetails: text("resolution_details"),
53 |   timeSpent: text("time_spent"),
54 |   costIncurred: text("cost_incurred"),
55 |   createdAt: timestamp("created_at").defaultNow().notNull(),
56 |   updatedAt: timestamp("updated_at")
57 |     .defaultNow()
58 |     .notNull()
59 |     .$onUpdate(() => new Date()),
60 |   closedAt: timestamp("closed_at")
61 | })
62 | 
63 | export type InsertTicket = typeof ticketsTable.$inferInsert
64 | export type SelectTicket = typeof ticketsTable.$inferSelect
```

db/schema/todos-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for todos.
4 | </ai_context>
5 | */
6 | 
7 | import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
8 | 
9 | export const todosTable = pgTable("todos", {
10 |   id: uuid("id").defaultRandom().primaryKey(),
11 |   userId: text("user_id").notNull(),
12 |   content: text("content").notNull(),
13 |   completed: boolean("completed").default(false).notNull(),
14 |   createdAt: timestamp("created_at").defaultNow().notNull(),
15 |   updatedAt: timestamp("updated_at")
16 |     .defaultNow()
17 |     .notNull()
18 |     .$onUpdate(() => new Date())
19 | })
20 | 
21 | export type InsertTodo = typeof todosTable.$inferInsert
22 | export type SelectTodo = typeof todosTable.$inferSelect
```

db/schema/user-roles-schema.ts
```
1 | /*
2 | <ai_context>
3 | Defines the database schema for user roles.
4 | </ai_context>
5 | */
6 | 
7 | import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
8 | import { relations } from "drizzle-orm"
9 | import { organizationsTable } from "./organizations-schema"
10 | import { propertiesTable } from "./properties-schema"
11 | import { usersTable } from "./users-schema"
12 | 
13 | export const orgRoleEnum = pgEnum("org_role_type", [
14 |   "ADMIN",
15 |   "EMPLOYEE",
16 |   "MAINTENANCE",
17 |   "TENANT"
18 | ])
19 | 
20 | export const userRolesTable = pgTable("user_roles", {
21 |   id: uuid("id").defaultRandom().primaryKey(),
22 |   userId: text("user_id")
23 |     .references(() => usersTable.id, { onDelete: "cascade" })
24 |     .notNull(),
25 |   orgId: uuid("org_id")
26 |     .references(() => organizationsTable.id, { onDelete: "cascade" })
27 |     .notNull(),
28 |   propertyId: uuid("property_id")
29 |     .references(() => propertiesTable.id, { onDelete: "cascade" }),
30 |   role: orgRoleEnum("role").notNull(),
31 |   createdAt: timestamp("created_at").defaultNow().notNull()
32 | })
33 | 
34 | export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
35 |   user: one(usersTable, {
36 |     fields: [userRolesTable.userId],
37 |     references: [usersTable.id]
38 |   }),
39 |   organization: one(organizationsTable, {
40 |     fields: [userRolesTable.orgId],
41 |     references: [organizationsTable.id]
42 |   }),
43 |   property: one(propertiesTable, {
44 |     fields: [userRolesTable.propertyId],
45 |     references: [propertiesTable.id]
46 |   })
47 | }))
48 | 
49 | export type InsertUserRole = typeof userRolesTable.$inferInsert
50 | export type SelectUserRole = typeof userRolesTable.$inferSelect 
```

db/schema/users-schema.ts
```
1 | import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
2 | 
3 | export const userRoleEnum = pgEnum("user_role", ["tenant", "staff"])
4 | 
5 | export const usersTable = pgTable("users", {
6 |   id: text("id").primaryKey().notNull(),
7 |   clerkId: text("clerk_id").notNull().unique(),
8 |   role: userRoleEnum("role").notNull().default("tenant"),
9 |   email: text("email").notNull(),
10 |   fullName: text("full_name"),
11 |   createdAt: timestamp("created_at").defaultNow().notNull(),
12 |   updatedAt: timestamp("updated_at")
13 |     .defaultNow()
14 |     .notNull()
15 |     .$onUpdate(() => new Date())
16 | })
17 | 
18 | export type InsertUser = typeof usersTable.$inferInsert
19 | export type SelectUser = typeof usersTable.$inferSelect
```

lib/hooks/use-copy-to-clipboard.tsx
```
1 | /*
2 | <ai_context>
3 | Hook for copying text to the clipboard.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { useState } from "react"
10 | 
11 | export interface useCopyToClipboardProps {
12 |   timeout?: number
13 | }
14 | 
15 | export function useCopyToClipboard({
16 |   timeout = 2000
17 | }: useCopyToClipboardProps) {
18 |   const [isCopied, setIsCopied] = useState<Boolean>(false)
19 | 
20 |   const copyToClipboard = (value: string) => {
21 |     if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
22 |       return
23 |     }
24 | 
25 |     if (!value) {
26 |       return
27 |     }
28 | 
29 |     navigator.clipboard.writeText(value).then(() => {
30 |       setIsCopied(true)
31 | 
32 |       setTimeout(() => {
33 |         setIsCopied(false)
34 |       }, timeout)
35 |     })
36 |   }
37 | 
38 |   return { isCopied, copyToClipboard }
39 | }
```

lib/hooks/use-mobile.tsx
```
1 | /*
2 | <ai_context>
3 | Hook to check if the user is on a mobile device.
4 | </ai_context>
5 | */
6 | 
7 | import * as React from "react"
8 | 
9 | const MOBILE_BREAKPOINT = 768
10 | 
11 | export function useIsMobile() {
12 |   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
13 | 
14 |   React.useEffect(() => {
15 |     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
16 |     const onChange = () => {
17 |       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
18 |     }
19 |     mql.addEventListener("change", onChange)
20 |     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
21 |     return () => mql.removeEventListener("change", onChange)
22 |   }, [])
23 | 
24 |   return !!isMobile
25 | }
```

lib/hooks/use-toast.ts
```
1 | /*
2 | <ai_context>
3 | Hook to display toast notifications.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | // Inspired by react-hot-toast library
10 | import * as React from "react"
11 | 
12 | import type { ToastActionElement, ToastProps } from "@/components/ui/toast"
13 | 
14 | const TOAST_LIMIT = 1
15 | const TOAST_REMOVE_DELAY = 1000000
16 | 
17 | type ToasterToast = ToastProps & {
18 |   id: string
19 |   title?: React.ReactNode
20 |   description?: React.ReactNode
21 |   action?: ToastActionElement
22 | }
23 | 
24 | const actionTypes = {
25 |   ADD_TOAST: "ADD_TOAST",
26 |   UPDATE_TOAST: "UPDATE_TOAST",
27 |   DISMISS_TOAST: "DISMISS_TOAST",
28 |   REMOVE_TOAST: "REMOVE_TOAST"
29 | } as const
30 | 
31 | let count = 0
32 | 
33 | function genId() {
34 |   count = (count + 1) % Number.MAX_SAFE_INTEGER
35 |   return count.toString()
36 | }
37 | 
38 | type ActionType = typeof actionTypes
39 | 
40 | type Action =
41 |   | {
42 |       type: ActionType["ADD_TOAST"]
43 |       toast: ToasterToast
44 |     }
45 |   | {
46 |       type: ActionType["UPDATE_TOAST"]
47 |       toast: Partial<ToasterToast>
48 |     }
49 |   | {
50 |       type: ActionType["DISMISS_TOAST"]
51 |       toastId?: ToasterToast["id"]
52 |     }
53 |   | {
54 |       type: ActionType["REMOVE_TOAST"]
55 |       toastId?: ToasterToast["id"]
56 |     }
57 | 
58 | interface State {
59 |   toasts: ToasterToast[]
60 | }
61 | 
62 | const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
63 | 
64 | const addToRemoveQueue = (toastId: string) => {
65 |   if (toastTimeouts.has(toastId)) {
66 |     return
67 |   }
68 | 
69 |   const timeout = setTimeout(() => {
70 |     toastTimeouts.delete(toastId)
71 |     dispatch({
72 |       type: "REMOVE_TOAST",
73 |       toastId: toastId
74 |     })
75 |   }, TOAST_REMOVE_DELAY)
76 | 
77 |   toastTimeouts.set(toastId, timeout)
78 | }
79 | 
80 | export const reducer = (state: State, action: Action): State => {
81 |   switch (action.type) {
82 |     case "ADD_TOAST":
83 |       return {
84 |         ...state,
85 |         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
86 |       }
87 | 
88 |     case "UPDATE_TOAST":
89 |       return {
90 |         ...state,
91 |         toasts: state.toasts.map(t =>
92 |           t.id === action.toast.id ? { ...t, ...action.toast } : t
93 |         )
94 |       }
95 | 
96 |     case "DISMISS_TOAST": {
97 |       const { toastId } = action
98 | 
99 |       // ! Side effects ! - This could be extracted into a dismissToast() action,
100 |       // but I'll keep it here for simplicity
101 |       if (toastId) {
102 |         addToRemoveQueue(toastId)
103 |       } else {
104 |         state.toasts.forEach(toast => {
105 |           addToRemoveQueue(toast.id)
106 |         })
107 |       }
108 | 
109 |       return {
110 |         ...state,
111 |         toasts: state.toasts.map(t =>
112 |           t.id === toastId || toastId === undefined
113 |             ? {
114 |                 ...t,
115 |                 open: false
116 |               }
117 |             : t
118 |         )
119 |       }
120 |     }
121 |     case "REMOVE_TOAST":
122 |       if (action.toastId === undefined) {
123 |         return {
124 |           ...state,
125 |           toasts: []
126 |         }
127 |       }
128 |       return {
129 |         ...state,
130 |         toasts: state.toasts.filter(t => t.id !== action.toastId)
131 |       }
132 |   }
133 | }
134 | 
135 | const listeners: Array<(state: State) => void> = []
136 | 
137 | let memoryState: State = { toasts: [] }
138 | 
139 | function dispatch(action: Action) {
140 |   memoryState = reducer(memoryState, action)
141 |   listeners.forEach(listener => {
142 |     listener(memoryState)
143 |   })
144 | }
145 | 
146 | type Toast = Omit<ToasterToast, "id">
147 | 
148 | function toast({ ...props }: Toast) {
149 |   const id = genId()
150 | 
151 |   const update = (props: ToasterToast) =>
152 |     dispatch({
153 |       type: "UPDATE_TOAST",
154 |       toast: { ...props, id }
155 |     })
156 |   const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
157 | 
158 |   dispatch({
159 |     type: "ADD_TOAST",
160 |     toast: {
161 |       ...props,
162 |       id,
163 |       open: true,
164 |       onOpenChange: open => {
165 |         if (!open) dismiss()
166 |       }
167 |     }
168 |   })
169 | 
170 |   return {
171 |     id: id,
172 |     dismiss,
173 |     update
174 |   }
175 | }
176 | 
177 | function useToast() {
178 |   const [state, setState] = React.useState<State>(memoryState)
179 | 
180 |   React.useEffect(() => {
181 |     listeners.push(setState)
182 |     return () => {
183 |       const index = listeners.indexOf(setState)
184 |       if (index > -1) {
185 |         listeners.splice(index, 1)
186 |       }
187 |     }
188 |   }, [state])
189 | 
190 |   return {
191 |     ...state,
192 |     toast,
193 |     dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId })
194 |   }
195 | }
196 | 
197 | export { toast, useToast }
```

db/migrations/0000_nostalgic_mauler.sql
```
1 | DO $$ BEGIN
2 |  CREATE TYPE "public"."membership" AS ENUM('free', 'pro');
3 | EXCEPTION
4 |  WHEN duplicate_object THEN null;
5 | END $$;
6 | --> statement-breakpoint
7 | CREATE TABLE IF NOT EXISTS "profiles" (
8 | 	"user_id" text PRIMARY KEY NOT NULL,
9 | 	"membership" "membership" DEFAULT 'free' NOT NULL,
10 | 	"stripe_customer_id" text,
11 | 	"stripe_subscription_id" text,
12 | 	"created_at" timestamp DEFAULT now() NOT NULL,
13 | 	"updated_at" timestamp DEFAULT now() NOT NULL
14 | );
15 | --> statement-breakpoint
16 | CREATE TABLE IF NOT EXISTS "todos" (
17 | 	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
18 | 	"user_id" text NOT NULL,
19 | 	"content" text NOT NULL,
20 | 	"completed" boolean DEFAULT false NOT NULL,
21 | 	"created_at" timestamp DEFAULT now() NOT NULL,
22 | 	"updated_at" timestamp DEFAULT now() NOT NULL
23 | );
```

db/migrations/0001_lyrical_gambit.sql
```
1 | DO $$ BEGIN
2 |  CREATE TYPE "public"."user_role" AS ENUM('tenant', 'staff');
3 | EXCEPTION
4 |  WHEN duplicate_object THEN null;
5 | END $$;
6 | --> statement-breakpoint
7 | DO $$ BEGIN
8 |  CREATE TYPE "public"."ticket_category" AS ENUM('maintenance', 'billing', 'noise_complaint', 'other');
9 | EXCEPTION
10 |  WHEN duplicate_object THEN null;
11 | END $$;
12 | --> statement-breakpoint
13 | DO $$ BEGIN
14 |  CREATE TYPE "public"."ticket_priority" AS ENUM('low', 'medium', 'high', 'critical');
15 | EXCEPTION
16 |  WHEN duplicate_object THEN null;
17 | END $$;
18 | --> statement-breakpoint
19 | DO $$ BEGIN
20 |  CREATE TYPE "public"."ticket_status" AS ENUM('open', 'in_progress', 'completed', 'closed', 'completed_by_chat');
21 | EXCEPTION
22 |  WHEN duplicate_object THEN null;
23 | END $$;
24 | --> statement-breakpoint
25 | CREATE TABLE IF NOT EXISTS "users" (
26 | 	"id" text PRIMARY KEY NOT NULL,
27 | 	"clerk_id" text NOT NULL,
28 | 	"role" "user_role" DEFAULT 'tenant' NOT NULL,
29 | 	"email" text NOT NULL,
30 | 	"full_name" text,
31 | 	"created_at" timestamp DEFAULT now() NOT NULL,
32 | 	"updated_at" timestamp DEFAULT now() NOT NULL,
33 | 	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
34 | );
35 | --> statement-breakpoint
36 | CREATE TABLE IF NOT EXISTS "tickets" (
37 | 	"id" text PRIMARY KEY NOT NULL,
38 | 	"tenant_id" text NOT NULL,
39 | 	"title" text NOT NULL,
40 | 	"description" text NOT NULL,
41 | 	"status" "ticket_status" DEFAULT 'open' NOT NULL,
42 | 	"category" "ticket_category" NOT NULL,
43 | 	"priority" "ticket_priority" DEFAULT 'low' NOT NULL,
44 | 	"cost_estimate" text,
45 | 	"time_estimate" text,
46 | 	"emergency_level" text,
47 | 	"user_tone" text,
48 | 	"chat_history" jsonb,
49 | 	"chat_summary" text,
50 | 	"resolution_details" text,
51 | 	"time_spent" text,
52 | 	"cost_incurred" text,
53 | 	"created_at" timestamp DEFAULT now() NOT NULL,
54 | 	"updated_at" timestamp DEFAULT now() NOT NULL,
55 | 	"closed_at" timestamp
56 | );
57 | --> statement-breakpoint
58 | CREATE TABLE IF NOT EXISTS "ticket_messages" (
59 | 	"id" text PRIMARY KEY NOT NULL,
60 | 	"ticket_id" text NOT NULL,
61 | 	"sender_id" text NOT NULL,
62 | 	"message" text NOT NULL,
63 | 	"created_at" timestamp DEFAULT now() NOT NULL,
64 | 	"updated_at" timestamp DEFAULT now() NOT NULL
65 | );
66 | --> statement-breakpoint
67 | DO $$ BEGIN
68 |  ALTER TABLE "tickets" ADD CONSTRAINT "tickets_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
69 | EXCEPTION
70 |  WHEN duplicate_object THEN null;
71 | END $$;
72 | --> statement-breakpoint
73 | DO $$ BEGIN
74 |  ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;
75 | EXCEPTION
76 |  WHEN duplicate_object THEN null;
77 | END $$;
78 | --> statement-breakpoint
79 | DO $$ BEGIN
80 |  ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
81 | EXCEPTION
82 |  WHEN duplicate_object THEN null;
83 | END $$;
```

app/(marketing)/about/page.tsx
```
1 | /*
2 | <ai_context>
3 | This server page returns a simple "About Page" component as a (marketing) route.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | export default async function AboutPage() {
10 |   return <div>About Page</div>
11 | }
```

app/(marketing)/pricing/page.tsx
```
1 | /*
2 | <ai_context>
3 | This server page displays pricing options for the product, integrating Stripe payment links.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | import { Button } from "@/components/ui/button"
10 | import {
11 |   Card,
12 |   CardContent,
13 |   CardDescription,
14 |   CardFooter,
15 |   CardHeader,
16 |   CardTitle
17 | } from "@/components/ui/card"
18 | import { cn } from "@/lib/utils"
19 | import { auth } from "@clerk/nextjs/server"
20 | 
21 | export default async function PricingPage() {
22 |   const { userId } = await auth()
23 | 
24 |   return (
25 |     <div className="container mx-auto py-12">
26 |       <h1 className="mb-8 text-center text-3xl font-bold">Choose Your Plan</h1>
27 |       <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
28 |         <PricingCard
29 |           title="Monthly Plan"
30 |           price="$10"
31 |           description="Billed monthly"
32 |           buttonText="Subscribe Monthly"
33 |           buttonLink={
34 |             process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY || "#"
35 |           }
36 |           userId={userId}
37 |         />
38 |         <PricingCard
39 |           title="Yearly Plan"
40 |           price="$100"
41 |           description="Billed annually"
42 |           buttonText="Subscribe Yearly"
43 |           buttonLink={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY || "#"}
44 |           userId={userId}
45 |         />
46 |       </div>
47 |     </div>
48 |   )
49 | }
50 | 
51 | interface PricingCardProps {
52 |   title: string
53 |   price: string
54 |   description: string
55 |   buttonText: string
56 |   buttonLink: string
57 |   userId: string | null
58 | }
59 | 
60 | function PricingCard({
61 |   title,
62 |   price,
63 |   description,
64 |   buttonText,
65 |   buttonLink,
66 |   userId
67 | }: PricingCardProps) {
68 |   const finalButtonLink = userId
69 |     ? `${buttonLink}?client_reference_id=${userId}`
70 |     : buttonLink
71 | 
72 |   return (
73 |     <Card className="flex h-full flex-col">
74 |       <CardHeader>
75 |         <CardTitle className="text-2xl">{title}</CardTitle>
76 |         <CardDescription>{description}</CardDescription>
77 |       </CardHeader>
78 |       <CardContent className="flex grow items-center justify-center">
79 |         <p className="text-4xl font-bold">{price}</p>
80 |       </CardContent>
81 |       <CardFooter>
82 |         <Button className="w-full" asChild>
83 |           <a
84 |             href={finalButtonLink}
85 |             className={cn(
86 |               "inline-flex items-center justify-center",
87 |               finalButtonLink === "#" && "pointer-events-none opacity-50"
88 |             )}
89 |           >
90 |             {buttonText}
91 |           </a>
92 |         </Button>
93 |       </CardFooter>
94 |     </Card>
95 |   )
96 | }
```

app/(marketing)/contact/page.tsx
```
1 | /*
2 | <ai_context>
3 | This server page returns a simple "Contact Page" component as a (marketing) route.
4 | </ai_context>
5 | */
6 | 
7 | "use server"
8 | 
9 | export default async function ContactPage() {
10 |   return <div>Contact Page</div>
11 | }
```

app/auth/redirect/page.tsx
```
1 | "use server"
2 | 
3 | import { getUserByClerkIdAction } from "@/actions/db/users-actions"
4 | import { auth } from "@clerk/nextjs/server"
5 | import { redirect } from "next/navigation"
6 | 
7 | export default async function RedirectPage() {
8 |   const { userId } = await auth()
9 | 
10 |   if (!userId) {
11 |     redirect("/login")
12 |   }
13 | 
14 |   const userResult = await getUserByClerkIdAction(userId)
15 |   if (userResult.isSuccess && userResult.data?.role === "staff") {
16 |     redirect("/staff/tickets")
17 |   } else {
18 |     redirect("/tenant/tickets")
19 |   }
20 | }
```

app/tenant/tickets/page.tsx
```
1 | "use server"
2 | 
3 | import { getTicketsByTenantAction } from "@/actions/db/tickets-actions"
4 | import { auth } from "@clerk/nextjs/server"
5 | import { NewTicketButton } from "./_components/button-wrapper"
6 | import { TicketListWrapper } from "./_components/ticket-list-wrapper"
7 | 
8 | export default async function TenantTicketsPage() {
9 |   const { userId } = await auth()
10 | 
11 |   if (!userId) {
12 |     return <div>Please sign in to view your tickets.</div>
13 |   }
14 | 
15 |   const result = await getTicketsByTenantAction(userId)
16 | 
17 |   return (
18 |     <div className="container space-y-6 py-8">
19 |       <div className="flex items-center justify-between">
20 |         <h1 className="text-3xl font-bold">My Tickets</h1>
21 |         <NewTicketButton />
22 |       </div>
23 | 
24 |       <TicketListWrapper tickets={result.isSuccess ? result.data : []} />
25 |     </div>
26 |   )
27 | }
```

app/staff/tickets/page.tsx
```
1 | "use client"
2 | 
3 | import { getAllTicketsAction } from "@/actions/db/tickets-actions"
4 | import { TicketList } from "@/components/tickets/ticket-list"
5 | import { Button } from "@/components/ui/button"
6 | import {
7 |   Select,
8 |   SelectContent,
9 |   SelectItem,
10 |   SelectTrigger,
11 |   SelectValue
12 | } from "@/components/ui/select"
13 | import { SelectTicket } from "@/db/schema"
14 | import { useAuth } from "@clerk/nextjs"
15 | import { useRouter } from "next/navigation"
16 | import { useEffect, useState } from "react"
17 | 
18 | export default function StaffTicketsPage() {
19 |   const { userId, isLoaded } = useAuth()
20 |   const router = useRouter()
21 |   const [tickets, setTickets] = useState<SelectTicket[]>([])
22 |   const [status, setStatus] = useState("all")
23 |   const [priority, setPriority] = useState("all")
24 |   const [isLoading, setIsLoading] = useState(true)
25 | 
26 |   useEffect(() => {
27 |     if (isLoaded && !userId) {
28 |       router.push("/login")
29 |       return
30 |     }
31 | 
32 |     async function fetchTickets() {
33 |       setIsLoading(true)
34 |       const result = await getAllTicketsAction({
35 |         status: status as any,
36 |         priority: priority as any
37 |       })
38 |       if (result.isSuccess) {
39 |         setTickets(result.data)
40 |       }
41 |       setIsLoading(false)
42 |     }
43 | 
44 |     if (userId) {
45 |       fetchTickets()
46 |     }
47 |   }, [isLoaded, userId, status, priority])
48 | 
49 |   if (!isLoaded || !userId) {
50 |     return null
51 |   }
52 | 
53 |   return (
54 |     <div className="container space-y-6 py-8">
55 |       <div className="flex items-center justify-between">
56 |         <h1 className="text-3xl font-bold">Maintenance Request Dashboard</h1>
57 |         <div className="flex items-center gap-4">
58 |           <Select value={status} onValueChange={setStatus}>
59 |             <SelectTrigger className="w-[180px]">
60 |               <SelectValue placeholder="Filter by status" />
61 |             </SelectTrigger>
62 |             <SelectContent>
63 |               <SelectItem value="all">All Requests</SelectItem>
64 |               <SelectItem value="open">New Requests</SelectItem>
65 |               <SelectItem value="in_progress">In Progress</SelectItem>
66 |               <SelectItem value="completed">Completed</SelectItem>
67 |               <SelectItem value="completed_by_chat">AI Resolved</SelectItem>
68 |               <SelectItem value="closed">Closed</SelectItem>
69 |             </SelectContent>
70 |           </Select>
71 | 
72 |           <Select value={priority} onValueChange={setPriority}>
73 |             <SelectTrigger className="w-[180px]">
74 |               <SelectValue placeholder="Filter by priority" />
75 |             </SelectTrigger>
76 |             <SelectContent>
77 |               <SelectItem value="all">All Priorities</SelectItem>
78 |               <SelectItem value="low">Routine</SelectItem>
79 |               <SelectItem value="medium">Important</SelectItem>
80 |               <SelectItem value="high">Urgent</SelectItem>
81 |               <SelectItem value="critical">Emergency</SelectItem>
82 |             </SelectContent>
83 |           </Select>
84 |         </div>
85 |       </div>
86 | 
87 |       {isLoading ? (
88 |         <div>Loading...</div>
89 |       ) : (
90 |         <TicketList tickets={tickets} baseUrl="/staff/tickets" />
91 |       )}
92 |     </div>
93 |   )
94 | }
```

components/utilities/posthog/posthog-pageview.tsx
```
1 | /*
2 | <ai_context>
3 | This client component tracks pageviews in PostHog.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { usePathname } from "next/navigation"
10 | import posthog from "posthog-js"
11 | import { useEffect } from "react"
12 | 
13 | export function PostHogPageview() {
14 |   const pathname = usePathname()
15 | 
16 |   useEffect(() => {
17 |     // Track a pageview whenever the pathname changes
18 |     if (pathname) {
19 |       posthog.capture("$pageview", { path: pathname })
20 |     }
21 |   }, [pathname])
22 | 
23 |   return null
24 | }
```

components/utilities/posthog/posthog-provider.tsx
```
1 | /*
2 | <ai_context>
3 | This client component provides the PostHog provider for the app.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import posthog from "posthog-js"
10 | import { PostHogProvider } from "posthog-js/react"
11 | 
12 | if (
13 |   typeof window !== "undefined" &&
14 |   process.env.NEXT_PUBLIC_POSTHOG_KEY &&
15 |   process.env.NEXT_PUBLIC_POSTHOG_HOST
16 | ) {
17 |   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
18 |     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
19 |     person_profiles: "identified_only" // or 'always' to create profiles for anonymous users as well
20 |   })
21 | }
22 | export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
23 |   return <PostHogProvider client={posthog}>{children}</PostHogProvider>
24 | }
```

components/utilities/posthog/posthog-user-identity.tsx
```
1 | /*
2 | <ai_context>
3 | This client component identifies the user in PostHog.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { useUser } from "@clerk/nextjs"
10 | import posthog from "posthog-js"
11 | import { useEffect } from "react"
12 | 
13 | export function PostHogUserIdentify() {
14 |   const { user } = useUser()
15 | 
16 |   useEffect(() => {
17 |     if (user?.id) {
18 |       // Identify the user in PostHog
19 |       posthog.identify(user.id)
20 |     } else {
21 |       // If no user is signed in, reset any previously identified user
22 |       posthog.reset()
23 |     }
24 |   }, [user?.id])
25 | 
26 |   return null
27 | }
```

db/migrations/meta/0000_snapshot.json
```
1 | {
2 |   "id": "6650ce65-4eed-4913-ba2f-2a8560d31920",
3 |   "prevId": "00000000-0000-0000-0000-000000000000",
4 |   "version": "7",
5 |   "dialect": "postgresql",
6 |   "tables": {
7 |     "public.profiles": {
8 |       "name": "profiles",
9 |       "schema": "",
10 |       "columns": {
11 |         "user_id": {
12 |           "name": "user_id",
13 |           "type": "text",
14 |           "primaryKey": true,
15 |           "notNull": true
16 |         },
17 |         "membership": {
18 |           "name": "membership",
19 |           "type": "membership",
20 |           "typeSchema": "public",
21 |           "primaryKey": false,
22 |           "notNull": true,
23 |           "default": "'free'"
24 |         },
25 |         "stripe_customer_id": {
26 |           "name": "stripe_customer_id",
27 |           "type": "text",
28 |           "primaryKey": false,
29 |           "notNull": false
30 |         },
31 |         "stripe_subscription_id": {
32 |           "name": "stripe_subscription_id",
33 |           "type": "text",
34 |           "primaryKey": false,
35 |           "notNull": false
36 |         },
37 |         "created_at": {
38 |           "name": "created_at",
39 |           "type": "timestamp",
40 |           "primaryKey": false,
41 |           "notNull": true,
42 |           "default": "now()"
43 |         },
44 |         "updated_at": {
45 |           "name": "updated_at",
46 |           "type": "timestamp",
47 |           "primaryKey": false,
48 |           "notNull": true,
49 |           "default": "now()"
50 |         }
51 |       },
52 |       "indexes": {},
53 |       "foreignKeys": {},
54 |       "compositePrimaryKeys": {},
55 |       "uniqueConstraints": {}
56 |     },
57 |     "public.todos": {
58 |       "name": "todos",
59 |       "schema": "",
60 |       "columns": {
61 |         "id": {
62 |           "name": "id",
63 |           "type": "uuid",
64 |           "primaryKey": true,
65 |           "notNull": true,
66 |           "default": "gen_random_uuid()"
67 |         },
68 |         "user_id": {
69 |           "name": "user_id",
70 |           "type": "text",
71 |           "primaryKey": false,
72 |           "notNull": true
73 |         },
74 |         "content": {
75 |           "name": "content",
76 |           "type": "text",
77 |           "primaryKey": false,
78 |           "notNull": true
79 |         },
80 |         "completed": {
81 |           "name": "completed",
82 |           "type": "boolean",
83 |           "primaryKey": false,
84 |           "notNull": true,
85 |           "default": false
86 |         },
87 |         "created_at": {
88 |           "name": "created_at",
89 |           "type": "timestamp",
90 |           "primaryKey": false,
91 |           "notNull": true,
92 |           "default": "now()"
93 |         },
94 |         "updated_at": {
95 |           "name": "updated_at",
96 |           "type": "timestamp",
97 |           "primaryKey": false,
98 |           "notNull": true,
99 |           "default": "now()"
100 |         }
101 |       },
102 |       "indexes": {},
103 |       "foreignKeys": {},
104 |       "compositePrimaryKeys": {},
105 |       "uniqueConstraints": {}
106 |     }
107 |   },
108 |   "enums": {
109 |     "public.membership": {
110 |       "name": "membership",
111 |       "schema": "public",
112 |       "values": [
113 |         "free",
114 |         "pro"
115 |       ]
116 |     }
117 |   },
118 |   "schemas": {},
119 |   "sequences": {},
120 |   "_meta": {
121 |     "columns": {},
122 |     "schemas": {},
123 |     "tables": {}
124 |   }
125 | }
```

db/migrations/meta/0001_snapshot.json
```
1 | {
2 |   "id": "9c9a39e7-c3f1-4cd9-ba38-4c94be83db41",
3 |   "prevId": "6650ce65-4eed-4913-ba2f-2a8560d31920",
4 |   "version": "7",
5 |   "dialect": "postgresql",
6 |   "tables": {
7 |     "public.profiles": {
8 |       "name": "profiles",
9 |       "schema": "",
10 |       "columns": {
11 |         "user_id": {
12 |           "name": "user_id",
13 |           "type": "text",
14 |           "primaryKey": true,
15 |           "notNull": true
16 |         },
17 |         "membership": {
18 |           "name": "membership",
19 |           "type": "membership",
20 |           "typeSchema": "public",
21 |           "primaryKey": false,
22 |           "notNull": true,
23 |           "default": "'free'"
24 |         },
25 |         "stripe_customer_id": {
26 |           "name": "stripe_customer_id",
27 |           "type": "text",
28 |           "primaryKey": false,
29 |           "notNull": false
30 |         },
31 |         "stripe_subscription_id": {
32 |           "name": "stripe_subscription_id",
33 |           "type": "text",
34 |           "primaryKey": false,
35 |           "notNull": false
36 |         },
37 |         "created_at": {
38 |           "name": "created_at",
39 |           "type": "timestamp",
40 |           "primaryKey": false,
41 |           "notNull": true,
42 |           "default": "now()"
43 |         },
44 |         "updated_at": {
45 |           "name": "updated_at",
46 |           "type": "timestamp",
47 |           "primaryKey": false,
48 |           "notNull": true,
49 |           "default": "now()"
50 |         }
51 |       },
52 |       "indexes": {},
53 |       "foreignKeys": {},
54 |       "compositePrimaryKeys": {},
55 |       "uniqueConstraints": {}
56 |     },
57 |     "public.todos": {
58 |       "name": "todos",
59 |       "schema": "",
60 |       "columns": {
61 |         "id": {
62 |           "name": "id",
63 |           "type": "uuid",
64 |           "primaryKey": true,
65 |           "notNull": true,
66 |           "default": "gen_random_uuid()"
67 |         },
68 |         "user_id": {
69 |           "name": "user_id",
70 |           "type": "text",
71 |           "primaryKey": false,
72 |           "notNull": true
73 |         },
74 |         "content": {
75 |           "name": "content",
76 |           "type": "text",
77 |           "primaryKey": false,
78 |           "notNull": true
79 |         },
80 |         "completed": {
81 |           "name": "completed",
82 |           "type": "boolean",
83 |           "primaryKey": false,
84 |           "notNull": true,
85 |           "default": false
86 |         },
87 |         "created_at": {
88 |           "name": "created_at",
89 |           "type": "timestamp",
90 |           "primaryKey": false,
91 |           "notNull": true,
92 |           "default": "now()"
93 |         },
94 |         "updated_at": {
95 |           "name": "updated_at",
96 |           "type": "timestamp",
97 |           "primaryKey": false,
98 |           "notNull": true,
99 |           "default": "now()"
100 |         }
101 |       },
102 |       "indexes": {},
103 |       "foreignKeys": {},
104 |       "compositePrimaryKeys": {},
105 |       "uniqueConstraints": {}
106 |     },
107 |     "public.users": {
108 |       "name": "users",
109 |       "schema": "",
110 |       "columns": {
111 |         "id": {
112 |           "name": "id",
113 |           "type": "text",
114 |           "primaryKey": true,
115 |           "notNull": true
116 |         },
117 |         "clerk_id": {
118 |           "name": "clerk_id",
119 |           "type": "text",
120 |           "primaryKey": false,
121 |           "notNull": true
122 |         },
123 |         "role": {
124 |           "name": "role",
125 |           "type": "user_role",
126 |           "typeSchema": "public",
127 |           "primaryKey": false,
128 |           "notNull": true,
129 |           "default": "'tenant'"
130 |         },
131 |         "email": {
132 |           "name": "email",
133 |           "type": "text",
134 |           "primaryKey": false,
135 |           "notNull": true
136 |         },
137 |         "full_name": {
138 |           "name": "full_name",
139 |           "type": "text",
140 |           "primaryKey": false,
141 |           "notNull": false
142 |         },
143 |         "created_at": {
144 |           "name": "created_at",
145 |           "type": "timestamp",
146 |           "primaryKey": false,
147 |           "notNull": true,
148 |           "default": "now()"
149 |         },
150 |         "updated_at": {
151 |           "name": "updated_at",
152 |           "type": "timestamp",
153 |           "primaryKey": false,
154 |           "notNull": true,
155 |           "default": "now()"
156 |         }
157 |       },
158 |       "indexes": {},
159 |       "foreignKeys": {},
160 |       "compositePrimaryKeys": {},
161 |       "uniqueConstraints": {
162 |         "users_clerk_id_unique": {
163 |           "name": "users_clerk_id_unique",
164 |           "nullsNotDistinct": false,
165 |           "columns": [
166 |             "clerk_id"
167 |           ]
168 |         }
169 |       }
170 |     },
171 |     "public.tickets": {
172 |       "name": "tickets",
173 |       "schema": "",
174 |       "columns": {
175 |         "id": {
176 |           "name": "id",
177 |           "type": "text",
178 |           "primaryKey": true,
179 |           "notNull": true
180 |         },
181 |         "tenant_id": {
182 |           "name": "tenant_id",
183 |           "type": "text",
184 |           "primaryKey": false,
185 |           "notNull": true
186 |         },
187 |         "title": {
188 |           "name": "title",
189 |           "type": "text",
190 |           "primaryKey": false,
191 |           "notNull": true
192 |         },
193 |         "description": {
194 |           "name": "description",
195 |           "type": "text",
196 |           "primaryKey": false,
197 |           "notNull": true
198 |         },
199 |         "status": {
200 |           "name": "status",
201 |           "type": "ticket_status",
202 |           "typeSchema": "public",
203 |           "primaryKey": false,
204 |           "notNull": true,
205 |           "default": "'open'"
206 |         },
207 |         "category": {
208 |           "name": "category",
209 |           "type": "ticket_category",
210 |           "typeSchema": "public",
211 |           "primaryKey": false,
212 |           "notNull": true
213 |         },
214 |         "priority": {
215 |           "name": "priority",
216 |           "type": "ticket_priority",
217 |           "typeSchema": "public",
218 |           "primaryKey": false,
219 |           "notNull": true,
220 |           "default": "'low'"
221 |         },
222 |         "cost_estimate": {
223 |           "name": "cost_estimate",
224 |           "type": "text",
225 |           "primaryKey": false,
226 |           "notNull": false
227 |         },
228 |         "time_estimate": {
229 |           "name": "time_estimate",
230 |           "type": "text",
231 |           "primaryKey": false,
232 |           "notNull": false
233 |         },
234 |         "emergency_level": {
235 |           "name": "emergency_level",
236 |           "type": "text",
237 |           "primaryKey": false,
238 |           "notNull": false
239 |         },
240 |         "user_tone": {
241 |           "name": "user_tone",
242 |           "type": "text",
243 |           "primaryKey": false,
244 |           "notNull": false
245 |         },
246 |         "chat_history": {
247 |           "name": "chat_history",
248 |           "type": "jsonb",
249 |           "primaryKey": false,
250 |           "notNull": false
251 |         },
252 |         "chat_summary": {
253 |           "name": "chat_summary",
254 |           "type": "text",
255 |           "primaryKey": false,
256 |           "notNull": false
257 |         },
258 |         "resolution_details": {
259 |           "name": "resolution_details",
260 |           "type": "text",
261 |           "primaryKey": false,
262 |           "notNull": false
263 |         },
264 |         "time_spent": {
265 |           "name": "time_spent",
266 |           "type": "text",
267 |           "primaryKey": false,
268 |           "notNull": false
269 |         },
270 |         "cost_incurred": {
271 |           "name": "cost_incurred",
272 |           "type": "text",
273 |           "primaryKey": false,
274 |           "notNull": false
275 |         },
276 |         "created_at": {
277 |           "name": "created_at",
278 |           "type": "timestamp",
279 |           "primaryKey": false,
280 |           "notNull": true,
281 |           "default": "now()"
282 |         },
283 |         "updated_at": {
284 |           "name": "updated_at",
285 |           "type": "timestamp",
286 |           "primaryKey": false,
287 |           "notNull": true,
288 |           "default": "now()"
289 |         },
290 |         "closed_at": {
291 |           "name": "closed_at",
292 |           "type": "timestamp",
293 |           "primaryKey": false,
294 |           "notNull": false
295 |         }
296 |       },
297 |       "indexes": {},
298 |       "foreignKeys": {
299 |         "tickets_tenant_id_users_id_fk": {
300 |           "name": "tickets_tenant_id_users_id_fk",
301 |           "tableFrom": "tickets",
302 |           "tableTo": "users",
303 |           "columnsFrom": [
304 |             "tenant_id"
305 |           ],
306 |           "columnsTo": [
307 |             "id"
308 |           ],
309 |           "onDelete": "cascade",
310 |           "onUpdate": "no action"
311 |         }
312 |       },
313 |       "compositePrimaryKeys": {},
314 |       "uniqueConstraints": {}
315 |     },
316 |     "public.ticket_messages": {
317 |       "name": "ticket_messages",
318 |       "schema": "",
319 |       "columns": {
320 |         "id": {
321 |           "name": "id",
322 |           "type": "text",
323 |           "primaryKey": true,
324 |           "notNull": true
325 |         },
326 |         "ticket_id": {
327 |           "name": "ticket_id",
328 |           "type": "text",
329 |           "primaryKey": false,
330 |           "notNull": true
331 |         },
332 |         "sender_id": {
333 |           "name": "sender_id",
334 |           "type": "text",
335 |           "primaryKey": false,
336 |           "notNull": true
337 |         },
338 |         "message": {
339 |           "name": "message",
340 |           "type": "text",
341 |           "primaryKey": false,
342 |           "notNull": true
343 |         },
344 |         "created_at": {
345 |           "name": "created_at",
346 |           "type": "timestamp",
347 |           "primaryKey": false,
348 |           "notNull": true,
349 |           "default": "now()"
350 |         },
351 |         "updated_at": {
352 |           "name": "updated_at",
353 |           "type": "timestamp",
354 |           "primaryKey": false,
355 |           "notNull": true,
356 |           "default": "now()"
357 |         }
358 |       },
359 |       "indexes": {},
360 |       "foreignKeys": {
361 |         "ticket_messages_ticket_id_tickets_id_fk": {
362 |           "name": "ticket_messages_ticket_id_tickets_id_fk",
363 |           "tableFrom": "ticket_messages",
364 |           "tableTo": "tickets",
365 |           "columnsFrom": [
366 |             "ticket_id"
367 |           ],
368 |           "columnsTo": [
369 |             "id"
370 |           ],
371 |           "onDelete": "cascade",
372 |           "onUpdate": "no action"
373 |         },
374 |         "ticket_messages_sender_id_users_id_fk": {
375 |           "name": "ticket_messages_sender_id_users_id_fk",
376 |           "tableFrom": "ticket_messages",
377 |           "tableTo": "users",
378 |           "columnsFrom": [
379 |             "sender_id"
380 |           ],
381 |           "columnsTo": [
382 |             "id"
383 |           ],
384 |           "onDelete": "cascade",
385 |           "onUpdate": "no action"
386 |         }
387 |       },
388 |       "compositePrimaryKeys": {},
389 |       "uniqueConstraints": {}
390 |     }
391 |   },
392 |   "enums": {
393 |     "public.membership": {
394 |       "name": "membership",
395 |       "schema": "public",
396 |       "values": [
397 |         "free",
398 |         "pro"
399 |       ]
400 |     },
401 |     "public.user_role": {
402 |       "name": "user_role",
403 |       "schema": "public",
404 |       "values": [
405 |         "tenant",
406 |         "staff"
407 |       ]
408 |     },
409 |     "public.ticket_category": {
410 |       "name": "ticket_category",
411 |       "schema": "public",
412 |       "values": [
413 |         "maintenance",
414 |         "billing",
415 |         "noise_complaint",
416 |         "other"
417 |       ]
418 |     },
419 |     "public.ticket_priority": {
420 |       "name": "ticket_priority",
421 |       "schema": "public",
422 |       "values": [
423 |         "low",
424 |         "medium",
425 |         "high",
426 |         "critical"
427 |       ]
428 |     },
429 |     "public.ticket_status": {
430 |       "name": "ticket_status",
431 |       "schema": "public",
432 |       "values": [
433 |         "open",
434 |         "in_progress",
435 |         "completed",
436 |         "closed",
437 |         "completed_by_chat"
438 |       ]
439 |     }
440 |   },
441 |   "schemas": {},
442 |   "sequences": {},
443 |   "_meta": {
444 |     "columns": {},
445 |     "schemas": {},
446 |     "tables": {}
447 |   }
448 | }
```

db/migrations/meta/_journal.json
```
1 | {
2 |   "version": "7",
3 |   "dialect": "postgresql",
4 |   "entries": [
5 |     {
6 |       "idx": 0,
7 |       "version": "7",
8 |       "when": 1725104620592,
9 |       "tag": "0000_nostalgic_mauler",
10 |       "breakpoints": true
11 |     },
12 |     {
13 |       "idx": 1,
14 |       "version": "7",
15 |       "when": 1737563197589,
16 |       "tag": "0001_lyrical_gambit",
17 |       "breakpoints": true
18 |     }
19 |   ]
20 | }
```

app/api/stripe/webhooks/route.ts
```
1 | /*
2 | <ai_context>
3 | This API route handles Stripe webhook events to manage subscription status changes and updates user profiles accordingly.
4 | </ai_context>
5 | */
6 | 
7 | import {
8 |   manageSubscriptionStatusChange,
9 |   updateStripeCustomer
10 | } from "@/actions/stripe-actions"
11 | import { stripe } from "@/lib/stripe"
12 | import { headers } from "next/headers"
13 | import Stripe from "stripe"
14 | 
15 | const relevantEvents = new Set([
16 |   "checkout.session.completed",
17 |   "customer.subscription.updated",
18 |   "customer.subscription.deleted"
19 | ])
20 | 
21 | export async function POST(req: Request) {
22 |   const body = await req.text()
23 |   const sig = (await headers()).get("Stripe-Signature") as string
24 |   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
25 |   let event: Stripe.Event
26 | 
27 |   try {
28 |     if (!sig || !webhookSecret) {
29 |       throw new Error("Webhook secret or signature missing")
30 |     }
31 | 
32 |     event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
33 |   } catch (err: any) {
34 |     console.error(`Webhook Error: ${err.message}`)
35 |     return new Response(`Webhook Error: ${err.message}`, { status: 400 })
36 |   }
37 | 
38 |   if (relevantEvents.has(event.type)) {
39 |     try {
40 |       switch (event.type) {
41 |         case "customer.subscription.updated":
42 |         case "customer.subscription.deleted":
43 |           await handleSubscriptionChange(event)
44 |           break
45 | 
46 |         case "checkout.session.completed":
47 |           await handleCheckoutSession(event)
48 |           break
49 | 
50 |         default:
51 |           throw new Error("Unhandled relevant event!")
52 |       }
53 |     } catch (error) {
54 |       console.error("Webhook handler failed:", error)
55 |       return new Response(
56 |         "Webhook handler failed. View your nextjs function logs.",
57 |         {
58 |           status: 400
59 |         }
60 |       )
61 |     }
62 |   }
63 | 
64 |   return new Response(JSON.stringify({ received: true }))
65 | }
66 | 
67 | async function handleSubscriptionChange(event: Stripe.Event) {
68 |   const subscription = event.data.object as Stripe.Subscription
69 |   const productId = subscription.items.data[0].price.product as string
70 |   await manageSubscriptionStatusChange(
71 |     subscription.id,
72 |     subscription.customer as string,
73 |     productId
74 |   )
75 | }
76 | 
77 | async function handleCheckoutSession(event: Stripe.Event) {
78 |   const checkoutSession = event.data.object as Stripe.Checkout.Session
79 |   if (checkoutSession.mode === "subscription") {
80 |     const subscriptionId = checkoutSession.subscription as string
81 |     await updateStripeCustomer(
82 |       checkoutSession.client_reference_id as string,
83 |       subscriptionId,
84 |       checkoutSession.customer as string
85 |     )
86 | 
87 |     const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
88 |       expand: ["default_payment_method"]
89 |     })
90 | 
91 |     const productId = subscription.items.data[0].price.product as string
92 |     await manageSubscriptionStatusChange(
93 |       subscription.id,
94 |       subscription.customer as string,
95 |       productId
96 |     )
97 |   }
98 | }
```

app/tenant/tickets/[ticketId]/page.tsx
```
1 | "use server" //d
2 | 
3 | import { getTicketByIdAction } from "@/actions/db/tickets-actions"
4 | import { getTicketMessagesAction } from "@/actions/db/ticket-messages-actions"
5 | import { TicketMessageThread } from "@/components/tickets/ticket-message-thread"
6 | import { Badge } from "@/components/ui/badge"
7 | import { Button } from "@/components/ui/button"
8 | import { auth } from "@clerk/nextjs/server"
9 | import { formatDistanceToNow } from "date-fns"
10 | import Link from "next/link"
11 | import { notFound } from "next/navigation"
12 | 
13 | type Props = {
14 |   params: { ticketId: string }
15 |   searchParams: { [key: string]: string | string[] | undefined }
16 | }
17 | 
18 | export default async function TicketPage({ params, searchParams }: Props) {
19 |   const { userId } = await auth()
20 | 
21 |   if (!userId) {
22 |     return <div>Please sign in to view this ticket.</div>
23 |   }
24 | 
25 |   const ticketResult = await getTicketByIdAction(params.ticketId, userId)
26 |   const messagesResult = await getTicketMessagesAction(params.ticketId)
27 | 
28 |   if (!ticketResult.isSuccess || !ticketResult.data) {
29 |     notFound()
30 |   }
31 | 
32 |   const ticket = ticketResult.data
33 | 
34 |   function getPriorityColor(priority: string) {
35 |     switch (priority) {
36 |       case "critical":
37 |         return "bg-red-500"
38 |       case "high":
39 |         return "bg-orange-500"
40 |       case "medium":
41 |         return "bg-yellow-500"
42 |       default:
43 |         return "bg-green-500"
44 |     }
45 |   }
46 | 
47 |   function getStatusColor(status: string) {
48 |     switch (status) {
49 |       case "open":
50 |         return "bg-blue-500"
51 |       case "in_progress":
52 |         return "bg-yellow-500"
53 |       case "completed":
54 |         return "bg-green-500"
55 |       case "completed_by_chat":
56 |         return "bg-purple-500"
57 |       case "closed":
58 |         return "bg-gray-500"
59 |       default:
60 |         return "bg-gray-500"
61 |     }
62 |   }
63 | 
64 |   return (
65 |     <div className="container space-y-8 py-8">
66 |       <div className="flex items-start justify-between">
67 |         <div>
68 |           <div className="mb-1 flex items-center gap-2">
69 |             <Link
70 |               href="/tenant/tickets"
71 |               className="text-muted-foreground text-sm hover:underline"
72 |             >
73 |               ← Back to maintenance requests
74 |             </Link>
75 |           </div>
76 |           <h1 className="text-3xl font-bold">{ticket.title}</h1>
77 |           <div className="mt-2 flex items-center gap-2">
78 |             <Badge
79 |               className={`${getPriorityColor(ticket.priority)} text-white`}
80 |             >
81 |               {ticket.priority}
82 |             </Badge>
83 |             <Badge className={`${getStatusColor(ticket.status)} text-white`}>
84 |               {ticket.status.replace(/_/g, " ")}
85 |             </Badge>
86 |             <span className="text-muted-foreground text-sm">
87 |               Opened{" "}
88 |               {formatDistanceToNow(new Date(ticket.createdAt), {
89 |                 addSuffix: true
90 |               })}
91 |             </span>
92 |           </div>
93 |         </div>
94 |       </div>
95 | 
96 |       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
97 |         <div className="space-y-6 md:col-span-2">
98 |           <div className="prose max-w-none">
99 |             <h3>Issue Description</h3>
100 |             <p>{ticket.description}</p>
101 |           </div>
102 | 
103 |           {ticket.resolutionDetails && (
104 |             <div className="prose max-w-none">
105 |               <h3>Resolution Details</h3>
106 |               <p>{ticket.resolutionDetails}</p>
107 |               {ticket.timeSpent && <p>Time to complete: {ticket.timeSpent}</p>}
108 |               {ticket.costIncurred && <p>Repair cost: {ticket.costIncurred}</p>}
109 |             </div>
110 |           )}
111 | 
112 |           <div>
113 |             <h3 className="mb-4 text-lg font-semibold">
114 |               Communication History
115 |             </h3>
116 |             <TicketMessageThread
117 |               ticketId={ticket.id}
118 |               messages={messagesResult.isSuccess ? messagesResult.data : []}
119 |               currentUserId={userId}
120 |             />
121 |           </div>
122 |         </div>
123 | 
124 |         <div>
125 |           <div className="bg-muted space-y-4 rounded-lg p-4">
126 |             <h3 className="font-semibold">Maintenance Details</h3>
127 |             <div>
128 |               <div className="text-muted-foreground text-sm">Type of Issue</div>
129 |               <div className="capitalize">
130 |                 {ticket.category.replace(/_/g, " ")}
131 |               </div>
132 |             </div>
133 |           </div>
134 |         </div>
135 |       </div>
136 |     </div>
137 |   )
138 | }
```

app/(auth)/login/[[...login]]/page.tsx
```
1 | /*
2 | <ai_context>
3 | This client page provides the login form from Clerk.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { SignIn } from "@clerk/nextjs"
10 | import { dark } from "@clerk/themes"
11 | import { useTheme } from "next-themes"
12 | 
13 | type Props = {
14 |   params: { login: string[] }
15 |   searchParams: { [key: string]: string | string[] | undefined }
16 | }
17 | 
18 | export default function LoginPage({ params, searchParams }: Props) {
19 |   const { theme } = useTheme()
20 | 
21 |   return (
22 |     <SignIn
23 |       afterSignInUrl="/auth/redirect"
24 |       appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
25 |     />
26 |   )
27 | }
```

app/(auth)/signup/[[...signup]]/page.tsx
```
1 | /*
2 | <ai_context>
3 | This client page provides the signup form from Clerk.
4 | </ai_context>
5 | */
6 | 
7 | "use client"
8 | 
9 | import { SignUp } from "@clerk/nextjs"
10 | import { dark } from "@clerk/themes"
11 | import { useTheme } from "next-themes"
12 | 
13 | type Props = {
14 |   params: { signup: string[] }
15 |   searchParams: { [key: string]: string | string[] | undefined }
16 | }
17 | 
18 | export default function SignUpPage({ params, searchParams }: Props) {
19 |   const { theme } = useTheme()
20 | 
21 |   return (
22 |     <SignUp
23 |       afterSignUpUrl="/auth/redirect"
24 |       appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
25 |     />
26 |   )
27 | }
```

app/tenant/tickets/new/page.tsx
```
1 | "use client"
2 | 
3 | import { TicketForm } from "@/components/tickets/ticket-form"
4 | import { useAuth } from "@clerk/nextjs"
5 | import { useRouter } from "next/navigation"
6 | import { useEffect } from "react"
7 | 
8 | export default function NewTicketPage() {
9 |   const { userId, isLoaded } = useAuth()
10 |   const router = useRouter()
11 | 
12 |   useEffect(() => {
13 |     if (isLoaded && !userId) {
14 |       router.push("/login")
15 |     }
16 |   }, [isLoaded, userId, router])
17 | 
18 |   if (!isLoaded || !userId) {
19 |     return null
20 |   }
21 | 
22 |   return (
23 |     <div className="container max-w-2xl space-y-6 py-8">
24 |       <div>
25 |         <h1 className="text-3xl font-bold">Submit Maintenance Request</h1>
26 |         <p className="text-muted-foreground">
27 |           Tell us about the issue and our AI will help prioritize and route your
28 |           request
29 |         </p>
30 |       </div>
31 | 
32 |       <TicketForm
33 |         tenantId={userId}
34 |         onSuccess={() => {
35 |           router.push("/tenant/tickets")
36 |         }}
37 |       />
38 |     </div>
39 |   )
40 | }
```

app/tenant/tickets/_components/button-wrapper.tsx
```
1 | "use client"
2 | 
3 | import { Button } from "@/components/ui/button"
4 | import Link from "next/link"
5 | 
6 | export function NewTicketButton() {
7 |   return (
8 |     <Button asChild>
9 |       <Link href="/tenant/tickets/new">New Ticket</Link>
10 |     </Button>
11 |   )
12 | }
```

app/tenant/tickets/_components/ticket-list-wrapper.tsx
```
1 | "use client"
2 | 
3 | import { TicketList } from "@/components/tickets/ticket-list"
4 | import { SelectTicket } from "@/db/schema"
5 | 
6 | interface TicketListWrapperProps {
7 |   tickets: SelectTicket[]
8 | }
9 | 
10 | export function TicketListWrapper({ tickets }: TicketListWrapperProps) {
11 |   return <TicketList tickets={tickets} baseUrl="/tenant/tickets" />
12 | }
```

app/staff/tickets/[ticketId]/page.tsx
```
1 | "use server"
2 | 
3 | import { getTicketByIdAction } from "@/actions/db/tickets-actions"
4 | import { getTicketMessagesAction } from "@/actions/db/ticket-messages-actions"
5 | import { TicketMessageThread } from "@/components/tickets/ticket-message-thread"
6 | import { TicketStatusUpdate } from "@/components/tickets/ticket-status-update"
7 | import { Badge } from "@/components/ui/badge"
8 | import { auth } from "@clerk/nextjs/server"
9 | import { formatDistanceToNow } from "date-fns"
10 | import Link from "next/link"
11 | import { notFound } from "next/navigation"
12 | 
13 | type Props = {
14 |   params: { ticketId: string }
15 |   searchParams: { [key: string]: string | string[] | undefined }
16 | }
17 | 
18 | export default async function StaffTicketPage({ params, searchParams }: Props) {
19 |   const { userId } = await auth()
20 | 
21 |   if (!userId) {
22 |     return <div>Please sign in to view this ticket.</div>
23 |   }
24 | 
25 |   const ticketResult = await getTicketByIdAction(params.ticketId)
26 |   const messagesResult = await getTicketMessagesAction(params.ticketId)
27 | 
28 |   if (!ticketResult.isSuccess || !ticketResult.data) {
29 |     notFound()
30 |   }
31 | 
32 |   const ticket = ticketResult.data
33 | 
34 |   function getPriorityColor(priority: string) {
35 |     switch (priority) {
36 |       case "critical":
37 |         return "bg-red-500"
38 |       case "high":
39 |         return "bg-orange-500"
40 |       case "medium":
41 |         return "bg-yellow-500"
42 |       default:
43 |         return "bg-green-500"
44 |     }
45 |   }
46 | 
47 |   function getStatusColor(status: string) {
48 |     switch (status) {
49 |       case "open":
50 |         return "bg-blue-500"
51 |       case "in_progress":
52 |         return "bg-yellow-500"
53 |       case "completed":
54 |         return "bg-green-500"
55 |       case "completed_by_chat":
56 |         return "bg-purple-500"
57 |       case "closed":
58 |         return "bg-gray-500"
59 |       default:
60 |         return "bg-gray-500"
61 |     }
62 |   }
63 | 
64 |   return (
65 |     <div className="container space-y-8 py-8">
66 |       <div className="flex items-start justify-between">
67 |         <div>
68 |           <div className="mb-1 flex items-center gap-2">
69 |             <Link
70 |               href="/staff/tickets"
71 |               className="text-muted-foreground text-sm hover:underline"
72 |             >
73 |               ← Back to maintenance dashboard
74 |             </Link>
75 |           </div>
76 |           <h1 className="text-3xl font-bold">{ticket.title}</h1>
77 |           <div className="mt-2 flex items-center gap-2">
78 |             <Badge
79 |               className={`${getPriorityColor(ticket.priority)} text-white`}
80 |             >
81 |               {ticket.priority}
82 |             </Badge>
83 |             <Badge className={`${getStatusColor(ticket.status)} text-white`}>
84 |               {ticket.status.replace(/_/g, " ")}
85 |             </Badge>
86 |             <span className="text-muted-foreground text-sm">
87 |               Opened{" "}
88 |               {formatDistanceToNow(new Date(ticket.createdAt), {
89 |                 addSuffix: true
90 |               })}
91 |             </span>
92 |           </div>
93 |         </div>
94 |       </div>
95 | 
96 |       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
97 |         <div className="space-y-6 md:col-span-2">
98 |           <div className="prose max-w-none">
99 |             <h3>Issue Description</h3>
100 |             <p>{ticket.description}</p>
101 |           </div>
102 | 
103 |           {ticket.resolutionDetails && (
104 |             <div className="prose max-w-none">
105 |               <h3>Resolution Details</h3>
106 |               <p>{ticket.resolutionDetails}</p>
107 |               {ticket.timeSpent && <p>Time to complete: {ticket.timeSpent}</p>}
108 |               {ticket.costIncurred && <p>Repair cost: {ticket.costIncurred}</p>}
109 |             </div>
110 |           )}
111 | 
112 |           <div>
113 |             <h3 className="mb-4 text-lg font-semibold">
114 |               Communication History
115 |             </h3>
116 |             <TicketMessageThread
117 |               ticketId={ticket.id}
118 |               messages={messagesResult.isSuccess ? messagesResult.data : []}
119 |               currentUserId={userId}
120 |             />
121 |           </div>
122 |         </div>
123 | 
124 |         <div className="space-y-6">
125 |           <div className="bg-muted space-y-4 rounded-lg p-4">
126 |             <h3 className="font-semibold">Maintenance Details</h3>
127 |             <div>
128 |               <div className="text-muted-foreground text-sm">Type of Issue</div>
129 |               <div className="capitalize">
130 |                 {ticket.category.replace(/_/g, " ")}
131 |               </div>
132 |             </div>
133 |           </div>
134 | 
135 |           <div className="bg-muted space-y-4 rounded-lg p-4">
136 |             <h3 className="font-semibold">Update Maintenance Status</h3>
137 |             <TicketStatusUpdate ticket={ticket} />
138 |           </div>
139 |         </div>
140 |       </div>
141 |     </div>
142 |   )
143 | }
```

app/dashboard/orgs/[orgId]/invite/page.tsx
```
1 | "use server"
2 | 
3 | import { getOrganizationAction } from "@/actions/db/organizations-actions"
4 | import { getInvitesAction } from "@/actions/db/invites-actions"
5 | import { InviteForm } from "./_components/invite-form"
6 | import { InvitesList } from "./_components/invites-list"
7 | import { Suspense } from "react"
8 | 
9 | interface InvitePageProps {
10 |   params: {
11 |     orgId: string
12 |   }
13 | }
14 | 
15 | export default async function InvitePage({ params }: InvitePageProps) {
16 |   const { data: organization } = await getOrganizationAction(params.orgId)
17 | 
18 |   if (!organization) {
19 |     return <div>Organization not found</div>
20 |   }
21 | 
22 |   return (
23 |     <div className="container mx-auto py-6 space-y-8">
24 |       <div>
25 |         <h1 className="text-2xl font-bold">
26 |           Invites - {organization.name}
27 |         </h1>
28 |         <p className="text-muted-foreground">
29 |           Invite users to join your organization
30 |         </p>
31 |       </div>
32 | 
33 |       <div className="grid gap-6 md:grid-cols-2">
34 |         <div>
35 |           <InviteForm orgId={params.orgId} />
36 |         </div>
37 | 
38 |         <div>
39 |           <Suspense fallback={<div>Loading invites...</div>}>
40 |             <InvitesListWrapper orgId={params.orgId} />
41 |           </Suspense>
42 |         </div>
43 |       </div>
44 |     </div>
45 |   )
46 | }
47 | 
48 | async function InvitesListWrapper({ orgId }: { orgId: string }) {
49 |   const { data: invites = [] } = await getInvitesAction(orgId)
50 |   return <InvitesList invites={invites} orgId={orgId} />
51 | } 
```

app/dashboard/orgs/[orgId]/properties/page.tsx
```
1 | "use server"
2 | 
3 | import { getOrganizationAction } from "@/actions/db/organizations-actions"
4 | import { getPropertiesForOrgAction } from "@/actions/db/properties-actions"
5 | import { PropertiesList } from "./_components/properties-list"
6 | import { PropertyForm } from "./_components/property-form"
7 | import { Suspense } from "react"
8 | 
9 | interface PropertiesPageProps {
10 |   params: {
11 |     orgId: string
12 |   }
13 | }
14 | 
15 | async function PropertiesListFetcher({ orgId }: { orgId: string }) {
16 |   const { data: properties = [] } = await getPropertiesForOrgAction(orgId)
17 |   return <PropertiesList properties={properties} orgId={orgId} />
18 | }
19 | 
20 | export default async function PropertiesPage({ params }: PropertiesPageProps) {
21 |   const { data: organization } = await getOrganizationAction(params.orgId)
22 | 
23 |   if (!organization) {
24 |     return <div>Organization not found</div>
25 |   }
26 | 
27 |   return (
28 |     <div className="container mx-auto py-6 space-y-8">
29 |       <div>
30 |         <h1 className="text-2xl font-bold">
31 |           Properties - {organization.name}
32 |         </h1>
33 |         <p className="text-muted-foreground">
34 |           Manage properties for this organization
35 |         </p>
36 |       </div>
37 | 
38 |       <div className="grid gap-6 md:grid-cols-2">
39 |         <div>
40 |           <PropertyForm orgId={params.orgId} />
41 |         </div>
42 | 
43 |         <div>
44 |           <Suspense fallback={<div>Loading properties...</div>}>
45 |             <PropertiesListFetcher orgId={params.orgId} />
46 |           </Suspense>
47 |         </div>
48 |       </div>
49 |     </div>
50 |   )
51 | } 
```

app/dashboard/orgs/[orgId]/properties/_components/properties-list.tsx
```
1 | "use client"
2 | 
3 | import { assignUserToAllPropertiesAction } from "@/actions/db/user-roles-actions"
4 | import { Button } from "@/components/ui/button"
5 | import {
6 |   Table,
7 |   TableBody,
8 |   TableCell,
9 |   TableHead,
10 |   TableHeader,
11 |   TableRow
12 | } from "@/components/ui/table"
13 | import { Property } from "@/types"
14 | import { useRouter } from "next/navigation"
15 | import { useState } from "react"
16 | import { toast } from "sonner"
17 | 
18 | interface PropertiesListProps {
19 |   properties: Property[]
20 |   orgId: string
21 | }
22 | 
23 | export function PropertiesList({ properties, orgId }: PropertiesListProps) {
24 |   const router = useRouter()
25 |   const [isAssigning, setIsAssigning] = useState(false)
26 | 
27 |   async function onAssignToAll(userId: string) {
28 |     try {
29 |       setIsAssigning(true)
30 | 
31 |       const result = await assignUserToAllPropertiesAction({
32 |         userId,
33 |         orgId,
34 |         role: "EMPLOYEE"
35 |       })
36 | 
37 |       if (!result.isSuccess) {
38 |         toast.error(result.message)
39 |         return
40 |       }
41 | 
42 |       toast.success(result.message)
43 |       router.refresh()
44 |     } catch (error) {
45 |       toast.error("Something went wrong")
46 |     } finally {
47 |       setIsAssigning(false)
48 |     }
49 |   }
50 | 
51 |   if (!properties?.length) {
52 |     return (
53 |       <div className="text-center p-4 rounded-lg border">
54 |         <p className="text-muted-foreground">No properties found</p>
55 |       </div>
56 |     )
57 |   }
58 | 
59 |   return (
60 |     <div className="rounded-lg border">
61 |       <Table>
62 |         <TableHeader>
63 |           <TableRow>
64 |             <TableHead>Name</TableHead>
65 |             <TableHead>Created</TableHead>
66 |             <TableHead>Actions</TableHead>
67 |           </TableRow>
68 |         </TableHeader>
69 |         <TableBody>
70 |           {properties.map((property) => (
71 |             <TableRow key={property.id}>
72 |               <TableCell>{property.name}</TableCell>
73 |               <TableCell>
74 |                 {new Date(property.createdAt).toLocaleDateString()}
75 |               </TableCell>
76 |               <TableCell>
77 |                 <Button
78 |                   variant="outline"
79 |                   size="sm"
80 |                   disabled={isAssigning}
81 |                   onClick={() => onAssignToAll(property.id)}
82 |                 >
83 |                   {isAssigning ? "Assigning..." : "Assign All Staff"}
84 |                 </Button>
85 |               </TableCell>
86 |             </TableRow>
87 |           ))}
88 |         </TableBody>
89 |       </Table>
90 |     </div>
91 |   )
92 | } 
```

app/dashboard/orgs/[orgId]/properties/_components/property-form.tsx
```
1 | "use client"
2 | 
3 | import { createPropertyAction } from "@/actions/db/properties-actions"
4 | import { Button } from "@/components/ui/button"
5 | import {
6 |   Form,
7 |   FormControl,
8 |   FormField,
9 |   FormItem,
10 |   FormLabel,
11 |   FormMessage
12 | } from "@/components/ui/form"
13 | import { Input } from "@/components/ui/input"
14 | import { CreatePropertyInput } from "@/types"
15 | import { zodResolver } from "@hookform/resolvers/zod"
16 | import { useRouter } from "next/navigation"
17 | import { useState } from "react"
18 | import { useForm } from "react-hook-form"
19 | import { toast } from "sonner"
20 | import { z } from "zod"
21 | 
22 | const formSchema = z.object({
23 |   name: z.string().min(1, "Name is required")
24 | })
25 | 
26 | type FormData = z.infer<typeof formSchema>
27 | 
28 | interface PropertyFormProps {
29 |   orgId: string
30 | }
31 | 
32 | export function PropertyForm({ orgId }: PropertyFormProps) {
33 |   const router = useRouter()
34 |   const [isLoading, setIsLoading] = useState(false)
35 | 
36 |   const form = useForm<FormData>({
37 |     resolver: zodResolver(formSchema),
38 |     defaultValues: {
39 |       name: ""
40 |     }
41 |   })
42 | 
43 |   async function onSubmit(data: FormData) {
44 |     try {
45 |       setIsLoading(true)
46 | 
47 |       const input: CreatePropertyInput = {
48 |         orgId,
49 |         name: data.name
50 |       }
51 | 
52 |       const result = await createPropertyAction(input)
53 | 
54 |       if (!result.isSuccess) {
55 |         toast.error(result.message)
56 |         return
57 |       }
58 | 
59 |       toast.success(result.message)
60 |       form.reset()
61 |       router.refresh()
62 |     } catch (error) {
63 |       toast.error("Something went wrong")
64 |     } finally {
65 |       setIsLoading(false)
66 |     }
67 |   }
68 | 
69 |   return (
70 |     <div className="rounded-lg border p-4">
71 |       <h2 className="font-semibold mb-4">Add New Property</h2>
72 |       <Form {...form}>
73 |         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
74 |           <FormField
75 |             control={form.control}
76 |             name="name"
77 |             render={({ field }) => (
78 |               <FormItem>
79 |                 <FormLabel>Property Name</FormLabel>
80 |                 <FormControl>
81 |                   <Input
82 |                     {...field}
83 |                     disabled={isLoading}
84 |                     placeholder="Enter property name"
85 |                   />
86 |                 </FormControl>
87 |                 <FormMessage />
88 |               </FormItem>
89 |             )}
90 |           />
91 | 
92 |           <Button type="submit" disabled={isLoading}>
93 |             {isLoading ? "Adding..." : "Add Property"}
94 |           </Button>
95 |         </form>
96 |       </Form>
97 |     </div>
98 |   )
99 | } 
```

app/dashboard/orgs/[orgId]/invite/_components/invite-form.tsx
```
1 | "use client"
2 | 
3 | import { createInviteAction } from "@/actions/db/invites-actions"
4 | import { Button } from "@/components/ui/button"
5 | import {
6 |   Form,
7 |   FormControl,
8 |   FormField,
9 |   FormItem,
10 |   FormLabel,
11 |   FormMessage
12 | } from "@/components/ui/form"
13 | import { Input } from "@/components/ui/input"
14 | import {
15 |   Select,
16 |   SelectContent,
17 |   SelectItem,
18 |   SelectTrigger,
19 |   SelectValue
20 | } from "@/components/ui/select"
21 | import { CreateInviteInput, OrgRole } from "@/types"
22 | import { zodResolver } from "@hookform/resolvers/zod"
23 | import { useRouter } from "next/navigation"
24 | import { useState } from "react"
25 | import { useForm } from "react-hook-form"
26 | import { toast } from "sonner"
27 | import { z } from "zod"
28 | 
29 | const formSchema = z.object({
30 |   email: z.string().email("Invalid email address"),
31 |   role: z.enum(["ADMIN", "EMPLOYEE", "MAINTENANCE", "TENANT"] as const),
32 |   propertyId: z.string().optional()
33 | })
34 | 
35 | type FormData = z.infer<typeof formSchema>
36 | 
37 | interface InviteFormProps {
38 |   orgId: string
39 | }
40 | 
41 | export function InviteForm({ orgId }: InviteFormProps) {
42 |   const router = useRouter()
43 |   const [isLoading, setIsLoading] = useState(false)
44 | 
45 |   const form = useForm<FormData>({
46 |     resolver: zodResolver(formSchema),
47 |     defaultValues: {
48 |       email: "",
49 |       role: "EMPLOYEE"
50 |     }
51 |   })
52 | 
53 |   async function onSubmit(data: FormData) {
54 |     try {
55 |       setIsLoading(true)
56 | 
57 |       const input: CreateInviteInput = {
58 |         email: data.email,
59 |         orgId,
60 |         propertyId: data.propertyId,
61 |         role: data.role as OrgRole
62 |       }
63 | 
64 |       const result = await createInviteAction(input)
65 | 
66 |       if (!result.isSuccess) {
67 |         toast.error(result.message)
68 |         return
69 |       }
70 | 
71 |       toast.success(result.message)
72 |       form.reset()
73 |       router.refresh()
74 |     } catch (error) {
75 |       toast.error("Something went wrong")
76 |     } finally {
77 |       setIsLoading(false)
78 |     }
79 |   }
80 | 
81 |   return (
82 |     <div className="rounded-lg border p-4">
83 |       <h2 className="font-semibold mb-4">Invite User</h2>
84 |       <Form {...form}>
85 |         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
86 |           <FormField
87 |             control={form.control}
88 |             name="email"
89 |             render={({ field }) => (
90 |               <FormItem>
91 |                 <FormLabel>Email</FormLabel>
92 |                 <FormControl>
93 |                   <Input
94 |                     {...field}
95 |                     type="email"
96 |                     disabled={isLoading}
97 |                     placeholder="Enter email address"
98 |                   />
99 |                 </FormControl>
100 |                 <FormMessage />
101 |               </FormItem>
102 |             )}
103 |           />
104 | 
105 |           <FormField
106 |             control={form.control}
107 |             name="role"
108 |             render={({ field }) => (
109 |               <FormItem>
110 |                 <FormLabel>Role</FormLabel>
111 |                 <Select
112 |                   disabled={isLoading}
113 |                   onValueChange={field.onChange}
114 |                   defaultValue={field.value}
115 |                 >
116 |                   <FormControl>
117 |                     <SelectTrigger>
118 |                       <SelectValue placeholder="Select a role" />
119 |                     </SelectTrigger>
120 |                   </FormControl>
121 |                   <SelectContent>
122 |                     <SelectItem value="ADMIN">Admin</SelectItem>
123 |                     <SelectItem value="EMPLOYEE">Employee</SelectItem>
124 |                     <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
125 |                     <SelectItem value="TENANT">Tenant</SelectItem>
126 |                   </SelectContent>
127 |                 </Select>
128 |                 <FormMessage />
129 |               </FormItem>
130 |             )}
131 |           />
132 | 
133 |           <Button type="submit" disabled={isLoading}>
134 |             {isLoading ? "Sending..." : "Send Invite"}
135 |           </Button>
136 |         </form>
137 |       </Form>
138 |     </div>
139 |   )
140 | } 
```

app/dashboard/orgs/[orgId]/invite/_components/invites-list.tsx
```
1 | "use client"
2 | 
3 | import { cancelInviteAction } from "@/actions/db/invites-actions"
4 | import { Button } from "@/components/ui/button"
5 | import {
6 |   Table,
7 |   TableBody,
8 |   TableCell,
9 |   TableHead,
10 |   TableHeader,
11 |   TableRow
12 | } from "@/components/ui/table"
13 | import { Invite } from "@/types"
14 | import { useRouter } from "next/navigation"
15 | import { useState } from "react"
16 | import { toast } from "sonner"
17 | 
18 | interface InvitesListProps {
19 |   invites: Invite[]
20 |   orgId: string
21 | }
22 | 
23 | export function InvitesList({ invites, orgId }: InvitesListProps) {
24 |   const router = useRouter()
25 |   const [cancelingId, setCancelingId] = useState<string | null>(null)
26 | 
27 |   async function onCancel(id: string) {
28 |     try {
29 |       setCancelingId(id)
30 | 
31 |       const result = await cancelInviteAction(id)
32 | 
33 |       if (!result.isSuccess) {
34 |         toast.error(result.message)
35 |         return
36 |       }
37 | 
38 |       toast.success(result.message)
39 |       router.refresh()
40 |     } catch (error) {
41 |       toast.error("Something went wrong")
42 |     } finally {
43 |       setCancelingId(null)
44 |     }
45 |   }
46 | 
47 |   if (!invites?.length) {
48 |     return (
49 |       <div className="text-center p-4 rounded-lg border">
50 |         <p className="text-muted-foreground">No pending invites</p>
51 |       </div>
52 |     )
53 |   }
54 | 
55 |   return (
56 |     <div className="rounded-lg border">
57 |       <Table>
58 |         <TableHeader>
59 |           <TableRow>
60 |             <TableHead>Email</TableHead>
61 |             <TableHead>Role</TableHead>
62 |             <TableHead>Status</TableHead>
63 |             <TableHead>Actions</TableHead>
64 |           </TableRow>
65 |         </TableHeader>
66 |         <TableBody>
67 |           {invites.map((invite) => (
68 |             <TableRow key={invite.id}>
69 |               <TableCell>{invite.email}</TableCell>
70 |               <TableCell>{invite.role}</TableCell>
71 |               <TableCell>{invite.status}</TableCell>
72 |               <TableCell>
73 |                 {invite.status === "PENDING" && (
74 |                   <Button
75 |                     variant="destructive"
76 |                     size="sm"
77 |                     disabled={cancelingId === invite.id}
78 |                     onClick={() => onCancel(invite.id)}
79 |                   >
80 |                     {cancelingId === invite.id ? "Canceling..." : "Cancel"}
81 |                   </Button>
82 |                 )}
83 |               </TableCell>
84 |             </TableRow>
85 |           ))}
86 |         </TableBody>
87 |       </Table>
88 |     </div>
89 |   )
90 | } 
```
