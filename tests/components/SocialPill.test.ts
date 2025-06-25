import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/astro';
import SocialPill from '../../src/components/SocialPill.astro';

describe('SocialPill', () => {
  it('includes rel="noopener noreferrer" when target="_blank"', async () => {
    const { getByRole } = await render(SocialPill, { props: { href: '/foo' } });
    const link = getByRole('link');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
