/**
 * Papers Configuration
 * Metadata and organization for academic research papers
 * Part of ETCETER4 Akademia Chamber
 */
const papersConfig = {
  // Academic research papers
  papers: [
    // Add papers here as they are completed
    // Example structure:
    // {
    //   id: 'paper-slug',
    //   title: 'Paper Title',
    //   author: 'Anthony James Padavano',
    //   date: '2025-01-15',
    //   abstract: 'Brief abstract...',
    //   keywords: ['keyword1', 'keyword2'],
    //   doi: 'optional-doi',
    //   published: false,
    //   file: '/akademia/papers/paper-file.html',
    //   pdf: '/akademia/papers/paper-file.pdf'
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
  // Get papers by category
  getByCategory: function (category) {
    return this.papers.filter(
      paper => paper.category === category && paper.published
    );
  },
  // Get papers by keyword
  getByKeyword: function (keyword) {
    return this.papers.filter(
      paper =>
        paper.keywords && paper.keywords.includes(keyword) && paper.published
    );
  },
  // Get published papers
  getPublished: function () {
    return this.papers.filter(paper => paper.published);
  },
  // Get recent papers
  getRecent: function (limit = 5) {
    return this.papers
      .filter(paper => paper.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },
  // Get paper by slug
  getBySlug: function (slug) {
    return this.papers.find(paper => paper.id === slug);
  },
};
// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = papersConfig;
}
