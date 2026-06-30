import { CtaChannelIcon, type ContactChannel } from "@/components/ui/Icons";
import { siteConfig } from "@/lib/site";

type ContactTouchProps = {
  channel: ContactChannel;
  label: string;
  href: string;
  external?: boolean;
};

function ContactTouch({ channel, label, href, external }: ContactTouchProps) {
  return (
    <a
      className={`cta-contact cta-contact--${channel}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
    >
      <CtaChannelIcon channel={channel} />
    </a>
  );
}

type SocialContactsProps = {
  whatsappLabel: string;
  emailLabel: string;
  instagramLabel: string;
  className?: string;
};

export function SocialContacts({
  whatsappLabel,
  emailLabel,
  instagramLabel,
  className = "",
}: SocialContactsProps) {
  return (
    <div className={`cta-contacts${className ? ` ${className}` : ""}`}>
      <ContactTouch
        channel="whatsapp"
        label={whatsappLabel}
        href={`https://wa.me/${siteConfig.whatsapp}`}
        external
      />
      <ContactTouch
        channel="email"
        label={emailLabel}
        href={`mailto:${siteConfig.email}`}
      />
      <ContactTouch
        channel="instagram"
        label={instagramLabel}
        href={siteConfig.instagramUrl}
        external
      />
    </div>
  );
}
