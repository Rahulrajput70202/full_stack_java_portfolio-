# Full Stack Java Portfolio

A personal portfolio website built to showcase full-stack Java development projects, skills, and experience. The frontend is a modern React + TypeScript single-page app, with Supabase powering backend features like the contact form.

🔗 **Repo:** [full_stack_java_portfolio-](https://github.com/Rahulrajput70202/full_stack_java_portfolio-)

## ✨ Features

- Responsive, single-page portfolio layout
- Smooth animations powered by Framer Motion
- Contact form with client-side validation (React Hook Form + Zod)
- Supabase integration for backend data (e.g. contact submissions)
- Clean icon set via Lucide React
- Styled with Tailwind CSS

## 🛠️ Tech Stack

**Frontend**
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Lucide React](https://lucide.dev/) — icons
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form handling & validation

**Backend / Data**
- [Supabase](https://supabase.com/) — database & backend services

**Tooling**
- ESLint (with TypeScript-aware rules)
- PostCSS + Autoprefixer

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- A [Supabase](https://supabase.com/) project (for backend features)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Rahulrajput70202/full_stack_java_portfolio-.git
   cd full_stack_java_portfolio-
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the project root and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts the development server with HMR    |
| `npm run build`   | Type-checks and builds for production     |
| `npm run preview` | Previews the production build locally     |
| `npm run lint`    | Runs ESLint across the project            |

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/                    # Application source code
├── supabase/
│   └── migrations/         # Supabase database migrations
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 🚀 Deployment

This project builds to a static site via `npm run build`, producing a `dist/` folder that can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.). Be sure to configure the same environment variables on your hosting platform.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/Rahulrajput70202/full_stack_java_portfolio-/issues).

## 📄 License

This project is currently unlicensed. Add a license file if you'd like to specify usage terms.

## 👤 Author

**Rahul Rajput**
- GitHub: [@Rahulrajput70202](https://github.com/Rahulrajput70202)
