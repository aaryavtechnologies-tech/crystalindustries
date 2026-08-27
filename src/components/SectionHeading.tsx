import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ subtitle, title, description }: SectionHeadingProps) => (
  <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
    {subtitle && (
      <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-3">{subtitle}</p>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">{title}</h2>
    <div className="gold-divider mx-auto max-w-xs mb-4" />
    {description && (
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    )}
  </AnimatedSection>
);

export default SectionHeading;
