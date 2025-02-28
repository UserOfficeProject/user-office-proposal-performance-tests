/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation AnswerTopic($questionaryId: Int!, $topicId: Int!, $answers: [AnswerInput!]!, $isPartialSave: Boolean) {\n  answerTopic(\n    questionaryId: $questionaryId\n    topicId: $topicId\n    answers: $answers\n    isPartialSave: $isPartialSave\n  ) {\n    questionId\n    answer\n    answerId\n  }\n}": typeof types.AnswerTopicDocument,
    "mutation AssignFapReviewersToProposals($assignments: [FapReviewAssignmentInput!]!, $fapId: Int!) {\n  assignFapReviewersToProposals(assignments: $assignments, fapId: $fapId) {\n    id\n  }\n}": typeof types.AssignFapReviewersToProposalsDocument,
    "mutation AssignInstrumentsToCall($assignInstrumentsToCallInput: AssignInstrumentsToCallInput!) {\n  assignInstrumentsToCall(\n    assignInstrumentsToCallInput: $assignInstrumentsToCallInput\n  ) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      managerUserId\n      name\n      shortCode\n      description\n    }\n  }\n}": typeof types.AssignInstrumentsToCallDocument,
    "mutation AssignProposalsToFaps($proposalPks: [Int!]!, $fapInstruments: [FapInstrumentInput!]!) {\n  assignProposalsToFaps(\n    proposalPks: $proposalPks\n    fapInstruments: $fapInstruments\n  )\n}": typeof types.AssignProposalsToFapsDocument,
    "mutation AssignProposalsToInstruments($proposalPks: [Int!]!, $instrumentIds: [Int!]!) {\n  assignProposalsToInstruments(\n    proposalPks: $proposalPks\n    instrumentIds: $instrumentIds\n  )\n}": typeof types.AssignProposalsToInstrumentsDocument,
    "mutation AssignReviewersToFap($memberIds: [Int!]!, $fapId: Int!) {\n  assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {\n    id\n  }\n}": typeof types.AssignReviewersToFapDocument,
    "mutation ChangeProposalsStatus($changeProposalsStatusInput: ChangeProposalsStatusInput!) {\n  changeProposalsStatus(changeProposalsStatusInput: $changeProposalsStatusInput)\n}": typeof types.ChangeProposalsStatusDocument,
    "mutation CreateCall($createCallInput: CreateCallInput!) {\n  createCall(createCallInput: $createCallInput) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      description\n      managerUserId\n      name\n      shortCode\n    }\n  }\n}": typeof types.CreateCallDocument,
    "mutation CreateInstrument($name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {\n  createInstrument(\n    name: $name\n    shortCode: $shortCode\n    description: $description\n    managerUserId: $managerUserId\n  ) {\n    id\n    description\n    managerUserId\n    name\n    shortCode\n  }\n}": typeof types.CreateInstrumentDocument,
    "mutation CreateProposal($callId: Int!) {\n  createProposal(callId: $callId) {\n    primaryKey\n    proposalId\n    callId\n    status {\n      id\n      name\n      shortCode\n    }\n    questionary {\n      steps {\n        topic {\n          id\n          templateId\n        }\n      }\n      questionaryId\n      templateId\n    }\n  }\n}": typeof types.CreateProposalDocument,
    "mutation CreateTemplate($groupId: TemplateGroupId!, $name: String!, $description: String) {\n  createTemplate(groupId: $groupId, name: $name, description: $description) {\n    templateId\n    name\n    description\n  }\n}": typeof types.CreateTemplateDocument,
    "mutation DeleteCall($deleteCallId: Int!) {\n  deleteCall(id: $deleteCallId) {\n    id\n    shortCode\n    title\n    templateId\n  }\n}": typeof types.DeleteCallDocument,
    "mutation DeleteInstrument($deleteInstrumentId: Int!) {\n  deleteInstrument(id: $deleteInstrumentId) {\n    id\n    description\n  }\n}": typeof types.DeleteInstrumentDocument,
    "mutation DeleteProposal($proposalPk: Int!) {\n  deleteProposal(proposalPk: $proposalPk) {\n    primaryKey\n    proposalId\n    callId\n    status {\n      id\n      name\n      shortCode\n    }\n    questionary {\n      steps {\n        topic {\n          id\n          templateId\n        }\n      }\n      questionaryId\n      templateId\n    }\n  }\n}": typeof types.DeleteProposalDocument,
    "mutation DeleteTemplate($templateId: Int!) {\n  deleteTemplate(templateId: $templateId) {\n    templateId\n    name\n    groupId\n  }\n}": typeof types.DeleteTemplateDocument,
    "mutation ExternalTokenLogin($redirectUri: String!, $externalToken: String!) {\n  externalTokenLogin(redirectUri: $redirectUri, externalToken: $externalToken)\n}": typeof types.ExternalTokenLoginDocument,
    "query BasicUserDetailsByEmail($email: String!) {\n  basicUserDetailsByEmail(email: $email) {\n    id\n  }\n}": typeof types.BasicUserDetailsByEmailDocument,
    "query BlankQuestionary($templateId: Int!) {\n  blankQuestionary(templateId: $templateId) {\n    isCompleted\n    questionaryId\n    steps {\n      fields {\n        topicId\n      }\n    }\n  }\n}": typeof types.BlankQuestionaryDocument,
    "query getBlankQuestionaryStepsByCallId($callId: Int!) {\n  blankQuestionaryStepsByCallId(callId: $callId) {\n    fields {\n      answerId\n      topicId\n    }\n    isCompleted\n  }\n}": typeof types.GetBlankQuestionaryStepsByCallIdDocument,
    "query getCall($callId: Int!) {\n  call(callId: $callId) {\n    id\n    title\n    shortCode\n    templateId\n    faps {\n      id\n    }\n  }\n}": typeof types.GetCallDocument,
    "query getCalls($filter: CallsFilter) {\n  calls(filter: $filter) {\n    id\n    title\n    shortCode\n    templateId\n    endCall\n    endCallInternal\n    allocationTimeUnit\n    cycleComment\n    isActive\n    isActiveInternal\n    shortCode\n    startCall\n    startCycle\n    pdfTemplateId\n  }\n}": typeof types.GetCallsDocument,
    "query getFapMembers($fapId: Int!) {\n  fapMembers(fapId: $fapId) {\n    fapId\n    userId\n  }\n}": typeof types.GetFapMembersDocument,
    "query GenericTemplates($filter: GenericTemplatesFilter) {\n  genericTemplates(filter: $filter) {\n    id\n    title\n  }\n}": typeof types.GenericTemplatesDocument,
    "query Me {\n  me {\n    id\n    created\n    roles {\n      id\n      shortCode\n      title\n    }\n  }\n}": typeof types.MeDocument,
    "query PageContent($pageId: PageName!) {\n  pageContent(pageId: $pageId)\n}": typeof types.PageContentDocument,
    "query Proposal($primaryKey: Int!) {\n  proposal(primaryKey: $primaryKey) {\n    title\n    created\n    primaryKey\n    proposalId\n    proposerId\n  }\n}": typeof types.ProposalDocument,
    "query ProposalById($proposalId: String!) {\n  proposalById(proposalId: $proposalId) {\n    proposalId\n    primaryKey\n    callId\n  }\n}": typeof types.ProposalByIdDocument,
    "query ProposalStatus($proposalStatusId: Int!) {\n  proposalStatus(proposalStatusId: $proposalStatusId) {\n    id\n    isDefault\n    name\n    shortCode\n  }\n}": typeof types.ProposalStatusDocument,
    "query getProposals($filter: ProposalsFilter) {\n  proposals(filter: $filter) {\n    proposals {\n      primaryKey\n      proposalId\n      title\n      submitted\n      proposerId\n      abstract\n      status {\n        name\n      }\n      proposer {\n        id\n      }\n      users {\n        id\n      }\n    }\n  }\n}": typeof types.GetProposalsDocument,
    "query Questionary($questionaryId: Int!) {\n  questionary(questionaryId: $questionaryId) {\n    questionaryId\n    templateId\n    steps {\n      topic {\n        templateId\n        title\n        id\n      }\n    }\n  }\n}": typeof types.QuestionaryDocument,
    "query Settings {\n  settings {\n    description\n    id\n  }\n}": typeof types.SettingsDocument,
    "query Instrument($instrumentId: Int!) {\n  instrument(instrumentId: $instrumentId) {\n    id\n    name\n    managerUserId\n    shortCode\n  }\n}": typeof types.InstrumentDocument,
    "mutation RemoveAssignedInstrumentFromCall($removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput!) {\n  removeAssignedInstrumentFromCall(\n    removeAssignedInstrumentFromCallInput: $removeAssignedInstrumentFromCallInput\n  ) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      managerUserId\n      name\n      shortCode\n    }\n  }\n}": typeof types.RemoveAssignedInstrumentFromCallDocument,
    "mutation RemoveMemberFromFap($memberId: Int!, $fapId: Int!, $roleId: UserRole!) {\n  removeMemberFromFap(memberId: $memberId, fapId: $fapId, roleId: $roleId) {\n    id\n  }\n}": typeof types.RemoveMemberFromFapDocument,
    "mutation RemoveMemberFromFapProposal($memberId: Int!, $fapId: Int!, $proposalPk: Int!) {\n  removeMemberFromFapProposal(\n    memberId: $memberId\n    fapId: $fapId\n    proposalPk: $proposalPk\n  ) {\n    id\n  }\n}": typeof types.RemoveMemberFromFapProposalDocument,
    "mutation RemoveProposalsFromInstrument($proposalPks: [Int!]!) {\n  removeProposalsFromInstrument(proposalPks: $proposalPks)\n}": typeof types.RemoveProposalsFromInstrumentDocument,
    "mutation UpdateProposal($proposalPk: Int!, $users: [Int!], $title: String, $abstract: String, $proposerId: Int, $created: DateTime) {\n  updateProposal(\n    proposalPk: $proposalPk\n    users: $users\n    title: $title\n    abstract: $abstract\n    proposerId: $proposerId\n    created: $created\n  ) {\n    callId\n    statusId\n    primaryKey\n    proposalId\n    proposer {\n      id\n    }\n    users {\n      id\n    }\n  }\n}": typeof types.UpdateProposalDocument,
};
const documents: Documents = {
    "mutation AnswerTopic($questionaryId: Int!, $topicId: Int!, $answers: [AnswerInput!]!, $isPartialSave: Boolean) {\n  answerTopic(\n    questionaryId: $questionaryId\n    topicId: $topicId\n    answers: $answers\n    isPartialSave: $isPartialSave\n  ) {\n    questionId\n    answer\n    answerId\n  }\n}": types.AnswerTopicDocument,
    "mutation AssignFapReviewersToProposals($assignments: [FapReviewAssignmentInput!]!, $fapId: Int!) {\n  assignFapReviewersToProposals(assignments: $assignments, fapId: $fapId) {\n    id\n  }\n}": types.AssignFapReviewersToProposalsDocument,
    "mutation AssignInstrumentsToCall($assignInstrumentsToCallInput: AssignInstrumentsToCallInput!) {\n  assignInstrumentsToCall(\n    assignInstrumentsToCallInput: $assignInstrumentsToCallInput\n  ) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      managerUserId\n      name\n      shortCode\n      description\n    }\n  }\n}": types.AssignInstrumentsToCallDocument,
    "mutation AssignProposalsToFaps($proposalPks: [Int!]!, $fapInstruments: [FapInstrumentInput!]!) {\n  assignProposalsToFaps(\n    proposalPks: $proposalPks\n    fapInstruments: $fapInstruments\n  )\n}": types.AssignProposalsToFapsDocument,
    "mutation AssignProposalsToInstruments($proposalPks: [Int!]!, $instrumentIds: [Int!]!) {\n  assignProposalsToInstruments(\n    proposalPks: $proposalPks\n    instrumentIds: $instrumentIds\n  )\n}": types.AssignProposalsToInstrumentsDocument,
    "mutation AssignReviewersToFap($memberIds: [Int!]!, $fapId: Int!) {\n  assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {\n    id\n  }\n}": types.AssignReviewersToFapDocument,
    "mutation ChangeProposalsStatus($changeProposalsStatusInput: ChangeProposalsStatusInput!) {\n  changeProposalsStatus(changeProposalsStatusInput: $changeProposalsStatusInput)\n}": types.ChangeProposalsStatusDocument,
    "mutation CreateCall($createCallInput: CreateCallInput!) {\n  createCall(createCallInput: $createCallInput) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      description\n      managerUserId\n      name\n      shortCode\n    }\n  }\n}": types.CreateCallDocument,
    "mutation CreateInstrument($name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {\n  createInstrument(\n    name: $name\n    shortCode: $shortCode\n    description: $description\n    managerUserId: $managerUserId\n  ) {\n    id\n    description\n    managerUserId\n    name\n    shortCode\n  }\n}": types.CreateInstrumentDocument,
    "mutation CreateProposal($callId: Int!) {\n  createProposal(callId: $callId) {\n    primaryKey\n    proposalId\n    callId\n    status {\n      id\n      name\n      shortCode\n    }\n    questionary {\n      steps {\n        topic {\n          id\n          templateId\n        }\n      }\n      questionaryId\n      templateId\n    }\n  }\n}": types.CreateProposalDocument,
    "mutation CreateTemplate($groupId: TemplateGroupId!, $name: String!, $description: String) {\n  createTemplate(groupId: $groupId, name: $name, description: $description) {\n    templateId\n    name\n    description\n  }\n}": types.CreateTemplateDocument,
    "mutation DeleteCall($deleteCallId: Int!) {\n  deleteCall(id: $deleteCallId) {\n    id\n    shortCode\n    title\n    templateId\n  }\n}": types.DeleteCallDocument,
    "mutation DeleteInstrument($deleteInstrumentId: Int!) {\n  deleteInstrument(id: $deleteInstrumentId) {\n    id\n    description\n  }\n}": types.DeleteInstrumentDocument,
    "mutation DeleteProposal($proposalPk: Int!) {\n  deleteProposal(proposalPk: $proposalPk) {\n    primaryKey\n    proposalId\n    callId\n    status {\n      id\n      name\n      shortCode\n    }\n    questionary {\n      steps {\n        topic {\n          id\n          templateId\n        }\n      }\n      questionaryId\n      templateId\n    }\n  }\n}": types.DeleteProposalDocument,
    "mutation DeleteTemplate($templateId: Int!) {\n  deleteTemplate(templateId: $templateId) {\n    templateId\n    name\n    groupId\n  }\n}": types.DeleteTemplateDocument,
    "mutation ExternalTokenLogin($redirectUri: String!, $externalToken: String!) {\n  externalTokenLogin(redirectUri: $redirectUri, externalToken: $externalToken)\n}": types.ExternalTokenLoginDocument,
    "query BasicUserDetailsByEmail($email: String!) {\n  basicUserDetailsByEmail(email: $email) {\n    id\n  }\n}": types.BasicUserDetailsByEmailDocument,
    "query BlankQuestionary($templateId: Int!) {\n  blankQuestionary(templateId: $templateId) {\n    isCompleted\n    questionaryId\n    steps {\n      fields {\n        topicId\n      }\n    }\n  }\n}": types.BlankQuestionaryDocument,
    "query getBlankQuestionaryStepsByCallId($callId: Int!) {\n  blankQuestionaryStepsByCallId(callId: $callId) {\n    fields {\n      answerId\n      topicId\n    }\n    isCompleted\n  }\n}": types.GetBlankQuestionaryStepsByCallIdDocument,
    "query getCall($callId: Int!) {\n  call(callId: $callId) {\n    id\n    title\n    shortCode\n    templateId\n    faps {\n      id\n    }\n  }\n}": types.GetCallDocument,
    "query getCalls($filter: CallsFilter) {\n  calls(filter: $filter) {\n    id\n    title\n    shortCode\n    templateId\n    endCall\n    endCallInternal\n    allocationTimeUnit\n    cycleComment\n    isActive\n    isActiveInternal\n    shortCode\n    startCall\n    startCycle\n    pdfTemplateId\n  }\n}": types.GetCallsDocument,
    "query getFapMembers($fapId: Int!) {\n  fapMembers(fapId: $fapId) {\n    fapId\n    userId\n  }\n}": types.GetFapMembersDocument,
    "query GenericTemplates($filter: GenericTemplatesFilter) {\n  genericTemplates(filter: $filter) {\n    id\n    title\n  }\n}": types.GenericTemplatesDocument,
    "query Me {\n  me {\n    id\n    created\n    roles {\n      id\n      shortCode\n      title\n    }\n  }\n}": types.MeDocument,
    "query PageContent($pageId: PageName!) {\n  pageContent(pageId: $pageId)\n}": types.PageContentDocument,
    "query Proposal($primaryKey: Int!) {\n  proposal(primaryKey: $primaryKey) {\n    title\n    created\n    primaryKey\n    proposalId\n    proposerId\n  }\n}": types.ProposalDocument,
    "query ProposalById($proposalId: String!) {\n  proposalById(proposalId: $proposalId) {\n    proposalId\n    primaryKey\n    callId\n  }\n}": types.ProposalByIdDocument,
    "query ProposalStatus($proposalStatusId: Int!) {\n  proposalStatus(proposalStatusId: $proposalStatusId) {\n    id\n    isDefault\n    name\n    shortCode\n  }\n}": types.ProposalStatusDocument,
    "query getProposals($filter: ProposalsFilter) {\n  proposals(filter: $filter) {\n    proposals {\n      primaryKey\n      proposalId\n      title\n      submitted\n      proposerId\n      abstract\n      status {\n        name\n      }\n      proposer {\n        id\n      }\n      users {\n        id\n      }\n    }\n  }\n}": types.GetProposalsDocument,
    "query Questionary($questionaryId: Int!) {\n  questionary(questionaryId: $questionaryId) {\n    questionaryId\n    templateId\n    steps {\n      topic {\n        templateId\n        title\n        id\n      }\n    }\n  }\n}": types.QuestionaryDocument,
    "query Settings {\n  settings {\n    description\n    id\n  }\n}": types.SettingsDocument,
    "query Instrument($instrumentId: Int!) {\n  instrument(instrumentId: $instrumentId) {\n    id\n    name\n    managerUserId\n    shortCode\n  }\n}": types.InstrumentDocument,
    "mutation RemoveAssignedInstrumentFromCall($removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput!) {\n  removeAssignedInstrumentFromCall(\n    removeAssignedInstrumentFromCallInput: $removeAssignedInstrumentFromCallInput\n  ) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      managerUserId\n      name\n      shortCode\n    }\n  }\n}": types.RemoveAssignedInstrumentFromCallDocument,
    "mutation RemoveMemberFromFap($memberId: Int!, $fapId: Int!, $roleId: UserRole!) {\n  removeMemberFromFap(memberId: $memberId, fapId: $fapId, roleId: $roleId) {\n    id\n  }\n}": types.RemoveMemberFromFapDocument,
    "mutation RemoveMemberFromFapProposal($memberId: Int!, $fapId: Int!, $proposalPk: Int!) {\n  removeMemberFromFapProposal(\n    memberId: $memberId\n    fapId: $fapId\n    proposalPk: $proposalPk\n  ) {\n    id\n  }\n}": types.RemoveMemberFromFapProposalDocument,
    "mutation RemoveProposalsFromInstrument($proposalPks: [Int!]!) {\n  removeProposalsFromInstrument(proposalPks: $proposalPks)\n}": types.RemoveProposalsFromInstrumentDocument,
    "mutation UpdateProposal($proposalPk: Int!, $users: [Int!], $title: String, $abstract: String, $proposerId: Int, $created: DateTime) {\n  updateProposal(\n    proposalPk: $proposalPk\n    users: $users\n    title: $title\n    abstract: $abstract\n    proposerId: $proposerId\n    created: $created\n  ) {\n    callId\n    statusId\n    primaryKey\n    proposalId\n    proposer {\n      id\n    }\n    users {\n      id\n    }\n  }\n}": types.UpdateProposalDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AnswerTopic($questionaryId: Int!, $topicId: Int!, $answers: [AnswerInput!]!, $isPartialSave: Boolean) {\n  answerTopic(\n    questionaryId: $questionaryId\n    topicId: $topicId\n    answers: $answers\n    isPartialSave: $isPartialSave\n  ) {\n    questionId\n    answer\n    answerId\n  }\n}"): typeof import('./graphql').AnswerTopicDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignFapReviewersToProposals($assignments: [FapReviewAssignmentInput!]!, $fapId: Int!) {\n  assignFapReviewersToProposals(assignments: $assignments, fapId: $fapId) {\n    id\n  }\n}"): typeof import('./graphql').AssignFapReviewersToProposalsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignInstrumentsToCall($assignInstrumentsToCallInput: AssignInstrumentsToCallInput!) {\n  assignInstrumentsToCall(\n    assignInstrumentsToCallInput: $assignInstrumentsToCallInput\n  ) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      managerUserId\n      name\n      shortCode\n      description\n    }\n  }\n}"): typeof import('./graphql').AssignInstrumentsToCallDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignProposalsToFaps($proposalPks: [Int!]!, $fapInstruments: [FapInstrumentInput!]!) {\n  assignProposalsToFaps(\n    proposalPks: $proposalPks\n    fapInstruments: $fapInstruments\n  )\n}"): typeof import('./graphql').AssignProposalsToFapsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignProposalsToInstruments($proposalPks: [Int!]!, $instrumentIds: [Int!]!) {\n  assignProposalsToInstruments(\n    proposalPks: $proposalPks\n    instrumentIds: $instrumentIds\n  )\n}"): typeof import('./graphql').AssignProposalsToInstrumentsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignReviewersToFap($memberIds: [Int!]!, $fapId: Int!) {\n  assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {\n    id\n  }\n}"): typeof import('./graphql').AssignReviewersToFapDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeProposalsStatus($changeProposalsStatusInput: ChangeProposalsStatusInput!) {\n  changeProposalsStatus(changeProposalsStatusInput: $changeProposalsStatusInput)\n}"): typeof import('./graphql').ChangeProposalsStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCall($createCallInput: CreateCallInput!) {\n  createCall(createCallInput: $createCallInput) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      description\n      managerUserId\n      name\n      shortCode\n    }\n  }\n}"): typeof import('./graphql').CreateCallDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateInstrument($name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {\n  createInstrument(\n    name: $name\n    shortCode: $shortCode\n    description: $description\n    managerUserId: $managerUserId\n  ) {\n    id\n    description\n    managerUserId\n    name\n    shortCode\n  }\n}"): typeof import('./graphql').CreateInstrumentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProposal($callId: Int!) {\n  createProposal(callId: $callId) {\n    primaryKey\n    proposalId\n    callId\n    status {\n      id\n      name\n      shortCode\n    }\n    questionary {\n      steps {\n        topic {\n          id\n          templateId\n        }\n      }\n      questionaryId\n      templateId\n    }\n  }\n}"): typeof import('./graphql').CreateProposalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTemplate($groupId: TemplateGroupId!, $name: String!, $description: String) {\n  createTemplate(groupId: $groupId, name: $name, description: $description) {\n    templateId\n    name\n    description\n  }\n}"): typeof import('./graphql').CreateTemplateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteCall($deleteCallId: Int!) {\n  deleteCall(id: $deleteCallId) {\n    id\n    shortCode\n    title\n    templateId\n  }\n}"): typeof import('./graphql').DeleteCallDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteInstrument($deleteInstrumentId: Int!) {\n  deleteInstrument(id: $deleteInstrumentId) {\n    id\n    description\n  }\n}"): typeof import('./graphql').DeleteInstrumentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteProposal($proposalPk: Int!) {\n  deleteProposal(proposalPk: $proposalPk) {\n    primaryKey\n    proposalId\n    callId\n    status {\n      id\n      name\n      shortCode\n    }\n    questionary {\n      steps {\n        topic {\n          id\n          templateId\n        }\n      }\n      questionaryId\n      templateId\n    }\n  }\n}"): typeof import('./graphql').DeleteProposalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTemplate($templateId: Int!) {\n  deleteTemplate(templateId: $templateId) {\n    templateId\n    name\n    groupId\n  }\n}"): typeof import('./graphql').DeleteTemplateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ExternalTokenLogin($redirectUri: String!, $externalToken: String!) {\n  externalTokenLogin(redirectUri: $redirectUri, externalToken: $externalToken)\n}"): typeof import('./graphql').ExternalTokenLoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BasicUserDetailsByEmail($email: String!) {\n  basicUserDetailsByEmail(email: $email) {\n    id\n  }\n}"): typeof import('./graphql').BasicUserDetailsByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlankQuestionary($templateId: Int!) {\n  blankQuestionary(templateId: $templateId) {\n    isCompleted\n    questionaryId\n    steps {\n      fields {\n        topicId\n      }\n    }\n  }\n}"): typeof import('./graphql').BlankQuestionaryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBlankQuestionaryStepsByCallId($callId: Int!) {\n  blankQuestionaryStepsByCallId(callId: $callId) {\n    fields {\n      answerId\n      topicId\n    }\n    isCompleted\n  }\n}"): typeof import('./graphql').GetBlankQuestionaryStepsByCallIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getCall($callId: Int!) {\n  call(callId: $callId) {\n    id\n    title\n    shortCode\n    templateId\n    faps {\n      id\n    }\n  }\n}"): typeof import('./graphql').GetCallDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getCalls($filter: CallsFilter) {\n  calls(filter: $filter) {\n    id\n    title\n    shortCode\n    templateId\n    endCall\n    endCallInternal\n    allocationTimeUnit\n    cycleComment\n    isActive\n    isActiveInternal\n    shortCode\n    startCall\n    startCycle\n    pdfTemplateId\n  }\n}"): typeof import('./graphql').GetCallsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getFapMembers($fapId: Int!) {\n  fapMembers(fapId: $fapId) {\n    fapId\n    userId\n  }\n}"): typeof import('./graphql').GetFapMembersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GenericTemplates($filter: GenericTemplatesFilter) {\n  genericTemplates(filter: $filter) {\n    id\n    title\n  }\n}"): typeof import('./graphql').GenericTemplatesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    created\n    roles {\n      id\n      shortCode\n      title\n    }\n  }\n}"): typeof import('./graphql').MeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageContent($pageId: PageName!) {\n  pageContent(pageId: $pageId)\n}"): typeof import('./graphql').PageContentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Proposal($primaryKey: Int!) {\n  proposal(primaryKey: $primaryKey) {\n    title\n    created\n    primaryKey\n    proposalId\n    proposerId\n  }\n}"): typeof import('./graphql').ProposalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProposalById($proposalId: String!) {\n  proposalById(proposalId: $proposalId) {\n    proposalId\n    primaryKey\n    callId\n  }\n}"): typeof import('./graphql').ProposalByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProposalStatus($proposalStatusId: Int!) {\n  proposalStatus(proposalStatusId: $proposalStatusId) {\n    id\n    isDefault\n    name\n    shortCode\n  }\n}"): typeof import('./graphql').ProposalStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getProposals($filter: ProposalsFilter) {\n  proposals(filter: $filter) {\n    proposals {\n      primaryKey\n      proposalId\n      title\n      submitted\n      proposerId\n      abstract\n      status {\n        name\n      }\n      proposer {\n        id\n      }\n      users {\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProposalsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Questionary($questionaryId: Int!) {\n  questionary(questionaryId: $questionaryId) {\n    questionaryId\n    templateId\n    steps {\n      topic {\n        templateId\n        title\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').QuestionaryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Settings {\n  settings {\n    description\n    id\n  }\n}"): typeof import('./graphql').SettingsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Instrument($instrumentId: Int!) {\n  instrument(instrumentId: $instrumentId) {\n    id\n    name\n    managerUserId\n    shortCode\n  }\n}"): typeof import('./graphql').InstrumentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveAssignedInstrumentFromCall($removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput!) {\n  removeAssignedInstrumentFromCall(\n    removeAssignedInstrumentFromCallInput: $removeAssignedInstrumentFromCallInput\n  ) {\n    id\n    shortCode\n    title\n    templateId\n    instruments {\n      id\n      managerUserId\n      name\n      shortCode\n    }\n  }\n}"): typeof import('./graphql').RemoveAssignedInstrumentFromCallDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveMemberFromFap($memberId: Int!, $fapId: Int!, $roleId: UserRole!) {\n  removeMemberFromFap(memberId: $memberId, fapId: $fapId, roleId: $roleId) {\n    id\n  }\n}"): typeof import('./graphql').RemoveMemberFromFapDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveMemberFromFapProposal($memberId: Int!, $fapId: Int!, $proposalPk: Int!) {\n  removeMemberFromFapProposal(\n    memberId: $memberId\n    fapId: $fapId\n    proposalPk: $proposalPk\n  ) {\n    id\n  }\n}"): typeof import('./graphql').RemoveMemberFromFapProposalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveProposalsFromInstrument($proposalPks: [Int!]!) {\n  removeProposalsFromInstrument(proposalPks: $proposalPks)\n}"): typeof import('./graphql').RemoveProposalsFromInstrumentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateProposal($proposalPk: Int!, $users: [Int!], $title: String, $abstract: String, $proposerId: Int, $created: DateTime) {\n  updateProposal(\n    proposalPk: $proposalPk\n    users: $users\n    title: $title\n    abstract: $abstract\n    proposerId: $proposerId\n    created: $created\n  ) {\n    callId\n    statusId\n    primaryKey\n    proposalId\n    proposer {\n      id\n    }\n    users {\n      id\n    }\n  }\n}"): typeof import('./graphql').UpdateProposalDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
