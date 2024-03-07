import { RefinedResponse } from 'k6/http';

export type Call = { id: number; shortCode: string; title: string };
export type Proposal = {
  primaryKey: number;
  proposalId: string;
  callId: number;
};
export type Proposals = {
  proposals: [Proposal];
};
export type SharedData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any;
  browserBaseUrl: string;
  graphqlUrl: string;
  userSetupBaseUrl: string;
  testCall: Call;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClientResponse = RefinedResponse<any>;

export type CallQueryResponse = {
  data: { [name: string]: Call };
};

export type ProposalsQueryResponse = {
  data: { [name: string]: Proposals };
};
export type ProposalQueryResponse = {
  data: { [name: string]: Proposal };
};
