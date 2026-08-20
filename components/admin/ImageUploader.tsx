"use client";

import { useRef, useState } from "react";
import Image from "next/image";

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
      <label className="block text-xs font-medium text-gray-500">{label}</label>
      <div className="mt-1 flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
            {/* dùng img thường vì URL có thể là ảnh đã upload lên R2 với domain bất kỳ */}
            <Image src={value} alt={label} fill className="object-cover" unoptimized />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-md border border-dashed border-gray-300 bg-gray-50" />
        )}
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-navy hover:bg-gray-50 disabled:opacity-60"
          >
            {uploading ? "Đang tải lên..." : "Chọn ảnh"}
          </button>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
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
