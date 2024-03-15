import { check } from 'k6';
import http from 'k6/http';

import { EnvironmentConfigurations } from './configurations';
import { getClientApi } from './graphql';
import { Call } from '../graphql/support/call';
import { Proposal } from '../graphql/support/proposal';
import { Template } from '../graphql/support/template';
import { SharedData } from '../utils/sharedType';

export function sc1TearDown(
  sharedData: SharedData,
  environmentConfig: EnvironmentConfigurations
) {
  const apiClient = getClientApi(
    sharedData.graphqlUrl,
    environmentConfig.GRAPHQL_TOKEN
  );
  const proposal = new Proposal(apiClient);
  const template = new Template(apiClient);

  console.log('Cleaning proposals');
  proposal.deleteCallProposals(sharedData.testCall.id);

  const call = new Call(apiClient);
  console.log('Cleaning up test call');

  call.deleteCall(sharedData.testCall.id);

  console.log('Cleaning up call template');

  template.deleteTemplate(sharedData.testCall.templateId);

  console.log('Cleaning up user set up');

  const response = http.del(`${sharedData.userSetupBaseUrl}/`, null, {});

  check(response, {
    'User setup clean up successful': (r) => r.status === 204, // Expected status code for successful deletion
  });
}
