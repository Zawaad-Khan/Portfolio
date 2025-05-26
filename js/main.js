async function loadSubstackPosts() {
  try {
    const res = await fetch('https://zawaadkhan.substack.com/feed');
    const xml = new DOMParser().parseFromString(await res.text(), 'application/xml');
    const items = xml.querySelectorAll('item');
    const cont = document.getElementById('posts-container');
    cont.innerHTML = '';
    Array.from(items).slice(0, 5).forEach(item => {
      const title = item.querySelector('title')?.textContent || 'Untitled';
      const link = item.querySelector('link')?.textContent || '#';
      const date = new Date(item.querySelector('pubDate')?.textContent).toLocaleDateString();
      const desc = item.querySelector('description')?.textContent || '';
      const art = document.createElement('article');
      art.innerHTML = `
        <h3><a href="\${link}" target="_blank" rel="noopener">\${title}</a></h3>
        <small>\${date}</small>
        <p>\${desc}</p>
      `;
      cont.appendChild(art);
    });
  } catch (e) {
    console.error(e);
    document.getElementById('posts-container').textContent = 'Failed to load posts.';
  }
}
document.addEventListener('DOMContentLoaded', loadSubstackPosts);
