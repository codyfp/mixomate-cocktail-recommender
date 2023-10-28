// Next/React
import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AuthContext } from '@/clientApi/hooks/useAuth';

// PrimeReact
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const menu = useRef(null);

  const commonItems = [
    { label: 'Home', icon: 'pi pi-fw pi-home', command: () => { router.push("/") } },
    { label: 'Cocktails', icon: 'pi pi-fw pi-database', command: () => { router.push("/cocktails") } },
    { label: 'Ingredients', icon: 'pi pi-fw pi-database', command: () => { router.push("/ingredients") } },
  ];
  const [items, setItems] = useState(commonItems);

  useEffect(() => {
    const addAuthAction = async () => {
      if (isLoggedIn) {
        const loggedInItems = [
          { label: 'Preferences', icon: 'pi pi-fw pi-cog', command: () => { router.push("/preferences") } },
          { label: 'Recommendations', icon: 'pi pi-fw pi-shopping-bag', command: () => { router.push("/recommendations") } },
          { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => { router.push("/logout") } }
        ]

        setItems([...commonItems, ...loggedInItems])
      } else {
        const loggedOutItems = [
          { label: 'Login', icon: 'pi pi-fw pi-sign-in', command: () => { router.push("/authenticate") } }
        ];

        setItems([...commonItems, ...loggedOutItems])
      }
    };

    addAuthAction();
}, [isLoggedIn]);

  return (
    <header className="bg-custom-orange shadow-md h-[14vh] z-10">
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