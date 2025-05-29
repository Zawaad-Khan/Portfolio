// ========================
// main.js – Zawaad's Site
// ========================

// Substack fetch function — preserved for future use (currently disabled)
async function loadSubstackPosts() {
  const container = document.getElementById('posts-container');
  container.innerHTML = '<p>Loading posts…</p>';
  try {
    // This endpoint no longer works — API is deprecated or private
    const res = await fetch('https://zawaadkhan.substack.com/api/v1/latest-posts?limit=5');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { posts } = await res.json();

    container.innerHTML = '';
    posts.forEach(post => {
      const title = post.title || 'Untitled';
      const link  = post.url   || '#';
      const date  = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString()
        : '';
      const desc  = post.previewContent || '';

      const art = document.createElement('article');
      art.innerHTML = `
        <h3><a href="${link}" target="_blank" rel="noopener">${title}</a></h3>
        <small>${date}</small>
        <p>${desc}</p>
      `;
      container.appendChild(art);
    });

    if (!posts.length) {
      container.textContent = 'No posts available.';
    }
  } catch (err) {
    console.error('Substack error:', err);
    container.textContent = 'Failed to load posts.';
  }
}

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  // Substack is now handled by widget embed in index.html
  // Commented out to prevent error from broken API
  // loadSubstackPosts();

  // Reveal footer on scroll
  const footer = document.querySelector('.site-footer');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }
  });
});
