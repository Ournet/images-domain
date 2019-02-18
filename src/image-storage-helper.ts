import { ImageHelper } from "./image-helper";
import { ImageSizeName } from "./image-sizes";
import { ImageFormatHelper } from "./image-format-helper";
import { ImageFormat } from "./image";

const NEWS_HOST = '//news.ournetcdn.net';

export class ImageStorageHelper {
    static formatImageKeyFromId(id: string, size: ImageSizeName = 'master') {
        const format = ImageHelper.parseImageIdFormat(id);
        return `${ImageStorageHelper.formatImagekeyPrefix(id)}/${size}/${id}.${format}`;
    }

    static formatImagekeyPrefix(id: string) {
        return id.substr(0, 3).toLowerCase();
    }

    static url(id: string, size: ImageSizeName, folder: 'news' | 'events', format?: ImageFormat, host: string = NEWS_HOST) {
        format = format || ImageFormatHelper.getFormatById(id);
        return host + '/' + folder + '/' + ImageStorageHelper.formatImagekeyPrefix(id) + '/' + size + '/' + id + '.' + format;
    }

    static newsUrl(id: string, size: ImageSizeName, format?: ImageFormat) {
        return ImageStorageHelper.url(id, size, 'news', format);
    }

    static eventUrl(id: string, size: ImageSizeName, format?: ImageFormat) {
        return ImageStorageHelper.url(id, size, 'events', format);
    }

    static quoteUrl(id: string, format: ImageFormat = 'jpg', host: string = NEWS_HOST) {
        return host + '/quote/' + id + '.' + format;
    }
}
