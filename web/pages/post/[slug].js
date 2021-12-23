import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import getYoutubeId from 'get-youtube-id';

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Post = (props) => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    authorImage,
    body = []
  } = props
  console.log('Trinh printed props', body);


  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(50)
              .url()}
          />
        </div>
      )}
      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
        {...client.config()}
        serializers={{ types: { youtube: youtubeDisplay } }}
      />
    </article>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });;
}


const BlockRenderer = (props) => {
  const { style = 'normal', type = 'normal' } = props.node;
  console.log('Trinh printered 2', style, type)
  if (type == 'youtube') {
    return <div>{"Yotube Block"}</div>
  }
  return BlockContent.defaultSerializers.types.block(props);
}
const youtubeDisplay = (props) => {
  const yId = getYoutubeId(props.node.url);
  // console.log('get youtube id', yId)
  return (
    <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + yId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>)
}
export default Post
