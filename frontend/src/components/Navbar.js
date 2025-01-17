import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout.js"
import { useAuthContext } from "../hooks/useAuthContext.js"

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => [
    logout()
  ]

  return(
    <header>
      <div className="container">
        <Link to="/" >
          <h2>Workout Logger</h2>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar