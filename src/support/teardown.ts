import { sleep } from 'k6';

import { EnvironmentConfigurations } from './configurations';
import { getClientApi } from './graphql';
import { Call } from '../graphql/support/call';
import { Instrument } from '../graphql/support/instrument';
import { Proposal } from '../graphql/support/proposal';
import { Template } from '../graphql/support/template';
import { SharedData } from '../utils/sharedType';

export async function sc1TearDown(
  sharedData: SharedData,
  environmentConfig: EnvironmentConfigurations
) {
  const apiClient = getClientApi(
    sharedData.graphqlUrl,
    environmentConfig.GRAPHQL_TOKEN
  );

  if (!sharedData.testCall) {
    return;
  }
  const proposal = new Proposal(apiClient);
  const template = new Template(apiClient);
  const instrument = new Instrument(apiClient);

  console.log('Cleaning proposals');
  proposal.deleteCallProposals(sharedData.testCall.id);

  if (__ENV.TEST_SETUP_CALL_ID) {
    return;
  }
  const call = new Call(apiClient);

  console.log('Cleaning up call instruments');

  if (sharedData.testCall.instruments.length > 0) {
    sharedData.testCall.instruments.forEach((inst) => {
      if (sharedData.testCall) {
        call.removeAssignedInstrumentFromCall(sharedData.testCall.id, inst.id);
        sleep(5);
        instrument.deleteInstrument(inst.id);
      }
    });
  }
  console.log('Cleaning up test call');

  call.deleteCall(sharedData.testCall.id);

  console.log('Cleaning up call template');

  template.deleteTemplate(sharedData.testCall.templateId);
}
