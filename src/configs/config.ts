import * as localConfig from './env.local.json';
import * as devConfig from './env.dev.json';

export const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'Local':
      return localConfig;
      break;
    case 'Development':
      return devConfig;
      break;
    default:
      throw new Error(`Unsupported environment ${env}`);
  }
};
