import data from '../../support/initData';

export class Call {
  getTestCall() {
    return `//h3[contains(text(), "${data.call.shortCode}")]`;
  }
}
