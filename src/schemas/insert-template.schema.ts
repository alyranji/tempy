import z from "zod";

export const addTemplateFormSchema = z.object({
  title: z.string().min(1),
  image: z.string(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  demoUrl: z.string(),
  slug: z.string(),
  category: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  price: z.number(),
  isRtl: z.boolean(),
  addOns: z.array(z.string()).optional(),
  score: z.number().min(1).max(5),
  sellCount: z.number(),
  reviewCount: z.number(),
  requirements: z.array(z.string()).optional(),
  status: z.enum(["active", "draft"]),
});
