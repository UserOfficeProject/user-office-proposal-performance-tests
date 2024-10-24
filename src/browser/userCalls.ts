import { check, fail } from 'k6';
import { browser } from 'k6/browser';
import exec from 'k6/execution';
import { Trend } from 'k6/metrics';

import { logFailedTest } from './support/logger';
import { SharedData } from '../utils/sharedType';

const userCallsResponseTime = new Trend('user_calls_response_time', true);
export default async function userCallsTest(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
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
    check(page, {
      'User can see home page': () => userDashboardIsVisible,
    });

    const proposalMenuItem = page.locator('//a[@aria-label="New Proposal"]');
    await Promise.all([
      page.waitForNavigation(),
      proposalMenuItem.isVisible(),
      proposalMenuItem.tap(),
    ]);

    const testCall = await page.waitForSelector(
      `//h3[contains(text(), "${sharedData.testCall.title}")]`
    );
    const testCallIsVisible = await testCall.isVisible();
    const testCallIsEnabled = await testCall.isEnabled();

    check(page, {
      'New proposal menu is enabled': () => testCallIsEnabled,
      'User can see test call': () => testCallIsVisible,
    });

    userCallsResponseTime.add((Date.now() - startTime) / 1000);
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: userCalls VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not view ${sharedData.testCall.title} test call`;
    console.error(scenario, message, error);
    logFailedTest(scenario, message, page, 'userCalls');
  } finally {
    page.close();
  }
}
