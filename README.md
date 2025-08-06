# 🍄 Mushroom Classifier

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern web application for mushroom identification using OpenAI's vision models. Built with Next.js 15, React 19, and TypeScript for a blazing-fast, type-safe user experience.

![Mushroom Classifier Screenshot](docs/screenshot.png)

## ⚠️ Important Safety Notice

**This tool is for educational purposes only.** Never consume wild mushrooms based solely on this or any app's identification. Always consult with local mycology experts before consuming any wild mushrooms. Misidentification can lead to serious illness or death.

## ✨ Features

- 🖼️ **Image Analysis**: Upload or drag-and-drop photos of mushrooms for AI-powered identification
- 🧠 **Advanced AI**: Leverages OpenAI's GPT-4 Vision for accurate analysis
- ⚡ **Blazing Fast**: Built with Next.js 15 and Turbopack for instant refreshes
- 🎨 **Modern UI**: Beautiful, responsive interface with shadcn/ui components
- 📊 **Detailed Results**: Get species names, confidence levels, and safety information
- 🔒 **Secure**: API credentials stored safely in environment variables
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager
- OpenAI API key with GPT-4 Vision access

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mushroom-classifier-nextjs.git
   cd mushroom-classifier-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up your environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your OpenAI API key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Building for Production

### Standard Build
```bash
npm run build
npm run start
```

### Static Export (if applicable)
```bash
npm run build
npm run export
```

## 📁 Project Structure

```
mushroom-classifier-nextjs/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── classify/      # Mushroom classification endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── image-upload.tsx  # Image upload component
│   └── mushroom-result.tsx # Results display component
├── lib/                   # Utility functions
│   └── utils.ts          # Helper utilities
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## 🔧 Configuration

Create a `.env.local` file in the project root with your OpenAI credentials:

```env
OPENAI_API_KEY=your-api-key-here
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
```

## 📖 Usage

1. **Upload an image**
   - Click the upload area or drag and drop a mushroom photo
   - Supported formats: JPEG, PNG, WebP
   - Maximum file size: 10MB

2. **Classify the mushroom**
   - Click "Classify Mushroom" to analyze the image
   - The AI will process and return results in seconds

3. **Review the results**
   - Species identification (common and scientific names)
   - Confidence level
   - Key identifying features
   - Edibility status
   - Safety warnings
   - Similar species to be aware of

## 🏗️ Architecture

The application follows Next.js best practices with a modern architecture:

- **App Router**: Leverages Next.js 15's App Router for improved performance and DX
- **Server Components**: Uses React Server Components where appropriate for optimal performance
- **API Routes**: Secure backend endpoints for OpenAI integration
- **Type Safety**: Full TypeScript support with strict mode enabled
- **Component System**: shadcn/ui for consistent, customizable components
- **Styling**: Tailwind CSS v4 with CSS variables for theming

### Key Technologies

- **Next.js 15.3.3**: React framework with App Router
- **React 19.0.0**: Latest React with improved performance
- **TypeScript**: Type-safe development experience
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible component library
- **Turbopack**: Lightning-fast bundler for development

## 🧪 Testing

### Running Tests
```bash
npm run test
# or
yarn test
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mushroom-classifier-nextjs)

### Other Platforms

- **Netlify**: Supports Next.js with `@netlify/plugin-nextjs`
- **AWS Amplify**: Full Next.js support with SSR/SSG
- **Docker**: Use the provided Dockerfile for containerized deployment
- **Node.js Server**: Run `npm run build && npm run start`

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Ensure all TypeScript errors are resolved
- Follow React and Next.js best practices
- Run `npm run lint` before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 Vision API
- Vercel for Next.js and hosting
- shadcn for the beautiful component library
- The mycology community for mushroom identification resources
- All contributors who have helped improve this project

## 🐛 Known Issues

- Large images (>10MB) may take longer to process
- Some rare mushroom species may not be accurately identified
- Requires active internet connection for API calls

## 🚀 Future Enhancements

- [ ] Offline mode with WebAssembly AI models
- [ ] Batch processing for multiple images
- [ ] User accounts and history tracking
- [ ] Export results to PDF/CSV
- [ ] Integration with mushroom databases
- [ ] Progressive Web App (PWA) support
- [ ] Real-time collaboration features
- [ ] Multi-language support

---

Made with ❤️ by the Mushroom Classifier Contributors