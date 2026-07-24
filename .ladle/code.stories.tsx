import type { Story } from '@ladle/react';
import './css';
import { CodeBlock } from '../src/react';

// Raw code path (escaped, no highlighting) — keeps the docs build free of a refractor dep.
const PY = `class PhaseSelection(BaseModel):
    parse: bool = True
    extract: bool = True
    validate: bool = True
    internal_tss: bool = True`;

export const WithFilename: Story = () => (
  <div style={{ maxWidth: 560 }}>
    <CodeBlock filename="backend/api/jobs.py" code={PY} lang="python" />
  </div>
);

export const Tabs: Story = () => (
  <div style={{ maxWidth: 560 }}>
    <CodeBlock
      filename="CONNECT Mastery backend"
      tabs={[
        { id: 'phases', label: 'Phases', code: PY, lang: 'python' },
        { id: 'cli', label: 'CLI', code: 'python -m converter --input in.xlsx --output out.xlsx', lang: 'bash' },
      ]}
    />
  </div>
);
