const fs = require('fs');
const path = require('path');

const ROOT = 'c:/qa-ai-practical-assessment/qa-ai-practical-assessment';
const TRANSCRIPTS = 'C:/Users/Ankit Sharma/.cursor/projects/c-qa-ai-practical-assessment/agent-transcripts';

function norm(p) {
  return p.replace(/\\/g, '/').toLowerCase().replace(/.*qa-ai-practical-assessment\//, 'qa-ai-practical-assessment/');
}

function relToAbs(rel) {
  return path.join('c:/qa-ai-practical-assessment', rel.replace(/^qa-ai-practical-assessment\//, 'qa-ai-practical-assessment/'));
}

function walkJsonl(dir, fn) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkJsonl(p, fn);
    else if (ent.name.endsWith('.jsonl')) fn(p);
  }
}

const ops = [];
walkJsonl(TRANSCRIPTS, (file) => {
  const mtime = fs.statSync(file).mtimeMs;
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
  lines.forEach((line, idx) => {
    let obj;
    try { obj = JSON.parse(line); } catch { return; }
    for (const item of obj.message?.content || []) {
      if (item.type !== 'tool_use') continue;
      const p = item.input?.path;
      if (!p || !/qa-ai-practical-assessment/i.test(p)) continue;
      const key = norm(p);
      if (item.name === 'Write') {
        ops.push({ type: 'write', key, contents: item.input.contents, file, mtime, idx });
      } else if (item.name === 'StrReplace') {
        ops.push({ type: 'replace', key, old_string: item.input.old_string, new_string: item.input.new_string, file, mtime, idx });
      }
    }
  });
});

ops.sort((a, b) => a.mtime - b.mtime || a.idx - b.idx);

const files = new Map();
for (const op of ops) {
  if (!files.has(op.key)) files.set(op.key, []);
  files.get(op.key).push(op);
}

function restore(key) {
  const chain = files.get(key) || [];
  let content = null;
  const log = [];
  for (const op of chain) {
    if (op.type === 'write') {
      content = op.contents;
      log.push(`WRITE from ${path.basename(op.file)} (${content.length} chars)`);
    } else if (op.type === 'replace') {
      if (content === null) {
        log.push(`SKIP replace (no base yet) from ${path.basename(op.file)}`);
        continue;
      }
      if (!content.includes(op.old_string)) {
        log.push(`WARN replace old_string not found in ${path.basename(op.file)} (old len ${op.old_string.length})`);
        continue;
      }
      content = content.replace(op.old_string, op.new_string);
      log.push(`REPLACE from ${path.basename(op.file)} -> ${content.length} chars`);
    }
  }
  return { content, log };
}

const targets = [
  'qa-ai-practical-assessment/readme.md',
  'qa-ai-practical-assessment/ai-prompts/automation-and-debugging.md',
  'qa-ai-practical-assessment/ai-prompts/documentation-and-summary.md',
  'qa-ai-practical-assessment/ai-prompts/test-data.md',
  'qa-ai-practical-assessment/apitestcase.csv',
  'qa-ai-practical-assessment/ai-prompts/test-design.md',
  'qa-ai-practical-assessment/ai-prompts/api-testing-design.md',
];

const report = [];
for (const key of targets) {
  const { content, log } = restore(key);
  if (!content) {
    report.push({ key, status: 'MISSING', log });
    continue;
  }
  const out = relToAbs(key);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
  const lines = content.split('\n').length;
  report.push({ key, status: 'RESTORED', lines, log });
}

// requirements-and-risk-analysis from assistant text
const riskFile = path.join(TRANSCRIPTS, '43208b6e-1bcf-4b5f-bab7-482213c79715/43208b6e-1bcf-4b5f-bab7-482213c79715.jsonl');
const riskLines = fs.readFileSync(riskFile, 'utf8').split('\n').filter(Boolean);
for (const line of riskLines) {
  const obj = JSON.parse(line);
  for (const item of obj.message?.content || []) {
    if (item.type === 'text' && item.text?.startsWith('# Requirement Analysis')) {
      const out = path.join(ROOT, 'requirements-and-risk-analysis.md');
      fs.writeFileSync(out, item.text);
      report.push({
        key: 'requirements-and-risk-analysis.md',
        status: 'RESTORED',
        lines: item.text.split('\n').length,
        log: ['from assistant text 43208b6e'],
      });
    }
  }
}

console.log(JSON.stringify(report, null, 2));
