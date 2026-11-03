import { getPublicData } from '../lib/public-data';
import { About, Brief, Contact, Faq, Hero, Process, Reviews, Services, SiteDialogs, SiteFooter, SiteHeader, Work, type PublicRecord } from '../components/public/Sections';
import { Interactions } from '../components/public/Interactions';

export const dynamic = 'force-dynamic';

function records(value: unknown): PublicRecord[] {
  return Array.isArray(value) ? value.filter((item): item is PublicRecord => item !== null && typeof item === 'object' && !Array.isArray(item)) : [];
}

/** Public content is read at request time; no fabricated client or review records. */
export default async function HomePage() {
  let services: PublicRecord[] = [];
  let portfolio: PublicRecord[] = [];
  let reviews: PublicRecord[] = [];
  let contentUnavailable = false;
  try {
    const data = await getPublicData();
    services = records(data.services);
    portfolio = records(data.portfolio);
    reviews = records(data.reviews);
  } catch {
    contentUnavailable = true;
  }

  return <>
    <SiteHeader />
    <main id="main">
      <Hero />
      {contentUnavailable && <div className="content-unavailable shell" role="status">Konten terbaru belum tersedia karena layanan data belum dikonfigurasi atau tidak dapat diakses. Informasi layanan di bawah mengikuti rancangan awal; karya klien dan ulasan tidak ditampilkan.</div>}
      <Work portfolio={portfolio} />
      <Services services={services} />
      <Reviews reviews={reviews} />
      <Process />
      <About />
      <Brief />
      <Faq />
      <Contact />
    </main>
    <SiteFooter hasReviews={reviews.length > 0} />
    <SiteDialogs />
    <Interactions />
  </>;
}
