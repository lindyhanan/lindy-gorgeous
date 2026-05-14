import { Outlet } from "react-router-dom"
import Header from "../components/Header"

export default function MainLayout() {
  return (
    <div className="bg-[#0f0b08] text-white min-h-screen">

      <Header />

      <main className="pt-28">
        <Outlet />
      </main>

    </div>
  )
}