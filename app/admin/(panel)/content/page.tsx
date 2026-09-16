"use client";

import { useEffect, useState } from "react";
import { LandingContent } from "@/lib/content-schema";
import { defaultContent } from "@/lib/default-content";
import { applyDefaultCopy } from "@/lib/apply-default-copy";
import { ComponentCard, ItemGroup, TextAreaField, TextField } from "@/components/admin/Fields";
import ImageUploader from "@/components/admin/ImageUploader";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb";
import { sectionLabel } from "@/components/admin/nav";
import { buttonOutlineClass, buttonPrimaryClass } from "@/components/admin/ui";
import { IconCheck } from "@/components/admin/icons";

type SaveState = "idle" | "saving" | "saved" | "error";

type ArrayKey = Extract<
  { [K in keyof LandingContent]: LandingContent[K] extends unknown[] ? K : never }[keyof LandingContent],
  keyof LandingContent
>;
type ItemOf<K extends ArrayKey> = LandingContent[K] extends (infer T)[] ? T : never;

export default function ContentPage() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [dirty, setDirty] = useState(false);

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

  // Cảnh báo khi rời trang mà chưa lưu
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Trang render xong mới có các card, nên cuộn tới neo (#hero...) sau khi tải nội dung
  useEffect(() => {
    if (!content || !window.location.hash) return;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [content]);

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
      setDirty(false);
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2500);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Lưu thất bại.");
    }
  }

  function handleLoadB2bCopy() {
    const ok = window.confirm(
      [
        "Điền nội dung B2B mới vào form?",
        "Các ô chữ ở Hero (mô tả), Điểm khó khăn, Nhóm mặt hàng (tiêu đề), Quy trình, Vì sao chọn NTL, Giải pháp và FAQ sẽ được thay bằng nội dung mới. Ảnh, icon, logo và footer giữ nguyên.",
        "Chưa có gì được lưu cho đến khi bạn bấm “Lưu thay đổi”.",
      ].join("\n\n")
    );
    if (!ok) return;
    setContent((prev) => (prev ? applyDefaultCopy(prev) : prev));
    setDirty(true);
    setSaveState("idle");
  }

  if (!content) {
    return <div className="py-20 text-center text-sm text-neutral-500">Đang tải nội dung...</div>;
  }

  const set = <K extends keyof LandingContent>(key: K, value: LandingContent[K]) => {
    setContent((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDirty(true);
  };

  const updateItem = <K extends ArrayKey>(key: K, index: number, patch: Partial<ItemOf<K>>) => {
    setContent((prev) => {
      if (!prev) return prev;
      // TypeScript không suy ra được kiểu phần tử qua key generic, nên ép về object thường
      const items = [...(prev[key] as unknown as Record<string, unknown>[])];
      items[index] = { ...items[index], ...(patch as Record<string, unknown>) };
      return { ...prev, [key]: items } as LandingContent;
    });
    setDirty(true);
  };

  return (
    <>
      <div className="sticky top-16 z-20 -mx-4 -mt-4 mb-6 border-b border-neutral-200 bg-neutral-50/95 px-4 py-4 backdrop-blur md:-mx-6 md:-mt-6 md:px-6">
        <PageBreadcrumb title="Nội dung landing page" className="">
          {saveState === "saved" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <IconCheck className="h-4 w-4" />
              Đã lưu
            </span>
          )}
          {saveState === "error" && <span className="text-sm text-red-600">{saveError}</span>}
          {dirty && saveState !== "saving" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-amber-600">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Có thay đổi chưa lưu
            </span>
          )}
          <button type="button" onClick={handleLoadB2bCopy} className={buttonOutlineClass}>
            Nạp nội dung B2B mới
          </button>
          <button type="button" onClick={handleSave} disabled={saveState === "saving"} className={buttonPrimaryClass}>
            {saveState === "saving" ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </PageBreadcrumb>
      </div>

      {loadError && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {loadError} Đang hiển thị nội dung mặc định.
        </div>
      )}

      <div className="space-y-6">
        <ComponentCard id="cai-dat-chung" title={sectionLabel("cai-dat-chung")} description="Logo và icon hiển thị trên tab trình duyệt.">
          <div className="grid gap-5 lg:grid-cols-2">
            <ImageUploader
              label="Logo thương hiệu"
              value={content.global?.logoImage || ""}
              onChange={(url) => set("global", { ...content.global, logoImage: url })}
            />
            <ImageUploader
              label="Favicon (icon tab trình duyệt)"
              value={content.global?.faviconImage || ""}
              onChange={(url) => set("global", { ...content.global, faviconImage: url })}
            />
          </div>
        </ComponentCard>

        <ComponentCard id="hero" title={sectionLabel("hero")} description="Phần đầu tiên khách nhìn thấy khi vào trang.">
          <div className="grid gap-5 lg:grid-cols-3">
            <TextField label="Dòng tiêu đề 1" value={content.hero.titleLine1} onChange={(v) => set("hero", { ...content.hero, titleLine1: v })} />
            <TextField label="Dòng tiêu đề 2 (nền vàng)" value={content.hero.titleLine2} onChange={(v) => set("hero", { ...content.hero, titleLine2: v })} />
            <TextField label="Dòng tiêu đề 3" value={content.hero.titleLine3} onChange={(v) => set("hero", { ...content.hero, titleLine3: v })} />
          </div>
          <TextAreaField label="Mô tả ngắn" value={content.hero.subtitle} onChange={(v) => set("hero", { ...content.hero, subtitle: v })} />
          <ImageUploader label="Ảnh hero banner" value={content.hero.heroImage} onChange={(url) => set("hero", { ...content.hero, heroImage: url })} />
          <div className="grid gap-5 lg:grid-cols-3">
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
        </ComponentCard>

        <ComponentCard id="pain-points" title={sectionLabel("pain-points")}>
          <TextField label="Tiêu đề section" value={content.painPointsIntro} onChange={(v) => set("painPointsIntro", v)} />
          <div className="grid gap-4 lg:grid-cols-2">
            {content.painPoints.map((item, i) => (
              <ItemGroup key={i} label={`Khó khăn ${i + 1}`}>
                <TextField label="Tiêu đề" value={item.title} onChange={(v) => updateItem("painPoints", i, { title: v })} />
                <TextAreaField label="Mô tả" rows={2} value={item.desc} onChange={(v) => updateItem("painPoints", i, { desc: v })} />
              </ItemGroup>
            ))}
          </div>
          <TextField label="Ghi chú banner (dưới các khó khăn)" value={content.bannerNote} onChange={(v) => set("bannerNote", v)} />
        </ComponentCard>

        <ComponentCard id="nhom-hang" title={sectionLabel("nhom-hang")}>
          <TextField label="Tiêu đề section" value={content.productCategoriesIntro} onChange={(v) => set("productCategoriesIntro", v)} />
          <div className="grid gap-4 lg:grid-cols-2">
            {content.productCategories.map((item, i) => (
              <ItemGroup key={i} label={`Nhóm ${i + 1}`}>
                <TextField label="Tên nhóm" value={item.title} onChange={(v) => updateItem("productCategories", i, { title: v })} />
                <ImageUploader label="Ảnh" value={item.image} onChange={(url) => updateItem("productCategories", i, { image: url })} />
              </ItemGroup>
            ))}
          </div>
        </ComponentCard>

        <ComponentCard id="quy-trinh" title={sectionLabel("quy-trinh")}>
          <TextField label="Tiêu đề section" value={content.processIntro} onChange={(v) => set("processIntro", v)} />
          <div className="grid gap-4 lg:grid-cols-2">
            {content.processSteps.map((item, i) => (
              <ItemGroup key={i} label={`Bước ${item.number}`}>
                <TextField label="Tiêu đề" value={item.title} onChange={(v) => updateItem("processSteps", i, { title: v })} />
                <TextAreaField label="Mô tả" rows={2} value={item.desc} onChange={(v) => updateItem("processSteps", i, { desc: v })} />
              </ItemGroup>
            ))}
          </div>
        </ComponentCard>

        <ComponentCard id="vi-sao" title={sectionLabel("vi-sao")}>
          <TextField label="Tiêu đề section" value={content.whyChooseUsIntro} onChange={(v) => set("whyChooseUsIntro", v)} />
          <div className="grid gap-4 lg:grid-cols-2">
            {content.whyChooseUs.map((item, i) => (
              <ItemGroup key={i} label={`Lý do ${i + 1}`}>
                <TextField label="Tiêu đề" value={item.title} onChange={(v) => updateItem("whyChooseUs", i, { title: v })} />
                <TextAreaField label="Mô tả" rows={2} value={item.desc} onChange={(v) => updateItem("whyChooseUs", i, { desc: v })} />
              </ItemGroup>
            ))}
          </div>
          <TextField label="Câu quote" value={content.quote} onChange={(v) => set("quote", v)} />
        </ComponentCard>

        <ComponentCard id="giai-phap" title={sectionLabel("giai-phap")}>
          <TextField label="Tiêu đề section" value={content.solutionsIntro} onChange={(v) => set("solutionsIntro", v)} />
          <div className="grid gap-4 lg:grid-cols-2">
            {content.solutionsByCategory.map((item, i) => (
              <ItemGroup key={i} label={`Nhóm ${i + 1}`}>
                <TextField label="Tên nhóm" value={item.title} onChange={(v) => updateItem("solutionsByCategory", i, { title: v })} />
                <ImageUploader label="Ảnh" value={item.image} onChange={(url) => updateItem("solutionsByCategory", i, { image: url })} />
                <TextAreaField
                  label="Gạch đầu dòng (không bắt buộc, mỗi dòng một ý)"
                  rows={3}
                  value={(item.bullets || []).join("\n")}
                  onChange={(v) => updateItem("solutionsByCategory", i, { bullets: v.split("\n").filter(Boolean) })}
                />
              </ItemGroup>
            ))}
          </div>
        </ComponentCard>

        <ComponentCard id="faq" title={sectionLabel("faq")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <TextField label="Tiêu đề section" value={content.faqIntro} onChange={(v) => set("faqIntro", v)} />
            <ImageUploader
              label="Ảnh minh hoạ tư vấn viên"
              value={content.faqImage || "/images/faq-illustration.jpg"}
              onChange={(url) => set("faqImage", url)}
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {content.faq.map((item, i) => (
              <ItemGroup key={i} label={`Câu hỏi ${i + 1}`}>
                <TextField label="Câu hỏi" value={item.question} onChange={(v) => updateItem("faq", i, { question: v })} />
                <TextAreaField label="Trả lời" rows={3} value={item.answer} onChange={(v) => updateItem("faq", i, { answer: v })} />
              </ItemGroup>
            ))}
          </div>
        </ComponentCard>

        <ComponentCard id="cta" title={sectionLabel("cta")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <TextField label="Slogan / dòng 1" value={content.ctaBanner.titleLine1} onChange={(v) => set("ctaBanner", { ...content.ctaBanner, titleLine1: v })} />
            <TextField label="Dòng 2 (không bắt buộc)" value={content.ctaBanner.titleLine2} onChange={(v) => set("ctaBanner", { ...content.ctaBanner, titleLine2: v })} />
          </div>
          <ImageUploader
            label="Ảnh xe tải / visual banner"
            value={content.ctaBanner.image || "/images/cta-truck.jpg"}
            onChange={(url) => set("ctaBanner", { ...content.ctaBanner, image: url })}
          />
        </ComponentCard>

        <ComponentCard id="footer" title={sectionLabel("footer")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <TextField label="Tên công ty" value={content.footer.companyName} onChange={(v) => set("footer", { ...content.footer, companyName: v })} />
            <TextField label="Slogan" value={content.footer.tagline} onChange={(v) => set("footer", { ...content.footer, tagline: v })} />
            <TextField label="Hotline" value={content.footer.hotline} onChange={(v) => set("footer", { ...content.footer, hotline: v })} />
            <TextField label="Website" value={content.footer.website} onChange={(v) => set("footer", { ...content.footer, website: v })} />
            <TextField label="Email" value={content.footer.email} onChange={(v) => set("footer", { ...content.footer, email: v })} />
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
