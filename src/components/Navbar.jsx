import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar p-4">
      <Link className="navbar-brand" to="#">Simple header</Link>
      <ul className="navbar-nav d-flex flex-row gap-4">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-product">Create Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Pricing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">FAQs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar