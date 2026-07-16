import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { App } from './App';
import { HOME_INITIAL_CONTENT_READY_EVENT } from './utils/initialPageLoader';

history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const unlockScroll = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
};

const hideInitialLoader = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  unlockScroll();

  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    window.setTimeout(() => loader.remove(), 350);
  }
};

const isInitialHomeRoute = () => {
  const homePath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  return currentPath === homePath;
};

if (isInitialHomeRoute()) {
  window.addEventListener(HOME_INITIAL_CONTENT_READY_EVENT, hideInitialLoader, { once: true });
} else {
  requestAnimationFrame(() => requestAnimationFrame(hideInitialLoader));
}

// bfcache / back-forward on iOS — ensure overflow is always unlocked
window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
  unlockScroll();
});
