import { useEffect, useState } from 'react'
import { getSettings } from '@/sanity/utils'

// components
import Footer from './footer'
import Navbar from './navbar'
import Topbar from './topbar'
import PageHead from './page-head'
import MobileNavbar from './mobile-navbar'

// font
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({ 
  children,
  metaTitle,
  metaDescription,
  metaKeywords
}) {
  
  const [settings, setSettings] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchSettings()
  }, [])
  
  const fetchSettings = async () => {
    const siteSettings = await getSettings()
    setSettings(siteSettings)
    setIsLoading(false)
  }

  if (isLoading) {
    return 
  }

  return (

    <>
      <PageHead 
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
      />
      <div className={`${inter.className}`}>
        {settings.enableTopbar && (
          <Topbar 
            message={settings.topbarMessage} 
            enableTopbarLink={settings.enableTopbarLink}
            topbarLinkUrl={settings.topbarLinkUrl} 
            topbarLinkText={settings.topbarLinkText}
            topbarLinkColor={settings.topbarLinkColor}
          />
        )}
        <Navbar 
          buttonText={settings.navbarButtonText} 
          buttonLink={settings.navbarButtonLink}
          logoText={settings.logoText}
          menuItems={settings.navbarMenuItems}
        />
        <MobileNavbar
          buttonText={settings.navbarButtonText} 
          buttonLink={settings.navbarButtonLink}
          logoText={settings.logoText}
          menuItems={settings.navbarMenuItems}
        />
        <main>
          {children}
        </main>
        <Footer 
          logoText={settings.logoText}
          footerTagline={settings.footerTagline}
          footerQuickLinks={settings.footerQuickLinks}
          footerSocialLinks={settings.footerSocialLinks}
          footerCopyright={settings.footerCopyright}
          footerLegalLinks={settings.footerLegalLinks}
          enableFootnote={settings.enableFootnote}
          footerFootnoteText={settings.footerFootnoteText}
          enableFootnoteLink={settings.enableFootnoteLink}
          footerFootnoteLink={settings.footerFootnoteLink}
        />
      </div>
    </>

  )
}