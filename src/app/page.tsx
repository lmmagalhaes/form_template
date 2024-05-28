'use client'

import Modal from '@/components/modal'
import axios from 'axios'
import { useState } from 'react'
import User from '../app/user/page'

// const envVariable = process.env.NEXT_PUBLIC_BASE_API_URL

export default function Home() {
  return (
    <main>
      <User />
    </main>
  )
}
