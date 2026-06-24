# Microfrontends Demo

This project is a small React and Webpack Module Federation demo with two independently served apps:

| App | URL | Responsibility |
| --- | --- | --- |
| `header-app` | `http://localhost:3000` | Exposes the shared `Header` component |
| `home-app` | `http://localhost:3001` | Hosts the gallery page and consumes `header-app/Header` |

## Project Structure

```text
microfrontends-demo/
  header-app/
    src/Header.jsx
    webpack.config.js
  home-app/
    src/App.jsx
    webpack.config.js
```

## Prerequisites

- Node.js
- npm

## Install Dependencies

Install dependencies separately in each app:

```bash
cd header-app
npm install

cd ../home-app
npm install
```

## Run the Apps

Start the remote app first:

```bash
cd header-app
npm start
```

Then start the host app in another terminal:

```bash
cd home-app
npm start
```

Open the host app at:

```text
http://localhost:3001
```

The host loads the remote header from:

```text
http://localhost:3000/remoteEntry.js
```

## Module Federation Setup

`header-app` exposes:

```js
exposes: {
  './Header': './src/Header.jsx',
}
```

`home-app` consumes it through:

```js
remotes: {
  headerApp: 'headerApp@http://localhost:3000/remoteEntry.js',
}
```

And imports it with:

```js
const Header = lazy(() => import('headerApp/Header'));
```

## Build

Build each app separately:

```bash
cd header-app
npm run build

cd ../home-app
npm run build
```

## Troubleshooting

If `home-app` shows a `Loading script failed` error for `remoteEntry.js`, check that:

- `header-app` is running on port `3000`.
- `home-app` is running on port `3001`.
- `http://localhost:3000/remoteEntry.js` returns JavaScript in the browser.
- The remote name is `headerApp` in both apps.
