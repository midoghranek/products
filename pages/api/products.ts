import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Product } from "@types";
import { PUBLIC_DATA_DIR } from "@constants";

type Data = Product[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const productsDir = `${PUBLIC_DATA_DIR}/products`;

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
