const fs = require('fs')
const path = require('path')
const log = console.log;

/**
 * 复制文件夹
 * @param {复制文件路径} copiedPath 
 * @param {目标路径} resultPath 
 * @param {是否绝对路径} direct 
 */
module.exports = function copyFolder(copiedPath, resultPath, direct) {
  if(!direct) {
      copiedPath = path.join(__dirname, copiedPath)
      resultPath = path.join(__dirname, resultPath)
  }

  function createDir (dirPath) {
      fs.mkdirSync(dirPath)        
  }

  if (fs.existsSync(copiedPath)) {
      createDir(resultPath)
      /**
       * @des 方式一：利用子进程操作命令行方式
       */
      // child_process.spawn('cp', ['-r', copiedPath, resultPath])

      /**
       * @des 方式二：
       */
      const files = fs.readdirSync(copiedPath, { withFileTypes: true });
      for (let i = 0; i < files.length; i++) {
          const cf = files[i]
          const ccp = path.join(copiedPath, cf.name)
          const crp = path.join(resultPath, cf.name)  
          if (cf.isFile()) {
              /**
               * @des 创建文件,使用流的形式可以读写大文件
               */
              const readStream = fs.createReadStream(ccp)
              const writeStream = fs.createWriteStream(crp)
              readStream.pipe(writeStream)
          } else {
              try {
                  /**
                   * @des 判断读(R_OK | W_OK)写权限
                   */
                  fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
                  copyFolder(ccp, crp, true)
              } catch (error) {
                log('folder write error:', error);
              }

          }
      }
  } else {
    log('do not exist path: ', copiedPath);
  }
}