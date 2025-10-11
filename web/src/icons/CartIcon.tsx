'use client';
import { useCart } from '@/lib/cart/store';
import { usePathname } from 'next/navigation';

export default function CartIcon() {
  const { items } = useCart();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const count = items.reduce((a, i) => a + i.qty, 0);
  return (
    <a href={`/${locale}/cart`} className="relative px-3 py-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.667 21.3333L22.2938 20.3644C25.9317 20.0613 26.7485 19.2667 27.1516 15.6385L28.0003 8"
          stroke="#565656"
        />
        <path
          d="M8 8L29.3333 8"
          stroke="#565656"
        />
        <circle
          cx="8.00065"
          cy="26.6667"
          r="2.66667"
          stroke="#565656"
        />
        <circle
          cx="22.6667"
          cy="26.6667"
          r="2.66667"
          stroke="#565656"
        />
        <path
          d="M10.6667 26.6667L20 26.6667"
          stroke="#565656"
        />
        <path
          d="M2.66699 2.66675H3.955C5.21457 2.66675 6.31251 3.49954 6.618 4.68665L10.585 20.1021C10.7855 20.8811 10.6139 21.7064 10.118 22.3488L8.84317 24.0001"
          stroke="#565656"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-[-4px] -right-[-5px] w-5 h-5 bg-brand text-white text-xs rounded-full grid place-items-center">
          {count}
        </span>
      )}
    </a>
  );
}