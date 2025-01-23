import { UOWS } from '../../generated';

const UOWSClient = new UOWS({
  BASE: process.env.UOWS_DEV_BASE_URL,//to run in local environment use process.env.BASE_URL and process.env.API_KEY
  HEADERS: {
    Authorization: `Api-key ${process.env.UOWS_DEV_API_KEY}`,
  },
});
export default UOWSClient;
