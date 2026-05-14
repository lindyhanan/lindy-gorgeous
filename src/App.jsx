import Header from "./components/Header"
import Hero from "./components/Hero"
import BestMenu from "./components/BestMenu"
import MemberBenefit from "./components/MemberBenefit"
import Newsletter from "./components/Newsletter"
import FloatingButton from "./components/FloatingButton"
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Error404 from "./pages/Error404"

import AuthLayout from './layouts/AuthLayout'
import Loading from './components/Loading'

const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))
const Forgot = React.lazy(() => import('./pages/auth/Forgot'))
function HomePage() {
  return (
    <div>

      <Header />

      <Hero />

      <BestMenu />

      <MemberBenefit />

      <Newsletter />

      <FloatingButton />

    </div>
  )
}
export default function App() {

  return (

    <Suspense fallback={<Loading />}>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/learn-more" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

    </Suspense>

  )
}