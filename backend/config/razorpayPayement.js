import Razorpay from 'razorpay';

const api_key="rzp_test_HA0dblFvRuSZ2X";
const api_Secret_key="WnueYlnYvG1GD7pVoQZv9OzE";

export const razorpay = new Razorpay({
  key_id:api_key,
  key_secret:api_Secret_key,
})