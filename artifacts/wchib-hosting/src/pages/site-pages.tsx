import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Cpu, Database, Gauge,
  Layers3, MemoryStick, MessageCircle, Plus, Server,
  Workflow,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { findPlan, plans } from '@/data/plans';
import { BrandMark } from '@/components/brand-mark';
import { DiscordLink } from '@/components/discord-link';
import { PlanCard } from '@/components/plan-card';
import { ParallaxLayer, Reveal } from '@/components/motion';
import { Seo } from '@/components/seo';

const pageDescriptions = {
  home: 'Affordable Minecraft hosting for Nepal and India, with AMD EPYC processors, DDR4 memory and NVMe SSD storage across seven listed monthly resource tiers.',
  plans: 'Compare seven Minecraft server hosting tiers from Wchib Hosting, including memory, CPU allocation, NVMe storage and monthly pricing for Nepal and India.',
  features: 'Explore the hardware foundation of Wchib Hosting Minecraft plans: AMD EPYC processors, DDR4 3200 MT/s memory, NVMe SSD storage and seven resource tiers.',
  about: 'Wchib Hosting is a Minecraft-focused hosting brand working to make server hosting more accessible to players and communities in Nepal and eventually India.',
  faq: 'Find clear answers about Wchib Hosting Minecraft plans, listed AMD EPYC hardware, DDR4 memory, NVMe storage, resource tiers and current options.',
};

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-content">
        <div className="breadcrumb"><Link href="/">Wchib Hosting</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Seo title="Minecraft Hosting for Nepal & India" description={pageDescriptions.home} path="/" />
      <main id="main-content">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <span className="eyebrow">Minecraft infrastructure · Nepal &amp; India</span>
              <h1>Minecraft Hosting <span className="text-gradient">Built for Nepal &amp; India</span></h1>
              <p className="hero-lede">Affordable Minecraft hosting powered by AMD EPYC processors, DDR4 memory and NVMe SSD storage.</p>
              <div className="hero-actions">
                <Link href="/plans" className="button button-primary" data-testid="hero-explore-plans">Explore Plans <ArrowRight size={15} aria-hidden="true" /></Link>
                <DiscordLink className="button button-quiet" data-testid="hero-connect-discord">Join Wchib on Discord <ArrowUpRight size={14} aria-hidden="true" /></DiscordLink>
              </div>
              <div className="hero-meta">
                <span><i aria-hidden="true" /> Seven clear resource tiers</span>
                <span><i aria-hidden="true" /> Minecraft-focused hosting</span>
              </div>
            </div>
            <div className="hero-visual" aria-label="Abstract dimensional server infrastructure illustration" role="img">
              <ParallaxLayer className="parallax-halo" speed={0.2}><div className="hero-halo" /></ParallaxLayer>
              <div className="orbit" />
              <div className="orbit orbit-two" />
              <div className="visual-crosshair cross-a" />
              <div className="visual-crosshair cross-b" />
              <ParallaxLayer className="parallax-cube" speed={0.85}>
                <div className="server-cube">
                  <div className="cube-body">
                    <div className="cube-face cube-top" />
                    <div className="cube-face cube-side" />
                    <div className="cube-face cube-front">
                      <div className="server-rack" aria-hidden="true">
                        {[0, 1, 2].map((unit) => <div className="rack-unit" key={unit}><i className="rack-led" /><span className="rack-lines"><span /><span /></span><span className="rack-slots"><i /><i /><i /></span></div>)}
                      </div>
                      <span className="cube-letter" aria-hidden="true">W</span>
                    </div>
                  </div>
                </div>
              </ParallaxLayer>
              <div className="visual-tag tag-top"><Server size={13} /> Built for Minecraft</div>
              <div className="visual-tag tag-bottom"><Layers3 size={13} /> A considered stack</div>
            </div>
          </div>
          <div className="hero-bottomline"><div className="container hero-bottom-inner"><span>WCHIB / SERVER SERIES 001</span><span><ArrowDownRight size={13} /> Scroll to explore</span></div></div>
        </section>

        <section className="principles" aria-label="Hosting platform details">
          <div className="container principle-grid">
            <article className="principle"><div className="principle-icon"><Cpu size={17} /></div><h3>AMD EPYC</h3><p>A server-class CPU platform across the listed plans.</p></article>
            <article className="principle"><div className="principle-icon"><MemoryStick size={17} /></div><h3>DDR4 3200 MT/s</h3><p>Every listed tier includes DDR4 memory at 3200 MT/s.</p></article>
            <article className="principle"><div className="principle-icon"><Database size={17} /></div><h3>NVMe SSD</h3><p>NVMe SSD storage is included in each plan allocation.</p></article>
            <article className="principle"><div className="principle-icon"><Layers3 size={17} /></div><h3>Minecraft focused</h3><p>A hosting brand centered on Minecraft server workloads.</p></article>
          </div>
        </section>

        <section className="section home-plans">
          <div className="container">
            <div className="plans-intro">
              <div className="section-heading">
                <span className="eyebrow">A tier for your world</span>
                <h2>Room to start.<br /><span className="text-gradient">Space to grow.</span></h2>
                <p>Seven straightforward configurations. Compare the resources and choose a plan that suits your Minecraft community.</p>
              </div>
              <Link href="/plans" className="button button-quiet" data-testid="home-all-plans">Compare all plans <ArrowRight size={14} /></Link>
            </div>
            <div className="plan-grid plan-grid-wide">{plans.map((plan, index) => <Reveal key={plan.slug} delay={index % 3 * 0.04}><PlanCard plan={plan} index={index} /></Reveal>)}</div>
          </div>
        </section>

        <section className="technical-section section">
          <div className="container technical-layout">
            <div className="section-heading">
              <span className="eyebrow">The listed platform</span>
              <h2>Clear specs.<br /><span className="text-gradient">No guesswork.</span></h2>
              <p>Every Wchib plan shares the same platform foundation. The allocations scale by tier, so the differences are easy to compare.</p>
            </div>
            <div className="spec-table" aria-label="Platform specifications">
              <div className="spec-row"><span>Processor family</span><strong>AMD EPYC</strong><Cpu size={16} /></div>
              <div className="spec-row"><span>Memory type</span><strong>DDR4 3200 MT/s</strong><MemoryStick size={16} /></div>
              <div className="spec-row"><span>Storage type</span><strong>NVMe SSD</strong><Database size={16} /></div>
              <div className="spec-row"><span>Plan memory range</span><strong>4GB — 32GB</strong><Gauge size={16} /></div>
            </div>
          </div>
        </section>

        <section className="manifesto">
          <div className="container manifesto-inner">
            <div>
              <span className="eyebrow">Made for the worlds we share</span>
              <h2>Built around Minecraft.<br /><span className="text-gradient">Built for community.</span></h2>
              <div className="manifesto-actions">
                <Link href="/about" className="button button-primary" data-testid="home-about">Meet Wchib <ArrowRight size={14} /></Link>
                <Link href="/features" className="button button-quiet" data-testid="home-features">Explore the platform</Link>
              </div>
            </div>
            <p>Wchib Hosting is focused on making server hosting more accessible to players and communities in Nepal, with a goal of reaching across India over time.</p>
          </div>
        </section>
      </main>
    </>
  );
}

function PlansPage() {
  return (
    <>
      <Seo title="Minecraft Hosting Plans" description={pageDescriptions.plans} path="/plans" />
      <main id="main-content">
        <PageHero eyebrow="Plans" title="Choose Your Minecraft Server" description="From a smaller community server to larger Minecraft workloads, compare the listed resources and find a tier that fits." />
        <section className="page-section">
          <div className="container">
            <div className="plan-grid plan-grid-wide">{plans.map((plan, index) => <Reveal key={plan.slug} delay={index % 3 * 0.04}><PlanCard plan={plan} index={index} /></Reveal>)}</div>
            <div className="plans-banner"><p><strong>Every tier, one clear foundation.</strong> AMD EPYC · DDR4 3200 MT/s · NVMe SSD</p><Link href="/faq" className="button button-quiet" data-testid="plans-questions">Plan questions <ArrowRight size={14} /></Link></div>
          </div>
        </section>
      </main>
    </>
  );
}

function PlanDetailPage({ slug }: { slug?: string }) {
  const plan = findPlan(slug);
  if (!plan) return <NotFoundPage />;
  const title = `${plan.name} Minecraft Hosting Plan`;
  const description = `${plan.name} plan from Wchib Hosting: ${plan.ram}, ${plan.cpu} CPU allocation, ${plan.storage} and ${plan.price} per month.`;
  return (
    <>
      <Seo title={title} description={description} path={`/plans/${plan.slug}`} />
      <main id="main-content">
        <section className="page-hero">
          <div className="container page-hero-content">
            <div className="breadcrumb"><Link href="/">Wchib Hosting</Link><span>/</span><Link href="/plans">Plans</Link><span>/</span><span>{plan.name}</span></div>
            <span className="eyebrow" style={{ marginTop: 28, color: plan.accent }}>Tier / {plan.slug}</span>
            <h1>{plan.name} <span className="text-gradient">Plan</span></h1>
            <p>{plan.description} Review the exact listed specifications below.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container detail-layout">
            {/* Dimensioned media frame. Uses detailImage when supplied, else falls back to the card image. */}
            {(() => {
              const media = plan.detailImage ?? plan.image;
              return (
                <div className="detail-media" aria-hidden={media ? undefined : true}>
                  {media && <img src={media} alt={`${plan.name} plan`} width="1200" height="1040" loading="lazy" />}
                </div>
              );
            })()}
            <div className="detail-panel">
              <span className="eyebrow">Wchib / {plan.name}</span>
              <h2>{plan.name} server hosting</h2>
              <p>{plan.description} Built on the same listed AMD EPYC, DDR4 and NVMe platform.</p>
              <div className="detail-price"><strong>{plan.price}</strong><span>/ month</span></div>
              <div className="detail-specs">
                <div className="detail-spec"><span>RAM</span><strong>{plan.ram}</strong></div>
                <div className="detail-spec"><span>CPU allocation</span><strong>{plan.cpu}</strong></div>
                <div className="detail-spec"><span>Processor</span><strong>{plan.processor}</strong></div>
                <div className="detail-spec"><span>Storage</span><strong>{plan.storage}</strong></div>
              </div>
              <div className="detail-actions">
                <DiscordLink className="button button-primary" data-testid={`detail-connect-${plan.slug}`}>Join Wchib on Discord <ArrowUpRight size={14} /></DiscordLink>
                <Link href="/plans" className="button button-quiet" data-testid="detail-back-plans"><ArrowLeft size={14} /> Back to Plans</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const featureData = [
  { title: 'AMD EPYC', icon: Cpu, body: 'Wchib plans are based on AMD EPYC processors. The processor family is consistent across the listed resource tiers.' },
  { title: 'DDR4 memory', icon: MemoryStick, body: 'Each listed plan includes DDR4 memory at 3200 MT/s, with allocations from 4GB through 32GB.' },
  { title: 'NVMe SSD storage', icon: Database, body: 'NVMe SSD storage is part of every plan, with the listed capacity scaling from 16GB to 160GB.' },
  { title: 'Flexible resource tiers', icon: Gauge, body: 'Choose a listed allocation from 4GB RAM to 32GB RAM. CPU and storage allocations also scale by tier.' },
  { title: 'Minecraft-focused hosting', icon: Workflow, body: 'Wchib is a hosting brand built around Minecraft server workloads and the communities that create them.' },
  { title: 'Community support', icon: MessageCircle, body: 'Wchib has a Discord/community presence. Contact the team through the provided channels for current details.' },
];

function FeaturesPage() {
  return (
    <>
      <Seo title="Minecraft Hosting Features" description={pageDescriptions.features} path="/features" />
      <main id="main-content">
        <PageHero eyebrow="Platform" title="Infrastructure, without the theatre." description="A closer look at the hardware, resource tiers and Minecraft focus behind Wchib Hosting." />
        <section className="page-section">
          <div className="container">
            <div className="feature-grid">
              {featureData.map(({ title, icon: Icon, body }, index) => (
                <Reveal key={title} delay={index % 3 * .05}>
                  <article className="feature-card">
                    <div className="feature-icon"><Icon size={18} aria-hidden="true" /></div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="technical-section section">
          <div className="container technical-layout">
            <div className="section-heading"><span className="eyebrow">Seven configurations</span><h2>Pick the resources.<br /><span className="text-gradient">Build your world.</span></h2><p>RAM, CPU allocation and NVMe storage vary by tier; the processor and memory generation are listed clearly on every plan.</p></div>
            <div className="spec-table">
              <div className="spec-row"><span>Memory range</span><strong>4GB – 32GB</strong><MemoryStick size={16} /></div>
              <div className="spec-row"><span>CPU allocation</span><strong>200% – 800%</strong><Cpu size={16} /></div>
              <div className="spec-row"><span>Storage range</span><strong>16GB – 160GB</strong><Database size={16} /></div>
              <div className="spec-row"><span>Processor family</span><strong>AMD EPYC</strong><Server size={16} /></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Editable place for verified brand statistics if supplied later; intentionally no fabricated values are shown.
const aboutConfig = { statistics: [] as { label: string; value: string }[] };

function AboutPage() {
  return (
    <>
      <Seo title="About Wchib Hosting" description={pageDescriptions.about} path="/about" />
      <main id="main-content">
        <PageHero eyebrow="About Wchib" title="Built Around Minecraft. Built for the Community." description="A Minecraft-focused hosting brand with a goal of making server hosting more accessible to players and communities in Nepal and eventually across India." />
        <section className="page-section">
          <div className="container about-story">
            <div className="about-mark"><BrandMark /></div>
            <div className="about-copy">
              <span className="eyebrow">Why Wchib exists</span>
              <h2>Good worlds start with a place to build.</h2>
              <p>Wchib Hosting is centered on one thing: Minecraft servers and the people who make them worth joining. The idea is to make hosting more accessible to players and communities in Nepal, with a longer-term goal of reaching across India.</p>
              <p>That starts with a straightforward lineup. Seven resource tiers share an AMD EPYC processor platform, DDR4 3200 MT/s memory and NVMe SSD storage. Each plan shows its allocation and monthly price clearly.</p>
              <p>Wchib is growing its brand around useful information, considered infrastructure and a community-first approach. The focus is on the work ahead, not claims that cannot be backed up.</p>
              <div className="about-note">Have a question about current plans or availability? Contact Wchib Hosting through the Discord route or the contact details in the footer.</div>
            </div>
          </div>
        </section>
        {aboutConfig.statistics.length > 0 && <section className="principles" aria-label="Wchib Hosting verified statistics"><div className="container principle-grid">{aboutConfig.statistics.map((stat) => <div className="principle" key={stat.label}><h3>{stat.value}</h3><p>{stat.label}</p></div>)}</div></section>}
        <section className="manifesto">
          <div className="container manifesto-inner"><div><span className="eyebrow">Explore the plans</span><h2>Find the right<br /><span className="text-gradient">starting point.</span></h2><div className="manifesto-actions"><Link href="/plans" className="button button-primary">Compare plans <ArrowRight size={14} /></Link></div></div><p>Choose from seven clearly listed allocations. If you need current availability or upgrade options, reach out through Wchib's listed community contact.</p></div>
        </section>
      </main>
    </>
  );
}

const faqEntries = [
  { question: 'What is Wchib Hosting?', answer: 'Wchib Hosting is a Minecraft-focused hosting brand built with a goal of making server hosting more accessible to players and communities in Nepal and eventually across India.' },
  { question: 'What processor do Wchib plans use?', answer: 'All seven listed plans use AMD EPYC processors.' },
  { question: 'What type of storage do the plans include?', answer: 'Each listed plan includes NVMe SSD storage. The listed capacities range from 16GB to 160GB, depending on the plan.' },
  { question: 'What RAM options are available?', answer: 'The current lineup includes 4GB, 6GB, 8GB, 10GB, 12GB, 16GB and 32GB options. Each plan lists DDR4 3200 MT/s memory.' },
  { question: 'Can I move to a larger plan later?', answer: 'Contact Wchib Hosting through Discord for current availability and upgrade options.' },
  { question: 'How can I ask about current availability?', answer: 'Use the contact details in the site footer to reach Wchib Hosting. The Discord route is reserved for the community destination once it is provided.' },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  return (
    <>
      <Seo title="Minecraft Hosting FAQ" description={pageDescriptions.faq} path="/faq" />
      <main id="main-content">
        <PageHero eyebrow="Answers" title="Frequently Asked Questions" description="The basics on plan hardware, available resource tiers and getting in touch with Wchib Hosting." />
        <section className="page-section">
          <div className="container">
            <div className="faq-list">
              {faqEntries.map((item, index) => {
                const expanded = open === index;
                const panelId = `faq-panel-${index}`;
                return (
                  <article className="faq-item" key={item.question}>
                    <h2 style={{ margin: 0 }}>
                      <button className="faq-question" type="button" id={`faq-question-${index}`} aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)} data-testid={`faq-question-${index}`}>
                        {item.question}<Plus size={17} aria-hidden="true" />
                      </button>
                    </h2>
                    <AnimatePresence initial={false}>
                      {expanded && <motion.div id={panelId} className="faq-answer" role="region" aria-labelledby={`faq-question-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .22 }}><p>{item.answer}</p></motion.div>}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
            <div className="plans-banner" style={{ maxWidth: 860, marginTop: 38 }}><p><strong>Still looking for something?</strong> Ask Wchib about current details.</p><DiscordLink className="button button-quiet">Join Wchib on Discord <ArrowUpRight size={14} /></DiscordLink></div>
          </div>
        </section>
      </main>
    </>
  );
}

function DiscordPage() {
  return (
    <>
      <Seo title="Connect to Discord" description="Join Wchib Hosting on Discord to talk about plans, support and upcoming Minecraft servers." path="/discord" />
      <main id="main-content" className="discord-page">
        <section className="page-hero">
          <div className="page-hero-content">
            <span className="eyebrow">Community</span>
            <h1>Join Wchib on Discord</h1>
            <p>Ask about plans, get help setting up your server, and follow upcoming Minecraft deployments. The whole conversation happens on our Discord.</p>
            <div className="manifesto-actions">
              <DiscordLink className="button button-primary" data-testid="discord-page-join">Join Wchib on Discord <ArrowUpRight size={14} aria-hidden="true" /></DiscordLink>
              <Link href="/plans" className="button button-quiet" data-testid="discord-page-plans">Browse plans <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="This Wchib Hosting page could not be found." path="/404" />
      <main id="main-content" className="container not-found">
        <div>
          <BrandMark className="not-found-mark" />
          <span className="eyebrow">404 / Unmapped block</span>
          <h1>This block doesn't exist.</h1>
          <p>The page you're looking for isn't part of this world.</p>
          <Link href="/" className="button button-primary" data-testid="not-found-home">Back to Home <ArrowRight size={14} /></Link>
        </div>
      </main>
    </>
  );
}

function PlanRoute() {
  const [matched, params] = useRoute('/plans/:slug');
  if (!matched) return <NotFoundPage />;
  const plan = findPlan(params?.slug);
  if (!plan) return <NotFoundPage />;
  return <PlanDetailPage slug={plan.slug} />;
}

export { HomePage, PlansPage, PlanRoute, FeaturesPage, AboutPage, FaqPage, DiscordPage, NotFoundPage };