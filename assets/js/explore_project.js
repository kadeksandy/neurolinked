const projectsData = [
  {
    id: 1,
    title: "EcoTrack: Personal Carbon Footprint App",
    description:
      "Mobile app helping users track and reduce their carbon footprint through gamification and community challenges.",
    category: "tech",
    status: "progress",
    progress: 68,
    members: 5,
    skills: ["React Native", "UI/UX", "Data Analysis"],
    timeLeft: "3 weeks",
    author: "Green Team Collective",
  },
  {
    id: 2,
    title: "Community Cookbook Platform",
    description:
      "Digital platform for sharing family recipes and cultural food traditions across communities.",
    category: "social",
    status: "open",
    progress: 15,
    members: 2,
    skills: ["Web Development", "Content Strategy", "Community Management"],
    timeLeft: "8 weeks",
    author: "Cultural Kitchen Co.",
  },
  {
    id: 3,
    title: "AI-Powered Music Therapy Tool",
    description:
      "Therapeutic application using AI to create personalized music experiences for mental health support.",
    category: "tech",
    status: "progress",
    progress: 45,
    members: 4,
    skills: ["Machine Learning", "Music Theory", "Psychology"],
    timeLeft: "5 weeks",
    author: "MindSound Labs",
  },
  {
    id: 4,
    title: "Urban Garden Network",
    description:
      "Connecting urban gardeners to share resources, knowledge, and organize community growing spaces.",
    category: "social",
    status: "done",
    progress: 100,
    members: 8,
    skills: ["Community Organizing", "Mobile Development", "Sustainability"],
    timeLeft: "Completed",
    author: "City Growers Alliance",
  },
  {
    id: 5,
    title: "Interactive Art Installation: 'Emotions in Motion'",
    description:
      "Large-scale digital art piece responding to viewer emotions through facial recognition and projection mapping.",
    category: "art",
    status: "progress",
    progress: 72,
    members: 6,
    skills: ["Digital Art", "Computer Vision", "Hardware"],
    timeLeft: "2 weeks",
    author: "Digital Canvas Collective",
  },
  {
    id: 6,
    title: "Podcast Series: 'Future Voices'",
    description:
      "Educational podcast featuring young innovators and their solutions to global challenges.",
    category: "education",
    status: "open",
    progress: 25,
    members: 3,
    skills: ["Audio Production", "Interviewing", "Marketing"],
    timeLeft: "6 weeks",
    author: "Next Gen Media",
  },
];

let filteredProjects = [...projectsData];

const statusFilters = document.querySelectorAll(".status-filter");
const categoryFilter = document.getElementById("categoryFilter");
const projectsGrid = document.getElementById("projectsGrid");

statusFilters.forEach((filter) => {
  filter.addEventListener("click", handleStatusFilter);
});
categoryFilter.addEventListener("change", handleCategoryFilter);

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});

function handleStatusFilter(e) {
  statusFilters.forEach((btn) => {
    btn.classList.remove("active", "bg-purple-600", "text-white");
    btn.classList.add(
      "bg-dark-card",
      "border",
      "border-dark-border",
      "text-gray-300"
    );
  });

  e.target.classList.add("active", "bg-purple-600", "text-white");
  e.target.classList.remove(
    "bg-dark-card",
    "border",
    "border-dark-border",
    "text-gray-300"
  );

  const status = e.target.dataset.status;
  filterProjects(status, categoryFilter.value);
}

function handleCategoryFilter() {
  const activeStatusFilter = document.querySelector(".status-filter.active");
  const status = activeStatusFilter ? activeStatusFilter.dataset.status : "all";
  filterProjects(status, categoryFilter.value);
}

function filterProjects(status, category) {
  filteredProjects = projectsData.filter((project) => {
    const statusMatch = status === "all" || project.status === status;
    const categoryMatch = category === "all" || project.category === category;
    return statusMatch && categoryMatch;
  });

  renderProjects();
}

function renderProjects() {
  projectsGrid.innerHTML = "";

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-400 text-lg">No projects found matching your criteria.</div>
                <div class="text-gray-500 text-sm mt-2">Try adjusting your filters or check back later for new projects.</div>
            </div>
        `;
    return;
  }

  filteredProjects.forEach((project, index) => {
    const card = createProjectCard(project);
    card.style.animationDelay = `${index * 0.1}s`;
    projectsGrid.appendChild(card);
  });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className =
    "bg-[#1E293B] text-white rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-xl transition-all duration-300 card-hover fade-in cursor-pointer h-full flex flex-col justify-between";

  const statusColors = {
    open: "bg-indigo-300",
    progress: "bg-indigo-500",
    done: "bg-indigo-800",
  };

  const statusLabels = {
    open: "Open",
    progress: "Progress",
    done: "Completed",
  };

  card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div class="flex gap-2">
                <span class="inline-block ${
                  statusColors[project.status]
                } text-white px-3 py-1 rounded-full text-sm">
                    ${statusLabels[project.status]}
                </span>
                <span class="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm capitalize">
                    ${project.category}
                </span>
            </div>
            <div class="text-right text-sm text-gray-400">
                <div>${project.members} members</div>
            </div>
        </div>
        
        <h3 class="text-xl font-bold mb-3">${project.title}</h3>
        <p class="text-gray-400 mb-4 line-clamp-3">${project.description}</p>
        
        <!-- Progress Bar -->
        <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-400">Progress</span>
                <span class="text-sm text-gray-400">${project.progress}%</span>
            </div>
            <div class="w-full bg-[#334155] rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style="width: ${project.progress}%"></div>
            </div>
        </div>
        
        <!-- Skills Needed -->
        <div class="flex flex-wrap gap-2 mb-4">
            ${project.skills
              .map(
                (skill) =>
                  `<span class="bg-[#0F172A] text-gray-300 px-2 py-1 rounded text-xs">${skill}</span>`
              )
              .join("")}
        </div>
        
        <div class="flex justify-between items-center text-sm text-gray-400">
            <span>by ${project.author}</span>
            <span>${project.timeLeft}</span>
        </div>
    `;

  card.addEventListener("click", () => {
    window.location.href = "project_detail.html";
  });

  return card;
}
