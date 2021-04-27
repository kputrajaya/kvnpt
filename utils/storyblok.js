import { STORYBLOK_TOKEN } from './constants'

const _get = (path, param='') => {
  const timestamp = Date.now()
  const url = `https://api.storyblok.com/v1/cdn/stories/${path}?token=${STORYBLOK_TOKEN}&t=${timestamp}&${param}`
  return fetch(url)
}
const _getJson = (path, param='') => {
  return _get(path, param).then(res => res.json())
}

export const getHome = () => _getJson('site')

export const getResume = () => _getJson('site/resume')

export const getPosts = async (page, perPage) => {
  const resPosts = await _get('', `starts_with=posts&page=${page}&per_page=${perPage}`)
  const resPostsJson = await resPosts.json()
  return {
    count: resPosts.headers.get('total'),
    stories: resPostsJson.stories
  }
}

export const getPostCount = async () => {
  const posts = await getPosts(1, 1)
  return posts.count
}

export const getPost = (slug) => _getJson(`posts/${slug}`, 'resolve_relations=photo.album,song.album')
