import { Options } from 'k6/options';

export function getDevelopOption(
  browserVus?: number,
  browserIterations?: number,
  graphqlVus?: number,
  graphqlIterations?: number,
  browserReqFailThreshold?: string,
  httpReqFailThreshold?: string,
  proposalSubmittedFailThreshold?: string,
  checksFailThreshold?: string
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
          threshold: browserReqFailThreshold || 'rate <= 0.95',
          abortOnFail: true,
        },
      ],
      http_req_failed: [
        {
          threshold: httpReqFailThreshold || 'rate <= 0.95',
          abortOnFail: true,
        },
      ],
      proposals_submitted: [
        proposalSubmittedFailThreshold ||
          `count>=${0.9 * (browserVus || 10) * (browserIterations || 1)}`,
      ],
      checks: [checksFailThreshold || 'rate>0.90'],
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
  graphqlIterations?: number,
  browserReqFailThreshold?: string,
  httpReqFailThreshold?: string,
  proposalSubmittedFailThreshold?: string,
  checksFailThreshold?: string
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
          threshold: browserReqFailThreshold || 'rate <= 0.95',
          abortOnFail: true,
        },
      ],
      http_req_failed: [
        {
          threshold: httpReqFailThreshold || 'rate <= 0.95',
          abortOnFail: true,
        },
      ],
      proposals_submitted: [
        proposalSubmittedFailThreshold ||
          `count>=${0.9 * (browserVus || 10) * (browserIterations || 1)}`,
      ],
      checks: [checksFailThreshold || 'rate>0.90'],
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

export function getLocalOption(
  browserVus?: number,
  browserIterations?: number,
  graphqlVus?: number,
  graphqlIterations?: number,
  browserReqFailThreshold?: string,
  httpReqFailThreshold?: string,
  proposalSubmittedFailThreshold?: string,
  checksFailThreshold?: string
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
          threshold: browserReqFailThreshold || 'rate <= 0.95',
          abortOnFail: true,
        },
      ],
      http_req_failed: [
        {
          threshold: httpReqFailThreshold || 'rate <= 0.95',
          abortOnFail: true,
        },
      ],
      proposals_submitted: [
        proposalSubmittedFailThreshold ||
          `count>=${0.9 * (browserVus || 10) * (browserIterations || 1)}`,
      ],
      checks: [checksFailThreshold || 'rate>0.90'],
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
