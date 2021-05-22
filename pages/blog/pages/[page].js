import Head from 'next/head'
import Link from 'next/link'

import {BLOG_PER_PAGE, SITE_TITLE, STATIC_PROPS_REVALIDATE} from '../../../utils/constants'
import {getPostCount, getPosts} from '../../../utils/storyblok'
import BackButton from '../../../components/back_button'
import PostSubtitle from '../../../components/post_subtitle'

export default function Page({posts, pageCurrent, pageCount}) {
  if (!posts) return null

  return (
    <>
      <Head>
        <title>Blog - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Blog</h1>

      {
        posts.map((post, index) => (
          <Link href={`/blog/posts/${post.slug}`} key={index}>
            <a className="kvn-card mb-4 block">
              <h2 className="mb-1 font-semibold">{post.name}</h2>
              <h3 className="text-sm text-scheme-third">
                <PostSubtitle date={post.first_published_at} tags={post.tag_list} />
              </h3>
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
      page: `${key + 1}`,
    },
  }))

  return {paths, fallback: true}
}

export async function getStaticProps({params}) {
  // Get posts for current page
  const pageCurrent = Math.floor(params.page)
  if (!(pageCurrent > 0)) return {notFound: true}
  const resPosts = await getPosts(pageCurrent, BLOG_PER_PAGE)
  if (!resPosts?.stories?.length) return {notFound: true}
  const pageCount = Math.ceil(resPosts.count / BLOG_PER_PAGE)

  return {
    props: {
      posts: resPosts.stories,
      pageCurrent,
      pageCount,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  }
}
