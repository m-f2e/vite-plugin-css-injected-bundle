# vite-plugin-starter

## 技术栈
* vite
* unbuild
* vitest
* playground
* husky

## 安装
```shell
npm i @m-f2e/vite-plugin-css-injected-bundle
```

## 使用
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePluginCssInjectedBundle } from '../src'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePluginCssInjectedBundle(),
  ],
  resolve: {
    alias: {
      '@': '.',
    },
  },
})
```

## 项目

### test

```shell
pnpm test
```

### build

```shell
pnpm build
pnpm stub
```

### playground

```shell
pnpm dev:playground
pnpm build:playground
pnpm preview
```