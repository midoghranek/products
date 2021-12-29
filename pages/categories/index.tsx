import { useSession } from "@hooks";
import { CategoriesModule } from "@modules";
import type { NextPage } from "next";

const CategoriesPage: NextPage = () => {
  // sync user from localStorage
  useSession();

  return <CategoriesModule />;
};

export default CategoriesPage;
