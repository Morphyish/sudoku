module.exports = {
    moduleFileExtensions: ['js'],
    transform: {
        '^.+\\.(js)?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
        '<rootDir>/**/*.spec.js'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
