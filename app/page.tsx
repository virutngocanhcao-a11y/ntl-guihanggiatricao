import { getContent } from "@/lib/get-content";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ConsultationSection from "@/components/landing/ConsultationSection";
import PainPoints from "@/components/landing/PainPoints";
import ProductCategories from "@/components/landing/ProductCategories";
import ProcessSteps from "@/components/landing/ProcessSteps";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import SolutionsByCategory from "@/components/landing/SolutionsByCategory";
import Faq from "@/components/landing/Faq";
import CtaBanner from "@/components/landing/CtaBanner";
import Footer from "@/components/landing/Footer";
import FormModal from "@/components/landing/FormModal";

export const revalidate = 0;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header global={content.global} />
      <Hero content={content.hero} />
      <ConsultationSection />
      <PainPoints
        intro={content.painPointsIntro}
        items={content.painPoints}
        bannerNote={content.bannerNote}
      />
      <ProductCategories
        intro={content.productCategoriesIntro}
        items={content.productCategories}
      />
      <ProcessSteps intro={content.processIntro} steps={content.processSteps} />
      <WhyChooseUs
        intro={content.whyChooseUsIntro}
        items={content.whyChooseUs}
        quote={content.quote}
      />
      <SolutionsByCategory
        intro={content.solutionsIntro}
        items={content.solutionsByCategory}
      />
      <Faq intro={content.faqIntro} items={content.faq} />
      <CtaBanner content={content.ctaBanner} />
      <Footer content={content.footer} />
      <FormModal />
    </>
  );
}
