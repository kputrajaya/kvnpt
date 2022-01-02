import { STORYBLOK_TOKEN } from './constants';

const _get = (path, param = '') => {
  const timestamp = Date.now();
  const url = `https://api.storyblok.com/v1/cdn/stories/${path}?token=${STORYBLOK_TOKEN}&${param}&t=${timestamp}`;
  return fetch(url);
};
const _getJson = (path, param = '') => _get(path, param).then((res) => res.json());

export const getHome = () => _getJson('site');

export const getResume = () => _getJson('site/resume');

export const getPosts = async (page, perPage) => {
  const resPosts = await _get('', `starts_with=posts&page=${page}&per_page=${perPage}&sort_by=position`);
  const resPostsJson = await resPosts.json();
  return {
    count: resPosts.headers.get('total'),
    stories: resPostsJson.stories,
  };
};

export const getPostCount = async () => {
  const posts = await getPosts(1, 1);
  return posts.count;
};

export const getPost = (slug) => _getJson(`posts/${slug}`, 'resolve_relations=photo_album_link.photo_album');

export const getPhotoAlbums = () => _getJson('', 'starts_with=photo-albums&per_page=100&sort_by=position');

export const getPhotoAlbum = (slug) => _getJson(`photo-albums/${slug}`);

export const getSongAlbums = () => _getJson('', 'starts_with=song-albums&per_page=100&sort_by=position');

export const getSongAlbum = (slug) => _getJson(`song-albums/${slug}`);
