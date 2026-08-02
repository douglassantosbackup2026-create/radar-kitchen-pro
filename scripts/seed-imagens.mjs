import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i);
    const value = trimmed.slice(i + 1).replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL / publishable or service role key in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

const arquivos = [
  { slug: "morango-do-amor", file: "src/assets/morango-do-amor.jpg" },
  { slug: "brownie-dubai", file: "src/assets/brownie-dubai.jpg" },
  { slug: "copo-da-felicidade", file: "src/assets/copo-da-felicidade.jpg" },
  { slug: "brigadeiro-gourmet", file: "src/assets/brigadeiro-gourmet.jpg" },
];

for (const item of arquivos) {
  const path = resolve(root, item.file);
  const body = readFileSync(path);
  const objectPath = `${item.slug}.jpg`;

  const { error: upErr } = await supabase.storage.from("receitas").upload(objectPath, body, {
    contentType: "image/jpeg",
    upsert: true,
  });
  if (upErr) {
    console.error(`Upload failed ${item.slug}:`, upErr.message);
    continue;
  }

  const { data: pub } = supabase.storage.from("receitas").getPublicUrl(objectPath);
  const { error: dbErr } = await supabase
    .from("oportunidades")
    .update({ imagem_url: pub.publicUrl })
    .eq("slug", item.slug);

  if (dbErr) {
    console.error(`Update failed ${item.slug}:`, dbErr.message);
  } else {
    console.log(`OK ${item.slug} -> ${pub.publicUrl}`);
  }
}
