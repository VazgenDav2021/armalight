"use client";

import { Payment } from "@/lib/types";
import Image from "next/image";

interface BankCardsProps {
  payment: Payment | undefined;
}

export default function BankCards({ payment }: BankCardsProps) {
  return (
    <section className="w-full">
      <h2 className="text-[24px] leading-[150%] font-normal text-[#565656] mb-6">
        Банковские карты
      </h2>
      <div className="max-w-sm rounded-lg bg-white shadow py-8 px-6">
        <div className="flex items-center justify-between">
          <Image
            src="/common/visa.svg"
            alt="Visa"
            width={48}
            height={24}
            className="object-contain"
          />
          <span className="text-[12px] text-[#565656]">EXP 05/26</span>
        </div>

        <p className="font-bold text-[16px] text-[#565656] tracking-widest mt-8">
          **** **** **** 1234
        </p>

        <p className="text-[10px] uppercase text-[#565656] mt-2">
          Cardholder Name
        </p>
        <p className="text-[16px] text-[#565656] mt-0">Anna Harutyunyan</p>

        <button className="text-[#565656] py-2 text-sm font-medium transition">
          Удалить
        </button>
      </div>
    </section>
  );
}
