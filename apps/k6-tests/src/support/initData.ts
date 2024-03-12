import { randomString } from '../utils/helperFunctions';
import { AllocationTimeUnits, InitData } from '../utils/sharedType';

export function getInitData(environment: string): InitData {
  const current = new Date();
  current.setHours(0, 0, 0, 0);
  const future = new Date();
  future.setDate(current.getDate() + 2);
  const defaultValues = {
    call: {
      id: 1,
      title: 'Performance test',
      shortCode: 'Test',
      allocationTimeUnit: AllocationTimeUnits.DAY,
    },
    proposal: {
      id: 1,
      title: 'Proposal for performance test',
      questionaryId: 1,
      shortCode: '999999',
    },
    template: {
      id: 1,
      name: 'default template',
      topic: {
        id: 5,
        title: 'Topic title',
      },
    },
    workflows: {
      defaultWorkflow: {
        id: 1,
      },
      defaultDroppableGroup: 'proposalWorkflowConnections_0',
    },
  };

  if (environment.toLowerCase() === 'develop') {
    return {
      ...defaultValues,
      call: {
        title: defaultValues.call.title + ' ' + randomString(6),
        shortCode: defaultValues.call.shortCode + ' ' + randomString(6),
        startCall: current,
        endCall: future,
        startReview: future,
        endReview: future,
        startFapReview: future,
        endFapReview: future,
        startNotify: future,
        endNotify: future,
        startCycle: future,
        endCycle: future,
        templateId: 119,
        allocationTimeUnit: AllocationTimeUnits.DAY,
        cycleComment: `${randomString(20)}`,
        surveyComment: `${randomString(10)}`,
        proposalWorkflowId: 1,
      },
    };
  }

  return {
    ...defaultValues,
    call: {
      title: defaultValues.call.title + ' ' + randomString(6),
      shortCode: defaultValues.call.shortCode + ' ' + randomString(6),
      startCall: current,
      endCall: future,
      startReview: future,
      endReview: future,
      startFapReview: future,
      endFapReview: future,
      startNotify: future,
      endNotify: future,
      startCycle: future,
      endCycle: future,
      templateId: 1,
      allocationTimeUnit: AllocationTimeUnits.DAY,
      cycleComment: `${randomString(20)}`,
      surveyComment: `${randomString(10)}`,
      proposalWorkflowId: 1,
    },
  };
}
