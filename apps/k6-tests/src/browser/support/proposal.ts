import { Page } from 'k6/experimental/browser';

import { randomString } from '../../utils/helperFunctions';

export class Proposal {
  constructor(private page: Page) {}

  async createProposal(proposalTitle: string) {
    this.page.locator('input[name="proposal_basis.title"]').type(proposalTitle);
    this.page
      .locator('textarea[name="proposal_basis.abstract"]')
      .type(`${randomString(20)} ${randomString(20)}`);

    await Promise.all([
      this.page
        .locator('//button[contains(text(), "Save and continue")]')
        .isVisible(),
      this.page
        .locator('//button[contains(text(), "Save and continue")]')
        .click(),
      this.page.locator('//div[contains(text(), "Saved")]').isVisible(),
      this.page.locator('//button[contains(text(), "Submit")]').click(),
      this.page
        .waitForSelector('//h2[contains(text(), "Please confirm")]')
        .isVisible(),
      this.page.locator('//button[contains(text(), "OK")]').click(),
    ]);
  }

  submissionMessage(): string {
    return '//div[contains(text(), "Your proposal has been submitted successfully. You will receive a confirmation email soon")]';
  }
}
