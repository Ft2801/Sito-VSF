import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Classi per la navigazione desktop
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClasses = "bg-emerald-700 text-white";
  const inactiveLinkClasses = "text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white";
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  // Classi per la navigazione mobile (senza hover)
  const mobileNavLinkClasses = "block px-3 py-2 rounded-md text-base font-medium";
  const mobileActiveLinkClasses = "bg-emerald-700 text-white";
  const mobileInactiveLinkClasses = "text-gray-600 dark:text-gray-300";
  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${mobileNavLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`;


  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md dark:shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg md:text-2xl font-bold truncate">
              <span className="text-green-500 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] dark:[text-shadow:none]">Volontari</span> <span className="text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] dark:[text-shadow:none]">Senza</span> <span className="text-red-500 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] dark:[text-shadow:none]">Frontiere</span>
            </Link>
          </div>
          <div className="hidden xl:block">
            <nav className="ml-10 flex items-center space-x-4">
              <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
              <NavLink to="/servizi" className={getNavLinkClass}>Servizi</NavLink>
              <NavLink to="/news" className={getNavLinkClass}>News</NavLink>
              <NavLink to="/galleria" className={getNavLinkClass}>Galleria</NavLink>
              <NavLink to="/prevenzione" className={getNavLinkClass}>Prevenzione</NavLink>
              <NavLink to="/allerte" className={getNavLinkClass}>Allerte</NavLink>
              <NavLink to="/chi-siamo" className={getNavLinkClass}>Chi Siamo</NavLink>
              <NavLink to="/dove-siamo" className={getNavLinkClass}>Dove Siamo</NavLink>
              <NavLink to="/collabora" className={getNavLinkClass}>Collabora</NavLink>
              <NavLink to="/donazioni" className={getNavLinkClass}>
                Sostienici
              </NavLink>

            </nav>
          </div>
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Apri menu</span>
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="xl:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)} end>Home</NavLink>
              <NavLink to="/servizi" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Servizi</NavLink>
              <NavLink to="/news" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>News</NavLink>
              <NavLink to="/galleria" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Galleria</NavLink>
              <NavLink to="/prevenzione" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Prevenzione</NavLink>
              <NavLink to="/allerte" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Allerte</NavLink>
              <NavLink to="/chi-siamo" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Chi Siamo</NavLink>
              <NavLink to="/dove-siamo" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Dove Siamo</NavLink>
              <NavLink to="/collabora" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Collabora</NavLink>
              <NavLink to="/donazioni" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Sostienici</NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;