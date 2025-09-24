import { NavLink, Outlet } from "react-router"

function About() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">A propos</h1>

      <NavLink to="/a-propos/1">1</NavLink>
      <NavLink to="/a-propos/2">2</NavLink>

      <Outlet />
    </>
  )
}

export default About
