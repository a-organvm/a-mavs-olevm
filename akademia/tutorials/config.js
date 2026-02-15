/**
 * Tutorials Configuration
 * Metadata and organization for educational guides and tutorials
 * Part of ETCETER4 Akademia Chamber
 */
const tutorialsConfig = {
  // Educational guides and teaching materials
  tutorials: [
    // Add tutorials here as they are created
    // Example structure:
    // {
    //   id: 'tutorial-slug',
    //   title: 'Tutorial Title',
    //   description: 'What you will learn',
    //   author: 'Anthony James Padavano',
    //   date: '2025-01-15',
    //   category: 'Creative Coding',
    //   difficulty: 'intermediate', // beginner, intermediate, advanced
    //   duration: '30 min',
    //   tags: ['tag1', 'tag2'],
    //   published: false,
    //   file: '/akademia/tutorials/tutorial-file.html',
    //   topics: ['HTML', 'CSS', 'JavaScript']
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
  difficulties: ['beginner', 'intermediate', 'advanced'],
  // Get tutorials by category
  getByCategory: function (category) {
    return this.tutorials.filter(
      tutorial => tutorial.category === category && tutorial.published
    );
  },
  // Get tutorials by difficulty
  getByDifficulty: function (difficulty) {
    return this.tutorials.filter(
      tutorial => tutorial.difficulty === difficulty && tutorial.published
    );
  },
  // Get tutorials by tag
  getByTag: function (tag) {
    return this.tutorials.filter(
      tutorial =>
        tutorial.tags && tutorial.tags.includes(tag) && tutorial.published
    );
  },
  // Get published tutorials
  getPublished: function () {
    return this.tutorials.filter(tutorial => tutorial.published);
  },
  // Get recent tutorials
  getRecent: function (limit = 5) {
    return this.tutorials
      .filter(tutorial => tutorial.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },
  // Get tutorial by slug
  getBySlug: function (slug) {
    return this.tutorials.find(tutorial => tutorial.id === slug);
  },
};
// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = tutorialsConfig;
}
