import { useCallback, useState } from 'react';
import {
  ChevronDownIcon,
  Cross1Icon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import AccountConnect from './AccountConnect';
import { Experiences } from './Experiences';
import { NavbarLink, NavbarTitle } from './Navbar';

export default function NavbarMobile() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenuOpen = useCallback(() => setMobileMenuOpen((open) => !open), []);

  if (isMobileMenuOpen) {
    return (
      <nav className="sm:max-h-300 mx-2 flex flex-col gap-4 rounded-[25px] bg-black bg-opacity-50 p-2 backdrop-blur-2xl">
        <div
          className={[
            'flex flex-1 flex-grow items-center justify-between',
            'rounded-[50px] border border-stone-300 bg-opacity-10 p-4 backdrop-blur-2xl',
          ].join(' ')}
        >
          <div className="h-38 flex grow items-center justify-between gap-4">
            <NavbarTitle />
            <button
              type="button"
              aria-label="Menu"
              data-state="open"
              onClick={toggleMobileMenuOpen}
            >
              <Cross1Icon width="24" height="24" />
            </button>
          </div>
        </div>
        <div>
          <ul className="mx-2 flex flex-col gap-4">
            <li className="flex">
              <NavbarLink href="https://github.com/open-web-academy/Burrito-Pets-Base" target="_blank">
                <GitHubLogoIcon width="24" height="24" />
              </NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/mint">Mint Pet</NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/interact">Interact</NavbarLink>
            </li>
          </ul>
          <div className="mx-2 mt-4">
            <AccountConnect />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={[
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl',
        'mx-4',
      ].join(' ')}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <button type="button" aria-label="Menu" data-state="closed" onClick={toggleMobileMenuOpen}>
          <HamburgerMenuIcon width="24" height="24" />
        </button>
      </div>
    </nav>
  );
}
