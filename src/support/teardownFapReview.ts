import { EnvironmentConfigurations } from './configurations';
import { getAsyncClientApi } from './graphql';
import { Proposal } from '../graphql/support/proposal';
import { SharedData } from '../utils/sharedType';
import { FAP } from '../graphql/support/fap';
import { UserRole } from '../graphql/generated/graphql';
import { sleep } from 'k6';

export async function sc1TearDownFapReview(
  sharedData: SharedData,
  environmentConfig: EnvironmentConfigurations
) {
  const apiAsyncClient = getAsyncClientApi(
    sharedData.graphqlUrl,
    environmentConfig.GRAPHQL_TOKEN
  );

  if (!sharedData.testCall) {
    return;
  }
  const proposal = new Proposal(apiAsyncClient);
  const fap = new FAP(apiAsyncClient);

  if (__ENV.FAP_PROCESS_LOAD_TEST === 'true') {
    if (sharedData.fapReviewAssignments) {
      sharedData.fapReviewAssignments.forEach(async (a) => {
        console.log(
          `Going to remove reviewer ${a.memberId} from proposal ${a.proposalPk} in fap ${a.fapId}`
        );
        await fap.removeMemberFromFapProposal(
          a.memberId,
          a.fapId,
          a.proposalPk
        );
      });
      sleep(10);
      const fapId = sharedData.fapReviewAssignments[0].fapId;
      const userIds = sharedData.fapReviewAssignments.map((a) => a.memberId);
      const uniqueUserIds = new Set(userIds);
      let role: UserRole;
      if (__ENV.FAP_MEMBER_ROLE === 'fapChair') role = UserRole.FapChair;
      else if (__ENV.FAP_MEMBER_ROLE === 'fapSecretary')
        role = UserRole.FapSecretary;
      else role = UserRole.FapReviewer;

      uniqueUserIds.forEach(async (a) => {
        console.log(`Going to remove member ${a} from fap ${fapId}`);
        await fap.removeMemberFromFap(a, fapId, role);
      });
      sleep(10);
      const proposalPks = sharedData.fapReviewAssignments?.map(
        (a) => a.proposalPk
      );
      console.log(`Going to change status of proposals ${proposalPks}`);
      const statusChanged = await proposal.changeProposalsStatus(
        proposalPks,
        Number(__ENV.SUBMITTED_STATUS_ID)
      );
      if (statusChanged)
        await proposal.removeProposalsFromInstrument(proposalPks);
    }
    return;
  }
}
