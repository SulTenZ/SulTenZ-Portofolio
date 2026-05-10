import { createContext, useContext, useState, useEffect } from "react";
import Preloader from "../components-ui/Preloader";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [appLoaded, setAppLoaded] = useState(false);

  // If we want to show preloader only on initial visit, we can do this.
  // Or just always show it when app mounts.
  
  return (
    <LoadingContext.Provider value={{ appLoaded, setAppLoaded }}>
      {!appLoaded && <Preloader onFinish={() => setAppLoaded(true)} />}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
