import { AsyncClientApi, Fap } from '../../utils/sharedType';
import { executeGraphqlQuery } from '../../support/graphql';
import {
  AssignFapReviewersToProposalsDocument,
  AssignProposalsToFapsDocument,
  AssignReviewersToFapDocument,
  GetFapMembersDocument,
  RemoveMemberFromFapDocument,
  RemoveMemberFromFapProposalDocument,
  UserRole,
} from '../generated/graphql';

export class FAP {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async assignReviewersToFap(memberIds: number[], fapId: number): Promise<Fap> {
    const response = await executeGraphqlQuery(
      this.apiAsyncClient,
      GetFapMembersDocument,
      {
        fapId: fapId,
      }
    );
    if (!response) {
      throw new Error('Fail to get FAP members');
    }
    const fapMembers = response.fapMembers;
    if (fapMembers?.find((fapMember) => fapMember.userId === memberIds[0])) {
      var toReturn: Fap = {
        id: fapMembers[0].fapId,
      };
      console.error(`FAP already has member ${memberIds[0]}`);
      return toReturn;
    } else {
      console.error(`FAP has no member ${memberIds[0]}`);
      const response = await executeGraphqlQuery(
        this.apiAsyncClient,
        AssignReviewersToFapDocument,
        {
          memberIds: memberIds,
          fapId: fapId,
        }
      );
      if (!response) {
        throw new Error('Fail to assign reviewers to FAP');
      }
      return response.assignReviewersToFap;
    }
  }

  async assignProposalsToFaps(
    proposalPks: number[],
    fapId: number,
    instrumentId: number
  ): Promise<Boolean> {
    const assignProposalsToFaps = await executeGraphqlQuery(
      this.apiAsyncClient,
      AssignProposalsToFapsDocument,
      {
        proposalPks: proposalPks,
        fapInstruments: [
          {
            fapId,
            instrumentId,
          },
        ],
      }
    ).then((data) => {
      return data.assignProposalsToFaps;
    });
    if (!assignProposalsToFaps) {
      throw new Error('Fail to assign proposals to FAP');
    }
    return assignProposalsToFaps;
  }

  async assignFapReviewersToProposals(
    memberId: number,
    proposalPk: number,
    fapId: number
  ): Promise<Fap> {
    const assignFapReviewersToProposals = await executeGraphqlQuery(
      this.apiAsyncClient,
      AssignFapReviewersToProposalsDocument,
      {
        assignments: [
          {
            memberId,
            proposalPk,
          },
        ],
        fapId: fapId,
      }
    ).then((data) => {
      return data.assignFapReviewersToProposals;
    });
    if (!assignFapReviewersToProposals) {
      throw new Error('Fail to assign fap reviewers to proposals');
    }
    return assignFapReviewersToProposals;
  }

  async removeMemberFromFapProposal(
    memberId: number,
    fapId: number,
    proposalPk: number
  ): Promise<Fap> {
    const removeMemberFromFapProposal = await executeGraphqlQuery(
      this.apiAsyncClient,
      RemoveMemberFromFapProposalDocument,
      {
        memberId: memberId,
        fapId: fapId,
        proposalPk: proposalPk,
      }
    ).then((data) => {
      return data.removeMemberFromFapProposal;
    });
    if (!removeMemberFromFapProposal) {
      throw new Error('Fail to remove fap reviewer from proposal');
    }
    return removeMemberFromFapProposal;
  }

  async removeMemberFromFap(
    memberId: number,
    fapId: number,
    roleId: UserRole
  ): Promise<Fap> {
    const removeMemberFromFap = await executeGraphqlQuery(
      this.apiAsyncClient,
      RemoveMemberFromFapDocument,
      {
        memberId: memberId,
        fapId: fapId,
        roleId: roleId,
      }
    ).then((data) => {
      return data.removeMemberFromFap;
    });
    if (!removeMemberFromFap) {
      throw new Error('Failed to remove reviewer from FAP');
    }
    return removeMemberFromFap;
  }
}
