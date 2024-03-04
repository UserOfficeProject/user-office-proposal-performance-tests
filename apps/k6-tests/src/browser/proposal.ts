/* eslint-disable @typescript-eslint/no-explicit-any */
import { check, fail, group } from 'k6';
import { browser } from 'k6/experimental/browser';
import { Trend } from 'k6/metrics';

import { Call } from './support/call';
import { Dashboard } from './support/dashboard';
import { logFailedTest } from './support/logger';
import { Proposal } from './support/proposal';
import { User } from './support/user';
import { randomString } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';

const proposalSubmissionDuration = new Trend('proposal_submission_duration');
export async function proposalTest(sharedData: SharedData) {
  const startTime = Date.now();
  const sessionId =
    sharedData.users[Math.floor(Math.random() * (sharedData.users.length / 2))]
      .sessionId;
  const context = browser.newContext();
  context.setDefaultTimeout(60000);
  const page = context.newPage();
  group('User should be able to create and submit proposal', async () => {
    try {
      const user = new User(sharedData.browserBaseUrl, sessionId);
      const proposalTitle = randomString(10);
      await page.goto(user.getLoginURL());
      await Promise.all([page.waitForNavigation()]);
      if (
        !check(page, {
          'User is logged in': () =>
            page.waitForSelector(user.getLoggedInMessage()).isVisible(),
        })
      ) {
        logFailedTest(page, proposalTitle, fail('User could not login'));
      }
      const dashboard = new Dashboard();
      const call = new Call();

      await Promise.all([
        await page.goto(sharedData.browserBaseUrl),
        page.locator(dashboard.proposalMenuItem()).click(),
      ]);

      if (
        !check(page, {
          'User can see test call': () =>
            page
              .waitForSelector(call.getTestCall(sharedData.testCall.title))
              .isVisible(),
        })
      ) {
        logFailedTest(page, proposalTitle, fail('User cannot see test call'));
      }
      await Promise.all([
        page.waitForNavigation({
          waitUntil: 'networkidle',
          timeout: 10000,
        }),
        page.locator(call.getTestCall(sharedData.testCall.title)).click(),
      ]);

      const proposal = new Proposal(page);
      proposal.createProposal(proposalTitle);

      if (
        !check(page, {
          'User was able to submit proposal': () =>
            page.waitForSelector(proposal.submissionMessage()).isVisible(),
        })
      ) {
        logFailedTest(
          page,
          proposalTitle,
          fail('User could not submit proposal')
        );
      }
      proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
    } finally {
      page.close();
    }
  });
}
