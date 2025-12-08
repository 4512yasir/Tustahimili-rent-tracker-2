// src/context/UserContext.tsx
import { createContext } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "agent" | "tenant";
};

export type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
