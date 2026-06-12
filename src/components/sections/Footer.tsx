import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    head: "Services",
    links: ["GPU Optimization Service", "CUDA Development Service", "Hire CUDA Developers"],
  },
  {
    head: "Company",
    links: ["About Us", "Team", "Careers", "Company Brochure"],
  },
  {
    head: "Resources",
    links: ["Blog", "Case Studies", "Portfolio"],
  },
  {
    head: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security Policy", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-linen">
      <div className="container-j pt-16 md:pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4" aria-label="Jashom home">
              <Image
                src="/jashom-logo.svg"
                alt="Jashom"
                width={160}
                height={30}
                className="block"
                style={{ height: 30, width: "auto" }}
              />
            </Link>
            <p className="text-[0.9375rem] text-ink-2 max-w-[36ch]">
              Precision GPU engineering for high-performance AI. Gandhinagar, Gujarat, India.
            </p>
            <a
              href="mailto:hello@jashom.com"
              className="link-line inline-block mt-4 text-[0.9375rem] text-ink"
            >
              hello@jashom.com
            </a>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.head}>
                <p className="text-sm font-medium text-ink mb-4">{col.head}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[0.875rem] text-ink-2 hover:text-ink transition-colors duration-150">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-ink-3">
          <p>© {new Date().getFullYear()} Jashom Technologies. All rights reserved.</p>
          <a href="#" className="hover:text-ink transition-colors duration-150">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
