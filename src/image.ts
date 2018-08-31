import { Dictionary } from "@ournet/domain";

export type ImageFormat = 'jpg' | 'png' | 'webp';
export type ImageOrientation = 'PORTRAIT' | 'LANGSCAPE';

export interface Image {
    id: string

    hash: string
    hosts: string[]

    width: number
    height: number
    length: number
    format: ImageFormat
    color: string

    createdAt: string
    updatedAt?: string
    expiresAt: number
}

export type ImageSize = {
    height: number
    width: number
}

export interface BuildImageParams {
    hash: string
    host: string

    width: number
    height: number
    length: number
    format: ImageFormat
    color: string

    createdAt?: string
    expiresAt?: number
}

export type ImageFormatInfo = {
    id: 'j' | 'p' | 'w',
    format: ImageFormat
    mimes: string[]
    extenstions: string[]
}

export const IMAGE_FORMAT_INFO: ImageFormatInfo[] = [
    { id: 'j', format: 'jpg', mimes: ['image/jpeg'], extenstions: ['jpeg', 'jpg'] },
    { id: 'p', format: 'png', mimes: ['image/png'], extenstions: ['png'] },
    { id: 'w', format: 'webp', mimes: ['image/webp'], extenstions: ['webp'] },
];

export const IMAGE_FORMAT_INFO_BY_ID: Dictionary<ImageFormatInfo>
    = IMAGE_FORMAT_INFO.reduce<Dictionary<ImageFormatInfo>>((dic, info) => {
        dic[info.id] = info;
        return dic;
    }, {});

export const IMAGE_FORMAT_INFO_BY_FORMAT: Dictionary<ImageFormatInfo>
    = IMAGE_FORMAT_INFO.reduce<Dictionary<ImageFormatInfo>>((dic, info) => {
        dic[info.format] = info;
        return dic;
    }, {});

export const IMAGE_FORMAT_INFO_BY_MIME: Dictionary<ImageFormatInfo>
    = IMAGE_FORMAT_INFO.reduce<Dictionary<ImageFormatInfo>>((dic, info) => {
        info.mimes.forEach(item => dic[item] = info);
        return dic;
    }, {});

export const IMAGE_FORMAT_INFO_BY_EXTENSION: Dictionary<ImageFormatInfo>
    = IMAGE_FORMAT_INFO.reduce<Dictionary<ImageFormatInfo>>((dic, info) => {
        info.extenstions.forEach(item => dic[item] = info);
        return dic;
    }, {});
