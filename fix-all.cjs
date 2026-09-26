const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace(/<Suspense fallback=\{null\}>\s*<StickyCtaBar \/>\s*<\/Suspense>/g, '');
c = c.replace(/<Suspense fallback=\{null\}>\s*<\/Suspense>/g, '');

const finalSuspense = `
      <Suspense fallback={null}>
        <ClientMarquee />
        <TestimonialSection />
        <SocialProofBar />
        <StickyCtaBar />
      </Suspense>
    </div>
  )
}
`;

c = c.replace('    </div>\n  )\n}\n', finalSuspense);
c = c.replace('    </div>\r\n  )\r\n}\r\n', finalSuspense);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log("Forced all components at the bottom of Home");
