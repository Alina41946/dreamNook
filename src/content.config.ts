import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/articles',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),

    category: z.enum(['語言學習', '日本打工', '旅遊', '作品集']),

    portfolioType: z
      .enum(['網頁設計', '頻道包裝', '平面設計', '影像'])
      .optional(),

    image: z.string().optional(),

    tags: z.array(z.string()).default([]),

    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
};
