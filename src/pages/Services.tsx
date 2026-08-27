import { Ship, FileText, Package, Globe, ShieldCheck, Truck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Globe, title: "Spice Supply", desc: "Whole spices, ground spices, seeds, grains, herbs, dehydrated products and selected agro items for wholesale buyers." },
  { icon: Ship, title: "Domestic & Export Orders", desc: "Support for buyers who need consistent Indian spice supply for trading, retail, distribution or food processing." },
  { icon: Package, title: "Packing Options", desc: "Bulk bags, practical wholesale packing and product-specific handling based on customer requirements." },
  { icon: FileText, title: "Product Details", desc: "Clear sharing of product names, grades, photos, quantities and current price notes before order confirmation." },
  { icon: ShieldCheck, title: "Quality Selection", desc: "Focus on clean aroma, color, freshness and reliable market sourcing for every product shortlist." },
  { icon: Truck, title: "Dispatch Coordination", desc: "Order follow-up, packing coordination and shipment support from enquiry through dispatch." },
];

const Services = () => (
  <div className="page-top">
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading
          subtitle="What We Do"
          title="Spice & Agro Services"
          description="Everything is built around making inquiry, product selection, pricing and export dispatch seamless for Waris Brother Enterprises clients worldwide."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <div className="glass-card p-8 h-full group hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <SectionHeading subtitle="Our Process" title="How We Work" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Inquiry", desc: "Share product, quantity and packing requirements." },
            { step: "02", title: "Details", desc: "Receive product photos, notes and current pricing." },
            { step: "03", title: "Confirmation", desc: "Finalize grade, quantity, packing and payment terms." },
            { step: "04", title: "Dispatch", desc: "Order is packed and coordinated for timely movement." },
          ].map((s, i) => (
            <AnimatedSection key={s.step} delay={i * 0.15}>
              <div className="text-center">
                <div className="text-5xl font-serif font-bold gold-gradient-text mb-4">{s.step}</div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
