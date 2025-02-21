import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from '../../utils/helperFunctions';

const proposalLookUpToken = __ENV.PROPOSAL_LOOKUP_TOKEN;
const proposalLookUpUrl = __ENV.PROPOSAL_LOOKUP_URL;
const testData = {
  isis: {
    facility: 'ISIS',
    rounds: [
      { roundName: '2018_2', instruments: ['ARGUS', 'IMAT', 'VESUVIO'] },
      {
        roundName: '2019_2',
        instruments: ['ARGUS'],
      },
      {
        roundName: '2020_2',
        instruments: ['ARGUS', 'INTER', 'LARMOR', 'INES', 'CHRONUS'],
      },
      {
        roundName: '2021_1',
        instruments: ['ARGUS'],
      },
      {
        roundName: '2022_2',
        instruments: ['ARGUS'],
      },
    ],
  },
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
      preAllocatedVUs: +__ENV.K6_PRE_ALLOCATED_VUS || 10,
      maxVUs: +__ENV.K6_MAX_VUS || 100,
    },
  },
};

export default async function () {
  const round =
    testData.isis.rounds[randomIntBetween(0, testData.isis.rounds.length - 1)];
  const soapReqBody = `
  <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getExperimentSummariesFromOracleByFilter xmlns="http://service.proposal/">
            <token xmlns="">${proposalLookUpToken}</token>
            <!-- Optional -->
            <filter xmlns="">
                <facilityList>${testData.isis.facility}</facilityList>
                <instrumentNameList>${round.instruments[randomIntBetween(0, round.instruments.length - 1)]}</instrumentNameList>
            </filter>
        </getExperimentSummariesFromOracleByFilter>
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
    'Facility id present': (r) =>
      r.body?.toString().indexOf(`${testData.isis.facility}`) !== -1,
  });
  sleep(10);
}
