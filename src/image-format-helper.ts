import {
    ImageFormat,
    IMAGE_FORMAT_INFO_BY_EXTENSION,
    IMAGE_FORMAT_INFO_BY_FORMAT,
    IMAGE_FORMAT_INFO_BY_ID,
    IMAGE_FORMAT_INFO_BY_MIME,
} from "./image";

export class ImageFormatHelper {
    static getFormatByExtension(ext: string): ImageFormat {
        ext = ext && ext.trim().toLowerCase();
        const info = IMAGE_FORMAT_INFO_BY_EXTENSION[ext];
        if (!info) {
            throw new Error(`Invalid image extension: ${ext}`);
        }
        return info.format;
    }

    static getFormatByMime(mime: string): ImageFormat {
        mime = mime && mime.trim().toLowerCase();
        const info = IMAGE_FORMAT_INFO_BY_MIME[mime];
        if (!info) {
            throw new Error(`Invalid image mime: ${mime}`);
        }
        return info.format;
    }

    static getMimeByFormat(format: ImageFormat) {
        const info = IMAGE_FORMAT_INFO_BY_FORMAT[format];
        if (!info) {
            throw new Error(`Invalid image format: ${format}`);
        }
        return info.mimes[0];
    }

    static getIdByFormat(format: ImageFormat) {
        const info = IMAGE_FORMAT_INFO_BY_FORMAT[format];
        if (!info) {
            throw new Error(`Invalid image format: ${format}`);
        }
        return info.id;
    }

    static getFormatById(id: string) {
        if (id.length > 1) {
            id = id.substr(id.length - 1, 1);
        }
        const info = IMAGE_FORMAT_INFO_BY_ID[id];
        if (!info) {
            throw new Error(`Invalid image id: ${id}`);
        }
        return info.format;
    }
}
