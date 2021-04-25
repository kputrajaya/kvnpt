import Head from 'next/head'
import { format, parseISO } from 'date-fns'

import { getPost, getPostCount, getPosts } from '../../../utils/storyblok'
import { BLOG_PER_PAGE_MAX } from '../../../utils/constants'
import Block from '../../../components/block'

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.name} - Kevin Putrajaya</title>
      </Head>

      <a className="mb-4 text-sm text-gray-400 block" href={`/blog`}>&larr; Back</a>
      <h1 className="mb-1 text-2xl font-bold">{post.name}</h1>
      <h3 className="mb-8 text-sm text-gray-400">{format(parseISO(post.published_at), 'd LLL yyyy')}</h3>

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

  return {
    props: {
      post: resPost.story
    }
  }
}
