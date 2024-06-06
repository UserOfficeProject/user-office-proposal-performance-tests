import { EnvironmentConfigurations } from './configurations';
import { getClientApi } from './graphql';
import { UserDataSource } from './userDataSource';
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
  const proposal = new Proposal(apiClient);
  const template = new Template(apiClient);
  const instrument = new Instrument(apiClient);

  console.log('Cleaning proposals');
  proposal.deleteCallProposals(sharedData.testCall.id);

  const call = new Call(apiClient);

  console.log('Cleaning up call instruments');

  if (sharedData.testCall.instruments.length > 0) {
    sharedData.testCall.instruments.forEach((inst) => {
      call.removeAssignedInstrumentFromCall(sharedData.testCall.id, inst.id);
      instrument.deleteInstrument(inst.id);
    });
  }
  console.log('Cleaning up test call');

  call.deleteCall(sharedData.testCall.id);

  console.log('Cleaning up call template');

  template.deleteTemplate(sharedData.testCall.templateId);

  console.log('Cleaning up user set up');

  const usersDataSource = new UserDataSource(
    environmentConfig.USER_DB_USERNAME,
    environmentConfig.USER_DB_PASSWORD,
    environmentConfig.USER_DB_CONNECTION_STRING
  );
  await usersDataSource.deleteUsersBetween(
    environmentConfig.USER_STARTING_ID,
    environmentConfig.USER_STARTING_ID + environmentConfig.SETUP_TOTAL_USERS
  );
}
