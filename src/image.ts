export type ImageFormat = 'jpg' | 'png';
export type ImageOrientation = 'PORTRAIT' | 'LANGSCAPE';

export interface Image {
    id: string

    hash: string
    hosts: string[]

    width: number
    height: number
    length: number
    format: ImageFormat

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

    createdAt?: string
    expiresAt?: number
}
