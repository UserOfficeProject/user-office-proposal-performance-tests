export class Dashboard {
  proposalMenuItem(): string {
    return '//a[@aria-label="New Proposal"]';
  }
  homePage(): string {
    return '//div[contains(text(), "HOMEPAGE")]';
  }
  myProposal(): string {
    return '//h2[contains(text(), "My proposals")]';
  }
}
