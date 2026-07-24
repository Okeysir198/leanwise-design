import type { Story } from '@ladle/react';
import './css';
import { Console } from '../src/react';

const files = [
  { id: 'tr', label: 'TR · Test Report' },
  { id: 'grs', label: 'GRS · Scope Certificate' },
  { id: 'sd', label: 'SD · Self Declaration' },
];

export const Shell: Story = () => (
  <div style={{ maxWidth: 640 }}>
    <Console
      filename="evidence-pack"
      files={files}
      activeFileId="tr"
      stepCount={4}
      stepIndex={4}
    >
      <div className="lw-validate-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
        <span>Document Type Match</span>
        <span className="lw-stamp" data-state="passed">Passed</span>
      </div>
      <div className="lw-validate-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
        <span>Excel Record Match</span>
        <span className="lw-stamp" data-state="warning">Passed with Warning</span>
      </div>
      <div className="lw-validate-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
        <span>Test Item Coverage</span>
        <span className="lw-stamp" data-state="failed">Failed</span>
      </div>
    </Console>
  </div>
);
