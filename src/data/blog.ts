import type { BlogPost, BlogCategory } from "@/types/blog";

export const blogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Gift Ideas",
    slug: "gift-ideas",
    count: 12,
  },
  {
    id: "2",
    name: "Personalization Tips",
    slug: "personalization-tips",
    count: 8,
  },
  {
    id: "3",
    name: "Occasions",
    slug: "occasions",
    count: 15,
  },
  {
    id: "4",
    name: "Behind the Scenes",
    slug: "behind-the-scenes",
    count: 6,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Unique Personalized Gift Ideas for Mother's Day",
    excerpt:
      "Discover heartwarming personalized gifts that will make your mom feel extra special this Mother's Day.",
    content: `
      <p>Mother's Day is a special occasion to show appreciation for the incredible women in our lives. Finding the perfect gift can be challenging, but personalized items add that extra touch of thoughtfulness that makes any present memorable.</p>
      
      <h2>Why Choose Personalized Gifts?</h2>
      <p>Personalized gifts show that you've put thought and effort into selecting something unique. They create lasting memories and demonstrate how much you care.</p>
      
      <h2>Our Top 10 Picks</h2>
      <ol>
        <li><strong>Custom Photo Necklace</strong> - A beautiful piece of jewelry featuring a cherished photo</li>
        <li><strong>Engraved Recipe Cutting Board</strong> - Perfect for moms who love to cook</li>
        <li><strong>Personalized Garden Stone</strong> - For the gardening enthusiast</li>
        <li><strong>Custom Name Bracelet</strong> - Elegant and timeless</li>
        <li><strong>Monogrammed Tote Bag</strong> - Practical and stylish</li>
      </ol>
      
      <p>Each of these gifts can be customized to reflect your mom's personality and interests, making them truly one-of-a-kind.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&q=90",
    author: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=90",
    },
    category: "Gift Ideas",
    tags: ["Mother's Day", "Personalized Gifts", "Gift Guide"],
    publishedAt: "2026-01-10",
    readTime: 5,
    featured: true,
  },
  {
    id: "2",
    title: "The Art of Engraving: A Complete Guide",
    excerpt:
      "Learn about different engraving techniques and how to choose the perfect message for your personalized gifts.",
    content: `
      <p>Engraving is an ancient art form that adds a personal touch to gifts. Understanding the different techniques can help you make informed decisions when customizing your items.</p>
      
      <h2>Types of Engraving</h2>
      <ul>
        <li><strong>Laser Engraving</strong> - Precise and detailed, perfect for intricate designs</li>
        <li><strong>Hand Engraving</strong> - Traditional method with a personal touch</li>
        <li><strong>Diamond Drag Engraving</strong> - Ideal for harder materials</li>
      </ul>
      
      <h2>Choosing Your Message</h2>
      <p>The message you choose should be meaningful and appropriate for the occasion. Consider the recipient's personality and the item being engraved.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=800&fit=crop&q=90",
    author: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=90",
    },
    category: "Personalization Tips",
    tags: ["Engraving", "Personalization", "Tips"],
    publishedAt: "2026-01-08",
    readTime: 7,
    featured: true,
  },
  {
    id: "3",
    title: "Wedding Season: Best Personalized Gifts for Couples",
    excerpt:
      "Make wedding gifts memorable with these personalized options that couples will treasure forever.",
    content: `
      <p>Weddings are joyous occasions, and finding the perfect gift for the happy couple can be overwhelming. Personalized gifts offer a unique way to celebrate their special day.</p>
      
      <h2>Top Wedding Gift Ideas</h2>
      <ul>
        <li>Custom Mr. & Mrs. Signs</li>
        <li>Engraved Wine Glasses</li>
        <li>Personalized Wedding Date Art</li>
        <li>Monogrammed Bedding Sets</li>
        <li>Custom Recipe Books</li>
      </ul>
      
      <p>These gifts not only celebrate the wedding day but also become cherished keepsakes for years to come.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&q=90",
    author: {
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=90",
    },
    category: "Occasions",
    tags: ["Wedding", "Couples", "Gift Ideas"],
    publishedAt: "2026-01-05",
    readTime: 6,
    featured: true,
  },
  {
    id: "4",
    title: "Behind the Scenes: How We Create Your Custom Gifts",
    excerpt:
      "Take a peek into our workshop and discover the craftsmanship behind every personalized item.",
    content: `
      <p>Every personalized gift we create goes through a careful process to ensure the highest quality. Let us take you behind the scenes.</p>
      
      <h2>Our Process</h2>
      <ol>
        <li>Order Review - We carefully review each order for accuracy</li>
        <li>Material Selection - Choosing the finest materials</li>
        <li>Personalization - Adding your custom touches</li>
        <li>Quality Check - Ensuring perfection</li>
        <li>Packaging - Beautiful presentation</li>
      </ol>
      
      <p>Our team of skilled artisans takes pride in every piece they create.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&h=800&fit=crop&q=90",
    author: {
      name: "David Martinez",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=90",
    },
    category: "Behind the Scenes",
    tags: ["Craftsmanship", "Process", "Quality"],
    publishedAt: "2026-01-03",
    readTime: 4,
  },
  {
    id: "5",
    title: "Last-Minute Gift Ideas: Quick Personalization Options",
    excerpt:
      "Running out of time? Discover personalized gifts that can be created quickly without sacrificing quality.",
    content: `
      <p>Sometimes life gets busy and you need a gift fast. Here are some personalized options that can be created quickly.</p>
      
      <h2>Express Options</h2>
      <ul>
        <li>Digital Gift Cards with Personal Messages</li>
        <li>Same-Day Engraved Keychains</li>
        <li>Quick Print Photo Gifts</li>
        <li>Personalized Digital Albums</li>
      </ul>
      
      <p>Don't let time constraints stop you from giving a meaningful gift.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&h=800&fit=crop&q=90",
    author: {
      name: "Lisa Thompson",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&q=90",
    },
    category: "Gift Ideas",
    tags: ["Quick Gifts", "Last Minute", "Express"],
    publishedAt: "2026-01-01",
    readTime: 3,
  },
  {
    id: "6",
    title: "Valentine's Day Gift Guide: Show Your Love with Personalization",
    excerpt:
      "From romantic jewelry to heartfelt keepsakes, find the perfect personalized gift for your special someone.",
    content: `
      <p>Valentine's Day is the perfect opportunity to express your love with a thoughtful, personalized gift.</p>
      
      <h2>Romantic Gift Ideas</h2>
      <ul>
        <li>Custom Coordinates Jewelry - Mark your special place</li>
        <li>Engraved Love Letters - Timeless and romantic</li>
        <li>Personalized Photo Albums - Capture your memories</li>
        <li>Custom Song Lyrics Art - Your special song</li>
      </ul>
      
      <p>Make this Valentine's Day unforgettable with a gift that speaks from the heart.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=800&fit=crop&q=90",
    author: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=90",
    },
    category: "Occasions",
    tags: ["Valentine's Day", "Romance", "Love"],
    publishedAt: "2025-12-28",
    readTime: 5,
  },
];
