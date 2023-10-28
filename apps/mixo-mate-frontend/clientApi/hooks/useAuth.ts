import { createContext, useEffect, useState } from 'react';
import { UserApi, User } from '../UserApi';

const userApi = new UserApi();

export const AuthContext = createContext<{
  user?: User,
  isLoading: boolean,
  isLoggedIn: boolean
}>({
  isLoading: true,
  isLoggedIn: false
});

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    loadCurrentUser()
  }, []);

  const loadCurrentUser = async (): Promise<void> => {
    try {
      const latestUser = await userApi.getCurrent()
      setIsLoggedIn(true);
      setUser(latestUser);
    } catch (error) {
      setUser(undefined);
      setIsLoggedIn(false); 
    } finally {
      setIsLoading(false);
    }
  }

  const authApi = {
    login: async (username: string, password: string) => {
      const responseData = await userApi.login(username, password);
      await loadCurrentUser();
      return responseData;
    },

    logout: async () => {
      const response = await userApi.logout();
      setIsLoggedIn(false)

      await loadCurrentUser();
      return response;
    },

    create: async (username: string, password: string) => {
      const response = await userApi.create(username, password);
      await loadCurrentUser();
      return response;
    }
  }

  return { authApi, user, isLoading, isLoggedIn };
};
