"use client";

import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5/index.js";

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  // distructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  // get current path
  const pathname = usePathname();

  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo />
        </div>
        {/* navbar toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark  lg:order-1"
        >
          <svg
            id="show-button"
            className="h-6 fill-current block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-current hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        {/* /navbar toggler */}

        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center ${
                      menu.children?.map(({ url }) => url).includes(pathname) ||
                      menu.children
                        ?.map(({ url }) => `${url}/`)
                        .includes(pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children?.map((child, i) => (
                      <li className="nav-dropdown-item" key={`children-${i}`}>
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block ${
                            (pathname === `${child.url}/` ||
                              pathname === child.url) &&
                            "active"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : // <li className="nav-item">
              //   <Link
              //     href={menu.url}
              //     className={`nav-link block ${
              //       (pathname === `${menu.url}/` || pathname === menu.url) &&
              //       "active"
              //     }`}
              //   >
              //     {menu.name}
              //   </Link>
              // </li>
              null}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-outline-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {navigation_button.enable && (
            <Link
              className="btn bg-light_bg btn-sm hidden lg:inline-block rounded-full"
              href={navigation_button.link}
            >
              {navigation_button.label}
              <svg
                width="9"
                height="8"
                viewBox="0 0 9 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline ml-2"
              >
                <path
                  d="M1 2.99996H0V4.99996H1V2.99996ZM1 4.99996H8V2.99996H1V4.99996ZM4.12903 0C4.12903 2.73026 6.27918 5 8.99999 5V3C7.44506 3 6.12903 1.68801 6.12903 0H4.12903ZM8.99999 3C6.27921 3 4.12894 5.2697 4.12894 8H6.12894C6.12894 6.31201 7.44503 5 8.99999 5V3Z"
                  fill="black"
                />
              </svg>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
