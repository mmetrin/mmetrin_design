const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const caseAssetOrigin = import.meta.env.VITE_CASE_ASSET_ORIGIN?.replace(/\/$/, '');

export const publicPath = (path: string) => {
  const normalizedPath = `/${path.replace(/^\//, '')}`;

  if (caseAssetOrigin && normalizedPath.startsWith('/images/cases/')) {
    return `${caseAssetOrigin}${normalizedPath}`;
  }

  return `${basePath}${normalizedPath}`;
};
