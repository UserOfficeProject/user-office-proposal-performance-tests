import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function pageContentTest(sharedData: SharedData) {
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);
  sleep(randomIntBetween(5, 20));
  const currentUser = sharedData.users[exec.vu.idInTest];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);
  group('PageContent Test', () => {
    group('PageContent query should return HOMEPAGE content', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query PageContent($pageId: PageName!) {
            pageContent(pageId: $pageId)
          }`,
          variables: {
            pageId: 'HOMEPAGE',
          },
        }),
        userToken
      );

      check(response, {
        'PageContent HOMEPAGE query status is 200': (res) => res.status === 200,
        'PageContent query returned HOMEPAGE page content': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return data.data?.pageContent === 'HOMEPAGE';
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTest pageContent 
            HOMEPAGE query VU_ID: ${exec.vu.idInTest}
            Error response pageContentTest pageContent 
            HOMEPAGE query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
    group('PageContent query should return PRIVACYPAGE content', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
            query PageContent($pageId: PageName!) {
              pageContent(pageId: $pageId)
            }`,
          variables: {
            pageId: 'PRIVACYPAGE',
          },
        }),
        userToken
      );

      check(response, {
        'PageContent PRIVACYPAGE query status is 200': (res) =>
          res.status === 200,
        'PageContent query returned PRIVACYPAGE page content': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return data.data?.pageContent === 'PRIVACYPAGE';
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTest pageContent 
            PRIVACYPAGE query VU_ID: ${exec.vu.idInTest}
            Error response pageContentTest pageContent 
            PRIVACYPAGE query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('PageContent query should return PRIVACYPAGE content', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
            query PageContent($pageId: PageName!) {
              pageContent(pageId: $pageId)
            }`,
          variables: {
            pageId: 'PRIVACYPAGE',
          },
        }),
        userToken
      );

      check(response, {
        'PageContent PRIVACYPAGE query status is 200': (res) =>
          res.status === 200,
        'PageContent query returned PRIVACYPAGE page content': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return data.data?.pageContent === 'PRIVACYPAGE';
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContent pageContent 
            PRIVACYPAGE query VU_ID: ${exec.vu.idInTest}
            Error response pageContentTest pageContent 
            PRIVACYPAGE query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('PageContent query should return HELPPAGE content', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
              query PageContent($pageId: PageName!) {
                pageContent(pageId: $pageId)
              }`,
          variables: {
            pageId: 'HELPPAGE',
          },
        }),
        userToken
      );

      check(response, {
        'PageContent HELPPAGE query status is 200': (res) => res.status === 200,
        'PageContent query returned HELPPAGE page content': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return data.data?.pageContent === 'HELPPAGE';
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTest pageContent 
              HELPPAGE query VU_ID: ${exec.vu.idInTest}
              Error response pageContentTest pageContent 
              HELPPAGE query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
  });
}
