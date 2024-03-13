import { RefinedResponse } from 'k6/http';
export enum AllocationTimeUnits {
  DAY = 'Day',
  HOUR = 'Hour',
}
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
  initData: InitData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClientResponse = RefinedResponse<any>;

export type ClientApi = (body: string, userToken?: string) => ClientResponse;
export type CallQueryResponse = {
  data: { [name: string]: Call };
};
export type CallsQueryResponse = {
  data: { [name: string]: [Call] };
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
    id: number;
    name: string;
    topic: {
      id: number;
      title: string;
    };
  };
  workflows: {
    defaultWorkflow: {
      id: number;
    };
    defaultDroppableGroup: string;
  };
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
