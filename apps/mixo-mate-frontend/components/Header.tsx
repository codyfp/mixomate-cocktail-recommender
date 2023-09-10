const Header = ({ logoSrc }) => {
    return (
        <header className="bg-custom-orange shadow-md h-[14vh]">
          <div className="container mx-auto flex items-center justify-between h-full"> 
            
            <img src={logoSrc} alt="Logo" className="h-full w-auto blend-multiply" />
{/* 
            <div className="space-x-4">
                <a href="#" className="text-white hover:text-gray-200 font-bold text-xl">About</a>
                <a href="#" className="text-white hover:text-gray-200 font-bold text-xl">Feedback</a>
                <a href="#" className="text-white hover:text-gray-200 font-bold text-xl">Support</a>
            </div> */}

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
