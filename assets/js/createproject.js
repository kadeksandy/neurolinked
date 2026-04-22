// create project form class
class CreateProjectForm {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.skills = [];
    this.init();
  }

  init() {
    this.initializeElements();
    this.setupEventListeners();
    this.updateStepDisplay();
    this.updateProgress();
    this.updateButtons();
  }

  initializeElements() {
    this.form = document.getElementById("createProjectForm");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.submitBtn = document.getElementById("submitBtn");
    this.progressFill = document.getElementById("progressFill");
    this.skillInput = document.getElementById("skillInput");
    this.skillTags = document.getElementById("skillTags");
    this.skillsHidden = document.getElementById("skillsHidden");
    this.descriptionTextarea = document.querySelector(
      'textarea[name="description"]'
    );
    this.descriptionCount = document.getElementById("descriptionCount");
    this.fileInput = document.getElementById("projectImages");
    this.fileList = document.getElementById("fileList");
  }

  setupEventListeners() {
    // navigation buttons
    this.prevBtn.addEventListener("click", () => this.previousStep());
    this.nextBtn.addEventListener("click", () => this.nextStep());
    this.submitBtn.addEventListener("click", (e) => this.submitForm(e));

    // form validation
    this.form.addEventListener("input", (e) => this.validateField(e.target));
    this.form.addEventListener("change", (e) => this.validateField(e.target));

    // skill input
    this.skillInput.addEventListener("keypress", (e) =>
      this.handleSkillInput(e)
    );

    // description character counter
    this.descriptionTextarea.addEventListener("input", () =>
      this.updateCharacterCount()
    );

    // project type selection
    document.querySelectorAll('input[name="projectType"]').forEach((radio) => {
      radio.addEventListener("change", () => this.updateProjectTypeSelection());
    });

    // file upload
    this.fileInput.addEventListener("change", () => this.handleFileUpload());
  }

  // navigation logic
  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.updateStepDisplay();
        this.updateProgress();
        this.updateButtons();

        if (this.currentStep === 4) {
          this.generatePreview();
        }
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepDisplay();
      this.updateProgress();
      this.updateButtons();
    }
  }

  // ui updates
  updateStepDisplay() {
    document.querySelectorAll(".form-step").forEach((step) => {
      step.classList.remove("active");
    });

    document
      .querySelector(`.form-step[data-step="${this.currentStep}"]`)
      .classList.add("active");

    document.querySelectorAll(".step-indicator").forEach((indicator, index) => {
      const stepNumber = index + 1;
      indicator.classList.remove("active", "completed");

      if (stepNumber === this.currentStep) {
        indicator.classList.add("active");
      } else if (stepNumber < this.currentStep) {
        indicator.classList.add("completed");
      }
    });

    document.querySelectorAll(".step-line").forEach((line, index) => {
      const stepNumber = index + 1;
      line.classList.remove("completed");

      if (stepNumber < this.currentStep) {
        line.classList.add("completed");
      }
    });
  }

  updateProgress() {
    const progress = (this.currentStep / this.totalSteps) * 100;
    this.progressFill.style.width = `${progress}%`;
  }

  updateButtons() {
    if (this.currentStep === 1) {
      this.prevBtn.disabled = true;
      this.prevBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      this.prevBtn.disabled = false;
      this.prevBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }

    if (this.currentStep === this.totalSteps) {
      this.nextBtn.classList.add("hidden");
      this.submitBtn.classList.remove("hidden");
    } else {
      this.nextBtn.classList.remove("hidden");
      this.submitBtn.classList.add("hidden");
    }
  }

  // form validation
  validateCurrentStep() {
    const currentStepElement = document.querySelector(
      `.form-step[data-step="${this.currentStep}"]`
    );
    const requiredFields = currentStepElement.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    this.clearFieldError(field);

    if (field.hasAttribute("required") && !value) {
      errorMessage = "this field is required";
      isValid = false;
    }

    switch (fieldName) {
      case "projectTitle":
        if (value && (value.length < 3 || value.length > 100)) {
          errorMessage = "project title must be between 3 and 100 characters";
          isValid = false;
        }
        break;

      case "description":
        if (value && value.length > 500) {
          errorMessage = "description must not exceed 500 characters";
          isValid = false;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          errorMessage = "please enter a valid email address";
          isValid = false;
        }
        break;

      case "website":
        const urlRegex = /^https?:\/\/.+/;
        if (value && !urlRegex.test(value)) {
          errorMessage =
            "please enter a valid url (starting with http:// or https://)";
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("opacity-100");
      errorElement.classList.remove("opacity-0");
    }
    field.classList.add("border-red-500");
  }

  clearFieldError(field) {
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("opacity-0");
      errorElement.classList.remove("opacity-100");
    }
    field.classList.remove("border-red-500");
  }

  // skill input handling
  handleSkillInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const skill = this.skillInput.value.trim();

      if (skill && !this.skills.includes(skill)) {
        this.addSkill(skill);
        this.skillInput.value = "";
      }
    }
  }

  addSkill(skill) {
    this.skills.push(skill);
    this.updateSkillTags();
    this.updateSkillsHidden();
  }

  removeSkill(skill) {
    this.skills = this.skills.filter((s) => s !== skill);
    this.updateSkillTags();
    this.updateSkillsHidden();
  }

  updateSkillTags() {
    this.skillTags.innerHTML = "";

    this.skills.forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.innerHTML = `
        ${skill}
        <span class="remove-skill" onclick="createProjectForm.removeSkill('${skill}')">&times;</span>
      `;
      this.skillTags.appendChild(tag);
    });
  }

  updateSkillsHidden() {
    this.skillsHidden.value = this.skills.join(",");
  }

  // character counter
  updateCharacterCount() {
    const count = this.descriptionTextarea.value.length;
    this.descriptionCount.textContent = count;

    const counter = this.descriptionCount.parentNode;
    counter.classList.remove("text-yellow-400", "text-red-400");

    if (count > 450) {
      counter.classList.add("text-red-400");
    } else if (count > 400) {
      counter.classList.add("text-yellow-400");
    }
  }

  // project type selection styling
  updateProjectTypeSelection() {
    document.querySelectorAll(".project-type-option").forEach((option) => {
      const radio = option.querySelector('input[type="radio"]');
      if (radio.checked) {
        option.style.borderColor = "#a855f7";
        option.style.background = "rgba(168, 85, 247, 0.1)";
        option.style.boxShadow = "0 0 20px rgba(168, 85, 247, 0.3)";
      } else {
        option.style.borderColor = "";
        option.style.background = "";
        option.style.boxShadow = "";
      }
    });
  }

  // file upload handling
  handleFileUpload() {
    const files = Array.from(this.fileInput.files);
    this.fileList.innerHTML = "";

    files.forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.className =
        "flex items-center justify-between bg-gray-800 p-3 rounded-lg mt-2";
      fileItem.innerHTML = `
        <div class="flex items-center">
          <i class="bx bx-image text-indigo-400 mr-2"></i>
          <span class="text-white text-sm">${file.name}</span>
          <span class="text-gray-400 text-xs ml-2">(${(
            file.size /
            1024 /
            1024
          ).toFixed(2)} mb)</span>
        </div>
        <button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-300">
          <i class="bx bx-x"></i>
        </button>
      `;
      this.fileList.appendChild(fileItem);
    });
  }

  // project preview generation
  generatePreview() {
    const formData = new FormData(this.form);

    const projectTitle = formData.get("projectTitle") || "untitled project";
    const category = formData.get("category") || "not specified";
    const description =
      formData.get("description") || "no description provided";
    const projectType = formData.get("projectType") || "not specified";
    const timeline = formData.get("timeline") || "not specified";
    const teamSize = formData.get("teamSize") || "not specified";
    const budget = formData.get("budget") || "not specified";

    const preview = document.getElementById("projectPreview");
    if (!preview) {
      console.error("project preview element not found!");
      return;
    }

    preview.innerHTML = `
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="text-xl font-bold text-white mb-4">${projectTitle}</h4>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-gray-400 w-24">category:</span>
              <span class="text-white">${category}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-24">type:</span>
              <span class="text-white">${projectType}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-24">timeline:</span>
              <span class="text-white">${timeline}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-24">team size:</span>
              <span class="text-white">${teamSize}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-24">budget:</span>
              <span class="text-white">${budget}</span>
            </div>
          </div>
        </div>
        <div>
          <h5 class="text-lg font-semibold text-white mb-3">description</h5>
          <p class="text-gray-300 text-sm leading-relaxed">${description}</p>
          ${
            this.skills.length > 0
              ? `
            <h5 class="text-lg font-semibold text-white mb-3 mt-4">required skills</h5>
            <div class="flex flex-wrap gap-2">
              ${this.skills
                .map((skill) => `<span class="skill-tag">${skill}</span>`)
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  // notification system
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;

    switch (type) {
      case "success":
        notification.classList.add("bg-green-600", "text-white");
        break;
      case "error":
        notification.classList.add("bg-red-600", "text-white");
        break;
      case "info":
        notification.classList.add("bg-blue-600", "text-white");
        break;
    }

    notification.innerHTML = `
      <div class="flex items-center">
        <i class="bx ${
          type === "success"
            ? "bx-check-circle"
            : type === "error"
            ? "bx-error-circle"
            : "bx-info-circle"
        } mr-2"></i>
        ${message}
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // form submission
  async submitForm(e) {
    e.preventDefault();

    if (!this.validateCurrentStep()) {
      return;
    }

    this.submitBtn.innerHTML = `
      <div class="flex items-center">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        launching...
      </div>
    `;
    this.submitBtn.disabled = true;

    try {
      const formData = new FormData(this.form);
      formData.append("skills", this.skills.join(","));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.showSuccessAnimation();
    } catch (error) {
      console.error("error submitting form:", error);
      this.showNotification(
        "error submitting project. please try again.",
        "error"
      );
    } finally {
      this.submitBtn.innerHTML = `
        <i class="bx bx-rocket mr-2 text-xl"></i>
        launch project
      `;
      this.submitBtn.disabled = false;
    }
  }

  showSuccessAnimation() {
    const successOverlay = document.createElement("div");
    successOverlay.className =
      "fixed inset-0 bg-black/90 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";
    successOverlay.innerHTML = `
      <div class="text-center bg-black/80 backdrop-blur-lg border border-indigo-500/30 rounded-3xl p-8 border border-dark-border mx-4">
        <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white mb-4">Project created successfully!</h2>
        <p class="text-lg text-gray-300 mb-8">Your project has been submitted and will be reviewed shortly.</p>
        <div class="space-x-4">
          <button onclick="window.location.href='createproject.html'" class="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-7 py-[14px] rounded-[10px] transition-all duration-300 ease-in-out shadow-xl hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5">
            View Projects
          </button>
          <button onclick="window.location.href='index.html'" class="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300">
            Go Home
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(successOverlay);

    setTimeout(() => {
      successOverlay.classList.remove("opacity-0");
      successOverlay.querySelector("div").classList.remove("scale-75");
    }, 100);
  }
}

// initialize the form when dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.createProjectForm = new CreateProjectForm();
});
