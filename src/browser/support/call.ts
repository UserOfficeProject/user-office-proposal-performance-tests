export class Call {
  getTestCall(callTitle: string) {
    return `//h3[contains(text(), "${callTitle}")]`;
  }
  callSelect(): string {
    return '//h2[contains(text(), "Select a call")]';
  }
}
