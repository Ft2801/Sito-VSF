import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import LocationPage from './pages/LocationPage';
import CollaboratePage from './pages/CollaboratePage';
import NewsPage from './pages/NewsPage';
import PreventionPage from './pages/PreventionPage';
import AlertsPage from './pages/AlertsPage';
import GalleryPage from './pages/GalleryPage';
import DonationPage from './pages/DonationPage';
import { ThemeProvider } from './context/ThemeContext';
import PreventionDetailPage from './pages/prevention/PreventionDetailPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow page-enter-active" key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servizi" element={<ServicesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/galleria" element={<GalleryPage />} />
            <Route path="/chi-siamo" element={<AboutPage />} />
            <Route path="/dove-siamo" element={<LocationPage />} />
            <Route path="/collabora" element={<CollaboratePage />} />
            <Route path="/prevenzione" element={<PreventionPage />} />
            <Route path="/allerte" element={<AlertsPage />} />
            <Route path="/donazioni" element={<DonationPage />} />
            <Route path="/prevenzione/:articleSlug" element={<PreventionDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;