import React, { createContext, useState, useContext, useEffect } from "react";
import { users as mockUsers, User } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  users: User[]; // Added users array to the context
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, "id" | "role">) => boolean;
  logout: () => void;
  addUser: (userData: Omit<User, "id" | "role"> & { role?: "user" | "admin" }) => boolean; // Fixed type
  deleteUser?: (userId: number) => boolean; // For future implementation
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a key for local storage
const USER_STORAGE_KEY = "railconnect_user";
const USERS_STORAGE_KEY = "railconnect_users";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize users from localStorage or fallback to mockUsers
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : mockUsers;
  });
  
  // Initialize user from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const { toast } = useToast();
  
  // Update localStorage whenever users change
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);
  
  // Update localStorage whenever current user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);
  
  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive",
    });
    
    return false;
  };
  
  const register = (userData: Omit<User, "id" | "role">) => {
    const userExists = users.some((u) => u.email === userData.email);
    
    if (userExists) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered. Please use another email.",
        variant: "destructive",
      });
      
      return false;
    }
    
    const newUser: User = {
      ...userData,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      role: "user",
    };
    
    setUsers([...users, newUser]);
    setUser(newUser);
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully!",
    });
    
    return true;
  };
  
  const logout = () => {
    setUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };
  
  // Fixed the addUser function to use the correct role type
  const addUser = (userData: Omit<User, "id" | "role"> & { role?: "user" | "admin" }) => {
    const userExists = users.some((u) => u.email === userData.email);
    
    if (userExists) {
      toast({
        title: "User Creation Failed",
        description: "This email is already registered. Please use another email.",
        variant: "destructive",
      });
      
      return false;
    }
    
    const newUser: User = {
      ...userData,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      role: userData.role || "user", // Use provided role or default to "user"
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "User Created Successfully",
      description: `${newUser.name} has been added to the system.`,
    });
    
    return true;
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user && user.role === "admin",
        users, // Expose users array
        login,
        register,
        logout,
        addUser, // Expose addUser function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
