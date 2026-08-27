import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { COMPANY } from "@/data/company";
import aboutImg from "@/assets/spices-about.jpg";
import { Target, Eye, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Our Mission", desc: "To make quality Indian spices and agro products easy to source with transparent communication, dependable supply and fair market pricing." },
  { icon: Eye, title: "Our Vision", desc: "To establish Waris Brother Enterprises as the most dependable and quality-focused export partner for clean, fresh, and sortex-graded Indian agro commodities." },
  { icon: Heart, title: "Our Promise", desc: "Honest dealing, rigorous quality selection, and responsive support from first product inquiry to final container dispatch." },
];

const About = () => (
  <div className="page-top">
    <section className="section-padding">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimatedSection>
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-3">Our Story</p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            Fresh sourcing for <span className="gold-gradient-text">authentic Indian flavor</span>
          </h1>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {COMPANY.name} supplies Indian spices, seeds, grains, herbs and agro products for buyers who need dependable quality and quick product clarity.
            </p>
            <p>
              Our address is based in Thane, Maharashtra, giving the business practical access to a wide range of spice and agricultural products.
            </p>
            <p>
              Product photos, packing options and wholesale prices are shared on request so customers receive details that match the current grade, quantity and market rate.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img src={aboutImg} alt="Premium spices" className="w-full h-[400px] lg:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent" />
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <SectionHeading subtitle="What Drives Us" title="Mission, Vision & Promise" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.15}>
              <div className="glass-card p-8 h-full text-center hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-primary/10">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
