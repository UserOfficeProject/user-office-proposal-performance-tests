import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { browser } from 'k6/experimental/browser';
import { Trend } from 'k6/metrics';

import { Dashboard } from './support/dashboard';
import { logFailedTest } from './support/logger';
import { User } from './support/user';
import { randomIntBetween } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';
const userHomeResponseTime = new Trend('user_home_response_time', true);
export default async function userHomeTest(sharedData: SharedData) {
  const startTime = Date.now();
  const currentUser = sharedData.users[exec.vu.iterationInScenario];
  const context = browser.newContext();
  context.setDefaultTimeout(240000);
  const page = context.newPage();
  try {
    const user = new User(sharedData.browserBaseUrl, currentUser.sessionId);
    await page.goto(user.getLoginURL());
    await Promise.all([page.waitForNavigation()]);
    const dashboard = new Dashboard();
    await page.goto(sharedData.browserBaseUrl);
    sleep(randomIntBetween(60, 300));
    check(page, {
      'User can see my proposals table': () =>
        page.waitForSelector(dashboard.myProposal()).isVisible(),
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
