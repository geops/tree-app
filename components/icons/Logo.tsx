function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M70.56 60.39l-.4 2.61-6.46 43.3a55.78 55.78 0 0 1-32.74-50.69C30.96 25.13 56.03.03 86.5 0c.32 0-41.93 0-41.93 36.38 0 22.68 25.42 23.98 25.98 24.01h.01z"
        fill="url(#_Linear1)"
        fillRule="nonzero"
        transform="translate(-222.89) scale(7.1994)"
      />
      <path
        d="M509.72 433.19c4.4 0 187.19-9.58 187.19-172.79C696.9 25.77 458.83 2.52 408.93 0h-16.56C345.87 2.3 98 24.55 98 261.91 98 425.2 280.71 434.7 285.18 434.7a173.4 173.4 0 0 1-62.86-127v-.22a5.53 5.53 0 0 1 5.76-5.46 139.71 139.71 0 0 1 98.5 54.35c12 15.05 21.7 31.8 28.79 49.68a22.37 22.37 0 0 1 1.44 11.3l-5.26 51.84-34.12 322.74c20.37 4.32 41.05 7 61.84 8.07h20.38c27.6.1 55.15-2.6 82.21-8.07l-38.23-323.46-15.62-131.54a24.2 24.2 0 0 1 3.39-15.4 223.3 223.3 0 0 1 16.41-23.55c21.02-26.06 57.6-59.4 107.2-60.62a5.7 5.7 0 0 1 5.18 3.39 167.67 167.67 0 0 1 10.73 58.6 174.84 174.84 0 0 1-61.2 133.84zm-137.8-160.04l-5.6 56.3-.58 5.83a81.98 81.98 0 0 0-27.07-30.03c-32.83-22.75-76.1-29.22-108-30.3a5.52 5.52 0 0 1-5.25-6.34c16.63-92.87 107.92-127.14 149.24-138.08a8.03 8.03 0 0 1 10 8.64l-12.73 133.98h-.01zm164.44-59.62c-31.75 3.53-81.06 15.2-115.98 52.34l-13.39-126.63a8.07 8.07 0 0 1 9.94-8.71c30.8 7.77 87.83 27.86 123.32 74.37.7.93 1.1 2.08 1.1 3.25 0 2.8-2.2 5.17-4.99 5.38z"
        fill="#01837a"
        fillRule="nonzero"
      />
      <path
        d="M101.75 60.17l.4 2.62 7 43.4a55.67 55.67 0 0 0 32.9-50.69C142.05 25.05 117 0 86.55 0h-.04c-.01 0 41.24-.22 41.24 36.16 0 22.68-25.39 23.98-26 24.01z"
        fill="url(#_Linear2)"
        fillRule="nonzero"
        transform="translate(-222.89) scale(7.1994)"
      />
      <defs>
        <linearGradient
          gradientTransform="rotate(-90 82.51 23.8) scale(106.31)"
          gradientUnits="userSpaceOnUse"
          id="_Linear1"
          x2="1"
        >
          <stop offset="0" stopColor="#d6c169" />
          <stop offset="1" stopColor="#739d75" />
        </linearGradient>
        <linearGradient
          gradientTransform="rotate(-90 110.25 -4.06) scale(106.19)"
          gradientUnits="userSpaceOnUse"
          id="_Linear2"
          x2="1"
        >
          <stop offset="0" stopColor="#d6c169" />
          <stop offset="1" stopColor="#739d75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Logo;
