module.exports = {
    roots: ['<rootDir>/src'], // Points to the src directory in the frontend
    testEnvironment: 'jsdom', // This is the default environment for testing React components
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform JSX/JS files
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS/LESS imports
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist directories
  };
  