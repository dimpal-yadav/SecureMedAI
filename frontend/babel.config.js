module.exports = {
    sourceType: "unambiguous",
    presets: [
        ['@babel/preset-env', { modules: 'auto' }],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-transform-modules-commonjs'
    ]
};