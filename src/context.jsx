/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "./db/apiAuth";
import supabase from "./db/supabase";
import useFetch from "./hooks/use-fetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: fetchedUser, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const [user, setUser] = useState(null);

  // Initialize once on mount
  useEffect(() => {
    fetchUser().then(() => {
      setUser(fetchedUser || null);
    });
  }, []);

  // Keep local state updated when fetchedUser changes
  useEffect(() => {
    setUser(fetchedUser || null);
  }, [fetchedUser]);

  // Automatically update user on login/logout
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const isAuthenticated = !!user;

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
