import { useEffect, useState } from 'react';
import { UserApi } from '../UserApi';

export const useAuth = () => {
  const [userApi, setApi] = useState<UserApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<unknown | null>(null);

  useEffect(() => {
    const api = new UserApi();
    setApi(api);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userApi) {
      userApi.getCurrent().then((user) => {
        setCurrentUser(user);
      });
    }
  }, [userApi]);

  const getCurrentUser = () => {
    if (userApi) {
      userApi.getCurrent().then((user) => {
        setCurrentUser(user);
      });
    }
  }

  const authApi = {
    login: async (username: string, password: string) => {
      if (userApi) {
        const responseData = await userApi.login(username, password);
        getCurrentUser();

        return responseData;
      }
    },
    logout: async () => {
      if (userApi) {
        const response = await userApi.logout();
        getCurrentUser();

        return response;
      }
    },
    create: async (username: string, password: string) => {
      if (userApi) {
        const response = await userApi.create(username, password);
        getCurrentUser();

        return response;
      }
    }
  }

  return { userApi: authApi, loading, currentUser, getCurrentUser };
};