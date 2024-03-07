export class Call {
  getTestCall(callTitle: string) {
    return `//h3[contains(text(), "${callTitle}")]`;
  }
}
