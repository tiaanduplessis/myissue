const title =  'myissue - Save time and money with better issues'
const description = 'Create bug reports and feature requests with a shareable link.'
const url = 'https://myissue.vercel.app/'
export default {
    title,
    description,
    canonical: url,
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      url,
      title,
      description
    }
  };