import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const prefix = '/a1-drain-cleaning-preview';
const textExtensions = new Set(['.html', '.css', '.js', '.xml', '.webmanifest']);

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    let content = await readFile(file, 'utf8');
    content = content.replace(/\b(href|src|action|poster|srcset)=(["'])\/(?!\/|a1-drain-cleaning-preview\/)/g, '$1=$2' + prefix + '/');
    content = content.replace(/url\(\s*\/(?!\/|a1-drain-cleaning-preview\/)/g, 'url(' + prefix + '/');
    await writeFile(file, content);
  }
}

await walk(root);
console.log('Preview paths rewritten for GitHub Pages project URL.');
