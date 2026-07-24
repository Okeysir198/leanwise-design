import type { Story } from '@ladle/react';
import './css';
import { StoryCard, FeatureGrid, LogoRail, Icon } from '../src/react';

export const StoryCardLive: Story = () => (
  <div style={{ maxWidth: 420 }}>
    <StoryCard
      company="TALIMEX"
      industry="IKEA-supplier plant"
      description="Runs CONNECT documentation validation on LeanWise. Every declared value in the evidence pack is checked against the Connect TSS matrix."
      status="live"
    />
  </div>
);

export const StoryCardNoMark: Story = () => (
  <div style={{ maxWidth: 420 }}>
    <StoryCard
      company="Z76"
      industry="IKEA-supplier plant"
      description="No mark exists for this customer — it degrades to the typeset wordmark, identical optical box."
      status="live"
      monogramName="Z76"
    />
  </div>
);

export const FeatureGridWithIcons: Story = () => (
  <FeatureGrid
    items={[
      { icon: <Icon.Check />, title: 'Named checkpoints', body: 'Document Type Match, Excel Record Match, Test Item Coverage — every one returns an explicit status.' },
      { icon: <Icon.File />, title: 'Whole evidence pack', body: 'Test reports, declarations, SDS, delivery specs, scope certificates, BOM — cross-checked through your Internal TSS.' },
      { icon: <Icon.Step />, title: 'Deterministic', body: 'Same input, same output. The validator replays; it does not jitter.' },
    ]}
  />
);

export const LogoRailMixed: Story = () => (
  <LogoRail
    items={[
      { id: 'talimex', name: 'TALIMEX', mark: '' },
      { id: 'z76', name: 'Z76' },
      { id: 'sedo', name: 'SEDO', mark: '' },
      { id: 'vinhlong', name: 'Vinh Long' },
    ]}
  />
);
