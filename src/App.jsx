import React from 'react';
import { SiteProvider, useSiteData } from './context/SiteContext.jsx';

// Components
import Loader from './components/Loader.jsx';
import Navigation from './components/Navigation.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import MenuSection from './components/MenuSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import ReservationsSection from './components/ReservationsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

// ============================================
// MAIN APP COMPONENT
// ============================================

const AppContent = () => {
    const { loading, error } = useSiteData();

    // Show loader while fetching data
    if (loading) {
        return <Loader message="Loading experience..." />;
    }

    // Show error state (optional - currently falls back to default data)
    if (error) {
        console.warn('Using fallback data due to API error:', error);
    }

    return (
        <div className="app">
            <Navigation />
            <main>
                <HeroSection />
                <AboutSection />
                <MenuSection />
                <GallerySection />
                <ReservationsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

// App wrapper with context provider
const App = () => {
    return (
        <SiteProvider>
            <AppContent />
        </SiteProvider>
    );
};

export default App;
