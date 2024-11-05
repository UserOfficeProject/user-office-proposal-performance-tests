import { UOWS } from './generated';

const UOWSClient = new UOWS({
  BASE: 'http://localhost:4008/users-service',
  HEADERS: {
    Authorization: `Api-key 93391b02-ead7-4c7d-ba3e-687adf269906`,
  },
});
export default UOWSClient;
