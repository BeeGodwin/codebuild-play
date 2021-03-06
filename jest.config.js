module.exports = {
    collectCoverageFrom: [
        'src/components/**/*.js',
        'src/core/**/*.js',
        '!src/assets/**/*.js',
    ],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            lines: 100,
            functions: 100,
        },
    },
    //coverageProvider: "v8",
    testEnvironment: 'jsdom',
    modulePathIgnorePatterns: ['/.node_modules.+/'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.node_modules.+/',
        '.node_modules_production',
    ],
    setupFilesAfterEnv: ['./test/set-up-jest.js'],
    transform: { '^.+\\.m?js$': 'babel-jest' },
    transformIgnorePatterns: ['node_modules/(?!(bowser|json5|crel)/)'],
};
