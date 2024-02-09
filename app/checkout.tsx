import { loadStripe, Stripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }: { lineItems: any[] }) {
  let stripePromise: any = null;

  const getStripe = (): Promise<Stripe> => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }
    return stripePromise!;
  };

  try {
    const stripe = await getStripe();

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        mode: 'subscription',
        lineItems,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/fail`,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        // Handle the error, for example, show an error message to the user
      }
    } else {
      console.error("Stripe is null");
      // Handle the case where Stripe is null
    }
  } catch (error) {
    console.error("Error loading Stripe:", error);
    // Handle the error, for example, show an error message to the user
  }
}
