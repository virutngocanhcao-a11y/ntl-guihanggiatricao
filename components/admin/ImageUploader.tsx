"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconImage } from "./icons";
import { labelClass } from "./ui";

function fileNameOf(url: string): string {
  return url.split("?")[0].split("/").pop() || url;
}

export default function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload thất bại.");
      onChange(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex items-center gap-4 rounded-lg border border-dashed border-neutral-300 bg-white p-3">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-400">
          {value ? (
            // unoptimized vì URL có thể là ảnh đã upload lên R2 với domain bất kỳ
            <Image src={value} alt={label} fill className="object-cover" unoptimized />
          ) : (
            <IconImage className="h-6 w-6" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-neutral-700">{value ? fileNameOf(value) : "Chưa có ảnh"}</p>
          <p className="mt-0.5 text-xs text-neutral-400">PNG, JPG, WEBP hoặc SVG · tối đa 5MB</p>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-9 shrink-0 rounded-lg border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-700 shadow-theme-xs transition-colors hover:bg-neutral-50 disabled:opacity-60"
        >
          {uploading ? "Đang tải..." : "Chọn ảnh"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
