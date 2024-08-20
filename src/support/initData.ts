import {
  randomString,
  randomAlphaNumericString,
} from '../utils/helperFunctions';
import { AllocationTimeUnits, InitData } from '../utils/sharedType';

export function getInitData(): InitData {
  const current = new Date();
  current.setHours(0, 0, 0, 0);
  const future = new Date();
  future.setDate(current.getDate() + 2);
  const data = {
    call: {
      title: 'Performance test' + ' ' + randomString(6),
      shortCode: 'Test' + ' ' + randomString(6),
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
    proposal: {
      id: 1,
      title: 'Proposal for performance test',
      questionaryId: 1,
      shortCode: '999999',
    },
    template: {
      name: 'Performance test',
      description: 'Performance test template',
      groupId: 'PROPOSAL',
    },
    workflows: {
      defaultWorkflow: {
        id: 1,
      },
      defaultDroppableGroup: 'proposalWorkflowConnections_0',
    },
    instrument: {
      name: 'Performance test' + ' ' + randomString(5),
      shortCode: randomAlphaNumericString(15),
      description: randomString(8),
    },
  };

  return {
    ...data,
  };
}
