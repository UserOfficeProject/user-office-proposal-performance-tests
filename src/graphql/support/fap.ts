import { check, fail } from 'k6';
import exec from 'k6/execution';

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
          !!responseData?.data?.assignReviewersToFap.id &&
          true,
      })
    ) {
      fail(`SCENARIO: ${exec.scenario.name} Executing class FAP.assignReviewersToFap VU_ID: ${exec.vu.idInTest}
            Error response assignReviewersToFap ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
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

    const responseData = response.json() as FapQueryResponse;
    if (
      !check(response, {
        'Reviewers assigned to proposals': (r) =>
          r.status === 200 &&
          !!responseData?.data?.assignFapReviewersToProposals.id &&
          true,
      })
    ) {
      fail(`SCENARIO: ${exec.scenario.name} Executing class FAP.assignFapReviewersToProposals VU_ID: ${exec.vu.idInTest}
            Error response assignFapReviewersToProposals ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
    }
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

    const responseData = response.json() as FapQueryResponse;
    if (
      !check(response, {
        'Remove reviewers from proposals': (r) =>
          r.status === 200 &&
          !!responseData?.data?.removeMemberFromFapProposal.id &&
          true,
      })
    ) {
      fail(`SCENARIO: ${exec.scenario.name} Executing class FAP.removeMemberFromFapProposal VU_ID: ${exec.vu.idInTest}
            Error response removeMemberFromFapProposal ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
    }
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

    const responseData = response.json() as FapQueryResponse;
    if (
      !check(response, {
        'Remove reviewers from fap': (r) =>
          r.status === 200 &&
          !!responseData?.data?.removeMemberFromFap.id &&
          true,
      })
    ) {
      fail(`SCENARIO: ${exec.scenario.name} Executing class FAP.removeMemberFromFap VU_ID: ${exec.vu.idInTest}
            Error response removeMemberFromFap ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
    }
    return responseData.data.removeMemberFromFap;
  }
}
