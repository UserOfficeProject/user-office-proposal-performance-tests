import { fail } from 'k6';
import { Page } from 'k6/experimental/browser';

export function logFailedTest(
  context: string,
  message: string,
  page?: Page,
  screenShotName?: string
) {
  if (page && screenShotName) {
    try {
      page.screenshot({
        path: `screenshots/${screenShotName + Date.now() + '_screenshot.png'}`,
      });
    } catch (error) {
      console.error('Failed to take screenshot:', error);
    }
  }

  fail(`${context},${message}`);
}
