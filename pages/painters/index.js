import Link from "next/link";
import Meta from "../../seo/Meta";
import SectionHeading from "../../components/ui/SectionHeading";
import { serviceAreas } from "../../data/locations";
import { company } from "../../data/siteData";

export default function ServiceAreasPage() {
  return (
    <>
      <Meta
        title="Service Areas — House Painters Across the Region"
        description={`${company.name} provides professional interior and exterior painting across Hamilton, Burlington, Oakville, Brantford, and St. Catharines.`}
        path="/painters"
      />
      <section className="pt-32 pb-16 lg:pt-40">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Where we work"
            title="Painters across Hamilton & Niagara"
            description="Local crews, local knowledge. Choose your city to see how we work in your area."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/painters/${area.slug}`}
                className="group rounded-4xl border border-light-border bg-light-surface p-8 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50"
              >
                <h3 className="text-xl font-bold tracking-tight group-hover:text-light-accent dark:group-hover:text-dark-accent">
                  Painters in {area.city}
                </h3>
                <p className="mt-2 text-sm text-light-subtext dark:text-dark-subtext">
                  {area.neighbourhoods.slice(0, 3).join(", ")} & more
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-light-accent dark:text-dark-accent">
                  View {area.city} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}