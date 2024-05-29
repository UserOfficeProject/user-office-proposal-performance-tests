import { check } from 'k6';

import {
  ClientResponse,
  GenericQueryResponse,
  ProposalQueryResponse,
  Proposal as ProposalType,
  ProposalsQueryResponse,
} from '../../utils/sharedType';

export class Proposal {
  constructor(private apiClient: (body: string) => ClientResponse) {}

  createProposal(callId: number): ProposalType {
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

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );

    return (response.json() as GenericQueryResponse)?.data
      ?.createProposal as ProposalType;
  }

  deleteProposal(proposalPk: number): number {
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

    const response = this.apiClient(JSON.stringify({ query, variables }));
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

  private getProposals(callId: number): [ProposalType] {
    const query = `
      query Proposals($filter: ProposalsFilter) {
        proposals(filter: $filter) {
          proposals {
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
      filter: {
        callId,
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
      console.error('Proposals where not found', response.error);
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

    responses.forEach((response, index) => {
      const proposalPK = proposals[index];
      if (response.status !== 200) {
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
