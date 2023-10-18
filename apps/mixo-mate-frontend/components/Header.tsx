// Next/React
import { useMemo, useRef } from 'react';
import Image from 'next/image';

// PrimeReact
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// API
import { UserApi } from './../clientApi/UserApi';

const Header = () => {
  const userApi = new UserApi();

  const username = useMemo(() => {
    if (userApi) {
      let name = userApi.getCurrent();
      return name?.username;
    }
    return undefined;
  }, [userApi]);

  const menu = useRef(null);

  const items = [
    {label: 'Home', icon: 'pi pi-fw pi-home', command: () => { window.location.href = "/"; }},
    {label: 'Preferences', icon: 'pi pi-fw pi-cog', command: () => { window.location.href = "/preferences"; }},
    {label: 'Recommendations', icon: 'pi pi-fw pi-shopping-bag', command: () => { window.location.href = "/recommendations"; }},
    {label: 'Cocktails', icon: 'pi pi-fw pi-database', command: () => { window.location.href = "/cocktails"; }},
    {label: 'Ingredients', icon: 'pi pi-fw pi-database', command: () => { window.location.href = "/ingredients"; }},
    {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => { window.location.href = "/logout"; }}
  ];

  return (
    <header className="bg-custom-orange shadow-md h-[14vh]">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Image 
          src="/images/logo.png" 
          alt="Logo" 
          priority={true}
          className="h-full w-auto blend-multiply cursor-pointer"
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

        <div className="mt-8">
          <Menu model={items} popup ref={menu} id="popup_menu" />
          <Button 
            className="text-white text-lg"
            icon="pi pi-bars"
            onClick={(event) => menu.current.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          />
        </div>
      </div>
    </header>
  )
}

export default Header;