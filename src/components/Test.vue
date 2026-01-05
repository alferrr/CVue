<template>
  <section class="app">
    <div class="form">
      <header>
        <h1 v-show="currentStep === 1">Personal Details</h1>
        <nav v-show="currentStep === 1">
          <button @click="nextStep" :disabled="currentStep === 6">Next</button>
        </nav>
      </header>
      <form @submit.prevent v-show="currentStep === 1">
        <div class="input name">
          <span>Name</span>
          <input type="text" v-model="resume.name" />
        </div>

        <div class="input desc">
          <span>Job Title</span>
          <input type="text" v-model="resume.description" />
        </div>

        <div class="input add">
          <span>Address</span>
          <input type="text" v-model="resume.street" />
        </div>

        <div class="input city">
          <span>City</span>
          <input type="text" v-model="resume.city" />
        </div>

        <div class="input country">
          <span>Country</span>
          <input type="text" v-model="resume.country" />
        </div>

        <div class="input phone">
          <span>Phone Number</span>
          <input type="text" v-model="resume.phone" />
        </div>
        <div class="input email">
          <span>Email</span>
          <input type="text" v-model="resume.email" />
        </div>
      </form>

      <div class="work array" v-show="currentStep > 1">
        <h1>
          {{ stepTitle }}
          <nav>
            <button @click="prevStep" :disabled="currentStep === 1">
              Back
            </button>
            <button @click="nextStep" :disabled="currentStep === 6">
              Next
            </button>
          </nav>
        </h1>

        <button
          @click="callStepMethod"
          :disabled="stepValues >= stepMax"
          v-show="currentStep != 5"
        >
          + <span>{{ stepValues }} / {{ stepMax }}</span>
        </button>
        <span v-show="currentStep === 5">{{ stepValues }} / {{ stepMax }}</span>
      </div>

      <!-- experience -->
      <form @submit.prevent v-show="currentStep === 2">
        <div
          class="container"
          v-for="(exp, index) in resume.experience"
          :key="index"
        >
          <header>
            <input
              type="text"
              class="company"
              placeholder="Company Name"
              v-model="exp.company"
            />
            <button @click="removeExperience(index)">x</button>
          </header>
          <div class="input title">
            <span>Title</span> <input type="text" v-model="exp.title" />
          </div>
          <div class="input duration">
            <span>Duration</span> <input type="text" v-model="exp.duration" />
          </div>
          <div class="input location">
            <span>Location</span>
            <input type="text" v-model="exp.description" />
          </div>
        </div>
      </form>

      <!-- education -->
      <form @submit.prevent v-show="currentStep === 3">
        <div
          class="container edu"
          v-for="(edu, index) in resume.education"
          :key="index"
        >
          <header>
            <input type="text" v-model="edu.school" placeholder="School" />
            <button @click="removeEducation(index)">x</button>
          </header>

          <div class="input degree">
            <span>Degree</span>
            <input type="text" v-model="edu.degree" />
          </div>

          <div class="input duration">
            <span>Duration</span>
            <input type="text" v-model="edu.duration" />
          </div>

          <div class="input location">
            <span>Location</span>
            <input type="text" v-model="edu.location" />
          </div>
        </div>
      </form>

      <!-- projects -->
      <form @submit.prevent v-show="currentStep === 4">
        <div
          class="container"
          v-for="(proj, index) in resume.projects"
          :key="index"
        >
          <header>
            <input type="text" v-model="proj.name" placeholder="Project Name" />
            <button @click="removeProject(index)">x</button>
          </header>

          <div class="input stack">
            <span>Tech Stack (Optional)</span>
            <input type="text" v-model="proj.stack" />
          </div>

          <div class="input description">
            <span>Description</span>
            <input type="text" v-model="proj.description" />
          </div>
        </div>
      </form>

      <!-- skill -->

      <form @submit.prevent v-show="currentStep === 5">
        <div class="input skl">
          <span>Skill (Press Enter to Add More)</span>
          <input
            class="skl"
            type="text"
            v-model="newSkill"
            @keyup.enter="addSkill"
            :disabled="resume.skills.length >= 7"
            :placeholder="
              resume.skills.length >= 7 ? 'Maximum Skills Reached' : ''
            "
          />
        </div>
      </form>

      <div
        class="skill"
        v-for="(skill, index) in resume.skills"
        :key="index"
        v-show="currentStep === 5"
      >
        <h5>
          {{ skill.skill }}
        </h5>
        <button @click="removeSkill(index)">x</button>
      </div>

      <!-- award -->
      <form @submit.prevent v-show="currentStep === 6">
        <div class="container" v-for="(award, index) in resume.awards">
          <header>
            <input
              type="text"
              placeholder="Award Title"
              v-model="award.title"
            />
            <button @click="removeAward(index)">x</button>
          </header>
          <div class="input issuer">
            <span>Issuer</span>
            <input type="text" v-model="award.issuer" />
          </div>
          <div class="input year">
            <span>Year</span>
            <input type="text" v-model="award.year" />
          </div>
        </div>
      </form>

      <button @click="downloadCV" class="print" v-if="currentStep === 6">
        Print CV
      </button>
    </div>

    <!-- preview -->
    <div class="preview">
      <div class="paper">
        <header>
          <div class="left">
            <h1>{{ resume.name }}</h1>
            <p>{{ resume.description }}</p>
          </div>

          <div class="right">
            <p>{{ resume.street }}</p>
            <span>
              <p>{{ resume.city }}</p>
              <p>, {{ resume.country }}</p>
            </span>
            <p>
              <strong>{{ resume.phone }}</strong>
            </p>
            <p>
              <strong>{{ resume.email }}</strong>
            </p>
          </div>
        </header>
        <div class="content">
          <main>
            <div v-if="resume.experience.length > 0" class="block">
              <h2>EXPERIENCE</h2>
              <div
                class="item"
                v-for="(exp, index) in resume.experience"
                :key="index"
              >
                <h4>
                  {{ exp.company }} - <span>{{ exp.title }}</span>
                </h4>
                <p class="loc">{{ exp.description }}</p>
                <p class="dur">{{ exp.duration.toUpperCase() }}</p>
              </div>
            </div>

            <div v-if="resume.education.length > 0" class="block">
              <h2>EDUCATION</h2>
              <div
                class="item"
                v-for="(edu, index) in resume.education"
                :key="index"
              >
                <h4>
                  {{ edu.school }} - <span>{{ edu.degree }}</span>
                </h4>
                <p class="loc">{{ edu.location }}</p>
                <p class="dur">{{ edu.duration.toUpperCase() }}</p>
              </div>

              <div class="block" v-if="resume.projects.length > 0">
                <h2>PROJECTS</h2>
                <div
                  class="item"
                  v-for="(proj, index) in resume.projects"
                  :key="index"
                >
                  <h4>
                    {{ proj.name }}
                    <span v-if="proj.stack.length > 0">
                      - {{ proj.stack }}</span
                    >
                    <p class="description">{{ proj.description }}</p>
                  </h4>
                </div>
              </div>
            </div>
          </main>
          <aside>
            <div class="block" v-if="resume.skills.length > 0">
              <h2>SKILLS</h2>
              <div
                class="item"
                v-for="(skill, index) in resume.skills"
                :key="index"
              >
                <h4
                  v-if="skill.skill"
                  :style="{
                    color: 'gray',
                    fontWeight: 500,
                    letterSpacing: '-1px',
                    fontSize: '14px',
                  }"
                >
                  • {{ skill.skill }}
                </h4>
              </div>
            </div>

            <div class="block" v-if="resume.awards.length > 0">
              <h2>AWARDS</h2>

              <div class="item" v-for="(award, index) in resume.awards">
                <h4>{{ award.title }}</h4>
                <p>{{ award.issuer.toUpperCase() }}</p>
                <p>{{ award.year }}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "CVue",

  data() {
    return {
      currentStep: 1,
      newSkill: "",
      resume: {
        name: "",
        description: "",
        street: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        experience: [],
        skills: [],
        education: [],
        awards: [],
        projects: [],
      },
    };
  },

  mounted() {
    this.loadFromLocalStorage();
  },

  watch: {
    resume: {
      handler(newResume) {
        this.saveToLocalStorage(newResume);
      },
      deep: true,
    },
  },

  computed: {
    stepMax() {
      const max = {
        2: 3,
        3: 3,
        4: 2,
        5: 7,
        6: 3,
      };

      return max[this.currentStep];
    },

    stepValues() {
      const values = {
        2: this.resume.experience.length,
        3: this.resume.education.length,
        4: this.resume.projects.length,
        5: this.resume.skills.length,
        6: this.resume.awards.length,
      };

      return values[this.currentStep];
    },
    stepTitle() {
      const titles = {
        1: "Personal Details",
        2: "Work Experience",
        3: "Education",
        4: "Projects",
        5: "Skills",
        6: "Awards",
      };
      return titles[this.currentStep] || "Resume Builder";
    },
  },

  methods: {
    callStepMethod() {
      const methods = {
        2: this.addExperience,
        3: this.addEducation,
        4: this.addProject,
        5: this.addSkill,
        6: this.addAward,
      };

      const method = methods[this.currentStep];
      if (method) {
        method();
      }
    },
    nextStep() {
      if (this.currentStep < 6) {
        this.currentStep++;
        console.log(this.currentStep);
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    goTo(step) {
      this.currentStep = step;
    },

    // debug (thanks claude)
    fixSkillsArray() {
      if (!Array.isArray(this.resume.skills)) {
        console.log("⚠️ Skills was not an array! Fixing...");
        console.log("Old value:", this.resume.skills);
        this.resume.skills = [];
      }
    },

    // Save to localStorage
    saveToLocalStorage(data) {
      localStorage.setItem("resumeData", JSON.stringify(data));
    },

    // Load from localStorage
    loadFromLocalStorage() {
      const savedData = localStorage.getItem("resumeData");
      if (savedData) {
        this.resume = JSON.parse(savedData);
        this.fixSkillsArray();
      }
    },

    addExperience() {
      this.resume.experience.push({
        company: "",
        title: "",
        duration: "",
        description: "",
      });
    },

    removeExperience(index) {
      this.resume.experience.splice(index, 1);
    },

    addSkill() {
      if (this.newSkill.trim()) {
        this.resume.skills.push({
          skill: this.newSkill.trim(),
        });

        this.newSkill = "";
      }
    },

    removeSkill(index) {
      this.resume.skills.splice(index, 1);
    },

    addEducation() {
      this.resume.education.push({
        school: "",
        location: "",
        degree: "",
        duration: "",
      });
    },

    removeEducation(index) {
      this.resume.education.splice(index, 1);
    },

    addAward() {
      this.resume.awards.push({
        title: "",
        issuer: "",
        year: "",
      });
    },

    removeAward(index) {
      this.resume.awards.splice(index, 1);
    },

    addProject() {
      this.resume.projects.push({
        name: "",
        stack: "",
        description: "",
      });
    },

    removeProject(index) {
      this.resume.projects.splice(index, 1);
    },

    downloadCV() {
      window.print();
    },
  },
};
</script>

<style src="../assets/app.css"></style>
