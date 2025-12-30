# Arts District Kitchen - Restaurant Website

A modern, responsive React restaurant website with dynamic theming and API integration.

## 🚀 Features

- **Dynamic Theming**: CSS variables for easy theme customization
- **API Integration**: Ready-to-use API service for fetching content
- **Fully Responsive**: Mobile-first design that works on all devices
- **Component-Based**: Modular React components for easy maintenance
- **Context API**: Global state management for site data and theme

## 📁 Project Structure

```
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── index.jsx              # App entry point
    ├── App.jsx                # Main app component
    ├── components/
    │   ├── Loader.jsx         # Loading spinner
    │   ├── Navigation.jsx     # Responsive navbar
    │   ├── HeroSection.jsx    # Hero with CTA
    │   ├── AboutSection.jsx   # About/story section
    │   ├── MenuSection.jsx    # Interactive menu tabs
    │   ├── GallerySection.jsx # Image gallery with lightbox
    │   ├── ReservationsSection.jsx # Booking form
    │   ├── ContactSection.jsx # Contact info & map
    │   └── Footer.jsx         # Site footer
    ├── context/
    │   └── SiteContext.jsx    # Global state provider
    ├── services/
    │   └── ApiService.js      # API calls handler
    ├── data/
    │   └── defaultData.js     # Default/fallback data
    └── styles/
        ├── variables.css      # CSS theme variables
        └── global.css         # Global styles
```

## 🎨 Theme Customization

Edit `src/styles/variables.css` to customize colors:

```css
:root {
    --color-primary: #f59e0b;        /* Main accent color */
    --color-primary-hover: #fbbf24;  /* Hover state */
    --color-bg-primary: #000000;     /* Background color */
    --color-bg-secondary: #0a0a0a;   /* Secondary background */
    --color-text-primary: #ffffff;   /* Main text color */
    /* ... more variables */
}
```

### Pre-built Themes

Uncomment alternative themes in `variables.css`:
- **Elegant Gold** - Luxurious gold accent
- **Modern Teal** - Fresh teal color scheme
- **Warm Rose** - Warm pink/rose tones
- **Classic Burgundy** - Deep wine colors

## 🔌 API Integration

### Connecting to Your API

Edit `src/services/ApiService.js`:

```javascript
const API_BASE_URL = 'https://your-api-url.com';

// Example: Fetch site data
fetchSiteData: async () => {
    const response = await fetch(`${API_BASE_URL}/site-data`);
    return response.json();
}
```

### Expected Data Format

Your API should return data matching the structure in `src/data/defaultData.js`:

```javascript
{
    theme: { ... },
    brand: { name, fullName, tagline, established },
    navigation: [ { label, href } ],
    hero: { title, backgroundImage, ctaPrimary, ctaSecondary },
    about: { ... },
    menu: { categories, items },
    gallery: { images },
    reservations: { timeSlots, guestOptions },
    contact: { location, hours, contact },
    social: [ { name, url, icon } ],
    footer: { ... }
}
```

## 🏃 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🛠️ Built With

- [React 18](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- CSS Variables - Dynamic Theming
- Google Fonts - Typography

## 📄 License

MIT License - feel free to use for personal or commercial projects.
