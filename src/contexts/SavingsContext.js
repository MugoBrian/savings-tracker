import { createContext, useContext} from "react";

// Create the context
const SavingsContext = createContext();

// export the context provider
export const SavingsProvider = SavingsContext.Provider;

// create custom hook to use the context
export const useSavings = () => {
  const context = useContext(SavingsContext);
  if (!context) {
    throw new Error("useSavings must be used within SavingsProvider");
  }
  return context;
};
