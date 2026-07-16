import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
      }),
      { threshold: 0.01, rootMargin: '0px 0px 120px 0px' },
    );

    const observeRevealEls = (root: ParentNode = document) => {
      root.querySelectorAll<Element>('[data-reveal]:not(.is-revealed)').forEach(el => io.observe(el));
    };

    observeRevealEls();

    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node.matches('[data-reveal]:not(.is-revealed)')) {
            io.observe(node);
          }

          observeRevealEls(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      io.disconnect();
    };
  }, []);
}
