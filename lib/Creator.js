const path = require('path')
const chalk = require('chalk')
const log = console.log;
const ora = require('ora')
const spinner = ora()
const copyFolder = require('./copyFolder')
const execa = require('execa')

const {
  hasYarn,
  hasGit
} = require('./utils')

module.exports = class Creator {
  constructor (name, context) {
    this.name = name
    this.context = context
    this.templatePath = path.join(__dirname, '../template')
  }

  async create () {
    log(`创建目录：${chalk.yellow(this.context)}`)
    log(`项目名称：${chalk.yellow(this.name)}`)
    spinner.text = '开始初始化项目代码'
    spinner.start()
    try {
      copyFolder(this.templatePath, this.context, true)
      spinner.succeed(`${chalk.green('代码初始化完成')}`)
    } catch (e) {
      spinner.fail(`${chalk.red('代码初始化失败')}`)
      throw e
    }
    log(`⚙\u{fe0f}  开始安装依赖包`)
    const packageManager = hasYarn() ? 'yarn' : 'npm'
    try {
      const installCmd = packageManager === 'yarn' ? 'yarn' : 'npm install'
      await execa.command(installCmd, {
        cwd: this.context,
        stdio: ['inherit', 'inherit', 'inherit']
      })
      log('\n');
      spinner.succeed(`${chalk.green('依赖包安装完成')}`)
      log(`👉 输入以下命令启动项目:\n` + chalk.cyan(` ${chalk.gray('$')} cd ${this.name}\n` + chalk.cyan(` ${chalk.gray('$')} ${packageManager} start\n`)))
    } catch (e) {
      spinner.fail(`${chalk.red('依赖包安装失败')}`)
      throw e
    }
  }
}