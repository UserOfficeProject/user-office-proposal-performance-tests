/* eslint-disable @typescript-eslint/no-explicit-any */
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { browser } from 'k6/experimental/browser';
import { Trend } from 'k6/metrics';

import { Call } from './support/call';
import { Dashboard } from './support/dashboard';
import { logFailedTest } from './support/logger';
import { Proposal } from './support/proposal';
import { User } from './support/user';
import { randomString } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';

const proposalSubmissionDuration = new Trend(
  'proposal_submission_duration',
  true
);
export async function proposalTest(sharedData: SharedData) {
  const startTime = Date.now();
  const sessionId =
    sharedData.users[Math.floor(Math.random() * (sharedData.users.length / 2))]
      .sessionId;
  const context = browser.newContext();
  context.setDefaultTimeout(60000);
  const page = context.newPage();
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
      logFailedTest(
        `SCENARIO: ${exec.scenario.name} TEST: ProposalTest VU_ID: ${exec.vu.idInTest}`,
        'User could not login User Office / Dashboard not visible',
        page,
        proposalTitle
      );
    }
    const dashboard = new Dashboard();
    const call = new Call();
    await page.goto(sharedData.browserBaseUrl);
    let proposalMenu = null;
    let retry = 0;
    do {
      proposalMenu = page.locator(dashboard.proposalMenuItem());
      sleep(1000);
      retry++;
      if (retry === 10) {
        logFailedTest(
          `SCENARIO: ${exec.scenario.name} TEST: ProposalTest VU_ID: ${exec.vu.idInTest}`,
          `User cannot see test call ${sharedData.testCall.title} not visible`,
          page,
          proposalTitle
        );
      }
    } while (!!proposalMenu.isVisible() && retry <= 10);

    await Promise.all([
      page.locator(dashboard.proposalMenuItem()).click({ force: true }),
    ]);

    if (
      !check(page, {
        'User can see test call': () =>
          page
            .waitForSelector(call.getTestCall(sharedData.testCall.title))
            .isVisible(),
      })
    ) {
      logFailedTest(
        `SCENARIO: ${exec.scenario.name} TEST: ProposalTest VU_ID: ${exec.vu.idInTest}`,
        `User cannot see test call ${sharedData.testCall.title} not visible`,
        page,
        proposalTitle
      );
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
    sleep(5);
    if (
      !check(page, {
        'User was able to submit proposal': () =>
          page.waitForSelector(proposal.submissionMessage()).isVisible(),
      })
    ) {
      logFailedTest(
        `SCENARIO: ${exec.scenario.name} TEST: ProposalTest VU_ID: ${exec.vu.idInTest}`,
        'User could not submit proposal submission message not visible',
        page,
        proposalTitle
      );
    }
    proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
  } finally {
    page.close();
  }
}
