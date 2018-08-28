export type ImageFormat = 'jpg' | 'png';
export type ImageOrientation = 'PORTRAIT' | 'LANGSCAPE';

export function getImageContentType(format: ImageFormat) {
    switch (format) {
        case 'jpg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
    }
    throw new Error(`Invalid image format: ${format}`);
}

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


