const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');
const builder = path.join(projectRoot, 'tools', 'build-viewer.js');

function writeFixture(root) {
  fs.mkdirSync(path.join(root, 'wiki', 'concepts'), { recursive: true });
  fs.mkdirSync(path.join(root, 'reports', 'runs'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'wiki', 'index.md'),
    [
      '---',
      'title: Test Wiki',
      '---',
      '# Test Wiki',
      '',
      '- [[concepts/context-collapse]]',
      '- [Latest](../reports/latest-interesting.md)',
    ].join('\n')
  );
  fs.writeFileSync(
    path.join(root, 'wiki', 'concepts', 'context-collapse.md'),
    '# Context Collapse\n\nA <script>bad()</script> detail with **bold** text.'
  );
  fs.writeFileSync(
    path.join(root, 'reports', 'latest-interesting.md'),
    '# Latest\n\nInteresting ACE update.'
  );
  fs.writeFileSync(
    path.join(root, 'reports', 'runs', '2026-08-16-2000.md'),
    '# Run Report\n\nAccepted: arXiv test.'
  );
}

test('build-viewer creates a self-contained searchable browser page', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ace-viewer-'));
  writeFixture(root);

  execFileSync(process.execPath, [builder, '--root', root], { stdio: 'pipe' });

  const htmlPath = path.join(root, 'site', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert.match(html, /ACE Context Research Viewer/);
  assert.match(html, /&quot;slug&quot;:&quot;wiki\/concepts\/context-collapse&quot;/);
  assert.match(html, /&quot;slug&quot;:&quot;reports\/runs\/2026-08-16-2000&quot;/);
  assert.match(html, /Context Collapse/);
  assert.doesNotMatch(html, /<script>bad\(\)<\/script>/);
  assert.match(html, /&lt;script&gt;bad\(\)&lt;\/script&gt;/);
  assert.match(html, /data-pages=/);
});
