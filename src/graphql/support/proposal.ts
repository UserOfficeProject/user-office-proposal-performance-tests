
import {
  AsyncClientApi,
} from '../../utils/sharedType';
import { CreateProposalDocument, DeleteProposalDocument, GetProposalsDocument, UpdateProposalDocument } from '../generated/graphql';
import { executeGraphqlQuery } from '../../support/graphql';

export class Proposal {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async createProposal(callId: number){
        const createdProposal = await executeGraphqlQuery(
          this.apiAsyncClient,
          CreateProposalDocument,
          {
            callId,
          }
        ).then((data) => {
          return data.createProposal;
        });
        if (!createdProposal) {
          throw new Error('Fail to created proposal');
        }
        return createdProposal;
  }

  async deleteProposal(proposalPk: number){
    const deletedProposal = await executeGraphqlQuery(
      this.apiAsyncClient,
      DeleteProposalDocument,
      {
        proposalPk: proposalPk,
      }
    ).then((data) => {
      return data.deleteProposal;
    });
    if (!deletedProposal) {
      throw new Error('Fail to delete proposal');
    }
    return deletedProposal;
  }

  async getProposals(callId: number){
    const proposals = await executeGraphqlQuery(
      this.apiAsyncClient,
      GetProposalsDocument,
      {
        filter: {
          callId,
        },
      }
    ).then((data) => {
      return data.proposals?.proposals;
    });
    if (!proposals) {
      throw new Error(`Fail to get proposals on call ${callId}`);
    }
    return proposals;
  }

  async updateProposal(proposalPk: number,title: string,abstract:string,users:number[],proposerId?: number,created?:Date){

    const updatedProposal = await executeGraphqlQuery(
      this.apiAsyncClient,
      UpdateProposalDocument,
      {
        proposalPk,
        title,
        abstract,
        users,
        proposerId,
        created
      }
    ).then((data) => {
      return data.updateProposal;
    });
    if (!updatedProposal) {
      throw new Error('Fail to update proposal');
    }
    return updatedProposal;
  }

  async deleteCallProposals(callId: number) {
    const proposals = await executeGraphqlQuery(
      this.apiAsyncClient,
      GetProposalsDocument,
      {
        filter: {
          callId,
        },
      }
    ).then((data) => {
      return data.proposals?.proposals;
    });
    if (!proposals) {
      throw new Error(`Fail to get proposals on call ${callId}`);
    }
    const proposalPromises = proposals.map((proposal) =>executeGraphqlQuery(
      this.apiAsyncClient,
      DeleteProposalDocument,
      {
        proposalPk: proposal.primaryKey,
      }
    ));

    Promise.allSettled(proposalPromises).then((results) => {
      if (results.filter((result) => result.status === 'rejected').length > 0) {
        if(proposals.length === proposalPromises.length){
          throw new Error(`Fail to delete proposals on call ${callId}`);
        }
      }
    });

    return proposals;
  }
}
