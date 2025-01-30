/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type AddConnectionStatusActionsInput = {
  actions: Array<ConnectionHasActionsInput>;
  connectionId: Scalars['Int']['input'];
  workflowId: Scalars['Int']['input'];
};

export type AddProposalWorkflowStatusInput = {
  droppableGroupId: Scalars['String']['input'];
  nextProposalStatusId?: InputMaybe<Scalars['Int']['input']>;
  parentDroppableGroupId?: InputMaybe<Scalars['String']['input']>;
  prevProposalStatusId?: InputMaybe<Scalars['Int']['input']>;
  proposalStatusId: Scalars['Int']['input'];
  proposalWorkflowId: Scalars['Int']['input'];
  sortOrder: Scalars['Int']['input'];
};

export type AddStatusChangingEventsToConnectionInput = {
  proposalWorkflowConnectionId: Scalars['Int']['input'];
  statusChangingEvents: Array<Scalars['String']['input']>;
};

export type AddTechnicalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  publicComment?: InputMaybe<Scalars['String']['input']>;
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
  placeholder?: Maybe<Scalars['Boolean']['output']>;
  position: Scalars['String']['output'];
  preferredname?: Maybe<Scalars['String']['output']>;
};

export type BooleanConfig = {
  __typename?: 'BooleanConfig';
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
  fapReviewTemplateId?: Maybe<Scalars['Int']['output']>;
  faps?: Maybe<Array<Fap>>;
  id: Scalars['Int']['output'];
  instruments: Array<InstrumentWithAvailabilityTime>;
  isActive: Scalars['Boolean']['output'];
  isActiveInternal: Scalars['Boolean']['output'];
  pdfTemplateId?: Maybe<Scalars['Int']['output']>;
  proposalCount: Scalars['Int']['output'];
  proposalSequence?: Maybe<Scalars['Int']['output']>;
  proposalWorkflow?: Maybe<ProposalWorkflow>;
  proposalWorkflowId?: Maybe<Scalars['Int']['output']>;
  referenceNumberFormat?: Maybe<Scalars['String']['output']>;
  shortCode: Scalars['String']['output'];
  startCall: Scalars['DateTime']['output'];
  startCycle: Scalars['DateTime']['output'];
  startFapReview?: Maybe<Scalars['DateTime']['output']>;
  startNotify: Scalars['DateTime']['output'];
  startReview: Scalars['DateTime']['output'];
  submissionMessage?: Maybe<Scalars['String']['output']>;
  surveyComment: Scalars['String']['output'];
  template: Template;
  templateId: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type CallsFilter = {
  esiTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  fapIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  fapReviewTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  instrumentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isActiveInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isCallEndedByEvent?: InputMaybe<Scalars['Boolean']['input']>;
  isEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isEndedInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isFapReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  pdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalStatusShortCode?: InputMaybe<Scalars['String']['input']>;
  shortCode?: InputMaybe<Scalars['String']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ChangeProposalsStatusInput = {
  proposalPks: Array<Scalars['Int']['input']>;
  statusId: Scalars['Int']['input'];
};

export type ClaimsInput = {
  roleIds: Array<Scalars['Int']['input']>;
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
  actionType: ProposalStatusActionType;
  config?: InputMaybe<Scalars['String']['input']>;
};

export type ConnectionStatusAction = {
  __typename?: 'ConnectionStatusAction';
  action: ProposalStatusAction;
  actionId: Scalars['Int']['output'];
  config?: Maybe<ProposalStatusActionConfig>;
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
  fapReviewTemplateId?: InputMaybe<Scalars['Int']['input']>;
  faps?: InputMaybe<Array<Scalars['Int']['input']>>;
  pdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  proposalSequence?: InputMaybe<Scalars['Int']['input']>;
  proposalWorkflowId: Scalars['Int']['input'];
  referenceNumberFormat?: InputMaybe<Scalars['String']['input']>;
  shortCode: Scalars['String']['input'];
  startCall: Scalars['DateTime']['input'];
  startCycle: Scalars['DateTime']['input'];
  startFapReview?: InputMaybe<Scalars['DateTime']['input']>;
  startNotify: Scalars['DateTime']['input'];
  startReview: Scalars['DateTime']['input'];
  submissionMessage?: InputMaybe<Scalars['String']['input']>;
  surveyComment: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInternalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  reviewerId?: InputMaybe<Scalars['Int']['input']>;
  technicalReviewId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateInviteInput = {
  claims: ClaimsInput;
  email: Scalars['String']['input'];
  note: Scalars['String']['input'];
};

export type CreatePredefinedMessageInput = {
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProposalStatusInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};

export type CreateProposalWorkflowInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum DataType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  DynamicMultipleChoice = 'DYNAMIC_MULTIPLE_CHOICE',
  Embellishment = 'EMBELLISHMENT',
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

export type DeleteProposalWorkflowStatusInput = {
  proposalStatusId: Scalars['Int']['input'];
  proposalWorkflowId: Scalars['Int']['input'];
  sortOrder: Scalars['Int']['input'];
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
  FapChairAndSecretary = 'FAP_CHAIR_AND_SECRETARY',
  FapReviewers = 'FAP_REVIEWERS',
  InstrumentScientists = 'INSTRUMENT_SCIENTISTS',
  Other = 'OTHER',
  Pi = 'PI',
  UserOffice = 'USER_OFFICE'
}

export type EmailStatusActionRecipientsWithTemplate = {
  __typename?: 'EmailStatusActionRecipientsWithTemplate';
  combineEmails?: Maybe<Scalars['Boolean']['output']>;
  emailTemplate: EmailStatusActionEmailTemplate;
  otherRecipientEmails?: Maybe<Array<Scalars['String']['output']>>;
  recipient: EmailStatusActionRecipient;
};

export type EmbellishmentConfig = {
  __typename?: 'EmbellishmentConfig';
  html: Scalars['String']['output'];
  omitFromPdf: Scalars['Boolean']['output'];
  plain: Scalars['String']['output'];
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
  EmailInvite = 'EMAIL_INVITE',
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
  TechniqueCreated = 'TECHNIQUE_CREATED',
  TechniqueDeleted = 'TECHNIQUE_DELETED',
  TechniqueUpdated = 'TECHNIQUE_UPDATED',
  TopicAnswered = 'TOPIC_ANSWERED',
  UserDeleted = 'USER_DELETED',
  UserPasswordResetEmail = 'USER_PASSWORD_RESET_EMAIL',
  UserRoleUpdated = 'USER_ROLE_UPDATED',
  UserUpdated = 'USER_UPDATED'
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

export type ExperimentSafetyInput = {
  __typename?: 'ExperimentSafetyInput';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isSubmitted: Scalars['Boolean']['output'];
  proposal: Proposal;
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  sampleEsis: Array<SampleExperimentSafetyInput>;
  scheduledEventId: Scalars['Int']['output'];
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
};

export type FapReviewBasisConfig = {
  __typename?: 'FapReviewBasisConfig';
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FapReviewTemplate = {
  __typename?: 'FapReviewTemplate';
  callCount: Scalars['Int']['output'];
  complementaryQuestions: Array<Question>;
  description?: Maybe<Scalars['String']['output']>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pdfCallCount?: Maybe<Scalars['Int']['output']>;
  pdfTemplate?: Maybe<PdfTemplate>;
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type FapReviewTemplatesFilter = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

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
  EmailInvite = 'EMAIL_INVITE',
  EmailSearch = 'EMAIL_SEARCH',
  FapReview = 'FAP_REVIEW',
  InstrumentManagement = 'INSTRUMENT_MANAGEMENT',
  Oauth = 'OAUTH',
  RiskAssessment = 'RISK_ASSESSMENT',
  SampleSafety = 'SAMPLE_SAFETY',
  Scheduler = 'SCHEDULER',
  Shipping = 'SHIPPING',
  StfcIdleTimer = 'STFC_IDLE_TIMER',
  StfcXpressManagement = 'STFC_XPRESS_MANAGEMENT',
  TechnicalReview = 'TECHNICAL_REVIEW',
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
  id: Scalars['Int']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  scheduledEventId: Scalars['Int']['output'];
  status: FeedbackStatus;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FeedbackBasisConfig = {
  __typename?: 'FeedbackBasisConfig';
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FeedbackRequest = {
  __typename?: 'FeedbackRequest';
  id: Scalars['Int']['output'];
  requestedAt: Scalars['DateTime']['output'];
  scheduledEventId: Scalars['Int']['output'];
};

export enum FeedbackStatus {
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type FeedbacksFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
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

export type FieldConfig = BooleanConfig | DateConfig | DynamicMultipleChoiceConfig | EmbellishmentConfig | FapReviewBasisConfig | FeedbackBasisConfig | FileUploadConfig | GenericTemplateBasisConfig | InstrumentPickerConfig | IntervalConfig | NumberInputConfig | ProposalBasisConfig | ProposalEsiBasisConfig | RichTextInputConfig | SampleBasisConfig | SampleDeclarationConfig | SampleEsiBasisConfig | SelectionFromOptionsConfig | ShipmentBasisConfig | SubTemplateConfig | TechniquePickerConfig | TextInputConfig | VisitBasisConfig;

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

export type IndexWithGroupId = {
  droppableId: Scalars['String']['input'];
  index: Scalars['Int']['input'];
};

export type Institution = {
  __typename?: 'Institution';
  country?: Maybe<Entry>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rorId?: Maybe<Scalars['String']['output']>;
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
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  shortCode: Scalars['String']['output'];
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
  requestTime: Scalars['Boolean']['output'];
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type InstrumentWithAvailabilityTime = {
  __typename?: 'InstrumentWithAvailabilityTime';
  availabilityTime?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  fap?: Maybe<Fap>;
  fapId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  instrumentContact?: Maybe<BasicUserDetails>;
  managerUserId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  shortCode: Scalars['String']['output'];
  submitted?: Maybe<Scalars['Boolean']['output']>;
};

export type InstrumentWithManagementTime = {
  __typename?: 'InstrumentWithManagementTime';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  instrumentContact?: Maybe<BasicUserDetails>;
  managementTimeAllocation?: Maybe<Scalars['Int']['output']>;
  managerUserId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  shortCode: Scalars['String']['output'];
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
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  units: Array<Unit>;
};

export type InviteCode = {
  __typename?: 'InviteCode';
  claimedAt?: Maybe<Scalars['DateTime']['output']>;
  claimedByUserId?: Maybe<Scalars['Int']['output']>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  note: Scalars['String']['output'];
};

export type ManagementTimeAllocationsInput = {
  instrumentId: Scalars['Int']['input'];
  value: Scalars['Int']['input'];
};

export type MoveProposalWorkflowStatusInput = {
  from: IndexWithGroupId;
  proposalWorkflowId: Scalars['Int']['input'];
  to: IndexWithGroupId;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: Scalars['Boolean']['output'];
  addClientLog: Scalars['Boolean']['output'];
  addConnectionStatusActions?: Maybe<Array<ConnectionStatusAction>>;
  addProposalWorkflowStatus: ProposalWorkflowConnection;
  addSamplesToShipment: Shipment;
  addStatusChangingEventsToConnection: Array<StatusChangingEvent>;
  addTechnicalReview: TechnicalReview;
  addUserForReview: Review;
  addUserRole: Scalars['Boolean']['output'];
  administrationProposal: Proposal;
  answerTopic: Array<AnswerBasic>;
  applyPatches: Array<Scalars['String']['output']>;
  assignChairOrSecretary: Fap;
  assignFapReviewersToProposals: Fap;
  assignInstrumentsToCall: Call;
  assignInstrumentsToTechnique: Scalars['Boolean']['output'];
  assignProposalToTechniques: Scalars['Boolean']['output'];
  assignProposalsToFaps: Scalars['Boolean']['output'];
  assignProposalsToInstruments: Scalars['Boolean']['output'];
  assignReviewersToFap: Fap;
  assignScientistsToInstrument: Scalars['Boolean']['output'];
  assignScientistsToTechnique: Scalars['Boolean']['output'];
  assignXpressProposalsToInstruments: Scalars['Boolean']['output'];
  changeProposalsStatus: Scalars['Boolean']['output'];
  changeXpressProposalsStatus: Scalars['Boolean']['output'];
  cloneGenericTemplate: GenericTemplate;
  cloneProposals: Array<Proposal>;
  cloneSample: Sample;
  cloneSampleEsi: SampleExperimentSafetyInput;
  cloneTemplate: Template;
  createApiAccessToken: PermissionsWithAccessToken;
  createCall: Call;
  createEsi: ExperimentSafetyInput;
  createFap: Fap;
  createFeedback: Feedback;
  createGenericTemplate: GenericTemplate;
  createGenericTemplateWithCopiedAnswers: Array<GenericTemplate>;
  createInstrument: Instrument;
  createInternalReview: InternalReview;
  createInvite: InviteCode;
  createPdfTemplate: PdfTemplate;
  createPredefinedMessage: PredefinedMessage;
  createProposal: Proposal;
  createProposalScientistComment: ProposalScientistComment;
  createProposalStatus: ProposalStatus;
  createProposalWorkflow: ProposalWorkflow;
  createQuestion: Question;
  createQuestionTemplateRelation: Template;
  createQuestionary: Questionary;
  createSample: Sample;
  createSampleEsi: SampleExperimentSafetyInput;
  createShipment: Shipment;
  createTechnique: Technique;
  createTemplate: Template;
  createTopic: Template;
  createUnit: Unit;
  createUserByEmailInvite: Scalars['Int']['output'];
  createVisit: Visit;
  createVisitRegistration: VisitRegistration;
  deleteApiAccessToken: Scalars['Boolean']['output'];
  deleteCall: Call;
  deleteFap: Fap;
  deleteFeedback: Feedback;
  deleteGenericTemplate: GenericTemplate;
  deleteInstitution: Institution;
  deleteInstrument: Instrument;
  deleteInternalReview: InternalReview;
  deletePdfTemplate: PdfTemplate;
  deletePredefinedMessage: PredefinedMessage;
  deleteProposal: Proposal;
  deleteProposalScientistComment: ProposalScientistComment;
  deleteProposalStatus: ProposalStatus;
  deleteProposalWorkflow: ProposalWorkflow;
  deleteProposalWorkflowStatus: Scalars['Boolean']['output'];
  deleteQuestion: Question;
  deleteQuestionTemplateRelation: Template;
  deleteSample: Sample;
  deleteSampleEsi: SampleExperimentSafetyInput;
  deleteShipment: Shipment;
  deleteTechnique: Technique;
  deleteTemplate: Template;
  deleteTopic: Template;
  deleteUnit: Unit;
  deleteUser: User;
  deleteVisit: Visit;
  externalTokenLogin: Scalars['String']['output'];
  getTokenForUser: Scalars['String']['output'];
  importProposal: Proposal;
  importTemplate: Template;
  importUnits: Array<Unit>;
  logout: Scalars['String']['output'];
  mergeInstitutions: Institution;
  moveProposalWorkflowStatus: ProposalWorkflowConnection;
  notifyProposal: Proposal;
  prepareDB: Array<Scalars['String']['output']>;
  redeemCode: RedeemCode;
  removeAssignedInstrumentFromCall: Call;
  removeInstrumentsFromTechnique: Scalars['Boolean']['output'];
  removeMemberFromFap: Fap;
  removeMemberFromFapProposal: Fap;
  removeProposalsFromFaps: Array<FapProposal>;
  removeProposalsFromInstrument: Scalars['Boolean']['output'];
  removeScientistFromInstrument: Scalars['Boolean']['output'];
  removeScientistFromTechnique: Scalars['Boolean']['output'];
  removeUserForReview: Review;
  reorderFapMeetingDecisionProposals: FapMeetingDecision;
  replayStatusActionsLog: Scalars['Boolean']['output'];
  requestFeedback: FeedbackRequest;
  saveFapMeetingDecision: FapMeetingDecision;
  saveReviewerRank: Scalars['Boolean']['output'];
  selectRole: Scalars['String']['output'];
  setActiveTemplate: Scalars['Boolean']['output'];
  setInstrumentAvailabilityTime: Scalars['Boolean']['output'];
  setPageContent: Page;
  setUserNotPlaceholder: User;
  submitFapMeetingDecisions: Array<FapProposal>;
  submitInstrumentInFap: Scalars['Boolean']['output'];
  submitProposal: Proposal;
  submitProposalsReview: Scalars['Boolean']['output'];
  submitSampleReview: Sample;
  submitShipment: Shipment;
  submitTechnicalReviews: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  unsubmitInstrumentInFap: Scalars['Boolean']['output'];
  updateAnswer: Scalars['String']['output'];
  updateApiAccessToken: PermissionsWithAccessToken;
  updateCall: Call;
  updateEsi: ExperimentSafetyInput;
  updateFap: Fap;
  updateFapTimeAllocation: FapProposal;
  updateFapToCallInstrument: Call;
  updateFeatures: Array<Feature>;
  updateFeedback: Feedback;
  updateGenericTemplate: GenericTemplate;
  updateInstitution: Institution;
  updateInstrument: Instrument;
  updateInternalReview: InternalReview;
  updateInvite: InviteCode;
  updatePdfTemplate: PdfTemplate;
  updatePredefinedMessage: PredefinedMessage;
  updateProposal: Proposal;
  updateProposalScientistComment: ProposalScientistComment;
  updateProposalStatus: ProposalStatus;
  updateProposalWorkflow: ProposalWorkflow;
  updateQuestion: Question;
  updateQuestionTemplateRelation: Template;
  updateQuestionTemplateRelationSettings: Template;
  updateReview: Review;
  updateSample: Sample;
  updateSampleEsi: SampleExperimentSafetyInput;
  updateSettings: Settings;
  updateShipment: Shipment;
  updateTechnicalReviewAssignee: Array<TechnicalReview>;
  updateTechnique: Technique;
  updateTemplate: Template;
  updateTopic: Template;
  updateUser: User;
  updateUserRoles: User;
  updateVisit: Visit;
  updateVisitRegistration: VisitRegistration;
  validateTemplateImport: TemplateValidation;
  validateUnitsImport: UnitsImportWithValidation;
};


export type MutationAcceptInviteArgs = {
  code: Scalars['String']['input'];
};


export type MutationAddClientLogArgs = {
  error: Scalars['String']['input'];
};


export type MutationAddConnectionStatusActionsArgs = {
  newConnectionStatusActionsInput: AddConnectionStatusActionsInput;
};


export type MutationAddProposalWorkflowStatusArgs = {
  newProposalWorkflowStatusInput: AddProposalWorkflowStatusInput;
};


export type MutationAddSamplesToShipmentArgs = {
  sampleIds: Array<Scalars['Int']['input']>;
  shipmentId: Scalars['Int']['input'];
};


export type MutationAddStatusChangingEventsToConnectionArgs = {
  addStatusChangingEventsToConnectionInput: AddStatusChangingEventsToConnectionInput;
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


export type MutationAssignXpressProposalsToInstrumentsArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationChangeProposalsStatusArgs = {
  changeProposalsStatusInput: ChangeProposalsStatusInput;
};


export type MutationChangeXpressProposalsStatusArgs = {
  changeProposalsStatusInput: ChangeProposalsStatusInput;
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


export type MutationCloneSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  newSampleTitle?: InputMaybe<Scalars['String']['input']>;
  sampleId: Scalars['Int']['input'];
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


export type MutationCreateEsiArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type MutationCreateFapArgs = {
  active: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  customGradeGuide?: InputMaybe<Scalars['Boolean']['input']>;
  description: Scalars['String']['input'];
  gradeGuide?: InputMaybe<Scalars['String']['input']>;
  numberRatingsRequired?: Scalars['Int']['input'];
};


export type MutationCreateFeedbackArgs = {
  scheduledEventId: Scalars['Int']['input'];
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
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationCreateInternalReviewArgs = {
  createInternalReviewInput: CreateInternalReviewInput;
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationCreatePdfTemplateArgs = {
  dummyData: Scalars['String']['input'];
  templateData: Scalars['String']['input'];
  templateFooter: Scalars['String']['input'];
  templateHeader: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  templateSampleDeclaration: Scalars['String']['input'];
};


export type MutationCreatePredefinedMessageArgs = {
  createPredefinedMessageInput: CreatePredefinedMessageInput;
};


export type MutationCreateProposalArgs = {
  callId: Scalars['Int']['input'];
};


export type MutationCreateProposalScientistCommentArgs = {
  comment: Scalars['String']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type MutationCreateProposalStatusArgs = {
  newProposalStatusInput: CreateProposalStatusInput;
};


export type MutationCreateProposalWorkflowArgs = {
  newProposalWorkflowInput: CreateProposalWorkflowInput;
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


export type MutationCreateSampleArgs = {
  isPostProposalSubmission?: InputMaybe<Scalars['Boolean']['input']>;
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type MutationCreateShipmentArgs = {
  proposalPk: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
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


export type MutationCreateUserByEmailInviteArgs = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  userRole: UserRole;
};


export type MutationCreateVisitArgs = {
  scheduledEventId: Scalars['Int']['input'];
  team: Array<Scalars['Int']['input']>;
  teamLeadUserId: Scalars['Int']['input'];
};


export type MutationCreateVisitRegistrationArgs = {
  visitId: Scalars['Int']['input'];
};


export type MutationDeleteApiAccessTokenArgs = {
  deleteApiAccessTokenInput: DeleteApiAccessTokenInput;
};


export type MutationDeleteCallArgs = {
  id: Scalars['Int']['input'];
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


export type MutationDeletePdfTemplateArgs = {
  pdfTemplateId: Scalars['Int']['input'];
};


export type MutationDeletePredefinedMessageArgs = {
  deletePredefinedMessageInput: DeletePredefinedMessageInput;
};


export type MutationDeleteProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationDeleteProposalScientistCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type MutationDeleteProposalStatusArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProposalWorkflowArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProposalWorkflowStatusArgs = {
  deleteProposalWorkflowStatusInput: DeleteProposalWorkflowStatusInput;
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String']['input'];
};


export type MutationDeleteQuestionTemplateRelationArgs = {
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationDeleteSampleArgs = {
  sampleId: Scalars['Int']['input'];
};


export type MutationDeleteSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type MutationDeleteShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
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


export type MutationExternalTokenLoginArgs = {
  externalToken: Scalars['String']['input'];
  iss?: InputMaybe<Scalars['String']['input']>;
  redirectUri: Scalars['String']['input'];
};


export type MutationGetTokenForUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationImportProposalArgs = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  callId: Scalars['Int']['input'];
  created?: InputMaybe<Scalars['DateTime']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  referenceNumber: Scalars['Int']['input'];
  submittedDate: Scalars['DateTime']['input'];
  submitterId: Scalars['Int']['input'];
  techniqueIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
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


export type MutationMoveProposalWorkflowStatusArgs = {
  moveProposalWorkflowStatusInput: MoveProposalWorkflowStatusInput;
};


export type MutationNotifyProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationPrepareDbArgs = {
  includeSeeds?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRedeemCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationRemoveAssignedInstrumentFromCallArgs = {
  removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput;
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


export type MutationRequestFeedbackArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type MutationSaveFapMeetingDecisionArgs = {
  saveFapMeetingDecisionInput: SaveFapMeetingDecisionInput;
};


export type MutationSaveReviewerRankArgs = {
  proposalPk: Scalars['Int']['input'];
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


export type MutationSetInstrumentAvailabilityTimeArgs = {
  availabilityTime: Scalars['Int']['input'];
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};


export type MutationSetPageContentArgs = {
  id: PageName;
  text: Scalars['String']['input'];
};


export type MutationSetUserNotPlaceholderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSubmitFapMeetingDecisionsArgs = {
  SubmitFapMeetingDecisionsInput: SubmitFapMeetingDecisionsInput;
};


export type MutationSubmitInstrumentInFapArgs = {
  callId: Scalars['Int']['input'];
  fapId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
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


export type MutationUpdateEsiArgs = {
  esiId: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
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
  country: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  rorId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateInstrumentArgs = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  managerUserId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationUpdateInternalReviewArgs = {
  updateInternalReviewInput: UpdateInternalReviewInput;
};


export type MutationUpdateInviteArgs = {
  input: UpdateInviteInput;
};


export type MutationUpdatePdfTemplateArgs = {
  dummyData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateId: Scalars['Int']['input'];
  templateData?: InputMaybe<Scalars['String']['input']>;
  templateFooter?: InputMaybe<Scalars['String']['input']>;
  templateHeader?: InputMaybe<Scalars['String']['input']>;
  templateSampleDeclaration?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePredefinedMessageArgs = {
  updatePredefinedMessageInput: UpdatePredefinedMessageInput;
};


export type MutationUpdateProposalArgs = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  proposalPk: Scalars['Int']['input'];
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateProposalScientistCommentArgs = {
  comment: Scalars['String']['input'];
  commentId: Scalars['Int']['input'];
};


export type MutationUpdateProposalStatusArgs = {
  updatedProposalStatusInput: UpdateProposalStatusInput;
};


export type MutationUpdateProposalWorkflowArgs = {
  updatedProposalWorkflowInput: UpdateProposalWorkflowInput;
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
  grade: Scalars['Float']['input'];
  questionaryID: Scalars['Int']['input'];
  reviewID: Scalars['Int']['input'];
  status: ReviewStatus;
};


export type MutationUpdateSampleArgs = {
  sampleId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  sampleId: Scalars['Int']['input'];
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
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  institutionId?: InputMaybe<Scalars['Int']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  middlename?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['Int']['input']>;
  placeholder?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  preferredname?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  telephone?: InputMaybe<Scalars['String']['input']>;
  telephone_alt?: InputMaybe<Scalars['String']['input']>;
  user_title?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserRolesArgs = {
  id: Scalars['Int']['input'];
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateVisitArgs = {
  status?: InputMaybe<VisitStatus>;
  team?: InputMaybe<Array<Scalars['Int']['input']>>;
  teamLeadUserId?: InputMaybe<Scalars['Int']['input']>;
  visitId: Scalars['Int']['input'];
};


export type MutationUpdateVisitRegistrationArgs = {
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  isRegistrationSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  startsAt?: InputMaybe<Scalars['DateTime']['input']>;
  trainingExpiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  visitId: Scalars['Int']['input'];
};


export type MutationValidateTemplateImportArgs = {
  templateAsJson: Scalars['String']['input'];
};


export type MutationValidateUnitsImportArgs = {
  unitsAsJson: Scalars['String']['input'];
};

export type NumberInputConfig = {
  __typename?: 'NumberInputConfig';
  numberValueConstraint?: Maybe<NumberValueConstraint>;
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
  Xpressmanagementpage = 'XPRESSMANAGEMENTPAGE'
}

export type PdfTemplate = {
  __typename?: 'PdfTemplate';
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  dummyData: Scalars['String']['output'];
  pdfTemplateId: Scalars['Int']['output'];
  templateData: Scalars['String']['output'];
  templateFooter: Scalars['String']['output'];
  templateHeader: Scalars['String']['output'];
  templateId: Scalars['Int']['output'];
  templateSampleDeclaration: Scalars['String']['output'];
};

export type PdfTemplatesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  dummyData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateFooter?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateHeader?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  pdfTemplateSampleDeclaration?: InputMaybe<Scalars['String']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

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
  call?: Maybe<Call>;
  callId: Scalars['Int']['output'];
  commentForManagement?: Maybe<Scalars['String']['output']>;
  commentForUser?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  fapMeetingDecisions?: Maybe<Array<FapMeetingDecision>>;
  faps?: Maybe<Array<Fap>>;
  finalStatus?: Maybe<ProposalEndStatus>;
  genericTemplates?: Maybe<Array<GenericTemplate>>;
  instruments?: Maybe<Array<Maybe<InstrumentWithManagementTime>>>;
  managementDecisionSubmitted: Scalars['Boolean']['output'];
  notified: Scalars['Boolean']['output'];
  primaryKey: Scalars['Int']['output'];
  proposalBookingsCore?: Maybe<ProposalBookingsCore>;
  proposalId: Scalars['String']['output'];
  proposer?: Maybe<BasicUserDetails>;
  proposerId: Scalars['Int']['output'];
  publicStatus: ProposalPublicStatus;
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  samples?: Maybe<Array<Sample>>;
  status?: Maybe<ProposalStatus>;
  statusId: Scalars['Int']['output'];
  submitted: Scalars['Boolean']['output'];
  submittedDate?: Maybe<Scalars['DateTime']['output']>;
  technicalReviews: Array<TechnicalReview>;
  techniques?: Maybe<Array<Maybe<Technique>>>;
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  users: Array<BasicUserDetails>;
  visits?: Maybe<Array<Visit>>;
};


export type ProposalFapMeetingDecisionsArgs = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
};


export type ProposalProposalBookingsCoreArgs = {
  filter?: InputMaybe<ProposalBookingFilter>;
};


export type ProposalReviewsArgs = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
};

export type ProposalBasisConfig = {
  __typename?: 'ProposalBasisConfig';
  tooltip: Scalars['String']['output'];
};

export type ProposalBookingFilter = {
  status?: InputMaybe<Array<ProposalBookingStatusCore>>;
};

export type ProposalBookingScheduledEventFilterCore = {
  bookingType?: InputMaybe<ScheduledEventBookingType>;
  endsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  endsBefore?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Array<ProposalBookingStatusCore>>;
};

export enum ProposalBookingStatusCore {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Draft = 'DRAFT'
}

export type ProposalBookingsCore = {
  __typename?: 'ProposalBookingsCore';
  ids: Array<Scalars['Int']['output']>;
  scheduledEvents: Array<ScheduledEventCore>;
};


export type ProposalBookingsCoreScheduledEventsArgs = {
  filter: ProposalBookingScheduledEventFilterCore;
};

export enum ProposalEndStatus {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Reserved = 'RESERVED',
  Unset = 'UNSET'
}

export type ProposalEsiBasisConfig = {
  __typename?: 'ProposalEsiBasisConfig';
  tooltip: Scalars['String']['output'];
};

export type ProposalEvent = {
  __typename?: 'ProposalEvent';
  description?: Maybe<Scalars['String']['output']>;
  name: Event;
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

export type ProposalScientistComment = {
  __typename?: 'ProposalScientistComment';
  comment: Scalars['String']['output'];
  commentId: Scalars['Int']['output'];
  proposalPk: Scalars['Int']['output'];
};

export type ProposalStatus = {
  __typename?: 'ProposalStatus';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  shortCode: Scalars['String']['output'];
};

export type ProposalStatusAction = {
  __typename?: 'ProposalStatusAction';
  defaultConfig: ProposalStatusActionDefaultConfig;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: ProposalStatusActionType;
};

export type ProposalStatusActionConfig = EmailActionConfig | RabbitMqActionConfig;

export type ProposalStatusActionDefaultConfig = EmailActionDefaultConfig | RabbitMqActionDefaultConfig;

export enum ProposalStatusActionType {
  Email = 'EMAIL',
  Rabbitmq = 'RABBITMQ'
}

export type ProposalTemplate = {
  __typename?: 'ProposalTemplate';
  callCount: Scalars['Int']['output'];
  complementaryQuestions: Array<Question>;
  description?: Maybe<Scalars['String']['output']>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pdfCallCount?: Maybe<Scalars['Int']['output']>;
  pdfTemplate?: Maybe<PdfTemplate>;
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
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
  statusId: Scalars['Int']['output'];
  statusName: Scalars['String']['output'];
  submitted: Scalars['Boolean']['output'];
  submittedDate?: Maybe<Scalars['DateTime']['output']>;
  technicalReviews?: Maybe<Array<ProposalViewTechnicalReview>>;
  techniques?: Maybe<Array<ProposalViewTechnique>>;
  title: Scalars['String']['output'];
  workflowId: Scalars['Int']['output'];
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
  name: Scalars['String']['output'];
};

export type ProposalViewTechnicalReview = {
  __typename?: 'ProposalViewTechnicalReview';
  id: Scalars['Int']['output'];
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

export type ProposalWorkflow = {
  __typename?: 'ProposalWorkflow';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  proposalWorkflowConnectionGroups: Array<ProposalWorkflowConnectionGroup>;
};

export type ProposalWorkflowConnection = {
  __typename?: 'ProposalWorkflowConnection';
  droppableGroupId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  nextProposalStatusId?: Maybe<Scalars['Int']['output']>;
  prevProposalStatusId?: Maybe<Scalars['Int']['output']>;
  proposalStatus: ProposalStatus;
  proposalStatusId: Scalars['Int']['output'];
  proposalWorkflowId: Scalars['Int']['output'];
  sortOrder: Scalars['Int']['output'];
  statusActions?: Maybe<Array<ConnectionStatusAction>>;
  statusChangingEvents?: Maybe<Array<StatusChangingEvent>>;
};

export type ProposalWorkflowConnectionGroup = {
  __typename?: 'ProposalWorkflowConnectionGroup';
  connections: Array<ProposalWorkflowConnection>;
  groupId: Scalars['String']['output'];
  parentGroupId?: Maybe<Scalars['String']['output']>;
};

export type ProposalsFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  dateFilter?: InputMaybe<DateFilterInput>;
  excludeProposalStatusIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  instrumentFilter?: InputMaybe<InstrumentFilterInput>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  proposalStatusId?: InputMaybe<Scalars['Int']['input']>;
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
  allQuestions: AllQuestionsQueryResult;
  basicUserDetails?: Maybe<BasicUserDetails>;
  basicUserDetailsByEmail?: Maybe<BasicUserDetails>;
  blankQuestionary: Questionary;
  blankQuestionarySteps?: Maybe<Array<QuestionaryStep>>;
  blankQuestionaryStepsByCallId?: Maybe<Array<QuestionaryStep>>;
  call?: Maybe<Call>;
  calls?: Maybe<Array<Call>>;
  callsByInstrumentScientist?: Maybe<Array<Call>>;
  checkEmailExist?: Maybe<Scalars['Boolean']['output']>;
  checkExternalToken: ExternalTokenResult;
  checkToken: TokenResult;
  countries?: Maybe<Array<Entry>>;
  esi?: Maybe<ExperimentSafetyInput>;
  eventLogs?: Maybe<Array<EventLog>>;
  factoryVersion: Scalars['String']['output'];
  fap?: Maybe<Fap>;
  fapMembers?: Maybe<Array<FapReviewer>>;
  fapProposal?: Maybe<FapProposal>;
  fapProposals?: Maybe<Array<FapProposal>>;
  fapProposalsByInstrument?: Maybe<Array<FapProposal>>;
  fapReviewTemplates?: Maybe<Array<FapReviewTemplate>>;
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
  nationalities?: Maybe<Array<Entry>>;
  pageContent?: Maybe<Scalars['String']['output']>;
  pdfTemplate?: Maybe<PdfTemplate>;
  pdfTemplates?: Maybe<Array<PdfTemplate>>;
  predefinedMessage?: Maybe<PredefinedMessage>;
  predefinedMessages: Array<PredefinedMessage>;
  previousCollaborators?: Maybe<UserQueryResult>;
  proposal?: Maybe<Proposal>;
  proposalById?: Maybe<Proposal>;
  proposalEvents?: Maybe<Array<ProposalEvent>>;
  proposalReviews?: Maybe<Array<Review>>;
  proposalScientistComment?: Maybe<ProposalScientistComment>;
  proposalStatus?: Maybe<ProposalStatus>;
  proposalStatuses?: Maybe<Array<ProposalStatus>>;
  proposalTemplates?: Maybe<Array<ProposalTemplate>>;
  proposalWorkflow?: Maybe<ProposalWorkflow>;
  proposalWorkflows?: Maybe<Array<ProposalWorkflow>>;
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
  sampleEsi?: Maybe<SampleExperimentSafetyInput>;
  samples?: Maybe<Array<Sample>>;
  samplesByCallId?: Maybe<Array<Sample>>;
  scheduledEventCore?: Maybe<ScheduledEventCore>;
  scheduledEventsCore: Array<ScheduledEventCore>;
  settings: Array<Settings>;
  shipment?: Maybe<Shipment>;
  shipments?: Maybe<Array<Shipment>>;
  statusActions?: Maybe<Array<ProposalStatusAction>>;
  statusActionsLogs?: Maybe<StatusActionsLogQueryResult>;
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


export type QueryAllQuestionsArgs = {
  filter?: InputMaybe<AllQuestionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
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


export type QueryEsiArgs = {
  esiId: Scalars['Int']['input'];
};


export type QueryEventLogsArgs = {
  changedObjectId: Scalars['String']['input'];
  eventType: Scalars['String']['input'];
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


export type QueryPdfTemplateArgs = {
  pdfTemplateId: Scalars['Int']['input'];
};


export type QueryPdfTemplatesArgs = {
  filter?: InputMaybe<PdfTemplatesFilter>;
};


export type QueryPredefinedMessageArgs = {
  predefinedMessageId: Scalars['Int']['input'];
};


export type QueryPredefinedMessagesArgs = {
  filter?: InputMaybe<PredefinedMessagesFilter>;
};


export type QueryPreviousCollaboratorsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  subtractUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userId: Scalars['Int']['input'];
  userRole?: InputMaybe<UserRole>;
};


export type QueryProposalArgs = {
  primaryKey: Scalars['Int']['input'];
};


export type QueryProposalByIdArgs = {
  proposalId: Scalars['String']['input'];
};


export type QueryProposalReviewsArgs = {
  fapId?: InputMaybe<Scalars['Int']['input']>;
  proposalPk: Scalars['Int']['input'];
};


export type QueryProposalScientistCommentArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type QueryProposalStatusArgs = {
  proposalStatusId: Scalars['Int']['input'];
};


export type QueryProposalTemplatesArgs = {
  filter?: InputMaybe<ProposalTemplatesFilter>;
};


export type QueryProposalWorkflowArgs = {
  proposalWorkflowId: Scalars['Int']['input'];
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
  sortDirection?: InputMaybe<Scalars['String']['input']>;
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


export type QuerySampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type QuerySamplesArgs = {
  filter?: InputMaybe<SamplesFilter>;
};


export type QuerySamplesByCallIdArgs = {
  callId: Scalars['Int']['input'];
};


export type QueryScheduledEventCoreArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type QueryScheduledEventsCoreArgs = {
  filter?: InputMaybe<ScheduledEventsCoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type QueryShipmentsArgs = {
  filter?: InputMaybe<ShipmentsFilter>;
};


export type QueryStatusActionsLogsArgs = {
  filter?: InputMaybe<StatusActionsLogsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTechniqueArgs = {
  techniqueId: Scalars['Int']['input'];
};


export type QueryTechniqueScientistProposalsArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
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
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  subtractUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userRole?: InputMaybe<UserRole>;
};


export type QueryVisitArgs = {
  visitId: Scalars['Int']['input'];
};


export type QueryVisitRegistrationArgs = {
  visitId: Scalars['Int']['input'];
};


export type QueryVisitsArgs = {
  filter?: InputMaybe<VisitsFilter>;
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

export type RedeemCode = {
  __typename?: 'RedeemCode';
  claimedAt?: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  placeholderUserId: Scalars['Int']['output'];
};

export type RemoveAssignedInstrumentFromCallInput = {
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};

export type ReorderFapMeetingDecisionProposalsInput = {
  proposals: Array<ProposalPkWithRankOrder>;
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  fapID: Scalars['Int']['output'];
  grade?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  proposal?: Maybe<Proposal>;
  questionary: Questionary;
  questionaryID: Scalars['Int']['output'];
  reviewer?: Maybe<BasicUserDetails>;
  status: ReviewStatus;
  userID: Scalars['Int']['output'];
};

export enum ReviewStatus {
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

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
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  shortCode: Scalars['String']['output'];
  title: Scalars['String']['output'];
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
  titlePlaceholder: Scalars['String']['output'];
};

export type SampleDeclarationConfig = {
  __typename?: 'SampleDeclarationConfig';
  addEntryButtonLabel: Scalars['String']['output'];
  esiTemplateId?: Maybe<Scalars['Int']['output']>;
  maxEntries?: Maybe<Scalars['Int']['output']>;
  minEntries?: Maybe<Scalars['Int']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  templateCategory: Scalars['String']['output'];
  templateId?: Maybe<Scalars['Int']['output']>;
};

export type SampleEsiBasisConfig = {
  __typename?: 'SampleEsiBasisConfig';
  tooltip: Scalars['String']['output'];
};

export type SampleExperimentSafetyInput = {
  __typename?: 'SampleExperimentSafetyInput';
  esiId: Scalars['Int']['output'];
  isSubmitted: Scalars['Boolean']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  sample: Sample;
  sampleId: Scalars['Int']['output'];
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

export enum ScheduledEventBookingType {
  Equipment = 'EQUIPMENT',
  Maintenance = 'MAINTENANCE',
  Shutdown = 'SHUTDOWN',
  UserOperations = 'USER_OPERATIONS'
}

export type ScheduledEventCore = {
  __typename?: 'ScheduledEventCore';
  bookingType: ScheduledEventBookingType;
  endsAt: Scalars['DateTime']['output'];
  esi?: Maybe<ExperimentSafetyInput>;
  feedback?: Maybe<Feedback>;
  feedbackRequests: Array<FeedbackRequest>;
  id: Scalars['Int']['output'];
  instrument?: Maybe<Instrument>;
  instrumentId?: Maybe<Scalars['Int']['output']>;
  localContact?: Maybe<BasicUserDetails>;
  localContactId?: Maybe<Scalars['Int']['output']>;
  proposal: Proposal;
  proposalPk?: Maybe<Scalars['Int']['output']>;
  shipments: Array<Shipment>;
  startsAt: Scalars['DateTime']['output'];
  status: ProposalBookingStatusCore;
  visit?: Maybe<Visit>;
};

export type ScheduledEventsCoreFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  endsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  endsBefore?: InputMaybe<Scalars['DateTime']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  overlaps?: InputMaybe<TimeSpan>;
  startsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  startsBefore?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SelectionFromOptionsConfig = {
  __typename?: 'SelectionFromOptionsConfig';
  isMultipleSelect: Scalars['Boolean']['output'];
  options: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  variant: Scalars['String']['output'];
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
  ExternalAuthLoginUrl = 'EXTERNAL_AUTH_LOGIN_URL',
  ExternalAuthLogoutUrl = 'EXTERNAL_AUTH_LOGOUT_URL',
  FapSecsEditTechReviews = 'FAP_SECS_EDIT_TECH_REVIEWS',
  FeedbackExhaustDays = 'FEEDBACK_EXHAUST_DAYS',
  FeedbackFrequencyDays = 'FEEDBACK_FREQUENCY_DAYS',
  FeedbackMaxRequests = 'FEEDBACK_MAX_REQUESTS',
  GradePrecision = 'GRADE_PRECISION',
  HeaderLogoFilename = 'HEADER_LOGO_FILENAME',
  IdleTimeout = 'IDLE_TIMEOUT',
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
  externalRef?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  samples: Array<Sample>;
  scheduledEventId?: Maybe<Scalars['Int']['output']>;
  status: ShipmentStatus;
  title: Scalars['String']['output'];
};

export type ShipmentBasisConfig = {
  __typename?: 'ShipmentBasisConfig';
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
  externalRef?: InputMaybe<Scalars['String']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
  shipmentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<ShipmentStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type StatusActionsLog = {
  __typename?: 'StatusActionsLog';
  connectionStatusAction?: Maybe<ConnectionStatusAction>;
  emailStatusActionRecipient: EmailStatusActionRecipients;
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
  statusActionsLogIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  statusActionsMessage?: InputMaybe<Scalars['String']['input']>;
  statusActionsSuccessful?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StatusChangingEvent = {
  __typename?: 'StatusChangingEvent';
  proposalWorkflowConnectionId: Scalars['Int']['output'];
  statusChangingEvent: Scalars['String']['output'];
  statusChangingEventId: Scalars['Int']['output'];
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
  reviewerId: Scalars['Int']['input'];
  status?: InputMaybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['input'];
  timeAllocation?: InputMaybe<Scalars['Int']['input']>;
};

export type SubmitTechnicalReviewsInput = {
  technicalReviews: Array<SubmitTechnicalReviewInput>;
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
  reviewer?: Maybe<BasicUserDetails>;
  reviewerId: Scalars['Int']['output'];
  status?: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['output'];
  technicalReviewAssignee?: Maybe<BasicUserDetails>;
  technicalReviewAssigneeId?: Maybe<Scalars['Int']['output']>;
  timeAllocation?: Maybe<Scalars['Int']['output']>;
};

export enum TechnicalReviewStatus {
  Feasible = 'FEASIBLE',
  PartiallyFeasible = 'PARTIALLY_FEASIBLE',
  Unfeasible = 'UNFEASIBLE'
}

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
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pdfCallCount?: Maybe<Scalars['Int']['output']>;
  pdfTemplate?: Maybe<PdfTemplate>;
  proposalESICallCount?: Maybe<Scalars['Int']['output']>;
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
  FapReview = 'FAP_REVIEW',
  Feedback = 'FEEDBACK',
  GenericTemplate = 'GENERIC_TEMPLATE',
  Pdf = 'PDF',
  ProposalQuestionary = 'PROPOSAL_QUESTIONARY',
  SampleDeclaration = 'SAMPLE_DECLARATION',
  ShipmentDeclaration = 'SHIPMENT_DECLARATION',
  VisitRegistration = 'VISIT_REGISTRATION'
}

export type TemplateGroup = {
  __typename?: 'TemplateGroup';
  categoryId: TemplateCategoryId;
  groupId: TemplateGroupId;
};

export enum TemplateGroupId {
  FapReview = 'FAP_REVIEW',
  Feedback = 'FEEDBACK',
  GenericTemplate = 'GENERIC_TEMPLATE',
  PdfTemplate = 'PDF_TEMPLATE',
  Proposal = 'PROPOSAL',
  ProposalEsi = 'PROPOSAL_ESI',
  Sample = 'SAMPLE',
  SampleEsi = 'SAMPLE_ESI',
  Shipment = 'SHIPMENT',
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

export enum TrainingStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  None = 'NONE'
}

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
  fapReviewTemplateId?: InputMaybe<Scalars['Int']['input']>;
  faps?: InputMaybe<Array<Scalars['Int']['input']>>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  pdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  proposalSequence?: InputMaybe<Scalars['Int']['input']>;
  proposalWorkflowId?: InputMaybe<Scalars['Int']['input']>;
  referenceNumberFormat?: InputMaybe<Scalars['String']['input']>;
  shortCode?: InputMaybe<Scalars['String']['input']>;
  startCall?: InputMaybe<Scalars['DateTime']['input']>;
  startCycle?: InputMaybe<Scalars['DateTime']['input']>;
  startFapReview?: InputMaybe<Scalars['DateTime']['input']>;
  startNotify?: InputMaybe<Scalars['DateTime']['input']>;
  startReview?: InputMaybe<Scalars['DateTime']['input']>;
  submissionMessage?: InputMaybe<Scalars['String']['input']>;
  surveyComment?: InputMaybe<Scalars['String']['input']>;
  templateId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateInviteInput = {
  claims?: InputMaybe<ClaimsInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePredefinedMessageInput = {
  id: Scalars['Int']['input'];
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateProposalStatusInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  shortCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProposalWorkflowInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateSettingsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  settingsId: SettingsId;
  settingsValue?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  birthdate: Scalars['DateTime']['output'];
  created: Scalars['String']['output'];
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  faps: Array<Fap>;
  firstname: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  institutionId: Scalars['Int']['output'];
  instruments: Array<Instrument>;
  lastname: Scalars['String']['output'];
  middlename?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['Int']['output']>;
  oauthRefreshToken?: Maybe<Scalars['String']['output']>;
  oidcSub?: Maybe<Scalars['String']['output']>;
  placeholder: Scalars['Boolean']['output'];
  position: Scalars['String']['output'];
  preferredname?: Maybe<Scalars['String']['output']>;
  proposals: Array<Proposal>;
  reviews: Array<Review>;
  roles: Array<Role>;
  telephone: Scalars['String']['output'];
  telephone_alt?: Maybe<Scalars['String']['output']>;
  updated: Scalars['String']['output'];
  user_title: Scalars['String']['output'];
  username: Scalars['String']['output'];
};


export type UserProposalsArgs = {
  filter?: InputMaybe<UserProposalsFilter>;
};


export type UserReviewsArgs = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  reviewer?: InputMaybe<ReviewerFilter>;
  status?: InputMaybe<ReviewStatus>;
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
  placeholder: Scalars['Boolean']['output'];
  position: Scalars['String']['output'];
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
  FapChair = 'FAP_CHAIR',
  FapReviewer = 'FAP_REVIEWER',
  FapSecretary = 'FAP_SECRETARY',
  InstrumentScientist = 'INSTRUMENT_SCIENTIST',
  InternalReviewer = 'INTERNAL_REVIEWER',
  SampleSafetyReviewer = 'SAMPLE_SAFETY_REVIEWER',
  User = 'USER',
  UserOfficer = 'USER_OFFICER'
}

export type Visit = {
  __typename?: 'Visit';
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  registrations: Array<VisitRegistration>;
  samples: Array<Sample>;
  scheduledEventId: Scalars['Int']['output'];
  status: VisitStatus;
  teamLead: BasicUserDetails;
  teamLeadUserId: Scalars['Int']['output'];
};

export type VisitBasisConfig = {
  __typename?: 'VisitBasisConfig';
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type VisitRegistration = {
  __typename?: 'VisitRegistration';
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  isRegistrationSubmitted: Scalars['Boolean']['output'];
  questionary: Questionary;
  registrationQuestionaryId?: Maybe<Scalars['Int']['output']>;
  startsAt?: Maybe<Scalars['DateTime']['output']>;
  trainingExpiryDate?: Maybe<Scalars['DateTime']['output']>;
  trainingStatus: TrainingStatus;
  user?: Maybe<BasicUserDetails>;
  userId: Scalars['Int']['output'];
  visitId: Scalars['Int']['output'];
};

export enum VisitStatus {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type VisitsFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
};

export type _Entity = BasicUserDetails | Call | Instrument | Proposal | StatusActionsLog | Technique | User;

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

export type AssignInstrumentsToCallMutationVariables = Exact<{
  assignInstrumentsToCallInput: AssignInstrumentsToCallInput;
}>;


export type AssignInstrumentsToCallMutation = { __typename?: 'Mutation', assignInstrumentsToCall: { __typename?: 'Call', id: number, shortCode: string, title?: string | null, templateId: number, instruments: Array<{ __typename?: 'InstrumentWithAvailabilityTime', id: number, managerUserId: number, name: string, shortCode: string, description: string }> } };

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


export type CreateProposalMutation = { __typename?: 'Mutation', createProposal: { __typename?: 'Proposal', primaryKey: number, proposalId: string, callId: number, status?: { __typename?: 'ProposalStatus', id: number, name: string, shortCode: string } | null, questionary: { __typename?: 'Questionary', questionaryId: number, templateId: number, steps: Array<{ __typename?: 'QuestionaryStep', topic: { __typename?: 'Topic', id: number, templateId: number } }> } } };

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


export type DeleteProposalMutation = { __typename?: 'Mutation', deleteProposal: { __typename?: 'Proposal', primaryKey: number, proposalId: string, callId: number, status?: { __typename?: 'ProposalStatus', id: number, name: string, shortCode: string } | null, questionary: { __typename?: 'Questionary', questionaryId: number, templateId: number, steps: Array<{ __typename?: 'QuestionaryStep', topic: { __typename?: 'Topic', id: number, templateId: number } }> } } };

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

export type CallQueryVariables = Exact<{
  callId: Scalars['Int']['input'];
}>;


export type CallQuery = { __typename?: 'Query', call?: { __typename?: 'Call', id: number, title?: string | null, shortCode: string, templateId: number } | null };

export type GetCallsQueryVariables = Exact<{
  filter?: InputMaybe<CallsFilter>;
}>;


export type GetCallsQuery = { __typename?: 'Query', calls?: Array<{ __typename?: 'Call', id: number, title?: string | null, shortCode: string, templateId: number, endCall: any, endCallInternal?: any | null, allocationTimeUnit: AllocationTimeUnits, cycleComment: string, isActive: boolean, isActiveInternal: boolean, startCall: any, startCycle: any, pdfTemplateId?: number | null }> | null };

export type GenericTemplatesQueryVariables = Exact<{
  filter?: InputMaybe<GenericTemplatesFilter>;
}>;


export type GenericTemplatesQuery = { __typename?: 'Query', genericTemplates?: Array<{ __typename?: 'GenericTemplate', id: number, title: string }> | null };

export type GetCallQueryVariables = Exact<{
  callId: Scalars['Int']['input'];
}>;


export type GetCallQuery = { __typename?: 'Query', call?: { __typename?: 'Call', id: number, title?: string | null, shortCode: string } | null };

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

export type ProposalStatusQueryVariables = Exact<{
  proposalStatusId: Scalars['Int']['input'];
}>;


export type ProposalStatusQuery = { __typename?: 'Query', proposalStatus?: { __typename?: 'ProposalStatus', id: number, isDefault: boolean, name: string, shortCode: string } | null };

export type GetProposalsQueryVariables = Exact<{
  filter?: InputMaybe<ProposalsFilter>;
}>;


export type GetProposalsQuery = { __typename?: 'Query', proposals?: { __typename?: 'ProposalsQueryResult', proposals: Array<{ __typename?: 'Proposal', primaryKey: number, proposalId: string, title: string, submitted: boolean, proposerId: number, abstract: string, status?: { __typename?: 'ProposalStatus', name: string } | null, proposer?: { __typename?: 'BasicUserDetails', id: number } | null, users: Array<{ __typename?: 'BasicUserDetails', id: number }> }> } | null };

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

export type UpdateProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int']['input'];
  users?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  abstract?: InputMaybe<Scalars['String']['input']>;
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateProposalMutation = { __typename?: 'Mutation', updateProposal: { __typename?: 'Proposal', callId: number, statusId: number, primaryKey: number, proposalId: string, proposer?: { __typename?: 'BasicUserDetails', id: number } | null, users: Array<{ __typename?: 'BasicUserDetails', id: number }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
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
export const CallDocument = new TypedDocumentString(`
    query Call($callId: Int!) {
  call(callId: $callId) {
    id
    title
    shortCode
    templateId
  }
}
    `) as unknown as TypedDocumentString<CallQuery, CallQueryVariables>;
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
    pdfTemplateId
  }
}
    `) as unknown as TypedDocumentString<GetCallsQuery, GetCallsQueryVariables>;
export const GenericTemplatesDocument = new TypedDocumentString(`
    query GenericTemplates($filter: GenericTemplatesFilter) {
  genericTemplates(filter: $filter) {
    id
    title
  }
}
    `) as unknown as TypedDocumentString<GenericTemplatesQuery, GenericTemplatesQueryVariables>;
export const GetCallDocument = new TypedDocumentString(`
    query getCall($callId: Int!) {
  call(callId: $callId) {
    id
    title
    shortCode
  }
}
    `) as unknown as TypedDocumentString<GetCallQuery, GetCallQueryVariables>;
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
export const ProposalStatusDocument = new TypedDocumentString(`
    query ProposalStatus($proposalStatusId: Int!) {
  proposalStatus(proposalStatusId: $proposalStatusId) {
    id
    isDefault
    name
    shortCode
  }
}
    `) as unknown as TypedDocumentString<ProposalStatusQuery, ProposalStatusQueryVariables>;
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
export const UpdateProposalDocument = new TypedDocumentString(`
    mutation UpdateProposal($proposalPk: Int!, $users: [Int!], $title: String, $abstract: String, $proposerId: Int, $created: DateTime) {
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