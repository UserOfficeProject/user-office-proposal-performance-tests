import { EnvironmentConfigurations } from './configurations';
import { getAsyncClientApi } from './graphql';
import { Proposal } from '../graphql/support/proposal';
import { SharedData } from '../utils/sharedType';
import { FAP } from '../graphql/support/fap';
import { UserRole } from '../graphql/generated/graphql';

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

  if (environmentConfig.SETUP_TEST_REVIEWERS === 'true') {
    if (sharedData.fapReviewAssignments) {
      let memberRemoved;
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
      await new Promise((f) => setTimeout(f, 1000));
      const fapId = sharedData.fapReviewAssignments[0].fapId;
      const userIds = sharedData.fapReviewAssignments.map((a) => a.memberId);
      const uniqueUserIds = new Set(userIds);
      uniqueUserIds.forEach(async (a) => {
        console.log(`Going to remove member ${a} from fap ${fapId}`);
        memberRemoved = await fap.removeMemberFromFap(
          a,
          fapId,
          UserRole.FapReviewer
        );
      });
      await new Promise((f) => setTimeout(f, 1000));
      if (memberRemoved) {
        let proposalPks = sharedData.fapReviewAssignments?.map(
          (a) => a.proposalPk
        );
        console.log(`Going to change status of proposals ${proposalPks}`);
        let statusChanged = await proposal.changeProposalsStatus(
          proposalPks,
          Number(__ENV.SUBMITTED_STATUS_ID)
        );
        if (statusChanged)
          await proposal.removeProposalsFromInstrument(proposalPks);
      }
    }
    return;
  }
}
