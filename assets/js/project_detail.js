const teamMembersData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Project Lead & Developer",
    skills: ["React Native", "Project Management", "UI/UX"],
    avatar: "SC",
    joinedDate: "Project Founder",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Data Scientist",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    avatar: "MR",
    joinedDate: "Joined 2 weeks ago",
  },
  {
    id: 3,
    name: "Luna Park",
    role: "UI/UX Designer",
    skills: ["Figma", "User Research", "Prototyping"],
    avatar: "LP",
    joinedDate: "Joined 1 week ago",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Specialist",
    skills: ["Digital Marketing", "Content Strategy", "Analytics"],
    avatar: "DK",
    joinedDate: "Joined 3 days ago",
  },
  {
    id: 5,
    name: "Aria Patel",
    role: "Sustainability Consultant",
    skills: ["Environmental Science", "Research", "Policy"],
    avatar: "AP",
    joinedDate: "Joined 5 days ago",
  },
];

const timelineData = [
  {
    title: "Project Kickoff",
    description: "Initial team formation and project scope definition",
    date: "2 months ago",
    status: "completed",
    type: "milestone",
  },
  {
    title: "User Research Phase",
    description: "Conducted surveys and interviews with potential users",
    date: "6 weeks ago",
    status: "completed",
    type: "phase",
  },
  {
    title: "MVP Development Started",
    description: "Begin development of core tracking features",
    date: "4 weeks ago",
    status: "completed",
    type: "milestone",
  },
  {
    title: "UI/UX Design Completion",
    description: "Finalized app design and user interface mockups",
    date: "2 weeks ago",
    status: "completed",
    type: "deliverable",
  },
  {
    title: "Beta Testing Phase",
    description: "Internal testing and bug fixes in progress",
    date: "Current",
    status: "in-progress",
    type: "phase",
  },
  {
    title: "Public Beta Launch",
    description: "Release beta version to select user group",
    date: "In 2 weeks",
    status: "upcoming",
    type: "milestone",
  },
  {
    title: "Final Release",
    description: "Official app launch on app stores",
    date: "In 1 month",
    status: "upcoming",
    type: "milestone",
  },
];

const discussionData = [
  {
    author: "Sarah Chen",
    message: "Great progress everyone! The beta testing is going well.",
    timestamp: "2 hours ago",
    avatar: "SC",
  },
  {
    author: "Marcus Rodriguez",
    message: "I've finished implementing the carbon calculation algorithms.",
    timestamp: "4 hours ago",
    avatar: "MR",
  },
  {
    author: "Luna Park",
    message: "Updated the onboarding flow based on user feedback.",
    timestamp: "6 hours ago",
    avatar: "LP",
  },
  {
    author: "David Kim",
    message: "Social media campaign is ready to launch.",
    timestamp: "1 day ago",
    avatar: "DK",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  renderTeamMembers();
  renderTimeline();
  renderDiscussion();
});

function renderTeamMembers() {
  const container = document.getElementById("teamMembers");
  if (!container) return;

  container.innerHTML = "";

  teamMembersData.forEach((member) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between p-2 bg-[#1E293B] border border-neutral-600 rounded-lg";

    div.innerHTML = `
      <div class="flex items-center space-x-3 w-3/5">
        <div class="w-10 h-10 text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
          ${member.avatar}
        </div>
        <div>
          <div class="text-sm text-white font-semibold">${member.name}</div>
          <div class="text-sm text-gray-400">${member.role}</div>
          <div class="text-xs text-gray-500">${member.joinedDate}</div>
        </div>
      </div>
      <div class="text-right w-2/5">
        <div class="flex flex-wrap gap-1 justify-end mb-1">
          ${member.skills
            .slice(0, 2)
            .map(
              (skill) =>
                `<span class="bg-purple-600 bg-opacity-20 text-purple-300 px-2 py-1 rounded text-xs">${skill}</span>`
            )
            .join("")}
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderTimeline() {
  const container = document.getElementById("timeline");
  if (!container) return;

  container.innerHTML = "";

  const statusColors = {
    completed: "bg-indigo-500",
    "in-progress": "bg-purple-500",
    upcoming: "bg-pink-500",
  };

  const statusIcons = {
    completed: "✓",
    "in-progress": "⟳",
    upcoming: "○",
  };

  timelineData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "flex items-start space-x-4 pb-6";

    div.innerHTML = `
      <div class="w-8 h-8 ${
        statusColors[item.status]
      } rounded-full flex items-center justify-center text-white text-sm font-bold">
        ${statusIcons[item.status]}
      </div>
      <div class="flex-1">
        <div class="flex justify-between items-start mb-1">
          <h4 class="font-semibold text-white">${item.title}</h4>
          <span class="text-sm text-gray-400">${item.date}</span>
        </div>
        <p class="text-sm text-gray-400">${item.description}</p>
        <span class="inline-block mt-2 px-2 py-1 bg-dark-bg rounded text-xs text-gray-300 capitalize">${
          item.type
        }</span>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderDiscussion() {
  const container = document.getElementById("discussionMessages");
  if (!container) return;

  container.innerHTML = "";

  discussionData.forEach((msg) => {
    const div = document.createElement("div");
    div.className =
      "flex items-start space-x-3 p-4 rounded-lg bg-[#1E293B] border border-neutral-600";

    div.innerHTML = `
      <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
        ${msg.avatar}
      </div>
      <div class="flex-1">
        <div class="flex items-center space-x-2 mb-1">
          <span class="text-white font-semibold">${msg.author}</span>
          <span class="text-gray-400 text-sm">${msg.timestamp}</span>
        </div>
        <p class="text-gray-300">${msg.message}</p>
      </div>
    `;
    container.appendChild(div);
  });

  // Optional: Update count
  const commentCount = document.getElementById("commentCount");
  if (commentCount) commentCount.textContent = discussionData.length;
}
