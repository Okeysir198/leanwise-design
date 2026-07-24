import type { Story } from '@ladle/react';
import './css';
import { Button, Eyebrow, Card } from '../src/react';

export const Buttons: Story = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
    <Button variant="primary" arrow>Get a demo</Button>
    <Button variant="brand">Brand action</Button>
    <Button variant="ink">Ink</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);

export const Eyebrows: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Eyebrow>Compliance validation</Eyebrow>
    <Eyebrow muted>Built against real paperwork</Eyebrow>
  </div>
);

export const Cards: Story = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 260px))', gap: 16 }}>
    <Card>A plain card on the surface token.</Card>
    <Card glow>This one lifts on hover with the brand glow.</Card>
  </div>
);
