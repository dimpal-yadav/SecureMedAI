import { Link } from "react-router-dom"

function Navbar(){
    const isAuthenticated = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const userRole = localStorage.getItem('role')

    const logout = () =>{
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('name')
      localStorage.removeItem('role')
      window.location.href = '/'
    }

    const getDashboardLink = () => {
      switch(userRole) {
        case 'PATIENT':
          return '/patient-dashboard';
        case 'DOCTOR':
          return '/doctor-dashboard';
        case 'HOSPITAL_ADMIN':
          return '/admin-dashboard';
        default:
          return '/patient-profile';
      }
    }

    const getDashboardText = () => {
      return 'Dashboard';
    }

    return (
      <div className="navigation">
        <div className="header flex justify-between mx-[100px] mt-[30px] items-center">
          <div className="header-item">
            <h4 className="font-bold">
              <Link to="/" className="nav-link">
                HealthVault
              </Link>
            </h4>
          </div>
          <div className="header-item flex gap-10">
            <Link
              to="/"
              className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
            >
              Contact Us
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to={getDashboardLink()}
                  className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                >
                  {getDashboardText()}
                </Link>
                <Link
                  to="/prediction"
                  className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                >
                  Symptom Checker
                </Link>
              </>
            )}
            <Link
              to="/doctors"
              className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
            >
              Doctors
            </Link>
          </div>

          {!isAuthenticated ? (
            <div className="header-item flex gap-10">
              <Link
                to="/signup"
                className="hover:text-[#1E40AF] transition-all-duration-300"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="hover:text-[#1E40AF] transition-all-duration-300"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="header-item flex gap-8 items-center">
              <div className="user">
                <Link to={getDashboardLink()}>
                  <div className="account flex gap-3 items-center">
                    <img src="/images/user.png" alt="" className="w-6 h-6" />
                    <p className="text-black">
                      {userRole === 'DOCTOR' ? `Dr. ${name}` : name}
                    </p>
                  </div>
                </Link>
              </div>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Navbar