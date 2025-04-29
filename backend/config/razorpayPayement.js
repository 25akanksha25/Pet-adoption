import Razorpay from 'razorpay';

const api_key="rzp_test_5vn2DOA5ooekAb";
const api_Secret_key="sFLn8FhT65rd4izWpWRmSb5e";


export const razorpay = new Razorpay({
  key_id:api_key,
  key_secret:api_Secret_key,
})