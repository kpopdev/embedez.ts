"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedContent = exports.EmbedUser = exports.EmbedStatistics = exports.MediaObject = exports.EmbedMediaObject = exports.EmbedFetchObject = exports.shouldCors = void 0;
exports.shouldCors = ["instagram", "twitter", "ifunny", "imgur", "bilibili"];
class EmbedFetchObject {
    constructor({ type, key, user, content, }) {
        this.type = type;
        this.key = key;
        this.user = new EmbedUser(user);
        this.content = new EmbedContent(content);
        return this;
    }
    toJSON() {
        if (!this.key)
            throw new Error("Key is required");
        return {
            type: this.type,
            key: this.key,
            user: this.user.toJSON(),
            content: this.content.toJSON(),
        };
    }
    getPreview() {
        var _a, _b, _c, _d;
        const data = this.toJSON();
        const content = data.content;
        const img = ((_a = content.media.find(({ type }) => type == "video")) === null || _a === void 0 ? void 0 : _a.thumbnail) ||
            ((_b = content.media.find(({ type }) => type == "photo")) === null || _b === void 0 ? void 0 : _b.thumbnail) ||
            ((_c = content.media.find(({ type }) => type == "gif")) === null || _c === void 0 ? void 0 : _c.thumbnail);
        delete data.content;
        return Object.assign(Object.assign({}, data), { preview: {
                text: ((_d = content.description) === null || _d === void 0 ? void 0 : _d.slice(0, 50)) || "",
                img: img,
            } });
    }
}
exports.EmbedFetchObject = EmbedFetchObject;
class EmbedMediaObject {
    constructor({ type, source, thumbnail, duration, height, width, } = {}) {
        this.media = {
            type: type !== null && type !== void 0 ? type : "video", // Default value
            source: source !== null && source !== void 0 ? source : new MediaObject(),
            thumbnail: thumbnail !== null && thumbnail !== void 0 ? thumbnail : undefined,
            duration: duration !== null && duration !== void 0 ? duration : null,
            height: height !== null && height !== void 0 ? height : 0,
            width: width !== null && width !== void 0 ? width : 0,
        };
    }
    setType(type) {
        this.media.type = type;
        return this;
    }
    setUrl(url) {
        this.media.source = new MediaObject(url);
        return this;
    }
    setTitle(title) {
        this.media.title = title;
        return this;
    }
    setThumbnail(thumbnail) {
        this.media.thumbnail = new MediaObject(thumbnail);
        return this;
    }
    setDurationInSeconds(duration) {
        this.media.duration = duration;
        return this;
    }
    setSize(height, width) {
        this.media.height = height;
        this.media.width = width;
        return this;
    }
    getUrl(props) {
        return new MediaObject(this.media.source).getUrl(props);
    }
    getThumbnail(props) {
        return new MediaObject(this.media.thumbnail).getUrl(props);
    }
    getMedia() {
        return this.media;
    }
    toJSON() {
        return Object.assign(Object.assign({}, this.media), { source: new MediaObject(this.media.source).toJSON(), thumbnail: this.media.thumbnail
                ? new MediaObject(this.media.thumbnail).toJSON()
                : undefined });
    }
}
exports.EmbedMediaObject = EmbedMediaObject;
class MediaObject {
    constructor(media) {
        if (!media)
            return;
        this.type = media.type;
        this.id = "id" in media ? media.id : undefined;
        this.url = "url" in media ? media.url : undefined;
        this.site = "site" in media ? media.site : undefined;
        this.headers = "headers" in media ? media.headers : undefined;
    }
    getUrl(props) {
        const { ignoreTemp, EZ_CDN_URL = process.env.EZ_CDN_URL, EZ_PROXY_URI = process.env.EZ_PROXY_URI } = props !== null && props !== void 0 ? props : {};
        if (this.id) {
            return `${EZ_CDN_URL}/view?id=${this.id}&ignoreTemp=${ignoreTemp}&type=${this.type}`;
        }
        if (this.url) {
            if ((this.site && exports.shouldCors.includes(this.site)) || this.headers) {
                const url = encodeURIComponent(this.url);
                const headers = encodeURIComponent(JSON.stringify(this.headers || {}));
                return `${EZ_PROXY_URI}/advanced?url=${url}&headers=${headers}`;
            }
            else {
                return this.url;
            }
        }
        return "";
    }
    toJSON() {
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
exports.MediaObject = MediaObject;
class EmbedStatistics {
    constructor({ shares, comments, follows, views, likes, } = {}) {
        this.shares = shares !== null && shares !== void 0 ? shares : 0;
        this.comments = comments !== null && comments !== void 0 ? comments : 0;
        this.follows = follows !== null && follows !== void 0 ? follows : 0;
        this.views = views !== null && views !== void 0 ? views : 0;
        this.likes = likes !== null && likes !== void 0 ? likes : 0;
    }
    setShares(shares) {
        this.shares = shares;
        return this;
    }
    setComments(comments) {
        this.comments = comments;
        return this;
    }
    setFollows(follows) {
        this.follows = follows;
        return this;
    }
    setViews(views) {
        this.views = views;
        return this;
    }
    setLikes(likes) {
        this.likes = likes;
        return this;
    }
    getStatistics() {
        return {
            shares: this.shares,
            comments: this.comments,
            follows: this.follows,
            views: this.views,
            likes: this.likes,
        };
    }
    toJSON() {
        return this.getStatistics();
    }
    toString() {
        return JSON.stringify(this.getStatistics());
    }
}
exports.EmbedStatistics = EmbedStatistics;
class EmbedUser {
    constructor({ name, displayName, region, followers, friends, pictures, } = {}) {
        this.name = name !== null && name !== void 0 ? name : null;
        this.displayName = displayName !== null && displayName !== void 0 ? displayName : null;
        this.region = region !== null && region !== void 0 ? region : null;
        this.followers = followers !== null && followers !== void 0 ? followers : null;
        this.friends = friends !== null && friends !== void 0 ? friends : null;
        this.pictures = pictures !== null && pictures !== void 0 ? pictures : {
            url: undefined,
            banner: undefined,
        };
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setDisplayName(displayName) {
        this.displayName = displayName;
        return this;
    }
    setRegion(region) {
        this.region = region;
        return this;
    }
    setFollowers(followers) {
        this.followers = followers;
        return this;
    }
    setFriends(friends) {
        this.friends = friends;
        return this;
    }
    setProfilePicture(url) {
        this.pictures.url = url;
        return this;
    }
    getProfilePicture() {
        if (!this.pictures.url)
            return undefined;
        const url = new MediaObject(this.pictures.url);
        return url.getUrl();
    }
    setBanner(banner) {
        this.pictures.banner = banner;
        return this;
    }
    toJSON() {
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
exports.EmbedUser = EmbedUser;
class EmbedContent {
    constructor({ key, link, text, title, description, media, statistics, postedDate, } = {}) {
        this.key = key !== null && key !== void 0 ? key : null;
        this.link = link !== null && link !== void 0 ? link : "";
        this.text = text !== null && text !== void 0 ? text : null;
        this.title = title !== null && title !== void 0 ? title : null;
        this.description = description !== null && description !== void 0 ? description : null;
        this.media = media !== null && media !== void 0 ? media : [];
        this.statistics = new EmbedStatistics(statistics);
        this.postedDate = postedDate !== null && postedDate !== void 0 ? postedDate : null;
    }
    setKey(key) {
        this.key = key;
        return this;
    }
    setLink(link) {
        this.link = link;
        return this;
    }
    setText(text) {
        this.text = text;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    addMedia(media) {
        this.media.push(media instanceof EmbedMediaObject ? media.getMedia() : media);
        return this;
    }
    setMedia(media) {
        this.media = media
            .map((m) => (m instanceof EmbedMediaObject ? m.toJSON() : m))
            .filter((m) => m !== undefined);
        return this;
    }
    setPostedDate(postedDate) {
        if (typeof postedDate === "string") {
            this.postedDate = new Date(postedDate).getTime();
            return this;
        }
        else if (typeof postedDate === "number") {
            this.postedDate = postedDate;
            return this;
        }
        else if (postedDate instanceof Date) {
            this.postedDate = postedDate.getTime();
            return this;
        }
        this.postedDate = null;
        return this;
    }
    setStatistics(statistics) {
        this.statistics = statistics;
        return this;
    }
    toJSON() {
        return structuredClone({
            key: this.key,
            link: this.link,
            text: this.text,
            title: this.title,
            description: this.description,
            postedDate: this.postedDate,
            media: this.media
                .map((m) => new EmbedMediaObject(m).toJSON())
                .filter((m) => m !== undefined),
            statistics: this.statistics.toJSON(),
        });
    }
}
exports.EmbedContent = EmbedContent;
//# sourceMappingURL=types.js.map