export interface IUrl {
  url: string;
  media: IMedia[];
  isScraped: boolean;
}

export interface IMedia {
  url: IUrl;
  mediaType: string;
  mediaUrl: string;
}