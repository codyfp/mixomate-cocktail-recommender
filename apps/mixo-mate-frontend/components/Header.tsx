const Header = ({ logoSrc }) => {
    return (
        <header className="bg-logo-orange p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <img src={logoSrc} alt="Logo" className="h-10 w-auto ml-0" />
          </div>
        </header>
    )
}

export default Header
