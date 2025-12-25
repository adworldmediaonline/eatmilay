// Mock product data for product details page
export const mockProduct = {
  id: '1',
  name: 'The Body Lotion - Fragrance Free',
  description:
    'Nourish and hydrate your skin with our luxurious body lotion. This fragrance-free formula is enriched with essential ceramides, hyaluronic acid, and natural botanical extracts. Our clean, minimalist approach delivers deep moisturization for all skin types while maintaining the highest standards of purity and effectiveness.',
  price: 899,
  stock: 50,
  sku: 'TBL-001',
  tags: [
    'body-lotion',
    'fragrance-free',
    'ceramides',
    'hyaluronic-acid',
    'clean-beauty',
  ],
  status: 'PUBLISHED',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      public_id: 'moisturizer-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop',
      public_id: 'moisturizer-2',
    },
    {
      url: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop',
      public_id: 'moisturizer-3',
    },
    {
      url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop',
      public_id: 'moisturizer-4',
    },
    {
      url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&h=600&fit=crop',
      public_id: 'moisturizer-5',
    },
    {
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
      public_id: 'moisturizer-6',
    },
    {
      url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop',
      public_id: 'moisturizer-7',
    },
    {
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop',
      public_id: 'moisturizer-8',
    },
  ],
  slug: 'the-body-lotion-fragrance-free',
  keywords: [
    'body-lotion',
    'fragrance-free',
    'clean-beauty',
    'ceramides',
    'hyaluronic-acid',
  ],
  isFeatured: true,
  isNewLaunch: false,
  isBestSeller: true,
  taxRate: 18,
  taxIncluded: true,
  benefits:
    'Fragrance-free formula • Deep hydration for 24 hours • Strengthens skin barrier • Clean, minimalist ingredients • Suitable for sensitive skin • Non-greasy finish',
  otherInformation:
    'Dermatologically tested • Fragrance-free • Hypoallergenic • Made with clean ingredients • No parabens, sulfates, or synthetic fragrances • Suitable for all skin types including sensitive skin',
  usageInstructions:
    'Apply generously to clean, dry skin all over your body. Massage in circular motions until fully absorbed. Use daily, morning and evening, or as needed for optimal hydration.',
  faq: [
    {
      question: 'Is this suitable for sensitive skin?',
      answer:
        'Yes! Our fragrance-free formula is specifically designed for sensitive skin. It contains gentle, clean ingredients and is hypoallergenic and dermatologically tested.',
    },
    {
      question: 'How long does the hydration last?',
      answer:
        'Our body lotion provides 24-hour hydration with just one application. The ceramides and hyaluronic acid work together to lock in moisture throughout the day.',
    },
    {
      question: 'Is the texture greasy or sticky?',
      answer:
        'No, our formula absorbs quickly into the skin without leaving a greasy or sticky residue. It provides deep hydration while maintaining a clean, comfortable feel.',
    },
    {
      question: 'What makes this product fragrance-free?',
      answer:
        'We use zero synthetic fragrances or essential oils. This ensures the product is gentle on sensitive skin and suitable for those who prefer unscented skincare.',
    },
  ],
  category: {
    name: 'Body Care',
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
};

export const mockReviews = [
  {
    id: '1',
    user: 'Priya S.',
    rating: 5,
    comment:
      'Amazing moisturizer! My skin feels so hydrated and soft all day long. The texture is perfect - not greasy at all!',
    date: '2024-01-18',
    verified: true,
  },
  {
    id: '2',
    user: 'Rahul M.',
    rating: 5,
    comment:
      'Perfect for my combination skin. Provides deep hydration without making my T-zone oily. Highly recommend!',
    date: '2024-01-16',
    verified: true,
  },
  {
    id: '3',
    user: 'Anita K.',
    rating: 4,
    comment:
      'Great moisturizer! Absorbs quickly and works well under makeup. My skin feels plump and hydrated.',
    date: '2024-01-14',
    verified: true,
  },
  {
    id: '4',
    user: 'Vikram P.',
    rating: 5,
    comment:
      'I have sensitive skin and this moisturizer works perfectly. No irritation, just smooth, hydrated skin.',
    date: '2024-01-12',
    verified: true,
  },
  {
    id: '5',
    user: 'Meera L.',
    rating: 4,
    comment:
      'Good value for money. The packaging is premium and the product quality is excellent.',
    date: '2024-01-10',
    verified: true,
  },
];

export const mockRelatedProducts = [
  {
    id: '1',
    name: 'Hair Growth Oil',
    price: 699,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Under Eye Cream',
    price: 472,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Exfoliating Scrub',
    price: 429,
    image:
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=300&fit=crop',
    rating: 4.5,
  },
  {
    id: '7',
    name: 'Daily Moisturizer',
    price: 649,
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop',
    rating: 4.8,
  },

  {
    id: '4',
    name: 'Gentle Face Wash',
    price: 499,
    image:
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop',
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Night Repair Serum',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop',
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Vitamin C Toner',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=300&h=300&fit=crop',
    rating: 4.6,
  },

  {
    id: '8',
    name: 'Sunscreen SPF 50',
    price: 549,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
    rating: 4.7,
  },
];
