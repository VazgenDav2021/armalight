"use client";
import { useRouter } from "next/navigation";
import CheckoutSummary from "@/components/ui/client/CheckoutSummary";
import PaymentForm from "@/components/ui/client/PaymentForm";
import ShippingForm from "@/components/ui/client/ShippingForm";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/lib/cart/store";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { clear, items } = useCart();
  const router = useRouter();

  const onSubmit = () => {
    alert("Order placed! (mock)");
    clear();  
    router.push("/order-confirmation");
  };

  if (!items.length) return router.push("/");

  return (
    <Elements stripe={stripePromise}>
      <section className="py-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <ShippingForm />
            <PaymentForm />
          </div>

          <CheckoutSummary onSubmit={onSubmit} />
        </div>
      </section>
    </Elements>
  );
}
