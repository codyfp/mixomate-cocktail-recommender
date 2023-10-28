import { useEffect, useState } from 'react';
import { UserApi, User } from '../UserApi';

const userApi = new UserApi();

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    loadCurrentUser()
  }, []);

  const loadCurrentUser = async (): Promise<void> => {
    try {
      const responseData = await userApi.getCurrent()
      if (responseData === null || responseData.message || responseData.error) {
        setCurrentUser(null);
        return;
      }
  
      const user = responseData;
      setCurrentUser(user);
      
    } catch (error) {
      setCurrentUser(null);
    }
  }

  const isAuthenticated = (): boolean => {
    return currentUser !== null;
  }

  const authApi = {
    login: async (username: string, password: string) => {
      const responseData = await userApi.login(username, password);
      await loadCurrentUser();
      return responseData;
    },

    logout: async () => {
      const response = await userApi.logout();
      await loadCurrentUser();
      return response;
    },

    create: async (username: string, password: string) => {
      const response = await userApi.create(username, password);
      await loadCurrentUser();
      return response;
    }
  }

  return { authApi, currentUser, isAuthenticated };
};