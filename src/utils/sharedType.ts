/* eslint-disable @typescript-eslint/no-explicit-any */
import { File as BrowserFile } from 'k6/browser';
import { File as ExperimentalFsFile } from 'k6/experimental/fs';
import { RefinedParams, RefinedResponse, RequestBody } from 'k6/http';
import { 
  BasicUserDetails,
  CreateCallInput,
  Fap as FapFields,
  Instrument,
  Proposal as ProposalFields,
  ProposalStatus,
  TemplateGroupId, } from '../graphql/generated/graphql';

export class FsFile extends ExperimentalFsFile {}

export type Call = {
  id: number;
  shortCode: string;
  title: string;
  templateId: number;
  instruments: [
    Pick<
      Instrument,
      'id' | 'managerUserId' | 'name' | 'shortCode' | 'description'
    >,
  ];
  faps: [Fap];
};
export type TemplateStep = {
  topic: {
    id: number;
    templateId: number;
    title: string;
    isEnabled: boolean;
  };
};
export type Template = {
  templateId: number;
  name: string;
  description: string;
  steps: [TemplateStep];
};
type Questionary = {
  steps: [TemplateStep];
  questionaryId: number;
  templateId: number;
};
export type Proposal = Pick<
  ProposalFields,
  | 'primaryKey'
  | 'proposalId'
  | 'title'
  | 'submitted'
  | 'proposerId'
  | 'abstract'
> & {
  status?: Pick<ProposalStatus, 'name'> | null;
  proposer?: Pick<BasicUserDetails, 'id'> | null;
  users?: Pick<BasicUserDetails, 'id'>[] | null;
};
export type Proposals = {
  proposals: [Proposal];
};
export type SharedData = {
  users: UserLogin[] | null;
  browserBaseUrl: string;
  graphqlUrl: string;
  testCall: Call | null;
  testSetupBaseUrl?: string | null;
  isClusterTestRun: boolean;
  instrumentId: number;
  fapReviewAssignments: FapReviewAssignment[] | null;
};
export type Fap = Pick<FapFields, 'id' >;

export type FapReviewAssignment = {
  memberId: number;
  proposalPk: number;
  fapId: number;
};
export type ClientResponse = RefinedResponse<any>;
export type AsyncClientResponse = Promise<RefinedResponse<any>>;

export type ClientApi = (body: string, userToken?: string) => ClientResponse;
export type AsyncRequestOptions = {
  params?: RefinedParams<any> | null, 
  token?: string
  };
export type AsyncClientApi = (
  method: string,
  body: RequestBody | null,
  options?: AsyncRequestOptions | undefined
) => AsyncClientResponse;

export type CallQueryResponse = {
  data: { [name: string]: Call };
};
export type CallsQueryResponse = {
  data: { [name: string]: [Call] };
};
export type TemplateQueryResponse = {
  data: { [name: string]: Template };
};
export type ExternalTokenLoginResponse = {
  data: { externalTokenLogin: string };
};

export type ProposalsQueryResponse = {
  data: { [name: string]: Proposals };
};
export type ProposalQueryResponse = {
  data: { [name: string]: Proposal };
};
export type GenericQueryResponse = {
  data: { [name: string]: any };
};
export type FapQueryResponse = {
  data: { [name: string]: Fap };
};
export type InitData = {
  call: CreateCallInput;
  proposal: {
    id: number;
    title: string;
  };
  template: {
    name: string;
    description: string;
    groupId: TemplateGroupId;
  };
  workflows: {
    defaultWorkflow: {
      id: number;
    };
    defaultDroppableGroup: string;
  };
  instrument: Pick<
    Instrument,
    'name' | 'shortCode' | 'shortCode' | 'description'
  >;
};

export type UserLogin = { userId: number; sessionId: string; email: string };

export enum DatabaseClientConnector {
  ORACLE = 'oracle',
  POSTGRESQL = 'postgresql',
}

export interface DatabaseClient {
  close(): any;
  begin(): any;
}

export type InputFileType = BrowserFile & {
  mimetype: string;
};

export interface HttpURL {
  __brand: 'http-url';
}
