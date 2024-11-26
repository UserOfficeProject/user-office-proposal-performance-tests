import { UOWS } from './generated';

const UOWSClient = new UOWS({
  BASE: 'http://user-office-web-service:8080/users-service',
  HEADERS: {
    Authorization: `Api-key 93391b02-ead7-4c7d-ba3e-687adf269906`,
  },
});
export default UOWSClient;
