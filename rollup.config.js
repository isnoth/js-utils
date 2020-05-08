export default [{
    input: 'src/index.browser.js',
    output: [{
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'window',
    }, {
        file: 'dist/index.iffe.js',
        format: 'iife',
        moduleName: 'window'
    }, {
        file: 'dist/index.amd.js',
        format: 'amd',
    },{
        file: 'dist/index.cjs.js',
        format: 'cjs',
    }
    ]
}];
