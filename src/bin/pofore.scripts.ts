#!/usr/bin/env node

// 命令行参数解析
import { program } from 'commander'
// 大字报
import figlet from 'figlet'
// dev 业务逻辑
import libDev from '../lib/dev'
// build 业务逻辑
import libBuild from '../lib/build'
// deploy 业务逻辑
import libDeploy from '../lib/deploy'

// package.json
const packagejson = require('../../package.json')

// 无参数情况打印大字报
if (!process.argv[2]) {
  console.log(
    figlet.textSync(packagejson.name, {
      horizontalLayout: 'full'
    })
  )
}

// 返回版本号
program.version(`${packagejson.name} ${packagejson.version}`)

// dev 启动项目
program
  .command('dev <type>')
  .description('快速启动项目')
  .action(libDev)

// build 构建项目
program
  .command('build <type>')
  .description('自动构建项目')
  .action(libBuild)

// deploy 发布项目
program
  .command('deploy <type>')
  .description('自动发布项目')
  .action(libDeploy)

// 解析参数
program.parse(process.argv)
