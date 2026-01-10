import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="">
      <div className="container">
        <div className="flex justify-between gap-12">
          <div className="">
            <Image src="/images/footer-logo.svg" alt="footer-logo" width={100} height={100} />
          </div>
        </div>
      </div>
    </footer>
  )
}
