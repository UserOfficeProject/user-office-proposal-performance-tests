import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

import { logFailedTest } from './support/logger';
import { randomIntBetween, randomString } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';
const proposalSubmissionDuration = new Trend(
  'proposal_submission_duration',
  true
);

const proposalsSubmitted = new Counter('proposals_submitted', false);
export default async function proposalSubmissionTest(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  sleep(randomIntBetween(10, 100));
  const context = await browser.newContext();
  const page = await context.newPage();
  const startTime = Date.now();
  const currentUser =
    sharedData.users[randomIntBetween(0, sharedData.users.length - 1)];
  context.setDefaultTimeout(240000);
  const proposalTitle = randomString(5);
  try {
    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    await Promise.all([page.waitForNavigation()]);

    const userDashboardIsVisible = await page
      .waitForSelector('//h1[contains(text(), "User Office / Dashboard")]')
      .then((e) => e.isVisible());
    check(userDashboardIsVisible, {
      'User is logged in': () => userDashboardIsVisible,
    });

    await page.goto(sharedData.browserBaseUrl);
    sleep(randomIntBetween(5, 20));

    const proposalMenuItem = page.locator('//a[@aria-label="New Proposal"]');
    await Promise.all([
      page.waitForNavigation(),
      proposalMenuItem.isVisible(),
      proposalMenuItem.tap(),
    ]);
    sleep(randomIntBetween(5, 20));
    const testCall = await page.waitForSelector(
      `//h3[contains(text(), "${sharedData.testCall.shortCode}")]`
    );
    const testCallIsVisible = await testCall.isVisible();
    const testCallIsEnabled = await testCall.isEnabled();

    check(page, {
      'New proposal menu is enabled': () => testCallIsEnabled,
      'User can see test call': () => testCallIsVisible,
    });

    await testCall.click();
    sleep(randomIntBetween(5, 20));
    await page
      .locator('input[name="proposal_basis.title"]')
      .type(proposalTitle);
    await page
      .locator('textarea[name="proposal_basis.abstract"]')
      .type(`${randomString(8)} ${randomString(8)}`);
    sleep(randomIntBetween(5, 20));
    const saveButtonVisible = await page
      .locator('//button[contains(text(), "Save and continue")]')
      .isVisible();

    check(page, {
      'Save and continue button visible ': () => saveButtonVisible,
    });

    await page
      .locator('//button[contains(text(), "Save and continue")]')
      .click();
    sleep(randomIntBetween(10, 40));
    const saveMessageVisible = await page
      .locator('//div[contains(text(), "Saved")]')
      .isVisible();

    check(page, {
      'Proposal saved': () => saveMessageVisible,
    });

    await page.locator('//button[contains(text(), "Submit")]').click();
    sleep(randomIntBetween(5, 20));
    const submitConfirmBoxIsVisible = await page
      .waitForSelector('//h2[contains(text(), "Please confirm")]')
      .then((e) => e.isVisible());

    check(page, {
      'Proposal submit confirmation box visible': () =>
        submitConfirmBoxIsVisible,
    });

    await page.locator('//button[contains(text(), "OK")]').click();

    sleep(randomIntBetween(5, 20));
    const submissionMessageIsVisible = await page
      .waitForSelector(
        '//div[contains(text(), "Your proposal has been submitted successfully. You will receive a confirmation email soon.")]'
      )
      .then((e) => e.isVisible());

    check(page, {
      'User was able to submit proposal': () => submissionMessageIsVisible,
    });

    if (!submissionMessageIsVisible) {
      console.error(
        'Failed to take screenshot:',
        'Proposal was not submitted successfully'
      );
      await page.screenshot({
        path: `screenshots/${proposalTitle + Date.now() + '_screenshot.png'}`,
      });
    }
    proposalsSubmitted.add(1);
    proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: proposal test VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not create and submit proposal to  call`;
    console.error(scenario, message, error);
    logFailedTest(scenario, message, page, proposalTitle);
  } finally {
    page.close();
  }
}
