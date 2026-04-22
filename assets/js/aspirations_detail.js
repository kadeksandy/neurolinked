// Dummy comments data
const commentsData = [
  {
    id: 1,
    author: "Alex Thompson",
    content:
      "This is such an innovative idea! I've been working with ML models for music analysis and would love to contribute to this project.",
    timeAgo: "2 hours ago",
    avatar: "AT",
  },
  {
    id: 2,
    author: "Maria Santos",
    content:
      "As a music teacher, I can see huge potential for this in education. Have you considered adding features for music theory learning?",
    timeAgo: "5 hours ago",
    avatar: "MS",
  },
  {
    id: 3,
    author: "Jordan Lee",
    content:
      "The UI/UX aspect of this will be crucial. I'd be interested in helping design an intuitive interface for musicians.",
    timeAgo: "1 day ago",
    avatar: "JL",
  },
]

// DOM elements
const commentsList = document.getElementById("commentsList")
const commentTemplate = document.getElementById("commentTemplate")
const commentTitle = document.getElementById("commentTitle")

document.addEventListener("DOMContentLoaded", () => {
  renderComments()
})

function renderComments() {
  commentsList.innerHTML = ""
  commentsData.forEach((comment, index) => {
    const commentElement = createCommentElement(comment)
    commentElement.style.animationDelay = `${index * 0.1}s`
    commentsList.appendChild(commentElement)
  })
  commentTitle.textContent = `Comments (${commentsData.length})`
}

function createCommentElement(comment) {
  const clone = commentTemplate.querySelector(".comment-item").cloneNode(true)

  clone.querySelector(".avatar").textContent = comment.avatar
  clone.querySelector(".author").textContent = comment.author
  clone.querySelector(".time").textContent = comment.timeAgo
  clone.querySelector(".content").textContent = comment.content

  // Hapus tombol reply & delete dan replies container
  const actions = clone.querySelector(".actions")
  if (actions) actions.remove()
  const replies = clone.querySelector(".replies")
  if (replies) replies.remove()

  return clone
}
