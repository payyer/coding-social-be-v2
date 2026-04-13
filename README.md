# Coding Social — Backend

A production-style RESTful + real-time backend for a social network aimed at the developer community. Users can register, verify email, manage profiles, publish posts with images/videos, react and comment (nested), manage friendships, chat in real time, and post job listings with CV support.

Built end-to-end with **Node.js, Express, MongoDB (Atlas), Socket.IO, JWT, and Cloudinary**.

---

## Table of Contents

1. [Highlights](#highlights)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Database Design](#database-design)
5. [Feature Modules](#feature-modules)
6. [API Overview](#api-overview)
7. [Authentication Flow](#authentication-flow)
8. [Real-Time Chat](#real-time-chat)
9. [Project Structure](#project-structure)
10. [Getting Started](#getting-started)
11. [Environment Variables](#environment-variables)
12. [Roadmap](#roadmap)

---

## Highlights

- **9 feature modules** covering the full social-network lifecycle: auth, users, friends, posts, comments, likes, chat rooms, messages, and jobs.
- **Dual-token JWT authentication** (access + refresh) with server-side refresh-token rotation stored in a dedicated `TokensStore` collection.
- **Email verification flow** with one-time codes delivered via Nodemailer (Gmail SMTP).
- **Cloud media pipeline**: Multer handles multipart uploads → Cloudinary stores images, videos, avatars, cover photos and CV files; only `public_id` / `secure_url` are persisted in MongoDB.
- **Real-time messaging** powered by Socket.IO — join/leave rooms, broadcast messages, multi-room support.
- **Nested comment system** (parent / children references) enabling threaded discussions.
- **MVC + Service layer** separation: clean controllers, reusable services, dedicated auth middleware, and centralized response helpers.
- **Swagger/OpenAPI** scaffolding in place for interactive API documentation.
- **Diacritic-insensitive user search** via a derived `user_name_no_tones` indexed field — optimized for Vietnamese names.

---

## Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| Runtime          | Node.js                                             |
| Framework        | Express 4                                           |
| Database         | MongoDB Atlas + Mongoose 8 (ODM)                    |
| Auth             | JSON Web Tokens (jsonwebtoken) + bcrypt + cookies   |
| Real-time        | Socket.IO 4                                         |
| File Upload      | Multer + Cloudinary SDK                             |
| Email            | Nodemailer (SMTP)                                   |
| Docs             | swagger-jsdoc + swagger-ui-express                  |
| Dev Tooling      | Nodemon, CORS, cookie-parser                        |

---

## System Architecture

```
┌──────────────┐   HTTPS / WS   ┌─────────────────────────┐
│   Frontend   │ ─────────────▶ │   Express + Socket.IO   │
│  (React SPA) │ ◀───────────── │        (Node.js)        │
└──────────────┘                └───────────┬─────────────┘
                                            │
                          ┌─────────────────┼──────────────────┐
                          ▼                 ▼                  ▼
                  ┌──────────────┐  ┌──────────────┐   ┌───────────────┐
                  │ MongoDB Atlas│  │  Cloudinary  │   │ Gmail / SMTP  │
                  │  (Mongoose)  │  │ (media CDN)  │   │   (verify)    │
                  └──────────────┘  └──────────────┘   └───────────────┘
```

- **HTTP layer** handles all CRUD + auth at `/api/v2/*`.
- **WebSocket layer** handles chat events (`joinRoom`, `sendMessage`, `leaveRoom`) on the same port.
- **Middleware stack**: `cors` (credential-aware) → `express.json` → `urlencoded` → `cookieParser` → `checkAuth` (per protected route).

---

## Database Design

The database was designed up-front as an entity-relationship diagram before any code was written, then translated into Mongoose schemas.

<img width="910" height="425" alt="coding_social" src="https://github.com/user-attachments/assets/511499e9-b086-4676-b442-e5922a133ddf" />


**Collections** (`Users`, `Posts`, `Comments`, `LikePosts`, `FriendRequests`, `ChatRooms`, `Messages`, `Jobs`, `TokensStore`):

- `Users` — profile, avatar, cover, background, bio, CV, birthday, country, friend list, per-field privacy toggles (`user_display_settings`), verification flag.
- `Posts` — author, media array (Cloudinary refs), content, counters, post type, and share references (repost chain).
- `Comments` — message, author, post, `parent_id` + `children[]` for threading.
- `LikePosts` — explicit join collection for user ↔ post reactions.
- `FriendRequests` — pending sender/receiver pairs; accepted requests mutate both users' `user_list_friend`.
- `ChatRooms` / `Messages` — N-member rooms and their message history.
- `Jobs` — recruiter posts with title, description, deadline, avatar.
- `TokensStore` — per-user refresh token + historical token list for rotation.

---

## Feature Modules

### Authentication & Account
- Register with email/name/password (bcrypt-hashed, 10 salt rounds)
- Email verification via 6-character code sent through Nodemailer
- Login issuing access (10s) + refresh (2d) tokens in httpOnly cookies
- Refresh-token endpoint for seamless session renewal
- Password reset via email code
- Logout clearing server-side token store

### User Profile
- View / update profile info, avatar, cover image, background
- Per-field display privacy (email, bio, CV, birthday, country, friend list)
- Diacritic-insensitive search (`user_name_no_tones`)
- Media browsing endpoints: all images / all videos posted by a user

### Social Graph
- Send, accept, reject, and delete friend requests
- Unfriend with bilateral list cleanup
- Paginated friend list

### Posts & Engagement
- Create posts with multi-file upload (images + videos, type-detected)
- Timeline feed, per-user post list
- Like / unlike (counter + explicit `LikePosts` doc)
- Share / repost chain via `post_share_id`
- Delete post + cascade media removal from Cloudinary

### Comments
- Create top-level and reply comments (nested threading)
- Fetch full comment tree for a post
- Delete comment

### Real-Time Chat
- Create / find 1-to-1 chat rooms
- List all rooms for a user
- Persist messages in MongoDB
- Live delivery via Socket.IO rooms

### Jobs
- Post a job with an uploaded logo/media
- List all jobs, fetch detail, list jobs of the current user

---

## API Overview

Base URL: `http://localhost:8000/api/v2`

| Module         | Prefix             | Representative Endpoints                                       |
| -------------- | ------------------ | -------------------------------------------------------------- |
| Auth           | `/user`            | `POST /register`, `POST /login`, `POST /logout`, `PUT /verify`, `GET /token`, `POST /sendVerifyCode`, `PUT /resetPassword` |
| User           | `/user`            | `GET /search`, `GET /userInfo/:userId`, `PUT /updateuserInfo`, `PUT /updateUserAvatar`, `PUT /updateUserCoverImage`, `GET /getFriendList`, `GET /image`, `GET /video` |
| Friend Request | `/friendRequest`   | `GET /`, `POST /sendFriendRequest`, `DELETE /`                |
| Post           | `/post`            | `GET /`, `GET /userPost/:userId`, `POST /`, `PUT /likePost`, `PUT /unLikePost`, `DELETE /deletePost` |
| Comment        | `/comment`         | `POST /`, `GET /:post_id`, `DELETE /`                         |
| Chat Room      | `/chat`            | `GET /`, `POST /`, `GET /getAllChatRoomOfUser`                |
| Message        | `/message`         | `GET /:chatRoomId`, `POST /`                                  |
| Job            | `/job`             | `POST /`, `GET /`, `GET /detail/:jobId`, `GET /jobOfUser`     |

All routes except auth and `/user/verify` require a valid `accessToken` cookie.

---

## Authentication Flow

```
┌────────┐                       ┌───────────┐                ┌─────────────┐
│ Client │                       │  Express  │                │   MongoDB   │
└───┬────┘                       └─────┬─────┘                └──────┬──────┘
    │  POST /register                  │                             │
    │ ───────────────────────────────▶ │  hash password              │
    │                                  │  create user + verify code  │
    │                                  │ ──────────────────────────▶ │
    │                                  │  send code via Nodemailer   │
    │ ◀─────────────────────────────── │                             │
    │  PUT /verify (code)              │                             │
    │ ───────────────────────────────▶ │  flip user_verify = true    │
    │  POST /login                     │                             │
    │ ───────────────────────────────▶ │  bcrypt.compare             │
    │                                  │  sign access + refresh      │
    │                                  │  store refresh in Tokens    │
    │ ◀── Set-Cookie: accessToken ──── │                             │
    │ ◀── Set-Cookie: refreshToken ─── │                             │
    │                                  │                             │
    │  [accessToken expired]           │                             │
    │  GET /user/token                 │                             │
    │ ───────────────────────────────▶ │  verify refresh + rotate    │
    │ ◀── new accessToken cookie ───── │                             │
```

---

## Real-Time Chat

Socket.IO is mounted on the same HTTP server. Events:

| Event           | Direction        | Payload                                   |
| --------------- | ---------------- | ----------------------------------------- |
| `connection`    | Server ← Client  | automatic on handshake                    |
| `joinRoom`      | Client → Server  | `{ userId, chatRoomId }`                  |
| `sendMessage`   | Client → Server  | `{ userId, chatRoomId, text }`            |
| `receiveMessage`| Server → Room    | `{ _id, senderId, chatRoomId, text }`     |
| `leaveRoom`     | Client → Server  | `{ userId, chatRoomId }`                  |

Message history is persisted via the REST `POST /message` endpoint, so live and persisted state stay consistent.

---

## Project Structure

```
coding-social-be-v2/
├── index.js                     # Express + Socket.IO bootstrap
├── package.json
└── src/
    ├── db.js                    # MongoDB Atlas connection
    ├── swagger.js               # OpenAPI spec loader
    ├── auth/
    │   └── authentication.js    # JWT sign + checkAuth middleware
    ├── routes/
    │   ├── index.js             # /api/v2 aggregator
    │   ├── access/              # register / login / verify / token / reset
    │   ├── user/                # profile, search, friends, media
    │   ├── post/                # posts + likes
    │   ├── comment/             # nested comments
    │   ├── chatRoom/            # rooms
    │   ├── message/             # messages
    │   ├── friendRequest/       # friend request lifecycle
    │   └── job/                 # job postings
    ├── controller/              # HTTP handlers
    ├── service/                 # Business logic (access, user)
    ├── model/                   # Mongoose schemas (9 collections)
    └── utils/
        ├── cloudinary.js        # Upload helpers
        ├── createVerifyCode.js  # Verify code + diacritic stripping
        ├── ErrorRespone.js
        └── SuccessRespone.js
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas cluster (or local MongoDB)
- Cloudinary account
- Gmail account with app-password enabled (for email verification)

### Install & Run

```bash
git clone <repo-url>
cd coding-social-be-v2
npm install
npm run dev
```

Server starts on **http://localhost:8000**. The default CORS origin is **http://localhost:5173** (Vite dev server) and cookies are set with `credentials: true`.

---

## Environment Variables

Create a `.env` file (or externalize the current hard-coded values in `src/db.js`, `src/auth/authentication.js`, and `src/utils/cloudinary.js`):

```env
PORT=8000
CLIENT_ORIGIN=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/CodingSocial

# JWT
ACCESS_TOKEN_SECRET=<random-string>
REFRESH_TOKEN_SECRET=<random-string>
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=2d

# Cloudinary
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>

# Nodemailer (Gmail)
SMTP_USER=<gmail-address>
SMTP_PASS=<app-password>
```

---

## Roadmap

- [ ] Move hard-coded secrets (DB URI, JWT keys, Cloudinary credentials) into `.env`
- [ ] Extend access-token TTL to a realistic value (e.g. 15 minutes)
- [ ] Input validation layer (Joi / Zod) + centralized error middleware
- [ ] Role-based access control (`ADMIN` / `USER`)
- [ ] Notifications module (new like / comment / friend request)
- [ ] Unit + integration tests (Jest + Supertest)
- [ ] Dockerfile + docker-compose (API + Mongo) for one-command startup
- [ ] CI pipeline (GitHub Actions) running lint + tests on PR

---

**Author:** Le Quoc Anh · Full-stack developer focused on Node.js & React.
