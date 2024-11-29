import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import encoding from 'k6/encoding';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

import {
  randomIntBetween,
  randomString,
  randomWords,
} from '../utils/helperFunctions';
import { InputFileType, SharedData } from '../utils/sharedType';

const proposalSubmissionDuration = new Trend(
  'proposal_submission_duration',
  true
);

const proposalsSubmitted = new Counter('proposals_submitted', false);

export default async function isisProposalSubmissionTest(
  sharedData: SharedData,
  fileData: string | ArrayBuffer
) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  sleep(randomIntBetween(10, 100));
  const page = await browser.newPage();
  const context = page.context();
  const startTime = Date.now();
  const currentUser =
    sharedData.users[randomIntBetween(0, sharedData.users.length - 1)];
  context.setDefaultTimeout(106000000);
  const proposalTitle = randomString(5);
  try {
    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    sleep(randomIntBetween(5, 20));

    const userDashboardIsVisible = await page
      .waitForSelector('//h1[contains(text(), "Dashboard")]')
      .then((e) => e.isVisible());
    check(userDashboardIsVisible, {
      'User is logged in': () => userDashboardIsVisible,
    });

    await page.goto(sharedData.browserBaseUrl);
    sleep(randomIntBetween(5, 20));
    const proposalMenuItem = page.locator('//a[@aria-label="New Proposal"]');
    await Promise.all([
      page.waitForNavigation(),
      proposalMenuItem.isVisible(),
      proposalMenuItem.tap(),
    ]);
    sleep(5);
    const testCall = await page.waitForSelector(
      `//h3[contains(text(), "${sharedData.testCall.shortCode}")]`
    );
    const testCallIsVisible = await testCall.isVisible();
    const testCallIsEnabled = await testCall.isEnabled();
    check(page, {
      'New proposal menu is enabled': () => testCallIsEnabled,
      'User can see test call': () => testCallIsVisible,
    });

    await testCall.click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator('input[name="proposal_basis.title"]')
      .type(proposalTitle);
    await page
      .locator('textarea[name="proposal_basis.abstract"]')
      .type(randomWords(3, 5));
    sleep(randomIntBetween(5, 10));
    await page.locator('input[value="No"][type="radio"]').click();

    const saveButtonVisible = await page
      .locator('//button[contains(text(), "Save and continue")]')
      .isVisible();

    check(page, {
      'Save and continue button visible ': () => saveButtonVisible,
    });

    await page
      .locator('//button[contains(text(), "Save and continue")]')
      .click();
    sleep(randomIntBetween(5, 20));
    await page.locator('button[data-cy="add-button"]').click();

    sleep(randomIntBetween(5, 20));

    await page
      .locator('textarea[name="generic_template_basis"]')
      .type(randomString(8));

    await page.locator('#selection_from_options_1634225562606').click();

    sleep(randomIntBetween(5, 20));

    await page.locator('li[data-value="STFC"]').click();

    sleep(randomIntBetween(5, 20));

    await page
      .locator('input[name="text_input_1634572306120"]')
      .type(randomString(8));

    sleep(randomIntBetween(5, 10));

    await page
      .locator('textarea[name="text_input_1634225877426"]')
      .type(randomString(8));

    sleep(randomIntBetween(5, 10));
    const today = new Date();
    const futureDate = `${today.getDate().toString().padStart(2, '0')}-${String(today.getMonth() + 3).padStart(2, '0')}-${today.getFullYear()}`;

    await page.locator('input[name="date_1634225935445"]').type(futureDate);

    sleep(randomIntBetween(5, 10));

    await page.locator('input[name="date_1634225971632"]').type(futureDate);

    sleep(randomIntBetween(5, 10));

    await page
      .locator(
        'div[data-cy="genericTemplate-declaration-modal"] button[data-cy="save-and-continue-button"]'
      )
      .click();

    sleep(randomIntBetween(5, 20));

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1634226627885"]'
      )
      .click();

    await page
      .locator('input[name="text_input_1675848614834"]')
      .type(randomString(8));
    await page
      .locator('input[name="text_input_1653571067870"]')
      .type(randomWords(2, 5));

    await page
      .locator(
        'input[value="No"][type="radio"][name="selection_from_options_1655199183364"]'
      )
      .click();
    sleep(5);
    await page
      .locator('textarea[name="text_input_1653573145595"]')
      .type(randomString(8));
    await page.locator('#selection_from_options_1709730648227').click();
    sleep(5);
    await page.locator('li[data-value="No"]').click();
    sleep(5);
    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(5);
    await page.locator('button[data-cy="add-button"]').click();
    sleep(5);
    await page
      .locator('textarea[name="generic_template_basis"]')
      .type(randomString(8));
    await page
      .locator(
        'div[data-cy="genericTemplate-declaration-modal"] button[data-cy="save-and-continue-button"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(randomIntBetween(5, 20));
    await page.locator('#selection_from_options_1659957684328').click();
    sleep(5);
    await page.locator('li[data-value="Direct Access - New"]').click();
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1651237585079"]'
      )
      .click();
    sleep(5);
    await page
      .locator('input[name="text_input_1653561955182"]')
      .type(randomString(8));
    sleep(5);
    await page
      .locator('input[name="number_input_1651238022554.value"]')
      .type(randomIntBetween(5, 10).toString());

    sleep(5);
    await page.locator('#instrument_picker_1707913851503').click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator(
        'ul[aria-labelledby="questionary-instrument_picker_1707913851503"] li[data-value="37"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator(
        'div[data-natural-key="scientific_technique"] div[id="selection_from_options_1654781491194"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1654781491194"] li[data-value="Engineering "]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator(
        'div[data-natural-key="Proposal_Programmes"] div[id="selection_from_options_1634225191405"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));

    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1634225191405"] li[data-value="Materials"]'
      )
      .click();
    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1634225191405"] li[data-value="Chemistry"]'
      )
      .click();
    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1634225191405"] li[data-value="Medicine"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page.keyboard.press('Escape');
    sleep(randomIntBetween(5, 10));
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1651238885707"]'
      )
      .click();
    sleep(5);
    await page
      .locator('input[name="text_input_1653563538685"]')
      .type(randomWords(2, 8));
    sleep(5);
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1689059075524"]'
      )
      .click();
    sleep(5);
    await page
      .locator('input[name="text_input_1689059450389"]')
      .type(randomWords(2, 8));
    sleep(5);
    await page
      .locator('input[name="interval_1655389791428.min"]')
      .type(randomIntBetween(1, 2).toString());
    await page
      .locator('input[name="interval_1655389791428.max"]')
      .type(randomIntBetween(3, 5).toString());
    sleep(5);
    await page
      .locator('input[name="interval_1655390144074.min"]')
      .type(randomIntBetween(1, 2).toString());
    await page
      .locator('input[name="interval_1655390144074.max"]')
      .type(randomIntBetween(4, 5).toString());
    sleep(5);
    await page
      .locator('input[name="interval_1655390202570.min"]')
      .type(randomIntBetween(1, 2).toString());
    await page
      .locator('input[name="interval_1655390202570.max"]')
      .type(randomIntBetween(4, 5).toString());
    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(randomIntBetween(5, 20));

    await page.locator('button[data-cy="add-button"]').click();

    sleep(randomIntBetween(5, 10));
    await page
      .locator('textarea[name="generic_template_basis"]')
      .type(randomString(8));

    await page
      .locator('iframe[id="rich_text_input_1653559412892_ifr"]')
      .click();
    sleep(randomIntBetween(5, 10));
    await page.keyboard.type(randomWords(8, 5));
    sleep(5);
    await page
      .locator('iframe[id="rich_text_input_1653569346112_ifr"]')
      .click();
    sleep(5);
    await page.keyboard.type(randomWords(8, 5));
    await page.locator('#selection_from_options_1651585889455').click();
    sleep(randomIntBetween(5, 10));
    await page.locator('li[data-value="Solid"]').click();
    sleep(randomIntBetween(5, 10));
    await page.keyboard.press('Tab');
    sleep(randomIntBetween(5, 10));
    await page
      .locator('input[name="number_input_1653559180359.value"]')
      .type(randomIntBetween(4, 5).toString());
    sleep(5);

    await page
      .locator('input[name="text_input_1651586094074"]')
      .type(randomString(8));
    sleep(5);
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1675849959660"]'
      )
      .click();
    sleep(5);
    await page
      .locator('textarea[name="text_input_1651586173226"]')
      .type(randomString(8));
    sleep(5);
    await page
      .locator('textarea[name="text_input_1651586215535"]')
      .type(randomString(8));

    await page
      .locator('input[name="number_input_1653559308476.value"]')
      .type(randomIntBetween(4, 5).toString());

    await page
      .locator(
        'input[value="Already have the sample"][type="radio"][name="selection_from_options_1661323228464"]'
      )
      .click();

    await page
      .locator('textarea[name="text_input_1651586303909"]')
      .type(randomString(8));
    await page
      .locator(
        'div[data-cy="genericTemplate-declaration-modal"] button[data-cy="save-and-continue-button"]'
      )
      .click();
    sleep(randomIntBetween(5, 20));
    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(randomIntBetween(5, 20));
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792742127"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));

    await page
      .locator('textarea[name="text_input_1652793297278"]')
      .type(randomString(8));
    sleep(randomIntBetween(5, 10));
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792870660"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));

    await page
      .locator('textarea[name="text_input_1652793327573"]')
      .type(randomString(8));

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792934715"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));

    await page
      .locator('textarea[name="text_input_1652793357636"]')
      .type(randomString(8));
    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792977755"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator('textarea[name="text_input_1652793401206"]')
      .type(randomString(8));

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652793028992"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator('textarea[name="text_input_1652793450992"]')
      .type(randomString(8));
    sleep(randomIntBetween(5, 10));

    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(randomIntBetween(5, 20));

    await page
      .locator(
        'input[value="No"][type="radio"][name="selection_from_options_1655201240850"]'
      )
      .click();

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1655201516441"]'
      )
      .click();
    await page
      .locator('input[name="text_input_1655201561263"]')
      .type(randomString(8));
    await page
      .locator('textarea[name="text_input_1655201610917"]')
      .type(randomString(8));

    await page
      .locator(
        'input[value="No"][type="radio"][name="selection_from_options_1651238284594"]'
      )
      .click();
    sleep(randomIntBetween(5, 10));
    await page
      .locator('textarea[name="text_input_1653564213830"]')
      .type(randomString(8));

    await page.screenshot({
      path: `screenshots/${proposalTitle + Date.now() + '_1screenshot.png'}`,
    });
    await page.locator('button[data-cy="save-and-continue-button"]').click();

    sleep(randomIntBetween(5, 20));

    //hack for file upload
    await page.setInputFiles('input[type="file"]', {
      name: `${proposalTitle + Date.now() + '.pdf'}`,
      mimeType: 'application/pdf',
      mimetype: 'application/pdf',
      buffer: encoding.b64encode(fileData) as unknown as ArrayBuffer,
    } as InputFileType);

    sleep(randomIntBetween(5, 20));

    await page
      .locator('input[type="checkbox"][name="boolean_1653561253613"]')
      .click();

    sleep(5);
    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(randomIntBetween(5, 20));

    await page
      .locator('input[type="checkbox"][name="boolean_1634229423070]')
      .click();
    sleep(5);
    await page.locator('button[data-cy="save-and-continue-button"]').click();
    sleep(randomIntBetween(5, 20));
    await page
      .waitForSelector('//button[contains(text(), "Submit")]')
      .then((e) => e.click());
    sleep(5);
    const submitConfirmBoxIsVisible = await page
      .waitForSelector('//h2[contains(text(), "Please confirm")]')
      .then((e) => e.isVisible());

    check(page, {
      'Proposal submit confirmation box visible': () =>
        submitConfirmBoxIsVisible,
    });
    if (submitConfirmBoxIsVisible) {
      await page.locator('//button[@data-cy="confirm-ok"]').click();
      proposalsSubmitted.add(1);
      proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
    }
    sleep(randomIntBetween(5, 10));
    const submissionMessageIsVisible = await page
      .waitForSelector(
        '//div[contains(text(), "Your proposal has been submitted successfully. You will receive a confirmation email soon.")]'
      )
      .then((e) => e.isVisible());

    check(page, {
      'User was able to submit proposal': () => submissionMessageIsVisible,
    });

    if (!submissionMessageIsVisible) {
      console.error(
        'Failed to take screenshot:',
        'Proposal was not submitted successfully'
      );
      if (!sharedData?.isClusterTestRun) {
        await page.screenshot({
          path: `screenshots/${proposalTitle + Date.now() + '_screenshot.png'}`,
        });
      }
    }
    proposalsSubmitted.add(1);
    proposalSubmissionDuration.add((Date.now() - startTime) / 1000);
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: proposal test VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not create and submit proposal to  call`;
    console.error(scenario, message, error);
  } finally {
    await page.close();
    if (page.isClosed()) {
      context.close();
    }
  }
}
