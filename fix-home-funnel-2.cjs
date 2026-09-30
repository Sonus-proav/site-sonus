const fs = require('fs');
let s = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// 1. Remove the bottom Suspense block
const bottomSuspense = `<Suspense fallback={null}>
        <ClientMarquee />
        <TestimonialSection />
        <SocialProofBar />
        <StickyCtaBar />
      </Suspense>`;

// We will use regex to catch slight variations in whitespace
s = s.replace(/<Suspense fallback=\{null\}>\s*<ClientMarquee \/>\s*<TestimonialSection \/>\s*<SocialProofBar \/>\s*<StickyCtaBar \/>\s*<\/Suspense>/, '');

// 2. Insert ClientMarquee right after the Hero section
const heroEnd = `        </section>`;
const bentoStart = `{/* APPLE-STYLE BESPOKE BENTO GRID */}`;

// Let's find the closing section of the Hero
// It's right before "APPLE-STYLE BESPOKE BENTO GRID"
s = s.replace(
  `        </section>\n\n        \n\n              {/* APPLE-STYLE BESPOKE BENTO GRID */}`,
  `        </section>\n\n        {/* 2. SOCIAL PROOF LOGOS (Brands + Clients) */}\n        <Suspense fallback={null}>\n          <ClientMarquee />\n        </Suspense>\n\n        {/* 3. SOLUTIONS / APPLE-STYLE BESPOKE BENTO GRID */}`
);
// In case the spacing is different, let's just do a robust insert:
if (!s.includes('<ClientMarquee />')) {
  // It means it was removed but not inserted. Let's do it manually via index
  const bentoIndex = s.indexOf('{/* APPLE-STYLE BESPOKE BENTO GRID */}');
  if (bentoIndex !== -1) {
    s = s.slice(0, bentoIndex) + `<Suspense fallback={null}>\n          <ClientMarquee />\n        </Suspense>\n\n        ` + s.slice(bentoIndex);
  }
}

// 3. Remove StickyCtaBar lazy import
s = s.replace(/const StickyCtaBar = lazy[^\n]*\n/, '');

fs.writeFileSync('src/pages/Home.tsx', s);
console.log("Home funnel order fixed surgically!");
