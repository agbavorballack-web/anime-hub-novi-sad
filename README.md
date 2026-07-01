# Anime Hub Novi Sad 🎌

A community-driven anime website for the largest anime community in Serbia, based in Novi Sad.

## 🌟 Features

- **Dynamic Homepage**: Engaging anime visuals, mission statement, and upcoming events preview
- **Ticketing System**: QR codes linked to secure bank payments for easy registration and entry
- **User Profiles**: Track watchlists, favorite anime, and event history
- **Interactive Forum**: Discussions, theory sharing, and recommendations
- **Creative Showcase**: Fan art, cosplay, and community reviews
- **Anime Release Calendar**: Upcoming episodes and movies
- **News Section**: Anime industry news and local event updates
- **Rewards System**: Points for event attendance, forum posts, and quizzes
- **Social Media Integration**: Instagram, TikTok, WhatsApp group
- **Multilingual Support**: English and Serbian

## 🎨 Design

- Modern dark-mode theme with neon accents
- Smooth animations using Framer Motion
- Fully responsive on mobile devices
- User-friendly layout

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Node.js + Express (planned)
- **Database**: PostgreSQL (planned)
- **Authentication**: JWT + bcryptjs (planned)
- **QR Codes**: qrcode library
- **Icons**: Lucide React

## 📦 Installation

1. **Install Node.js** (version 18 or higher)
   ```bash
   # Download from https://nodejs.org/
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/animehub
   JWT_SECRET=your-secret-key
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
anime-hub/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Homepage
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── profile/      # User profile
│   │   ├── events/       # Events pages
│   │   ├── community/    # Forum pages
│   │   ├── showcase/     # Creative showcase
│   │   ├── anime/        # Anime database
│   │   ├── news/         # News section
│   │   └── rewards/      # Rewards system
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── contexts/         # React contexts
│   │   └── LanguageContext.tsx
│   └── lib/              # Utility functions
│       └── i18n.ts       # Translations
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎯 Usage

### Navigation
- **Home**: Landing page with featured content
- **Anime**: Browse anime database
- **Events**: View and register for events
- **Community**: Forum discussions
- **Showcase**: Fan art and cosplay gallery
- **News**: Latest anime news
- **Rewards**: Points and achievements

### User Features
- **Registration**: Create an account to track your activity
- **Profile**: Manage your watchlist and favorites
- **Forum**: Participate in discussions
- **Events**: Purchase tickets with QR code generation
- **Rewards**: Earn points through community engagement

## 🌍 Multilingual Support

The site supports English and Serbian languages. Use the language switcher in the navigation bar to change languages.

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. Create new pages in `src/app/`
2. Add components in `src/components/`
3. Update translations in `src/lib/i18n.ts`
4. Follow the existing code style and patterns

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the neon color scheme:
```js
colors: {
  neon: {
    pink: '#ff00ff',
    blue: '#00ffff',
    purple: '#9d00ff',
    green: '#00ff00',
    red: '#ff3131',
  }
}
```

### Animations
Modify animation settings in `tailwind.config.js` and component files.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Build the project and deploy the `.next` folder to your hosting provider.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Anime Hub Novi Sad community
- Open source contributors
- Anime fans in Serbia

## 📞 Contact

- Email: info@animehub.rs
- Location: Novi Sad, Serbia
- Website: [animehub.rs](https://animehub.rs)

---

Built with ❤️ for the anime community in Serbia
