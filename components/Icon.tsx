type IconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, JSX.Element> = {
  "map-pin": (
    <>
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shield: (
    <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z" />
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M19.5 19v.5A3.5 3.5 0 0 1 16 23h-2" />
    </>
  ),
  "box-alert": (
    <>
      <path d="M3.3 7 12 3l8.7 4-8.7 4-8.7-4Z" />
      <path d="M3.3 7v10L12 21l8.7-4V7" />
      <path d="M12 11v4" />
      <path d="M12 17.5v.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  star: (
    <path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8l-6.3 3.3 1.2-6.9-5-4.9 7-1L12 2Z" />
  ),
  invoice: (
    <>
      <path d="M6 2h9l3 3v17H6Z" />
      <path d="M15 2v3h3" />
      <path d="M9 12h6M9 16h6M9 8h3" />
    </>
  ),
  box: (
    <>
      <path d="M3.3 7 12 3l8.7 4-8.7 4-8.7-4Z" />
      <path d="M3.3 7v10L12 21l8.7-4V7" />
      <path d="M12 11v10" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.3c1.1.4 2.3.6 3.5.6a1.5 1.5 0 0 1 1.5 1.5V21a1.5 1.5 0 0 1-1.5 1.5C10.4 22.5 1.5 13.6 1.5 2.5A1.5 1.5 0 0 1 3 1h4a1.5 1.5 0 0 1 1.5 1.5c0 1.2.2 2.4.6 3.5.2.5.1 1.2-.3 1.6L6.6 10.8Z" />
  ),
  laptop: (
    <>
      <rect x="3.5" y="4" width="17" height="11" rx="1.5" />
      <path d="M1.5 19.5h21L21 18H3l-1.5 1.5Z" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  machine: (
    <>
      <rect x="3" y="5" width="12" height="9" rx="1" />
      <path d="M15 8h3l3 3v3h-6" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  "map-vn": (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z" />
      <path d="M9 12l1.5 2L15 9" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  package: (
    <>
      <path d="M3.3 7 12 3l8.7 4-8.7 4-8.7-4Z" />
      <path d="M3.3 7v10L12 21l8.7-4V7" />
      <path d="M7.5 5 16.5 9" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4" />
      <path d="M12 13v3M9 20h6M10 20v-2h4v2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </>
  ),
  envelope: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export default function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const path = paths[name] ?? paths["box"];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
