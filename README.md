# Caravaggio - NextJS

This plugin let you use caravaggio with NextJS in an easy way. It transforms any image relative url
to an absolute url for the current NextJS instance.

Any caravaggio url like this

```
https://mynextjs.com/api/assets/rs,s:300x?image=/logo.png
```

gets transformed into

```
https://mynextjs.com/api/assets/rs,s:300x?image=https://mynextjs.com/logo.png
```

For a complete description of how to use this plugin, read the article 
["NextJS + Caravaggio, serve images like a rockstar!"](https://ramielcreations.com/nextjs-images).

## Usage

Add this plugin to your Caravaggio instance

```js
// api/assets/[...params].js

import caravaggio from 'caravaggio';
import nextPlugin from 'caravaggio-plugin-nextjs';

const ONE_MONTH = 60 * 60 * 24 * 30;

export default caravaggio({
  basePath: '/api/assets',
  browserCache: `s-maxage=${ONE_MONTH}`,
  plugins: {
    plugins: [{
      name: 'nextjs',
      instance: nextPlugin()
    }]
  }
});
```

## Options

Various options can be passed to the plugin constructor

- __baseUrl__: optional. This plugin will do its best to understand where your NextJS app is hosted. 
  If you want to force this value pass `baseUrl`. It must be a complete url like `https://my-next.com`
- __protocol__: optional. You can pass `http` or `https` to force the protocol. If `baseUrl` is passed
  , this value is ignored. By default the plugin will check NODE_ENV value and it uses `https` if 
  it's `production`.

## How this works

This plugin will try to understand where your NextJS website is hosted. If you pass `baseUrl` options, it will be used,
otherwise it checks for `VERCEL_URL` value. If you setup this environment variable the plugin will use it. Otherwise it will
check the `host` header in the current request. To understand if it must use `http` or `https`, it will check
`protocol` if you pass it, otherwise it check the value of NODE_ENV and uses `https` if the variable is `production`.
