import { lazy as reactLazy, Suspense, type ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';

type LazyModule<T extends ComponentType> = { default: T };

// A GitHub Pages deployment replaces hashed assets. A browser with an older
// entry chunk can therefore request a lazy route module that no longer exists.
// Reload once to get the current entry manifest instead of exposing React
// Router's default error screen to the visitor.
const lazy = <T extends ComponentType>(factory: () => Promise<LazyModule<T>>) =>
  reactLazy(async () => {
    const storageKey = `mmetrin:lazy-route-reload:${window.location.pathname}`;

    try {
      const module = await factory();
      window.sessionStorage.removeItem(storageKey);
      return module;
    } catch (error) {
      if (!window.sessionStorage.getItem(storageKey)) {
        window.sessionStorage.setItem(storageKey, 'true');
        window.location.reload();
        return new Promise<LazyModule<T>>(() => {});
      }

      window.sessionStorage.removeItem(storageKey);
      throw error;
    }
  });

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const PolicyPage = lazy(() =>
  import('../pages/PolicyPage').then((m) => ({ default: m.PolicyPage })),
);
const DuplicateApplicationsCasePage = lazy(() =>
  import('../pages/DuplicateApplicationsCasePage').then((m) => ({
    default: m.DuplicateApplicationsCasePage,
  })),
);
const BlackFormCasePage = lazy(() =>
  import('../pages/BlackFormCasePage').then((m) => ({ default: m.BlackFormCasePage })),
);
const JuniorCasePage = lazy(() =>
  import('../pages/JuniorCasePage').then((m) => ({ default: m.JuniorCasePage })),
);
const PromoDebitCasePage = lazy(() =>
  import('../pages/PromoDebitCasePage').then((m) => ({ default: m.PromoDebitCasePage })),
);
const MarketingSmeCasePage = lazy(() =>
  import('../pages/MarketingSmeCasePage').then((m) => ({ default: m.MarketingSmeCasePage })),
);
const DesignProcessesCasePage = lazy(() =>
  import('../pages/DesignProcessesCasePage').then((m) => ({
    default: m.DesignProcessesCasePage,
  })),
);
const VisualsAiCasePage = lazy(() =>
  import('../pages/VisualsAiCasePage').then((m) => ({ default: m.VisualsAiCasePage })),
);
const DolyameArticlesCasePage = lazy(() =>
  import('../pages/DolyameArticlesCasePage').then((m) => ({
    default: m.DolyameArticlesCasePage,
  })),
);
const AiSpeechCasePage = lazy(() =>
  import('../pages/AiSpeechCasePage').then((m) => ({ default: m.AiSpeechCasePage })),
);
const TSyncAiCasePage = lazy(() =>
  import('../pages/TSyncAiCasePage').then((m) => ({ default: m.TSyncAiCasePage })),
);
const CeramicsAiCasePage = lazy(() =>
  import('../pages/CeramicsAiCasePage').then((m) => ({ default: m.CeramicsAiCasePage })),
);
const LampsCasePage = lazy(() =>
  import('../pages/LampsCasePage').then((m) => ({ default: m.LampsCasePage })),
);
const CosplayCasePage = lazy(() =>
  import('../pages/CosplayCasePage').then((m) => ({ default: m.CosplayCasePage })),
);
const DashboardCasePage = lazy(() =>
  import('../pages/DashboardCasePage').then((m) => ({ default: m.DashboardCasePage })),
);
const MayakovskyCasePage = lazy(() =>
  import('../pages/MayakovskyCasePage').then((m) => ({ default: m.MayakovskyCasePage })),
);
const ModelsShowCasePage = lazy(() =>
  import('../pages/ModelsShowCasePage').then((m) => ({ default: m.ModelsShowCasePage })),
);
const IslandCasePage = lazy(() =>
  import('../pages/IslandCasePage').then((m) => ({ default: m.IslandCasePage })),
);
const MashaSecretaryCasePage = lazy(() =>
  import('../pages/MashaSecretaryCasePage').then((m) => ({
    default: m.MashaSecretaryCasePage,
  })),
);
const ReelarcCasePage = lazy(() =>
  import('../pages/ReelarcCasePage').then((m) => ({ default: m.ReelarcCasePage })),
);
const AutoRentCasePage = lazy(() =>
  import('../pages/AutoRentCasePage').then((m) => ({ default: m.AutoRentCasePage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'policy',
        element: (
          <Suspense fallback={null}>
            <PolicyPage />
          </Suspense>
        ),
      },
      {
        path: 'cases/duplicates',
        element: (
          <Suspense fallback={null}>
            <DuplicateApplicationsCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/black',
        element: (
          <Suspense fallback={null}>
            <BlackFormCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/junior',
        element: (
          <Suspense fallback={null}>
            <JuniorCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/promo-debit',
        element: (
          <Suspense fallback={null}>
            <PromoDebitCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/marketing-sme',
        element: (
          <Suspense fallback={null}>
            <MarketingSmeCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/design-processes',
        element: (
          <Suspense fallback={null}>
            <DesignProcessesCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/visuals-ai',
        element: (
          <Suspense fallback={null}>
            <VisualsAiCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/dolyame-articles',
        element: (
          <Suspense fallback={null}>
            <DolyameArticlesCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/ai-speech',
        element: (
          <Suspense fallback={null}>
            <AiSpeechCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/tsync-ai',
        element: (
          <Suspense fallback={null}>
            <TSyncAiCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/ceramics-ai',
        element: (
          <Suspense fallback={null}>
            <CeramicsAiCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/lamps',
        element: (
          <Suspense fallback={null}>
            <LampsCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/cosplay',
        element: (
          <Suspense fallback={null}>
            <CosplayCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/dashboard',
        element: (
          <Suspense fallback={null}>
            <DashboardCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/mayakovsky',
        element: (
          <Suspense fallback={null}>
            <MayakovskyCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/models-show',
        element: (
          <Suspense fallback={null}>
            <ModelsShowCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/island',
        element: (
          <Suspense fallback={null}>
            <IslandCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/masha-secretary',
        element: (
          <Suspense fallback={null}>
            <MashaSecretaryCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/reelarc',
        element: (
          <Suspense fallback={null}>
            <ReelarcCasePage />
          </Suspense>
        ),
      },
      {
        path: 'cases/autorent',
        element: (
          <Suspense fallback={null}>
            <AutoRentCasePage />
          </Suspense>
        ),
      },
      {
        path: '*',
        handle: { isNotFoundPage: true },
        element: (
          <Suspense fallback={null}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
