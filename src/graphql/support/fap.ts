import { check } from 'k6';

import {
  AsyncClientApi,
  Fap,
  FapQueryResponse,
  UserRole,
} from '../../utils/sharedType';

export class FAP {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async assignReviewersToFap(memberIds: number[], fapId: number): Promise<Fap> {
    const mutation = `
        mutation AssignReviewersToFap($memberIds: [Int!]!, $fapId: Int!) {
          assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {
            id
            code
            proposalCurrentCount
        }
    }`;
    const variables = {
      memberIds: memberIds,
      fapId: fapId,
    };

    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as FapQueryResponse;

    if (
      !check(response, {
        'Reviewers assigned to fap': (r) =>
          r.status === 200 &&
          !!responseData.data.assignReviewersToFap.id &&
          true,
      })
    ) {
      console.error('Failed to assign reviewers to fap', response.error);
    }

    return responseData?.data?.assignReviewersToFap as Fap;
  }

  async assignFapReviewersToProposals(
    memberId: number,
    proposalPk: number,
    fapId: number
  ): Promise<Fap> {
    const mutation = `mutation AssignFapReviewersToProposals($assignments: [FapReviewAssignmentInput!]!, $fapId: Int!) {
  assignFapReviewersToProposals(assignments: $assignments, fapId: $fapId) {
    id
  }
}`;
    const variables = {
      assignments: [
        {
          memberId,
          proposalPk,
        },
      ],
      fapId: fapId,
    };
    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    if (response.status !== 200) {
      console.error(
        `Error assigning FAP reviewer to proposals ${response.status} - ${response.body}`
      );
    }
    const responseData = response.json() as FapQueryResponse;
    return responseData.data.assignFapReviewersToProposals;
  }

  async removeMemberFromFapProposal(
    memberId: number,
    fapId: number,
    proposalPk: number
  ): Promise<Fap> {
    const mutation = `mutation RemoveMemberFromFapProposal($memberId: Int!, $fapId: Int!, $proposalPk: Int!) {
          removeMemberFromFapProposal(memberId: $memberId, fapId: $fapId, proposalPk: $proposalPk)  {
              id
          }
      }`;
    const variables = {
      memberId: memberId,
      fapId: fapId,
      proposalPk: proposalPk,
    };
    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    if (response.status !== 200) {
      console.error(
        `Error removing fap reviewer from proposal: response status - ${response.status} and response body - ${response.body}`
      );
    }
    const responseData = response.json() as FapQueryResponse;
    return responseData.data.removeMemberFromFapProposal;
  }

  async removeMemberFromFap(
    memberId: number,
    fapId: number,
    roleId: UserRole
  ): Promise<Fap> {
    const mutation = `mutation RemoveMemberFromFap($memberId: Int!, $fapId: Int!, $roleId: UserRole!) {
      removeMemberFromFap(memberId: $memberId, fapId: $fapId, roleId: $roleId) {
          id
        }
    }`;
    const variables = {
      memberId: memberId,
      fapId: fapId,
      roleId: roleId,
    };
    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    if (response.status !== 200) {
      console.error(
        `Error removing fap reviewer from fap: response status - ${response.status} and response body - ${response.body}`
      );
    }
    const responseData = response.json() as FapQueryResponse;
    return responseData.data.removeMemberFromFap;
  }
}
