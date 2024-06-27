'use client';

import { GitHubLogoIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { NavbarLink } from '@/components/layout/header/Navbar';
import FooterIcon from './FooterIcon';

export default function Footer() {
  return (
    <footer className="flex flex-1 flex-col justify-end">
      <div className="flex" style={{ width: "100%", padding: "10px", background: "#0d68ae" }}>
        <div  style={{ width: "10%"}}>
          <a href={`https://twitter.com/openwebacademy_`} target="_blank" className="footerLink">
            Follow
          </a>
        </div>
        <div  style={{ width: "10%"}}>
          <a href={`https://t.me/openwebacademy1`} target="_blank" className="footerLink">
            Telegram
          </a>
        </div>
        <div  style={{ width: "80%", textAlign: "end" }}>Burrito Battle is project by <a href="https://ow.academy/" target="_blank" className="footerOWA">Open Web Academy</a></div>
      </div>
    </footer>
  );
}
