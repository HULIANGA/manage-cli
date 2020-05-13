#!/usr/bin/env node
const { Command } = require('commander')
const program = new Command()

const create = require('../src/create')

program
  .version(`zhizh-cli ${require('../package').version}`)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .action((name, cmd) => {
    create(name)
  })

program.parse(process.argv);