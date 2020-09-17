import type {
  PluginConstructor,
  Plugin,
} from 'caravaggio/dist/pluginLoader/pluginLoader';

interface NextJSPluginOptions {
  baseUrl?: string;
  protocol?: 'http' | 'https';
}

const nextJSPlugin = (
  opt: NextJSPluginOptions = {}
): PluginConstructor => () => {
  const { baseUrl, protocol } = opt;
  const finalProtocol =
    protocol || process.env.NODE_ENV === 'production' ? 'https' : 'http';

  let base: string;
  if (baseUrl) {
    base = baseUrl;
  } else {
    if (process.env.VERCEL_URL) {
      base = `${finalProtocol}://${process.env.VERCEL_URL}`;
    }
  }

  const plugin: Plugin = {
    urlTransform: async (url, req) => {
      if (url.startsWith('/')) {
        const finalBase = base || `${finalProtocol}://${req.headers.host}`;
        const final = new URL(url, finalBase).toString();
        return final;
      }
      return url;
    },
  };

  return plugin;
};

export default nextJSPlugin;
