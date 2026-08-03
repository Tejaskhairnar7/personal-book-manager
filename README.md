# 📚 Personal Book Manager

A premium, full-stack personal book manager built with Next.js 15. Track your reading journey with a beautiful, modern interface featuring glassmorphism, smooth animations, and responsive design.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)

---

## ✨ Features

### Authentication
- Register / Login / Logout
- JWT stored in HTTP-only cookies for security
- Passwords hashed with bcrypt
- Protected routes & API endpoints

### Book Management
- Full CRUD operations (Create, Read, Update, Delete)
- Rich book model: title, author, description, cover image, tags, reading status, progress, favorites
- Reading statuses: **Want To Read**, **Reading**, **Completed**
- Reading progress tracking (0–100%)

### Dashboard
- Personalized welcome message
- Stats cards (total, want to read, reading, completed)
- Interactive pie chart (status distribution) with Recharts
- Monthly activity bar chart
- Recent books list
- Top tags section
- Completion rate progress bar
- Favorites counter

### Filters & Search
- Debounced search by title or author
- Filter by reading status
- Sort by newest, oldest, or alphabetically
- Grid/List view toggle
- Pagination

### UI/UX
- Glassmorphism cards
- Framer Motion page & component animations
- Loading skeletons
- Empty states
- 404 & error pages
- Confirmation dialogs
- Toast notifications
- Responsive for desktop, tablet, and mobile
- Dark / Light / System theme support
- Premium typography (Inter + Plus Jakarta Sans)

### Bonus
- Book cover placeholder
- Favorite books toggle
- Profile page with editable bio
- Tag-based organization
- Optimistic UI patterns

---

## 🛠 Tech Stack

| Layer       | Technology                      |
|-------------|---------------------------------|
| Frontend    | Next.js 15 (App Router), JSX   |
| Styling     | Tailwind CSS 3.4               |
| Animations  | Framer Motion                   |
| Charts      | Recharts                        |
| Icons       | Lucide React                    |
| HTTP Client  | Axios                           |
| Notifications | React Hot Toast              |
| Backend     | Next.js API Routes              |
| Database    | MongoDB Atlas + Mongoose        |
| Auth        | JWT + bcryptjs                  |
| Validation  | Server-side validation          |
| Deployment  | Vercel-ready                    |

---

## 📁 Folder Structure

```
book-manager/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── logout/route.js
│   │   │   ├── me/route.js
│   │   │   ├── profile/route.js
│   │   │   └── register/route.js
│   │   └── books/
│   │       ├── [id]/route.js
│   │       └── route.js
│   ├── books/
│   │   ├── [id]/
│   │   │   ├── edit/page.jsx
│   │   │   └── page.jsx
│   │   ├── new/page.jsx
│   │   └── page.jsx
│   ├── dashboard/page.jsx
│   ├── login/page.jsx
│   ├── profile/page.jsx
│   ├── register/page.jsx
│   ├── error.js
│   ├── globals.css
│   ├── layout.js
│   ├── loading.js
│   ├── not-found.js
│   └── page.js
├── components/
│   ├── dashboard/
│   │   ├── Charts.jsx
│   │   ├── RecentBooks.jsx
│   │   └── StatsCard.jsx
│   ├── books/
│   │   ├── BookCard.jsx
│   │   ├── BookFilters.jsx
│   │   └── BookForm.jsx
│   ├── ui/
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Pagination.jsx
│   │   ├── Select.jsx
│   │   ├── Skeleton.jsx
│   │   ├── TagInput.jsx
│   │   └── Textarea.jsx
│   ├── AuthGuard.jsx
│   └── Navbar.jsx
├── context/
│   ├── AuthContext.js
│   ├── BookContext.js
│   └── ThemeContext.js
├── hooks/
│   ├── useBookStats.js
│   ├── useClickOutside.js
│   └── useDebounce.js
├── lib/
│   ├── auth.js
│   ├── db.js
│   └── validate.js
├── models/
│   ├── Book.js
│   └── User.js
├── public/
│   ├── manifest.json
│   └── robots.txt
├── utils/
│   ├── api.js
│   ├── constants.js
│   └── helpers.js
├── .env.example
├── .gitignore
├── jsconfig.json
├── middleware.js
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/book-manager.git
   cd book-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your values:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmanager?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

---

## 🗄️ MongoDB Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Copy the connection string and set it as `MONGODB_URI` in your `.env.local`

The app automatically creates the `users` and `books` collections on first use.

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_BASE_URL` (your Vercel URL)
4. Deploy!

---

## 📡 API Documentation

### Authentication

| Method | Endpoint              | Description      |
|--------|-----------------------|------------------|
| POST   | `/api/auth/register` | Register a user  |
| POST   | `/api/auth/login`    | Login            |
| POST   | `/api/auth/logout`   | Logout           |
| GET    | `/api/auth/me`       | Get current user |
| PUT    | `/api/auth/profile`  | Update profile   |

### Books

| Method  | Endpoint          | Description     |
|---------|-------------------|-----------------|
| GET     | `/api/books`      | List books      |
| POST    | `/api/books`      | Create a book   |
| GET     | `/api/books/:id`  | Get a book      |
| PUT     | `/api/books/:id`  | Update a book   |
| DELETE  | `/api/books/:id`  | Delete a book   |

#### Query Parameters (GET /api/books)

| Param    | Type   | Description                     |
|----------|--------|---------------------------------|
| search   | string | Search by title/author          |
| status   | string | Filter by reading status        |
| tags     | string | Comma-separated tags            |
| sort     | string | newest, oldest, title_asc, etc.|
| page     | number | Page number                     |
| limit    | number | Items per page (default: 12)    |

---

## 🖼️ Screenshots

*Coming soon — add screenshots of:*
- Login page
- Dashboard with charts
- Book grid view
- Book detail page
- Dark mode
- Mobile responsive views

---

## 🔒 Security

- JWT tokens stored in HTTP-only cookies
- Passwords hashed with bcrypt (salt rounds: 12)
- Input sanitization to prevent NoSQL injection
- Server-side validation on all endpoints
- Protected API routes via middleware
- Rate limiting considerations

---

## 🗺️ Future Improvements

- [ ] Book import from ISBN / Google Books API
- [ ] Reading streaks & gamification
- [ ] Book recommendations based on tags
- [ ] Export collection as CSV/PDF
- [ ] Collaborative reading lists
- [ ] Push notifications for reading reminders
- [ ] Full-text search with MongoDB Atlas Search
- [ ] Image upload with cloud storage (S3/Cloudinary)
- [ ] Progressive Web App (PWA) support
- [ ] OAuth integration (Google, GitHub)
- [ ] Reading time tracking
- [ ] Book notes & highlights
- [ ] Yearly reading goals
- [ ] Social sharing

---

## 📄 License

MIT License — feel free to use this project for personal or commercial purposes.

---

Built with ❤️ using Next.js, MongoDB, and Tailwind CSS.