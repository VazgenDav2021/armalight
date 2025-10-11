"use client";

import React from "react";

type AvatarIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function AvatarIcon({
  size = 28,
  color = "#154444",
  className,
}: AvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
      <path
        d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
