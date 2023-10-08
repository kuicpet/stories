import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>MuteDiary | {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' href='/favicon.ico' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
      />
      <meta property='og:url' content='https://mutediary.com' />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Share your stories',
  description: 'Share your stories',
  keywords: 'share, stories, sharing',
}
export default Meta
