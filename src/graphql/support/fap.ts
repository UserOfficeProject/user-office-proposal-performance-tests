import { check, fail } from 'k6';

import { AsyncClientApi, Fap, FapQueryResponse } from '../../utils/sharedType';

export class FAP {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async assignReviewersToFap(memberIds: number[], fapId: number): Promise<Fap> {
    const mutation = `
        mutation AssignReviewersToFap($memberIds: [Int!]!, $fapId: Int!) {
          assignReviewersToFap(memberIds: $memberIds, fapId: $fapId) {
            id
            code
            proposalCurrentCount
        }
    }`;
    const variables = {
      memberIds: memberIds,
      fapId: fapId,
    };

    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as FapQueryResponse;
    console.log(`what is the graphql response???  ${responseData.data}`);
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
