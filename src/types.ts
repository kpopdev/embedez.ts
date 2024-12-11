export type SearchResult = {
  key: string;
  site: ISites;
  views?: number;
  timestamp?: Date;
  detected: Record<string, string | undefined>;
  originalUrl: string;
};
export type ISites = "tiktok" | "instagram" | "twitter" | "reddit" | "saved" | "ifunny" | "youtube";
export type IMedias = "video" | "photo" | "audio" | "gif" | "cdn";

export let shouldCors = ["instagram", "twitter", "ifunny", "imgur"];

export interface EmbedFetchLimited {
  type: ISites;
  key: string;
  incorrectId?: boolean;
  user: {
    name: any;
    displayName: any;
    region: any;
    followers: any;
    friends: any;
    pictures: {
      url?: MediaUrl;
      banner?: MediaUrl;
    };
  };
  content: {};
  preview: {
    text: string;
    img: MediaUrl;
  };
}

export type Medias = "video" | "photo" | "audio" | "gif" | "cdn";

export type MediaUrl =
  | {
    site: ISites;
    type: Medias;
    id: string;
  }
  | {
    site: ISites;
    type: Medias;
    url: string;
    headers?: {
      [key: string]: string;
    };
  };

export interface EmbedMedia {
  type: Medias;
  source: MediaObject | MediaUrl;
  thumbnail?: MediaObject | MediaUrl | undefined;
  duration: number | null;
  title?: string;
  height: number;
  width: number;
}

export type EmbedFetch = {
  type: ISites;
  key: string;
  incorrectId?: boolean;
  user: EmbedFetchUser;
  content: EmbedFetchContent;
};

export type EmbedFetchPreview = Omit<EmbedFetch, "content"> & {
  preview: {
    text: string;
    img: MediaObject | MediaUrl | undefined;
  };
};

export interface EmbedFetchUser {
  name: any;
  displayName: any;
  region: any;
  followers: any;
  friends: any;
  pictures: {
    url?: MediaObject | MediaUrl;
    banner?: MediaObject | MediaUrl;
  };
}

export interface EmbedFetchContent {
  key: any;
  link: string;
  text: string | null;
  title: string | null;
  description: string | null;
  media: EmbedMedia[];
  generatedMedia?: EmbedMedia[] | null;
  statistics: {
    shares: number;
    comments: number;
    follows: number;
    views: number;
    likes: number;
  };
}

export class EmbedFetchObject {
  type: ISites;
  key: string;
  user: EmbedUser;
  content: EmbedContent;

  constructor({
    type,
    key,
    user,
    content,
  }: Partial<EmbedFetch> & { type: ISites; key: string }) {
    this.type = type;
    this.key = key;
    this.user = new EmbedUser(user);
    this.content = new EmbedContent(content);

    return this;
  }

  toJSON(): EmbedFetch {
    if (!this.key) throw new Error("Key is required");
    return {
      type: this.type,
      key: this.key,
      user: this.user.toJSON(),
      content: this.content.toJSON(),
    };
  }

  getPreview(): EmbedFetchPreview {
    const data = this.toJSON();
    const content = data.content;
    const img =
      content.media.find(({ type }) => type == "video")?.thumbnail ||
      content.media.find(({ type }) => type == "photo")?.thumbnail ||
      content.media.find(({ type }) => type == "gif")?.thumbnail;

    delete (data as any).content;
    return {
      ...data,
      preview: {
        text: content.description?.slice(0, 50) || "",
        img: img,
      },
    };
  }
}

export class EmbedMediaObject {
  private media: EmbedMedia;

  constructor({
    type,
    source,
    thumbnail,
    duration,
    height,
    width,
  }: Partial<EmbedMedia> = {}) {
    this.media = {
      type: type ?? "video", // Default value
      source: source ?? new MediaObject(),
      thumbnail: thumbnail ?? undefined,
      duration: duration ?? null,
      height: height ?? 0,
      width: width ?? 0,
    } satisfies EmbedMedia;
  }

  setType(type: Medias): this {
    this.media.type = type;
    return this;
  }

  setUrl(url: MediaUrl | MediaObject): this {
    this.media.source = new MediaObject(url);
    return this;
  }

  setTitle(title: string): this {
    this.media.title = title;
    return this;
  }

  setThumbnail(thumbnail: MediaUrl | MediaObject): this {
    this.media.thumbnail = new MediaObject(thumbnail);
    return this;
  }

  setDurationInSeconds(duration: number | null): this {
    this.media.duration = duration;
    return this;
  }

  setSize(height: number, width: number): this {
    this.media.height = height;
    this.media.width = width;
    return this;
  }

  getUrl(props?: {
    ignoreTemp?: boolean;
    EZ_CDN_URL?: string;
    EZ_PROXY_URI?: string;
  }): string {
    return new MediaObject(this.media.source).getUrl(props);
  }

  getThumbnail(props?: {
    ignoreTemp?: boolean;
    EZ_CDN_URL?: string;
    EZ_PROXY_URI?: string;
  }): string {
    return new MediaObject(this.media.thumbnail).getUrl(props);
  }

  getMedia(): EmbedMedia {
    return this.media;
  }

  toJSON(): EmbedMedia {
    return {
      ...this.media,
      source: new MediaObject(this.media.source).toJSON(),
      thumbnail: this.media.thumbnail
        ? new MediaObject(this.media.thumbnail).toJSON()
        : undefined,
    };
  }
}

export class MediaObject {
  id?: string;
  url?: string;
  site?: ISites;
  type?: Medias;
  headers?: {
    [key: string]: string;
  };

  constructor(media?: MediaUrl | MediaObject) {
    if (!media) return;
    this.type = media.type;
    this.id = "id" in media ? media.id : undefined;
    this.url = "url" in media ? media.url : undefined;
    this.site = "site" in media ? media.site : undefined;
    this.headers = "headers" in media ? media.headers : undefined;
  }

  getUrl(props?: {
    ignoreTemp?: boolean;
    EZ_CDN_URL?: string;
    EZ_PROXY_URI?: string;
  }): string {
    const { ignoreTemp, EZ_CDN_URL = process.env.EZ_CDN_URL, EZ_PROXY_URI = process.env.EZ_PROXY_URI } = props ?? {};
    if (this.id) {
      return `${EZ_CDN_URL}/view?id=${this.id}&ignoreTemp=${ignoreTemp}&type=${this.type}`;
    }
    if (this.url) {
      if ((this.site && shouldCors.includes(this.site)) || this.headers) {
        const url = encodeURIComponent(this.url);
        const headers = encodeURIComponent(JSON.stringify(this.headers || {}));

        return `${EZ_PROXY_URI}/advanced?url=${url}&headers=${headers}`;
      } else {
        return this.url;
      }
    }
    return "";
  }

  toJSON(): MediaUrl {
    if ((!this.id && !this.url) || !this.site || !this.type)
      throw new Error("Invalid MediaObject attempted to be converted to json");

    if (this.id) {
      return {
        id: this.id,
        site: this.site,
        type: this.type,
      };
    }

    if (this.url) {
      return {
        url: this.url,
        site: this.site,
        type: this.type,
        headers: this.headers,
      };
    }

    throw new Error("Invalid MediaObject attempted to be converted to json");
  }
}

export class EmbedStatistics {
  shares: number;
  comments: number;
  follows: number;
  views: number;
  likes: number;

  constructor({
    shares,
    comments,
    follows,
    views,
    likes,
  }: Partial<EmbedFetchContent["statistics"]> = {}) {
    this.shares = shares ?? 0;
    this.comments = comments ?? 0;
    this.follows = follows ?? 0;
    this.views = views ?? 0;
    this.likes = likes ?? 0;
  }

  setShares(shares: number): this {
    this.shares = shares;
    return this;
  }

  setComments(comments: number): this {
    this.comments = comments;
    return this;
  }

  setFollows(follows: number): this {
    this.follows = follows;
    return this;
  }

  setViews(views: number): this {
    this.views = views;
    return this;
  }

  setLikes(likes: number): this {
    this.likes = likes;
    return this;
  }

  getStatistics(): EmbedFetchContent["statistics"] {
    return {
      shares: this.shares,
      comments: this.comments,
      follows: this.follows,
      views: this.views,
      likes: this.likes,
    };
  }

  toJSON(): EmbedFetchContent["statistics"] {
    return this.getStatistics();
  }

  toString(): string {
    return JSON.stringify(this.getStatistics());
  }
}

export class EmbedUser {
  name: string | null;
  displayName: string | null;
  region: string | null;
  followers: number | null;
  friends: number | null;
  pictures: {
    url?: MediaObject | MediaUrl;
    banner?: MediaObject | MediaUrl;
  };

  constructor({
    name,
    displayName,
    region,
    followers,
    friends,
    pictures,
  }: Partial<EmbedFetchUser> = {}) {
    this.name = name ?? null;
    this.displayName = displayName ?? null;
    this.region = region ?? null;
    this.followers = followers ?? null;
    this.friends = friends ?? null;
    this.pictures = pictures ?? {
      url: undefined,
      banner: undefined,
    };
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setDisplayName(displayName: string): this {
    this.displayName = displayName;
    return this;
  }

  setRegion(region: string): this {
    this.region = region;
    return this;
  }

  setFollowers(followers: number): this {
    this.followers = followers;
    return this;
  }

  setFriends(friends: number): this {
    this.friends = friends;
    return this;
  }

  setProfilePicture(url: MediaUrl | MediaObject): this {
    this.pictures.url = url;
    return this;
  }

  getProfilePicture(): string | undefined {
    if (!this.pictures.url) return undefined;
    const url = new MediaObject(this.pictures.url);
    return url.getUrl();
  }

  setBanner(banner: MediaUrl | MediaObject): this {
    this.pictures.banner = banner;
    return this;
  }

  toJSON(): EmbedFetchUser {
    return {
      name: this.name,
      displayName: this.displayName,
      region: this.region,
      followers: this.followers,
      friends: this.friends,
      pictures: {
        url: this.pictures.url
          ? new MediaObject(this.pictures.url).toJSON()
          : undefined,
        banner: this.pictures.banner
          ? new MediaObject(this.pictures.banner).toJSON()
          : undefined,
      },
    };
  }
}

export class EmbedContent {
  key: string | null;
  link: string;
  text: string | null;
  title: string | null;
  description: string | null;
  media: EmbedMedia[];
  statistics: EmbedStatistics;

  constructor({
    key,
    link,
    text,
    title,
    description,
    media,
    statistics,
  }: Partial<EmbedFetchContent> = {}) {
    this.key = key ?? null;
    this.link = link ?? "";
    this.text = text ?? null;
    this.title = title ?? null;
    this.description = description ?? null;
    this.media = media ?? [];
    this.statistics = new EmbedStatistics(statistics);
  }

  setKey(key: string): this {
    this.key = key;
    return this;
  }

  setLink(link: string): this {
    this.link = link;
    return this;
  }

  setText(text: string): this {
    this.text = text;
    return this;
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  addMedia(media: EmbedMedia | EmbedMediaObject): this {
    this.media.push(
      media instanceof EmbedMediaObject ? media.getMedia() : media,
    );
    return this;
  }

  setMedia(media: (EmbedMedia | EmbedMediaObject)[]): this {
    this.media = media.map((m) =>
      m instanceof EmbedMediaObject ? m.toJSON() : m,
    );
    return this;
  }

  setStatistics(statistics: EmbedStatistics): this {
    this.statistics = statistics;
    return this;
  }

  toJSON(): EmbedFetchContent {
    return structuredClone({
      key: this.key,
      link: this.link,
      text: this.text,
      title: this.title,
      description: this.description,
      media: this.media.map((m) => new EmbedMediaObject(m).toJSON()),
      statistics: this.statistics.toJSON(),
    });
  }
}
