import { ProcessStep } from "@/lib/content-schema";

export default function ProcessSteps({
  intro,
  steps,
}: {
  intro: string;
  steps: ProcessStep[];
}) {
  return (
    <section className="bg-navy-dark py-16 text-white" id="quy-trinh">
      <div className="mx-auto max-w-content px-6">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          {intro}
        </h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-gold" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-lg font-bold text-navy-dark">
                {step.number}
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
