export type Languages = "en" | "ar";

export type UserIntialState = {
  user: User | null;
};

export type ProductIntialState = {
  productForm: {
    open: boolean;
    edit: Product | null;
  };
};

export type ConfirmDialogIntialProps = {
  title: string;
  message: string;
  onConfirm: null | (() => void);
};

export type ConfirmDialogIntialState = ConfirmDialogIntialProps & {
  open: boolean;
};

export type GlobalStore = {
  "user/store": UserIntialState;
  "product/store": ProductIntialState;
  "@ui/confirmDialog": ConfirmDialogIntialState;
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
