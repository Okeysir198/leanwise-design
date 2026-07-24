import type { Story } from '@ladle/react';
import './css';
import { ThemeToggle } from '../src/react';

export const Default: Story = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 24 }}>
    <ThemeToggle aria-label="Theme (labels)" />
    <ThemeToggle aria-label="Theme (icons only)" showLabels={false} />
  </div>
);

Default.decorators = [
  (Story) => (
    <div style={{ background: 'var(--lw-bg)', padding: 24, minHeight: 120 }}>
      <Story />
    </div>
  ),
];
