import Link from 'next/link'
import groq from 'groq'
import client from '../client'

function Index(props) {
  const { posts = [] } = props
  return (
    <div>
      <h1>Welcome to a blog! with some pre defined set up </h1>
      <div>1. Youtube content</div>
      <div>2. video file</div>
      {posts.map(
        ({ _id, title = "", slug = "", _updatedAt = "" }) =>
          slug && (
            <li key={_id}>
              <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                <a>{title}</a>
              </Link>{" "}
              ({new Date(_updatedAt).toDateString()})
            </li>
          )
      )}
    </div>
  );
}

Index.getInitialProps = async () => ({
  posts: await client.fetch(groq`
    *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
  `)
})

export default Index