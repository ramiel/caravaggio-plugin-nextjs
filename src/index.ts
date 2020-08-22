import type {
  PluginConstructor,
  Plugin,
} from 'caravaggio/dist/pluginLoader/pluginLoader';

interface NextJSPluginOptions {
  baseUrl: string;
}

const nextJSPlugin: PluginConstructor<NextJSPluginOptions> = (opt) => {
  const { pluginOptions: { baseUrl } = {} } = opt;

  const plugin: Plugin = {
    urlTransform: async (url, req) => {
      let base: string;
      if (baseUrl) {
        base = baseUrl;
      } else {
        if (process.env.VERCEL_URL) {
          base =
            process.env.NODE_ENV === 'production'
              ? `https://${process.env.VERCEL_URL}`
              : `http://${process.env.VERCEL_URL}`;
        } else {
          base =
            process.env.NODE_ENV === 'production'
              ? `https://${req.headers.host}`
              : `http://${req.headers.host}`;
        }
      }
      if (url.startsWith('/')) {
        const final = new URL(url, base).toString();
        return final;
      }
      return url;
    },
  };

  return plugin;
};

export default nextJSPlugin;
