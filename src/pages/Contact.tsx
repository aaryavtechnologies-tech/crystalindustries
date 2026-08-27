import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { COMPANY } from "@/data/company";
import { WHATSAPP_URL } from "@/components/WhatsAppButton";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = encodeURIComponent(
      `Hello Crystal Industries,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    const whatsappUrl = `https://wa.me/${COMPANY.phoneHref.replace("+", "")}?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="page-top">
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            subtitle="Get In Touch"
            title={`Contact ${COMPANY.name}`}
            description="Send your product requirement to receive available images, packing details and current wholesale price notes."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                {[
                  { name: "name" as const, label: "Full Name", type: "text", placeholder: "Your name" },
                  { name: "email" as const, label: "Email", type: "email", placeholder: "your@email.com" },
                  { name: "phone" as const, label: "Phone", type: "tel", placeholder: "+91 ..." },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      value={form[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us product name, quantity and packing requirement..."
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="space-y-6">
              <div className="glass-card p-8 space-y-5">
                <h3 className="font-serif text-xl font-semibold text-foreground">Contact Information</h3>
                <div className="space-y-4 text-sm">
                  <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary shrink-0" /> {COMPANY.phone}
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5 text-primary shrink-0" /> {COMPANY.email}
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0" /> WhatsApp for product images and prices
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{COMPANY.address}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-border h-[300px] shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2!2d73.0!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c13e0f3e0001%3A0x1234567890abcdef!2sAPMC%20Market%2C%20Vashi%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Crystal Industries Location"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
