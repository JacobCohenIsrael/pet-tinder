import * as localConfig from './env.local.json';

export const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'LOCAL':
      return localConfig;
      break;
    case 'DEVELOPMENT':
      return localConfig;
      break;
    default:
      throw new Error(`Unsupported environment ${env}`);
  }
};
