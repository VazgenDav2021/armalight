import CheckoutSummary from "@/components/ui/client/CheckoutSummary";
import PaymentForm from "@/components/ui/client/PaymentForm";
import ShippingForm from "@/components/ui/client/ShippingForm";
import Navbar from "@/components/layout/Navbar";
import { Locale } from "@/navigation";



export default function CheckoutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  return (
    <>
      <Navbar locale={locale} />
      <section className="py-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <ShippingForm />
            <PaymentForm />
          </div>
          <CheckoutSummary />
        </div>
      </section>
    </>
  );
}
