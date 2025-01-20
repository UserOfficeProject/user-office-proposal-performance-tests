/* eslint-disable @typescript-eslint/no-explicit-any */
import { File as BrowserFile } from 'k6/browser';
import { File as ExperimentalFsFile } from 'k6/experimental/fs';
import { RefinedResponse } from 'k6/http';

export class FsFile extends ExperimentalFsFile {}
export enum AllocationTimeUnits {
  DAY = 'Day',
  HOUR = 'Hour',
}
export type Instrument = {
  id: number;
  name: string;
  shortCode: string;
  description: string;
  managerUserId: number;
};
export type Call = {
  id: number;
  shortCode: string;
  title: string;
  templateId: number;
  instruments: [Instrument];
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
export type Proposal = {
  primaryKey: number;
  proposalId: string;
  callId: number;
  status: {
    id: string;
    name: string;
    shortCode: string;
  };
  questionary: Questionary;
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
export type Fap = {
  id: number;
  code: string;
  proposalCurrentCount: number;
};
export type FapReviewAssignment = {
  memberId: number;
  proposalPk: number;
  fapId: number;
};
export enum UserRole {
  FAP_CHAIR = 'FAP_CHAIR',
  FAP_REVIEWER = 'FAP_REVIEWER',
  FAP_SECRETARY = 'FAP_SECRETARY',
  INSTRUMENT_SCIENTIST = 'INSTRUMENT_SCIENTIST',
  INTERNAL_REVIEWER = 'INTERNAL_REVIEWER',
  SAMPLE_SAFETY_REVIEWER = 'SAMPLE_SAFETY_REVIEWER',
  USER = 'USER',
  USER_OFFICER = 'USER_OFFICER',
}
export type ClientResponse = RefinedResponse<any>;
export type AsyncClientResponse = Promise<RefinedResponse<any>>;

export type ClientApi = (body: string, userToken?: string) => ClientResponse;
export type AsyncClientApi = (
  body: string,
  userToken?: string
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
  call: {
    allocationTimeUnit: AllocationTimeUnits;
    cycleComment: string;
    description?: string;
    endCall: Date;
    endCallInternal?: Date;
    endCycle: Date;
    endFapReview?: Date;
    endNotify: Date;
    endReview: Date;
    esiTemplateId?: number;
    faps?: number;
    pdfTemplateId?: number;
    proposalSequence?: number;
    proposalWorkflowId: number;
    referenceNumberFormat?: string;
    shortCode: string;
    startCall: Date;
    startCycle: Date;
    startFapReview?: Date;
    startNotify: Date;
    startReview: Date;
    submissionMessage?: string;
    surveyComment: string;
    templateId: number;
    title?: string;
  };
  proposal: {
    id: number;
    title: string;
  };
  template: {
    name: string;
    description: string;
    groupId: string;
  };
  workflows: {
    defaultWorkflow: {
      id: number;
    };
    defaultDroppableGroup: string;
  };
  instrument: Partial<Instrument>;
};
export type CallsFilter = {
  fapIds?: number;
  instrumentIds?: number;
  isActive?: boolean;
  isActiveInternal?: boolean;
  isCallEndedByEvent?: boolean;
  isEnded?: boolean;
  isEndedInternal?: boolean;
  isFapReviewEnded?: boolean;
  isReviewEnded?: boolean;
  pdfTemplateIds?: number;
  templateIds?: number;
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
