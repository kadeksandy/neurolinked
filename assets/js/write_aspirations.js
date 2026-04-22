// DOM elements
const aspirationForm = document.getElementById("aspirationForm")
const titleInput = document.getElementById("title")
const categorySelect = document.getElementById("category")
const descriptionTextarea = document.getElementById("description")
const tagsInput = document.getElementById("tags")
const charCount = document.getElementById("charCount")
const successModal = document.getElementById("successModal")
const closeModal = document.getElementById("closeModal")

// Event listeners
aspirationForm.addEventListener("submit", handleSubmit)
descriptionTextarea.addEventListener("input", updateCharCount)
closeModal.addEventListener("click", hideSuccessModal)

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  updateCharCount()
})

function updateCharCount() {
  const currentLength = descriptionTextarea.value.length
  charCount.textContent = currentLength

  // Change color based on character count
  if (currentLength > 1800) {
    charCount.classList.add("text-red-400")
    charCount.classList.remove("text-gray-400", "text-yellow-400")
  } else if (currentLength > 1500) {
    charCount.classList.add("text-yellow-400")
    charCount.classList.remove("text-gray-400", "text-red-400")
  } else {
    charCount.classList.add("text-gray-400")
    charCount.classList.remove("text-yellow-400", "text-red-400")
  }
}

function handleSubmit(e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(aspirationForm)
  const aspirationData = {
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    tags: formData.get("tags"),
    skills: formData.getAll("skills"),
  }

  // Basic validation
  if (!aspirationData.title || !aspirationData.category || !aspirationData.description) {
    alert("Please fill in all required fields.")
    return
  }

  if (aspirationData.description.length > 2000) {
    alert("Description must be 2000 characters or less.")
    return
  }

  // Simulate form submission
  const submitButton = aspirationForm.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML

  // Show loading state
  submitButton.innerHTML = "Submitting..."
  submitButton.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    // Reset button
    submitButton.innerHTML = originalText
    submitButton.disabled = false

    // Show success modal
    showSuccessModal()

    // Reset form
    aspirationForm.reset()
    updateCharCount()
  }, 2000)
}

function showSuccessModal() {
  successModal.classList.remove("hidden")
  successModal.classList.add("modal-backdrop")

  // Add animation
  const modalContent = successModal.querySelector("div > div")
  modalContent.style.transform = "scale(0.9)"
  modalContent.style.opacity = "0"

  setTimeout(() => {
    modalContent.style.transform = "scale(1)"
    modalContent.style.opacity = "1"
    modalContent.style.transition = "all 0.3s ease"
  }, 100)
}

function hideSuccessModal() {
  const modalContent = successModal.querySelector("div > div")
  modalContent.style.transform = "scale(0.9)"
  modalContent.style.opacity = "0"

  setTimeout(() => {
    successModal.classList.add("hidden")
    successModal.classList.remove("modal-backdrop")
  }, 300)
}

// Close modal when clicking outside
successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    hideSuccessModal()
  }
})
