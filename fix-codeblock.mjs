import fs from "fs";
import path from "path";

const files = [
  "design-patterns-strategy/page.tsx",
  "clean-architecture-na-pratica/page.tsx",
  "notacao-big-o/page.tsx",
  "design-patterns-adapter/page.tsx",
];

for (const rel of files) {
  const file = path.join(
    "c:/Users/Rafael/projects/rafael.io/src/app/artigos",
    rel,
  );
  let content = fs.readFileSync(file, "utf8");
  content = content.replace(
    /<CodeBlock language="typescript">\s*{`([\s\S]*?)`}\s*<\/CodeBlock>/g,
    '<CodeBlock><code className="language-typescript">{`$1`}</code></CodeBlock>',
  );
  fs.writeFileSync(file, content);
}
