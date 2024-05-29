import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function pageContentTests(sharedData: SharedData) {
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);
  sleep(randomIntBetween(5, 20));
  const currentUser =
    sharedData.users[Math.floor(Math.random() * (sharedData.users.length - 1))];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);
  group('PageContent Tests', () => {
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
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTests pageContent 
            HOMEPAGE query VU_ID: ${exec.vu.idInTest}
            Error response pageContentTests pageContent 
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
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTests pageContent 
            PRIVACYPAGE query VU_ID: ${exec.vu.idInTest}
            Error response pageContentTests pageContent 
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
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTests pageContent 
            PRIVACYPAGE query VU_ID: ${exec.vu.idInTest}
            Error response pageContentTests pageContent 
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
            fail(`SCENARIO: ${exec.scenario.name} Executing pageContentTests pageContent 
              HELPPAGE query VU_ID: ${exec.vu.idInTest}
              Error response pageContentTests pageContent 
              HELPPAGE query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
  });
}
