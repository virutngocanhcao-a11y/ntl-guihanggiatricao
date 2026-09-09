"use client";

import { useEffect, useState, useCallback } from "react";
import { LandingContent } from "@/lib/content-schema";
import { defaultContent } from "@/lib/default-content";
import { SectionCard, TextField, TextAreaField } from "@/components/admin/Fields";
import ImageUploader from "@/components/admin/ImageUploader";

type SaveState = "idle" | "saving" | "saved" | "error";
type Tab = "content" | "leads";

interface LeadItem {
  id: string;
  fullName: string;
  company: string;
  phone: string;
  cargoType: string;
  source: string;
  submittedAt: string;
}

interface LeadsResponse {
  leads: LeadItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [content, setContent] = useState<LandingContent | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  // Lead management state
  const [leadsData, setLeadsData] = useState<LeadsResponse | null>(null);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsPage, setLeadsPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(10);
  const [trafficCount, setTrafficCount] = useState<number | null>(null);

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

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch(`/api/leads?page=${leadsPage}&perPage=${leadsPerPage}`);
      if (res.ok) {
        const data = await res.json();
        setLeadsData(data);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    }
    setLeadsLoading(false);
  }, [leadsPage, leadsPerPage]);

  const fetchTraffic = useCallback(async () => {
    try {
      const res = await fetch("/api/traffic");
      if (res.ok) {
        const data = await res.json();
        setTrafficCount(data.count);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (activeTab === "leads") {
      fetchLeads();
      fetchTraffic();
    }
  }, [activeTab, fetchLeads, fetchTraffic]);

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
          <h1 className="text-lg font-bold text-navy">Quản trị Landing Page</h1>
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
          {activeTab === "content" && (
            <button
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="rounded-md bg-gold px-4 py-2 text-xs font-bold text-navy-dark hover:bg-gold-light disabled:opacity-60"
            >
              {saveState === "saving" ? "Đang lưu..." : "Lưu tất cả"}
            </button>
          )}
          <button
            onClick={handleLogout}
            className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 flex gap-0">
          <button
            onClick={() => setActiveTab("content")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "content"
                ? "border-[#fdd800] text-[#222222]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            📝 Nội dung
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "leads"
                ? "border-[#fdd800] text-[#222222]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            📋 Quản lý Lead
          </button>
        </div>
      </div>

      {saveState === "saved" && (
        <p className="px-6 pt-4 text-sm font-medium text-green-600 max-w-4xl mx-auto">Đã lưu thành công.</p>
      )}
      {saveState === "error" && <p className="px-6 pt-4 text-sm text-red-600 max-w-4xl mx-auto">{saveError}</p>}

      {/* CONTENT TAB */}
      {activeTab === "content" && (
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
            <TextField label="Dòng tiêu đề 1" value={content.hero.titleLine1} onChange={(v) => set("hero", { ...content.hero, titleLine1: v })} />
            <TextField label="Dòng tiêu đề 2 (màu vàng)" value={content.hero.titleLine2} onChange={(v) => set("hero", { ...content.hero, titleLine2: v })} />
            <TextField label="Dòng tiêu đề 3" value={content.hero.titleLine3} onChange={(v) => set("hero", { ...content.hero, titleLine3: v })} />
            <TextAreaField label="Mô tả ngắn" value={content.hero.subtitle} onChange={(v) => set("hero", { ...content.hero, subtitle: v })} />
            <ImageUploader label="Ảnh hero banner" value={content.hero.heroImage} onChange={(url) => set("hero", { ...content.hero, heroImage: url })} />
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
            <TextField label="Tiêu đề section" value={content.painPointsIntro} onChange={(v) => set("painPointsIntro", v)} />
            {content.painPoints.map((item, i) => (
              <div key={i} className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
                <TextField label={`Tiêu đề ${i + 1}`} value={item.title} onChange={(v) => { const arr = [...content.painPoints]; arr[i] = { ...arr[i], title: v }; set("painPoints", arr); }} />
                <TextAreaField label={`Mô tả ${i + 1}`} rows={2} value={item.desc} onChange={(v) => { const arr = [...content.painPoints]; arr[i] = { ...arr[i], desc: v }; set("painPoints", arr); }} />
              </div>
            ))}
            <TextField label="Ghi chú banner (dưới các pain points)" value={content.bannerNote} onChange={(v) => set("bannerNote", v)} />
          </SectionCard>

          <SectionCard title="Nhóm mặt hàng">
            <TextField label="Tiêu đề section" value={content.productCategoriesIntro} onChange={(v) => set("productCategoriesIntro", v)} />
            {content.productCategories.map((item, i) => (
              <div key={i} className="grid items-end gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
                <TextField label={`Tên nhóm ${i + 1}`} value={item.title} onChange={(v) => { const arr = [...content.productCategories]; arr[i] = { ...arr[i], title: v }; set("productCategories", arr); }} />
                <ImageUploader label={`Ảnh ${i + 1}`} value={item.image} onChange={(url) => { const arr = [...content.productCategories]; arr[i] = { ...arr[i], image: url }; set("productCategories", arr); }} />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Quy trình (5 bước)">
            <TextField label="Tiêu đề section" value={content.processIntro} onChange={(v) => set("processIntro", v)} />
            {content.processSteps.map((item, i) => (
              <div key={i} className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
                <TextField label={`Tiêu đề bước ${item.number}`} value={item.title} onChange={(v) => { const arr = [...content.processSteps]; arr[i] = { ...arr[i], title: v }; set("processSteps", arr); }} />
                <TextAreaField label={`Mô tả bước ${item.number}`} rows={2} value={item.desc} onChange={(v) => { const arr = [...content.processSteps]; arr[i] = { ...arr[i], desc: v }; set("processSteps", arr); }} />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Vì sao chọn NTL">
            <TextField label="Tiêu đề section" value={content.whyChooseUsIntro} onChange={(v) => set("whyChooseUsIntro", v)} />
            {content.whyChooseUs.map((item, i) => (
              <div key={i} className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-2">
                <TextField label={`Tiêu đề ${i + 1}`} value={item.title} onChange={(v) => { const arr = [...content.whyChooseUs]; arr[i] = { ...arr[i], title: v }; set("whyChooseUs", arr); }} />
                <TextAreaField label={`Mô tả ${i + 1}`} rows={2} value={item.desc} onChange={(v) => { const arr = [...content.whyChooseUs]; arr[i] = { ...arr[i], desc: v }; set("whyChooseUs", arr); }} />
              </div>
            ))}
            <TextField label="Câu quote" value={content.quote} onChange={(v) => set("quote", v)} />
          </SectionCard>

          <SectionCard title="Giải pháp theo nhóm hàng">
            <TextField label="Tiêu đề section" value={content.solutionsIntro} onChange={(v) => set("solutionsIntro", v)} />
            {content.solutionsByCategory.map((item, i) => (
              <div key={i} className="space-y-3 rounded-lg border border-gray-100 p-3">
                <div className="grid items-end gap-3 sm:grid-cols-2">
                  <TextField label={`Tên nhóm ${i + 1}`} value={item.title} onChange={(v) => { const arr = [...content.solutionsByCategory]; arr[i] = { ...arr[i], title: v }; set("solutionsByCategory", arr); }} />
                  <ImageUploader label={`Ảnh ${i + 1}`} value={item.image} onChange={(url) => { const arr = [...content.solutionsByCategory]; arr[i] = { ...arr[i], image: url }; set("solutionsByCategory", arr); }} />
                </div>
                <TextAreaField label="Gạch đầu dòng (không bắt buộc)" rows={3} value={(item.bullets || []).join("\n")} onChange={(v) => { const arr = [...content.solutionsByCategory]; arr[i] = { ...arr[i], bullets: v.split("\n").filter(Boolean) }; set("solutionsByCategory", arr); }} />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Câu hỏi thường gặp">
            <TextField label="Tiêu đề section" value={content.faqIntro} onChange={(v) => set("faqIntro", v)} />
            <ImageUploader
              label="Ảnh minh họa tư vấn viên FAQ"
              value={content.faqImage || "/images/faq-illustration.jpg"}
              onChange={(url) => set("faqImage", url)}
            />
            {content.faq.map((item, i) => (
              <div key={i} className="space-y-3 rounded-lg border border-gray-100 p-3">
                <TextField label={`Câu hỏi ${i + 1}`} value={item.question} onChange={(v) => { const arr = [...content.faq]; arr[i] = { ...arr[i], question: v }; set("faq", arr); }} />
                <TextAreaField label={`Trả lời ${i + 1}`} rows={2} value={item.answer} onChange={(v) => { const arr = [...content.faq]; arr[i] = { ...arr[i], answer: v }; set("faq", arr); }} />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="CTA cuối trang">
            <TextField label="Slogan / Dòng 1" value={content.ctaBanner.titleLine1} onChange={(v) => set("ctaBanner", { ...content.ctaBanner, titleLine1: v })} />
            <TextField label="Dòng 2 (không bắt buộc)" value={content.ctaBanner.titleLine2} onChange={(v) => set("ctaBanner", { ...content.ctaBanner, titleLine2: v })} />
            <ImageUploader
              label="Ảnh xe tải / visual CTA banner"
              value={content.ctaBanner.image || "/images/cta-truck.jpg"}
              onChange={(url) => set("ctaBanner", { ...content.ctaBanner, image: url })}
            />
          </SectionCard>

          <SectionCard title="Footer">
            <TextField label="Tên công ty" value={content.footer.companyName} onChange={(v) => set("footer", { ...content.footer, companyName: v })} />
            <TextField label="Slogan" value={content.footer.tagline} onChange={(v) => set("footer", { ...content.footer, tagline: v })} />
            <TextField label="Hotline" value={content.footer.hotline} onChange={(v) => set("footer", { ...content.footer, hotline: v })} />
            <TextField label="Website" value={content.footer.website} onChange={(v) => set("footer", { ...content.footer, website: v })} />
            <TextField label="Email" value={content.footer.email} onChange={(v) => set("footer", { ...content.footer, email: v })} />
          </SectionCard>
        </main>
      )}

      {/* LEADS TAB */}
      {activeTab === "leads" && (
        <main className="mx-auto max-w-5xl px-6 py-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng Lead</p>
              <p className="mt-1 text-3xl font-bold text-[#222222]">{leadsData?.total ?? "—"}</p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt truy cập</p>
              <p className="mt-1 text-3xl font-bold text-[#222222]">{trafficCount !== null ? trafficCount.toLocaleString("vi-VN") : "—"}</p>
            </div>
          </div>

          {/* Per Page Selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hiển thị</span>
              {[10, 20, 50].map((n) => (
                <button
                  key={n}
                  onClick={() => { setLeadsPerPage(n); setLeadsPage(1); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    leadsPerPage === n
                      ? "bg-[#fdd800] border-[#fdd800] text-[#222222]"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="text-sm text-gray-600">lead / trang</span>
            </div>
            <button
              onClick={fetchLeads}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              🔄 Làm mới
            </button>
          </div>

          {/* Leads Table */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {leadsLoading ? (
              <div className="p-10 text-center text-sm text-gray-500">Đang tải danh sách lead...</div>
            ) : !leadsData || leadsData.leads.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-500">Chưa có lead nào.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-12">STT</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Họ tên</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SĐT</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Công ty</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Loại hàng</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsData.leads.map((lead, i) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 font-medium">{(leadsData.page - 1) * leadsData.perPage + i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-[#222222]">{lead.fullName}</td>
                      <td className="px-4 py-3 text-gray-700">{lead.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.company || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#fdd800]/20 text-[#b37700] text-xs font-medium">
                          {lead.cargoType || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(lead.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {leadsData && leadsData.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-500">
                Trang {leadsData.page} / {leadsData.totalPages} — Tổng {leadsData.total} lead
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLeadsPage((p) => Math.max(1, p - 1))}
                  disabled={leadsData.page <= 1}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Trước
                </button>
                {Array.from({ length: Math.min(5, leadsData.totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (leadsData.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (leadsData.page <= 3) {
                    pageNum = i + 1;
                  } else if (leadsData.page >= leadsData.totalPages - 2) {
                    pageNum = leadsData.totalPages - 4 + i;
                  } else {
                    pageNum = leadsData.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setLeadsPage(pageNum)}
                      className={`w-8 h-8 text-xs font-semibold rounded-lg border transition-colors ${
                        leadsData.page === pageNum
                          ? "bg-[#fdd800] border-[#fdd800] text-[#222222]"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setLeadsPage((p) => Math.min(leadsData.totalPages, p + 1))}
                  disabled={leadsData.page >= leadsData.totalPages}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
