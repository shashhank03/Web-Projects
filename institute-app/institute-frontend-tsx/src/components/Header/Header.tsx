import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation() 
  const { isAuthenticated, logout, user } = useAuth() 

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="shadow-lg z-5 top-0 min-w-full">
      <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
        
          <Link to="/" className="flex items-center">
            <span className="material-symbols-outlined bg-red-700 hover:bg-red-800 w-11 h-11 flex items-center pt-0.5 rounded-full">
              school
            </span>
            <h2 className="text-2xl font-bold text-center ml-2">
              Institute Management
            </h2>
          </Link>

          <div className="flex items-center lg:order-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-gray-800 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Logout
                </button>

                <Link to="/profile" className="flex items-center">
                  <button className="flex items-center bg-gray-100 rounded-full overflow-hidden transition-all duration-1000 hover:bg-gray-200 group">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                      className="h-12 w-12 rounded-full transition-transform duration-300 group-hover:scale-110"
                      alt="Profile"
                    />
                    <span className="ml-2 text-gray-700 max-w-0 opacity-0 transition-all duration-1000 group-hover:max-w-xl pr-4 group-hover:opacity-100 whitespace-nowrap">
                      {user?.first_name || 'Profile'} {/* ✅ safe access */}
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-1 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Login
                  </Link>
                )}

                {location.pathname !== '/register' && (
                  <Link
                    to="/register"
                    className="text-orange-700 bg-white border border-orange-700 hover:bg-gray-400 focus:ring-1 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Register
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
