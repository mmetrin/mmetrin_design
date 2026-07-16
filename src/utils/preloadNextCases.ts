import { publicPath } from './publicPath';

type CasePreload = {
  path: string;
  cover: string;
  loadPage: () => Promise<unknown>;
};

const CASES_TO_PRELOAD: CasePreload[] = [
  {
    path: '/cases/black',
    cover: publicPath('/images/cases/black-form/cover-bg.jpg'),
    loadPage: () => import('../pages/BlackFormCasePage'),
  },
  {
    path: '/cases/duplicates',
    cover: publicPath('/images/cases/duplicate-applications/cover-bg.png'),
    loadPage: () => import('../pages/DuplicateApplicationsCasePage'),
  },
  {
    path: '/cases/marketing-sme',
    cover: publicPath('/images/cases/marketing-sme/01.png'),
    loadPage: () => import('../pages/MarketingSmeCasePage'),
  },
  {
    path: '/cases/junior',
    cover: publicPath('/images/cases/junior/cover-bg.jpg'),
    loadPage: () => import('../pages/JuniorCasePage'),
  },
  {
    path: '/cases/promo-debit',
    cover: publicPath('/images/cases/designs-black/cover-bg.png'),
    loadPage: () => import('../pages/PromoDebitCasePage'),
  },
  {
    path: '/cases/visuals-ai',
    cover: publicPath('/images/cases/visuals-ai/cover.jpg'),
    loadPage: () => import('../pages/VisualsAiCasePage'),
  },
  {
    path: '/cases/dolyame-articles',
    cover: publicPath('/images/cases/dolyame-articles/cover-bg.jpg'),
    loadPage: () => import('../pages/DolyameArticlesCasePage'),
  },
  {
    path: '/cases/design-processes',
    cover: publicPath('/images/cases/design-processes/cover-bg.jpg'),
    loadPage: () => import('../pages/DesignProcessesCasePage'),
  },
  {
    path: '/cases/ceramics-ai',
    cover: publicPath('/images/cases/ceramics-ai/00-cover-bg.png'),
    loadPage: () => import('../pages/CeramicsAiCasePage'),
  },
  {
    path: '/cases/tsync-ai',
    cover: publicPath('/images/cases/tsync-ai/00-cover.png'),
    loadPage: () => import('../pages/TSyncAiCasePage'),
  },
];

export const preloadNextCases = (currentPath: string, count = 2) => {
  const currentCaseIndex = CASES_TO_PRELOAD.findIndex((caseItem) => caseItem.path === currentPath);

  if (currentCaseIndex < 0) {
    return;
  }

  CASES_TO_PRELOAD.slice(currentCaseIndex + 1, currentCaseIndex + 1 + count).forEach((caseItem) => {
    void caseItem.loadPage();

    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.src = caseItem.cover;
  });
};
