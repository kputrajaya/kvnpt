import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'

import { getPostCount, getPosts } from '../../../utils/storyblok'
import { BLOG_PER_PAGE } from '../../../utils/constants'

export default function Page({ posts, pageCurrent, pageCount }) {
  return (
    <>
      <Head>
        <title>Blog - Kevin Putrajaya</title>
      </Head>

      <a className="mb-4 text-sm text-gray-400 block" href="/">&larr; Back</a>
      <h1 className="mb-8 text-2xl font-bold">Blog</h1>

      <div>
        {
          posts.map((post, index) => (
            <a className="no-underline" href={`/blog/posts/${post.slug}`} key={index}>
              <h2 className="mb-1 text-lg font-bold">{post.name}</h2>
              <h3 className="mb-4 text-sm text-gray-400">{format(parseISO(post.published_at), 'd LLL yyyy')}</h3>
            </a>
          ))
        }
      </div>

      <div className="mt-8 text-sm text-gray-400">
        {
          pageCurrent > 1 &&
          <>
            <a href={`/blog/pages/${pageCurrent - 1}`}>&larr; Previous</a>
            <span className="mx-2">&middot;</span>
          </>
        }
        <span className="text-black">
          Page {pageCurrent} / {pageCount}
        </span>
        {
          pageCurrent < pageCount &&
          <>
            <span className="mx-2">&middot;</span>
            <a href={`/blog/pages/${pageCurrent + 1}`}>Next &rarr;</a>
          </>
        }
      </div>
    </>
  )
}

export async function getStaticPaths() {
  // Get post count and page count
  const count = await getPostCount()
  const pageCount = Math.ceil(count / BLOG_PER_PAGE)

  // Build list of pages
  const paths = [...Array(pageCount).keys()].map((key) => ({
    params: {
      page: `${key + 1}`
    }
  }))

  return {paths, fallback: false}
}

export async function getStaticProps({ params }) {
  // Get posts for current page
  const pageCurrent = Math.floor(params.page)
  const resPosts = await getPosts(pageCurrent, BLOG_PER_PAGE)
  const pageCount = Math.ceil(resPosts.count / BLOG_PER_PAGE)

  return {
    props: {
      posts: resPosts.stories,
      pageCurrent,
      pageCount
    }
  }
}
