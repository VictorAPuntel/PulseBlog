async function getPosts() {
  try {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    const posts = await res.json()

    let postSection = document.querySelector('.posts')

    for (const post of posts) {
      const h2 = document.createElement('h2')
      h2.textContent = post.title

      const p = document.createElement('p')
      p.textContent = post.body

      const button = document.createElement('button')
      button.addEventListener('click', () => {
        addLike(post.id)
        const likeCount = getLikesFromId(post.id)
        let word = likeCount === 1 ? 'Like' : 'Likes'
        small.textContent = `${likeCount} ${word}`
      })
      button.textContent = 'Like'

      const small = document.createElement('small')
      const likeCount = getLikesFromId(post.id)
      let word = likeCount === 1 ? 'Like' : 'Likes'
      small.textContent = `${likeCount} ${word}`

      let article = document.createElement('article')
      article.append(h2, p, button, small)
      postSection.appendChild(article)
    }
  } catch (error) {
    alert('Error on fetching posts')
  }
}

function getLikesFromId(id) {
  const likesString = localStorage.getItem('likes')
  if (!likesString) return 0
  let likes = JSON.parse(likesString)
  let postLike = likes.find((item) => item.id === id)
  if (!postLike) return 0

  return postLike.count
}

function addLike(id) {
  let likesString = localStorage.getItem('likes')
  if (!likesString) {
    likesString = '[]'
  }

  const likes = JSON.parse(likesString)
  const index = likes.findIndex((item) => item.id === id)

  if (index > -1) {
    likes[index].count++
  } else {
    likes.push({ id: id, count: 1 })
  }

  localStorage.setItem('likes', JSON.stringify(likes))
}

getPosts()
