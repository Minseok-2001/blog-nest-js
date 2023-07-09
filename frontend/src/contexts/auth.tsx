import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
