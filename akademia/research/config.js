/**
 * Research Configuration
 * Metadata and organization for research projects and investigations
 * Part of ETCETER4 Akademia Chamber
 */
const researchConfig = {
  // Research projects and investigations
  projects: [
    // Add research projects here as they are initiated
    // Example structure:
    // {
    //   id: 'project-slug',
    //   title: 'Research Project Title',
    //   description: 'Project description and objectives',
    //   author: 'Anthony James Padavano',
    //   started: '2025-01-15',
    //   status: 'ongoing', // ongoing, completed, paused
    //   category: 'Digital Culture',
    //   tags: ['tag1', 'tag2'],
    //   published: false,
    //   file: '/akademia/research/project-file.html',
    //   methodology: 'Brief description of approach',
    //   keywords: ['keyword1', 'keyword2']
    // }
  ],
  categories: [
    'Music Theory',
    'Sound Studies',
    'Digital Culture',
    'Technology & Art',
    'Creative Coding',
    'Philosophy',
    'Education',
    'Cultural Criticism',
    'Performance Studies',
    'Interdisciplinary Research',
  ],
  statuses: ['ongoing', 'completed', 'paused', 'planning'],
  // Get projects by category
  getByCategory: function (category) {
    return this.projects.filter(
      project => project.category === category && project.published
    );
  },
  // Get projects by status
  getByStatus: function (status) {
    return this.projects.filter(
      project => project.status === status && project.published
    );
  },
  // Get projects by tag
  getByTag: function (tag) {
    return this.projects.filter(
      project => project.tags && project.tags.includes(tag) && project.published
    );
  },
  // Get published projects
  getPublished: function () {
    return this.projects.filter(project => project.published);
  },
  // Get ongoing projects
  getOngoing: function () {
    return this.projects.filter(
      project => project.status === 'ongoing' && project.published
    );
  },
  // Get project by slug
  getBySlug: function (slug) {
    return this.projects.find(project => project.id === slug);
  },
};
// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = researchConfig;
}
