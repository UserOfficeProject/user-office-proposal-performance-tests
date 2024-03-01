import { check } from 'k6';

import {
  ClientResponse,
  ProposalQueryResponse,
  Proposal as ProposalType,
  ProposalsQueryResponse,
} from '../../utils/sharedType';

export class Proposal {
  constructor(private apiClient: (body: string) => ClientResponse) {}

  deleteProposal(proposalPk: number): number {
    const query = `
          mutation DeleteProposal($proposalPk: Int!) {
                deleteProposal(proposalPk: $proposalPk) {
                    callId
                    proposalId
                    primaryKey
                }
          }`;

    const variables = {
      proposalPk: proposalPk,
    };

    const response = this.apiClient(JSON.stringify({ query, variables }));
    const responseData = response.json() as ProposalQueryResponse;

    if (
      !check(response, {
        'Delete proposal': (r) =>
          r.status === 200 &&
          +responseData.data.deleteProposal.primaryKey === proposalPk,
      })
    ) {
      console.log('Proposal was not deleted', response.error);
    }

    return proposalPk;
  }

  private getProposals(callId: number): [ProposalType] {
    const query = `
          query getProposals($filter: ProposalsFilter) {
                proposals(filter: $filter) {
                    proposals {
                        primaryKey
                        proposalId
                        callId
                    }
                }
            }`;

    const variables = {
      filter: {
        callId: callId,
      },
    };

    const response = this.apiClient(JSON.stringify({ query, variables }));
    const responseData = response.json() as ProposalsQueryResponse;

    if (
      !check(response, {
        'Get proposals': (r) =>
          r.status === 200 && responseData.data.proposals.proposals.length > 0,
      })
    ) {
      console.log('Proposals where not found', response.error);
    }

    return responseData.data.proposals.proposals;
  }

  deleteCallProposals(callId: number): [ProposalType] {
    const proposals = this.getProposals(callId);

    const mutation = `
    mutation DeleteProposal($proposalPk: Int!) {
          deleteProposal(proposalPk: $proposalPk) {
              callId
              proposalId
              primaryKey
          }
    }`;

    const responses = proposals.map((proposal: ProposalType) =>
      this.apiClient(
        JSON.stringify({
          query: mutation,
          variables: { proposalPk: proposal.primaryKey },
        })
      )
    );

    // const sessionIds = await Promise.all(
    //   Array.from({ length: +number || 1 }, () => {
    //     const userId = userIdGenerator.next().value;
    //     if (userId) {
    //       return dataSource.createLoggedInUser(userId);
    //     }
    //   })
    // );

    // const sessionIds = await Promise.all(
    //   Array.from({ length: +number || 1 }, () => {
    //     const userId = userIdGenerator.next().value;
    //     if (userId) {
    //       return dataSource.createLoggedInUser(userId);
    //     }
    //   })
    // );

    responses.forEach((response, index) => {
      const proposalPK = proposals[index];
      if (response.status === 200) {
        console.log(
          `Successfully deleted proposal with proposalPK: ${proposalPK}`
        );
      } else {
        console.error(
          `Error deleting proposal ${proposalPK}: ${response.status} - ${response.body}`
        );
      }
    });

    check(responses, {
      'Delete test proposals': (r) => proposals.length === r.length,
    });

    return proposals;
  }
}
