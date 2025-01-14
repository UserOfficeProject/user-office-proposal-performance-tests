import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

import { randomIntBetween, randomString, randomWords } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';
const reviewSubmissionDuration = new Trend('review_submission_duration', true);

const reviewSubmitted = new Counter('review_submitted', false);
export default async function fapReviewTest(sharedData: SharedData) {
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
  const fapReviewers = sharedData.users.slice(0, 6);
  const currentUser =
    fapReviewers[randomIntBetween(0, fapReviewers.length - 1)];
  context.setDefaultTimeout(360000);
  const proposalTitle = randomString(5);
  try {
    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    const homePage = page.locator('//h1[contains(text(), "Dashboard")]');
    await homePage.waitFor({
      state: 'visible',
    });
  
    const proposalGradeIcon = page.locator(
      '//button[@aria-label="Grade proposal"]'
    );
    await proposalGradeIcon.waitFor({
      state: 'visible',
    });

    await proposalGradeIcon.tap();
 
    sleep(randomIntBetween(5, 20));

    // Get the iframe element
    await page
    .locator('iframe[id="comment_ifr"]')
    .click();
    sleep(randomIntBetween(5, 20));
 
    await page.keyboard.type(randomWords(8, 5));
    sleep(5);
  
    await page.locator('input[id="grade-proposal"]').type(randomIntBetween(1,10).toString());
   

    sleep(5);

    const saveButtonVisible = await page
      .locator('//button[contains(text(), "Save and continue")]')
      .isVisible();

      
    check(page, {
      'Save and continue button visible ': () => saveButtonVisible,
    });

    await page
      .locator('//button[contains(text(), "Save and continue")]')
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .waitForSelector('//button[contains(text(), "Submit")]')
      .then((e) => e.click());
    sleep(randomIntBetween(5, 20));
    const submitConfirmBoxIsVisible = await page
      .waitForSelector('//h2[contains(text(), "Please confirm")]')
      .then((e) => e.isVisible());

    check(page, {
      'Proposal review confirmation box visible': () =>
        submitConfirmBoxIsVisible,
    });
    if (submitConfirmBoxIsVisible) {
      await page.locator('//button[@data-cy="confirm-ok"]').click();
      reviewSubmitted.add(1);
      reviewSubmissionDuration.add((Date.now() - startTime) / 1000);
    }
    sleep(randomIntBetween(5, 10));
    const submissionMessageIsVisible = await page
      .waitForSelector(
        '//div[contains(text(), "Your review has been submitted successfully.")]'
      )
      .then((e) => e.isVisible());

    check(page, {
      'Reviewer was able to submit review': () => submissionMessageIsVisible,
    });

    if (!submissionMessageIsVisible) {
      console.error(
        'Failed to take screenshot:',
        'Review was not submitted successfully'
      );
      if (!sharedData?.isClusterTestRun) {
        await page.screenshot({
          path: `screenshots/${proposalTitle + Date.now() + '_screenshot.png'}`,
        });
      }
    }
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: review test VU_ID: ${exec.vu.idInTest}`;
    const message = `Reviewer could not submit review for a proposal`;
    console.error(scenario, message, error);
  } finally {
    await page.close();
    if (page.isClosed()) {
      context.close();
    }
  }
}
