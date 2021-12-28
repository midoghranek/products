import { useSession } from "@hooks";
import { ProductsModule } from "@modules";
import type { NextPage } from "next";

const Home: NextPage = () => {
  // sync user from localStorage
  useSession();

  return <ProductsModule />;
};

export default Home;
