import typescript from 'rollup-plugin-typescript2';
let defaults = { compilerOptions: { declaration: true } };

export default [
    {
        input: 'src/index.browser.js',
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
        ]},
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',
            },
        ],
        plugins: [
            typescript({
                tsConfigDefaults: defaults
            })
        ]
    }
];
