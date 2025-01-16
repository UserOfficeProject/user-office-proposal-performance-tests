import { check } from 'k6';

import {
  AsyncClientApi,
  GenericQueryResponse,
  ProposalQueryResponse,
  Proposal as ProposalType,
  ProposalsQueryResponse,
} from '../../utils/sharedType';

export class Proposal {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async createProposal(callId: number): Promise<ProposalType> {
    const mutation = `
    mutation CreateProposal($callId: Int!) {
      createProposal(callId: $callId) {
        primaryKey
        proposalId
        callId
        status {
          id
          name
          shortCode
        }
        questionary {
          steps {
            topic {
              id
              templateId
            }
          }
          questionaryId
          templateId
        }
      }
    }`;

    const variables = {
      callId,
    };

    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );

    return (response.json() as GenericQueryResponse)?.data
      ?.createProposal as ProposalType;
  }

  async deleteProposal(proposalPk: number): Promise<number> {
    const query = `
          mutation DeleteProposal($proposalPk: Int!) {
                deleteProposal(proposalPk: $proposalPk) {
                    primaryKey
                    proposalId
                    callId
                    status {
                      id
                      name
                      shortCode
                    }
                    questionary {
                      steps {
                        topic {
                          id
                          templateId
                        }
                      }
                      questionaryId
                      templateId
                    }
                  }
                }
          }`;

    const variables = {
      proposalPk: proposalPk,
    };

    const response = await this.apiAsyncClient(
      JSON.stringify({ query, variables })
    );
    const responseData = response.json() as ProposalQueryResponse;

    if (
      !check(response, {
        'Delete proposal': (r) =>
          r.status === 200 &&
          +responseData.data.deleteProposal.primaryKey === proposalPk,
      })
    ) {
      console.error('Proposal was not deleted', response.error);
    }

    return proposalPk;
  }

  private async getProposals(callId: number): Promise<[ProposalType]> {
    const query = `
      query Proposals($filter: ProposalsFilter) {
        proposals(filter: $filter) {
          proposals {
            primaryKey
            proposalId
          }
        }
      }`;

    const variables = {
      filter: {
        callId,
      },
    };

    const response = await this.apiAsyncClient(
      JSON.stringify({ query, variables })
    );
    const responseData = response.json() as ProposalsQueryResponse;

    if (
      response.status === 200 &&
      responseData.data.proposals.proposals.length < 1
    ) {
      console.warn('No proposals where found', response.error);
    }

    return responseData.data.proposals.proposals;
  }

  async deleteCallProposals(callId: number): Promise<[ProposalType]> {
    const proposals = await this.getProposals(callId);

    const mutation = `
    mutation DeleteProposal($proposalPk: Int!) {
          deleteProposal(proposalPk: $proposalPk) {
              proposalId
              primaryKey
          }
    }`;

    const proposalPromises = proposals.map((proposal: ProposalType) =>
      this.apiAsyncClient(
        JSON.stringify({
          query: mutation,
          variables: { proposalPk: proposal.primaryKey },
        })
      ).then((res) => {
        if (res.status !== 200) {
          console.error(
            `Error deleting proposal ${proposal.primaryKey}: ${res.status} - ${res.body}`
          );
        }
      })
    );
    Promise.allSettled(proposalPromises).then((results) => {
      if (results.filter((result) => result.status === 'rejected').length > 0) {
        check(proposalPromises, {
          'Delete test proposals': (r) => proposals.length === r.length,
        });
      }
    });

    return proposals;
  }
  async changeProposalsStatus(proposalPks: number[], statusId: number) {
    const mutation = `mutation ChangeProposalsStatus($changeProposalsStatusInput: ChangeProposalsStatusInput!) {
  changeProposalsStatus(changeProposalsStatusInput: $changeProposalsStatusInput)
}`;
    const variables = {
      changeProposalsStatusInput: {
        proposalPks,
        statusId,
      },
    };
    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    if (response.status !== 200) {
      console.error(
        `Error changing status of proposal ${response.status} - ${response.body}`
      );
    }
  }
  async assignProposalsToInstruments(
    proposalPks: number[],
    instrumentIds: number[]
  ) {
    const mutation = `mutation AssignProposalsToInstruments($instrumentIds: [Int!]!, $proposalPks: [Int!]!) {
  assignProposalsToInstruments(instrumentIds: $instrumentIds, proposalPks: $proposalPks)
}`;
    const variables = {
      proposalPks: proposalPks,
      instrumentIds: instrumentIds,
    };
    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    if (response.status !== 200) {
      console.error(
        `Error assigning proposal to instrument ${response.status} - ${response.body}`
      );
    }
  }
  async assignFapReviewersToProposals(
    memberId: number,
    proposalPk: number,
    fapId: number
  ) {
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
  }
}
