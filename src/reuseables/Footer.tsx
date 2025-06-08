import React from 'react'
import logo from '../assets/logo.png'
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import { IconBrandFacebook } from '@tabler/icons-react'

const Footer: React.FC = () => {
  const navLinks: string[] = [
    'Product',
    'Features',
    'Pricing',
    'Resources',
    'Help',
    'Privacy',
  ]

  const socialLinks: string[] = [
    'Facebook',
    'Twitter',
    'Instagram',
    'GitHub',
    'LinkedIn',
  ]

  return (
    <footer className="py-32" id="footer">
      <section className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
          {/* Logo and Description */}
          <div>
            <div className="mb-8 md:mb-0 md:w-1/3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <img src={logo} alt="ChattaTrader logo" />
                <span className="text-xl font-bold text-black hover:text-black text-white">
                  ChattaTrader
                </span>
              </div>
              <p className="text-gray-600 text-sm font-semibold w-[300px] my-8">
                Trade with any natural language Brigade.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col md:flex-row md:space-x-8 mb-8 md:mb-0 text-center md:text-left">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={`/#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-gray-800 transition-colors py-2 md:py-0 font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* App Store Badges (commented) */}
          {/* <div className="flex flex-col items-center md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.chattrader"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block my-2"
            >
              <img
                src={googleplay}
                alt="Get it on Google Play"
                className="w-36 h-auto"
              />
            </a>
            <a
              href="https://apps.apple.com/app/chattrader/id1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block my-2"
            >
              <img
                src={appstore}
                alt="Download on the App Store"
                className="w-36 h-auto"
              />
            </a>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm flex items-center justify-between">
          <p>© {new Date().getFullYear()} BB. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            {socialLinks.map((social, index) => {
              const url = `https://${social.toLowerCase()}.com/chattatrader`
              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {social === 'Facebook' && <IconBrandFacebook width={20} height={20} />}
                  {social === 'Twitter' && <TwitterLogoIcon width={20} height={20} />}
                  {social === 'Instagram' && <InstagramLogoIcon width={20} height={20} />}
                  {social === 'GitHub' && <GitHubLogoIcon width={20} height={20} />}
                  {social === 'LinkedIn' && <LinkedInLogoIcon width={20} height={20} />}
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
