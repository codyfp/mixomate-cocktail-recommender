import { useAuth } from "@/clientApi/hooks/useAuth";

async function logout() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { authApi } = useAuth();
  
    if (authApi) {
      await authApi.logout();
      window.location.replace('/');
    }
  };


export default logout