import { CheckCircle, Globe, Award, Users, Leaf, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import { COMPANY } from "@/data/company";

const reasons = [
  { icon: Award, title: "Direct Market Access", desc: "Our strategic location in Thane gives practical access to a wide variety of spices, grains and agricultural products." },
  { icon: ShieldCheck, title: "Fresh Product Focus", desc: "Products are selected with attention to color, aroma, cleanliness and suitability for the buyer's requirement." },
  { icon: Globe, title: "Trade Ready Range", desc: "A broad catalogue covering whole spices, ground powders, seeds, herbs, grains, dehydrated products and more." },
  { icon: Leaf, title: "Natural Spice Appeal", desc: "A refreshing light brand experience that reflects clean, fresh and authentic Indian flavors." },
  { icon: Users, title: "Direct Communication", desc: "Customers can email for product details, images, packing information and price updates." },
  { icon: CheckCircle, title: "Pricing On Request", desc: "Current rates are shared by quantity and grade so buyers receive relevant wholesale quotations." },
];

const WhyUs = () => (
  <div className="page-top">
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading
          subtitle="Our Edge"
          title={`Why Partner With ${COMPANY.name}?`}
          description="A clear product range, real enquiry support and market-connected sourcing for buyers who want fresh Indian spice supply without confusion."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.1}>
              <div className="glass-card p-8 h-full group hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <SectionHeading subtitle="By The Numbers" title="Built For Responsive Enquiries" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter end={80} suffix="+" label="Products" />
          <Counter end={9} suffix="" label="Categories" />
          <Counter end={24} suffix="h" label="Enquiry Response" />
          <Counter end={100} suffix="%" label="Bulk Focus" />
        </div>
      </div>
    </section>
  </div>
);

export default WhyUs;

