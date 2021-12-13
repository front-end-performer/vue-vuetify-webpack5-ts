# 📦 VUE2 - Webpack5 - TS

Webpack 5 boilerplate using Babel, TypeScript, Sass.

## Installation

Clone this repo and npm install.

```bash
npm install
```

## Usage

### Development server

```bash
npm run start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

## Features

- [webpack5](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Sass](https://sass-lang.com/)

## Dependencies

### webpack

- [`webpack5`](https://github.com/webpack/webpack) - Module and asset bundler.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for webpack
- [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) - Development server for webpack
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development/production configuration

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript
- [`@vue/babel-preset-app`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) - This is the default Babel preset used in all Vue CLI projects. Note: this preset is meant to be used exclusively in projects created via Vue CLI and does not consider external use cases.
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Smart defaults for Babel

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Transpile files with Babel and webpack
- [`sass-loader`](https://webpack.js.org/loaders/sass-loader/) - Load SCSS and compile to CSS
  - [`sass`](https://www.npmjs.com/package/sass) - Node Sass
- [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - Process CSS with PostCSS
  - [`postcss-preset-env`](https://www.npmjs.com/package/postcss-preset-env) - Sensible defaults for PostCSS
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolve CSS imports
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM

### Plugins

- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - Copy files to build directory
- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files from template
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files
### SASS - Automatic Migration

```bash
$ npm install -g sass-migrator
$ sass-migrator division **/*.scss
```

### TS

- [`typescript`](https://github.com/microsoft/TypeScript) - TypeScript compiles to readable, standards-based JavaScript. 
- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint) - Monorepo for all the tooling which enables ESLint to support TypeScript
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser) - An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.
### Linters

- [`eslint`](https://github.com/eslint/eslint) - Enforce styleguide across application
- [`eslint-webpack-plugin`](https://github.com/webpack-contrib/eslint-webpack-plugin) - This plugin uses eslint to find and fix problems in your JavaScript code

## Author

- [FrontEndPerformer](https://frontendperformer.com/)

## License

LoveToCode
