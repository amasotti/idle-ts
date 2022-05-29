const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')


async function main() {
    await execa('tsc', { stdio: 'inherit' })
    await execa('vite', ['build'], { stdio: 'inherit' })
    await execa('rollup', ['-c'], { stdio: 'inherit' })
    await fs.remove(path.resolve(__dirname,`dist/${name}.dts.js`))
}

main()
