"use client";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

export default function CheckoutForm() {
  const t = useTranslations("checkout.BILLING");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      newErrors.cardNumber = t("INVALID_CARD");
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = t("INVALID_EXPIRY");
    }

    if (!/^\d{3,4}$/.test(cvc)) {
      newErrors.cvc = t("INVALID_CVC");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Имитация обработки платежа
    await new Promise((res) => setTimeout(res, 1000));

    alert(
      `✅ ${t(
        "PAYMENT_SUCCESS"
      )}\n\nCard: ${cardNumber}\nExpiry: ${expiry}\nCVC: ${cvc}`
    );

    setIsSubmitting(false);
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setErrors({});
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-[-webkit-fill-available]">
      <h2 className="text-lg font-semibold">{t("TITLE")}</h2>
      {/* Номер карты */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          {t("CARD_NUMBER")}
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          className={`p-2 border rounded w-full focus:outline-none ${
            errors.cardNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.cardNumber && (
          <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
        )}
      </div>

      {/* Срок действия и CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("EXP_DATE")}
          </label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            className={`p-2 border rounded w-full focus:outline-none ${
              errors.expiry ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.expiry && (
            <p className="text-sm text-red-500 mt-1">{errors.expiry}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">{t("CODE")}</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
            maxLength={4}
            className={`p-2 border rounded w-full focus:outline-none ${
              errors.cvc ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cvc && (
            <p className="text-sm text-red-500 mt-1">{errors.cvc}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand text-white py-2 rounded w-full">
        {t("PAY_NOW")}
      </button>
    </form>
  );
}
