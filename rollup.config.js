import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
let defaults = { compilerOptions: { declaration: true } };


export default [
    {
        input: 'src/index.browser.ts',
        output: [
            {
                file: 'dist/index.umd.js',
                format: 'umd',
                name: 'jsUtils', 
            }, 
            {
                file: 'dist/index.iife.js',
                format: 'iife',
                name: 'jsUtils',
                extend: true,
            },
            {
                file: 'dist/index.amd.js',
                format: 'amd',
            }
        ],
        plugins: [
            typescript({
                tsConfigDefaults: defaults
            }),
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',
            }
        ],
        plugins: [
            typescript({
                tsConfigDefaults: defaults,
                tsconfig: "tsconfig.json",
            }),
        ]
    },
    {
        input: "dist/index.d.ts",
        output: [{ file: "dist/index.cjs.d.ts", format: "es" }],
        plugins: [dts()],
    }
];
