document.addEventListener('DOMContentLoaded', function () {
  // Utility function to fetch and inject components
  async function loadComponent(url, placeholderId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const data = await response.text();
      document.getElementById(placeholderId).innerHTML = data;
    } catch (error) {
      console.error(`Error loading ${url}:`, error);
      document.getElementById(placeholderId).innerHTML = `<p class="text-danger">Failed to load component.</p>`;
    }
  }

  // Load navbar, footer, and button components
  loadComponent('/components/navbar.html', 'nav-placeholder');
  loadComponent('/components/footer.html', 'footer-placeholder');
  loadComponent('/components/back-button.html', 'back-button-placeholder');

  // Fetch title, author, and date for the current post
  const postId = window.location.pathname.split('/').pop().replace('.html', '');

  async function loadPostData() {
    try {
      const response = await fetch('../data.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch data.json: ${response.statusText}`);
      }
      const data = await response.json();
      const post = data.find((p) => p.post === `posts/${postId}.html`);
      if (post) {
        document.querySelector('.post-title').textContent = post.title || 'Untitled';
        document.querySelector('.post-author').textContent = post.author ? `By ${post.author}` : 'By Unknown Author';
        document.querySelector('.post-date').textContent = post.date || 'Unknown Date';
      } else {
        console.warn(`Post data not found for ${postId}`);
      }
    } catch (error) {
      console.error('Error loading post data:', error);
      document.querySelector('.post-title').textContent = 'Error Loading Post';
    }
  }

  loadPostData();
});
