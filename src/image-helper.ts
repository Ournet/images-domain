import { BuildImageParams, Image, ImageFormat, ImageSize, ImageOrientation } from "./image";
import { IMAGE_EXPIRE_DAYS } from "./config";

export class ImageHelper {

    static build(params: BuildImageParams): Image {

        const id = ImageHelper.createId(params.hash, params.format, params);

        const createdAt = params.createdAt || new Date().toISOString();
        const expiresAt = ImageHelper.expiresAt(new Date(createdAt));

        const image: Image = {
            id,
            hash: params.hash,
            height: params.height,
            width: params.width,
            hosts: [params.host.trim()],
            length: params.length,
            format: params.format,
            createdAt,
            expiresAt,
        };

        return image;
    }

    static createId(hash: string, format: ImageFormat, size: ImageSize) {
        const r = formatImageIdRatio(size);
        const idFormat = formatImageIdFormat(format);
        return `${hash.trim().toLowerCase()}-${r}${idFormat.trim()}`;
    }

    static parseImageIdFormat(id: string) {
        return parseImageIdFormat(id);
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

function formatImageIdFormat(format: ImageFormat) {
    switch (format) {
        case 'jpg': return 'j';
        case 'png': return 'p';
    }
    throw new Error(`Invalid image format: ${format}`);
}

function parseImageIdFormat(id: string): ImageFormat {
    const format = id.substr(id.length - 1);
    switch (format) {
        case 'j': return 'jpg';
        case 'p': return 'png';
    }
    throw new Error(`Invalid image format: ${format}`);
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
