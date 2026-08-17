#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const rootFlag = args.indexOf('--root');
const root = path.resolve(rootFlag >= 0 ? args[rootFlag + 1] : path.join(__dirname, '..'));

const contentRoots = [
  { dir: 'wiki', group: 'Wiki' },
  { dir: 'reports', group: 'Reports' },
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.endsWith('.md') ? [full] : [];
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
}

function frontmatterTitle(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const title = match[1].match(/^title:\s*"?(.+?)"?\s*$/m);
  return title ? title[1] : null;
}

function titleFrom(markdown, fallback) {
  const fmTitle = frontmatterTitle(markdown);
  if (fmTitle) return fmTitle;
  const h1 = stripFrontmatter(markdown).match(/^#\s+(.+)$/m);
  return h1 ? h1[1].trim() : fallback;
}

function slugFor(file) {
  return path
    .relative(root, file)
    .replace(/\\/g, '/')
    .replace(/\.md$/, '');
}

function inlineMarkdown(text) {
  let out = escapeHtml(text);
  out = out.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_m, target, label) => {
    return `<a href="#${escapeHtml(target)}">${escapeHtml(label)}</a>`;
  });
  out = out.replace(/\[\[([^\]]+)\]\]/g, (_m, target) => {
    const label = target.split('/').pop().replaceAll('-', ' ');
    return `<a href="#${escapeHtml(target)}">${escapeHtml(label)}</a>`;
  });
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, href) => {
    if (href.startsWith('http://') || href.startsWith('https://')) {
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    }
    const normalized = href.replace(/^\.\.\//, '').replace(/\.md$/, '');
    return `<a href="#${escapeHtml(normalized)}">${escapeHtml(label)}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  return out;
}

function markdownToHtml(markdown) {
  const lines = stripFrontmatter(markdown).split(/\r?\n/);
  const html = [];
  let inList = false;
  let inCode = false;
  let codeLines = [];

  function closeList() {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  }

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (/^#{1,4}\s+/.test(line)) {
      closeList();
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#{1,4}\s+/, '');
      html.push(`<h${level}>${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (/^-\s+/.test(line)) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^-\s+/, ''))}</li>`);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();
  return html.join('\n');
}

function readPages() {
  return contentRoots.flatMap(({ dir, group }) => {
    const fullDir = path.join(root, dir);
    return walk(fullDir).map((file) => {
      const markdown = fs.readFileSync(file, 'utf8');
      const slug = slugFor(file);
      const title = titleFrom(markdown, path.basename(file, '.md'));
      const section = slug.split('/').slice(0, 2).join('/');
      return {
        slug,
        title,
        group,
        section,
        markdown: stripFrontmatter(markdown),
        html: markdownToHtml(markdown),
      };
    });
  });
}

function pageTemplate(pages) {
  const generated = new Date().toISOString();
  const data = escapeHtml(JSON.stringify(pages));
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ACE Context Research Viewer</title>
  <style>
    :root { color-scheme: light; --bg:#f7f7f4; --panel:#ffffff; --text:#202124; --muted:#666b73; --line:#d9d9d2; --accent:#0f6b5f; --accent-soft:#e7f2ef; }
    * { box-sizing: border-box; }
    body { margin:0; font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:var(--bg); color:var(--text); }
    .shell { display:grid; grid-template-columns: 310px minmax(0,1fr); min-height:100vh; }
    aside { border-right:1px solid var(--line); background:var(--panel); padding:18px 14px; position:sticky; top:0; height:100vh; overflow:auto; }
    main { padding:32px; max-width:980px; width:100%; }
    h1,h2,h3,h4 { line-height:1.2; margin:1.4em 0 .45em; }
    h1:first-child { margin-top:0; }
    a { color:var(--accent); text-decoration:none; }
    a:hover { text-decoration:underline; }
    .brand { font-size:17px; font-weight:700; margin-bottom:4px; }
    .meta { color:var(--muted); font-size:12px; margin-bottom:14px; }
    .search { width:100%; padding:10px 11px; border:1px solid var(--line); border-radius:7px; font:inherit; margin-bottom:14px; }
    .nav-group { margin:14px 0 6px; color:var(--muted); font-size:12px; text-transform:uppercase; letter-spacing:.04em; }
    .nav-item { display:block; width:100%; border:0; background:transparent; color:var(--text); text-align:left; padding:7px 8px; border-radius:7px; cursor:pointer; font:inherit; }
    .nav-item:hover, .nav-item.active { background:var(--accent-soft); color:#0a4c43; }
    article { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:30px 34px; box-shadow:0 1px 2px rgba(0,0,0,.03); }
    article p { margin:0 0 1em; }
    article ul { padding-left:1.2em; }
    code { background:#eeeeea; padding:.1em .35em; border-radius:4px; }
    pre { background:#202124; color:#f4f4f0; padding:14px; overflow:auto; border-radius:7px; }
    .empty { color:var(--muted); padding:10px 8px; }
    @media (max-width: 780px) {
      .shell { grid-template-columns: 1fr; }
      aside { height:auto; position:relative; border-right:0; border-bottom:1px solid var(--line); }
      main { padding:16px; }
      article { padding:22px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <aside>
      <div class="brand">ACE Research</div>
      <div class="meta">Generated ${escapeHtml(generated)}</div>
      <input class="search" id="search" type="search" placeholder="Search wiki and reports">
      <nav id="nav"></nav>
    </aside>
    <main id="app" data-pages="${data}">
      <article id="content"></article>
    </main>
  </div>
  <script>
    const app = document.getElementById('app');
    const pages = JSON.parse(app.dataset.pages);
    const nav = document.getElementById('nav');
    const content = document.getElementById('content');
    const search = document.getElementById('search');

    function label(section) {
      return section.split('/').map((part) => part.replaceAll('-', ' ')).join(' / ');
    }

    function targetSlug(raw) {
      const clean = raw.replace(/^#/, '').replace(/\\.md$/, '');
      const exact = pages.find((page) => page.slug === clean);
      if (exact) return exact.slug;
      const wiki = pages.find((page) => page.slug === 'wiki/' + clean);
      if (wiki) return wiki.slug;
      const byTail = pages.find((page) => page.slug.endsWith('/' + clean));
      return byTail ? byTail.slug : clean;
    }

    function renderNav(filter = '') {
      const q = filter.trim().toLowerCase();
      const visible = pages.filter((page) => !q || (page.title + ' ' + page.markdown + ' ' + page.slug).toLowerCase().includes(q));
      nav.innerHTML = '';
      if (!visible.length) {
        nav.innerHTML = '<div class="empty">No matches</div>';
        return;
      }
      const groups = new Map();
      for (const page of visible) {
        const key = page.section;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(page);
      }
      for (const [group, items] of groups) {
        const header = document.createElement('div');
        header.className = 'nav-group';
        header.textContent = label(group);
        nav.appendChild(header);
        for (const page of items.sort((a, b) => a.title.localeCompare(b.title))) {
          const button = document.createElement('button');
          button.className = 'nav-item';
          button.dataset.slug = page.slug;
          button.textContent = page.title;
          button.addEventListener('click', () => openPage(page.slug));
          nav.appendChild(button);
        }
      }
      markActive();
    }

    function markActive() {
      const active = location.hash.slice(1) || 'wiki/index';
      document.querySelectorAll('.nav-item').forEach((item) => {
        item.classList.toggle('active', item.dataset.slug === active);
      });
    }

    function openPage(slug) {
      const resolved = targetSlug(slug);
      const page = pages.find((item) => item.slug === resolved) || pages.find((item) => item.slug === 'wiki/index') || pages[0];
      location.hash = page.slug;
      content.innerHTML = page.html;
      content.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          openPage(link.getAttribute('href'));
        });
      });
      document.title = page.title + ' - ACE Context Research Viewer';
      markActive();
    }

    search.addEventListener('input', () => renderNav(search.value));
    window.addEventListener('hashchange', () => openPage(location.hash.slice(1)));

    pages.sort((a, b) => a.slug.localeCompare(b.slug));
    renderNav();
    openPage(location.hash.slice(1) || 'wiki/index');
  </script>
</body>
</html>
`;
}

const pages = readPages();
if (!pages.length) {
  throw new Error(`No markdown pages found under ${root}`);
}

const siteDir = path.join(root, 'site');
fs.mkdirSync(siteDir, { recursive: true });
fs.writeFileSync(path.join(siteDir, '.nojekyll'), '');
fs.writeFileSync(path.join(siteDir, 'index.html'), pageTemplate(pages));
console.log(`Built ${path.join(siteDir, 'index.html')} with ${pages.length} pages.`);

