# Portfolio Website - Next.js

This is a modern portfolio website built with Next.js 15, featuring a beautiful interactive design with 3D elements and smooth animations.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **3D Interactive Background** with Three.js
- **Spline 3D Viewer** integration
- **Responsive Design** for all devices
- **Dark Theme** with custom color scheme

## Pages

- **Home** - Interactive landing page with chat interface
- **About** - Personal information with image gallery
- **Projects** - Showcase of work with detailed project cards
- **Experience** - Professional experience timeline
- **Skills** - Technical skills and expertise

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── experience/        # Experience page
│   └── skills/            # Skills page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── globals.css           # Global styles
```

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Lucide React
- **State Management**: React Query

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS**
- **Docker**

## License

This project is licensed under the MIT License.
