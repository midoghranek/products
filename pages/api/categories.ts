import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@types";
import fs from "fs";
import path from "path";
import getConfig from "next/config";
import { v4 as uuidv4 } from "uuid";

type Data =
  | Category[]
  | {
      success: boolean;
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { serverRuntimeConfig } = getConfig();

  const categoriesFile = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    "./public/data",
    "categories.json"
  );

  const categories = JSON.parse(
    fs.readFileSync(categoriesFile, "utf8")
  ) as Category[];

  // Get categories
  if (req.method === "GET") {
    return res.status(200).json(categories);
  }

  // Create category
  if (req.method === "POST") {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (categories.find((category) => category.name === req.body.name)) {
      return res.status(403).json({
        success: false,
        message: "Category name already exists",
      });
    }

    const newId = uuidv4();

    const category: Category = {
      _id: newId,
      name: req.body.name.trim(),
      translations: {
        ar: {
          name: req.body.translations.ar.name.trim(),
        },
      },
    };

    const updatedCategories = [...categories, category];

    fs.writeFileSync(
      categoriesFile,
      JSON.stringify(updatedCategories, null, 2),
      "utf8"
    );

    return res.status(201).json({
      success: true,
      message: `Category ${req.body.name} created`,
    });
  }

  // delete category
  if (req.method === "DELETE") {
    const updatedCategories = categories.filter(
      (category) => category._id !== req.query._id
    );

    if (updatedCategories.length === categories.length) {
      return res.status(404).json({
        success: false,
        message: `Category ${req.query._id} not found`,
      });
    }

    fs.writeFileSync(
      categoriesFile,
      JSON.stringify(updatedCategories, null, 2),
      "utf8"
    );

    return res.status(204).end();
  }

  // update category
  if (req.method === "PATCH") {
    const updatedCategories = categories.map((category) => {
      if (category._id === req.query._id) {
        return {
          ...category,
          ...req.body,
        };
      }
      return category;
    });

    fs.writeFileSync(
      categoriesFile,
      JSON.stringify(updatedCategories, null, 2),
      "utf8"
    );

    return res.status(204).end();
  }

  return res.status(404).end();
}
