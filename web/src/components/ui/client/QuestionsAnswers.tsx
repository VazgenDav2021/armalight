"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const QuestionsAnswers = () => {
  const t = useTranslations("home.QA");

  const questions = t.raw("CHILDREN") as { TITLE: string; TEXT: string }[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12">
      <div className="container max-w-[1220px] mx-auto grid md:grid-cols-2 gap-12 px-0">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">{t("TITLE")}</h2>
          <p className="text-gray-600 mb-6">{t("TEXT")}</p>
          <a
            href={t("BUTTON.URL")}
            className="px-6 py-3 bg-brand text-white rounded w-max">
            {t("BUTTON.TITLE")}
          </a>
        </div>
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="border rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium bg-white hover:bg-gray-50">
                <span>{q.TITLE}</span>
                <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="px-4 py-3 text-sm text-gray-600 bg-gray-50">
                  {q.TEXT}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionsAnswers;
