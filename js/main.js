// ========================
// main.js – Zawaad's Site
// ========================
// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('substack-posts');
  if (!container) return;

  const feedUrl = 'https://zawaadkhan.substack.com/feed';

  fetch(feedUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
      const items = Array.from(data.querySelectorAll('item')).slice(0, 3);
      if (!items.length) {
        throw new Error('No items in feed');
      }

      let html = '';
      items.forEach((item) => {
        const title = item.querySelector('title')?.textContent || 'Untitled';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || '';

        const preview = description
          .replace(/(<([^>]+)>)/gi, '')
          .trim()
          .slice(0, 140);

        html += `
          <article class="substack-post">
            <h3><a href="${link}" target="_blank" rel="noopener">${title}</a></h3>
            <p>${preview}${description.length > 140 ? '…' : ''}</p>
          </article>`;
      });

      container.insertAdjacentHTML('beforeend', html);
    })
    .catch(() => {
      container.innerHTML +=
        '<p>Unable to load posts. Visit <a href="https://zawaadkhan.substack.com/">my Substack</a> for more.</p>';
    });
});
