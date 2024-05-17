import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 p-4 w-full">
      <ul className="flex flex-wrap items-center text-gray-900">
        <li>
          <NavLink to="/" className="me-4 hover:underline md:me-6 ">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
