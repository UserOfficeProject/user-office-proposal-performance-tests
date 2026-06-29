/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
  IntStringDateBoolArray: { input: any; output: any; }
  _Any: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type AddStatusToWorkflowInput = {
  posX: Scalars['Int']['input'];
  posY: Scalars['Int']['input'];
  statusId: Scalars['String']['input'];
  workflowId: Scalars['Int']['input'];
};

export type AddTechnicalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  publicComment?: InputMaybe<Scalars['String']['input']>;
  questionaryId: Scalars['Int']['input'];
  reviewerId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TechnicalReviewStatus>;
  submitted?: InputMaybe<Scalars['Boolean']['input']>;
  timeAllocation?: InputMaybe<Scalars['Int']['input']>;
};

export type AllQuestionsFilter = {
  category?: InputMaybe<TemplateCategoryId>;
  dataType?: InputMaybe<Array<DataType>>;
  excludeDataType?: InputMaybe<Array<DataType>>;
};

export type AllQuestionsQueryResult = {
  __typename?: 'AllQuestionsQueryResult';
  questions: Array<QuestionWithUsage>;
  totalCount: Scalars['Int']['output'];
};

export enum AllocationTimeUnits {
  Day = 'Day',
  Hour = 'Hour',
  Week = 'Week'
}

export type Answer = {
  __typename?: 'Answer';
  answerId?: Maybe<Scalars['Int']['output']>;
  config: FieldConfig;
  dependencies: Array<FieldDependency>;
  dependenciesOperator?: Maybe<DependenciesLogicOperator>;
  question: Question;
  sortOrder: Scalars['Int']['output'];
  topicId: Scalars['Int']['output'];
  value?: Maybe<Scalars['IntStringDateBoolArray']['output']>;
};

export type AnswerBasic = {
  __typename?: 'AnswerBasic';
  answer: Scalars['IntStringDateBoolArray']['output'];
  answerId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  questionId: Scalars['String']['output'];
  questionaryId: Scalars['Int']['output'];
};

export type AnswerInput = {
  questionId: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ApiCallRequestHeader = {
  __typename?: 'ApiCallRequestHeader';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApproveVisitRegistrationInput = {
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};

export type AssignChairOrSecretaryToFapInput = {
  fapId: Scalars['Int']['input'];
  roleId: UserRole;
  userId: Scalars['Int']['input'];
};

export type AssignInstrumentsToCallInput = {
  callId: Scalars['Int']['input'];
  instrumentFapIds: Array<InstrumentFapMappingInput>;
};

export type AuthJwtApiTokenPayload = {
  __typename?: 'AuthJwtApiTokenPayload';
  accessTokenId: Scalars['String']['output'];
};

export type AuthJwtPayload = {
  __typename?: 'AuthJwtPayload';
  currentRole: Role;
  roles: Array<Role>;
  user: UserJwt;
};

export type BasicUserDetails = {
  __typename?: 'BasicUserDetails';
  country?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  institution: Scalars['String']['output'];
  institutionId: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  oidcSub?: Maybe<Scalars['String']['output']>;
  preferredname?: Maybe<Scalars['String']['output']>;
};

export type BooleanConfig = {
  __typename?: 'BooleanConfig';
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type Call = {
  __typename?: 'Call';
  allocationTimeUnit: AllocationTimeUnits;
  cycleComment: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endCall: Scalars['DateTime']['output'];
  endCallInternal?: Maybe<Scalars['DateTime']['output']>;
  endCycle: Scalars['DateTime']['output'];
  endFapReview?: Maybe<Scalars['DateTime']['output']>;
  endNotify: Scalars['DateTime']['output'];
  endReview: Scalars['DateTime']['output'];
  esiTemplateId?: Maybe<Scalars['Int']['output']>;
  experimentSafetyPdfTemplateId?: Maybe<Scalars['Int']['output']>;
  experimentWorkflow?: Maybe<Workflow>;
  experimentWorkflowId?: Maybe<Scalars['Int']['output']>;
  fapReviewTemplateId?: Maybe<Scalars['Int']['output']>;
  faps?: Maybe<Array<Fap>>;
  id: Scalars['Int']['output'];
  instruments: Array<InstrumentWithAvailabilityTime>;
  isActive: Scalars['Boolean']['output'];
  isActiveInternal: Scalars['Boolean']['output'];
  proposalCount: Scalars['Int']['output'];
  proposalPdfTemplateId?: Maybe<Scalars['Int']['output']>;
  proposalSequence?: Maybe<Scalars['Int']['output']>;
  proposalWorkflow?: Maybe<Workflow>;
  proposalWorkflowId?: Maybe<Scalars['Int']['output']>;
  referenceNumberFormat?: Maybe<Scalars['String']['output']>;
  shortCode: Scalars['String']['output'];
  sort_order: Scalars['Int']['output'];
  startCall: Scalars['DateTime']['output'];
  startCycle: Scalars['DateTime']['output'];
  startFapReview?: Maybe<Scalars['DateTime']['output']>;
  startNotify: Scalars['DateTime']['output'];
  startReview: Scalars['DateTime']['output'];
  submissionMessage?: Maybe<Scalars['String']['output']>;
  tags: Tag;
  technicalReviewTemplateId?: Maybe<Scalars['Int']['output']>;
  template: Template;
  templateId: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type CallOrderArray = {
  callId: Scalars['Int']['input'];
  sort_order: Scalars['Int']['input'];
};

export type CallOrderInput = {
  data: Array<CallOrderArray>;
};

export type CallsFilter = {
  esiTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  experimentSafetyPdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  fapIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  fapReviewTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  instrumentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isActiveInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isCallEndedByEvent?: InputMaybe<Scalars['Boolean']['input']>;
  isCallUpcoming?: InputMaybe<Scalars['Boolean']['input']>;
  isEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isEndedInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isFapReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  proposalPdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalStatus?: InputMaybe<Scalars['String']['input']>;
  shortCode?: InputMaybe<Scalars['String']['input']>;
  technicalReviewTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CancelVisitRegistrationInput = {
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};

export type ChangeProposalsStatusInput = {
  proposalPks: Array<Scalars['Int']['input']>;
  workflowStatusId: Scalars['Int']['input'];
};

export type CloneProposalsInput = {
  callId: Scalars['Int']['input'];
  proposalsToClonePk: Array<Scalars['Int']['input']>;
};

export type ConflictResolution = {
  itemId: Scalars['String']['input'];
  strategy: ConflictResolutionStrategy;
};

export enum ConflictResolutionStrategy {
  Unresolved = 'UNRESOLVED',
  UseExisting = 'USE_EXISTING',
  UseNew = 'USE_NEW'
}

export type ConnectionHasActionsInput = {
  actionId: Scalars['Int']['input'];
  actionType: StatusActionType;
  config?: InputMaybe<Scalars['String']['input']>;
};

export type ConnectionStatusAction = {
  __typename?: 'ConnectionStatusAction';
  action: StatusAction;
  actionId: Scalars['Int']['output'];
  config?: Maybe<StatusActionConfig>;
  connectionId: Scalars['Int']['output'];
  workflowId: Scalars['Int']['output'];
};

export type CopyAnswerInput = {
  sourceQuestionaryId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateApiAccessTokenInput = {
  accessPermissions: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCallInput = {
  allocationTimeUnit: AllocationTimeUnits;
  cycleComment: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endCall: Scalars['DateTime']['input'];
  endCallInternal?: InputMaybe<Scalars['DateTime']['input']>;
  endCycle: Scalars['DateTime']['input'];
  endFapReview?: InputMaybe<Scalars['DateTime']['input']>;
  endNotify: Scalars['DateTime']['input'];
  endReview: Scalars['DateTime']['input'];
  esiTemplateId?: InputMaybe<Scalars['Int']['input']>;
  experimentSafetyPdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  experimentWorkflowId?: InputMaybe<Scalars['Int']['input']>;
  fapReviewTemplateId?: InputMaybe<Scalars['Int']['input']>;
  faps?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalPdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  proposalSequence?: InputMaybe<Scalars['Int']['input']>;
  proposalWorkflowId: Scalars['Int']['input'];
  referenceNumberFormat?: InputMaybe<Scalars['String']['input']>;
  shortCode: Scalars['String']['input'];
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  startCall: Scalars['DateTime']['input'];
  startCycle: Scalars['DateTime']['input'];
  startFapReview?: InputMaybe<Scalars['DateTime']['input']>;
  startNotify: Scalars['DateTime']['input'];
  startReview: Scalars['DateTime']['input'];
  submissionMessage?: InputMaybe<Scalars['String']['input']>;
  technicalReviewTemplateId?: InputMaybe<Scalars['Int']['input']>;
  templateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEmailTemplateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  useTemplateFile: Scalars['Boolean']['input'];
};

export type CreateInternalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  reviewerId?: InputMaybe<Scalars['Int']['input']>;
  technicalReviewId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreatePredefinedMessageInput = {
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRoleArgs = {
  config?: InputMaybe<RoleConfigInput>;
  description: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateStatusInput = {
  description: Scalars['String']['input'];
  entityType: WorkflowType;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateWorkflowConnectionInput = {
  nextWorkflowStatusId: Scalars['Int']['input'];
  prevWorkflowStatusId: Scalars['Int']['input'];
  sourceHandle: Scalars['String']['input'];
  targetHandle: Scalars['String']['input'];
};

export type CreateWorkflowInput = {
  description: Scalars['String']['input'];
  entityType: WorkflowType;
  name: Scalars['String']['input'];
};

export enum DataType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  DynamicMultipleChoice = 'DYNAMIC_MULTIPLE_CHOICE',
  Embellishment = 'EMBELLISHMENT',
  ExperimentSafetyReviewBasis = 'EXPERIMENT_SAFETY_REVIEW_BASIS',
  FapReviewBasis = 'FAP_REVIEW_BASIS',
  FeedbackBasis = 'FEEDBACK_BASIS',
  FileUpload = 'FILE_UPLOAD',
  GenericTemplate = 'GENERIC_TEMPLATE',
  GenericTemplateBasis = 'GENERIC_TEMPLATE_BASIS',
  InstrumentPicker = 'INSTRUMENT_PICKER',
  Interval = 'INTERVAL',
  NumberInput = 'NUMBER_INPUT',
  ProposalBasis = 'PROPOSAL_BASIS',
  ProposalEsiBasis = 'PROPOSAL_ESI_BASIS',
  RichTextInput = 'RICH_TEXT_INPUT',
  SampleBasis = 'SAMPLE_BASIS',
  SampleDeclaration = 'SAMPLE_DECLARATION',
  SampleEsiBasis = 'SAMPLE_ESI_BASIS',
  SelectionFromOptions = 'SELECTION_FROM_OPTIONS',
  ShipmentBasis = 'SHIPMENT_BASIS',
  TechnicalReviewBasis = 'TECHNICAL_REVIEW_BASIS',
  TechniquePicker = 'TECHNIQUE_PICKER',
  TextInput = 'TEXT_INPUT',
  VisitBasis = 'VISIT_BASIS'
}

export type DateConfig = {
  __typename?: 'DateConfig';
  defaultDate?: Maybe<Scalars['String']['output']>;
  includeTime: Scalars['Boolean']['output'];
  maxDate?: Maybe<Scalars['String']['output']>;
  minDate?: Maybe<Scalars['String']['output']>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type DateFilterInput = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteApiAccessTokenInput = {
  accessTokenId: Scalars['String']['input'];
};

export type DeleteInternalReviewInput = {
  id: Scalars['Int']['input'];
  technicalReviewId: Scalars['Int']['input'];
};

export type DeletePredefinedMessageInput = {
  id: Scalars['Int']['input'];
};

export type DeleteWorkflowStatusInput = {
  workflowStatusId: Scalars['Int']['input'];
};

export enum DependenciesLogicOperator {
  And = 'AND',
  Or = 'OR'
}

export type DynamicMultipleChoiceConfig = {
  __typename?: 'DynamicMultipleChoiceConfig';
  apiCallRequestHeaders: Array<ApiCallRequestHeader>;
  externalApiCall: Scalars['Boolean']['output'];
  isMultipleSelect: Scalars['Boolean']['output'];
  jsonPath: Scalars['String']['output'];
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  url: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type EmailActionConfig = {
  __typename?: 'EmailActionConfig';
  recipientsWithEmailTemplate: Array<EmailStatusActionRecipientsWithTemplate>;
};

export type EmailActionDefaultConfig = {
  __typename?: 'EmailActionDefaultConfig';
  emailTemplates: Array<EmailStatusActionEmailTemplate>;
  recipients: Array<EmailStatusActionRecipient>;
};

export type EmailStatusActionEmailTemplate = {
  __typename?: 'EmailStatusActionEmailTemplate';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EmailStatusActionRecipient = {
  __typename?: 'EmailStatusActionRecipient';
  description?: Maybe<Scalars['String']['output']>;
  name: EmailStatusActionRecipients;
};

export enum EmailStatusActionRecipients {
  CoProposers = 'CO_PROPOSERS',
  ExperimentSafetyReviewers = 'EXPERIMENT_SAFETY_REVIEWERS',
  FapChairAndSecretary = 'FAP_CHAIR_AND_SECRETARY',
  FapReviewers = 'FAP_REVIEWERS',
  InstrumentScientists = 'INSTRUMENT_SCIENTISTS',
  Other = 'OTHER',
  Pi = 'PI',
  TechniqueScientists = 'TECHNIQUE_SCIENTISTS',
  UserOffice = 'USER_OFFICE'
}

export type EmailStatusActionRecipientsWithTemplate = {
  __typename?: 'EmailStatusActionRecipientsWithTemplate';
  combineEmails?: Maybe<Scalars['Boolean']['output']>;
  emailTemplate: EmailStatusActionEmailTemplate;
  otherRecipientEmails?: Maybe<Array<Scalars['String']['output']>>;
  recipient: EmailStatusActionRecipient;
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  body?: Maybe<Scalars['String']['output']>;
  createdByUserId: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  useTemplateFile: Scalars['Boolean']['output'];
};

export type EmailTemplatesFilter = {
  emailTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type EmailTemplatesQueryResult = {
  __typename?: 'EmailTemplatesQueryResult';
  emailTemplates: Array<EmailTemplate>;
  totalCount: Scalars['Int']['output'];
};

export type EmbellishmentConfig = {
  __typename?: 'EmbellishmentConfig';
  html: Scalars['String']['output'];
  omitFromPdf: Scalars['Boolean']['output'];
  plain: Scalars['String']['output'];
  readPermissions: Array<Scalars['String']['output']>;
};

export type Entry = {
  __typename?: 'Entry';
  id: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export enum EvaluatorOperator {
  Eq = 'eq',
  Neq = 'neq'
}

export enum Event {
  CallCreated = 'CALL_CREATED',
  CallEnded = 'CALL_ENDED',
  CallEndedInternal = 'CALL_ENDED_INTERNAL',
  CallFapReviewEnded = 'CALL_FAP_REVIEW_ENDED',
  CallReviewEnded = 'CALL_REVIEW_ENDED',
  DataAccessUsersUpdated = 'DATA_ACCESS_USERS_UPDATED',
  EmailTemplateCreated = 'EMAIL_TEMPLATE_CREATED',
  EmailTemplateDeleted = 'EMAIL_TEMPLATE_DELETED',
  EmailTemplateUpdated = 'EMAIL_TEMPLATE_UPDATED',
  ExperimentEsfApprovedByEsr = 'EXPERIMENT_ESF_APPROVED_BY_ESR',
  ExperimentEsfApprovedByIs = 'EXPERIMENT_ESF_APPROVED_BY_IS',
  ExperimentEsfRejectedByEsr = 'EXPERIMENT_ESF_REJECTED_BY_ESR',
  ExperimentEsfRejectedByIs = 'EXPERIMENT_ESF_REJECTED_BY_IS',
  ExperimentEsfSubmitted = 'EXPERIMENT_ESF_SUBMITTED',
  ExperimentSafetyManagementDecisionSubmittedByEsr = 'EXPERIMENT_SAFETY_MANAGEMENT_DECISION_SUBMITTED_BY_ESR',
  ExperimentSafetyManagementDecisionSubmittedByIs = 'EXPERIMENT_SAFETY_MANAGEMENT_DECISION_SUBMITTED_BY_IS',
  ExperimentSafetyStatusChangedByUser = 'EXPERIMENT_SAFETY_STATUS_CHANGED_BY_USER',
  ExperimentSafetyStatusChangedByWorkflow = 'EXPERIMENT_SAFETY_STATUS_CHANGED_BY_WORKFLOW',
  FapAllMeetingsSubmitted = 'FAP_ALL_MEETINGS_SUBMITTED',
  FapCreated = 'FAP_CREATED',
  FapMembersAssigned = 'FAP_MEMBERS_ASSIGNED',
  FapMemberAssignedToProposal = 'FAP_MEMBER_ASSIGNED_TO_PROPOSAL',
  FapMemberRemoved = 'FAP_MEMBER_REMOVED',
  FapMemberRemovedFromProposal = 'FAP_MEMBER_REMOVED_FROM_PROPOSAL',
  FapReviewerNotified = 'FAP_REVIEWER_NOTIFIED',
  FapUpdated = 'FAP_UPDATED',
  InstrumentsAssignedToTechnique = 'INSTRUMENTS_ASSIGNED_TO_TECHNIQUE',
  InstrumentsRemovedFromTechnique = 'INSTRUMENTS_REMOVED_FROM_TECHNIQUE',
  InstrumentAssignedToScientist = 'INSTRUMENT_ASSIGNED_TO_SCIENTIST',
  InstrumentCreated = 'INSTRUMENT_CREATED',
  InstrumentDeleted = 'INSTRUMENT_DELETED',
  InstrumentUpdated = 'INSTRUMENT_UPDATED',
  InternalReviewCreated = 'INTERNAL_REVIEW_CREATED',
  InternalReviewDeleted = 'INTERNAL_REVIEW_DELETED',
  InternalReviewUpdated = 'INTERNAL_REVIEW_UPDATED',
  PredefinedMessageCreated = 'PREDEFINED_MESSAGE_CREATED',
  PredefinedMessageDeleted = 'PREDEFINED_MESSAGE_DELETED',
  PredefinedMessageUpdated = 'PREDEFINED_MESSAGE_UPDATED',
  ProposalAccepted = 'PROPOSAL_ACCEPTED',
  ProposalAllFapMeetingsSubmitted = 'PROPOSAL_ALL_FAP_MEETINGS_SUBMITTED',
  ProposalAllFapMeetingInstrumentSubmitted = 'PROPOSAL_ALL_FAP_MEETING_INSTRUMENT_SUBMITTED',
  ProposalAllFapReviewersSelected = 'PROPOSAL_ALL_FAP_REVIEWERS_SELECTED',
  ProposalAllFapReviewsSubmitted = 'PROPOSAL_ALL_FAP_REVIEWS_SUBMITTED',
  ProposalAllFeasibilityReviewsFeasible = 'PROPOSAL_ALL_FEASIBILITY_REVIEWS_FEASIBLE',
  ProposalAllFeasibilityReviewsSubmitted = 'PROPOSAL_ALL_FEASIBILITY_REVIEWS_SUBMITTED',
  ProposalAllReviewsSubmittedForAllFaps = 'PROPOSAL_ALL_REVIEWS_SUBMITTED_FOR_ALL_FAPS',
  ProposalAssignedToTechniques = 'PROPOSAL_ASSIGNED_TO_TECHNIQUES',
  ProposalBookingTimeActivated = 'PROPOSAL_BOOKING_TIME_ACTIVATED',
  ProposalBookingTimeCompleted = 'PROPOSAL_BOOKING_TIME_COMPLETED',
  ProposalBookingTimeReopened = 'PROPOSAL_BOOKING_TIME_REOPENED',
  ProposalBookingTimeSlotsRemoved = 'PROPOSAL_BOOKING_TIME_SLOTS_REMOVED',
  ProposalBookingTimeSlotAdded = 'PROPOSAL_BOOKING_TIME_SLOT_ADDED',
  ProposalBookingTimeUpdated = 'PROPOSAL_BOOKING_TIME_UPDATED',
  ProposalCloned = 'PROPOSAL_CLONED',
  ProposalCoProposerInvitesUpdated = 'PROPOSAL_CO_PROPOSER_INVITES_UPDATED',
  ProposalCoProposerInviteAccepted = 'PROPOSAL_CO_PROPOSER_INVITE_ACCEPTED',
  ProposalCoProposerInviteSent = 'PROPOSAL_CO_PROPOSER_INVITE_SENT',
  ProposalCreated = 'PROPOSAL_CREATED',
  ProposalDeleted = 'PROPOSAL_DELETED',
  ProposalFapsRemoved = 'PROPOSAL_FAPS_REMOVED',
  ProposalFapsSelected = 'PROPOSAL_FAPS_SELECTED',
  ProposalFapMeetingInstrumentSubmitted = 'PROPOSAL_FAP_MEETING_INSTRUMENT_SUBMITTED',
  ProposalFapMeetingInstrumentUnsubmitted = 'PROPOSAL_FAP_MEETING_INSTRUMENT_UNSUBMITTED',
  ProposalFapMeetingRankingOverwritten = 'PROPOSAL_FAP_MEETING_RANKING_OVERWRITTEN',
  ProposalFapMeetingReorder = 'PROPOSAL_FAP_MEETING_REORDER',
  ProposalFapMeetingSaved = 'PROPOSAL_FAP_MEETING_SAVED',
  ProposalFapMeetingSubmitted = 'PROPOSAL_FAP_MEETING_SUBMITTED',
  ProposalFapReviewSubmitted = 'PROPOSAL_FAP_REVIEW_SUBMITTED',
  ProposalFapReviewUpdated = 'PROPOSAL_FAP_REVIEW_UPDATED',
  ProposalFeasibilityReviewFeasible = 'PROPOSAL_FEASIBILITY_REVIEW_FEASIBLE',
  ProposalFeasibilityReviewSubmitted = 'PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED',
  ProposalFeasibilityReviewUnfeasible = 'PROPOSAL_FEASIBILITY_REVIEW_UNFEASIBLE',
  ProposalFeasibilityReviewUpdated = 'PROPOSAL_FEASIBILITY_REVIEW_UPDATED',
  ProposalInstrumentsSelected = 'PROPOSAL_INSTRUMENTS_SELECTED',
  ProposalManagementDecisionSubmitted = 'PROPOSAL_MANAGEMENT_DECISION_SUBMITTED',
  ProposalManagementDecisionUpdated = 'PROPOSAL_MANAGEMENT_DECISION_UPDATED',
  ProposalNotified = 'PROPOSAL_NOTIFIED',
  ProposalRejected = 'PROPOSAL_REJECTED',
  ProposalReserved = 'PROPOSAL_RESERVED',
  ProposalSampleReviewSubmitted = 'PROPOSAL_SAMPLE_REVIEW_SUBMITTED',
  ProposalSampleSafe = 'PROPOSAL_SAMPLE_SAFE',
  ProposalStatusActionExecuted = 'PROPOSAL_STATUS_ACTION_EXECUTED',
  ProposalStatusChangedByUser = 'PROPOSAL_STATUS_CHANGED_BY_USER',
  ProposalStatusChangedByWorkflow = 'PROPOSAL_STATUS_CHANGED_BY_WORKFLOW',
  ProposalSubmitted = 'PROPOSAL_SUBMITTED',
  ProposalUpdated = 'PROPOSAL_UPDATED',
  ProposalVisitRegistrationInvitesUpdated = 'PROPOSAL_VISIT_REGISTRATION_INVITES_UPDATED',
  ProposalVisitRegistrationInviteAccepted = 'PROPOSAL_VISIT_REGISTRATION_INVITE_ACCEPTED',
  ProposalVisitRegistrationInviteSent = 'PROPOSAL_VISIT_REGISTRATION_INVITE_SENT',
  TechniqueCreated = 'TECHNIQUE_CREATED',
  TechniqueDeleted = 'TECHNIQUE_DELETED',
  TechniqueUpdated = 'TECHNIQUE_UPDATED',
  TopicAnswered = 'TOPIC_ANSWERED',
  UserDeleted = 'USER_DELETED',
  UserPasswordResetEmail = 'USER_PASSWORD_RESET_EMAIL',
  UserRoleUpdated = 'USER_ROLE_UPDATED',
  UserUpdated = 'USER_UPDATED',
  VisitCreated = 'VISIT_CREATED',
  VisitRegistrationApproved = 'VISIT_REGISTRATION_APPROVED',
  VisitRegistrationCancelled = 'VISIT_REGISTRATION_CANCELLED'
}

export type EventLog = {
  __typename?: 'EventLog';
  changedBy?: Maybe<User>;
  changedObjectId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  eventTStamp: Scalars['DateTime']['output'];
  eventType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  rowData: Scalars['String']['output'];
};

export type Experiment = {
  __typename?: 'Experiment';
  createdAt: Scalars['DateTime']['output'];
  endsAt: Scalars['DateTime']['output'];
  experimentId: Scalars['String']['output'];
  experimentPk: Scalars['Float']['output'];
  experimentSafety?: Maybe<ExperimentSafety>;
  feedback?: Maybe<Feedback>;
  feedbackRequests: Array<FeedbackRequest>;
  instrument: Instrument;
  instrumentId: Scalars['Float']['output'];
  localContact?: Maybe<BasicUserDetails>;
  localContactId?: Maybe<Scalars['Float']['output']>;
  proposal: Proposal;
  proposalPk: Scalars['Float']['output'];
  referenceNumberSequence?: Maybe<Scalars['Float']['output']>;
  scheduledEventId: Scalars['Float']['output'];
  shipments: Array<Shipment>;
  startsAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visit?: Maybe<Visit>;
};

export type ExperimentHasSample = {
  __typename?: 'ExperimentHasSample';
  createdAt: Scalars['DateTime']['output'];
  experimentPk: Scalars['Float']['output'];
  isEsiSubmitted: Scalars['Boolean']['output'];
  questionary: Questionary;
  sample: Sample;
  sampleEsiQuestionaryId: Scalars['Float']['output'];
  sampleId: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperimentSafety = {
  __typename?: 'ExperimentSafety';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Float']['output'];
  esiQuestionaryId: Scalars['Float']['output'];
  esiQuestionarySubmittedAt?: Maybe<Scalars['DateTime']['output']>;
  experimentPk: Scalars['Float']['output'];
  experimentSafetyPk: Scalars['Float']['output'];
  experimentSafetyReviewerComment?: Maybe<Scalars['String']['output']>;
  experimentSafetyReviewerDecision?: Maybe<ExperimentSafetyReviewerDecisionEnum>;
  instrumentScientistComment?: Maybe<Scalars['String']['output']>;
  instrumentScientistDecision?: Maybe<InstrumentScientistDecisionEnum>;
  proposal: Proposal;
  questionary: Questionary;
  reviewedBy?: Maybe<Scalars['Float']['output']>;
  safetyReviewQuestionary: Questionary;
  safetyReviewQuestionaryId?: Maybe<Scalars['Float']['output']>;
  samples: Array<ExperimentHasSample>;
  status?: Maybe<Status>;
  statusId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workflowStatusId: Scalars['Float']['output'];
};

export type ExperimentSafetyPdfTemplate = {
  __typename?: 'ExperimentSafetyPdfTemplate';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  dummyData: Scalars['String']['output'];
  experimentSafetyPdfTemplateId: Scalars['Int']['output'];
  templateData: Scalars['String']['output'];
  templateFooter: Scalars['String']['output'];
  templateHeader: Scalars['String']['output'];
  templateId: Scalars['Int']['output'];
  templateSampleDeclaration: Scalars['String']['output'];
};

export type ExperimentSafetyPdfTemplatesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  dummyData?: InputMaybe<Scalars['String']['input']>;
  experimentSafetyPdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  pdfTemplateData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateFooter?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateHeader?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateSampleDeclaration?: InputMaybe<Scalars['String']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ExperimentSafetyReviewBasisConfig = {
  __typename?: 'ExperimentSafetyReviewBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export enum ExperimentSafetyReviewerDecisionEnum {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Unset = 'UNSET'
}

export enum ExperimentStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Draft = 'DRAFT'
}

export type ExperimentsFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  experimentEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  experimentSafetyStatusId?: InputMaybe<Scalars['Int']['input']>;
  experimentStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  instrumentScientistUserId?: InputMaybe<Scalars['Int']['input']>;
  overlaps?: InputMaybe<TimeSpan>;
};

export type ExperimentsQueryResult = {
  __typename?: 'ExperimentsQueryResult';
  experiments: Array<Experiment>;
  totalCount: Scalars['Int']['output'];
};

export type ExternalTokenResult = {
  __typename?: 'ExternalTokenResult';
  isValid: Scalars['Boolean']['output'];
};

export type Fap = {
  __typename?: 'Fap';
  active: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
  customGradeGuide?: Maybe<Scalars['Boolean']['output']>;
  description: Scalars['String']['output'];
  fapChairs: Array<BasicUserDetails>;
  fapChairsCurrentProposalCounts: Array<FapProposalCount>;
  fapSecretaries: Array<BasicUserDetails>;
  fapSecretariesCurrentProposalCounts: Array<FapProposalCount>;
  files?: Maybe<Scalars['String']['output']>;
  gradeGuide?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  numberRatingsRequired: Scalars['Float']['output'];
  proposalCount: Scalars['Int']['output'];
  proposalCurrentCount: Scalars['Int']['output'];
  reviewVisibility: Scalars['Int']['output'];
};

export type FapAssignment = {
  __typename?: 'FapAssignment';
  dateAssigned: Scalars['DateTime']['output'];
  dateReassigned?: Maybe<Scalars['DateTime']['output']>;
  emailSent: Scalars['Boolean']['output'];
  fapId: Scalars['Int']['output'];
  fapMemberUserId?: Maybe<Scalars['Int']['output']>;
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  rank?: Maybe<Scalars['Int']['output']>;
  reassigned: Scalars['Boolean']['output'];
  review?: Maybe<Review>;
  role?: Maybe<Role>;
  user?: Maybe<BasicUserDetails>;
};

export type FapInstrument = {
  __typename?: 'FapInstrument';
  fapId?: Maybe<Scalars['Int']['output']>;
  instrumentId?: Maybe<Scalars['Int']['output']>;
};

export type FapInstrumentInput = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
};

export type FapMeetingDecision = {
  __typename?: 'FapMeetingDecision';
  commentForManagement?: Maybe<Scalars['String']['output']>;
  commentForUser?: Maybe<Scalars['String']['output']>;
  fapId: Scalars['Int']['output'];
  instrumentId: Scalars['Int']['output'];
  proposalPk: Scalars['Int']['output'];
  rankOrder?: Maybe<Scalars['Int']['output']>;
  recommendation?: Maybe<ProposalEndStatus>;
  submitted: Scalars['Boolean']['output'];
  submittedBy?: Maybe<Scalars['Int']['output']>;
};

export type FapProposal = {
  __typename?: 'FapProposal';
  assignments?: Maybe<Array<FapAssignment>>;
  dateAssigned: Scalars['DateTime']['output'];
  fapId: Scalars['Int']['output'];
  fapTimeAllocation?: Maybe<Scalars['Int']['output']>;
  instrument?: Maybe<Instrument>;
  instrumentId: Scalars['Int']['output'];
  instrumentSubmitted: Scalars['Boolean']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
};

export type FapProposalCount = {
  __typename?: 'FapProposalCount';
  count: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type FapReviewAssignmentInput = {
  memberId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  rank?: InputMaybe<Scalars['Int']['input']>;
};

export type FapReviewBasisConfig = {
  __typename?: 'FapReviewBasisConfig';
  decimalPoints: Scalars['Int']['output'];
  maxGrade: Scalars['Int']['output'];
  minGrade: Scalars['Int']['output'];
  nonNumericOptions: Array<Scalars['String']['output']>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FapReviewTemplate = {
  __typename?: 'FapReviewTemplate';
  callCount: Scalars['Int']['output'];
  complementaryQuestions: Array<Question>;
  description?: Maybe<Scalars['String']['output']>;
  experimentSafetyPdfCallCount?: Maybe<Scalars['Int']['output']>;
  experimentSafetyPdfTemplate?: Maybe<ExperimentSafetyPdfTemplate>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfCallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfTemplate?: Maybe<ProposalPdfTemplate>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type FapReviewTemplatesFilter = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum FapReviewVisibility {
  ProposalReviewsComplete = 'PROPOSAL_REVIEWS_COMPLETE',
  ReviewsVisible = 'REVIEWS_VISIBLE',
  ReviewsVisibleFapEnded = 'REVIEWS_VISIBLE_FAP_ENDED'
}

export type FapReviewer = {
  __typename?: 'FapReviewer';
  fapId: Scalars['Int']['output'];
  proposalsCount: Scalars['Int']['output'];
  proposalsCountByCall: Scalars['Int']['output'];
  role?: Maybe<Role>;
  user: BasicUserDetails;
  userId: Scalars['Int']['output'];
};

export type FapsFilter = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  callIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FapsQueryResult = {
  __typename?: 'FapsQueryResult';
  faps: Array<Fap>;
  totalCount: Scalars['Int']['output'];
};

export type Feature = {
  __typename?: 'Feature';
  description: Scalars['String']['output'];
  id: FeatureId;
  isEnabled: Scalars['Boolean']['output'];
};

export enum FeatureId {
  ConflictOfInterestWarning = 'CONFLICT_OF_INTEREST_WARNING',
  DataAccessUsers = 'DATA_ACCESS_USERS',
  EmailInvite = 'EMAIL_INVITE',
  EmailSearch = 'EMAIL_SEARCH',
  ExperimentSafetyReview = 'EXPERIMENT_SAFETY_REVIEW',
  FapReview = 'FAP_REVIEW',
  InstrumentManagement = 'INSTRUMENT_MANAGEMENT',
  Oauth = 'OAUTH',
  PregeneratedProposalPdf = 'PREGENERATED_PROPOSAL_PDF',
  RiskAssessment = 'RISK_ASSESSMENT',
  Scheduler = 'SCHEDULER',
  Shipping = 'SHIPPING',
  StfcIdleTimer = 'STFC_IDLE_TIMER',
  Tags = 'TAGS',
  TechnicalReview = 'TECHNICAL_REVIEW',
  TechniqueProposals = 'TECHNIQUE_PROPOSALS',
  UserManagement = 'USER_MANAGEMENT',
  UserSearchFilter = 'USER_SEARCH_FILTER',
  VisitManagement = 'VISIT_MANAGEMENT'
}

export enum FeatureUpdateAction {
  Disable = 'DISABLE',
  Enable = 'ENABLE'
}

export type Feedback = {
  __typename?: 'Feedback';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  experimentPk: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  status: FeedbackStatus;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FeedbackBasisConfig = {
  __typename?: 'FeedbackBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FeedbackRequest = {
  __typename?: 'FeedbackRequest';
  experimentPk: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  requestedAt: Scalars['DateTime']['output'];
};

export enum FeedbackStatus {
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type FeedbacksFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  experimentPk?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldCondition = {
  __typename?: 'FieldCondition';
  condition: EvaluatorOperator;
  params: Scalars['IntStringDateBoolArray']['output'];
};

export type FieldConditionInput = {
  condition: EvaluatorOperator;
  params: Scalars['String']['input'];
};

export type FieldConfig = BooleanConfig | DateConfig | DynamicMultipleChoiceConfig | EmbellishmentConfig | ExperimentSafetyReviewBasisConfig | FapReviewBasisConfig | FeedbackBasisConfig | FileUploadConfig | GenericTemplateBasisConfig | InstrumentPickerConfig | IntervalConfig | NumberInputConfig | ProposalBasisConfig | ProposalEsiBasisConfig | RichTextInputConfig | SampleBasisConfig | SampleDeclarationConfig | SampleEsiBasisConfig | SelectionFromOptionsConfig | ShipmentBasisConfig | SubTemplateConfig | TechnicalReviewBasisConfig | TechniquePickerConfig | TextInputConfig | VisitBasisConfig;

export type FieldDependency = {
  __typename?: 'FieldDependency';
  condition: FieldCondition;
  dependencyId: Scalars['String']['output'];
  dependencyNaturalKey: Scalars['String']['output'];
  questionId: Scalars['String']['output'];
};

export type FieldDependencyInput = {
  condition: FieldConditionInput;
  dependencyId: Scalars['String']['input'];
};

export type FileMetadata = {
  __typename?: 'FileMetadata';
  createdDate: Scalars['DateTime']['output'];
  fileId: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  originalFileName: Scalars['String']['output'];
  sizeInBytes: Scalars['Int']['output'];
};

export type FileUploadConfig = {
  __typename?: 'FileUploadConfig';
  file_type: Array<Scalars['String']['output']>;
  max_files: Scalars['Int']['output'];
  omitFromPdf: Scalars['Boolean']['output'];
  pdf_page_limit: Scalars['Int']['output'];
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FilesMetadataFilter = {
  fileIds: Array<Scalars['String']['input']>;
};

export type GenericTemplate = {
  __typename?: 'GenericTemplate';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionId: Scalars['String']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GenericTemplateBasisConfig = {
  __typename?: 'GenericTemplateBasisConfig';
  questionLabel: Scalars['String']['output'];
  readPermissions: Array<Scalars['String']['output']>;
  titlePlaceholder: Scalars['String']['output'];
};

export type GenericTemplatesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  genericTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Institution = {
  __typename?: 'Institution';
  country?: Maybe<Entry>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rorId?: Maybe<Scalars['String']['output']>;
};

export type InstitutionInput = {
  institutionData?: InputMaybe<InstitutionManualInput>;
  rorId?: InputMaybe<Scalars['String']['input']>;
};

export type InstitutionManualInput = {
  country: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InstitutionsFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Instrument = {
  __typename?: 'Instrument';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  instrumentContact?: Maybe<BasicUserDetails>;
  managerUserId: Scalars['Int']['output'];
  multipleTechReviewsEnabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  selectable?: Maybe<Scalars['Boolean']['output']>;
  shortCode: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
};

export type InstrumentFapMappingInput = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId: Scalars['Int']['input'];
};

export type InstrumentFilterInput = {
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  showAllProposals: Scalars['Boolean']['input'];
  showMultiInstrumentProposals: Scalars['Boolean']['input'];
};

export type InstrumentOption = {
  __typename?: 'InstrumentOption';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type InstrumentPickerConfig = {
  __typename?: 'InstrumentPickerConfig';
  instruments: Array<InstrumentOption>;
  isMultipleSelect: Scalars['Boolean']['output'];
  readPermissions: Array<Scalars['String']['output']>;
  requestTime: Scalars['Boolean']['output'];
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export enum InstrumentScientistDecisionEnum {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Unset = 'UNSET'
}

export type InstrumentWithAvailabilityTime = {
  __typename?: 'InstrumentWithAvailabilityTime';
  availabilityTime?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  fap?: Maybe<Fap>;
  fapId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  instrumentContact?: Maybe<BasicUserDetails>;
  managerUserId: Scalars['Int']['output'];
  multipleTechReviewsEnabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  selectable?: Maybe<Scalars['Boolean']['output']>;
  shortCode: Scalars['String']['output'];
  submitted?: Maybe<Scalars['Boolean']['output']>;
  tags?: Maybe<Array<Tag>>;
};

export type InstrumentWithManagementTime = {
  __typename?: 'InstrumentWithManagementTime';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  instrumentContact?: Maybe<BasicUserDetails>;
  managementTimeAllocation?: Maybe<Scalars['Int']['output']>;
  managerUserId: Scalars['Int']['output'];
  multipleTechReviewsEnabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  selectable?: Maybe<Scalars['Boolean']['output']>;
  shortCode: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
};

export type InstrumentsQueryResult = {
  __typename?: 'InstrumentsQueryResult';
  instruments: Array<Instrument>;
  totalCount: Scalars['Int']['output'];
};

export type InternalReview = {
  __typename?: 'InternalReview';
  assignedBy: Scalars['Int']['output'];
  assignedByUser?: Maybe<BasicUserDetails>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  files?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  reviewer?: Maybe<BasicUserDetails>;
  reviewerId: Scalars['Int']['output'];
  technicalReviewId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type InternalReviewsFilter = {
  reviewerId?: InputMaybe<Scalars['Int']['input']>;
  technicalReviewId?: InputMaybe<Scalars['Int']['input']>;
};

export type IntervalConfig = {
  __typename?: 'IntervalConfig';
  numberValueConstraint?: Maybe<NumberValueConstraint>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  units: Array<Unit>;
};

export type Invite = {
  __typename?: 'Invite';
  claimedAt?: Maybe<Scalars['DateTime']['output']>;
  claimedByUserId?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isEmailSent: Scalars['Boolean']['output'];
  proposal?: Maybe<InvitedProposal>;
};

export type InvitedProposal = {
  __typename?: 'InvitedProposal';
  abstract: Scalars['String']['output'];
  proposalId: Scalars['String']['output'];
  proposerName: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ManagementTimeAllocationsInput = {
  instrumentId: Scalars['Int']['input'];
  value: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptCoProposerInvite: Invite;
  acceptInviteWithCode: Invite;
  addClientLog: Scalars['Boolean']['output'];
  addSampleToExperiment: ExperimentHasSample;
  addSamplesToShipment: Shipment;
  addStatusToWorkflow: WorkflowStatus;
  addTechnicalReview: TechnicalReview;
  addUserForReview: Review;
  addUserRole: Scalars['Boolean']['output'];
  administrationProposal: Proposal;
  answerTopic: Array<AnswerBasic>;
  applyPatches: Array<Scalars['String']['output']>;
  approveVisitRegistration: VisitRegistration;
  assignCallsToTag: Scalars['Boolean']['output'];
  assignChairOrSecretary: Fap;
  assignFapReviewersToProposals: Fap;
  assignInstrumentsToCall: Call;
  assignInstrumentsToTag: Scalars['Boolean']['output'];
  assignInstrumentsToTechnique: Scalars['Boolean']['output'];
  assignProposalToTechniques: Scalars['Boolean']['output'];
  assignProposalsToFaps: Scalars['Boolean']['output'];
  assignProposalsToInstruments: Scalars['Boolean']['output'];
  assignReviewersToFap: Fap;
  assignScientistsToInstrument: Scalars['Boolean']['output'];
  assignScientistsToTechnique: Scalars['Boolean']['output'];
  assignTechniqueProposalsToInstruments: Scalars['Boolean']['output'];
  cancelVisitRegistration: VisitRegistration;
  changeProposalsStatus: Scalars['Boolean']['output'];
  changeTechniqueProposalsStatus: Scalars['Boolean']['output'];
  cloneExperimentSample: ExperimentHasSample;
  cloneGenericTemplate: GenericTemplate;
  cloneProposals: Array<Proposal>;
  cloneSample: Sample;
  cloneTemplate: Template;
  createApiAccessToken: PermissionsWithAccessToken;
  createCall: Call;
  createEmailTemplate: EmailTemplate;
  createExperimentSafety: ExperimentSafety;
  createExperimentSafetyPdfTemplate: ExperimentSafetyPdfTemplate;
  createFap: Fap;
  createFeedback: Feedback;
  createGenericTemplate: GenericTemplate;
  createGenericTemplateWithCopiedAnswers: Array<GenericTemplate>;
  createInstrument: Instrument;
  createInternalReview: InternalReview;
  createPredefinedMessage: PredefinedMessage;
  createProposal: Proposal;
  createProposalPdfTemplate: ProposalPdfTemplate;
  createProposalScientistComment: ProposalScientistComment;
  createQuestion: Question;
  createQuestionTemplateRelation: Template;
  createQuestionary: Questionary;
  createRole: Role;
  createSample: Sample;
  createShipment: Shipment;
  createStatus: Status;
  createTag: Tag;
  createTechnique: Technique;
  createTemplate: Template;
  createTopic: Template;
  createUnit: Unit;
  createVisit: Visit;
  createVisitRegistration: VisitRegistration;
  createWorkflow: Workflow;
  createWorkflowConnection: WorkflowConnection;
  deleteApiAccessToken: Scalars['Boolean']['output'];
  deleteCall: Call;
  deleteEmailTemplate: EmailTemplate;
  deleteExperimentSafetyPdfTemplate: ExperimentSafetyPdfTemplate;
  deleteFap: Fap;
  deleteFeedback: Feedback;
  deleteGenericTemplate: GenericTemplate;
  deleteInstitution: Institution;
  deleteInstrument: Instrument;
  deleteInternalReview: InternalReview;
  deletePredefinedMessage: PredefinedMessage;
  deleteProposal: Proposal;
  deleteProposalPdfTemplate: ProposalPdfTemplate;
  deleteProposalScientistComment: ProposalScientistComment;
  deleteQuestion: Question;
  deleteQuestionTemplateRelation: Template;
  deleteRole: Role;
  deleteSample: Sample;
  deleteShipment: Shipment;
  deleteStatus: Status;
  deleteTechnique: Technique;
  deleteTemplate: Template;
  deleteTopic: Template;
  deleteUnit: Unit;
  deleteUser: User;
  deleteVisit: Visit;
  deleteWorkflow: Workflow;
  deleteWorkflowConnection?: Maybe<WorkflowConnection>;
  deleteWorkflowStatus: Scalars['Boolean']['output'];
  externalTokenLogin: Scalars['String']['output'];
  getTokenForUser: Scalars['String']['output'];
  importProposal: Proposal;
  importTemplate: Template;
  importUnits: Array<Unit>;
  logout: Scalars['String']['output'];
  mergeInstitutions: Institution;
  notifyProposal: Proposal;
  prepareDB: Array<Scalars['String']['output']>;
  removeAssignedInstrumentFromCall: Call;
  removeCallFromTag: Scalars['Boolean']['output'];
  removeInstrumentFromTag: Scalars['Boolean']['output'];
  removeInstrumentsFromTechnique: Scalars['Boolean']['output'];
  removeMemberFromFap: Fap;
  removeMemberFromFapProposal: Fap;
  removeProposalsFromFaps: Array<FapProposal>;
  removeProposalsFromInstrument: Scalars['Boolean']['output'];
  removeSampleFromExperiment: ExperimentHasSample;
  removeScientistFromInstrument: Scalars['Boolean']['output'];
  removeScientistFromTechnique: Scalars['Boolean']['output'];
  removeUserForReview: Review;
  reorderFapMeetingDecisionProposals: FapMeetingDecision;
  replayStatusActionsLog: Scalars['Boolean']['output'];
  replayStatusActionsLogs: ReplayStatusActionsLogsResult;
  requestFeedback: FeedbackRequest;
  requestVisitRegistrationChanges: VisitRegistration;
  reviewExperimentSafety: ExperimentSafety;
  saveFapMeetingDecision: FapMeetingDecision;
  saveReviewerRank: Scalars['Boolean']['output'];
  selectRole: Scalars['String']['output'];
  setActiveTemplate: Scalars['Boolean']['output'];
  setCoProposerInvites: Array<Invite>;
  setInstrumentAvailabilityTime: Scalars['Boolean']['output'];
  setPageContent: Page;
  setStatusActionsOnConnection?: Maybe<Array<ConnectionStatusAction>>;
  setStatusChangingEventsOnConnection: Array<StatusChangingEvent>;
  setUserNotPlaceholder: User;
  submitExperimentSafety: ExperimentSafety;
  submitExperimentSafetyReviewerExperimentSafetyReview: ExperimentSafety;
  submitFapMeetingDecisions: Array<FapProposal>;
  submitInstrumentInFap: Scalars['Boolean']['output'];
  submitInstrumentScientistExperimentSafetyReview: ExperimentSafety;
  submitProposal: Proposal;
  submitProposalsReview: Scalars['Boolean']['output'];
  submitSampleReview: Sample;
  submitShipment: Shipment;
  submitTechnicalReviews: Scalars['Boolean']['output'];
  submitVisitRegistration: VisitRegistration;
  token: Scalars['String']['output'];
  unsubmitInstrumentInFap: Scalars['Boolean']['output'];
  updateAnswer: Scalars['String']['output'];
  updateApiAccessToken: PermissionsWithAccessToken;
  updateCall: Call;
  updateCallOrder: Scalars['Boolean']['output'];
  updateDataAccessUsers: Array<BasicUserDetails>;
  updateEmailTemplate: EmailTemplate;
  updateExperimentSafetyPdfTemplate: ExperimentSafetyPdfTemplate;
  updateExperimentSample: ExperimentHasSample;
  updateFap: Fap;
  updateFapTimeAllocation: FapProposal;
  updateFapToCallInstrument: Call;
  updateFeatures: Array<Feature>;
  updateFeedback: Feedback;
  updateGenericTemplate: GenericTemplate;
  updateInstitution: Institution;
  updateInstrument: Instrument;
  updateInternalReview: InternalReview;
  updatePredefinedMessage: PredefinedMessage;
  updateProposal: Proposal;
  updateProposalPdfTemplate: ProposalPdfTemplate;
  updateProposalScientistComment: ProposalScientistComment;
  updateQuestion: Question;
  updateQuestionTemplateRelation: Template;
  updateQuestionTemplateRelationSettings: Template;
  updateReview: Review;
  updateRole: UpdateRoleResponse;
  updateRoleTags: Role;
  updateSample: Sample;
  updateSettings: Settings;
  updateShipment: Shipment;
  updateStatus: Status;
  updateTag: Tag;
  updateTechnicalReviewAssignee: Array<TechnicalReview>;
  updateTechnique: Technique;
  updateTemplate: Template;
  updateTopic: Template;
  updateUser: User;
  updateUserRoles: User;
  updateVisit: Visit;
  updateVisitRegistration: VisitRegistration;
  updateWorkflow: Workflow;
  updateWorkflowStatus: WorkflowStatus;
  upsertUserByOidcSub: User;
  validateTemplateImport: TemplateValidation;
  validateUnitsImport: UnitsImportWithValidation;
};


export type MutationAcceptCoProposerInviteArgs = {
  proposalId: Scalars['String']['input'];
};


export type MutationAcceptInviteWithCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationAddClientLogArgs = {
  error: Scalars['String']['input'];
};


export type MutationAddSampleToExperimentArgs = {
  experimentPk: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type MutationAddSamplesToShipmentArgs = {
  sampleIds: Array<Scalars['Int']['input']>;
  shipmentId: Scalars['Int']['input'];
};


export type MutationAddStatusToWorkflowArgs = {
  newWorkflowStatusInput: AddStatusToWorkflowInput;
};


export type MutationAddTechnicalReviewArgs = {
  addTechnicalReviewInput: AddTechnicalReviewInput;
};


export type MutationAddUserForReviewArgs = {
  fapID: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationAddUserRoleArgs = {
  roleID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationAdministrationProposalArgs = {
  commentForManagement?: InputMaybe<Scalars['String']['input']>;
  commentForUser?: InputMaybe<Scalars['String']['input']>;
  finalStatus: ProposalEndStatus;
  managementDecisionSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  managementTimeAllocations: Array<ManagementTimeAllocationsInput>;
  proposalPk: Scalars['Int']['input'];
};


export type MutationAnswerTopicArgs = {
  answers: Array<AnswerInput>;
  isPartialSave?: InputMaybe<Scalars['Boolean']['input']>;
  questionaryId: Scalars['Int']['input'];
  topicId: Scalars['Int']['input'];
};


export type MutationApproveVisitRegistrationArgs = {
  visitRegistration: ApproveVisitRegistrationInput;
};


export type MutationAssignCallsToTagArgs = {
  callIds: Array<Scalars['Int']['input']>;
  tagId: Scalars['Int']['input'];
};


export type MutationAssignChairOrSecretaryArgs = {
  assignChairOrSecretaryToFapInput: AssignChairOrSecretaryToFapInput;
};


export type MutationAssignFapReviewersToProposalsArgs = {
  assignments: Array<FapReviewAssignmentInput>;
  fapId: Scalars['Int']['input'];
};


export type MutationAssignInstrumentsToCallArgs = {
  assignInstrumentsToCallInput: AssignInstrumentsToCallInput;
};


export type MutationAssignInstrumentsToTagArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
  tagId: Scalars['Int']['input'];
};


export type MutationAssignInstrumentsToTechniqueArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
  techniqueId: Scalars['Int']['input'];
};


export type MutationAssignProposalToTechniquesArgs = {
  proposalPk: Scalars['Int']['input'];
  techniqueIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignProposalsToFapsArgs = {
  fapInstruments: Array<FapInstrumentInput>;
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationAssignProposalsToInstrumentsArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationAssignReviewersToFapArgs = {
  fapId: Scalars['Int']['input'];
  memberIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignScientistsToInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
  scientistIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignScientistsToTechniqueArgs = {
  scientistIds: Array<Scalars['Int']['input']>;
  techniqueId: Scalars['Int']['input'];
};


export type MutationAssignTechniqueProposalsToInstrumentsArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationCancelVisitRegistrationArgs = {
  visitRegistration: CancelVisitRegistrationInput;
};


export type MutationChangeProposalsStatusArgs = {
  changeProposalsStatusInput: ChangeProposalsStatusInput;
};


export type MutationChangeTechniqueProposalsStatusArgs = {
  changeProposalsStatusInput: ChangeProposalsStatusInput;
};


export type MutationCloneExperimentSampleArgs = {
  experimentPk: Scalars['Int']['input'];
  newSampleTitle?: InputMaybe<Scalars['String']['input']>;
  sampleId: Scalars['Int']['input'];
};


export type MutationCloneGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCloneProposalsArgs = {
  cloneProposalsInput: CloneProposalsInput;
};


export type MutationCloneSampleArgs = {
  isPostProposalSubmission?: InputMaybe<Scalars['Boolean']['input']>;
  sampleId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCloneTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationCreateApiAccessTokenArgs = {
  createApiAccessTokenInput: CreateApiAccessTokenInput;
};


export type MutationCreateCallArgs = {
  createCallInput: CreateCallInput;
};


export type MutationCreateEmailTemplateArgs = {
  createEmailTemplateInput: CreateEmailTemplateInput;
};


export type MutationCreateExperimentSafetyArgs = {
  experimentPk: Scalars['Int']['input'];
};


export type MutationCreateExperimentSafetyPdfTemplateArgs = {
  dummyData: Scalars['String']['input'];
  templateData: Scalars['String']['input'];
  templateFooter: Scalars['String']['input'];
  templateHeader: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  templateSampleDeclaration: Scalars['String']['input'];
};


export type MutationCreateFapArgs = {
  active: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  customGradeGuide?: InputMaybe<Scalars['Boolean']['input']>;
  description: Scalars['String']['input'];
  gradeGuide?: InputMaybe<Scalars['String']['input']>;
  numberRatingsRequired?: Scalars['Int']['input'];
  reviewVisibility: Scalars['Int']['input'];
};


export type MutationCreateFeedbackArgs = {
  experimentPk: Scalars['Int']['input'];
};


export type MutationCreateGenericTemplateArgs = {
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateGenericTemplateWithCopiedAnswersArgs = {
  copyAnswersInput: Array<CopyAnswerInput>;
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationCreateInstrumentArgs = {
  description: Scalars['String']['input'];
  managerUserId: Scalars['Int']['input'];
  multipleTechReviewsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  selectable?: InputMaybe<Scalars['Boolean']['input']>;
  shortCode: Scalars['String']['input'];
};


export type MutationCreateInternalReviewArgs = {
  createInternalReviewInput: CreateInternalReviewInput;
};


export type MutationCreatePredefinedMessageArgs = {
  createPredefinedMessageInput: CreatePredefinedMessageInput;
};


export type MutationCreateProposalArgs = {
  callId: Scalars['Int']['input'];
};


export type MutationCreateProposalPdfTemplateArgs = {
  dummyData: Scalars['String']['input'];
  templateData: Scalars['String']['input'];
  templateFooter: Scalars['String']['input'];
  templateHeader: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  templateSampleDeclaration: Scalars['String']['input'];
};


export type MutationCreateProposalScientistCommentArgs = {
  comment: Scalars['String']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type MutationCreateQuestionArgs = {
  categoryId: TemplateCategoryId;
  dataType: DataType;
};


export type MutationCreateQuestionTemplateRelationArgs = {
  questionId: Scalars['String']['input'];
  sortOrder: Scalars['Int']['input'];
  templateId: Scalars['Int']['input'];
  topicId: Scalars['Int']['input'];
};


export type MutationCreateQuestionaryArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationCreateRoleArgs = {
  args: CreateRoleArgs;
};


export type MutationCreateSampleArgs = {
  isPostProposalSubmission?: InputMaybe<Scalars['Boolean']['input']>;
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateShipmentArgs = {
  experimentPk: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateStatusArgs = {
  newStatusInput: CreateStatusInput;
};


export type MutationCreateTagArgs = {
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationCreateTechniqueArgs = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationCreateTemplateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  groupId: TemplateGroupId;
  name: Scalars['String']['input'];
};


export type MutationCreateTopicArgs = {
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  templateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateUnitArgs = {
  id: Scalars['String']['input'];
  quantity: Scalars['String']['input'];
  siConversionFormula: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
  unit: Scalars['String']['input'];
};


export type MutationCreateVisitArgs = {
  experimentPk: Scalars['Int']['input'];
  inviteEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  team: Array<Scalars['Int']['input']>;
  teamLeadUserId: Scalars['Int']['input'];
};


export type MutationCreateVisitRegistrationArgs = {
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};


export type MutationCreateWorkflowArgs = {
  newWorkflowInput: CreateWorkflowInput;
};


export type MutationCreateWorkflowConnectionArgs = {
  newWorkflowConnectionInput: CreateWorkflowConnectionInput;
};


export type MutationDeleteApiAccessTokenArgs = {
  deleteApiAccessTokenInput: DeleteApiAccessTokenInput;
};


export type MutationDeleteCallArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEmailTemplateArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteExperimentSafetyPdfTemplateArgs = {
  experimentSafetyPdfTemplateId: Scalars['Int']['input'];
};


export type MutationDeleteFapArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFeedbackArgs = {
  feedbackId: Scalars['Int']['input'];
};


export type MutationDeleteGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
};


export type MutationDeleteInstitutionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteInstrumentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteInternalReviewArgs = {
  deleteInternalReviewInput: DeleteInternalReviewInput;
};


export type MutationDeletePredefinedMessageArgs = {
  deletePredefinedMessageInput: DeletePredefinedMessageInput;
};


export type MutationDeleteProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationDeleteProposalPdfTemplateArgs = {
  proposalPdfTemplateId: Scalars['Int']['input'];
};


export type MutationDeleteProposalScientistCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String']['input'];
};


export type MutationDeleteQuestionTemplateRelationArgs = {
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  roleId: Scalars['Int']['input'];
};


export type MutationDeleteSampleArgs = {
  sampleId: Scalars['Int']['input'];
};


export type MutationDeleteShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type MutationDeleteStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTechniqueArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationDeleteTopicArgs = {
  topicId: Scalars['Int']['input'];
};


export type MutationDeleteUnitArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteVisitArgs = {
  visitId: Scalars['Int']['input'];
};


export type MutationDeleteWorkflowArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteWorkflowConnectionArgs = {
  connectionId: Scalars['Int']['input'];
};


export type MutationDeleteWorkflowStatusArgs = {
  deleteWorkflowStatusInput: DeleteWorkflowStatusInput;
};


export type MutationExternalTokenLoginArgs = {
  externalToken: Scalars['String']['input'];
  iss?: InputMaybe<Scalars['String']['input']>;
  redirectUri: Scalars['String']['input'];
};


export type MutationGetTokenForUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationImportProposalArgs = {
  abstract: Scalars['String']['input'];
  callId: Scalars['Int']['input'];
  created?: InputMaybe<Scalars['DateTime']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  referenceNumber: Scalars['Int']['input'];
  submittedDate: Scalars['DateTime']['input'];
  submitterId: Scalars['Int']['input'];
  techniqueIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationImportTemplateArgs = {
  conflictResolutions: Array<ConflictResolution>;
  subTemplatesConflictResolutions: Array<Array<ConflictResolution>>;
  templateAsJson: Scalars['String']['input'];
};


export type MutationImportUnitsArgs = {
  conflictResolutions: Array<ConflictResolution>;
  json: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  token: Scalars['String']['input'];
};


export type MutationMergeInstitutionsArgs = {
  institutionIdFrom: Scalars['Int']['input'];
  institutionIdInto: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
};


export type MutationNotifyProposalArgs = {
  ignoreNotifiedFlag: Scalars['Boolean']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type MutationPrepareDbArgs = {
  includeSeeds?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRemoveAssignedInstrumentFromCallArgs = {
  removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput;
};


export type MutationRemoveCallFromTagArgs = {
  callId: Scalars['Int']['input'];
  tagId: Scalars['Int']['input'];
};


export type MutationRemoveInstrumentFromTagArgs = {
  instrumentId: Scalars['Int']['input'];
  tagId: Scalars['Int']['input'];
};


export type MutationRemoveInstrumentsFromTechniqueArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
  techniqueId: Scalars['Int']['input'];
};


export type MutationRemoveMemberFromFapArgs = {
  fapId: Scalars['Int']['input'];
  memberId: Scalars['Int']['input'];
  roleId: UserRole;
};


export type MutationRemoveMemberFromFapProposalArgs = {
  fapId: Scalars['Int']['input'];
  memberId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type MutationRemoveProposalsFromFapsArgs = {
  fapIds: Array<Scalars['Int']['input']>;
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationRemoveProposalsFromInstrumentArgs = {
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationRemoveSampleFromExperimentArgs = {
  experimentPk: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type MutationRemoveScientistFromInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
  scientistId: Scalars['Int']['input'];
};


export type MutationRemoveScientistFromTechniqueArgs = {
  scientistId: Scalars['Int']['input'];
  techniqueId: Scalars['Int']['input'];
};


export type MutationRemoveUserForReviewArgs = {
  fapId: Scalars['Int']['input'];
  reviewId: Scalars['Int']['input'];
};


export type MutationReorderFapMeetingDecisionProposalsArgs = {
  reorderFapMeetingDecisionProposalsInput: ReorderFapMeetingDecisionProposalsInput;
};


export type MutationReplayStatusActionsLogArgs = {
  statusActionsLogId: Scalars['Int']['input'];
};


export type MutationReplayStatusActionsLogsArgs = {
  statusActionsLogIds: Array<Scalars['Int']['input']>;
};


export type MutationRequestFeedbackArgs = {
  experimentPk: Scalars['Int']['input'];
};


export type MutationRequestVisitRegistrationChangesArgs = {
  visitRegistration: RequestVisitRegistrationChangesInput;
};


export type MutationReviewExperimentSafetyArgs = {
  experimentSafetyPk: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSaveFapMeetingDecisionArgs = {
  saveFapMeetingDecisionInput: SaveFapMeetingDecisionInput;
};


export type MutationSaveReviewerRankArgs = {
  fapReviewId: Scalars['Int']['input'];
  rank: Scalars['Int']['input'];
  reviewerId: Scalars['Int']['input'];
};


export type MutationSelectRoleArgs = {
  selectedRoleId?: InputMaybe<Scalars['Int']['input']>;
  token: Scalars['String']['input'];
};


export type MutationSetActiveTemplateArgs = {
  templateGroupId: TemplateGroupId;
  templateId: Scalars['Int']['input'];
};


export type MutationSetCoProposerInvitesArgs = {
  input: SetCoProposerInvitesInput;
};


export type MutationSetInstrumentAvailabilityTimeArgs = {
  availabilityTime: Scalars['Int']['input'];
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};


export type MutationSetPageContentArgs = {
  id: PageName;
  text: Scalars['String']['input'];
};


export type MutationSetStatusActionsOnConnectionArgs = {
  input: SetStatusActionsOnConnectionInput;
};


export type MutationSetStatusChangingEventsOnConnectionArgs = {
  setStatusChangingEventsOnConnectionInput: SetStatusChangingEventsOnConnectionInput;
};


export type MutationSetUserNotPlaceholderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSubmitExperimentSafetyArgs = {
  experimentSafetyPk: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSubmitExperimentSafetyReviewerExperimentSafetyReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  decision?: InputMaybe<ExperimentSafetyReviewerDecisionEnum>;
  experimentSafetyPk: Scalars['Int']['input'];
};


export type MutationSubmitFapMeetingDecisionsArgs = {
  SubmitFapMeetingDecisionsInput: SubmitFapMeetingDecisionsInput;
};


export type MutationSubmitInstrumentInFapArgs = {
  callId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};


export type MutationSubmitInstrumentScientistExperimentSafetyReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  decision?: InputMaybe<InstrumentScientistDecisionEnum>;
  experimentSafetyPk: Scalars['Int']['input'];
};


export type MutationSubmitProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationSubmitProposalsReviewArgs = {
  submitProposalsReviewInput: SubmitProposalsReviewInput;
};


export type MutationSubmitSampleReviewArgs = {
  safetyComment?: InputMaybe<Scalars['String']['input']>;
  safetyStatus: SampleStatus;
  sampleId: Scalars['Int']['input'];
};


export type MutationSubmitShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type MutationSubmitTechnicalReviewsArgs = {
  submitTechnicalReviewsInput: SubmitTechnicalReviewsInput;
};


export type MutationSubmitVisitRegistrationArgs = {
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};


export type MutationTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationUnsubmitInstrumentInFapArgs = {
  callId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};


export type MutationUpdateAnswerArgs = {
  answer: AnswerInput;
  questionaryId: Scalars['Int']['input'];
};


export type MutationUpdateApiAccessTokenArgs = {
  updateApiAccessTokenInput: UpdateApiAccessTokenInput;
};


export type MutationUpdateCallArgs = {
  updateCallInput: UpdateCallInput;
};


export type MutationUpdateCallOrderArgs = {
  callOrderInput: CallOrderInput;
};


export type MutationUpdateDataAccessUsersArgs = {
  proposalPk: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationUpdateEmailTemplateArgs = {
  updateEmailTemplateInput: UpdateEmailTemplateInput;
};


export type MutationUpdateExperimentSafetyPdfTemplateArgs = {
  dummyData?: InputMaybe<Scalars['String']['input']>;
  experimentSafetyPdfTemplateId: Scalars['Int']['input'];
  templateData?: InputMaybe<Scalars['String']['input']>;
  templateFooter?: InputMaybe<Scalars['String']['input']>;
  templateHeader?: InputMaybe<Scalars['String']['input']>;
  templateSampleDeclaration?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateExperimentSampleArgs = {
  experimentPk: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  sampleId: Scalars['Int']['input'];
};


export type MutationUpdateFapArgs = {
  active: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  customGradeGuide?: InputMaybe<Scalars['Boolean']['input']>;
  description: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
  gradeGuide?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  numberRatingsRequired?: Scalars['Int']['input'];
  reviewVisibility?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateFapTimeAllocationArgs = {
  fapId: Scalars['Int']['input'];
  fapTimeAllocation?: InputMaybe<Scalars['Int']['input']>;
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type MutationUpdateFapToCallInstrumentArgs = {
  updateFapToCallInstrumentInput: UpdateFapToCallInstrumentInput;
};


export type MutationUpdateFeaturesArgs = {
  updatedFeaturesInput: UpdateFeaturesInput;
};


export type MutationUpdateFeedbackArgs = {
  feedbackId: Scalars['Int']['input'];
  status?: InputMaybe<FeedbackStatus>;
};


export type MutationUpdateGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
  safetyComment?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateInstitutionArgs = {
  country?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  rorId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateInstrumentArgs = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  managerUserId: Scalars['Int']['input'];
  multipleTechReviewsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  selectable?: InputMaybe<Scalars['Boolean']['input']>;
  shortCode: Scalars['String']['input'];
  updateTechReview: Scalars['Boolean']['input'];
};


export type MutationUpdateInternalReviewArgs = {
  updateInternalReviewInput: UpdateInternalReviewInput;
};


export type MutationUpdatePredefinedMessageArgs = {
  updatePredefinedMessageInput: UpdatePredefinedMessageInput;
};


export type MutationUpdateProposalArgs = {
  abstract: Scalars['String']['input'];
  created?: InputMaybe<Scalars['DateTime']['input']>;
  proposalPk: Scalars['Int']['input'];
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateProposalPdfTemplateArgs = {
  dummyData?: InputMaybe<Scalars['String']['input']>;
  proposalPdfTemplateId: Scalars['Int']['input'];
  templateData?: InputMaybe<Scalars['String']['input']>;
  templateFooter?: InputMaybe<Scalars['String']['input']>;
  templateHeader?: InputMaybe<Scalars['String']['input']>;
  templateSampleDeclaration?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProposalScientistCommentArgs = {
  comment: Scalars['String']['input'];
  commentId: Scalars['Int']['input'];
};


export type MutationUpdateQuestionArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  naturalKey?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateQuestionTemplateRelationArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['String']['input'];
  sortOrder: Scalars['Int']['input'];
  templateId: Scalars['Int']['input'];
  topicId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateQuestionTemplateRelationSettingsArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  dependencies: Array<FieldDependencyInput>;
  dependenciesOperator?: InputMaybe<DependenciesLogicOperator>;
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationUpdateReviewArgs = {
  comment: Scalars['String']['input'];
  fapID: Scalars['Int']['input'];
  grade: Scalars['String']['input'];
  questionaryID: Scalars['Int']['input'];
  reviewID: Scalars['Int']['input'];
  status: ReviewStatus;
};


export type MutationUpdateRoleArgs = {
  args: UpdateRoleArgs;
};


export type MutationUpdateRoleTagsArgs = {
  roleId: Scalars['Int']['input'];
  tagIds: Array<Scalars['Int']['input']>;
};


export type MutationUpdateSampleArgs = {
  sampleId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSettingsArgs = {
  updatedSettingsInput: UpdateSettingsInput;
};


export type MutationUpdateShipmentArgs = {
  externalRef?: InputMaybe<Scalars['String']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  shipmentId: Scalars['Int']['input'];
  status?: InputMaybe<ShipmentStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateStatusArgs = {
  updatedStatusInput: UpdateStatusInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationUpdateTechnicalReviewAssigneeArgs = {
  instrumentId: Scalars['Int']['input'];
  proposalPks: Array<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type MutationUpdateTechniqueArgs = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationUpdateTemplateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  templateId: Scalars['Int']['input'];
};


export type MutationUpdateTopicArgs = {
  id: Scalars['Int']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  templateId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  institutionId?: InputMaybe<Scalars['Int']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  preferredname?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  userTitle?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserRolesArgs = {
  id: Scalars['Int']['input'];
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateVisitArgs = {
  inviteEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  team?: InputMaybe<Array<Scalars['Int']['input']>>;
  teamLeadUserId?: InputMaybe<Scalars['Int']['input']>;
  visitId: Scalars['Int']['input'];
};


export type MutationUpdateVisitRegistrationArgs = {
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  startsAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};


export type MutationUpdateWorkflowArgs = {
  updatedWorkflowInput: UpdateWorkflowInput;
};


export type MutationUpdateWorkflowStatusArgs = {
  updateWorkflowStatusInput: UpdateWorkflowStatusInput;
};


export type MutationUpsertUserByOidcSubArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  institution: InstitutionInput;
  lastName: Scalars['String']['input'];
  oidcSub: Scalars['String']['input'];
  preferredName?: InputMaybe<Scalars['String']['input']>;
  userTitle?: InputMaybe<Scalars['String']['input']>;
};


export type MutationValidateTemplateImportArgs = {
  templateAsJson: Scalars['String']['input'];
};


export type MutationValidateUnitsImportArgs = {
  unitsAsJson: Scalars['String']['input'];
};

export type NumberInputConfig = {
  __typename?: 'NumberInputConfig';
  numberMax?: Maybe<Scalars['Float']['output']>;
  numberMaxInclusive?: Maybe<Scalars['Boolean']['output']>;
  numberMin?: Maybe<Scalars['Float']['output']>;
  numberMinInclusive?: Maybe<Scalars['Boolean']['output']>;
  numberValueConstraint?: Maybe<NumberValueConstraint>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  units: Array<Unit>;
};

export enum NumberValueConstraint {
  None = 'NONE',
  OnlyNegative = 'ONLY_NEGATIVE',
  OnlyNegativeInteger = 'ONLY_NEGATIVE_INTEGER',
  OnlyPositive = 'ONLY_POSITIVE',
  OnlyPositiveInteger = 'ONLY_POSITIVE_INTEGER'
}

export type Page = {
  __typename?: 'Page';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export enum PageName {
  Cookiepage = 'COOKIEPAGE',
  Footercontent = 'FOOTERCONTENT',
  Gradeguidepage = 'GRADEGUIDEPAGE',
  Helppage = 'HELPPAGE',
  Homepage = 'HOMEPAGE',
  Loginhelppage = 'LOGINHELPPAGE',
  Privacypage = 'PRIVACYPAGE',
  Reviewpage = 'REVIEWPAGE',
  Techniqueproposalmanagementpage = 'TECHNIQUEPROPOSALMANAGEMENTPAGE'
}

export enum PaginationSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PermissionsWithAccessToken = {
  __typename?: 'PermissionsWithAccessToken';
  accessPermissions: Scalars['String']['output'];
  accessToken: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PredefinedMessage = {
  __typename?: 'PredefinedMessage';
  dateModified: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastModifiedBy: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  modifiedBy: BasicUserDetails;
  title: Scalars['String']['output'];
};

export type PredefinedMessagesFilter = {
  key?: InputMaybe<Scalars['String']['input']>;
};

export type Proposal = {
  __typename?: 'Proposal';
  abstract: Scalars['String']['output'];
  attachments?: Maybe<ProposalAttachments>;
  call?: Maybe<Call>;
  callId: Scalars['Int']['output'];
  coProposerInvites: Array<Invite>;
  commentForManagement?: Maybe<Scalars['String']['output']>;
  commentForUser?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  dataAccessUsers?: Maybe<Array<BasicUserDetails>>;
  experimentSequence?: Maybe<Scalars['Int']['output']>;
  experiments?: Maybe<Array<Experiment>>;
  fapMeetingDecisions?: Maybe<Array<FapMeetingDecision>>;
  faps?: Maybe<Array<Fap>>;
  fileId?: Maybe<Scalars['String']['output']>;
  finalStatus?: Maybe<ProposalEndStatus>;
  genericTemplates?: Maybe<Array<GenericTemplate>>;
  instruments?: Maybe<Array<Maybe<InstrumentWithManagementTime>>>;
  managementDecisionSubmitted: Scalars['Boolean']['output'];
  notified: Scalars['Boolean']['output'];
  primaryKey: Scalars['Int']['output'];
  proposalId: Scalars['String']['output'];
  proposer?: Maybe<BasicUserDetails>;
  proposerId: Scalars['Int']['output'];
  publicStatus: ProposalPublicStatus;
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  samples?: Maybe<Array<Sample>>;
  status?: Maybe<Status>;
  statusId: Scalars['String']['output'];
  submitted: Scalars['Boolean']['output'];
  submittedDate?: Maybe<Scalars['DateTime']['output']>;
  technicalReviews: Array<TechnicalReview>;
  techniques?: Maybe<Array<Maybe<Technique>>>;
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  users: Array<BasicUserDetails>;
  visits?: Maybe<Array<Visit>>;
  workflowStatusId: Scalars['Int']['output'];
};


export type ProposalFapMeetingDecisionsArgs = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
};


export type ProposalReviewsArgs = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
};

export type ProposalAttachments = {
  __typename?: 'ProposalAttachments';
  questions?: Maybe<Array<Question>>;
};

export type ProposalBasisConfig = {
  __typename?: 'ProposalBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  tooltip: Scalars['String']['output'];
};

export enum ProposalEndStatus {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Reserved = 'RESERVED',
  Unset = 'UNSET'
}

export type ProposalEsiBasisConfig = {
  __typename?: 'ProposalEsiBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  tooltip: Scalars['String']['output'];
};

export type ProposalPdfTemplate = {
  __typename?: 'ProposalPdfTemplate';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  dummyData: Scalars['String']['output'];
  proposalPdfTemplateId: Scalars['Int']['output'];
  templateData: Scalars['String']['output'];
  templateFooter: Scalars['String']['output'];
  templateHeader: Scalars['String']['output'];
  templateId: Scalars['Int']['output'];
  templateSampleDeclaration: Scalars['String']['output'];
};

export type ProposalPdfTemplatesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  dummyData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateFooter?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateHeader?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateSampleDeclaration?: InputMaybe<Scalars['String']['input']>;
  proposalPdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ProposalPkWithRankOrder = {
  fapId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  rankOrder: Scalars['Int']['input'];
};

export type ProposalPkWithReviewId = {
  proposalPk: Scalars['Int']['input'];
  reviewId: Scalars['Int']['input'];
};

export enum ProposalPublicStatus {
  Accepted = 'accepted',
  Draft = 'draft',
  Rejected = 'rejected',
  Reserved = 'reserved',
  Submitted = 'submitted',
  Unknown = 'unknown'
}

export type ProposalReaderRoleConfig = {
  __typename?: 'ProposalReaderRoleConfig';
  hasAdminAccess: Scalars['Boolean']['output'];
  hasFapAccess: Scalars['Boolean']['output'];
  hasLogAccess: Scalars['Boolean']['output'];
  hasTechnicalReviewAccess: Scalars['Boolean']['output'];
};

export type ProposalReaderRoleConfigInput = {
  hasAdminAccess: Scalars['Boolean']['input'];
  hasFapAccess: Scalars['Boolean']['input'];
  hasLogAccess: Scalars['Boolean']['input'];
  hasTechnicalReviewAccess: Scalars['Boolean']['input'];
};

export type ProposalScientistComment = {
  __typename?: 'ProposalScientistComment';
  comment: Scalars['String']['output'];
  commentId: Scalars['Int']['output'];
  proposalPk: Scalars['Int']['output'];
};

export type ProposalTemplate = {
  __typename?: 'ProposalTemplate';
  callCount: Scalars['Int']['output'];
  complementaryQuestions: Array<Question>;
  description?: Maybe<Scalars['String']['output']>;
  experimentSafetyPdfCallCount?: Maybe<Scalars['Int']['output']>;
  experimentSafetyPdfTemplate?: Maybe<ExperimentSafetyPdfTemplate>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfCallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfTemplate?: Maybe<ProposalPdfTemplate>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type ProposalTemplatesFilter = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ProposalView = {
  __typename?: 'ProposalView';
  allocationTimeUnit: AllocationTimeUnits;
  callId: Scalars['Int']['output'];
  callShortCode?: Maybe<Scalars['String']['output']>;
  fapInstruments?: Maybe<Array<FapInstrument>>;
  faps?: Maybe<Array<ProposalViewFap>>;
  finalStatus?: Maybe<ProposalEndStatus>;
  instruments?: Maybe<Array<ProposalViewInstrument>>;
  notified: Scalars['Boolean']['output'];
  primaryKey: Scalars['Int']['output'];
  principalInvestigator?: Maybe<User>;
  principalInvestigatorId: Scalars['Int']['output'];
  proposalId: Scalars['String']['output'];
  statusDescription: Scalars['String']['output'];
  statusId: Scalars['String']['output'];
  statusName: Scalars['String']['output'];
  submitted: Scalars['Boolean']['output'];
  submittedDate?: Maybe<Scalars['DateTime']['output']>;
  technicalReviews?: Maybe<Array<ProposalViewTechnicalReview>>;
  techniques?: Maybe<Array<ProposalViewTechnique>>;
  title: Scalars['String']['output'];
  workflowId: Scalars['Int']['output'];
  workflowStatusId: Scalars['Int']['output'];
};

export type ProposalViewFap = {
  __typename?: 'ProposalViewFap';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type ProposalViewInstrument = {
  __typename?: 'ProposalViewInstrument';
  id: Scalars['Int']['output'];
  managementTimeAllocation?: Maybe<Scalars['Int']['output']>;
  managerUserId: Scalars['Int']['output'];
  multipleTechReviewsEnabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
};

export type ProposalViewTechnicalReview = {
  __typename?: 'ProposalViewTechnicalReview';
  id: Scalars['Int']['output'];
  instrumentId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['output'];
  technicalReviewAssignee?: Maybe<ProposalViewTechnicalReviewAssignee>;
  timeAllocation?: Maybe<Scalars['Int']['output']>;
};

export type ProposalViewTechnicalReviewAssignee = {
  __typename?: 'ProposalViewTechnicalReviewAssignee';
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
};

export type ProposalViewTechnique = {
  __typename?: 'ProposalViewTechnique';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  shortCode: Scalars['String']['output'];
};

export type ProposalsFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  callIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  dateFilter?: InputMaybe<DateFilterInput>;
  excludeProposalStatusIds?: InputMaybe<Array<Scalars['String']['input']>>;
  instrumentFilter?: InputMaybe<InstrumentFilterInput>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  proposalStatusId?: InputMaybe<Scalars['String']['input']>;
  questionFilter?: InputMaybe<QuestionFilterInput>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  referenceNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  reviewer?: InputMaybe<ReviewerFilter>;
  shortCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  techniqueFilter?: InputMaybe<TechniqueFilterInput>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ProposalsQueryResult = {
  __typename?: 'ProposalsQueryResult';
  proposals: Array<Proposal>;
  totalCount: Scalars['Int']['output'];
};

export type ProposalsViewQueryResult = {
  __typename?: 'ProposalsViewQueryResult';
  proposalViews: Array<ProposalView>;
  totalCount: Scalars['Int']['output'];
};

export type ProposalsViewResult = {
  __typename?: 'ProposalsViewResult';
  proposals: Array<ProposalView>;
  totalCount: Scalars['Int']['output'];
};

export type Quantity = {
  __typename?: 'Quantity';
  id: Scalars['String']['output'];
};

export type QueriesMutationsAndServices = {
  __typename?: 'QueriesMutationsAndServices';
  mutations: Array<QueryMutationAndServicesGroup>;
  queries: Array<QueryMutationAndServicesGroup>;
  services: Array<QueryMutationAndServicesGroup>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  accessTokenAndPermissions?: Maybe<PermissionsWithAccessToken>;
  activeTemplateId?: Maybe<Scalars['Int']['output']>;
  allAccessTokensAndPermissions?: Maybe<Array<PermissionsWithAccessToken>>;
  allExperiments?: Maybe<ExperimentsQueryResult>;
  allQuestions: AllQuestionsQueryResult;
  basicUserDetails?: Maybe<BasicUserDetails>;
  basicUserDetailsByEmail?: Maybe<BasicUserDetails>;
  blankQuestionary: Questionary;
  blankQuestionarySteps?: Maybe<Array<QuestionaryStep>>;
  blankQuestionaryStepsByCallId?: Maybe<Array<QuestionaryStep>>;
  call?: Maybe<Call>;
  calls?: Maybe<Array<Call>>;
  callsByInstrumentScientist?: Maybe<Array<Call>>;
  callsOfReviewer?: Maybe<Array<Call>>;
  checkEmailExist?: Maybe<Scalars['Boolean']['output']>;
  checkExternalToken: ExternalTokenResult;
  checkToken: TokenResult;
  countries?: Maybe<Array<Entry>>;
  dataAccessUsers: Array<BasicUserDetails>;
  emailTemplate?: Maybe<EmailTemplate>;
  emailTemplates?: Maybe<EmailTemplatesQueryResult>;
  eventLogs?: Maybe<Array<EventLog>>;
  events?: Maybe<Array<WorkflowEvent>>;
  experiment: Experiment;
  experimentSafety?: Maybe<ExperimentSafety>;
  experimentSafetyPdfTemplate?: Maybe<ExperimentSafetyPdfTemplate>;
  experimentSafetyPdfTemplates?: Maybe<Array<ExperimentSafetyPdfTemplate>>;
  experimentSample?: Maybe<ExperimentHasSample>;
  factoryVersion: Scalars['String']['output'];
  fap?: Maybe<Fap>;
  fapMembers?: Maybe<Array<FapReviewer>>;
  fapProposal?: Maybe<FapProposal>;
  fapProposals?: Maybe<Array<FapProposal>>;
  fapProposalsByInstrument?: Maybe<Array<FapProposal>>;
  fapReviewTemplates?: Maybe<Array<FapReviewTemplate>>;
  fapReviewVisibilityOptions?: Maybe<Array<ReviewVisibility>>;
  fapReviewers?: Maybe<Array<FapReviewer>>;
  faps?: Maybe<FapsQueryResult>;
  features: Array<Feature>;
  feedback?: Maybe<Feedback>;
  feedbacks: Array<Feedback>;
  fileMetadata?: Maybe<FileMetadata>;
  filesMetadata: Array<FileMetadata>;
  genericTemplate?: Maybe<GenericTemplate>;
  genericTemplates?: Maybe<Array<GenericTemplate>>;
  genericTemplatesOnCopy?: Maybe<Array<GenericTemplate>>;
  getCallByAnswerId?: Maybe<Call>;
  getDynamicMultipleChoiceOptions?: Maybe<Array<Scalars['String']['output']>>;
  getInstrumentsOfReviewer?: Maybe<Array<Instrument>>;
  institutions?: Maybe<Array<Institution>>;
  instrument?: Maybe<Instrument>;
  instrumentScientistHasAccess?: Maybe<Scalars['Boolean']['output']>;
  instrumentScientistHasInstrument?: Maybe<Scalars['Boolean']['output']>;
  instrumentScientistProposals?: Maybe<ProposalsViewResult>;
  instruments?: Maybe<InstrumentsQueryResult>;
  instrumentsByFap?: Maybe<Array<InstrumentWithAvailabilityTime>>;
  instrumentsByIds?: Maybe<Array<InstrumentWithAvailabilityTime>>;
  internalReview?: Maybe<InternalReview>;
  internalReviews?: Maybe<Array<InternalReview>>;
  isNaturalKeyPresent?: Maybe<Scalars['Boolean']['output']>;
  me?: Maybe<User>;
  myShipments?: Maybe<Array<Shipment>>;
  myVisits: Array<Visit>;
  pageContent?: Maybe<Scalars['String']['output']>;
  predefinedMessage?: Maybe<PredefinedMessage>;
  predefinedMessages: Array<PredefinedMessage>;
  previousCollaborators?: Maybe<UserQueryResult>;
  proposal?: Maybe<Proposal>;
  proposalById?: Maybe<Proposal>;
  proposalPdfTemplate?: Maybe<ProposalPdfTemplate>;
  proposalPdfTemplates?: Maybe<Array<ProposalPdfTemplate>>;
  proposalReviews?: Maybe<Array<Review>>;
  proposalScientistComment?: Maybe<ProposalScientistComment>;
  proposalTemplates?: Maybe<Array<ProposalTemplate>>;
  proposals?: Maybe<ProposalsQueryResult>;
  proposalsView?: Maybe<ProposalsViewQueryResult>;
  quantities: Array<Quantity>;
  queriesMutationsAndServices?: Maybe<QueriesMutationsAndServices>;
  questionByNaturalKey: Question;
  questionary?: Maybe<Questionary>;
  questions: Array<QuestionWithUsage>;
  review?: Maybe<Review>;
  reviews?: Maybe<ReviewsQueryResult>;
  roles?: Maybe<Array<Role>>;
  sample?: Maybe<Sample>;
  samples?: Maybe<Array<Sample>>;
  samplesByCallId?: Maybe<Array<Sample>>;
  settings: Array<Settings>;
  shipment?: Maybe<Shipment>;
  shipments?: Maybe<Array<Shipment>>;
  status?: Maybe<Status>;
  statusActions?: Maybe<Array<StatusAction>>;
  statusActionsLogs?: Maybe<StatusActionsLogQueryResult>;
  statuses: Array<Status>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  technicalReview?: Maybe<TechnicalReview>;
  technicalReviewTemplates?: Maybe<Array<TechnicalReviewTemplate>>;
  technicalReviews?: Maybe<TechnicalReviewsQueryResult>;
  technique?: Maybe<Technique>;
  techniqueScientistProposals?: Maybe<ProposalsViewResult>;
  techniques?: Maybe<TechniquesQueryResult>;
  techniquesByIds?: Maybe<Array<Technique>>;
  techniquesByScientist?: Maybe<Array<Technique>>;
  template?: Maybe<Template>;
  templateCategories?: Maybe<Array<TemplateCategory>>;
  templates?: Maybe<Array<Template>>;
  units?: Maybe<Array<Unit>>;
  unitsAsJson?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userByOIDCSub?: Maybe<User>;
  userHasAccessToProposal?: Maybe<Scalars['Boolean']['output']>;
  userInstruments?: Maybe<InstrumentsQueryResult>;
  users?: Maybe<UserQueryResult>;
  version: Scalars['String']['output'];
  visit?: Maybe<Visit>;
  visitRegistration?: Maybe<VisitRegistration>;
  visits: Array<Visit>;
  workflow?: Maybe<Workflow>;
  workflowStatus?: Maybe<WorkflowStatus>;
  workflowStatuses: Array<WorkflowStatus>;
  workflows?: Maybe<Array<Workflow>>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']['input']>;
};


export type QueryAccessTokenAndPermissionsArgs = {
  accessTokenId: Scalars['String']['input'];
};


export type QueryActiveTemplateIdArgs = {
  templateGroupId: TemplateGroupId;
};


export type QueryAllExperimentsArgs = {
  filter?: InputMaybe<ExperimentsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllQuestionsArgs = {
  filter?: InputMaybe<AllQuestionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBasicUserDetailsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryBasicUserDetailsByEmailArgs = {
  email: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
};


export type QueryBlankQuestionaryArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryBlankQuestionaryStepsArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryBlankQuestionaryStepsByCallIdArgs = {
  callId: Scalars['Int']['input'];
};


export type QueryCallArgs = {
  callId: Scalars['Int']['input'];
};


export type QueryCallsArgs = {
  filter?: InputMaybe<CallsFilter>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCallsByInstrumentScientistArgs = {
  scientistId: Scalars['Int']['input'];
};


export type QueryCheckEmailExistArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckExternalTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryCheckTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryDataAccessUsersArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type QueryEmailTemplateArgs = {
  emailTemplateId: Scalars['Int']['input'];
};


export type QueryEmailTemplatesArgs = {
  filter?: InputMaybe<EmailTemplatesFilter>;
};


export type QueryEventLogsArgs = {
  changedObjectId: Scalars['String']['input'];
  eventType: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  entityType: WorkflowType;
};


export type QueryExperimentArgs = {
  experimentPk: Scalars['Int']['input'];
};


export type QueryExperimentSafetyArgs = {
  experimentSafetyPk: Scalars['Int']['input'];
};


export type QueryExperimentSafetyPdfTemplateArgs = {
  experimentSafetyPdfTemplateId: Scalars['Int']['input'];
};


export type QueryExperimentSafetyPdfTemplatesArgs = {
  filter?: InputMaybe<ExperimentSafetyPdfTemplatesFilter>;
};


export type QueryExperimentSampleArgs = {
  experimentPk: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type QueryFapArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFapMembersArgs = {
  fapId: Scalars['Int']['input'];
};


export type QueryFapProposalArgs = {
  fapId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type QueryFapProposalsArgs = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  fapId: Scalars['Int']['input'];
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  legacy?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFapProposalsByInstrumentArgs = {
  callId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};


export type QueryFapReviewTemplatesArgs = {
  filter?: InputMaybe<FapReviewTemplatesFilter>;
};


export type QueryFapReviewersArgs = {
  fapId: Scalars['Int']['input'];
};


export type QueryFapsArgs = {
  filter?: InputMaybe<FapsFilter>;
};


export type QueryFeedbackArgs = {
  feedbackId: Scalars['Int']['input'];
};


export type QueryFeedbacksArgs = {
  filter?: InputMaybe<FeedbacksFilter>;
};


export type QueryFileMetadataArgs = {
  fileId: Scalars['String']['input'];
};


export type QueryFilesMetadataArgs = {
  filter: FilesMetadataFilter;
};


export type QueryGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
};


export type QueryGenericTemplatesArgs = {
  filter?: InputMaybe<GenericTemplatesFilter>;
};


export type QueryGetCallByAnswerIdArgs = {
  answerId: Scalars['Int']['input'];
};


export type QueryGetDynamicMultipleChoiceOptionsArgs = {
  questionId: Scalars['String']['input'];
};


export type QueryInstitutionsArgs = {
  filter?: InputMaybe<InstitutionsFilter>;
};


export type QueryInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
};


export type QueryInstrumentScientistHasAccessArgs = {
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type QueryInstrumentScientistHasInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
};


export type QueryInstrumentScientistProposalsArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInstrumentsArgs = {
  callIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryInstrumentsByFapArgs = {
  callId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
};


export type QueryInstrumentsByIdsArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
};


export type QueryInternalReviewArgs = {
  internalReviewId: Scalars['Int']['input'];
};


export type QueryInternalReviewsArgs = {
  filter?: InputMaybe<InternalReviewsFilter>;
};


export type QueryIsNaturalKeyPresentArgs = {
  naturalKey: Scalars['String']['input'];
};


export type QueryPageContentArgs = {
  pageId: PageName;
};


export type QueryPredefinedMessageArgs = {
  predefinedMessageId: Scalars['Int']['input'];
};


export type QueryPredefinedMessagesArgs = {
  filter?: InputMaybe<PredefinedMessagesFilter>;
};


export type QueryPreviousCollaboratorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  subtractUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userRole?: InputMaybe<UserRole>;
};


export type QueryProposalArgs = {
  primaryKey: Scalars['Int']['input'];
};


export type QueryProposalByIdArgs = {
  proposalId: Scalars['String']['input'];
};


export type QueryProposalPdfTemplateArgs = {
  proposalPdfTemplateId: Scalars['Int']['input'];
};


export type QueryProposalPdfTemplatesArgs = {
  filter?: InputMaybe<ProposalPdfTemplatesFilter>;
};


export type QueryProposalReviewsArgs = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
  proposalPk: Scalars['Int']['input'];
};


export type QueryProposalScientistCommentArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type QueryProposalTemplatesArgs = {
  filter?: InputMaybe<ProposalTemplatesFilter>;
};


export type QueryProposalsArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProposalsViewArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuestionByNaturalKeyArgs = {
  naturalKey: Scalars['String']['input'];
};


export type QueryQuestionaryArgs = {
  questionaryId: Scalars['Int']['input'];
};


export type QueryQuestionsArgs = {
  filter?: InputMaybe<QuestionsFilter>;
};


export type QueryReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type QueryReviewsArgs = {
  filter?: InputMaybe<ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySampleArgs = {
  sampleId: Scalars['Int']['input'];
};


export type QuerySamplesArgs = {
  filter?: InputMaybe<SamplesFilter>;
};


export type QuerySamplesByCallIdArgs = {
  callId: Scalars['Int']['input'];
};


export type QueryShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type QueryShipmentsArgs = {
  filter?: InputMaybe<ShipmentsFilter>;
};


export type QueryStatusArgs = {
  statusId: Scalars['String']['input'];
};


export type QueryStatusActionsLogsArgs = {
  filter?: InputMaybe<StatusActionsLogsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatusesArgs = {
  entityType: WorkflowType;
};


export type QueryTagArgs = {
  id: Scalars['Float']['input'];
};


export type QueryTechnicalReviewArgs = {
  technicalReviewId: Scalars['Int']['input'];
};


export type QueryTechnicalReviewTemplatesArgs = {
  filter?: InputMaybe<TechnicalReviewTemplatesFilter>;
};


export type QueryTechnicalReviewsArgs = {
  filter?: InputMaybe<TechnicalReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTechniqueArgs = {
  techniqueId: Scalars['Int']['input'];
};


export type QueryTechniqueScientistProposalsArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTechniquesByIdsArgs = {
  techniqueIds: Array<Scalars['Int']['input']>;
};


export type QueryTechniquesByScientistArgs = {
  userNumber: Scalars['Int']['input'];
};


export type QueryTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryTemplatesArgs = {
  filter?: InputMaybe<TemplatesFilter>;
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserByOidcSubArgs = {
  oidcSub: Scalars['String']['input'];
};


export type QueryUserHasAccessToProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<PaginationSortDirection>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  subtractUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userRole?: InputMaybe<UserRole>;
};


export type QueryVisitArgs = {
  visitId: Scalars['Int']['input'];
};


export type QueryVisitRegistrationArgs = {
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};


export type QueryVisitsArgs = {
  filter?: InputMaybe<VisitsFilter>;
};


export type QueryWorkflowArgs = {
  entityType: WorkflowType;
  workflowId: Scalars['Int']['input'];
};


export type QueryWorkflowStatusArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWorkflowStatusesArgs = {
  workflowId: Scalars['Int']['input'];
};


export type QueryWorkflowsArgs = {
  entityType: WorkflowType;
};

export type QueryMutationAndServicesGroup = {
  __typename?: 'QueryMutationAndServicesGroup';
  groupName: QueryMutationAndServicesGroups;
  items: Array<Scalars['String']['output']>;
};

export enum QueryMutationAndServicesGroups {
  Core = 'CORE',
  Scheduler = 'SCHEDULER'
}

export type Question = {
  __typename?: 'Question';
  categoryId: TemplateCategoryId;
  config: FieldConfig;
  dataType: DataType;
  id: Scalars['String']['output'];
  naturalKey: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type QuestionComparison = {
  __typename?: 'QuestionComparison';
  conflictResolutionStrategy: ConflictResolutionStrategy;
  existingQuestion?: Maybe<Question>;
  newQuestion: Question;
  status: QuestionComparisonStatus;
};

export enum QuestionComparisonStatus {
  Different = 'DIFFERENT',
  New = 'NEW',
  Same = 'SAME'
}

export enum QuestionFilterCompareOperator {
  Equals = 'EQUALS',
  Exists = 'EXISTS',
  GreaterThan = 'GREATER_THAN',
  Includes = 'INCLUDES',
  LessThan = 'LESS_THAN'
}

export type QuestionFilterInput = {
  compareOperator: QuestionFilterCompareOperator;
  dataType: DataType;
  questionId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type QuestionTemplateRelation = {
  __typename?: 'QuestionTemplateRelation';
  config: FieldConfig;
  dependencies: Array<FieldDependency>;
  dependenciesOperator?: Maybe<DependenciesLogicOperator>;
  question: Question;
  sortOrder: Scalars['Int']['output'];
  topicId: Scalars['Int']['output'];
};

export type QuestionWithUsage = {
  __typename?: 'QuestionWithUsage';
  answers: Array<AnswerBasic>;
  categoryId: TemplateCategoryId;
  config: FieldConfig;
  dataType: DataType;
  id: Scalars['String']['output'];
  naturalKey: Scalars['String']['output'];
  question: Scalars['String']['output'];
  templates: Array<Template>;
};

export type Questionary = {
  __typename?: 'Questionary';
  created: Scalars['DateTime']['output'];
  isCompleted: Scalars['Boolean']['output'];
  questionaryId: Scalars['Int']['output'];
  steps: Array<QuestionaryStep>;
  templateId: Scalars['Int']['output'];
};

export type QuestionaryStep = {
  __typename?: 'QuestionaryStep';
  fields: Array<Answer>;
  isCompleted: Scalars['Boolean']['output'];
  topic: Topic;
};

export type QuestionsFilter = {
  category?: InputMaybe<TemplateCategoryId>;
  dataType?: InputMaybe<Array<DataType>>;
  excludeDataType?: InputMaybe<Array<DataType>>;
  questionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type RabbitMqActionConfig = {
  __typename?: 'RabbitMQActionConfig';
  exchanges?: Maybe<Array<Scalars['String']['output']>>;
};

export type RabbitMqActionDefaultConfig = {
  __typename?: 'RabbitMQActionDefaultConfig';
  exchanges?: Maybe<Array<Scalars['String']['output']>>;
};

export type RemoveAssignedInstrumentFromCallInput = {
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};

export type ReorderFapMeetingDecisionProposalsInput = {
  proposals: Array<ProposalPkWithRankOrder>;
};

export type ReplayStatusActionsLogsResult = {
  __typename?: 'ReplayStatusActionsLogsResult';
  failed: Array<ReplayStatusLogFailure>;
  successful: Array<Scalars['Int']['output']>;
  totalRequested: Scalars['Int']['output'];
};

export type ReplayStatusLogFailure = {
  __typename?: 'ReplayStatusLogFailure';
  error: Scalars['String']['output'];
  logId: Scalars['Int']['output'];
};

export type RequestVisitRegistrationChangesInput = {
  userId: Scalars['Int']['input'];
  visitId: Scalars['Int']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  dateAssigned: Scalars['DateTime']['output'];
  dateReassigned?: Maybe<Scalars['DateTime']['output']>;
  emailSent: Scalars['Boolean']['output'];
  fapID: Scalars['Int']['output'];
  grade?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  proposal?: Maybe<Proposal>;
  questionary: Questionary;
  questionaryID: Scalars['Int']['output'];
  rank?: Maybe<Scalars['Int']['output']>;
  reassigned: Scalars['Boolean']['output'];
  reviewer?: Maybe<BasicUserDetails>;
  status: ReviewStatus;
  userID: Scalars['Int']['output'];
};

export enum ReviewStatus {
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type ReviewVisibility = {
  __typename?: 'ReviewVisibility';
  description: Scalars['String']['output'];
  reviewVisibilityId: Scalars['Int']['output'];
  visibility: FapReviewVisibility;
};

export enum ReviewerFilter {
  All = 'ALL',
  Me = 'ME'
}

export type ReviewsFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  reviewer?: InputMaybe<ReviewerFilter>;
  shortCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ReviewsQueryResult = {
  __typename?: 'ReviewsQueryResult';
  reviews: Array<Review>;
  totalCount: Scalars['Int']['output'];
};

export type RichTextInputConfig = {
  __typename?: 'RichTextInputConfig';
  allowImages: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['Int']['output']>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  config?: Maybe<RoleConfig>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isRootRole: Scalars['Boolean']['output'];
  shortCode: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type RoleConfig = ProposalReaderRoleConfig | UserRoleConfig;

export type RoleConfigInput = {
  proposalReader?: InputMaybe<ProposalReaderRoleConfigInput>;
  user?: InputMaybe<UserRoleConfigInput>;
};

export type Sample = {
  __typename?: 'Sample';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isPostProposalSubmission: Scalars['Boolean']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionId: Scalars['String']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  safetyComment: Scalars['String']['output'];
  safetyStatus: SampleStatus;
  title: Scalars['String']['output'];
};

export type SampleBasisConfig = {
  __typename?: 'SampleBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  titlePlaceholder: Scalars['String']['output'];
};

export type SampleDeclarationConfig = {
  __typename?: 'SampleDeclarationConfig';
  addEntryButtonLabel: Scalars['String']['output'];
  esiTemplateId?: Maybe<Scalars['Int']['output']>;
  maxEntries?: Maybe<Scalars['Int']['output']>;
  minEntries?: Maybe<Scalars['Int']['output']>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  templateCategory: Scalars['String']['output'];
  templateId?: Maybe<Scalars['Int']['output']>;
};

export type SampleEsiBasisConfig = {
  __typename?: 'SampleEsiBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  tooltip: Scalars['String']['output'];
};

export enum SampleStatus {
  ElevatedRisk = 'ELEVATED_RISK',
  HighRisk = 'HIGH_RISK',
  LowRisk = 'LOW_RISK',
  PendingEvaluation = 'PENDING_EVALUATION'
}

export type SamplesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  sampleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<SampleStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  visitId?: InputMaybe<Scalars['Int']['input']>;
};

export type SaveFapMeetingDecisionInput = {
  commentForManagement?: InputMaybe<Scalars['String']['input']>;
  commentForUser?: InputMaybe<Scalars['String']['input']>;
  fapId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  rankOrder?: InputMaybe<Scalars['Int']['input']>;
  recommendation?: InputMaybe<ProposalEndStatus>;
  submitted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SelectionFromOptionsConfig = {
  __typename?: 'SelectionFromOptionsConfig';
  isMultipleSelect: Scalars['Boolean']['output'];
  options: Array<Scalars['String']['output']>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type SetCoProposerInvitesInput = {
  emails: Array<Scalars['String']['input']>;
  proposalPk: Scalars['Int']['input'];
};

export type SetStatusActionsOnConnectionInput = {
  actions: Array<ConnectionHasActionsInput>;
  connectionId: Scalars['Int']['input'];
  workflowId: Scalars['Int']['input'];
};

export type SetStatusChangingEventsOnConnectionInput = {
  statusChangingEvents: Array<Scalars['String']['input']>;
  workflowConnectionId: Scalars['Int']['input'];
};

export type Settings = {
  __typename?: 'Settings';
  description?: Maybe<Scalars['String']['output']>;
  id: SettingsId;
  settingsValue?: Maybe<Scalars['String']['output']>;
};

export enum SettingsId {
  DateFormat = 'DATE_FORMAT',
  DateTimeFormat = 'DATE_TIME_FORMAT',
  DefaultInstSciReviewerFilter = 'DEFAULT_INST_SCI_REVIEWER_FILTER',
  DefaultInstSciStatusFilter = 'DEFAULT_INST_SCI_STATUS_FILTER',
  DisplayFaqLink = 'DISPLAY_FAQ_LINK',
  DisplayPrivacyStatementLink = 'DISPLAY_PRIVACY_STATEMENT_LINK',
  ExperimentSafetyReviewEmail = 'EXPERIMENT_SAFETY_REVIEW_EMAIL',
  ExternalAuthHomepageUrl = 'EXTERNAL_AUTH_HOMEPAGE_URL',
  ExternalAuthLoginUrl = 'EXTERNAL_AUTH_LOGIN_URL',
  ExternalAuthLogoutUrl = 'EXTERNAL_AUTH_LOGOUT_URL',
  FapSecsEditTechReviews = 'FAP_SECS_EDIT_TECH_REVIEWS',
  FeedbackExhaustDays = 'FEEDBACK_EXHAUST_DAYS',
  FeedbackFrequencyDays = 'FEEDBACK_FREQUENCY_DAYS',
  FeedbackMaxRequests = 'FEEDBACK_MAX_REQUESTS',
  HeaderLogoFilename = 'HEADER_LOGO_FILENAME',
  IdleTimeout = 'IDLE_TIMEOUT',
  InviteRemindersSendDelayDays = 'INVITE_REMINDERS_SEND_DELAY_DAYS',
  InviteValidityPeriodDays = 'INVITE_VALIDITY_PERIOD_DAYS',
  OrganisationName = 'ORGANISATION_NAME',
  PaletteErrorMain = 'PALETTE_ERROR_MAIN',
  PaletteInfoMain = 'PALETTE_INFO_MAIN',
  PalettePrimaryAccent = 'PALETTE_PRIMARY_ACCENT',
  PalettePrimaryContrast = 'PALETTE_PRIMARY_CONTRAST',
  PalettePrimaryDark = 'PALETTE_PRIMARY_DARK',
  PalettePrimaryLight = 'PALETTE_PRIMARY_LIGHT',
  PalettePrimaryMain = 'PALETTE_PRIMARY_MAIN',
  PaletteSecondaryContrast = 'PALETTE_SECONDARY_CONTRAST',
  PaletteSecondaryDark = 'PALETTE_SECONDARY_DARK',
  PaletteSecondaryLight = 'PALETTE_SECONDARY_LIGHT',
  PaletteSecondaryMain = 'PALETTE_SECONDARY_MAIN',
  PaletteSuccessMain = 'PALETTE_SUCCESS_MAIN',
  PaletteWarningMain = 'PALETTE_WARNING_MAIN',
  ProfilePageLink = 'PROFILE_PAGE_LINK',
  SmtpBccEmail = 'SMTP_BCC_EMAIL',
  TechReviewOptionalWorkflowStatus = 'TECH_REVIEW_OPTIONAL_WORKFLOW_STATUS',
  Timezone = 'TIMEZONE',
  UserOfficeEmail = 'USER_OFFICE_EMAIL'
}

export type Shipment = {
  __typename?: 'Shipment';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  experimentPk?: Maybe<Scalars['Int']['output']>;
  externalRef?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  samples: Array<Sample>;
  status: ShipmentStatus;
  title: Scalars['String']['output'];
};

export type ShipmentBasisConfig = {
  __typename?: 'ShipmentBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export enum ShipmentStatus {
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type ShipmentsFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  experimentPk?: InputMaybe<Scalars['Int']['input']>;
  externalRef?: InputMaybe<Scalars['String']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  shipmentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<ShipmentStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Status = {
  __typename?: 'Status';
  description: Scalars['String']['output'];
  entityType: WorkflowType;
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type StatusAction = {
  __typename?: 'StatusAction';
  defaultConfig?: Maybe<StatusActionDefaultConfig>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: StatusActionType;
};

export type StatusActionConfig = EmailActionConfig | RabbitMqActionConfig;

export type StatusActionDefaultConfig = EmailActionDefaultConfig | RabbitMqActionDefaultConfig;

export enum StatusActionType {
  Email = 'EMAIL',
  Proposaldownload = 'PROPOSALDOWNLOAD',
  Rabbitmq = 'RABBITMQ'
}

export type StatusActionsLog = {
  __typename?: 'StatusActionsLog';
  connectionStatusAction?: Maybe<ConnectionStatusAction>;
  emailStatusActionRecipient?: Maybe<EmailStatusActionRecipients>;
  proposals: Array<Proposal>;
  statusActionsLogId: Scalars['Int']['output'];
  statusActionsMessage: Scalars['String']['output'];
  statusActionsSuccessful: Scalars['Boolean']['output'];
  statusActionsTstamp: Scalars['DateTime']['output'];
};

export type StatusActionsLogQueryResult = {
  __typename?: 'StatusActionsLogQueryResult';
  statusActionsLogs: Array<StatusActionsLog>;
  totalCount: Scalars['Int']['output'];
};

export type StatusActionsLogsFilter = {
  callIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  connectionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  emailStatusActionRecipient?: InputMaybe<Array<EmailStatusActionRecipients>>;
  statusActionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  statusActionType?: InputMaybe<StatusActionType>;
  statusActionsLogIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  statusActionsMessage?: InputMaybe<Scalars['String']['input']>;
  statusActionsSuccessful?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StatusChangingEvent = {
  __typename?: 'StatusChangingEvent';
  statusChangingEvent: Scalars['String']['output'];
  workflowConnectionId: Scalars['Int']['output'];
};

export type SubTemplateConfig = {
  __typename?: 'SubTemplateConfig';
  addEntryButtonLabel: Scalars['String']['output'];
  canCopy: Scalars['Boolean']['output'];
  copyButtonLabel?: Maybe<Scalars['String']['output']>;
  isCompleteOnCopy?: Maybe<Scalars['Boolean']['output']>;
  isMultipleCopySelect?: Maybe<Scalars['Boolean']['output']>;
  maxEntries?: Maybe<Scalars['Int']['output']>;
  minEntries?: Maybe<Scalars['Int']['output']>;
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  templateCategory: Scalars['String']['output'];
  templateId?: Maybe<Scalars['Int']['output']>;
};

export type SubmitFapMeetingDecisionsInput = {
  callId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
};

export type SubmitProposalsReviewInput = {
  proposals: Array<ProposalPkWithReviewId>;
};

export type SubmitTechnicalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  publicComment?: InputMaybe<Scalars['String']['input']>;
  questionaryId?: InputMaybe<Scalars['Int']['input']>;
  reviewerId: Scalars['Int']['input'];
  status?: InputMaybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['input'];
  timeAllocation?: InputMaybe<Scalars['Int']['input']>;
};

export type SubmitTechnicalReviewsInput = {
  technicalReviews: Array<SubmitTechnicalReviewInput>;
};

export type Tag = {
  __typename?: 'Tag';
  calls: Array<Call>;
  id: Scalars['Int']['output'];
  instruments: Array<Instrument>;
  name: Scalars['String']['output'];
  shortCode: Scalars['String']['output'];
};

export type TechnicalReview = {
  __typename?: 'TechnicalReview';
  comment?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  instrumentId: Scalars['Int']['output'];
  proposal?: Maybe<Proposal>;
  proposalPk: Scalars['Int']['output'];
  publicComment?: Maybe<Scalars['String']['output']>;
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  reviewer?: Maybe<BasicUserDetails>;
  reviewerId: Scalars['Int']['output'];
  status?: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['output'];
  technicalReviewAssignee?: Maybe<BasicUserDetails>;
  technicalReviewAssigneeId?: Maybe<Scalars['Int']['output']>;
  timeAllocation?: Maybe<Scalars['Int']['output']>;
};

export type TechnicalReviewBasisConfig = {
  __typename?: 'TechnicalReviewBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export enum TechnicalReviewStatus {
  Feasible = 'FEASIBLE',
  PartiallyFeasible = 'PARTIALLY_FEASIBLE',
  Unfeasible = 'UNFEASIBLE'
}

export type TechnicalReviewTemplate = {
  __typename?: 'TechnicalReviewTemplate';
  callCount: Scalars['Int']['output'];
  complementaryQuestions: Array<Question>;
  description?: Maybe<Scalars['String']['output']>;
  experimentSafetyPdfCallCount?: Maybe<Scalars['Int']['output']>;
  experimentSafetyPdfTemplate?: Maybe<ExperimentSafetyPdfTemplate>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfCallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfTemplate?: Maybe<ProposalPdfTemplate>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type TechnicalReviewTemplatesFilter = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type TechnicalReviewsFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  reviewer?: InputMaybe<ReviewerFilter>;
  shortCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type TechnicalReviewsQueryResult = {
  __typename?: 'TechnicalReviewsQueryResult';
  technicalReviews: Array<TechnicalReview>;
  totalCount: Scalars['Int']['output'];
};

export type Technique = {
  __typename?: 'Technique';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  instruments: Array<Instrument>;
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  shortCode: Scalars['String']['output'];
};

export type TechniqueFilterInput = {
  showAllProposals: Scalars['Boolean']['input'];
  showMultiTechniqueProposals: Scalars['Boolean']['input'];
  techniqueId?: InputMaybe<Scalars['Int']['input']>;
};

export type TechniqueOption = {
  __typename?: 'TechniqueOption';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TechniquePickerConfig = {
  __typename?: 'TechniquePickerConfig';
  isMultipleSelect: Scalars['Boolean']['output'];
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  techniques: Array<TechniqueOption>;
  tooltip: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type TechniquesQueryResult = {
  __typename?: 'TechniquesQueryResult';
  techniques: Array<Technique>;
  totalCount: Scalars['Int']['output'];
};

export type Template = {
  __typename?: 'Template';
  complementaryQuestions: Array<Question>;
  description?: Maybe<Scalars['String']['output']>;
  experimentSafetyPdfCallCount?: Maybe<Scalars['Int']['output']>;
  experimentSafetyPdfTemplate?: Maybe<ExperimentSafetyPdfTemplate>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfCallCount?: Maybe<Scalars['Int']['output']>;
  proposalPdfTemplate?: Maybe<ProposalPdfTemplate>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type TemplateCategory = {
  __typename?: 'TemplateCategory';
  categoryId: TemplateCategoryId;
  name: Scalars['String']['output'];
};

export enum TemplateCategoryId {
  ExperimentSafetyPdf = 'EXPERIMENT_SAFETY_PDF',
  ExperimentSafetyReview = 'EXPERIMENT_SAFETY_REVIEW',
  FapReview = 'FAP_REVIEW',
  Feedback = 'FEEDBACK',
  GenericTemplate = 'GENERIC_TEMPLATE',
  ProposalPdf = 'PROPOSAL_PDF',
  ProposalQuestionary = 'PROPOSAL_QUESTIONARY',
  SampleDeclaration = 'SAMPLE_DECLARATION',
  ShipmentDeclaration = 'SHIPMENT_DECLARATION',
  TechnicalReview = 'TECHNICAL_REVIEW',
  VisitRegistration = 'VISIT_REGISTRATION'
}

export type TemplateGroup = {
  __typename?: 'TemplateGroup';
  categoryId: TemplateCategoryId;
  groupId: TemplateGroupId;
};

export enum TemplateGroupId {
  ExperimentSafetyPdf = 'EXPERIMENT_SAFETY_PDF',
  ExperimentSafetyReview = 'EXPERIMENT_SAFETY_REVIEW',
  FapReview = 'FAP_REVIEW',
  Feedback = 'FEEDBACK',
  GenericTemplate = 'GENERIC_TEMPLATE',
  Proposal = 'PROPOSAL',
  ProposalEsi = 'PROPOSAL_ESI',
  ProposalPdf = 'PROPOSAL_PDF',
  Sample = 'SAMPLE',
  SampleEsi = 'SAMPLE_ESI',
  Shipment = 'SHIPMENT',
  TechnicalReview = 'TECHNICAL_REVIEW',
  VisitRegistration = 'VISIT_REGISTRATION'
}

export type TemplateStep = {
  __typename?: 'TemplateStep';
  fields: Array<QuestionTemplateRelation>;
  topic: Topic;
};

export type TemplateValidation = {
  __typename?: 'TemplateValidation';
  exportDate: Scalars['DateTime']['output'];
  json: Scalars['String']['output'];
  validationData: TemplateValidationData;
  version: Scalars['String']['output'];
};

export type TemplateValidationData = {
  __typename?: 'TemplateValidationData';
  errors: Array<Scalars['String']['output']>;
  isValid: Scalars['Boolean']['output'];
  questionComparisons: Array<QuestionComparison>;
  subTemplateValidationData: Array<TemplateValidationData>;
};

export type TemplatesFilter = {
  group?: InputMaybe<TemplateGroupId>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type TextInputConfig = {
  __typename?: 'TextInputConfig';
  htmlQuestion?: Maybe<Scalars['String']['output']>;
  isCounterHidden: Scalars['Boolean']['output'];
  isHtmlQuestion: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  multiline: Scalars['Boolean']['output'];
  placeholder: Scalars['String']['output'];
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type TimeSpan = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TokenPayloadUnion = AuthJwtApiTokenPayload | AuthJwtPayload;

export type TokenResult = {
  __typename?: 'TokenResult';
  isValid: Scalars['Boolean']['output'];
  payload?: Maybe<TokenPayloadUnion>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['Int']['output'];
  isEnabled: Scalars['Boolean']['output'];
  sortOrder: Scalars['Int']['output'];
  templateId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['String']['output'];
  quantity: Scalars['String']['output'];
  siConversionFormula: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  unit: Scalars['String']['output'];
};

export type UnitComparison = {
  __typename?: 'UnitComparison';
  conflictResolutionStrategy: ConflictResolutionStrategy;
  existingUnit?: Maybe<Unit>;
  newUnit: Unit;
  status: QuestionComparisonStatus;
};

export type UnitsImportWithValidation = {
  __typename?: 'UnitsImportWithValidation';
  errors: Array<Scalars['String']['output']>;
  exportDate: Scalars['DateTime']['output'];
  isValid: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  unitComparisons: Array<UnitComparison>;
  version: Scalars['String']['output'];
};

export type UpdateApiAccessTokenInput = {
  accessPermissions: Scalars['String']['input'];
  accessTokenId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCallInput = {
  allocationTimeUnit?: InputMaybe<AllocationTimeUnits>;
  callEnded?: InputMaybe<Scalars['Boolean']['input']>;
  callEndedInternal?: InputMaybe<Scalars['Boolean']['input']>;
  callFapReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  callReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  cycleComment?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endCall?: InputMaybe<Scalars['DateTime']['input']>;
  endCallInternal?: InputMaybe<Scalars['DateTime']['input']>;
  endCycle?: InputMaybe<Scalars['DateTime']['input']>;
  endFapReview?: InputMaybe<Scalars['DateTime']['input']>;
  endNotify?: InputMaybe<Scalars['DateTime']['input']>;
  endReview?: InputMaybe<Scalars['DateTime']['input']>;
  esiTemplateId?: InputMaybe<Scalars['Int']['input']>;
  experimentSafetyPdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  experimentWorkflowId?: InputMaybe<Scalars['Int']['input']>;
  fapReviewTemplateId?: InputMaybe<Scalars['Int']['input']>;
  faps?: InputMaybe<Array<Scalars['Int']['input']>>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  proposalPdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  proposalSequence?: InputMaybe<Scalars['Int']['input']>;
  proposalWorkflowId?: InputMaybe<Scalars['Int']['input']>;
  referenceNumberFormat?: InputMaybe<Scalars['String']['input']>;
  shortCode?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  startCall?: InputMaybe<Scalars['DateTime']['input']>;
  startCycle?: InputMaybe<Scalars['DateTime']['input']>;
  startFapReview?: InputMaybe<Scalars['DateTime']['input']>;
  startNotify?: InputMaybe<Scalars['DateTime']['input']>;
  startReview?: InputMaybe<Scalars['DateTime']['input']>;
  submissionMessage?: InputMaybe<Scalars['String']['input']>;
  technicalReviewTemplateId?: InputMaybe<Scalars['Int']['input']>;
  templateId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmailTemplateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  useTemplateFile: Scalars['Boolean']['input'];
};

export type UpdateFapToCallInstrumentInput = {
  callId: Scalars['Int']['input'];
  fapId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId: Scalars['Int']['input'];
};

export type UpdateFeaturesInput = {
  action: FeatureUpdateAction;
  featureIds: Array<FeatureId>;
};

export type UpdateInternalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  reviewerId?: InputMaybe<Scalars['Int']['input']>;
  technicalReviewId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type UpdatePredefinedMessageInput = {
  id: Scalars['Int']['input'];
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateRoleArgs = {
  config?: InputMaybe<RoleConfigInput>;
  description: Scalars['String']['input'];
  roleID: Scalars['Int']['input'];
  shortCode: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateRoleResponse = {
  __typename?: 'UpdateRoleResponse';
  role?: Maybe<Role>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSettingsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  settingsId: SettingsId;
  settingsValue?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStatusInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowInput = {
  connectionLineType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowStatusInput = {
  posX?: InputMaybe<Scalars['Int']['input']>;
  posY?: InputMaybe<Scalars['Int']['input']>;
  workflowStatusId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  coProposerInvites: Array<Invite>;
  created: Scalars['String']['output'];
  email: Scalars['String']['output'];
  experiments: Array<Experiment>;
  faps: Array<Fap>;
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  institution: Institution;
  institutionId: Scalars['Int']['output'];
  instruments: Array<Instrument>;
  lastname: Scalars['String']['output'];
  oauthRefreshToken?: Maybe<Scalars['String']['output']>;
  oidcSub?: Maybe<Scalars['String']['output']>;
  preferredname?: Maybe<Scalars['String']['output']>;
  proposals: Array<Proposal>;
  reviews: Array<Review>;
  roles: Array<Role>;
  updated: Scalars['String']['output'];
  userTitle: Scalars['String']['output'];
};


export type UserExperimentsArgs = {
  filter?: InputMaybe<UserExperimentsFilter>;
};


export type UserProposalsArgs = {
  filter?: InputMaybe<UserProposalsFilter>;
};


export type UserReviewsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  callId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  reviewer?: InputMaybe<ReviewerFilter>;
  status?: InputMaybe<ReviewStatus>;
};

export type UserExperimentsFilter = {
  endsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<ExperimentStatus>>;
};

export type UserJwt = {
  __typename?: 'UserJWT';
  created: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  institutionId: Scalars['Float']['output'];
  lastname: Scalars['String']['output'];
  oidcSub?: Maybe<Scalars['String']['output']>;
  preferredname?: Maybe<Scalars['String']['output']>;
};

export type UserProposalsFilter = {
  finalStatus?: InputMaybe<ProposalEndStatus>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  managementDecisionSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserQueryResult = {
  __typename?: 'UserQueryResult';
  totalCount: Scalars['Int']['output'];
  users: Array<BasicUserDetails>;
};

export enum UserRole {
  ExperimentSafetyReviewer = 'EXPERIMENT_SAFETY_REVIEWER',
  FapChair = 'FAP_CHAIR',
  FapReviewer = 'FAP_REVIEWER',
  FapSecretary = 'FAP_SECRETARY',
  InstrumentScientist = 'INSTRUMENT_SCIENTIST',
  InternalReviewer = 'INTERNAL_REVIEWER',
  ProposalReader = 'PROPOSAL_READER',
  User = 'USER',
  UserOfficer = 'USER_OFFICER'
}

export type UserRoleConfig = {
  __typename?: 'UserRoleConfig';
  note: Scalars['String']['output'];
};

export type UserRoleConfigInput = {
  note: Scalars['String']['input'];
};

export type Visit = {
  __typename?: 'Visit';
  creatorId: Scalars['Int']['output'];
  experimentPk: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  registrationInvites: Array<Invite>;
  registrations: Array<VisitRegistration>;
  samples: Array<Sample>;
  teamLead: BasicUserDetails;
  teamLeadUserId: Scalars['Int']['output'];
};

export type VisitBasisConfig = {
  __typename?: 'VisitBasisConfig';
  readPermissions: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type VisitRegistration = {
  __typename?: 'VisitRegistration';
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  questionary: Questionary;
  registrationQuestionaryId?: Maybe<Scalars['Int']['output']>;
  startsAt?: Maybe<Scalars['DateTime']['output']>;
  status: VisitRegistrationStatus;
  user?: Maybe<BasicUserDetails>;
  userId: Scalars['Int']['output'];
  visitId: Scalars['Int']['output'];
};

export enum VisitRegistrationStatus {
  Approved = 'APPROVED',
  CancelledByFacility = 'CANCELLED_BY_FACILITY',
  CancelledByUser = 'CANCELLED_BY_USER',
  ChangeRequested = 'CHANGE_REQUESTED',
  Drafted = 'DRAFTED',
  Submitted = 'SUBMITTED'
}

export type VisitsFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  experimentPk?: InputMaybe<Scalars['Int']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
};

export type Workflow = {
  __typename?: 'Workflow';
  connectionLineType: Scalars['String']['output'];
  connections: Array<WorkflowConnection>;
  description: Scalars['String']['output'];
  entityType: WorkflowType;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  statuses: Array<WorkflowStatus>;
};

export type WorkflowConnection = {
  __typename?: 'WorkflowConnection';
  id: Scalars['Int']['output'];
  nextStatus: WorkflowStatus;
  nextWorkflowStatusId: Scalars['Int']['output'];
  prevStatus: WorkflowStatus;
  prevWorkflowStatusId: Scalars['Int']['output'];
  sourceHandle: Scalars['String']['output'];
  statusActions?: Maybe<Array<ConnectionStatusAction>>;
  statusChangingEvents?: Maybe<Array<StatusChangingEvent>>;
  targetHandle: Scalars['String']['output'];
  workflowId: Scalars['Int']['output'];
};

export type WorkflowEvent = {
  __typename?: 'WorkflowEvent';
  description?: Maybe<Scalars['String']['output']>;
  name: Event;
};

export type WorkflowStatus = {
  __typename?: 'WorkflowStatus';
  posX: Scalars['Int']['output'];
  posY: Scalars['Int']['output'];
  status: Status;
  statusId: Scalars['String']['output'];
  workflowId: Scalars['Int']['output'];
  workflowStatusId: Scalars['Int']['output'];
};

export enum WorkflowType {
  Experiment = 'EXPERIMENT',
  Proposal = 'PROPOSAL'
}

export type _Entity = BasicUserDetails | Call | Experiment | ExperimentSafety | Instrument | Proposal | StatusActionsLog | Technique | User;

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']['output']>;
};

export type AnswerTopicMutationVariables = Exact<{
  questionaryId: Scalars['Int']['input'];
  topicId: Scalars['Int']['input'];
  answers: Array<AnswerInput> | AnswerInput;
  isPartialSave?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AnswerTopicMutation = { __typename?: 'Mutation', answerTopic: Array<{ __typename?: 'AnswerBasic', questionId: string, answer: any, answerId?: number | null }> };

export type AssignChairOrSecretaryMutationVariables = Exact<{
  assignChairOrSecretaryToFapInput: AssignChairOrSecretaryToFapInput;
}>;


export type AssignChairOrSecretaryMutation = { __typename?: 'Mutation', assignChairOrSecretary: { __typename?: 'Fap', id: number } };

export type AssignFapReviewersToProposalsMutationVariables = Exact<{
  assignments: Array<FapReviewAssignmentInput> | FapReviewAssignmentInput;
  fapId: Scalars['Int']['input'];
}>;


export type AssignFapReviewersToProposalsMutation = { __typename?: 'Mutation', assignFapReviewersToProposals: { __typename?: 'Fap', id: number } };

export type AssignInstrumentsToCallMutationVariables = Exact<{
  assignInstrumentsToCallInput: AssignInstrumentsToCallInput;
}>;


export type AssignInstrumentsToCallMutation = { __typename?: 'Mutation', assignInstrumentsToCall: { __typename?: 'Call', id: number, shortCode: string, title?: string | null, templateId: number, instruments: Array<{ __typename?: 'InstrumentWithAvailabilityTime', id: number, managerUserId: number, name: string, shortCode: string, description: string }> } };

export type AssignProposalsToFapsMutationVariables = Exact<{
  proposalPks: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  fapInstruments: Array<FapInstrumentInput> | FapInstrumentInput;
}>;


export type AssignProposalsToFapsMutation = { __typename?: 'Mutation', assignProposalsToFaps: boolean };

export type AssignProposalsToInstrumentsMutationVariables = Exact<{
  proposalPks: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  instrumentIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AssignProposalsToInstrumentsMutation = { __typename?: 'Mutation', assignProposalsToInstruments: boolean };

export type AssignReviewersToFapMutationVariables = Exact<{
  memberIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
}>;


export type AssignReviewersToFapMutation = { __typename?: 'Mutation', assignReviewersToFap: { __typename?: 'Fap', id: number } };

export type ChangeProposalsStatusMutationVariables = Exact<{
  changeProposalsStatusInput: ChangeProposalsStatusInput;
}>;


export type ChangeProposalsStatusMutation = { __typename?: 'Mutation', changeProposalsStatus: boolean };

export type CreateCallMutationVariables = Exact<{
  createCallInput: CreateCallInput;
}>;


export type CreateCallMutation = { __typename?: 'Mutation', createCall: { __typename?: 'Call', id: number, shortCode: string, title?: string | null, templateId: number, instruments: Array<{ __typename?: 'InstrumentWithAvailabilityTime', id: number, description: string, managerUserId: number, name: string, shortCode: string }> } };

export type CreateInstrumentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  managerUserId: Scalars['Int']['input'];
}>;


export type CreateInstrumentMutation = { __typename?: 'Mutation', createInstrument: { __typename?: 'Instrument', id: number, description: string, managerUserId: number, name: string, shortCode: string } };

export type CreateProposalMutationVariables = Exact<{
  callId: Scalars['Int']['input'];
}>;


export type CreateProposalMutation = { __typename?: 'Mutation', createProposal: { __typename?: 'Proposal', primaryKey: number, proposalId: string, callId: number, status?: { __typename?: 'Status', id: string, name: string } | null, questionary: { __typename?: 'Questionary', questionaryId: number, templateId: number, steps: Array<{ __typename?: 'QuestionaryStep', topic: { __typename?: 'Topic', id: number, templateId: number } }> } } };

export type CreateTemplateMutationVariables = Exact<{
  groupId: TemplateGroupId;
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTemplateMutation = { __typename?: 'Mutation', createTemplate: { __typename?: 'Template', templateId: number, name: string, description?: string | null } };

export type DeleteCallMutationVariables = Exact<{
  deleteCallId: Scalars['Int']['input'];
}>;


export type DeleteCallMutation = { __typename?: 'Mutation', deleteCall: { __typename?: 'Call', id: number, shortCode: string, title?: string | null, templateId: number } };

export type DeleteInstrumentMutationVariables = Exact<{
  deleteInstrumentId: Scalars['Int']['input'];
}>;


export type DeleteInstrumentMutation = { __typename?: 'Mutation', deleteInstrument: { __typename?: 'Instrument', id: number, description: string } };

export type DeleteProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int']['input'];
}>;


export type DeleteProposalMutation = { __typename?: 'Mutation', deleteProposal: { __typename?: 'Proposal', primaryKey: number, proposalId: string, callId: number, status?: { __typename?: 'Status', id: string, name: string } | null, questionary: { __typename?: 'Questionary', questionaryId: number, templateId: number, steps: Array<{ __typename?: 'QuestionaryStep', topic: { __typename?: 'Topic', id: number, templateId: number } }> } } };

export type DeleteTemplateMutationVariables = Exact<{
  templateId: Scalars['Int']['input'];
}>;


export type DeleteTemplateMutation = { __typename?: 'Mutation', deleteTemplate: { __typename?: 'Template', templateId: number, name: string, groupId: TemplateGroupId } };

export type ExternalTokenLoginMutationVariables = Exact<{
  redirectUri: Scalars['String']['input'];
  externalToken: Scalars['String']['input'];
}>;


export type ExternalTokenLoginMutation = { __typename?: 'Mutation', externalTokenLogin: string };

export type BasicUserDetailsByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type BasicUserDetailsByEmailQuery = { __typename?: 'Query', basicUserDetailsByEmail?: { __typename?: 'BasicUserDetails', id: number } | null };

export type BlankQuestionaryQueryVariables = Exact<{
  templateId: Scalars['Int']['input'];
}>;


export type BlankQuestionaryQuery = { __typename?: 'Query', blankQuestionary: { __typename?: 'Questionary', isCompleted: boolean, questionaryId: number, steps: Array<{ __typename?: 'QuestionaryStep', fields: Array<{ __typename?: 'Answer', topicId: number }> }> } };

export type GetBlankQuestionaryStepsByCallIdQueryVariables = Exact<{
  callId: Scalars['Int']['input'];
}>;


export type GetBlankQuestionaryStepsByCallIdQuery = { __typename?: 'Query', blankQuestionaryStepsByCallId?: Array<{ __typename?: 'QuestionaryStep', isCompleted: boolean, fields: Array<{ __typename?: 'Answer', answerId?: number | null, topicId: number }> }> | null };

export type GetCallQueryVariables = Exact<{
  callId: Scalars['Int']['input'];
}>;


export type GetCallQuery = { __typename?: 'Query', call?: { __typename?: 'Call', id: number, title?: string | null, shortCode: string, templateId: number, faps?: Array<{ __typename?: 'Fap', id: number }> | null } | null };

export type GetCallsQueryVariables = Exact<{
  filter?: InputMaybe<CallsFilter>;
}>;


export type GetCallsQuery = { __typename?: 'Query', calls?: Array<{ __typename?: 'Call', id: number, title?: string | null, shortCode: string, templateId: number, endCall: any, endCallInternal?: any | null, allocationTimeUnit: AllocationTimeUnits, cycleComment: string, isActive: boolean, isActiveInternal: boolean, startCall: any, startCycle: any }> | null };

export type GetFapMembersQueryVariables = Exact<{
  fapId: Scalars['Int']['input'];
}>;


export type GetFapMembersQuery = { __typename?: 'Query', fapMembers?: Array<{ __typename?: 'FapReviewer', fapId: number, userId: number }> | null };

export type GenericTemplatesQueryVariables = Exact<{
  filter?: InputMaybe<GenericTemplatesFilter>;
}>;


export type GenericTemplatesQuery = { __typename?: 'Query', genericTemplates?: Array<{ __typename?: 'GenericTemplate', id: number, title: string }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, created: string, roles: Array<{ __typename?: 'Role', id: number, shortCode: string, title: string }> } | null };

export type PageContentQueryVariables = Exact<{
  pageId: PageName;
}>;


export type PageContentQuery = { __typename?: 'Query', pageContent?: string | null };

export type ProposalQueryVariables = Exact<{
  primaryKey: Scalars['Int']['input'];
}>;


export type ProposalQuery = { __typename?: 'Query', proposal?: { __typename?: 'Proposal', title: string, created: any, primaryKey: number, proposalId: string, proposerId: number } | null };

export type ProposalByIdQueryVariables = Exact<{
  proposalId: Scalars['String']['input'];
}>;


export type ProposalByIdQuery = { __typename?: 'Query', proposalById?: { __typename?: 'Proposal', proposalId: string, primaryKey: number, callId: number } | null };

export type GetProposalsQueryVariables = Exact<{
  filter?: InputMaybe<ProposalsFilter>;
}>;


export type GetProposalsQuery = { __typename?: 'Query', proposals?: { __typename?: 'ProposalsQueryResult', proposals: Array<{ __typename?: 'Proposal', primaryKey: number, proposalId: string, title: string, submitted: boolean, proposerId: number, abstract: string, status?: { __typename?: 'Status', name: string } | null, proposer?: { __typename?: 'BasicUserDetails', id: number } | null, users: Array<{ __typename?: 'BasicUserDetails', id: number }> }> } | null };

export type GetProposalsWithCallInfoQueryVariables = Exact<{
  filter?: InputMaybe<ProposalsFilter>;
}>;


export type GetProposalsWithCallInfoQuery = { __typename?: 'Query', proposals?: { __typename?: 'ProposalsQueryResult', proposals: Array<{ __typename?: 'Proposal', primaryKey: number, proposalId: string, title: string, proposer?: { __typename?: 'BasicUserDetails', id: number } | null, call?: { __typename?: 'Call', shortCode: string, title?: string | null, id: number } | null }> } | null };

export type QuestionaryQueryVariables = Exact<{
  questionaryId: Scalars['Int']['input'];
}>;


export type QuestionaryQuery = { __typename?: 'Query', questionary?: { __typename?: 'Questionary', questionaryId: number, templateId: number, steps: Array<{ __typename?: 'QuestionaryStep', topic: { __typename?: 'Topic', templateId: number, title: string, id: number } }> } | null };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'Settings', description?: string | null, id: SettingsId }> };

export type InstrumentQueryVariables = Exact<{
  instrumentId: Scalars['Int']['input'];
}>;


export type InstrumentQuery = { __typename?: 'Query', instrument?: { __typename?: 'Instrument', id: number, name: string, managerUserId: number, shortCode: string } | null };

export type RemoveAssignedInstrumentFromCallMutationVariables = Exact<{
  removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput;
}>;


export type RemoveAssignedInstrumentFromCallMutation = { __typename?: 'Mutation', removeAssignedInstrumentFromCall: { __typename?: 'Call', id: number, shortCode: string, title?: string | null, templateId: number, instruments: Array<{ __typename?: 'InstrumentWithAvailabilityTime', id: number, managerUserId: number, name: string, shortCode: string }> } };

export type RemoveMemberFromFapMutationVariables = Exact<{
  memberId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
  roleId: UserRole;
}>;


export type RemoveMemberFromFapMutation = { __typename?: 'Mutation', removeMemberFromFap: { __typename?: 'Fap', id: number } };

export type RemoveMemberFromFapProposalMutationVariables = Exact<{
  memberId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
}>;


export type RemoveMemberFromFapProposalMutation = { __typename?: 'Mutation', removeMemberFromFapProposal: { __typename?: 'Fap', id: number } };

export type RemoveProposalsFromInstrumentMutationVariables = Exact<{
  proposalPks: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RemoveProposalsFromInstrumentMutation = { __typename?: 'Mutation', removeProposalsFromInstrument: boolean };

export type UpdateProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int']['input'];
  users?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  abstract: Scalars['String']['input'];
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateProposalMutation = { __typename?: 'Mutation', updateProposal: { __typename?: 'Proposal', callId: number, statusId: string, primaryKey: number, proposalId: string, proposer?: { __typename?: 'BasicUserDetails', id: number } | null, users: Array<{ __typename?: 'BasicUserDetails', id: number }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AnswerTopicDocument = new TypedDocumentString(`
    mutation AnswerTopic($questionaryId: Int!, $topicId: Int!, $answers: [AnswerInput!]!, $isPartialSave: Boolean) {
  answerTopic(
    questionaryId: $questionaryId
    topicId: $topicId
    answers: $answers
    isPartialSave: $isPartialSave
  ) {
    questionId
    answer
    answerId
  }
}
    `) as unknown as TypedDocumentString<AnswerTopicMutation, AnswerTopicMutationVariables>;
export const AssignChairOrSecretaryDocument = new TypedDocumentString(`
    mutation AssignChairOrSecretary($assignChairOrSecretaryToFapInput: AssignChairOrSecretaryToFapInput!) {
  assignChairOrSecretary(
    assignChairOrSecretaryToFapInput: $assignChairOrSecretaryToFapInput
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<AssignChairOrSecretaryMutation, AssignChairOrSecretaryMutationVariables>;
export const AssignFapReviewersToProposalsDocument = new TypedDocumentString(`
    mutation AssignFapReviewersToProposals($assignments: [FapReviewAssignmentInput!]!, $fapId: Int!) {
  assignFapReviewersToProposals(assignments: $assignments, fapId: $fapId) {
    id
  }
}
    `) as unknown as TypedDocumentString<AssignFapReviewersToProposalsMutation, AssignFapReviewersToProposalsMutationVariables>;
export const AssignInstrumentsToCallDocument = new TypedDocumentString(`
    mutation AssignInstrumentsToCall($assignInstrumentsToCallInput: AssignInstrumentsToCallInput!) {
  assignInstrumentsToCall(
    assignInstrumentsToCallInput: $assignInstrumentsToCallInput
  ) {
    id
    shortCode
    title
    templateId
    instruments {
      id
      managerUserId
      name
      shortCode
      description
    }
  }
}
    `) as unknown as TypedDocumentString<AssignInstrumentsToCallMutation, AssignInstrumentsToCallMutationVariables>;
export const AssignProposalsToFapsDocument = new TypedDocumentString(`
    mutation AssignProposalsToFaps($proposalPks: [Int!]!, $fapInstruments: [FapInstrumentInput!]!) {
  assignProposalsToFaps(
    proposalPks: $proposalPks
    fapInstruments: $fapInstruments
  )
}
    `) as unknown as TypedDocumentString<AssignProposalsToFapsMutation, AssignProposalsToFapsMutationVariables>;
export const AssignProposalsToInstrumentsDocument = new TypedDocumentString(`
    mutation AssignProposalsToInstruments($proposalPks: [Int!]!, $instrumentIds: [Int!]!) {
  assignProposalsToInstruments(
    proposalPks: $proposalPks
    instrumentIds: $instrumentIds
  )
}
    `) as unknown as TypedDocumentString<AssignProposalsToInstrumentsMutation, AssignProposalsToInstrumentsMutationVariables>;
export const AssignReviewersToFapDocument = new TypedDocumentString(`
    mutation AssignReviewersToFap($memberIds: [Int!]!, $fapId: Int!) {
  assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {
    id
  }
}
    `) as unknown as TypedDocumentString<AssignReviewersToFapMutation, AssignReviewersToFapMutationVariables>;
export const ChangeProposalsStatusDocument = new TypedDocumentString(`
    mutation ChangeProposalsStatus($changeProposalsStatusInput: ChangeProposalsStatusInput!) {
  changeProposalsStatus(changeProposalsStatusInput: $changeProposalsStatusInput)
}
    `) as unknown as TypedDocumentString<ChangeProposalsStatusMutation, ChangeProposalsStatusMutationVariables>;
export const CreateCallDocument = new TypedDocumentString(`
    mutation CreateCall($createCallInput: CreateCallInput!) {
  createCall(createCallInput: $createCallInput) {
    id
    shortCode
    title
    templateId
    instruments {
      id
      description
      managerUserId
      name
      shortCode
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCallMutation, CreateCallMutationVariables>;
export const CreateInstrumentDocument = new TypedDocumentString(`
    mutation CreateInstrument($name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {
  createInstrument(
    name: $name
    shortCode: $shortCode
    description: $description
    managerUserId: $managerUserId
  ) {
    id
    description
    managerUserId
    name
    shortCode
  }
}
    `) as unknown as TypedDocumentString<CreateInstrumentMutation, CreateInstrumentMutationVariables>;
export const CreateProposalDocument = new TypedDocumentString(`
    mutation CreateProposal($callId: Int!) {
  createProposal(callId: $callId) {
    primaryKey
    proposalId
    callId
    status {
      id
      name
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
    `) as unknown as TypedDocumentString<CreateProposalMutation, CreateProposalMutationVariables>;
export const CreateTemplateDocument = new TypedDocumentString(`
    mutation CreateTemplate($groupId: TemplateGroupId!, $name: String!, $description: String) {
  createTemplate(groupId: $groupId, name: $name, description: $description) {
    templateId
    name
    description
  }
}
    `) as unknown as TypedDocumentString<CreateTemplateMutation, CreateTemplateMutationVariables>;
export const DeleteCallDocument = new TypedDocumentString(`
    mutation DeleteCall($deleteCallId: Int!) {
  deleteCall(id: $deleteCallId) {
    id
    shortCode
    title
    templateId
  }
}
    `) as unknown as TypedDocumentString<DeleteCallMutation, DeleteCallMutationVariables>;
export const DeleteInstrumentDocument = new TypedDocumentString(`
    mutation DeleteInstrument($deleteInstrumentId: Int!) {
  deleteInstrument(id: $deleteInstrumentId) {
    id
    description
  }
}
    `) as unknown as TypedDocumentString<DeleteInstrumentMutation, DeleteInstrumentMutationVariables>;
export const DeleteProposalDocument = new TypedDocumentString(`
    mutation DeleteProposal($proposalPk: Int!) {
  deleteProposal(proposalPk: $proposalPk) {
    primaryKey
    proposalId
    callId
    status {
      id
      name
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
    `) as unknown as TypedDocumentString<DeleteProposalMutation, DeleteProposalMutationVariables>;
export const DeleteTemplateDocument = new TypedDocumentString(`
    mutation DeleteTemplate($templateId: Int!) {
  deleteTemplate(templateId: $templateId) {
    templateId
    name
    groupId
  }
}
    `) as unknown as TypedDocumentString<DeleteTemplateMutation, DeleteTemplateMutationVariables>;
export const ExternalTokenLoginDocument = new TypedDocumentString(`
    mutation ExternalTokenLogin($redirectUri: String!, $externalToken: String!) {
  externalTokenLogin(redirectUri: $redirectUri, externalToken: $externalToken)
}
    `) as unknown as TypedDocumentString<ExternalTokenLoginMutation, ExternalTokenLoginMutationVariables>;
export const BasicUserDetailsByEmailDocument = new TypedDocumentString(`
    query BasicUserDetailsByEmail($email: String!) {
  basicUserDetailsByEmail(email: $email) {
    id
  }
}
    `) as unknown as TypedDocumentString<BasicUserDetailsByEmailQuery, BasicUserDetailsByEmailQueryVariables>;
export const BlankQuestionaryDocument = new TypedDocumentString(`
    query BlankQuestionary($templateId: Int!) {
  blankQuestionary(templateId: $templateId) {
    isCompleted
    questionaryId
    steps {
      fields {
        topicId
      }
    }
  }
}
    `) as unknown as TypedDocumentString<BlankQuestionaryQuery, BlankQuestionaryQueryVariables>;
export const GetBlankQuestionaryStepsByCallIdDocument = new TypedDocumentString(`
    query getBlankQuestionaryStepsByCallId($callId: Int!) {
  blankQuestionaryStepsByCallId(callId: $callId) {
    fields {
      answerId
      topicId
    }
    isCompleted
  }
}
    `) as unknown as TypedDocumentString<GetBlankQuestionaryStepsByCallIdQuery, GetBlankQuestionaryStepsByCallIdQueryVariables>;
export const GetCallDocument = new TypedDocumentString(`
    query getCall($callId: Int!) {
  call(callId: $callId) {
    id
    title
    shortCode
    templateId
    faps {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetCallQuery, GetCallQueryVariables>;
export const GetCallsDocument = new TypedDocumentString(`
    query getCalls($filter: CallsFilter) {
  calls(filter: $filter) {
    id
    title
    shortCode
    templateId
    endCall
    endCallInternal
    allocationTimeUnit
    cycleComment
    isActive
    isActiveInternal
    shortCode
    startCall
    startCycle
  }
}
    `) as unknown as TypedDocumentString<GetCallsQuery, GetCallsQueryVariables>;
export const GetFapMembersDocument = new TypedDocumentString(`
    query getFapMembers($fapId: Int!) {
  fapMembers(fapId: $fapId) {
    fapId
    userId
  }
}
    `) as unknown as TypedDocumentString<GetFapMembersQuery, GetFapMembersQueryVariables>;
export const GenericTemplatesDocument = new TypedDocumentString(`
    query GenericTemplates($filter: GenericTemplatesFilter) {
  genericTemplates(filter: $filter) {
    id
    title
  }
}
    `) as unknown as TypedDocumentString<GenericTemplatesQuery, GenericTemplatesQueryVariables>;
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    id
    created
    roles {
      id
      shortCode
      title
    }
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
export const PageContentDocument = new TypedDocumentString(`
    query PageContent($pageId: PageName!) {
  pageContent(pageId: $pageId)
}
    `) as unknown as TypedDocumentString<PageContentQuery, PageContentQueryVariables>;
export const ProposalDocument = new TypedDocumentString(`
    query Proposal($primaryKey: Int!) {
  proposal(primaryKey: $primaryKey) {
    title
    created
    primaryKey
    proposalId
    proposerId
  }
}
    `) as unknown as TypedDocumentString<ProposalQuery, ProposalQueryVariables>;
export const ProposalByIdDocument = new TypedDocumentString(`
    query ProposalById($proposalId: String!) {
  proposalById(proposalId: $proposalId) {
    proposalId
    primaryKey
    callId
  }
}
    `) as unknown as TypedDocumentString<ProposalByIdQuery, ProposalByIdQueryVariables>;
export const GetProposalsDocument = new TypedDocumentString(`
    query getProposals($filter: ProposalsFilter) {
  proposals(filter: $filter) {
    proposals {
      primaryKey
      proposalId
      title
      submitted
      proposerId
      abstract
      status {
        name
      }
      proposer {
        id
      }
      users {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProposalsQuery, GetProposalsQueryVariables>;
export const GetProposalsWithCallInfoDocument = new TypedDocumentString(`
    query getProposalsWithCallInfo($filter: ProposalsFilter) {
  proposals(filter: $filter) {
    proposals {
      primaryKey
      proposalId
      title
      proposer {
        id
      }
      call {
        shortCode
        title
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProposalsWithCallInfoQuery, GetProposalsWithCallInfoQueryVariables>;
export const QuestionaryDocument = new TypedDocumentString(`
    query Questionary($questionaryId: Int!) {
  questionary(questionaryId: $questionaryId) {
    questionaryId
    templateId
    steps {
      topic {
        templateId
        title
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<QuestionaryQuery, QuestionaryQueryVariables>;
export const SettingsDocument = new TypedDocumentString(`
    query Settings {
  settings {
    description
    id
  }
}
    `) as unknown as TypedDocumentString<SettingsQuery, SettingsQueryVariables>;
export const InstrumentDocument = new TypedDocumentString(`
    query Instrument($instrumentId: Int!) {
  instrument(instrumentId: $instrumentId) {
    id
    name
    managerUserId
    shortCode
  }
}
    `) as unknown as TypedDocumentString<InstrumentQuery, InstrumentQueryVariables>;
export const RemoveAssignedInstrumentFromCallDocument = new TypedDocumentString(`
    mutation RemoveAssignedInstrumentFromCall($removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput!) {
  removeAssignedInstrumentFromCall(
    removeAssignedInstrumentFromCallInput: $removeAssignedInstrumentFromCallInput
  ) {
    id
    shortCode
    title
    templateId
    instruments {
      id
      managerUserId
      name
      shortCode
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveAssignedInstrumentFromCallMutation, RemoveAssignedInstrumentFromCallMutationVariables>;
export const RemoveMemberFromFapDocument = new TypedDocumentString(`
    mutation RemoveMemberFromFap($memberId: Int!, $fapId: Int!, $roleId: UserRole!) {
  removeMemberFromFap(memberId: $memberId, fapId: $fapId, roleId: $roleId) {
    id
  }
}
    `) as unknown as TypedDocumentString<RemoveMemberFromFapMutation, RemoveMemberFromFapMutationVariables>;
export const RemoveMemberFromFapProposalDocument = new TypedDocumentString(`
    mutation RemoveMemberFromFapProposal($memberId: Int!, $fapId: Int!, $proposalPk: Int!) {
  removeMemberFromFapProposal(
    memberId: $memberId
    fapId: $fapId
    proposalPk: $proposalPk
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<RemoveMemberFromFapProposalMutation, RemoveMemberFromFapProposalMutationVariables>;
export const RemoveProposalsFromInstrumentDocument = new TypedDocumentString(`
    mutation RemoveProposalsFromInstrument($proposalPks: [Int!]!) {
  removeProposalsFromInstrument(proposalPks: $proposalPks)
}
    `) as unknown as TypedDocumentString<RemoveProposalsFromInstrumentMutation, RemoveProposalsFromInstrumentMutationVariables>;
export const UpdateProposalDocument = new TypedDocumentString(`
    mutation UpdateProposal($proposalPk: Int!, $users: [Int!], $title: String!, $abstract: String!, $proposerId: Int, $created: DateTime) {
  updateProposal(
    proposalPk: $proposalPk
    users: $users
    title: $title
    abstract: $abstract
    proposerId: $proposerId
    created: $created
  ) {
    callId
    statusId
    primaryKey
    proposalId
    proposer {
      id
    }
    users {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProposalMutation, UpdateProposalMutationVariables>;