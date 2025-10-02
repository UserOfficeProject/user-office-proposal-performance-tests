import { AsyncClientApi, Fap } from '../../utils/sharedType';
import { executeGraphqlQuery } from '../../support/graphql';
import {
  AssignChairOrSecretaryDocument,
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

  async assignChairOrSecretary(
    fapId: number,
    roleId: UserRole,
    userId: number
  ): Promise<Fap> {
    const response = await executeGraphqlQuery(
      this.apiAsyncClient,
      AssignChairOrSecretaryDocument,
      {
        assignChairOrSecretaryToFapInput: {
          fapId: fapId,
          roleId: roleId,
          userId: userId,
        },
      }
    );
    if (!response) {
      throw new Error('Fail to assign chair or secretary to FAP ${');
    }
    return response.assignChairOrSecretary;
  }

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
      const toReturn: Fap = {
        id: fapMembers[0].fapId,
      };
      return toReturn;
    } else {
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
  ): Promise<boolean> {
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
    const response = await executeGraphqlQuery(
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
    );
    if (!response) {
      throw new Error('Fail to assign fap reviewers to proposals');
    }
    return response.assignFapReviewersToProposals;
  }

  async removeMemberFromFapProposal(
    memberId: number,
    fapId: number,
    proposalPk: number
  ): Promise<Fap> {
    const response = await executeGraphqlQuery(
      this.apiAsyncClient,
      RemoveMemberFromFapProposalDocument,
      {
        memberId: memberId,
        fapId: fapId,
        proposalPk: proposalPk,
      }
    );
    if (!response) {
      throw new Error('Fail to remove fap reviewer from proposal');
    }
    return response.removeMemberFromFapProposal;
  }

  async removeMemberFromFap(
    memberId: number,
    fapId: number,
    roleId: UserRole
  ): Promise<Fap> {
    const response = await executeGraphqlQuery(
      this.apiAsyncClient,
      RemoveMemberFromFapDocument,
      {
        memberId: memberId,
        fapId: fapId,
        roleId: roleId,
      }
    );
    if (!response) {
      throw new Error(`Failed to remove reviewer ${memberId} from FAP`);
    }
    return response.removeMemberFromFap;
  }
}
