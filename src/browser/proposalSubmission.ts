import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

import {
  getRandomUser,
  randomIntBetween,
  randomString,
  randomWords,
} from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';
const proposalSubmissionDuration = new Trend(
  'proposal_submission_duration',
  true
);

const proposalsSubmitted = new Counter('proposals_submitted', false);
const proposalsCreated = new Counter('proposals_created', false);
export default async function proposalSubmissionTest(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  sleep(randomIntBetween(10, 100));

  const page = await browser.newPage();
  const context = page.context();
  const startTime = Date.now();
  const currentUser =
    sharedData.users[randomIntBetween(0, sharedData.users.length - 1)];
  page.setDefaultTimeout(1060000000);
  const proposalTitle = randomString(5);
  try {
    /**
     * Login
     */

    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    const homePage = page.locator('//h1[contains(text(), "Dashboard")]');
    await homePage.waitFor({
      state: 'visible',
    });

    const proposalMenuItem = page.locator('//a[@aria-label="New Proposal"]');
    await proposalMenuItem.waitFor({
      state: 'visible',
    });
    await proposalMenuItem.tap();

    const testCall = page.locator(
      `//h3[contains(text(), "${sharedData.testCall.shortCode}")]`
    );
    await testCall.waitFor({
      state: 'visible',
    });
    await testCall.tap();

    /**
     * Populating proposal basic details
     */

    sleep(randomIntBetween(10, 20));
    await page
      .locator('input[name="proposal_basis.title"]')
      .type(proposalTitle);

    sleep(5);

    await page
      .locator('textarea[name="proposal_basis.abstract"]')
      .type(randomWords(3, 5));

    sleep(5);

    await page.locator('button[data-cy="add-participant-button"]').click();
    const emailInput = page.locator('#Email-input');
    await emailInput.waitFor({
      state: 'visible',
    });
    const piEmail = getRandomUser(sharedData.users, currentUser).email;
    emailInput.type(piEmail);
    const emailFilledInput = page.locator(`input[value="${piEmail}"]`);
    await emailFilledInput.waitFor({
      state: 'visible',
    });

    await page.locator('button[data-cy="findUser"]').click();

    sleep(5);

    await page.locator('button[data-cy="assign-selected-users"]').click();

    sleep(5);

    const proposalBasicDetailsSaveButton = page.locator(
      '//button[contains(text(), "Save and continue")]'
    );
    await proposalBasicDetailsSaveButton.waitFor({
      state: 'visible',
    });
    await proposalBasicDetailsSaveButton.click();
    const proposalBasicDetailsSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await proposalBasicDetailsSavedMessage.waitFor({
      state: 'visible',
    });
    proposalsCreated.add(1);
    const proposalBasicDetailsSavedMessageIsVisible =
      await proposalBasicDetailsSavedMessage.isVisible();

    check(page, {
      'Proposal basics details saved': () =>
        proposalBasicDetailsSavedMessageIsVisible,
    });

    /**
     * Populating proposal review.
     */

    sleep(randomIntBetween(10, 20));

    const proposalSubmitButton = page.locator(
      '//button[contains(text(), "Submit")]'
    );
    await proposalSubmitButton.waitFor({
      state: 'visible',
    });
    await proposalSubmitButton.click();

    const submitConfirmBoxIsVisible = page.locator(
      '//h2[contains(text(), "Please confirm")]'
    );
    await submitConfirmBoxIsVisible.waitFor({
      state: 'visible',
    });

    await page.locator('//button[@data-cy="confirm-ok"]').click();

    const submissionMessageIsVisible = page.locator(
      '//div[contains(text(), "Your proposal has been submitted successfully. You will receive a confirmation email soon.")]'
    );
    await submissionMessageIsVisible.waitFor({
      state: 'visible',
    });
    proposalsSubmitted.add(1);
    proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
    const submissionMessageIsVisibleCheck =
      await submissionMessageIsVisible.isVisible();
    check(page, {
      'User was able to submit proposal': () => submissionMessageIsVisibleCheck,
    });

    //This is to wait for status actions to execute
    sleep(50);

    if (!sharedData?.isClusterTestRun) {
      return await page.screenshot({
        path: `screenshots/${proposalTitle + Date.now() + '_screenshot.png'}`,
      });
    }

    return;
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: proposal test VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not create and submit proposal to  call`;
    console.error(scenario, message, error);

    return await page.close().then(async () => {
      await context.close();
    });
  }
}
