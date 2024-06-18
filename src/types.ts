
export type SearchResult = {
  key: string;
}


export type ISites =
  | "tiktok"
  | "instagram"
  | "twitter"
  | "reddit"
  | "saved"
  | "ifunny"
  | "youtube";

export type sites = ISites;
export type medias = "video" | "photo" | "audio" | "gif" | "cdn";

export interface embedMedia {
  type: medias;
  url: string;
  cdnId?: string;
  thumbnail: string | null;
  duration: number | null;
  title?: string;
  height: number;
  width: number;
  headers?: {
    [key: string]: string;
  };
}

export interface embedFetch {
  type: sites;
  id: string;
  incorrectId?: boolean;
  user: {
    name: any;
    displayName: any;
    region: any;
    followers: any;
    friends: any;
    pictures: {
      url: any | null;
      banner: any | null;
    };
  };
  content: {
    id: any;
    link: string;
    text: string | null;
    title: string | null;
    description: string | null;
    media: embedMedia[];
    embedUrl: string;
    generatedMedia?: embedMedia[] | null;
    statistics: {
      shares: number;
      comments: number;
      follows: number;
      views: number;
      likes: number;
    };
  };
}

export interface embedFetchLimited {
  type: sites;
  id: string;
  incorrectId?: boolean;
  user: {
    name: any;
    displayName: any;
    region: any;
    followers: any;
    friends: any;
    pictures: {
      url: any | null;
      banner: any | null;
    };
  };
  content: {};
  preview: {
    text: string;
    img: string;
  }
}

export interface embedFetchError {
  type: sites;
  id?: string;
  reason: string;
  cause?: string;
  code?: number;
}
