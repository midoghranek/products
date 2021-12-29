import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import getConfig from "next/config";
import { Product } from "@types";

type Data = Product[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { serverRuntimeConfig } = getConfig();

  const productsDir = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    "./public/data",
    "products"
  );

  if (req.method === "GET") {
    const filenames = fs.readdirSync(productsDir);

    const products = filenames.map((name) => {
      const file = fs.readFileSync(path.join(productsDir, name), "utf8");
      return JSON.parse(file);
    });

    return res.status(200).json(products as Product[]);
  }

  return res.status(404).end();
}
