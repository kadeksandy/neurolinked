// Dummy data for aspirations
const aspirationsData = [
  {
    id: 1,
    title: "AI-Powered Mental Health Companion",
    description:
      "Developing an AI chatbot that provides 24/7 mental health support using natural language processing and emotional intelligence algorithms.",
    category: "technology",
    author: "Sarah Chen",
    comments: 23,
    timeAgo: "3 days ago",
    tags: ["AI", "Mental Health", "NLP", "Healthcare"],
  },
  {
    id: 2,
    title: "Sustainable Urban Farming Network",
    description:
      "Creating a network of vertical farms in urban areas to provide fresh produce while reducing carbon footprint and transportation costs.",
    category: "social",
    author: "Marcus Rodriguez",
    comments: 15,
    timeAgo: "1 week ago",
    tags: ["Sustainability", "Urban Planning", "Agriculture", "Environment"],
  },
  {
    id: 3,
    title: "Interactive AR Art Installations",
    description:
      "Designing augmented reality art pieces that respond to viewer emotions and create immersive storytelling experiences in public spaces.",
    category: "art",
    author: "Luna Park",
    comments: 31,
    timeAgo: "2 days ago",
    tags: ["AR", "Digital Art", "Interactive Design", "Public Art"],
  },
  {
    id: 4,
    title: "Climate Change Education Platform",
    description:
      "Building an interactive platform that gamifies climate education for young people, making environmental awareness engaging and actionable.",
    category: "education",
    author: "David Kim",
    comments: 12,
    timeAgo: "5 days ago",
    tags: ["Education", "Climate", "Gamification", "Youth"],
  },
  {
    id: 5,
    title: "Blockchain-Based Voting System",
    description:
      "Developing a secure, transparent voting system using blockchain technology to ensure election integrity and increase voter participation.",
    category: "technology",
    author: "Aria Patel",
    comments: 45,
    timeAgo: "1 day ago",
    tags: ["Blockchain", "Democracy", "Security", "Civic Tech"],
  },
  {
    id: 6,
    title: "Community Music Therapy Program",
    description:
      "Establishing music therapy sessions for underserved communities, using the healing power of music to address trauma and mental health.",
    category: "music",
    author: "Jazz Williams",
    comments: 18,
    timeAgo: "4 days ago",
    tags: [
      "Music Therapy",
      "Community Health",
      "Mental Wellness",
      "Social Impact",
    ],
  },
];
// Dummy collaborators data
const collaboratorsData = [
  {
    id: 1,
    name: "Elena Rodriguez",
    title: "ML Engineer & Music Producer",
    skills: ["Machine Learning", "Python", "Music Production", "TensorFlow"],
    experience: "5 years",
    projects: 12,
    matchScore: 96,
    bio: "Passionate about combining AI with creative arts. Previously worked on audio analysis projects at Spotify.",
    avatar: "ER",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Full-Stack Developer & Composer",
    skills: ["React", "Node.js", "Music Theory", "UI/UX"],
    experience: "4 years",
    projects: 8,
    matchScore: 89,
    bio: "Classical composer turned developer. Love creating tools that make music more accessible.",
    avatar: "MC",
    location: "New York, NY",
  },
  {
    id: 3,
    name: "Aria Patel",
    title: "Data Scientist & Musician",
    skills: ["Data Science", "Statistics", "Guitar"],
    experience: "6 years",
    projects: 15,
    matchScore: 92,
    bio: "PhD in Data Science with a passion for music. Experienced in pattern recognition and audio processing.",
    avatar: "AP",
    location: "Austin, TX",
  },
  {
    id: 4,
    name: "Jordan Kim",
    title: "Product Designer & Audio Engineer",
    skills: ["Product Design", "Figma", "Audio Engineering", "User Research"],
    experience: "3 years",
    projects: 10,
    matchScore: 85,
    bio: "Designing intuitive interfaces for creative tools. Background in professional audio production.",
    avatar: "JK",
    location: "Los Angeles, CA",
  },
  {
    id: 5,
    name: "Sam Taylor",
    title: "Mobile Developer & DJ",
    skills: ["React Native", "Swift", "Music Performance", "Event Planning"],
    experience: "4 years",
    projects: 11,
    matchScore: 88,
    bio: "Mobile app specialist with deep understanding of music industry needs from performing perspective.",
    avatar: "ST",
    location: "Miami, FL",
  },
];

let filteredAspirations = [...aspirationsData];

// DOM elements
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const aspirationsGrid = document.getElementById("aspirationsGrid");
const ideaInput = document.getElementById("ideaInput");
const skillsNeeded = document.getElementById("skillsNeeded");
const projectType = document.getElementById("projectType");
const findMatchesBtn = document.getElementById("findMatchesBtn");
const loadingSection = document.getElementById("loadingSection");
const resultsSection = document.getElementById("resultsSection");
const matchCount = document.getElementById("matchCount");
const collaboratorsList = document.getElementById("collaboratorsList");

document.addEventListener("DOMContentLoaded", () => {
  renderAspirations();
  if (categoryFilter)
    categoryFilter.addEventListener("change", filterAspirations);
  if (sortFilter) sortFilter.addEventListener("change", sortAspirations);
  if (findMatchesBtn)
    findMatchesBtn.addEventListener("click", handleFindMatches);
});

// =============================== Aspirations functionality ===============================
function filterAspirations() {
  const selectedCategory = categoryFilter.value;

  if (selectedCategory === "all") {
    filteredAspirations = [...aspirationsData];
  } else {
    filteredAspirations = aspirationsData.filter(
      (aspiration) => aspiration.category === selectedCategory
    );
  }

  sortAspirations();
}

function sortAspirations() {
  const sortBy = sortFilter.value;

  switch (sortBy) {
    case "newest":
      filteredAspirations.sort(
        (a, b) => new Date(b.timeAgo) - new Date(a.timeAgo)
      );
      break;
    case "popular":
      filteredAspirations.sort((a, b) => b.comments - a.comments);
      break;
  }

  renderAspirations();
}

function renderAspirations() {
  if (!aspirationsGrid) return;

  aspirationsGrid.innerHTML = "";

  filteredAspirations.forEach((aspiration, index) => {
    const card = createAspirationCard(aspiration);
    card.style.animationDelay = `${index * 0.1}s`;
    aspirationsGrid.appendChild(card);
  });
}

function createAspirationCard(aspiration) {
  const card = document.createElement("div");
  card.className =
    "aspiration-card fade-in bg-[#1E293B] rounded-xl shadow-lg overflow-hidden flex flex-col h-full";

  card.innerHTML = `
    <div class="flex flex-col justify-between h-full p-5">
      <!-- Atas -->
      <div class="flex justify-between items-start mb-3">
        <span class="category-badge">${aspiration.category}</span>
        <div class="flex items-center space-x-3 text-sm text-gray-400">
          <div class="flex items-center gap-1">
            <i class="bx bx-message-rounded-dots text-lg"></i>
            <span>${aspiration.comments}</span>
          </div>
        </div>
      </div>

      <!-- Judul -->
      <h3 class="text-base sm:text-lg font-bold text-white leading-tight mb-2 text-left">
        ${aspiration.title}
      </h3>

      <!-- Deskripsi -->
      <p class="text-sm text-gray-400 text-justify leading-relaxed mb-3 line-clamp-3">
        ${aspiration.description}
      </p>

      <!-- Tags -->
      <div class="tags flex flex-wrap gap-2 mb-4">
        ${aspiration.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-2 mt-auto">
        <span>by ${aspiration.author}</span>
        <span>${aspiration.timeAgo}</span>
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    window.location.href = `aspirations_detail.html?id=${aspiration.id}`;
  });

  return card;
}

// =============================== AI Matcher functionality ===============================
function handleFindMatches() {
  const idea = ideaInput.value.trim();

  if (!idea) {
    showNotification("Please describe your idea first.", "error");
    return;
  }

  loadingSection.classList.remove("hidden");
  resultsSection.classList.add("hidden");

  // Simulate AI processing
  setTimeout(() => {
    showResults();
  }, 3000);
}

function showResults() {
  loadingSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");

  // Render collaborators
  renderCollaborators();

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

function renderCollaborators() {
  if (!collaboratorsList) return;

  collaboratorsList.innerHTML = "";

  // Sort by match score
  const sortedCollaborators = [...collaboratorsData].sort(
    (a, b) => b.matchScore - a.matchScore
  );

  sortedCollaborators.forEach((collaborator, index) => {
    const card = createCollaboratorCard(collaborator);
    card.style.animationDelay = `${index * 0.2}s`;
    collaboratorsList.appendChild(card);
  });
}

function createCollaboratorCard(collaborator) {
  const card = document.createElement("div");
  card.className =
    "collaborator-card fade-in bg-[#1E293B] rounded-xl p-5 shadow-lg cursor-pointer";

  const matchColor =
    collaborator.matchScore >= 90
      ? "high"
      : collaborator.matchScore >= 80
      ? "medium"
      : "low";

  card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
                <div class="collaborator-avatar">${collaborator.avatar}</div>
                <div>
                    <h3 class="text-lg font-bold text-white">${collaborator.name}</h3>
                    <p class="text-gray-400 text-sm">${collaborator.title}</p>
                    <p class="text-gray-500 text-xs">${collaborator.location}</p>
                </div>
            </div>
            <div class="text-right">
                <div class="match-score ${matchColor}">${collaborator.matchScore}%</div>
                <div class="text-xs text-gray-400">Match</div>
            </div>
        </div>
        
        <p class="text-gray-300 text-sm mb-4">${collaborator.bio}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
            ${collaborator.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
        
        <div class="flex justify-between items-center text-sm text-gray-400 mb-4">
            <span>${collaborator.experience} experience</span>
            <span>${collaborator.projects} projects completed</span>
        </div>
        
        <div class="flex space-x-3">
            <button onclick="event.stopPropagation(); inviteCollaborator(${collaborator.id})" class="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25">
                Invite to Collaborate
            </button>
            <button onclick="event.stopPropagation(); viewProfile(${collaborator.id})" class="btn-secondary">
                View Profile
            </button>
        </div>
    `;

  // Redirect ke halaman aspirasi detail jika card diklik
  card.addEventListener("click", () => {
    window.location.href = `aspirations_detail.html?id=${collaborator.aspirationId || collaborator.id}`;
  });

  return card;
}

