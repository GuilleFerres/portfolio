import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/astro';
import BlogIndex from '../../src/pages/blog/index.astro';

import posts from '../../data/posts.json';

describe('BlogIndex', () => {
  it('muestra un enlace al primer post', async () => {
    const { getByText } = await render(BlogIndex, {});
    const link = getByText(posts[0].title);
    expect(link.getAttribute('href')).toBe(`/blog/${posts[0].slug}/`);
  });
});
