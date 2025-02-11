import http from 'k6/http';
import { check, sleep } from 'k6';
import { executeGraphqlQuery, getAsyncClientApi } from '../../support/graphql';
import {
  GetProposalsWithCallInfoDocument,
  GetProposalsWithCallInfoQuery,
} from '../../graphql/generated/graphql';
import { getEnvironmentConfigurations } from '../../support/configurations';
import exec from 'k6/execution';
import { randomIntBetween } from '../../utils/helperFunctions';
const environmentConfig = getEnvironmentConfigurations();

const apiAsyncClient = getAsyncClientApi(
  environmentConfig.GRAPHQL_URL,
  environmentConfig.GRAPHQL_TOKEN
);
const proposalLookUpToken = __ENV.PROPOSAL_LOOKUP_TOKEN;
const proposalLookUpUrl = __ENV.PROPOSAL_LOOKUP_URL;
type TestData = {
  proposalsData: GetProposalsWithCallInfoQuery;
  facility: string;
};
export const options = {
  thresholds: {
    http_req_failed: [
      {
        threshold: 'rate <= 0.95',
        abortOnFail: true,
      },
    ],
    checks: ['rate>0.95'],
  },
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: +__ENV.K6_RATE || 50,
      timeUnit: __ENV.K6_TIME_UNIT || '30s',
      duration: __ENV.K6_DURATION || '5m',
      preAllocatedVUs: +__ENV.K6_PRE_ALLOCATED_VUS || 5,
      maxVUs: +__ENV.K6_MAX_VUS || 100,
    },
  },
};
export async function setup() {
  let facility = '';
  if (!__ENV.TEST_SETUP_CALL_ID) {
    console.error('Test Call ID not set');
    exec.test.abort();
  }
  const proposalsData = await executeGraphqlQuery(
    apiAsyncClient,
    GetProposalsWithCallInfoDocument,
    {
      filter: {
        callId: +__ENV.TEST_SETUP_CALL_ID,
      },
    }
  );
  if (
    !proposalsData.proposals?.proposals ||
    proposalsData.proposals?.proposals.length <= 0
  ) {
    console.error('Fail to get call proposals');
    exec.test.abort();
  }

  if (proposalsData.proposals?.proposals[0]) {
    const shortCode = proposalsData.proposals?.proposals[0].call?.shortCode
      .toString()
      .toLocaleUpperCase();
    if (shortCode?.includes('ISIS') || shortCode?.includes('XPRESS')) {
      facility = 'ISIS';
    } else if (
      shortCode?.includes('HPL') ||
      shortCode?.includes('ARTEMIS') ||
      shortCode?.includes('LSF')
    ) {
      facility = 'CLF';
    } else {
      console.error('Fail to get facility from call short code');
      exec.test.abort();
    }
  }
  return { proposalsData, facility } as TestData;
}

export default async function (sharedData: TestData) {
  const proposalIndex = sharedData.proposalsData.proposals?.proposals
    ? sharedData.proposalsData.proposals?.proposals.length - 1
    : 0;
  const proposal =
    sharedData.proposalsData.proposals?.proposals[
      randomIntBetween(0, proposalIndex)
    ];

  const soapReqBody = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getExperimentSummary xmlns="http://service.proposal/">
            <token xmlns="">${proposalLookUpToken}</token>
            <experimentNumber xmlns="">${proposal?.proposalId}</experimentNumber>
            <facility xmlns="">${sharedData.facility}</facility>
        </getExperimentSummary>
    </Body>
</Envelope>`;
  const res = await http.asyncRequest(
    'POST',
    `${proposalLookUpUrl}`,
    soapReqBody,
    {
      headers: { 'Content-Type': 'text/xml' },
    }
  );
  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Proposal id present': (r) =>
      r.body?.toString().indexOf(`${proposal?.proposalId}`) !== -1,
  });
  sleep(10);
}
