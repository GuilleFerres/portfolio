import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'url';
import { resolve } from 'path';

const postsPath = resolve(process.cwd(), 'data', 'posts.json');

function loadPosts() {
  try {
    return JSON.parse(readFileSync(postsPath, 'utf-8'));
  } catch {
    return [];
  }
}

function savePosts(posts) {
  writeFileSync(postsPath, JSON.stringify(posts, null, 2));
}

const server = createServer((req, res) => {
  const url = parse(req.url, true);
  if (url.pathname === '/posts' && req.method === 'GET') {
    const posts = loadPosts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(posts));
  }

  if (url.pathname && url.pathname.startsWith('/posts/') && req.method === 'GET') {
    const slug = url.pathname.split('/').pop();
    const posts = loadPosts();
    const post = posts.find(p => p.slug === slug);
    if (post) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(post));
    } else {
      res.writeHead(404);
      return res.end('Not Found');
    }
  }

  if (url.pathname === '/posts' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const post = JSON.parse(body);
      const posts = loadPosts();
      posts.push(post);
      savePosts(posts);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(post));
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
