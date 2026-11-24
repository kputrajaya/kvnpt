import { SITE_IMAGE, SITE_NAME, SITE_URL, STATIC_PROPS_REVALIDATE } from '../../../utils/constants';
import { getLinkPreview } from '../../../utils/links';
import { getPost } from '../../../utils/storyblok';
import { absoluteUrl, getBreadcrumb, getPostDates, getPostDescription, getPostImage } from '../../../utils/seo';
import BackButton from '../../../components/back_button';
import Block from '../../../components/block';
import PostSubtitle from '../../../components/post_subtitle';
import Seo from '../../../components/seo';

export default function Post({ post }) {
  if (!post) return null;

  const path = `/blog/posts/${post.slug}`;
  const description = getPostDescription(post);
  const image = getPostImage(post) || SITE_IMAGE;
  const { published, modified } = getPostDates(post);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.name,
      description,
      image: [image],
      datePublished: published,
      dateModified: modified,
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL, image: SITE_IMAGE },
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
      keywords: post.tag_list?.join(', '),
    },
    getBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/pages/1' },
      { name: post.name, path },
    ]),
  ];

  return (
    <>
      <Seo
        title={post.name}
        description={description}
        path={path}
        image={image}
        type="article"
        publishedTime={published}
        modifiedTime={modified}
        tags={post.tag_list}
        jsonLd={structuredData}
      />

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
  return { paths: [], fallback: 'blocking' };
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
