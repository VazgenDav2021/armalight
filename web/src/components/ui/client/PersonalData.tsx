"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface IPersonalDataProps {
  personalData: any | null;
  discount: number | undefined;
}

export default function PersonalData({
  personalData,
  discount,
}: IPersonalDataProps) {
  const t = useTranslations("account.PERSONAL_DATA");

  const [formData, setFormData] = useState({
    firstName: personalData?.firstName || "",
    lastName: personalData?.lastName || "",
    email: personalData?.email || "",
    phone: personalData?.phone || "",
    address: personalData?.address || "",
    city: personalData?.city || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    // Проверяем, изменились ли данные
    const changed =
      formData.firstName !== (personalData?.firstName || "") ||
      formData.lastName !== (personalData?.lastName || "") ||
      formData.email !== (personalData?.email || "") ||
      formData.phone !== (personalData?.phone || "") ||
      formData.address !== (personalData?.address || "") ||
      formData.city !== (personalData?.city || "");
    setIsChanged(changed);
  }, [formData, personalData]);

  const onChange = (field: any, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onCancel = () => {
    if (!isChanged) return;
    setFormData({
      firstName: personalData?.firstName || "",
      lastName: personalData?.lastName || "",
      email: personalData?.email || "",
      phone: personalData?.phone || "",
      address: personalData?.address || "",
      city: personalData?.city || "",
    });
    setMessage(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      setMessage("Данные успешно обновлены!");
    } catch (err: any) {
      setMessage(err.message || "Ошибка при обновлении данных");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="personal-data-title" className="w-[500px]">
      <h2
        id="personal-data-title"
        className="text-[24px] leading-[150%] font-normal text-[#565656] mb-6">
        {t("title")}
      </h2>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-normal text-[#565656] mb-1">
            {t("name")}
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder={t("name")}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-normal text-[#565656] mb-1">
            {t("surName")}
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder={t("surName")}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-normal text-[#565656] mb-1">
            {t("email")}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="name@example.com"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-normal text-[#565656] mb-1">
            {t("phone")}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+374 ..."
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-normal text-[#565656] mb-1">
            {t("address")}
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder={t("address")}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-normal text-[#565656] mb-1">
            {t("discount")}
          </label>
          <input
            type="text"
            disabled
            value={discount ?? ""}
            className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={!isChanged}
            className={`w-full px-4 py-2 rounded-md border border-gray-300 text-[#565656] text-sm font-medium transition ${
              !isChanged ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}>
            {t("cancel")}
          </button>
          <button
            disabled={loading || !isChanged}
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-brand text-white text-sm font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2 transition disabled:opacity-70">
            {t("save")}
          </button>
        </div>
      </form>
    </section>
  );
}
