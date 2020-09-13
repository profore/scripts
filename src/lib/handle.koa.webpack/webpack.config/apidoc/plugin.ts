import path from 'path'
import { Compiler } from 'webpack'
import apidoc from 'apidoc'

export default class Apidoc {
  apply (compiler:Compiler):void {
    compiler.hooks.afterEmit.tap('apidoc', async () => {
      // apidoc
      await apidoc.createDoc({
        src: path.join(process.cwd(), '../src'),
        dest: path.join(process.cwd(), '../dist/apidoc')
      })
    })
  }
}
