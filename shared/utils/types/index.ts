export type Languages = "en" | "ar";

export type UserIntialState = {
  user: User | null;
};

export type GlobalStore = {
  "user/store": UserIntialState;
};

export type Product = {
  _id: string;
  thumbnail: string;
  name: string;
  weight: number;
  category: Category;
  translations: {
    ar: {
      name: string;
    };
  };
};

export type Category = {
  _id: string;
  name: string;
  translations: {
    ar: {
      name: string;
    };
  };
};

export type User = {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  role: "manager" | "editor";
};

// for development purposes
export type UserPasswords = {
  [key: User["_id"]]: string;
};

export type LoginFormInputs = {
  readonly username: string;
  readonly password: string;
};
