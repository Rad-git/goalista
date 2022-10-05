module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run start',
        url: ['https://goalista.herokuapp.com'],
        numberOfRuns: 2,
        assert: {
            assertions: {
              'categories:performance': ['warn', {minScore: 1}],
              'categories:accessibility': ['error', {minScore: 1}]
            },
        }
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  }