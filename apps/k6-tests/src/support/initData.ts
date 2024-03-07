export enum AllocationTimeUnits {
  DAY = 'Day',
  HOUR = 'Hour',
}

export const initData = {
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
