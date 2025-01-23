import { UOWS } from '../../generated';

const UOWSClient = new UOWS({
  BASE: process.env.BASE_URL,
  HEADERS: {
    Authorization: `Api-key ${process.env.API_KEY}`,
  },
});
export default UOWSClient;
