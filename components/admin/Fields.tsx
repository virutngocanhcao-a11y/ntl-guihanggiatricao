"use client";

import { cardClass, inputClass, labelClass, textareaClass } from "./ui";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={textareaClass}
      />
    </label>
  );
}

/** Card chứa một khối nội dung, có id để sidebar nhảy tới. */
export function ComponentCard({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${cardClass} scroll-mt-40`}>
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="space-y-5 border-t border-gray-100 p-5 sm:p-6">{children}</div>
    </section>
  );
}

/** Nhóm các trường của một phần tử lặp lại (một bước, một câu hỏi...). */
export function ItemGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      {children}
    </div>
  );
}
