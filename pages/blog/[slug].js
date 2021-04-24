import Head from 'next/head'

import { getPost, getPosts } from '../../utils/storyblok'

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.name} - Kevin Putrajaya</title>
      </Head>

      <a className="mb-2 text-gray-500 block" href="/blog">&larr; Back</a>
      <h1 className="mb-8 text-xl font-bold">{post.name}</h1>

      <div>
        {
          post.content.body.map((block, index) => (
            <div key={index}>
              {block.component}
            </div>
          ))
        }
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const resPosts = await getPosts()
  return {
    paths: resPosts.stories.map((post) => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const resPost = await getPost(params.slug)
  const post = resPost.story

  return {
    props: {
      post
    },
  }
}
