"use client";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { FormEvent } from "react";

const elementStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
    },
  },

  disableLink: true,
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const t = useTranslations("checkout.BILLING");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement!,
    });

    if (error) {
      console.error("❌ Ошибка:", error.message);
    } else {
      console.log("✅ PaymentMethod создан:", paymentMethod);
      alert(`Создан PaymentMethod: ${paymentMethod.id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-[-webkit-fill-available]">
      <h2 className="text-lg font-semibold">{t("TITLE")}</h2>
      <div>
        <label className="block mb-1 text-sm font-medium">
          {t("CARD_NUMBER")}
        </label>
        <div className="p-2 border rounded">
          <CardNumberElement options={elementStyle} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("EXP_DATE")}
          </label>
          <div className="p-2 border rounded">
            <CardExpiryElement options={elementStyle} />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">{t("CODE")}</label>
          <div className="p-2 border rounded">
            <CardCvcElement options={elementStyle} />
          </div>
        </div>
      </div>
    </form>
  );
}
