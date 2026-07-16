import { useEffect, type RefObject } from 'react';

type HeroBackgroundParallaxOptions = {
  maxOffset?: number;
  scale?: number;
  containerSelector?: string;
};

export const useHeroBackgroundParallax = (
  imageRef: RefObject<HTMLImageElement | null>,
  {
    maxOffset = 24,
    scale = 1.05,
    containerSelector = '.duplicate-applications-case__hero',
  }: HeroBackgroundParallaxOptions = {},
) => {
  useEffect(() => {
    const image = imageRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!image || prefersReducedMotion || window.matchMedia('(max-width: 480px)').matches) {
      return;
    }

    const section = image.closest(containerSelector) as HTMLElement | null;
    if (!section) {
      return;
    }

    let frameId: number | null = null;
    let targetX = 0;
    let currentX = 0;

    const applyTransform = () => {
      image.style.transform = `scale(${scale}) translateX(${currentX.toFixed(2)}px)`;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      applyTransform();

      if (Math.abs(targetX - currentX) > 0.05) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      currentX = targetX;
      applyTransform();
      frameId = null;
    };

    const requestTick = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      targetX = dx * maxOffset;
      requestTick();
    };

    const onMouseLeave = () => {
      targetX = 0;
      requestTick();
    };

    applyTransform();
    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      image.style.transform = '';
    };
  }, [containerSelector, imageRef, maxOffset, scale]);
};
