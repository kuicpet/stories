import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>Stories | {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' href='/favicon.ico' />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Share your stories',
  description: 'Share your stories',
  keywords: 'share, stories, sharing'
}
export default Meta
