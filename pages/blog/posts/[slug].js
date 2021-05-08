import Head from 'next/head'

import { STATIC_PROPS_REVALIDATE } from '../../../utils/constants'
import { formatDate, getLinkPreview } from '../../../utils/generics'
import { getPost, getPostCount, getPosts } from '../../../utils/storyblok'
import BackButton from '../../../components/back_button'
import Block from '../../../components/block'

export default function Post({ post }) {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.name} - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/blog/pages/1" />
      <h1 className="mb-2 text-2xl font-semibold">{post.name}</h1>
      <h3 className="mb-8 text-sm text-scheme-third">
        {formatDate(post.published_at)}
        {
          post.tag_list.length > 0 &&
          <> &nbsp;&middot;&nbsp; {post.tag_list.join(', ')}</>
        }
      </h3>

      <div>
        {
          post.content.body.map((block, index) => (
            <div key={index}>
              <Block block={block} />
            </div>
          ))
        }
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {paths: [], fallback: true}
}

export async function getStaticProps({ params }) {
  // Get post for current slug
  const resPost = await getPost(params.slug)
  if (!resPost?.story) return {notFound: true}

  // Generate link preview
  const blocks = resPost.story.content.body
  await Promise.all(blocks.map(async (block, index) => {
    if (block.component === 'link') {
      blocks[index].link.preview = await getLinkPreview(block.link.url)
    }
  }))

  return {
    props: {
      post: resPost.story
    },
    revalidate: STATIC_PROPS_REVALIDATE
  }
}
