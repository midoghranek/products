import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import getConfig from "next/config";
import { Product } from "@types";
import { PUBLIC_DATA_DIR } from "@constants";

type Data =
  | Product
  | {
      success: boolean;
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { serverRuntimeConfig } = getConfig();

  const productsDir = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    PUBLIC_DATA_DIR,
    "products"
  );

  const filePath = path.join(productsDir, `${req.query._id}.json`);

  if (!filePath) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const file = fs.readFileSync(filePath, "utf8");
  const product = JSON.parse(file);

  if (req.method === "GET") {
    return res.status(200).json(product as Product);
  }

  if (req.method === "DELETE") {
    fs.unlinkSync(filePath);
    return res.status(204).end();
  }

  if (req.method === "PATCH") {
    const updatedProduct = {
      ...product,
      ...req.body,
    };
    fs.writeFileSync(filePath, JSON.stringify(updatedProduct, null, 2), "utf8");
    return res.status(204).end();
  }

  return res.status(404).end();
}
