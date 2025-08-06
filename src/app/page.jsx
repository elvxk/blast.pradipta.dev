'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import elvxk from './elvxk'


export default function Home() {
  useEffect(() => {
    console.info(elvxk);
  }, []);
  const [emails, setEmails] = useState('')
  const [finalEmails, setFinalEmails] = useState([])
  const [uniqueEmails, setUniqueEmails] = useState([])
  const [duplicateEmails, setDuplicateEmails] = useState([])
  const [finalCount, setFinalCount] = useState(0)
  const [totalDuplicates, setTotalDuplicates] = useState(0)
  const [totalDup, setTotalDup] = useState(0)

  const handleAnalyze = () => {
    const cleanedList = emails
      .split('\n')
      .map(email =>
        email
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF\r]/g, '')
      )
      .filter(email => email !== '')

    const emailCount = {}
    cleanedList.forEach(email => {
      emailCount[email] = (emailCount[email] || 0) + 1
    })

    const uniques = Object.entries(emailCount)
      .filter(([_, count]) => count === 1)
      .map(([email]) => email)

    const duplicates = Object.entries(emailCount)
      .filter(([_, count]) => count > 1)
      .map(([email, count]) => ({ email, count }))

    const finalList = Object.keys(emailCount)
    const totalDup = duplicates.reduce((sum, item) => sum + (item.count - 1), 0)
    const totalDupCount = duplicates.length

    setUniqueEmails(uniques)
    setDuplicateEmails(duplicates)
    setFinalEmails(finalList)
    setFinalCount(finalList.length)
    setTotalDuplicates(totalDup)
    setTotalDup(totalDupCount)
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative">
      <Image
        src="/logo.webp"
        alt="Logo Blast"
        width={168}
        height={168}
        className="hover:scale-110 self-center hover:-rotate-3 transition-all hover:cursor-cell"
        draggable={false}
        priority
      />

      <Textarea
        className="w-full h-64 p-3 mb-4 mt-10"
        placeholder="Masukkan daftar email, satu per baris"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />

      <Button
        className="hover:cursor-pointer w-full mb-4"
        onClick={handleAnalyze}
      >
        Check Email
      </Button>

      {finalCount > 0 && (
        <>
          <Card className="w-full bg-secondary-background mb-4">
            <CardHeader>
              <CardTitle className={`text-lg`}>Rekap Data</CardTitle>
              <CardDescription>
                <p>📦 <strong>Total Input Email : </strong>{finalCount + totalDuplicates}</p>
                <p>🛫 <strong>Final Email Blast : </strong>{finalCount}</p>
                <p>✅ <strong>Total Email Unik : </strong>{uniqueEmails.length}</p>
                <p>❌ <strong>Email Duplikat : </strong>{totalDup}</p>
                <p>🗒️ <strong>Total Duplikasi : </strong>{totalDuplicates}</p>
              </CardDescription>
            </CardHeader>
          </Card>


          <div className='w-full flex flex-col lg:flex-row gap-4'>
            <Card className="w-full bg-secondary-background">
              <CardHeader>
                <CardTitle className={`text-lg`}>Final Email Untuk Blast : {finalCount}</CardTitle>
                <CardDescription>
                  <ul className="list-disc list-inside text-sm">
                    {finalEmails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-full bg-secondary-background">
              <CardHeader>
                <CardTitle className={`text-lg`}>Total Email Duplikat : {totalDup} (dengan {totalDuplicates} duplikat)</CardTitle>
                <CardDescription>
                  {duplicateEmails.map((item, index) => (
                    <li key={index}>
                      {item.email} ({item.count - 1} duplikat)
                    </li>
                  ))}
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </>
      )}
      <div className="h-24"></div>
      <footer className="absolute bottom-0 self-center mb-4">
        <div className="text-center items-center justify-center flex flex-col">
          <Link
            className="flex flex-col justify-between items-center text-sm font-bold"
            href="https://tools.pradipta.dev"
            target="_blank"
          >
            <img
              src="https://tools.pradipta.dev/eltoolnobg.webp"
              alt="elvxk tool"
              width={23}
              height={23}
            />
            ELVXK TOOL
          </Link>
          <p className="text-sm">
            Made with love © {new Date().getFullYear()}{" "}
            <Link href="https://pradipta.dev" target="_blank">
              elvxk
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

