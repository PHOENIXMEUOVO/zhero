const { readdirSync, statSync } = require('fs')

const { resolve } = require('path')

const testExtensionFile = file => ext => new RegExp(`.${ext}$`).test(file)

module.exports = class FileUtils {
  static requireDir (dir, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts
      opts = { filesOnly: ['js'], recursive: true }
    }

    const { recursive, filesOnly } = opts
    const files = readdirSync(dir)

    for (const file of files) {
      const fullPath = resolve(dir, file)

      if (recursive && statSync(fullPath).isDirectory()) {
        this.requireDir(fullPath, opts, callback)
      }

      if (filesOnly.some(testExtensionFile(file))) {
        try {
          const required = require(fullPath)
          callback(null, required, file)
        } catch (err) {
          callback(err, file, file)
        }
      }
    }
  }
}
