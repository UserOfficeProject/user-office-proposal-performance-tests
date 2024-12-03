import { check, fail, sleep } from 'k6';
import { browser } from 'k6/browser';
import encoding from 'k6/encoding';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

import {
  getRandomUser,
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
  sleep(randomIntBetween(10, 50));
  const page = await browser.newPage();
  const startTime = Date.now();
  const currentUser =
    sharedData.users[randomIntBetween(0, sharedData.users.length - 1)];
  const today = new Date();
  const futureDate = `${today.getMonth().toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}${today.getFullYear() + 1}`;
  page.setDefaultTimeout(106000000);
  const proposalTitle = randomString(5);
  try {
    /**
     * Login
     */

    await page.goto(
      `${sharedData.browserBaseUrl}/external-auth?token=${currentUser.sessionId}`
    );
    const homePage = page.locator('//h1[contains(text(), "Dashboard")]');
    await homePage.waitFor({
      state: 'visible',
    });
    const proposalMenuItem = page.locator('//a[@aria-label="New Proposal"]');
    await proposalMenuItem.waitFor({
      state: 'visible',
    });
    await proposalMenuItem.tap();

    const testCall = page.locator(
      `//h3[contains(text(), "${sharedData.testCall.shortCode}")]`
    );
    await testCall.waitFor({
      state: 'visible',
    });
    await testCall.tap();

    /**
     * Populating proposal basic details
     */

    sleep(randomIntBetween(10, 20));
    await page
      .locator('input[name="proposal_basis.title"]')
      .type(proposalTitle);

    sleep(5);

    await page
      .locator('textarea[name="proposal_basis.abstract"]')
      .type(randomWords(3, 5));

    sleep(5);

    await page.locator('button[data-cy="add-participant-button"]').click();
    const emailInput = page.locator('#Email-input');
    await emailInput.waitFor({
      state: 'visible',
    });
    const piEmail = getRandomUser(sharedData.users, currentUser).email;
    emailInput.type(piEmail);
    const emailFilledInput = page.locator(`input[value="${piEmail}"]`);
    await emailFilledInput.waitFor({
      state: 'visible',
    });

    await page.locator('button[data-cy="findUser"]').click();

    sleep(5);

    await page.locator('button[data-cy="assign-selected-users"]').click();

    sleep(5);

    const isStudentCheckBox = page.locator('input[value="No"][type="radio"]');
    await isStudentCheckBox.waitFor({
      state: 'visible',
    });
    await isStudentCheckBox.click();

    sleep(randomIntBetween(5, 10));

    const proposalBasicDetailsSaveButton = page.locator(
      '//button[contains(text(), "Save and continue")]'
    );
    await proposalBasicDetailsSaveButton.waitFor({
      state: 'visible',
    });
    await proposalBasicDetailsSaveButton.click();
    const proposalBasicDetailsSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await proposalBasicDetailsSavedMessage.waitFor({
      state: 'visible',
    });
    const proposalBasicDetailsSavedMessageIsVisible =
      await proposalBasicDetailsSavedMessage.isVisible();

    check(page, {
      'Proposal basics details saved': () =>
        proposalBasicDetailsSavedMessageIsVisible,
    });

    /**
     * Populating proposal research support,
     */

    sleep(randomIntBetween(10, 20));

    await page.locator('button[data-cy="add-button"]').click();

    const grantTitleTextarea = page.locator(
      'textarea[name="generic_template_basis"]'
    );
    await grantTitleTextarea.waitFor({
      state: 'visible',
    });
    await grantTitleTextarea.type(randomString(8));

    await page.locator('#selection_from_options_1634225562606').click();

    const fundingBody = page.locator('li[data-value="STFC"]');
    await fundingBody.waitFor({
      state: 'visible',
    });
    await fundingBody.click();

    sleep(5);

    await page
      .locator('input[name="text_input_1634572306120"]')
      .type(randomString(8));

    sleep(5);

    await page
      .locator('textarea[name="text_input_1634225877426"]')
      .type(randomString(8));

    sleep(5);

    await page.locator('input[name="date_1634225935445"]').type(futureDate);

    sleep(5);

    await page.locator('input[name="date_1634225971632"]').type(futureDate);

    sleep(5);

    await page
      .locator(
        'div[data-cy="genericTemplate-declaration-modal"] button[data-cy="save-and-continue-button"]'
      )
      .click();

    const sponsorshipCheckBox = page.locator(
      'input[value="Yes"][type="radio"][name="selection_from_options_1634226627885"]'
    );
    await sponsorshipCheckBox.waitFor({
      state: 'visible',
    });
    await sponsorshipCheckBox.click();

    const industrialPartnersInput = page.locator(
      'input[name="text_input_1675848614834"]'
    );
    await industrialPartnersInput.waitFor({
      state: 'visible',
    });
    await industrialPartnersInput.type(randomString(8));

    sleep(5);

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

    const piBasedInput = page.locator('li[data-value="No"]');
    await piBasedInput.waitFor({
      state: 'visible',
    });
    await piBasedInput.click();

    sleep(randomIntBetween(5, 10));

    const researchSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await researchSaveButton.waitFor({
      state: 'visible',
    });
    await researchSaveButton.click();

    const researchSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await researchSavedMessage.waitFor({
      state: 'visible',
    });
    const researchSavedMessageIsVisible =
      await researchSavedMessage.isVisible();

    check(page, {
      'Proposal research support details saved': () =>
        researchSavedMessageIsVisible,
    });

    /**
     * Populating proposal publications,
     */
    sleep(randomIntBetween(10, 20));
    await page.locator('button[data-cy="add-button"]').click();
    const articleRef = randomString(8);
    const articleRefTextarea = page.locator(
      'textarea[name="generic_template_basis"]'
    );
    await articleRefTextarea.waitFor({
      state: 'visible',
    });
    await articleRefTextarea.type(articleRef);

    await page
      .locator(
        'div[data-cy="genericTemplate-declaration-modal"] button[data-cy="save-and-continue-button"]'
      )
      .click();

    sleep(20);

    const publicationsItem = page.locator(
      `//div[contains(text(), "${articleRef}")]`
    );

    await publicationsItem.waitFor({
      state: 'visible',
    });

    const publicationSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await publicationSaveButton.waitFor({
      state: 'visible',
    });
    await publicationSaveButton.click();

    const publicationSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await publicationSavedMessage.waitFor({
      state: 'visible',
    });
    const publicationSavedMessageIsVisible =
      await publicationSavedMessage.isVisible();

    check(page, {
      'Proposal publication saved': () => publicationSavedMessageIsVisible,
    });

    /**
     * Populating proposal experiment,
     */
    sleep(randomIntBetween(10, 20));

    await page.locator('#selection_from_options_1659957684328').click();
    const proposalRoute = page.locator('li[data-value="Direct Access - New"]');
    await proposalRoute.waitFor({
      state: 'visible',
    });
    await proposalRoute.click();

    sleep(5);

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1651237585079"]'
      )
      .click();

    sleep(5);

    const similarProposalInput = page.locator(
      'input[name="text_input_1653561955182"]'
    );
    await similarProposalInput.waitFor({
      state: 'visible',
    });
    await similarProposalInput.type(randomString(8));

    sleep(5);

    await page
      .locator('input[name="number_input_1651238022554.value"]')
      .type(randomIntBetween(5, 10).toString());

    sleep(5);

    await page.locator('#instrument_picker_1707913851503').click();

    const instrumentSelector = page.locator(
      `ul[aria-labelledby="questionary-instrument_picker_1707913851503"] li[data-value="${sharedData.instrumentId}"]`
    );
    await instrumentSelector.waitFor({
      state: 'visible',
    });
    await instrumentSelector.click();

    sleep(5);

    await page
      .locator(
        'div[data-natural-key="scientific_technique"] div[id="selection_from_options_1654781491194"]'
      )
      .click();

    sleep(5);

    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1654781491194"] li[data-value="Engineering "]'
      )
      .click();

    sleep(5);

    await page
      .locator(
        'div[data-natural-key="Proposal_Programmes"] div[id="selection_from_options_1634225191405"]'
      )
      .click();

    sleep(5);

    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1634225191405"] li[data-value="Materials"]'
      )
      .click();

    sleep(5);

    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1634225191405"] li[data-value="Chemistry"]'
      )
      .click();

    sleep(5);

    await page
      .locator(
        'ul[aria-labelledby="questionary-selection_from_options_1634225191405"] li[data-value="Medicine"]'
      )
      .click();

    sleep(5);

    await page.keyboard.press('Escape');

    sleep(5);

    const beamlineScientistCheckBox = page.locator(
      'input[value="Yes"][type="radio"][name="selection_from_options_1651238885707"]'
    );
    await beamlineScientistCheckBox.waitFor({
      state: 'visible',
    });
    await beamlineScientistCheckBox.click();

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

    sleep(randomIntBetween(5, 10));

    const experimentSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await experimentSaveButton.waitFor({
      state: 'visible',
    });
    await experimentSaveButton.click();

    const experimentSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await experimentSavedMessage.waitFor({
      state: 'visible',
    });
    const experimentSavedMessageIsVisible =
      await experimentSavedMessage.isVisible();

    check(page, {
      'Proposal experiment saved': () => experimentSavedMessageIsVisible,
    });

    /**
     * Populating proposal samples,
     */

    sleep(randomIntBetween(10, 20));

    await page.locator('button[data-cy="add-button"]').click();

    const sampleTitleInput = page.locator(
      'textarea[name="generic_template_basis"]'
    );
    await sampleTitleInput.waitFor({
      state: 'visible',
    });
    await sampleTitleInput.type(randomString(8));

    sleep(5);

    await page
      .locator('iframe[id="rich_text_input_1653559412892_ifr"]')
      .click();

    sleep(5);

    await page.keyboard.type(randomWords(8, 5));

    sleep(5);

    await page
      .locator('iframe[id="rich_text_input_1653569346112_ifr"]')
      .click();

    sleep(5);

    await page.keyboard.type(randomWords(8, 5));

    await page.locator('#selection_from_options_1651585889455').click();

    sleep(5);

    const sampleTypeSelector = page.locator('li[data-value="Solid"]');
    await sampleTypeSelector.waitFor({
      state: 'visible',
    });
    await sampleTypeSelector.click();

    sleep(5);

    await page.keyboard.press('Tab');

    const sampleVariantsInput = page.locator(
      'input[name="number_input_1653559180359.value"]'
    );
    await sampleVariantsInput.waitFor({
      state: 'visible',
    });
    await sampleVariantsInput.type(randomIntBetween(4, 5).toString());

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

    sleep(5);

    await page
      .locator(
        'input[value="Already have the sample"][type="radio"][name="selection_from_options_1661323228464"]'
      )
      .click();

    await page
      .locator('textarea[name="text_input_1651586303909"]')
      .type(randomString(8));

    sleep(5);

    await page
      .locator(
        'div[data-cy="genericTemplate-declaration-modal"] button[data-cy="save-and-continue-button"]'
      )
      .click();

    sleep(randomIntBetween(5, 10));

    const samplesSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await samplesSaveButton.waitFor({
      state: 'visible',
    });
    await samplesSaveButton.click();

    const samplesSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await samplesSavedMessage.waitFor({
      state: 'visible',
    });
    const samplesSavedMessageIsVisible = await samplesSavedMessage.isVisible();

    check(page, {
      'Proposal samples saved': () => samplesSavedMessageIsVisible,
    });

    /**
     * Populating proposal hazards,
     */
    sleep(randomIntBetween(10, 20));

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792742127"]'
      )
      .click();

    sleep(5);

    await page
      .locator('textarea[name="text_input_1652793297278"]')
      .type(randomString(8));

    sleep(5);

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792870660"]'
      )
      .click();

    sleep(5);

    await page
      .locator('textarea[name="text_input_1652793327573"]')
      .type(randomString(8));

    sleep(5);

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792934715"]'
      )
      .click();

    sleep(5);

    await page
      .locator('textarea[name="text_input_1652793357636"]')
      .type(randomString(8));

    sleep(5);

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652792977755"]'
      )
      .click();

    sleep(5);

    await page
      .locator('textarea[name="text_input_1652793401206"]')
      .type(randomString(8));

    await page
      .locator(
        'input[value="Yes"][type="radio"][name="selection_from_options_1652793028992"]'
      )
      .click();

    sleep(5);

    await page
      .locator('textarea[name="text_input_1652793450992"]')
      .type(randomString(8));

    sleep(randomIntBetween(5, 10));

    const hazardsSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await hazardsSaveButton.waitFor({
      state: 'visible',
    });
    await hazardsSaveButton.click();

    const hazardsSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await hazardsSavedMessage.waitFor({
      state: 'visible',
    });
    const hazardsSavedMessageIsVisible = await hazardsSavedMessage.isVisible();

    check(page, {
      'Proposal hazards saved': () => hazardsSavedMessageIsVisible,
    });

    /**
     * Populating proposal hazards,
     */
    sleep(randomIntBetween(10, 20));
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

    sleep(5);

    await page
      .locator('textarea[name="text_input_1653564213830"]')
      .type(randomString(8));

    sleep(randomIntBetween(5, 10));

    const otherFacilitiesSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await otherFacilitiesSaveButton.waitFor({
      state: 'visible',
    });
    await otherFacilitiesSaveButton.click();

    const otherFacilitiesSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await otherFacilitiesSavedMessage.waitFor({
      state: 'visible',
    });
    const otherFacilitiesSavedMessageIsVisible =
      await otherFacilitiesSavedMessage.isVisible();

    check(page, {
      'Proposal other facilities saved': () =>
        otherFacilitiesSavedMessageIsVisible,
    });

    /**
     * Populating proposal science case upload.
     */
    sleep(randomIntBetween(10, 20));
    //hack for file upload
    await page.setInputFiles('input[type="file"]', {
      name: `${proposalTitle + Date.now() + '.pdf'}`,
      mimeType: 'application/pdf',
      mimetype: 'application/pdf',
      buffer: encoding.b64encode(fileData) as unknown as ArrayBuffer,
    } as InputFileType);

    sleep(5);

    await page
      .locator('input[type="checkbox"][name="boolean_1653561253613"]')
      .click();

    sleep(randomIntBetween(5, 10));

    const scienceCaseUploadSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await scienceCaseUploadSaveButton.waitFor({
      state: 'visible',
    });
    await scienceCaseUploadSaveButton.click();

    const scienceCaseUploadSavedMessage = page.locator(
      '//div[contains(text(), "Saved")]'
    );
    await scienceCaseUploadSavedMessage.waitFor({
      state: 'visible',
    });
    const scienceCaseUploadSavedMessageIsVisible =
      await scienceCaseUploadSavedMessage.isVisible();

    check(page, {
      'Proposal science case upload saved': () =>
        scienceCaseUploadSavedMessageIsVisible,
    });

    /**
     * Populating proposal final.
     */
    sleep(randomIntBetween(10, 20));

    await page
      .locator('input[type="checkbox"][name="boolean_1634229423070"]')
      .click();

    sleep(randomIntBetween(5, 10));

    const finalSaveButton = page.locator(
      'button[data-cy="save-and-continue-button"]'
    );
    await finalSaveButton.waitFor({
      state: 'visible',
    });
    await finalSaveButton.click();

    const finalSavedMessage = page.locator('//div[contains(text(), "Saved")]');
    await finalSavedMessage.waitFor({
      state: 'visible',
    });
    const finalSavedMessageIsVisible = await finalSavedMessage.isVisible();

    check(page, {
      'Proposal final saved': () => finalSavedMessageIsVisible,
    });

    /**
     * Populating proposal review.
     */

    sleep(randomIntBetween(10, 20));

    const proposalSubmitButton = page.locator(
      '//button[contains(text(), "Submit")]'
    );
    await proposalSubmitButton.waitFor({
      state: 'visible',
    });
    await proposalSubmitButton.click();

    const submitConfirmBoxIsVisible = page.locator(
      '//h2[contains(text(), "Please confirm")]'
    );
    await submitConfirmBoxIsVisible.waitFor({
      state: 'visible',
    });

    await page.locator('//button[@data-cy="confirm-ok"]').click();

    const submissionMessageIsVisible = page.locator(
      '//div[contains(text(), "Your proposal has been submitted successfully. You will receive a confirmation email soon.")]'
    );
    await submissionMessageIsVisible.waitFor({
      state: 'visible',
    });
    proposalsSubmitted.add(1);
    proposalSubmissionDuration.add((Date.now() - startTime) / 1000);

    //This is to wait for status actions to execute
    sleep(100);

    if (!sharedData?.isClusterTestRun) {
      await page.screenshot({
        path: `screenshots/${proposalTitle + Date.now() + '_screenshot.png'}`,
      });
    }
  } catch (error) {
    const scenario = `SCENARIO: ${exec.scenario.name} TEST: proposal test VU_ID: ${exec.vu.idInTest}`;
    const message = `User could not create and submit proposal to  call`;
    console.error(scenario, message, error);
  } finally {
    await page.close();
  }
}
