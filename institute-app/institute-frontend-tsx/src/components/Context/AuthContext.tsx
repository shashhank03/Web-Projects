import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  user_id: number;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  gender?: string;
  date_of_birth?: string;
  role?: "Student" | "Staff" | "Admin";
  address?: Address;
};

interface Address {
    street?: string;
    city?: string;
    state?: string;
    pin_code?: string;
    country?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

interface Batch {
    id?: number;
    course_id?: number;
    name?: string;
    start_date?: string;
    end_date?: string;
    status?: string;
    student_count?: number;
}

interface Course {
    id?: number;
    course_name?: string;
    course_code?: number;
    description?: string;
    duration?: string;
    status?: string;
}

interface Student extends User {
    courses: Array<Course>
}

interface Staff extends User {
    courses: Array<Course>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData && userData !== "undefined") {
            try {
                setUser(JSON.parse(userData) as User);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Invalid user data in localStorage:", e);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export type { User, Address, Batch, Course, Student, Staff };