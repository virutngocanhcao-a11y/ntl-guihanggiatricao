/**
 * Tiêu đề dùng chung cho mọi section.
 *
 * Thang chữ được chọn cho tiếng Việt: leading rộng (1.3) để dấu thanh
 * không dính vào dòng trên, font-bold thay vì extrabold để tạo tương phản
 * với tiêu đề card bên dưới, và không dùng whitespace-nowrap để chữ tự
 * xuống dòng thay vì tràn sát mép.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  highlight,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Cụm từ trong title được gạch chân màu vàng */
  highlight?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} max-w-3xl`}>
      {eyebrow && (
        <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b37700]">
          {eyebrow}
        </span>
      )}

      <h2 className="text-[26px] font-bold leading-[1.3] tracking-[-0.01em] text-[#1a1a1a] md:text-[32px] lg:text-[36px]">
        {renderTitle(title, highlight)}
      </h2>

      {subtitle && (
        <p className="mt-4 text-[15px] leading-[1.7] text-gray-500 md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function renderTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) return title;

  const [before, ...rest] = title.split(highlight);
  return (
    <>
      {before}
      <span className="relative inline-block">
        <span className="relative z-10">{highlight}</span>
        <span className="absolute bottom-0.5 left-0 right-0 -z-0 h-[0.32em] rounded-sm bg-[#fdd800]/60" />
      </span>
      {rest.join(highlight)}
    </>
  );
}
