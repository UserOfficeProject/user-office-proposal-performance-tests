import { check, fail } from 'k6';

import { ClientApi, Fap, FapQueryResponse } from '../../utils/sharedType';

export class FAP {
  constructor(private apiClient: ClientApi) {}

  assignReviewersToFap(memberIds: number[], fapId: number): Fap {
    const mutation = `
        mutation assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {
          id
          code
          proposalCount
          proposalCurrentCount
        }
      }`;
    const variables = {
      input: { memberIds, fapId },
    };

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as FapQueryResponse;
    const checkValue = check(response, {
      'Reviewers assigned to fap': (r) => r.status === 200,
    }).valueOf();

    if (!checkValue) {
      fail(
        'Performance test could not be created aborting test, Executing FAP.AssignReviewersToFap'
      );
    }

    return responseData?.data?.assignReviewersToFap as Fap;
  }
}
