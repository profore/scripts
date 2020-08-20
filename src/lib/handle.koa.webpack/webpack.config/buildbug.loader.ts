/**
 * 这里解决一些打包 bug
 *
 * 1.这个 warning 不解决会报 ERROR: require is not a function.
 * WARNING in ./node_modules/_formidable@1.2.2@formidable/lib/incoming_form.js 1:43-50
 * Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
 *  @ ./node_modules/_formidable@1.2.2@formidable/lib/index.js
 *  @ ./node_modules/_koa-body@4.2.0@koa-body/index.js
 *  @ ./src/router.js
 *  @ ./src/index.js
 *
 * 2.这个 warning 不解决也没啥问题
 * WARNING in ./node_modules/_any-promise@1.3.0@any-promise/register.js 24:14-37
 * Critical dependency: the request of a dependency is an expression
 *  @ ./node_modules/_any-promise@1.3.0@any-promise/index.js
 *  @ ./node_modules/_koa-compose@3.2.1@koa-compose/index.js
 *  @ ./node_modules/_koa-convert@1.2.0@koa-convert/index.js
 *  @ ./node_modules/_koa@2.13.0@koa/lib/application.js
 *  @ ./src/index.js
 *
 * 3.打包tablestore时遇到
 * Error: Cannot find module 'domain'
 * 原因是tablestore自己封装了一层require逻辑导致webpack不能识别模块
 * TableStore.util.nodeRequire('domain')
 * 改逻辑是用来判断是否是node环境, 这里注定是node环境,所以直接替换成
 * require('domain')
 */
export default (source:string):string => {
  return source
    .replace('require = GENTLY.hijack(require)', '')
    // .replace("const Promise = require('any-promise')", '')
    .replace("TableStore.util.nodeRequire('domain')", "require('domain')")
}
