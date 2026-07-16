import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { StickyHeader, MobileStickyHeader } from '../Header';
import { Footer } from '../Footer';

const scrollToPageTop = () => {
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;

  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
};

const RouteScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (pathname === '/' && hash) {
      return;
    }

    scrollToPageTop();
  }, [pathname, hash]);

  return null;
};

const HashScrollHandler = () => {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    if (!hash || pathname !== '/') {
      return;
    }

    if (hash === '#portfolio' && new URLSearchParams(search).has('portfolioCase')) {
      return;
    }

    const id = hash.slice(1);
    let frameId = 0;
    let timeoutId = 0;
    let cancelled = false;
    const startedAt = window.performance.now();

    const scrollToSection = () => {
      if (cancelled) {
        return;
      }

      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (window.performance.now() - startedAt < 3000) {
        frameId = window.requestAnimationFrame(scrollToSection);
        timeoutId = window.setTimeout(scrollToSection, 120);
      }
    };

    scrollToSection();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [hash, pathname, search]);

  return null;
};

export const Layout = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const isNotFoundPage = matches.some(
    (match) => (match.handle as { isNotFoundPage?: boolean } | undefined)?.isNotFoundPage,
  );
  const footerVariant = isNotFoundPage ? 13 : undefined;

  return (
    <>
      <RouteScrollHandler />
      <HashScrollHandler />
      <StickyHeader />
      <MobileStickyHeader />
      <main>
        <div
          className={`page-transition${isNotFoundPage ? ' page-transition--not-found' : ''}`}
          key={pathname}
        >
          <Outlet />
        </div>
      </main>
      <Footer fixedVariant={footerVariant} hideCaption={isNotFoundPage} />
    </>
  );
};
