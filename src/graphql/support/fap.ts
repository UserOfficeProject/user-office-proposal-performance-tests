import {
  AsyncClientApi,
  Fap,
} from '../../utils/sharedType';
import { executeGraphqlQuery } from '../../support/graphql';
import { AssignFapReviewersToProposalsDocument, AssignProposalsToFapsDocument, AssignReviewersToFapDocument, RemoveMemberFromFapDocument, RemoveMemberFromFapProposalDocument, UserRole } from '../generated/graphql';

export class FAP {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async assignReviewersToFap(memberIds: number[], fapId: number): Promise<Fap> {
    const assignReviewersToFap = await executeGraphqlQuery(
      this.apiAsyncClient, 
      AssignReviewersToFapDocument,
      {
        memberIds: memberIds,
        fapId: fapId,
      }
    ).then((data) => {
      return data.assignReviewersToFap;
    });
    if(!assignReviewersToFap){
      throw new Error('Fail to assign reviewers to FAP');
    }
    return assignReviewersToFap;
  }
  
  async assignProposalsToFaps(proposalPks: number[], fapId: number, instrumentId: number): Promise<Boolean>{
    const assignProposalsToFaps = await executeGraphqlQuery(
      this.apiAsyncClient,
      AssignProposalsToFapsDocument,
      {
        proposalPks: proposalPks,
        fapInstruments: [
          {
              fapId,
              instrumentId
          }
        ] 
      }
    ).then((data) => {
      return data.assignProposalsToFaps;
    });
    if(!assignProposalsToFaps){
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
      return data.assignFapReviewersToProposals
    });
    if(!assignFapReviewersToProposals){
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
    if(!removeMemberFromFapProposal){
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
    if(!removeMemberFromFap){
      throw new Error ('Failed to remove reviewer from FAP');
    }
    return removeMemberFromFap;
  }
}
