
const ImageSizeNameMap = {
    master: 1024,
    large: 640,
    medium: 320,
    small: 180,
    square: 90,
}

export type ImageSizeName = 'master' | 'large' | 'medium' | 'small' | 'square';

export function getImageSizeNames() {
    return ['master', 'large', 'medium', 'small', 'square'];
}

export function getImageMasterSizeName(): ImageSizeName {
    return 'master';
}

export function getImageSizeByName(name: ImageSizeName) {
    const size = ImageSizeNameMap[name];
    if (!size) {
        throw new Error(`Invalid image size name: ${name}`);
    }
    return size;
}
