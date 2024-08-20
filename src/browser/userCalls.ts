import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { browser } from 'k6/experimental/browser';
import { Trend } from 'k6/metrics';

import { Call } from './support/call';
import { Dashboard } from './support/dashboard';
import { logFailedTest } from './support/logger';
import { User } from './support/user';
import { randomIntBetween } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';

const userCallsResponseTime = new Trend('user_calls_response_time', true);
export default async function userCallsTest(sharedData: SharedData) {
  const startTime = Date.now();
  const context = browser.newContext();
  context.setDefaultTimeout(240000);
  const page = context.newPage();
  const currentUser = sharedData.users[exec.vu.iterationInScenario];
  try {
    const user = new User(sharedData.browserBaseUrl, currentUser.sessionId);
    await page.goto(user.getLoginURL());
    await Promise.all([page.waitForNavigation()]);
    const dashboard = new Dashboard();
    await page.goto(sharedData.browserBaseUrl);
    sleep(randomIntBetween(60, 300));
    await Promise.all([
      page.waitForNavigation({
        waitUntil: 'networkidle',
      }),
      page.waitForSelector(dashboard.proposalMenuItem()).isVisible(),
      page.waitForSelector(dashboard.proposalMenuItem()).tap(),
    ]);
    const call = new Call();

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
