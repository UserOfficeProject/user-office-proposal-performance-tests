import { Page } from 'k6/experimental/browser';

export function logFailedTest(
  page: Page,
  screenShotName: string,
  callBack: () => void
) {
  if (screenShotName) {
    try {
      page.screenshot({
        path: `screenshots/${screenShotName + Date.now() + '_screenshot.png'}`,
      });
    } catch (error) {
      console.error('Failed to take screenshot:', error);
    }
  }
  callBack();
}
