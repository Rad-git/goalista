module.exports = {
    ci: {
      collect: {
        numberOfRuns: 2,
        startServerCommand: 'npm start',
        url: ['https://goalista.herokuapp.com/'],
        settings: {
          onlyCategories: [
            'performance',
            'accessibility',
            'best-practices',
            'seo',
          ],
          skipAudits: ['uses-http2'],
          chromeFlags: '--no-sandbox',
          extraHeaders: JSON.stringify({
            Cookie: 'customCookie=1;foo=bar',
          }),
        },
      },
      assert: {
        assertions: {
          'categories:performance': [
            'error',
            { minScore: 0.8, aggregationMethod: 'median-run' },
          ],
          'categories:accessibility': [
            'error',
            { minScore: 0.8, aggregationMethod: 'pessimistic' },
          ],
          'categories:best-practices': [
            'error',
            { minScore: 0.8, aggregationMethod: 'pessimistic' },
          ],
          'categories:seo': [
            'error',
            { minScore: 0.8, aggregationMethod: 'pessimistic' },
          ],
        },
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  }