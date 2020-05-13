const path = require('path')
const Creator = require('../lib/Creator')

async function create(projectName) {
  const targetDir = path.resolve(process.cwd(), projectName)
  const creator = new Creator(projectName, targetDir)
  creator.create()
}

module.exports = (...args) => {
  return create(...args)
}