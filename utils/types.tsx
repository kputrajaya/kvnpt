export type PhotoAlbum = {
  name: string;
  slug: string;
  date: string;
  photos: string[];
};

export type SongDetail = {
  audio: string;
  title: string;
  duration: string;
  featuring: string;
};

export type SongAlbum = {
  name: string;
  link: string;
  songs: SongDetail[];
};

export interface ErrorPageProps {
  code: number;
  title: string;
  message: string;
}
