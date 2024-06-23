/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";

const typeTraitSchema = z.object({
  trait_type: z.literal("Type"),
  value: z.string(),
});

const weightTraitSchema = z.object({
  trait_type: z.literal("Weight"),
  value: z.number(),
});

const heightTraitSchema = z.object({
  trait_type: z.literal("Height"),
  value: z.number(),
});

export type TypeTraitSchema = z.infer<typeof typeTraitSchema>;
export type WeightTraitSchema = z.infer<typeof weightTraitSchema>;
export type HeightTraitSchema = z.infer<typeof heightTraitSchema>;

const nftMetadataSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    attributes: z.array(z.object({ trait_type: z.string(), value: z.string().or(z.number()) })),
  })
  .superRefine((data, ctx) => {
    const typeTraits = data.attributes.find((attr): attr is TypeTraitSchema => attr.trait_type === "Type");

    if (!typeTraits) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `"Type" trait is required.`,
      });
    }

    const weightTrait = data.attributes.find((attr): attr is WeightTraitSchema => attr.trait_type === "Weight");

    if (!weightTrait) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `"Weight" trait is required.`,
      });
    }

    const heightTrait = data.attributes.find((attr): attr is HeightTraitSchema => attr.trait_type === "Height");

    if (!heightTrait) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `"Height" trait is required.`,
      });
    }
  })
  .transform(data => {
    const typeTraits = data.attributes.filter((attr): attr is TypeTraitSchema => attr.trait_type === "Type");

    return {
      ...data,
      types: typeTraits.map(({ value }) => value),
      weight: data.attributes.find((attr): attr is WeightTraitSchema => attr.trait_type === "Weight")!.value,
      height: data.attributes.find((attr): attr is HeightTraitSchema => attr.trait_type === "Height")!.value,
      httpsImage: data.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
    };
  });

export type NFTMetadata = z.infer<typeof nftMetadataSchema>;

const parseMetadata = (json: string) => {
  return nftMetadataSchema.parse(JSON.parse(json));
};

export default parseMetadata;
