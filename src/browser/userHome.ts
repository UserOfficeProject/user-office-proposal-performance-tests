import { check } from 'k6';
import { browser } from 'k6/browser';
import exec from 'k6/execution';
import { Trend } from 'k6/metrics';

import { logFailedTest } from './support/logger';
import { SharedData } from '../utils/sharedType';
const userHomeResponseTime = new Trend('user_home_response_time', true);
export default async function userHomeTest(sharedData: SharedData) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const startTime = Date.now();
  const currentUser = sharedData.users[exec.vu.iterationInScenario];
  context.setDefaultTimeout(240000);
  try {
    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    await Promise.all([page.waitForNavigation()]);

    const userDashboardIsVisible = await page
      .waitForSelector('//h1[contains(text(), "User Office / Dashboard")]')
      .then((e) => e.isVisible());

    const userProposalsIsVisible = await page
      .waitForSelector('//h2[contains(text(), "My proposals")]')
      .then((e) => e.isVisible());

    check(page, {
      'User can see home page': () => userDashboardIsVisible,
      'User can see my proposals table': () => userProposalsIsVisible,
    });

    userHomeResponseTime.add((Date.now() - startTime) / 1000);
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: userHomeTest VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not view user home proposals dashboard`;
    console.error(scenario, message, error);
    logFailedTest(scenario, message, page, 'userHomeTest');
  } finally {
    page.close();
  }
}
