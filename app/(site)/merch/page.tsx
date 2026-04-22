import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getContact, getCurrentContest, getMerch } from "@/lib/content";
import type { MerchItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Apparel, headwear, accessories, drinkware, and the Trivia Town movie. Proceeds support 90FM and the contest.",
};

const categoryOrder: MerchItem["category"][] = [
  "apparel",
  "headwear",
  "accessory",
  "drinkware",
  "media",
];

const categoryLabel: Record<MerchItem["category"], string> = {
  apparel: "Apparel",
  headwear: "Headwear",
  accessory: "Accessories",
  drinkware: "Drinkware",
  media: "Media",
};

export default function MerchPage() {
  const items = getMerch();
  const contact = getContact();
  const contest = getCurrentContest();

  const grouped = new Map<MerchItem["category"], MerchItem[]>();
  for (const cat of categoryOrder) grouped.set(cat, []);
  for (const item of items) grouped.get(item.category)!.push(item);

  return (
    <>
      <PageHero
        eyebrow={contest.title}
        title="Merch"
        lede="Every shirt, sticker, and pint glass funds the radio station. Limited each year — pick up early."
      />

      <Section>
        <div className="space-y-12">
          {categoryOrder.map((cat) => {
            const list = grouped.get(cat) ?? [];
            if (list.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight text-ink">
                  {categoryLabel[cat]}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-4 rounded-[var(--radius-card)] border border-rule bg-paper p-4 shadow-paper"
                    >
                      <div className="min-w-0">
                        <p className="font-display text-base font-semibold text-ink">
                          {item.name}
                        </p>
                        {item.sizes ? (
                          <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-mute">
                            {item.sizes}
                          </p>
                        ) : null}
                        {item.note ? (
                          <p className="mt-1 text-sm text-ink-soft">
                            {item.note}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 font-mono text-lg font-semibold text-maroon">
                        ${item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="How to buy" title="Order through 90FM">
        <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
          <p className="text-base leading-relaxed text-ink-soft">
            Merch is sold through the station — pick up in person at the studios
            or contact the coordinator for shipping. Designs change yearly with
            the contest theme; current designs reflect{" "}
            <strong className="text-ink">{contest.title}</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://90fmtrivia.org/merch.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-maroon px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
            >
              See product photos at 90fmtrivia.org
            </a>
            <a
              href={`mailto:${contact.coordinatorEmail}?subject=Trivia%20merch%20order`}
              className="inline-flex items-center rounded-full border border-rule bg-cream px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-amber hover:text-maroon"
            >
              Email about merch
            </a>
            <Link
              href="/contact"
              className="text-sm text-ink-soft underline decoration-rule underline-offset-4 hover:text-maroon"
            >
              All contact info
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
