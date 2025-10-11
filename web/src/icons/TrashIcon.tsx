import React from "react";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

export default function TrashIcon({
  width = 25,
  height = 25,
  color = "#565656",
  className,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M20 6L19.3803 16.0251C19.2219 18.5864 19.1428 19.8671 18.5008 20.7879C18.1833 21.2431 17.7747 21.6273 17.3007 21.916C16.3421 22.5 15.059 22.5 12.4927 22.5C9.92312 22.5 8.6383 22.5 7.67905 21.9149C7.2048 21.6257 6.796 21.2408 6.47868 20.7848C5.83688 19.8626 5.75945 18.5801 5.60461 16.0152L5 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 6H21.5M16.5557 6L15.8731 4.59173C15.4196 3.65626 15.1928 3.18852 14.8017 2.89681C14.715 2.8321 14.6231 2.77454 14.527 2.7247C14.0939 2.5 13.5741 2.5 12.5345 2.5C11.4688 2.5 10.936 2.5 10.4957 2.73412C10.3981 2.78601 10.305 2.8459 10.2173 2.91317C9.82164 3.2167 9.60063 3.70155 9.15861 4.67126L8.55292 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 17L10 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 17L15 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
