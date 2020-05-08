export default [{
    input: 'src/index.browser.js',
    output: [{
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'jsUtils',
    }, {
        file: 'dist/index.iffe.js',
        format: 'iife',
    }]
}];
