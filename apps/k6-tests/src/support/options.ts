import { Options } from 'k6/options';

export function getDevelopmentOption(
  browserVus?: number,
  browserIterations?: number,
  graphqlVus?: number,
  graphqlIterations?: number
): Options {
  return {
    summaryTrendStats: [
      'avg',
      'min',
      'med',
      'max',
      'p(95)',
      'p(99)',
      'p(99.99)',
      'count',
    ],
    thresholds: {
      browser_http_req_failed: [
        {
          threshold: 'rate <= 0.05',
          abortOnFail: true,
        },
      ],
    },
    scenarios: {
      SC1_BROWSER: {
        exec: 'browserTests',
        executor: 'per-vu-iterations',
        vus: browserVus || 10,
        iterations: browserIterations || 1,
        options: {
          browser: {
            type: 'chromium',
          },
        },
      },
      SC1_GRAPHQL: {
        exec: 'graphqlTests',
        executor: 'per-vu-iterations',
        vus: graphqlVus || 50,
        iterations: graphqlIterations || 1,
        maxDuration: '580s',
      },
    },
  };
}

export function getProductionOption(
  browserVus?: number,
  browserIterations?: number,
  graphqlVus?: number,
  graphqlIterations?: number
): Options {
  return {
    summaryTrendStats: [
      'avg',
      'min',
      'med',
      'max',
      'p(95)',
      'p(99)',
      'p(99.99)',
      'count',
    ],
    thresholds: {
      browser_http_req_failed: [
        {
          threshold: 'rate <= 0.05',
          abortOnFail: true,
        },
      ],
    },
    scenarios: {
      SC1_BROWSER: {
        exec: 'browserTests',
        executor: 'per-vu-iterations',
        vus: browserVus || 10,
        iterations: browserIterations || 1,
        options: {
          browser: {
            type: 'chromium',
          },
        },
      },
      SC1_GRAPHQL: {
        exec: 'graphqlTests',
        executor: 'per-vu-iterations',
        vus: graphqlVus || 50,
        iterations: graphqlIterations || 1,
        maxDuration: '580s',
      },
    },
  };
}
