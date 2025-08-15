# 🐍 CodeCrafter Journey

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-cyan.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**An Interactive Python Learning Platform with Authentication System**

Master Python programming from zero to hero through hands-on coding exercises, real-time feedback, and gamified learning experiences.

---

## ✨ Features

### 🔐 **Authentication System**
- **Local Storage Database** - No external database required
- **Secure Login** - Account lockout after failed attempts  
- **Session Management** - 24-hour auto-expiring sessions
- **Default Admin Access** - Ready-to-use demo credentials

### 📚 **Learning Platform**
- **Interactive Code Editor** - Real-time Python code execution simulation
- **Smart Code Completion** - Context-aware suggestions and hints
- **Progress Tracking** - XP points, levels, badges, and streaks
- **Comprehensive Curriculum** - Structured lessons from basics to advanced
- **Hands-on Projects** - Real-world Python applications

### 🎮 **Gamification**
- **XP & Leveling System** - Earn points for completing lessons
- **Achievement Badges** - Unlock milestones and accomplishments  
- **Learning Streaks** - Build consistent study habits
- **Visual Feedback** - Animations, sound effects, and celebrations

### 🎨 **Modern UI/UX**
- **Dark/Light Themes** - Automatic system preference detection
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Beautiful Animations** - Smooth transitions and micro-interactions
- **Sound Effects** - Audio feedback for better engagement

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mhmmdabbass120/codeCrafter.git
   cd codeCrafter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080`
   - Login with demo credentials:
     - **Username:** `admin`
     - **Password:** `admin123`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

---

## 📖 Usage

### Getting Started

1. **Login** - Use the demo credentials or create your own user
2. **Take Assessment** - Evaluate your current Python knowledge
3. **Follow Roadmap** - Get a personalized learning path
4. **Complete Lessons** - Interactive coding exercises with real-time feedback
5. **Track Progress** - Monitor your XP, level, and achievements
6. **Build Projects** - Apply your skills in practical applications

### Demo Credentials

For immediate access to the platform:
- **Username:** `admin`
- **Password:** `admin123`

---

## 🛠️ Technology Stack

### Frontend
- **[React 18](https://reactjs.org/)** - Modern UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[React Router](https://reactrouter.com/)** - Client-side routing

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Modern React component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons

### State Management
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **Local Storage** - Client-side data persistence

### Development Tools
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting

---

## 📁 Project Structure

```
codecrafter-journey/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── Login.tsx      # Authentication component
│   │   ├── Hero.tsx       # Landing page hero
│   │   ├── UserDashboard.tsx # Progress dashboard
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── use-auth.tsx   # Authentication logic
│   │   ├── use-progress.ts # Progress tracking
│   │   ├── use-animations.ts # Animation utilities
│   │   └── ...
│   ├── data/              # Static data and content
│   │   ├── lessonContent.ts # Curriculum lessons
│   │   ├── projects.ts    # Project templates
│   │   └── ...
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

---

## 🎯 Features In Detail

### Authentication System
- **Local Storage Database** - User data stored securely in browser
- **Session Management** - Automatic login/logout with expiration
- **Security Features** - Account lockout, password protection
- **Role-Based Access** - Admin and user role support

### Interactive Code Editor
- **Syntax Highlighting** - Python code highlighting
- **Real-time Execution** - Simulated Python code running
- **Smart Suggestions** - Context-aware code completion
- **Error Handling** - Helpful error messages and hints

### Progress System
- **XP Points** - Earn experience for completing tasks
- **Level Progression** - Advance through learning levels
- **Achievement Badges** - Unlock special accomplishments
- **Learning Streaks** - Track consecutive study days

### Curriculum
- **Structured Lessons** - From Python basics to advanced topics
- **Interactive Exercises** - Hands-on coding challenges
- **Real Projects** - Build actual Python applications
- **External Resources** - Links to tutorials, videos, and documentation

---

## 🤝 Contributing

We welcome contributions to make CodeCrafter even better!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clean, documented code
- Test your changes thoroughly
- Maintain responsive design principles

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Shadcn/ui](https://ui.shadcn.com/)** - For the beautiful component library
- **[Lucide](https://lucide.dev/)** - For the comprehensive icon set
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[React Community](https://reactjs.org/community/support.html)** - For the amazing ecosystem

---

## 📞 Support

If you have any questions or need help:

- **GitHub Issues** - [Create an issue](https://github.com/mhmmdabbass120/codeCrafter/issues)
- **Email** - mhmmd.h.abbass@gmail.com

---

**Happy Coding! 🐍✨**

*Master Python from zero to hero with CodeCrafter Journey*