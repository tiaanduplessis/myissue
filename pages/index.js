import {useEffect} from "react"
import {useRouter} from 'next/router'

import { LandingJumbotron } from "@/components/landing-jumbotron"
import { LandingFeatures } from "@/components/landing-features"

import { useAuth } from "@/lib/auth"

export default function Landing() {
  const auth = useAuth()

  useEffect(() => {
    if (auth.user && window.history.length <= 2) {
      window.location.pathname = '/projects'
    }
  }, [auth.user])

  return (
    <>
      <LandingJumbotron />
      <LandingFeatures />
    </>
  )
}
