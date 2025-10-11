import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    code: z.string().min(1),
    name: z.object({
      hy: z.string().min(1),
      ru: z.string().min(1),
      en: z.string().min(1),
    }),
    description: z
      .object({
        hy: z.string().min(1),
        ru: z.string().min(1),
        en: z.string().min(1),
      })
      .optional(),
    shortDetails: z
      .object({
        hy: z.string().min(1),
        ru: z.string().min(1),
        en: z.string().min(1),
      })
      .optional(),
    price: z.number().min(0),
    image: z.array(z.string()).nonempty(),
    technical: z
      .object({
        power: z.object({
          hy: z.string().min(1),
          ru: z.string().min(1),
          en: z.string().min(1),
        }),
        voltage: z
          .object({
            hy: z.string().min(1),
            ru: z.string().min(1),
            en: z.string().min(1),
          })
          .optional(),
        colorTemperature: z
          .object({
            hy: z.string(),
            ru: z.string(),
            en: z.string(),
          })
          .optional(),
        lifetime: z
          .object({
            hy: z.string(),
            ru: z.string(),
            en: z.string(),
          })
          .optional(),
        material: z
          .object({
            hy: z.string(),
            ru: z.string(),
            en: z.string(),
          })
          .optional(),
        protection: z
          .object({
            hy: z.string(),
            ru: z.string(),
            en: z.string(),
          })
          .optional(),
        beamAngle: z
          .object({
            hy: z.string(),
            ru: z.string(),
            en: z.string(),
          })
          .optional(),
      })
      .optional(),
    attributes: z
      .object({
        color: z.string().optional(),
        base: z.string().optional(),
        mountType: z.string().optional(),
        shape: z.string().optional(),
        installation: z.string().optional(),
      })
      .optional(),
    categoryId: z.string().min(1),
    isBestSeller: z.boolean().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    code: z.string().min(1).optional(),
    name: z
      .object({
        hy: z.string().min(1).optional(),
        ru: z.string().min(1).optional(),
        en: z.string().min(1).optional(),
      })
      .optional(),
    description: z
      .object({
        hy: z.string().min(1).optional(),
        ru: z.string().min(1).optional(),
        en: z.string().min(1).optional(),
      })
      .optional(),
    shortDetails: z
      .object({
        hy: z.string().min(1).optional(),
        ru: z.string().min(1).optional(),
        en: z.string().min(1).optional(),
      })
      .optional(),
    price: z.number().min(0).optional(),
    image: z.array(z.string()).optional(),
    technical: z
      .object({
        power: z
          .object({
            hy: z.string().min(1).optional(),
            ru: z.string().min(1).optional(),
            en: z.string().min(1).optional(),
          })
          .optional(),
        voltage: z
          .object({
            hy: z.string().optional(),
            ru: z.string().optional(),
            en: z.string().optional(),
          })
          .optional(),
        colorTemperature: z
          .object({
            hy: z.string().optional(),
            ru: z.string().optional(),
            en: z.string().optional(),
          })
          .optional(),
        lifetime: z
          .object({
            hy: z.string().optional(),
            ru: z.string().optional(),
            en: z.string().optional(),
          })
          .optional(),
        material: z
          .object({
            hy: z.string().optional(),
            ru: z.string().optional(),
            en: z.string().optional(),
          })
          .optional(),
        protection: z
          .object({
            hy: z.string().optional(),
            ru: z.string().optional(),
            en: z.string().optional(),
          })
          .optional(),
        beamAngle: z
          .object({
            hy: z.string().optional(),
            ru: z.string().optional(),
            en: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    attributes: z
      .object({
        color: z.string().optional(),
        base: z.string().optional(),
        mountType: z.string().optional(),
        shape: z.string().optional(),
        installation: z.string().optional(),
      })
      .optional(),
    categoryId: z.string().optional(),
    isBestSeller: z.boolean().optional(),
  }),
});
