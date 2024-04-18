export type IVideo = {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
};

export type VideoProps = {
  videos: IVideo[];
};

export type TrendingItemProps = {
  activeItem: IVideo | undefined;
  item: IVideo;
};
