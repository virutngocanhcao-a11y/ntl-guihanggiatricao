"use client";

import { useEffect, useState } from "react";
import { LandingContent } from "@/lib/content-schema";
import { defaultContent } from "@/lib/default-content";
import { SectionCard, TextField, TextAreaField } from "@/components/admin/Fields";
import ImageUploader from "@/components/admin/ImageUploader";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function AdminDashboard() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Không tải được nội dung.");
        }
        return res.json();
      })
      .then((data) => setContent(data))
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : "Lỗi tải nội dung.");
        setContent(defaultContent);
      });
  }, []);

  async function handleSave() {
    if (!content) return;
    setSaveState("saving");
    setSaveError("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Lưu thất bại.");
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Lưu thất bại.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  if (!content) {
    return <div className="p-10 text-sm text-gray-500">Đang tải...</div>;
  }

  const set = <K extends keyof LandingContent>(key: K, value: LandingContent[K]) =>
    setContent((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-bold text-navy">Quản trị nội dung Landing Page</h1>
          {loadError && <p className="text-xs text-red-600">{loadError}</p>}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-navy hover:bg-gray-50"
          >
            Xem trang →
          </a>
          <button
            onClick={handleSave}
            disabled={saveState === "saving"}
            className="rounded-md bg-gold px-4 py-2 text-xs font-bold text-navy-dark hover:bg-gold-light disabled:opacity-60"
          >
            {saveState === "saving" ? "Đang lưu..." : "Lưu tất cả"}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {saveState === "saved" && (
        <p className="px-6 pt-4 text-sm font-medium text-green-600">Đã lưu thành công.</p>
      )}
      {saveState === "error" && <p className="px-6 pt-4 text-sm text-red-600">{saveError}</p>}

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-6">
        <SectionCard title="Cài đặt chung">
          <div className="grid grid-cols-2 gap-4">
            <ImageUploader
              label="Logo thương hiệu"
              value={content.global?.logoImage || ""}
              onChange={(url) => set("global", { ...content.global, logoImage: url })}
            />
            <ImageUploader
              label="Favicon (Icon tab trình duyệt)"
              value={content.global?.faviconImage || ""}
              onChange={(url) => set("global", { ...content.global, faviconImage: url })}
            />
          </div>
        </SectionCard>

        <SectionCard title="Hero banner">
          <TextField
            label="Dòng tiêu đề 1"
            value={content.hero.titleLine1}
            onChange={(v) => set("hero", { ...content.hero, titleLine1: v })}
          />
          <TextField
            label="Dòng tiêu đề 2 (màu vàng)"
            value={content.hero.titleLine2}
            onChange={(v) => set("hero", { ...content.hero, titleLine2: v })}
          />
          <TextField
            label="Dòng tiêu đề 3"
            value={content.hero.titleLine3}
            onChange={(v) => set("hero", { ...content.hero, titleLine3: v })}
          />
          <TextAreaField
            label="Mô tả ngắn"
            value={content.hero.subtitle}
            onChange={(v) => set("hero", { ...content.hero, subtitle: v })}
          />
          <ImageUploader
            label="Ảnh hero banner"
            value={content.hero.heroImage}
            onChange={(url) => set("hero", { ...content.hero, heroImage: url })}
          />
          <div className="grid grid-cols-3 gap-3">
            {content.hero.badges.map((badge, i) => (
              <TextField
                key={i}
                label={`Badge ${i + 1}`}
                value={badge.label}
                onChange={(v) => {
                  const badges = [...content.hero.badges];
                  badges[i] = { ...badges[i], label: v };
                  set("hero", { ...content.hero, badges });
                }}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Điểm khó khăn (Pain points)">
          <TextField
            label="Tiêu đề section"
            value={content.painPointsIntro}
            onChange={(v) => set("painPointsIntro", v)}
          />
          {content.painPoints.map((item, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
              <TextField
                label={`Tiêu đề ${i + 1}`}
                value={item.title}
                onChange={(v) => {
                  const arr = [...content.painPoints];
                  arr[i] = { ...arr[i], title: v };
                  set("painPoints", arr);
                }}
              />
              <TextAreaField
                label={`Mô tả ${i + 1}`}
                rows={2}
                value={item.desc}
                onChange={(v) => {
                  const arr = [...content.painPoints];
                  arr[i] = { ...arr[i], desc: v };
                  set("painPoints", arr);
                }}
              />
            </div>
          ))}
          <TextField
            label="Ghi chú banner (dưới các pain points)"
            value={content.bannerNote}
            onChange={(v) => set("bannerNote", v)}
          />
        </SectionCard>

        <SectionCard title="Nhóm mặt hàng">
          <TextField
            label="Tiêu đề section"
            value={content.productCategoriesIntro}
            onChange={(v) => set("productCategoriesIntro", v)}
          />
          {content.productCategories.map((item, i) => (
            <div key={i} className="grid items-end gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
              <TextField
                label={`Tên nhóm ${i + 1}`}
                value={item.title}
                onChange={(v) => {
                  const arr = [...content.productCategories];
                  arr[i] = { ...arr[i], title: v };
                  set("productCategories", arr);
                }}
              />
              <ImageUploader
                label={`Ảnh ${i + 1}`}
                value={item.image}
                onChange={(url) => {
                  const arr = [...content.productCategories];
                  arr[i] = { ...arr[i], image: url };
                  set("productCategories", arr);
                }}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Quy trình (5 bước)">
          <TextField
            label="Tiêu đề section"
            value={content.processIntro}
            onChange={(v) => set("processIntro", v)}
          />
          {content.processSteps.map((item, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
              <TextField
                label={`Tiêu đề bước ${item.number}`}
                value={item.title}
                onChange={(v) => {
                  const arr = [...content.processSteps];
                  arr[i] = { ...arr[i], title: v };
                  set("processSteps", arr);
                }}
              />
              <TextAreaField
                label={`Mô tả bước ${item.number}`}
                rows={2}
                value={item.desc}
                onChange={(v) => {
                  const arr = [...content.processSteps];
                  arr[i] = { ...arr[i], desc: v };
                  set("processSteps", arr);
                }}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Vì sao chọn NTL">
          <TextField
            label="Tiêu đề section"
            value={content.whyChooseUsIntro}
            onChange={(v) => set("whyChooseUsIntro", v)}
          />
          {content.whyChooseUs.map((item, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
              <TextField
                label={`Tiêu đề ${i + 1}`}
                value={item.title}
                onChange={(v) => {
                  const arr = [...content.whyChooseUs];
                  arr[i] = { ...arr[i], title: v };
                  set("whyChooseUs", arr);
                }}
              />
              <TextAreaField
                label={`Mô tả ${i + 1}`}
                rows={2}
                value={item.desc}
                onChange={(v) => {
                  const arr = [...content.whyChooseUs];
                  arr[i] = { ...arr[i], desc: v };
                  set("whyChooseUs", arr);
                }}
              />
            </div>
          ))}
          <TextField label="Câu quote" value={content.quote} onChange={(v) => set("quote", v)} />
        </SectionCard>

        <SectionCard title="Giải pháp theo nhóm hàng">
          <TextField
            label="Tiêu đề section"
            value={content.solutionsIntro}
            onChange={(v) => set("solutionsIntro", v)}
          />
          {content.solutionsByCategory.map((item, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-gray-100 p-3">
              <div className="grid items-end gap-3 sm:grid-cols-2">
                <TextField
                  label={`Tên nhóm ${i + 1}`}
                  value={item.title}
                  onChange={(v) => {
                    const arr = [...content.solutionsByCategory];
                    arr[i] = { ...arr[i], title: v };
                    set("solutionsByCategory", arr);
                  }}
                />
                <ImageUploader
                  label={`Ảnh ${i + 1}`}
                  value={item.image}
                  onChange={(url) => {
                    const arr = [...content.solutionsByCategory];
                    arr[i] = { ...arr[i], image: url };
                    set("solutionsByCategory", arr);
                  }}
                />
              </div>
              <TextAreaField
                label="Gạch đầu dòng (mỗi dòng 1 ý)"
                rows={4}
                value={item.bullets.join("\n")}
                onChange={(v) => {
                  const arr = [...content.solutionsByCategory];
                  arr[i] = { ...arr[i], bullets: v.split("\n").filter(Boolean) };
                  set("solutionsByCategory", arr);
                }}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Câu hỏi thường gặp">
          <TextField label="Tiêu đề section" value={content.faqIntro} onChange={(v) => set("faqIntro", v)} />
          {content.faq.map((item, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-gray-100 p-3">
              <TextField
                label={`Câu hỏi ${i + 1}`}
                value={item.question}
                onChange={(v) => {
                  const arr = [...content.faq];
                  arr[i] = { ...arr[i], question: v };
                  set("faq", arr);
                }}
              />
              <TextAreaField
                label={`Trả lời ${i + 1}`}
                rows={2}
                value={item.answer}
                onChange={(v) => {
                  const arr = [...content.faq];
                  arr[i] = { ...arr[i], answer: v };
                  set("faq", arr);
                }}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="CTA cuối trang">
          <TextField
            label="Dòng 1"
            value={content.ctaBanner.titleLine1}
            onChange={(v) => set("ctaBanner", { ...content.ctaBanner, titleLine1: v })}
          />
          <TextField
            label="Dòng 2 (màu vàng)"
            value={content.ctaBanner.titleLine2}
            onChange={(v) => set("ctaBanner", { ...content.ctaBanner, titleLine2: v })}
          />
        </SectionCard>

        <SectionCard title="Footer">
          <TextField
            label="Tên công ty"
            value={content.footer.companyName}
            onChange={(v) => set("footer", { ...content.footer, companyName: v })}
          />
          <TextField
            label="Slogan"
            value={content.footer.tagline}
            onChange={(v) => set("footer", { ...content.footer, tagline: v })}
          />
          <TextField
            label="Hotline"
            value={content.footer.hotline}
            onChange={(v) => set("footer", { ...content.footer, hotline: v })}
          />
          <TextField
            label="Website"
            value={content.footer.website}
            onChange={(v) => set("footer", { ...content.footer, website: v })}
          />
          <TextField
            label="Email"
            value={content.footer.email}
            onChange={(v) => set("footer", { ...content.footer, email: v })}
          />
        </SectionCard>
      </main>
    </div>
  );
}
