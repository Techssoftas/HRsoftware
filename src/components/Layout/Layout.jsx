import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import HorizontalSidebar from './HorizontalSidebar.jsx';
import Footer from './Footer.jsx';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('.header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Watch for DOM changes inside header (submenus appearing/disappearing)
    const observer = new MutationObserver(updateHeaderHeight);
    const header = document.querySelector('.header');
    if (header) {
      observer.observe(header, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (header) observer.disconnect();
    };
  }, [location.pathname]); // Re-run on route change

  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <>
      <div className="main-wrapper">
        {/* Fixed Header */}
        <Header />

        {/* Wrapper that pushes everything below the fixed header */}
        <div style={{ paddingTop: headerHeight }}>
          <HorizontalSidebar />
          {children}
        </div>

        <Footer />
      </div>
    </>
  );
}