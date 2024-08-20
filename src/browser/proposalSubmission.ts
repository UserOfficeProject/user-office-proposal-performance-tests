import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { browser } from 'k6/experimental/browser';
import { Counter, Trend } from 'k6/metrics';

import { Call } from './support/call';
import { Dashboard } from './support/dashboard';
import { logFailedTest } from './support/logger';
import { Proposal } from './support/proposal';
import { User } from './support/user';
import { randomIntBetween, randomString } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';
const proposalSubmissionDuration = new Trend(
  'proposal_submission_duration',
  true
);

const proposalsSubmitted = new Counter('proposals_submitted', false);
export default async function proposalSubmissionTest(sharedData: SharedData) {
  const startTime = Date.now();
  const currentUser = sharedData.users[exec.vu.iterationInScenario];
  const context = browser.newContext();
  context.setDefaultTimeout(240000);
  const page = context.newPage();
  const proposalTitle = randomString(10);
  try {
    const user = new User(sharedData.browserBaseUrl, currentUser.sessionId);

    await page.goto(user.getLoginURL());
    await Promise.all([page.waitForNavigation()]);
    check(page, {
      'User is logged in': () =>
        page.waitForSelector(user.getLoggedInMessage()).isVisible(),
    });

    const dashboard = new Dashboard();
    const call = new Call();

    await page.goto(sharedData.browserBaseUrl);
    sleep(randomIntBetween(60, 300));
    await Promise.all([
      page.waitForNavigation({
        waitUntil: 'networkidle',
      }),
      page.waitForSelector(dashboard.proposalMenuItem()).isVisible(),
      page.waitForSelector(dashboard.proposalMenuItem()).tap(),
    ]);

    check(page, {
      'New proposal menu is enabled': () =>
        page
          .waitForSelector(call.getTestCall(sharedData.testCall.title))
          .isEnabled(),
      'User can see test call': () =>
        page
          .waitForSelector(call.getTestCall(sharedData.testCall.title))
          .isVisible(),
    });

    await Promise.all([
      page.waitForNavigation({
        waitUntil: 'networkidle',
      }),
      page.locator(call.getTestCall(sharedData.testCall.title)).click(),
    ]);

    const proposal = new Proposal(page);
    proposal.createProposal(proposalTitle);
    sleep(5);

    check(page, {
      'User was able to submit proposal': () => {
        const isVisible = page
          .waitForSelector(proposal.submissionMessage())
          .isVisible();

        return isVisible;
      },
    });

    proposalsSubmitted.add(1);
    proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: proposal test VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not create and submit proposal to  ${sharedData.testCall.title} call`;
    console.error(scenario, message, error);
    logFailedTest(scenario, message, page, proposalTitle);
  } finally {
    page.close();
  }
}
