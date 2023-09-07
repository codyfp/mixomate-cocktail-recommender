const Header = ({ logoSrc }) => {
    return (
        <header className="bg-custom-orange shadow-md">
          <div className="container mx-auto flex items-center justify-between h-20 pl-2"> 
            <img src={logoSrc} alt="Logo" className="h-full w-auto ml-0 blend-multiply" />
          </div>
        </header>
    )
}

export default Header
