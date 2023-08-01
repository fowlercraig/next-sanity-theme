import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'

export async function getSettings() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'settings' && _id == 'settings'][0]{
      _id,
      logoText,
      main_heading,
      hide_testimonials,
      recent_posts,
      enableTopbar,
      topbarMessage,
      enableTopbarLink,
      topbarLinkUrl,
      topbarLinkText,
      topbarLinkColor,
      navbarMenuItems[]-> {
        _id,
        title,
        link
      },
      navbarButtonText,
      navbarButtonLink,
      footerTagline,
      footerCopyright,
      footerQuickLinks[]-> {
        _id,
        title,
        link
      },
      footerSocialLinks[]-> {
        _id,
        title,
        link
      },
      footerLegalLinks[]-> {
        _id,
        title,
        link
      },
      enableFootnote,
      footerFootnoteText,
      enableFootnoteLink,
      footerFootnoteLink
    }`
  )
}

export async function getPageBySlug(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'page' && slug.current == $slug][0] {
      _id,
      title,
      slug->{
        current
      },
      metaTitle,
      metaDescription,
      metaKeywords,
      pageBuilder,
    }`, { slug: slug }
  )
}

export async function getHomePage() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'homePage'][0]{
      _id,
      heading,
      paragraph,
      'image': image.asset->url,
      btnText,
      btnDestination,
      metaTitle,
      metaDescription,
      metaKeywords,
    }`,
  )
}

export async function getBlogPage() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'blogPage'][0]{
      _id,
      metaTitle,
      metaDescription,
      metaKeywords,
    }`,
  )
}

export async function getCaseStudyPage() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'caseStudyPage'][0]{
      _id,
      metaTitle,
      metaDescription,
      metaKeywords,
    }`,
  )
}

export async function getContactPage() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'contactPage'][0]{
      _id,
      metaTitle,
      metaDescription,
      metaKeywords,
    }`,
  )
}

export async function getAllPosts() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'post'] | order(_createdAt desc) {
      _id,
      title,
      'slug': slug.current,
      category->{
        title
      },
      readTime,
      'image': image.asset->url,
      postBuilder
    }`,
  )
}

export async function getLatestPosts() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'post'][0...5] | order(_createdAt desc) {
      _id,
      title,
      category->{
        title
      },
      readTime,
      'image': image.asset->url,
      'slug': slug.current,
      postBuilder
    }`,
  )
}

export async function getPostBySlug(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'post' && slug.current == $slug][0]{
      _id,
      title,
      'slug': slug.current,
      'category': category->title,
      author->{
        name,
        description,
        'image': image.asset->url,
      },
      'image': image.asset->url,
      readTime,
      postBuilder,
      metaTitle,
      metaDescription,
      metaKeywords,
    }`, { slug: slug }
  )
}

export async function getLatestCaseStudies() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'caseStudy'][0...2] | order(_createdAt desc) {
      _id,
      title,
      'slug': slug.current,
      url,
      'image': image.asset->url,
    }`,
  )
}

export async function getAllCaseStudies() {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'caseStudy'] | order(_createdAt desc) {
      _id,
      title,
      'slug': slug.current,
      url,
      'image': image.asset->url,
    }`,
  )
}

export async function getCaseStudyBySlug(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'caseStudy' && slug.current == $slug][0]{
      _id,
      title,
      shortDescription,
      overview,
      'slug': slug.current,
      url,
      'image': image.asset->url,
      imageGallery[] {
        'alt': alt,
        'url': asset->url
      },
      caseStudyCtaHeading,
      caseStudyCtaText,
      caseStudyCtaButtonText,
      caseStudyCtaButtonDestination,
      metaTitle,
      metaDescription,
      metaKeywords,
    }`, { slug: slug }
  )
}