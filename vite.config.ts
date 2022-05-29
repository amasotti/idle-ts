const path = require('path')
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/IdleTs.ts'),
            name: 'idle-ts',
            fileName: (format) => `idle-ts.${format}.js`
        }
    }
})