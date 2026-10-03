"use client";

import { KeyboardEvent, useId, useMemo, useRef, useState } from "react";
import { findProvinceExact, searchProvinces } from "@/lib/provinces";

/** Ô tìm tỉnh/thành: khách gõ để lọc, chỉ nhận giá trị chọn từ danh sách. */
export default function ProvinceSelect({
  name,
  placeholder,
  className,
}: {
  name: string;
  placeholder: string;
  className: string;
}) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const matches = useMemo(() => searchProvinces(query), [query]);

  function choose(province: string) {
    setSelected(province);
    setQuery(province);
    setOpen(false);
  }

  function moveActive(next: number) {
    setActive(next);
    listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (matches.length === 0) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      moveActive((active + step + matches.length) % matches.length);
    } else if (e.key === "Enter" && open) {
      // Chặn submit form khi khách đang chọn tỉnh trong danh sách
      e.preventDefault();
      if (matches[active]) choose(matches[active].name);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // Rời ô mà chưa bấm chọn: nhận nếu gõ đúng tên tỉnh, còn lại xoá để khách phải chọn từ danh sách
  function handleBlur() {
    setOpen(false);
    if (selected && query === selected) return;
    const exact = findProvinceExact(query);
    if (exact) choose(exact);
    else {
      setSelected("");
      setQuery("");
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={selected} />
      <div className="relative">
        <input
          id={`${name}-search`}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && matches[active] ? `${listId}-${active}` : undefined
          }
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected("");
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} pr-10`}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className="mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {matches.length === 0 ? (
            <li className="px-4 py-2 text-sm text-gray-500">
              Không tìm thấy tỉnh/thành phù hợp
            </li>
          ) : (
            matches.map((m, i) => (
              <li
                key={m.name}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={m.name === selected}
                // mousedown thay vì click để chọn được trước khi input bị blur
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(m.name);
                }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-4 py-2 text-[15px] font-medium text-navy ${i === active ? "bg-gold/15" : ""}`}
              >
                {m.name}
                {m.formerly && <span className="font-normal text-gray-500"> (gồm {m.formerly} cũ)</span>}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
