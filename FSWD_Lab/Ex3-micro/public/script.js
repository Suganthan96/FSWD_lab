fetch('/api/posts')
  .then(res => res.json())
  .then(data => {
    const posts = document.getElementById('posts');
    data.forEach(p => {
      posts.innerHTML += `<h3>${p.title}</h3><p>${p.content}</p><hr>`;
    });
  });
