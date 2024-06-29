import { ChevronDownIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import NextLink from 'next/link';
import AccountConnect from './AccountConnect';
import { Experiences } from './Experiences';

export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal text-white no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink href="/" passHref aria-label="Home page">
        <img src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/icon.png" style={{ height: "50px" }} />
      </NextLink>
      <label
        className="font-robotoMono text-center text-xl font-medium text-white no-underline"
        aria-label="build-onchain-apps Github repository"
      >
        Burrito Battle Virtual Pets
      </label>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <div className="flex items-center justify-start gap-8">
          <ul className="hidden items-center justify-start gap-8 md:flex">
            <li className="flex">
              <NavbarLink href="https://github.com/open-web-academy/Burrito-Pets-Base" target="_blank">
                <GitHubLogoIcon
                  width="24"
                  height="24"
                  aria-label="build-onchain-apps Github respository"
                />
              </NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/mint">Mint Pet</NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/interact">Interact</NavbarLink>
            </li>
          </ul>
          <AccountConnect />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
