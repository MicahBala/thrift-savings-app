/**
 * Helper to initialize Interswitch WebPAY Inline Checkout
 * @param {Object} config - The payment configuration
 * @param {number} config.amount - The amount in Naira (will be converted to Kobo)
 * @param {string} config.email - The user's email address
 * @param {Function} config.onSuccess - Callback when payment is successful
 * @param {Function} config.onClose - Callback when user closes or fails the modal
 */
export const initializeInterswitchPayment = ({
  amount,
  email,
  onSuccess,
  onClose,
}) => {
  const MERCHANT_CODE = 'MX275937';
  const PAY_ITEM_ID = '6648245';

  // Interswitch strictly expects the amount in Kobo (Naira * 100)
  const amountInKobo = amount * 100;

  // Generate a unique transaction reference for this specific payment attempt
  const transactionReference = `ISW-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  const scriptUrl = 'https://newwebpay.qa.interswitchng.com/inline-checkout.js';

  // THE CHECKOUT FUNCTION
  const setupAndOpenCheckout = () => {
    const paymentRequest = {
      merchant_code: MERCHANT_CODE,
      pay_item_id: PAY_ITEM_ID,
      txn_ref: transactionReference,
      amount: amountInKobo,
      currency: 566, // 566 is the official ISO 4217 code for NGN (Nigerian Naira)
      cust_email: email,
      mode: 'TEST',

      site_redirect_url: window.location.origin,

      onComplete: (response) => {
        console.log('Interswitch Raw Response:', response);

        // ADDED: response.resp === "00" to catch this exact payload
        if (
          response.resp === '00' ||
          response.respCode === '00' ||
          response.ResponseCode === '00'
        ) {
          // Pass the transaction reference back to your React Modal so it can hit your Express backend!
          onSuccess({
            transactionRef: response.txnref || response.txn_ref,
            amount: amount,
            rawResponse: response,
          });
        } else {
          // Only trigger close if it's truly not a "00" success code
          onClose();
        }
      },
    };

    // Trigger the Interswitch popup UI
    if (window.webpayCheckout) {
      window.webpayCheckout(paymentRequest);
    } else {
      console.error(
        'Interswitch checkout script failed to attach to the window.'
      );
      onClose();
    }
  };

  // 4. DYNAMIC SCRIPT INJECTION
  // Check if we already loaded the script during a previous button click
  if (document.querySelector(`script[src="${scriptUrl}"]`)) {
    setupAndOpenCheckout();
    return;
  }

  // If this is the first time clicking "Pay", inject the script into the DOM
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  script.onload = setupAndOpenCheckout; // Open the modal the millisecond the script finishes loading
  script.onerror = () => {
    console.error(
      'Failed to load the Interswitch payment script. Check your internet connection.'
    );
    onClose();
  };

  document.body.appendChild(script);
};
