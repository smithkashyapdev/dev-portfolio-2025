import { About } from '@/app/types/DevData';
import Image from 'next/image';
import { ContactForm } from '../common';

type AboutPageProps = {
  data: About;
  id: string;
};
const AboutPage = ({ data, id }: AboutPageProps) => {
  const { name, title, highlights, socialLinks, mobile } = data;
  return (
    <div className="relative mx-auto max-w-6xl overflow-x-hidden px-5 py-20 sm:px-6">
      <div className="glow-blob left-1/3 top-0 h-72 w-72 bg-violet-500" />
      <p className="eyebrow mb-3 text-center">Get in touch</p>
      <h2 className="mb-12 text-center text-3xl font-extrabold sm:text-4xl md:text-5xl">
        <span className="gradient-text">Let&apos;s connect</span>
      </h2>

      <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <section id={id} className="order-2 sm:order-1">
          <div className="glass-card mx-auto flex max-w-md flex-col items-center p-8 text-center">
            <div className="gradient-border mb-5 h-20 w-20 animate-floaty">
              <div className="flex h-full w-full items-center justify-center rounded-2xl text-2xl font-extrabold"
                style={{ background: 'var(--surface)' }}>
                SK
              </div>
            </div>
            <h3 className="text-2xl font-extrabold">{name}</h3>
            <p className="gradient-text mt-1 text-base font-semibold sm:text-lg">{title}</p>
            <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>{highlights}</p>
            {mobile && (
              <a href={`tel:${mobile.replace(/\s/g, '')}`}
                className="mt-1 text-sm font-medium transition-colors hover:text-[var(--primary)]"
                style={{ color: 'var(--text-muted)' }}>
                {mobile}
              </a>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="lift flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}
                >
                  <Image
                    src={link.icon}
                    alt={`${link.platform} icon`}
                    width={20}
                    height={20}
                    className="invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
        <div className="order-1 sm:order-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export { AboutPage };
