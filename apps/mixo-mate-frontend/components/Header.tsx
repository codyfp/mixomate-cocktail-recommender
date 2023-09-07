const Header = ({ logoSrc }) => {
    return (
        <header className="bg-orange-600 p-4 shadow-md">
          <div className="container mx-auto flex items-center">
            <img src={logoSrc} alt="Logo" className="h-10 w-auto opacity-75" />
          </div>
        </header>

      )
}

export default Header