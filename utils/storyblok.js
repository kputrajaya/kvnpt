const get = (path, param='') => {
  const token = process.env.STORYBLOK_TOKEN
  const timestamp = Date.now()
  const url = `https://api.storyblok.com/v1/cdn/stories/${path}?token=${token}&t=${timestamp}&${param}`
  return fetch(url)
}
const getJson = (path, param='') => {
  return get(path, param).then(res => res.json())
}

export const getIntro = () => getJson('site')
export const getLinks = () => getJson('site/links')
export const getPosts = async (page) => {
  const resPosts = await get('', `starts_with=posts&resolve_relations=photo.album&page=${page}&per_page=100`)
  const resPostsJson = await resPosts.json()
  return {
    stories: resPostsJson.stories,
    pageTotal: Math.ceil(resPosts.headers.get('total') / resPosts.headers.get('per-page'))
  }
}
export const getPost = (slug) => getJson(`posts/${slug}`, 'resolve_relations=photo.album')
