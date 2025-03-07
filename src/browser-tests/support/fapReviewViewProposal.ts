import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import { Counter, Trend } from 'k6/metrics';

import { randomIntBetween } from '../../utils/helperFunctions';
import { SharedData } from '../../utils/sharedType';
import { vu } from 'k6/execution';
const viewProposalResponseTime = new Trend('view_proposal_response_time', true);

const proposalsViewed = new Counter('proposals_viewed', false);
export default async function fapReviewViewProposalTest(
  sharedData: SharedData
) {
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

      const proposalInformationTabVisible = await page
        .locator('//button[@aria-controls="horizontal-tabpanel-0"]')
        .isVisible();
      check(page, {
        'Proposal Information tab is visible ': () =>
          proposalInformationTabVisible,
      });

      await page
        .locator('//button[@aria-controls="horizontal-tabpanel-0"]')
        .click();

      sleep(10);

      await page.screenshot({
        path: `screenshots/${currentUser.userId + Date.now() + '_screenshot.png'}`,
      });

      const newProposalIsVisible = await page
        .waitForSelector('//h6[contains(text(), "New proposal")]')
        .then((e) => e.isVisible());

      const researchSupportIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Research Support")]')
        .then((e) => e.isVisible());

      const publicationsIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Publications")]')
        .then((e) => e.isVisible());

      const experimentIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Experiment")]')
        .then((e) => e.isVisible());

      const samplesIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Samples")]')
        .then((e) => e.isVisible());

      const hazardsIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Hazards")]')
        .then((e) => e.isVisible());

      const otherFacilitiesIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Other Facilities")]')
        .then((e) => e.isVisible());

      const scienceCaseUploadIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Science Case Upload")]')
        .then((e) => e.isVisible());

      const finalIsVisible = await page
        .waitForSelector('//h6[contains(text(), "Final")]')
        .then((e) => e.isVisible());

      check(page, {
        'Reviewer can see new proposal details': () => newProposalIsVisible,
        'Reviewer can see research support ': () => researchSupportIsVisible,
        'Reviewer can see publications ': () => publicationsIsVisible,
        'Reviewer can see experiment ': () => experimentIsVisible,
        'Reviewer can see samples ': () => samplesIsVisible,
        'Reviewer can see hazards ': () => hazardsIsVisible,
        'Reviewer can see other facilities ': () => otherFacilitiesIsVisible,
        'Reviewer can see science case upload ': () =>
          scienceCaseUploadIsVisible,
        'Reviewer can see final ': () => finalIsVisible,
      });

      console.info(
        `Reviewer ${currentUser.userId} can see proposal information`
      );

      await page.locator('//button[@data-cy="close-modal"]').click();
      sleep(20);
      proposalsViewed.add(1);
      viewProposalResponseTime.add((Date.now() - startTime) / 1000);
    }
  } catch (error) {
    console.error(
      `Error while viewing proposal information : ${currentUser.userId}, error is ${error}`
    );
  } finally {
    await page.close();
    if (page.isClosed()) {
      context.close();
    }
  }
}
