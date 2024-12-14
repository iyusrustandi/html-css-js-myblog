// document.addEventListener('DOMContentLoaded', function () {
//   // Fetch and inject the navbar
//   fetch('/components/navbar.html')
//     .then((response) => response.text())
//     .then((data) => {
//       document.getElementById('nav-placeholder').innerHTML = data;
//     })
//     .catch((error) => console.error('Error loading navbar:', error));

//   // Fetch title, author and date for post-1.html
//   fetch('../data.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const postsList = document.getElementById('posts-list').querySelector('.row');
//       data.forEach((post) => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('col');

//         const cardElement = document.createElement('div');
//         cardElement.classList.add('card');

//         const cardBodyElement = document.createElement('div');
//         cardBodyElement.classList.add('card-body');

//         const postTitleElement = document.createElement('h5');
//         postTitleElement.classList.add('card-subtitle', 'mb-2', 'text-muted');
//         postTitleElement.textContent = post.title;
//         cardBodyElement.appendChild(postTitleElement);

//         const postAuthorElement = document.createElement('div');
//         postAuthorElement.classList.add('card-subtitle', 'mb-2', 'text-muted');
//         postAuthorElement.textContent = `By ${post.author}`;
//         cardBodyElement.appendChild(postAuthorElement);

//         const postDateElement = document.createElement('div');
//         postDateElement.classList.add('card-subtitle', 'mb-2', 'text-muted');
//         postDateElement.textContent = post.date;
//         cardBodyElement.appendChild(postDateElement);

//         const postSummaryElement = document.createElement('p');
//         postSummaryElement.classList.add('card-text');
//         postSummaryElement.textContent = post.summary;
//         cardBodyElement.appendChild(postSummaryElement);

//         const readMoreLink = document.createElement('a');
//         readMoreLink.href = post.post;
//         readMoreLink.classList.add('btn', 'btn-primary');
//         readMoreLink.textContent = 'Read more';
//         cardBodyElement.appendChild(readMoreLink);

//         cardElement.appendChild(cardBodyElement);
//         postElement.appendChild(cardElement);
//         postsList.appendChild(postElement);
//       });
//     })
//     .catch((error) => console.error('Error loading JSON data:', error));
// });

document.addEventListener('DOMContentLoaded', () => {
  async function loadNavbar() {
    try {
      const response = await fetch('/components/navbar.html');
      const data = await response.text();
      document.getElementById('nav-placeholder').innerHTML = data;
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }

  async function loadBlogPosts() {
    try {
      const response = await fetch('../data.json');
      const data = await response.json();

      let currentPage = 1;
      const postsPerPage = 6;
      const totalPages = Math.ceil(data.length / postsPerPage);
      const postsList = document.getElementById('posts-list').querySelector('.row');

      // Render pagination controls
      function renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
          const pageItem = document.createElement('li');
          pageItem.classList.add('page-item');
          if (i === currentPage) {
            pageItem.classList.add('active');
          }

          const pageLink = document.createElement('a');
          pageLink.classList.add('page-link');
          pageLink.textContent = i;
          pageLink.href = '#';
          pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderBlogPosts();
          });

          pageItem.appendChild(pageLink);
          paginationContainer.appendChild(pageItem);
        }
      }

      // Render blog posts for the current page
      function renderBlogPosts() {
        postsList.innerHTML = ''; // Clear current posts
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToDisplay = data.slice(startIndex, endIndex);

        postsToDisplay.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.classList.add('col-md-4', 'mb-4');

          const cardElement = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${post.title || 'Untitled'}</h5>
                <div class="card-subtitle mb-2 text-muted">By ${post.author || 'Unknown'}</div>
                <div class="card-subtitle mb-2 text-muted">${post.date || 'Unknown Date'}</div>
                <p class="card-text">${post.summary || 'No summary available.'}</p>
                <a href="${post.post || '#'}" class="btn btn-primary">Read more</a>
              </div>
            </div>
          `;
          postElement.innerHTML = cardElement;
          postsList.appendChild(postElement);
        });

        renderPagination();
      }

      renderBlogPosts();
    } catch (error) {
      console.error('Error loading JSON data:', error);
      document.getElementById('posts-list').innerHTML = '<p class="text-danger">Failed to load blog posts. Please try again later.</p>';
    }
  }

  async function loadFooter() {
    try {
      const response = await fetch('/components/footer.html');
      const data = await response.text();
      document.getElementById('footer-placeholder').innerHTML = data;
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }

  loadNavbar();
  loadBlogPosts();
  loadFooter();
});
