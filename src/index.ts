import type { Plugin } from 'vite'
import type { StarterOptions } from './typing'

const VitePluginCssInjectedBundle = (options?: StarterOptions): Plugin => {
  let styleCode = ''
  return {
    name: 'vite-plugin-css-injected-bundle',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const key in bundle) {
        // 获取chunk
        const chunk = bundle[key]
        // 以css结尾的文件，获取样式内容，删除样式配置
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          styleCode += chunk.source
          delete bundle[key]
        }
      }
      // 对获取的样式进行处理，提取到header
      for (const key in bundle) {
        // 获取chunk
        const chunk = bundle[key]
        if (chunk.type === 'chunk' && chunk.fileName.match(/.[cm]?js$/) !== null && !chunk.fileName.includes('polyfill')) {
          // 将样式保存到header，至于编译结果文件前面
          const initialCode = chunk.code
          // 重新赋值
          chunk.code = `
          (function(){ 
            try {
              var elementStyle = document.createElement('style'); 
              elementStyle.appendChild(document.createTextNode(${JSON.stringify(styleCode.trim())}));
            ${
  options?.styleId ? `elementStyle.id = '${options?.styleId}'` : ''
}
              document.head.appendChild(elementStyle);
            } catch(e) {
              console.error(\'vite-plugin-css-injected-bundle\', e);
            } 
          })();
          `
          // 拼接原有代码
          chunk.code += initialCode
          // 插入完成即结束
          break
        }
      }
    },
  }
}

export {
  VitePluginCssInjectedBundle,
}

export default VitePluginCssInjectedBundle
