import { useMemo } from 'react';
import { UserApi } from './../clientApi/UserApi';
import Image from 'next/image';

const Header = () => {
  const userApi = new UserApi();
  const username = useMemo(() => {
    if (userApi) {
      let name = userApi.getCurrent();
      return name?.username;
    }
    return undefined;
  }, [userApi]);

  return (
    <header className="bg-custom-orange shadow-md h-[14vh]">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Image 
          src="/images/logo.png" 
          alt="Logo" 
          priority={true}
          className="h-full w-auto blend-multiply"
          height={200}
          width={200}
          onClick={() => window.location.replace('/')}
        />
        {/* {username ? (
          <div className="text-white mr-4">
            Welcome {username}
          </div>
        ) : (
          <Link href="/" className="text-white mr-4">
            Login or Register
          </Link>
        )} */}

        <div className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
      </div>
    </header>
  )
}

export default Header
