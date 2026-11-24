import { PhotoAlbum, SongAlbum } from './types';
import photoAlbums from '../data/photo-albums.json';
import songAlbums from '../data/song-albums.json';

export const BLOCK_LINK_IMAGE_SIZE = 75;

export const BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT = 6;

export const BLOCK_PHOTO_MAX_HEIGHT = 500;
export const BLOCK_PHOTO_MAX_WIDTH = 704;

export const BLOG_PER_PAGE = 20;

export const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/kvn/';

export const INTRO_AVATAR_SIZE = 125;
export const INTRO_CONTACT_SIZE = 25;

export const PHOTO_ALBUM_IMAGE_SIZE = 1000;
export const PHOTO_ALBUM_PREVIEW_COUNT = 50;
export const PHOTO_ALBUM_TEASER_COUNT = 4;
export const PHOTO_ALBUM_TEASER_SIZE = 176;
export const PHOTO_ALBUM_THUMB_SIZE = 558;

export const RESUME_AVATAR_SIZE = 125;

export const SHORTIO_HOST = 'https://r.kvn.pt/';

export const SITE_DESCRIPTION =
  "I'm Kevin Putrajaya, an Engineering Manager at Grab. I write about software engineering, management, board games, and side projects.";
export const SITE_IMAGE = IMAGEKIT_ENDPOINT + 'og_image_nbEDAvfHN8N.jpg';
export const SITE_NAME = 'Kevin Putrajaya';
export const SITE_TITLE = SITE_NAME;
export const SITE_TWITTER_USER = '@kputrajaya';
export const SITE_URL = 'https://kvn.pt';
export const SITE_JOB_TITLE = 'Engineering Manager';
export const SITE_EMPLOYER = 'Grab';
export const SITE_SAME_AS = [
  'https://id.linkedin.com/in/kputrajaya',
  'https://github.com/kputrajaya',
  'https://twitter.com/kputrajaya',
];

export const BLOG_DESCRIPTION =
  'Notes on software engineering, engineering management, board games, side projects, and life by Kevin Putrajaya.';

export const STATIC_PROPS_REVALIDATE = parseInt(process.env.STATIC_PROPS_REVALIDATE || '30');

export const STORYBLOK_TOKEN = process.env.STORYBLOK_TOKEN || 'Not initialized';

export const SVG_INFO_SIZE = 15;
export const SVG_POST_SIZE = 15;
export const SVG_SCHEME_SIZE = 19;
export const SVG_SONG_SIZE = 10;

export const PHOTO_ALBUMS: PhotoAlbum[] = photoAlbums;
export const SONG_ALBUMS: SongAlbum[] = songAlbums;
