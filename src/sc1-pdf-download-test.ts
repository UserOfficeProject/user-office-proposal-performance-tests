import { check, sleep } from 'k6';
import http from 'k6/http';

import { getEnvironmentConfigurations } from './support/configurations';
import { generateBearerToken } from './support/graphql';
import { sc1Setup } from './support/setup';
import { randomIntBetween } from './utils/helperFunctions';
import { SharedData } from './utils/sharedType';
const environmentConfig = getEnvironmentConfigurations();
const proposals = [
  '1510294',
  '1510478',
  '1510113',
  '1510448',
  '1510325',
  '1510320',
  '1510388',
  '1520043',
  '1520195',
  '1520099',
  '1510477',
  '1510576',
  '1510512',
  '1510167',
  '1510541',
  '1510558',
  '1510418',
  '1510244',
  '1510365',
  '1510631',
  '1510161',
  '1510059',
  '1510549',
  '1510568',
  '1510302',
  '1510621',
  '1510093',
  '1510569',
  '1510119',
  '1510028',
  '1510028',
  '1510410',
  '1510628',
  '1510199',
  '1510007',
  '1510359',
  '1510356',
  '1510439',
  '1510627',
  '1500017',
  '1510051',
  '1510346',
  '1510605',
  '1510577',
  '1510373',
  '1510399',
  '1510445',
  '1510252',
  '1510252',
  '1510252',
  '1500023',
  '1510401',
  '1510341',
  '1510027',
  '1510255',
  '1510064',
  '1520170',
  '1520018',
  '1510448',
  '1520240',
  '1520208',
  '1520215',
  '1510463',
];
export const options = {
  discardResponseBodies: false,
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
    contacts: {
      executor: 'shared-iterations',
      vus: 50,
      iterations: 250,
      maxDuration: '200s',
    },
  },
};
export async function setup() {
  return await sc1Setup(environmentConfig);
}
export default function (sharedData: SharedData) {
  const proposal = proposals[randomIntBetween(0, proposals.length - 1)];
  sleep(5);
  const headers = {
    authorization: generateBearerToken(environmentConfig.GRAPHQL_TOKEN),
    'Content-Type': 'application/json',
  };
  const response = http.get(
    `${sharedData.browserBaseUrl}/download/pdf/proposal/${proposal}?filter=id`,
    { headers: headers }
  );
  check(response, {
    'Check if successful': (res) =>
      res.headers['Content-Type'] === 'application/pdf',
  });
}
