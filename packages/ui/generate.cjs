const { join } = require('node:path')
const { readdirSync, writeFileSync } = require('node:fs')

function getDirectoryFileNames(folderPath, prefix) {
  let list = []
  const path = join(__dirname, './', folderPath)

  readdirSync(path).forEach((fileName) => {
    if (['index.vue', 'index.css'].includes(fileName)) return
    if (!fileName.endsWith('.vue')) {
      const subList = getDirectoryFileNames(`${folderPath}/${fileName}`, fileName)

      list = [...list, ...subList]
    } else {
      const fileNameWithPrefix = prefix ? `${prefix}/${fileName}` : fileName
      list.push(fileNameWithPrefix.replace('.vue', ''))
    }
  })

  return list
}

function writeDataToFile() {
  try {
    const icons = getDirectoryFileNames('components/icons')
    writeFileSync('icons.json', JSON.stringify({ icons }, null, '\t'))
  } catch (err) {
    console.error(err)
  }
}

writeDataToFile()
