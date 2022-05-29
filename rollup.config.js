import path from 'path'
import typescript from 'rollup-plugin-typescript2'


export default {
    input: path.resolve(__dirname, 'lib/IdleTs.ts'),
    output: {
        file: path.resolve(__dirname, `dist/idle-ts.dts.js`),
        format: 'es',
        externalLiveBindings: false
    },
    external: [
        // external modules
    ],
    plugins: [
        typescript({
            check: true,
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            tsconfigOverride: {
                compilerOptions: {
                    sourceMap: false,
                    declaration: true,
                    declarationMap: true
                },
                exclude: ['**/__tests__']
            }
        })
    ]
}