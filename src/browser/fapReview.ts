import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import exec, { vu } from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

import { randomIntBetween, randomWords } from '../utils/helperFunctions';
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
  const fapReviewers = sharedData.users.slice(
    0,
    Number(__ENV.SETUP_TOTAL_REVIEWERS)
  );
  const currentUser = fapReviewers[vu.idInTest - 1];
  context.setDefaultTimeout(360000);
  try {
    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    const homePage = page.locator('//h1[contains(text(), "Dashboard")]');
    await homePage.waitFor({
      state: 'visible',
    });
    sleep(10);
    await page.screenshot({
      path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
    });

    const gradeIcons = await page.$$('//button[@aria-label="Grade proposal"]');
    for (let i = 0; i < gradeIcons.length; i++) {
      await gradeIcons[i].waitForElementState('visible');

      sleep(10);
      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });
      await gradeIcons[i].tap();

      sleep(10);
      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });

      // Get the iframe element
      await page.locator('iframe[id="comment_ifr"]').click();
      sleep(10);
      await page.keyboard.type(randomWords(8, 5));

      sleep(10);
      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });

      await page
        .locator('input[id="grade-proposal"]')
        .type(randomIntBetween(1, 10).toString());

      sleep(10);
      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });
      const saveButtonVisible = await page
        .locator('//button[contains(text(), "Save and continue")]')
        .isVisible();

      sleep(10);
      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });

      check(page, {
        'Save and continue button visible ': () => saveButtonVisible,
      });

      await page
        .locator('//button[contains(text(), "Save and continue")]')
        .click();

      sleep(10);

      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });
      await page
        .waitForSelector('//button[contains(text(), "Submit")]')
        .then((e) => e.click());

      sleep(10);

      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });
      const submitConfirmBoxIsVisible = await page
        .waitForSelector('//h2[contains(text(), "Please confirm")]')
        .then((e) => e.isVisible());
      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });
      check(page, {
        'Proposal review confirmation box visible': () =>
          submitConfirmBoxIsVisible,
      });
      if (submitConfirmBoxIsVisible) {
        await page.locator('//button[@data-cy="confirm-ok"]').click();
        reviewSubmitted.add(1);
        reviewSubmissionDuration.add((Date.now() - startTime) / 1000);
      }
      sleep(10);
      const submissionMessageIsVisible = await page
        .waitForSelector(
          '//div[contains(text(), "Your review has been submitted successfully.")]'
        )
        .then((e) => e.isVisible());

      check(
        page,
        {
          'Reviewer was able to submit review': () =>
            submissionMessageIsVisible,
        },
        {
          reviewSubmission: 'reviewSubmissionSaved',
        }
      );

      console.error(
        `Review submitted successfully for reviewer : ${currentUser.userId}`
      );
      console.error(`Globally unique identifier of VU : ${exec.vu.idInTest}`);

      await page.locator('//button[@data-cy="close-modal"]').click();
      sleep(20);
    }
  } catch (error) {
    console.error(`Error while submitting Review : ${currentUser.userId}`);
  } finally {
    await page.close();
    if (page.isClosed()) {
      context.close();
    }
  }
}
