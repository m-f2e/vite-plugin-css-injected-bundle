import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  externals: ['vite'],
  declaration: true, // 生成类型定义
  clean: true, // 打包前清除
  failOnWarn: false, // 警告是否会引发报错
  rollup: {
    emitCJS: true, // 生成commonjs
    esbuild: {
      minify: false, // 压缩代码
    },
  },
})
