import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_TITLE, STATIC_PROPS_REVALIDATE } from '../../../utils/constants';
import { getLinkPreview } from '../../../utils/links';
import { getPost } from '../../../utils/storyblok';
import BackButton from '../../../components/back_button';
import Block from '../../../components/block';
import PostSubtitle from '../../../components/post_subtitle';

function PostSkeleton() {
  return (
    <>
      <BackButton href="/blog/pages/1" />
      <div role="status" aria-live="polite">
        <span className="sr-only">Loading post</span>
        <div className="mb-2 h-8 w-2/3 animate-pulse rounded bg-scheme-75" />
        <div className="mb-8 h-4 w-1/3 animate-pulse rounded bg-scheme-75" />
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className={`h-4 animate-pulse rounded bg-scheme-75 ${line === 4 ? 'w-2/3' : 'w-full'}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) return <PostSkeleton />;
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{`${post.name} - ${SITE_TITLE}`}</title>
      </Head>

      <BackButton href="/blog/pages/1" />
      <h1 className="mb-2 text-2xl font-semibold">{post.name}</h1>
      <h3 className="text-scheme-third mb-8 text-sm">
        <PostSubtitle date={post.first_published_at} tags={post.tag_list} />
      </h3>

      <div>
        {post.content.body.map((block) => (
          <div key={block._uid}>
            <Block block={block} />
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  // Get post for current slug
  const resPost = await getPost(params.slug);
  if (!resPost?.story) return { notFound: true };

  // Generate link preview
  const blocks = resPost.story.content.body;
  await Promise.all(
    blocks.map(async (block, index) => {
      if (block.component === 'link') {
        blocks[index].link.preview = await getLinkPreview(block.link.url);
      }
    })
  );

  return {
    props: {
      post: resPost.story,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
