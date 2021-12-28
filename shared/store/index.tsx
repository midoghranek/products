import { configureStore } from "@reduxjs/toolkit";
import { GlobalStore } from "@types";
import { Provider } from "react-redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { producers } from "./configs";

const rootReducer = () => {
  const mapSlices = producers.slices.reduce((acc, curr) => {
    return { ...acc, [curr.name]: curr.reducer };
  }, {});
  const mapServices = producers.services.reduce((acc, curr) => {
    return { ...acc, [curr.reducerPath]: curr.reducer };
  }, {});
  return { ...mapSlices, ...mapServices };
};

const middlewareServices = producers.services.map(
  (service) => service.middleware
);

const store = configureStore({
  reducer: rootReducer(),

  // middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewareServices),
});

export const RTKProvider: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// export typed redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<GlobalStore> = useSelector;

// export actions
export { setUser, logoutUser } from "./user";
export { openEditProduct, openProductForm, closeProductForm } from "./product";

// export selectors
export { userSelector } from "./user";
export { productFormSelector } from "./product";
