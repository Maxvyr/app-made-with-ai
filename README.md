# AI-Generated Applications Portfolio

A curated collection of 28 full-stack applications built with different AI models and Large Language Models (LLMs), showcasing the power of AI-assisted development across various frameworks and technologies.

## Overview

This repository demonstrates the capabilities of different AI models in generating production-ready code. Each project is a fully functional application built using modern web technologies, organized by the AI model that generated it.

### AI Models Featured

- **Claude** (Anthropic) - 8 projects
- **OpenAI** (GPT-4, O1, O3-mini) - 6 projects
- **Grok** (xAI) - 3 projects
- **DeepSeek** (R1) - 3 projects
- **Gemini** (Google) - 1 project
- **Llama** (Meta) - 1 project

---

## Projects by Category

### Data Browsing & Exploration

#### Pokedex (8 variants)
Explore the world of Pokemon with these interactive Pokedex applications.

**Locations**:
- `/claude/pokedex/`
- `/openai/pokedex-gpt4o/` & `/openai/pokedex-o1/`
- `/grok/pokedex-grok2/`
- `/deepseek/pokedex-v3/`
- `/llama/3-1_405B/pokedex/`

**Features**:
- Search Pokemon by name
- Filter by type (Fire, Water, Grass, etc.)
- View detailed stats and information
- Beautiful charts and visualizations
- Responsive design for all devices

**Tech Stack**: React, TypeScript, Tailwind CSS, shadcn/ui, Recharts

---

### Productivity Tools

#### Todoist Clone
A full-featured task management application inspired by Todoist.

**Location**: `/claude/todoist-clone_sonnet3-7/`

**Features**:
- Create, edit, and delete tasks
- Set due dates and priorities (P1-P4)
- Filter tasks by All, Today, or Upcoming
- Dark mode support
- Tasks persist in browser storage
- View completed tasks

**Tech Stack**: React, TypeScript, Tailwind CSS

**Perfect for**: Learning task management patterns, studying React state management

---

### Games & Interactive Entertainment

#### Chess Game (3 variants)
Full-featured chess games with complete rule implementations.

**Locations**:
- `/openai/chessgame-o1/` (OpenAI O1)
- `/deepseek/chessgame-r1/` (DeepSeek R1)
- `/gemini/chessgame--2-5-pro/` (Google Gemini)

**Features**:
- Complete chess rules
- Valid move highlighting
- Check and checkmate detection
- Turn-based gameplay
- Clean, intuitive interface

**Tech Stack**: HTML5, CSS3, Vanilla JavaScript

**Perfect for**: Game logic implementation, pure JavaScript patterns

#### Space Shooter
A classic arcade-style space shooter game.

**Location**: `/openai/space-shooting-game-o3minihigh/`

**Features**:
- Player controls and movement
- Enemy waves and AI
- Bullet mechanics
- Collision detection
- Score tracking

**Tech Stack**: Python, Pygame

**Perfect for**: Game development, Python patterns

---

### Creative & Media

#### Virtual Piano
An interactive 25-key piano synthesizer in your browser.

**Location**: `/claude/piano/`

**Features**:
- 25 playable piano keys
- Real-time audio synthesis
- Keyboard and mouse controls
- Beautiful gradient design
- Responsive layout

**Tech Stack**: React, Web Audio API, Tailwind CSS

**Perfect for**: Learning Web Audio API, interactive UI patterns

#### Image Generator with DALL-E (3 variants)
Generate images from text descriptions using AI.

**Locations**:
- `/openai/imagegen-withdalle-o1/`
- `/deepseek/imagegen-withdalle-r1/`
- `/grok/imagegen-withdalle-grok3/`

**Features**:
- Text-to-image generation
- Smooth animations
- Image display and management
- Modern, clean interface

**Tech Stack**: React, TypeScript, Framer Motion

**Note**: Requires OpenAI API key

---

### Templates & Starters

#### SaaS Marketing Template
A modern landing page template for SaaS products.

**Location**: `/claude/saas-marketing-template_sonnet3-7/`

**Features**:
- Responsive marketing page layout
- Smooth animations
- Modern design system
- SEO-friendly structure
- Fast build with Turbopack

**Tech Stack**: Next.js 15, React 19, Tailwind CSS, Framer Motion

**Perfect for**: Starting a new SaaS project, learning Next.js

#### React Template
Clean React starter with Vite.

**Location**: `/claude/react-version/`

**Features**:
- Minimal setup
- Fast development with Vite
- ESLint configured
- Ready to customize

**Tech Stack**: React, Vite

#### Svelte Template
Alternative to React with Svelte framework.

**Location**: `/claude/svelte-version/`

**Features**:
- Lightweight framework
- Reactive programming model
- Fast compilation
- Vite integration

**Tech Stack**: Svelte, Vite

---

### Utilities & Tools

#### Icon to Title Converter
Command-line tool to merge icons with text titles.

**Location**: `/claude/icon-to-icontitle/`

**Features**:
- CLI interface with prompts
- Image processing
- Text overlay on images
- Custom output naming

**Tech Stack**: Node.js, Sharp, Inquirer

**Perfect for**: Batch processing, CLI tool patterns

---

## Getting Started

### Prerequisites

- **Node.js** 16 or higher (18+ recommended)
- **pnpm** (preferred) or **npm**
- **Python** 3.x (only for Space Shooter game)
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app-made-with-ai
```

2. Navigate to a project:
```bash
cd claude/todoist-clone_sonnet3-7
```

3. Install dependencies:
```bash
pnpm install
# or
npm install
```

4. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open your browser to the URL shown (typically http://localhost:5173)

### Building for Production

```bash
pnpm build
# or
npm run build
```

The production-ready files will be in the `dist` folder.

---

## Technology Overview

### Frontend Frameworks
- **React** 18.3.1 - Most projects
- **Next.js** 15.1.7 - SaaS template
- **Svelte** 4.2.18 - Alternative framework demo

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Custom CSS** - Component-specific styles

### UI Libraries
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### Build Tools
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type safety
- **ESLint** - Code quality

---

## Project Structure

Each project follows a standard structure:

```
project-name/
├── package.json          # Project configuration
├── index.html           # Entry point
├── src/
│   ├── main.tsx         # Application entry
│   ├── App.tsx          # Root component
│   └── components/      # React components
├── public/              # Static assets
└── README.md           # Project documentation
```

---

## Learning Resources

### For Beginners
Start with these simpler projects:
1. **Chess Game** - Pure JavaScript, no frameworks
2. **React Template** - Basic React setup
3. **Virtual Piano** - Interactive React app

### For Intermediate Developers
Try these more complex projects:
1. **Todoist Clone** - State management, localStorage
2. **Pokedex** - API integration, TypeScript
3. **Image Generator** - API integration, animations

### For Advanced Developers
Explore these sophisticated implementations:
1. **SaaS Marketing Template** - Next.js, advanced patterns
2. **Multiple Pokedex Variants** - Compare implementations across AI models
3. **Full Project Suite** - Study architectural differences

---

## Comparing AI Models

One of the unique features of this repository is the ability to compare how different AI models approach the same problem.

### Example: Pokedex Implementations

Compare 8 different Pokedex implementations to see:
- Code organization patterns
- Component structure choices
- State management approaches
- Styling decisions
- Feature completeness

This makes the repository valuable for:
- Understanding AI code generation capabilities
- Learning different approaches to the same problem
- Identifying best practices across implementations

---

## Use Cases

### For Learners
- Study modern web development patterns
- Compare different framework approaches
- Learn from working, complete applications
- Practice reading and understanding code

### For Developers
- Use as starter templates for new projects
- Study AI-generated code patterns
- Compare implementation approaches
- Extract reusable components

### For Researchers
- Analyze AI code generation capabilities
- Compare LLM outputs across models
- Study code quality and patterns
- Benchmark different AI models

### For Educators
- Teaching materials for web development
- Examples of modern JavaScript/TypeScript
- Demonstrate framework differences
- Show real-world application structure

---

## Features Across Projects

### Common Patterns
- Modern JavaScript/TypeScript
- Component-based architecture
- Responsive design
- Clean code organization
- ESLint configuration

### Accessibility
- Keyboard navigation support (via Radix UI)
- ARIA attributes
- Semantic HTML
- Screen reader friendly

### Performance
- Fast development with Vite HMR
- Optimized production builds
- Efficient rendering patterns

---

## Contributing

This repository is primarily a showcase of AI-generated code. However, improvements and bug fixes are welcome!

### Areas for Contribution
- Bug fixes
- Documentation improvements
- Additional examples
- Performance optimizations
- Test coverage
- Accessibility enhancements

---

## Limitations & Notes

### What's NOT Included
- Backend APIs or databases
- Authentication systems
- Automated tests
- CI/CD pipelines
- Docker configurations
- Deployment configs

### Purpose
These projects are designed to demonstrate AI code generation capabilities and serve as learning resources or starting templates. They are not production-ready applications with full backend infrastructure.

---

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Vite will automatically try the next available port
# Or specify a custom port:
pnpm dev --port 3000
```

**Dependencies Not Installing**
```bash
# Clear cache and reinstall:
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build Errors**
```bash
# Check Node.js version:
node --version  # Should be 16 or higher

# Clear build cache:
rm -rf node_modules/.vite dist
pnpm install
pnpm build
```

**TypeScript Errors**
```bash
# Check for type errors:
pnpm tsc --noEmit

# Update TypeScript:
pnpm add -D typescript@latest
```

---

## API Keys & External Services

### PokeAPI (Pokedex projects)
- **No API key required**
- Free public API
- Rate limits apply
- URL: https://pokeapi.co

### OpenAI DALL-E (Image generation projects)
- **API key required**
- Not included in repository
- Token-based pricing
- Sign up at: https://platform.openai.com

To use image generation apps:
1. Get an API key from OpenAI
2. Add it to your environment or app configuration
3. Follow project-specific instructions

---

## License

Please check individual project directories for specific license information.

---

## Acknowledgments

### AI Models Used
- **Anthropic Claude** (Sonnet 3.7)
- **OpenAI** (GPT-4, O1, O3-mini)
- **xAI Grok** (Grok 2, Grok 3)
- **DeepSeek** (R1)
- **Google Gemini** (2.5 Pro)
- **Meta Llama** (3.1 405B)

### Technologies
- React Team for React
- Vercel for Next.js
- Svelte Team for Svelte
- Evan You for Vite
- Tailwind Labs for Tailwind CSS
- shadcn for shadcn/ui
- All open-source contributors

---

## Project Statistics

- **Total Projects**: 28
- **AI Models**: 6
- **Primary Languages**: JavaScript, TypeScript, Python
- **Primary Framework**: React
- **Build Tool**: Vite
- **Styling Solution**: Tailwind CSS (most projects)

---

## What's Next?

### Explore Individual Projects
Each project has its own README with specific details. Navigate to any project directory and check out its documentation.

### Run Multiple Projects
Each project runs independently. You can have multiple development servers running simultaneously on different ports.

### Customize and Extend
Feel free to fork any project and customize it for your needs. These serve as excellent starting points for your own applications.

### Learn and Compare
Study the code differences between similar projects generated by different AI models to understand various approaches to solving the same problems.

---

## Support & Questions

For questions about specific projects, check the individual project README files. For general questions about the repository structure or organization, refer to the CLAUDE.md file for technical details.

---

## Quick Start Guide

Want to get started quickly? Try these:

**1. Todoist Clone** (Full-featured app)
```bash
cd claude/todoist-clone_sonnet3-7
pnpm install && pnpm dev
```

**2. Virtual Piano** (Fun and interactive)
```bash
cd claude/piano
pnpm install && pnpm dev
```

**3. Pokedex** (Popular data browser)
```bash
cd claude/pokedex
pnpm install && pnpm dev
```

**4. Chess Game** (No installation needed)
```bash
cd openai/chessgame-o1
# Just open index.html in your browser!
```

---

**Last Updated**: October 29, 2025

**Repository**: app-made-with-ai

**Branch**: claude/create-documentation-files-011CUbGZT2PoPpsJospogBjU

---

## Star This Repository

If you find this collection useful for learning or as a template resource, please consider starring the repository!

Happy coding!
