/**
 * Reviews Configuration
 * Metadata and organization for critical analysis and reviews
 * Part of ETCETER4 Akademia Chamber
 */
const reviewsConfig = {
  // Critical reviews of books, music, art, and ideas
  reviews: [
    // Add reviews here as they are published
    // Example structure:
    // {
    //   id: 'review-slug',
    //   title: 'Review: Work Title',
    //   subject: 'Actual Work Being Reviewed',
    //   author: 'Anthony James Padavano',
    //   date: '2025-01-15',
    //   type: 'book', // book, album, film, artwork, idea
    //   category: 'Cultural Criticism',
    //   rating: 8.5, // 0-10 scale
    //   tags: ['tag1', 'tag2'],
    //   published: false,
    //   file: '/akademia/reviews/review-file.html',
    //   summary: 'Brief summary of the review',
    //   keywords: ['keyword1', 'keyword2']
    // }
  ],
  types: [
    "book",
    "album",
    "film",
    "artwork",
    "idea",
    "conference",
    "exhibition",
  ],
  categories: [
    "Music Theory",
    "Sound Studies",
    "Digital Culture",
    "Technology & Art",
    "Creative Coding",
    "Philosophy",
    "Education",
    "Cultural Criticism",
    "Performance Studies",
    "Interdisciplinary Research",
  ],
  // Get reviews by type
  getByType: function (type) {
    return this.reviews.filter(
      (review) => review.type === type && review.published,
    );
  },
  // Get reviews by category
  getByCategory: function (category) {
    return this.reviews.filter(
      (review) => review.category === category && review.published,
    );
  },
  // Get reviews by tag
  getByTag: function (tag) {
    return this.reviews.filter(
      (review) => review.tags && review.tags.includes(tag) && review.published,
    );
  },
  // Get published reviews
  getPublished: function () {
    return this.reviews.filter((review) => review.published);
  },
  // Get reviews above rating threshold
  getByRating: function (minRating = 7) {
    return this.reviews.filter(
      (review) =>
        review.rating && review.rating >= minRating && review.published,
    );
  },
  // Get recent reviews
  getRecent: function (limit = 5) {
    return this.reviews
      .filter((review) => review.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },
  // Get review by slug
  getBySlug: function (slug) {
    return this.reviews.find((review) => review.id === slug);
  },
};
// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = reviewsConfig;
}
