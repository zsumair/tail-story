import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_8f6o9Uhjiz4mxCcNRJkcBZeL");

export const redirectToCheckout = async (event, userId) => {
    event.preventDefault()
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
        lineItems: [{ 
            price: "price_1HBDCrJpKTxPdmIthftrOl0M", 
            quantity: 1 
        }],
        mode: 'subscription',
        successUrl: `http://localhost:8000/`,
        cancelUrl: `http://localhost:8000/`,
        clientReferenceId: userId
    })

    if (error) {
        console.warn("Error:", error)
    }
}