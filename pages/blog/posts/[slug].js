import Head from 'next/head'
import { format, parseISO } from 'date-fns'

import { BLOG_PER_PAGE_MAX } from '../../../utils/constants'
import { getLinkPreview } from '../../../utils/generics'
import { getPost, getPostCount, getPosts } from '../../../utils/storyblok'
import BackButton from '../../../components/back_button'
import Block from '../../../components/block'

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.name} - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/blog/pages/1" />
      <h1 className="mb-1 text-2xl font-semibold">{post.name}</h1>
      <h3 className="mb-8 text-sm text-gray-500">{format(parseISO(post.published_at), 'd LLL yyyy')}</h3>

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
  // Get post count and page count (using max fetch count to server)
  const count = await getPostCount()
  const pageCount = Math.ceil(count / BLOG_PER_PAGE_MAX)

  // Get multiple pages of posts in parallel
  const multiPosts = await Promise.all(
    [...Array(pageCount).keys()].map((key) => getPosts(key + 1, BLOG_PER_PAGE_MAX))
  )

  // Flatten into list of slugs
  const paths = multiPosts.flatMap(posts => posts.stories.map(post => ({
    params: {
      slug: post.slug
    }
  })))

  return {paths, fallback: false}
}

export async function getStaticProps({ params }) {
  // Get post for current slug
  const resPost = await getPost(params.slug)

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
    }
  }
}
