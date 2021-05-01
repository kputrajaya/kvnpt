import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'

import { getPostCount, getPosts } from '../../../utils/storyblok'
import { BLOG_PER_PAGE } from '../../../utils/constants'
import BackButton from '../../../components/back_button'

export default function Page({ posts, pageCurrent, pageCount }) {
  return (
    <>
      <Head>
        <title>Blog - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Blog</h1>

      {
        posts.map((post, index) => (
          <Link href={`/blog/posts/${post.slug}`} key={index}>
            <a className="kvn-card mb-4 no-underline block">
              <h2 className="font-semibold">{post.name}</h2>
              <h3 className="text-sm text-scheme-third">{format(parseISO(post.published_at), 'd LLL yyyy')}</h3>
            </a>
          </Link>
        ))
      }

      <div className="mt-8 text-sm text-scheme-third">
        {
          pageCurrent > 1 &&
          <>
            <Link href={`/blog/pages/${pageCurrent - 1}`}><a>&larr; Previous</a></Link>
            <span className="mx-2">&middot;</span>
          </>
        }
        Page {pageCurrent} / {pageCount}
        {
          pageCurrent < pageCount &&
          <>
            <span className="mx-2">&middot;</span>
            <Link href={`/blog/pages/${pageCurrent + 1}`}><a>Next &rarr;</a></Link>
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
