import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

import { getPosts } from '../../utils/storyblok'

export default function Home({ posts, pageCurrent, pageTotal }) {
  return (
    <div className="container max-w-3xl mx-auto">
      <Head>
        <title>Blog - Kevin Putrajaya</title>
      </Head>

      <a className="mb-2 text-gray-500 block" href="/">&larr; Back</a>
      <h1 className="mb-8 text-xl font-bold">Blog</h1>

      <div>
        {
          posts.map((post, index) => (
            <div key={index}>
              <h3 className="mb-4 text-lg font-bold"><a href={`/blog/${post.slug}`}>{post.name}</a></h3>
            </div>
          ))
        }
      </div>
      <div>{pageCurrent} / {pageTotal}</div>
    </div>
  )
}

export async function getStaticProps({ req }) {
  const pageCurrent = 1
  const resPosts = await getPosts(1)
  const posts = resPosts.stories
  const pageTotal = resPosts.pageTotal

  return {
    props: {
      posts,
      pageCurrent,
      pageTotal
    },
  }
}
