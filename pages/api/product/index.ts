import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Product } from "@types";
import { v4 as uuidv4 } from "uuid";
import { PUBLIC_DATA_DIR } from "@constants";

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const productsDir = `${PUBLIC_DATA_DIR}/products`;

  if (req.method === "POST") {
    if (
      !req.body.name ||
      !req.body.thumbnail ||
      !req.body.weight ||
      !req.body.category ||
      !req.body.translations.ar.name
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product name, thumbnail, weight, category, and translations are required",
      });
    }

    const newId = uuidv4();

    const product: Product = {
      _id: newId,
      ...req.body,
    };

    fs.writeFileSync(
      path.join(productsDir, `${newId}.json`),
      JSON.stringify(product, null, 2),
      "utf8"
    );

    return res.status(201).json({
      success: true,
      message: `Product ${newId} created`,
    });
  }
  return res.status(404).end();
}
