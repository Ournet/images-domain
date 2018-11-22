import { BuildImageParams, Image, ImageFormat, ImageSize, ImageOrientation } from "./image";
import { IMAGE_EXPIRE_DAYS } from "./config";
import { ImageFormatHelper } from "./image-format-helper";

export class ImageHelper {

    static build(params: BuildImageParams): Image {

        const id = ImageHelper.createId(params.hash, params.color, params.format, params);

        const createdAt = params.createdAt || new Date().toISOString();
        const expiresAt = ImageHelper.expiresAt(new Date(createdAt));

        let host = ImageHelper.formatImageHost(params.host, params.lang);

        const image: Image = {
            id,
            hash: params.hash,
            height: params.height,
            width: params.width,
            hosts: [host],
            length: params.length,
            format: params.format,
            color: params.color.trim().toLowerCase(),
            createdAt,
            expiresAt,
        };

        return image;
    }

    static formatImageHost(host: string, lang: string) {
        host = host.trim().toLowerCase();
        if (/^(www\d?|m|mobi)\./.test(host)) {
            host = host.substr(host.indexOf('.') + 1);
        }
        return `${host}-${lang.trim().toLowerCase()}`;
    }

    static createId(hash: string, color: string, format: ImageFormat, size: ImageSize) {
        const r = formatImageIdRatio(size);
        const idFormat = ImageFormatHelper.getIdByFormat(format);
        return `${hash.trim()}-${color.trim().toLowerCase()}-${r}${idFormat.trim()}`;
    }

    static parseImageIdFormat(id: string) {
        return ImageFormatHelper.getFormatById(id.substr(id.length - 1));
    }
    static parseImageIdRatio(id: string) {
        return parseImageIdRatio(id);
    }

    static parseImageOrientationFromId(id: string): ImageOrientation {
        const r = parseImageIdRatio(id);

        if (r[0] === '0') {
            return 'PORTRAIT'
        }
        return 'LANGSCAPE'
    }

    static expiresAt(refDate: Date) {
        const expiresAt = new Date(refDate);
        expiresAt.setDate(expiresAt.getDate() + IMAGE_EXPIRE_DAYS);

        return Math.floor(expiresAt.getTime() / 1000);
    }
}

function formatImageIdRatio(size: ImageSize) {
    const r = (size.width / size.height).toPrecision(2).replace('.', '');
    if (r.length === 3) {
        return r;
    }
    if (r.length === 2) {
        return r + '0';
    }
    if (r.length === 1) {
        return r + '00';
    }

    throw new Error(`Invalid image ration:${r}`);
}

function parseImageIdRatio(id: string) {
    const startIndex = id.lastIndexOf('-') + 1;

    return id.substr(startIndex, 3);
}
