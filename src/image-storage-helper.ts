import { ImageHelper } from "./image-helper";
import { ImageSizeName } from "./image-sizes";

export class ImageStorageHelper {
    static formatImageKeyFromId(id: string, size: ImageSizeName = 'master') {
        const format = ImageHelper.parseImageIdFormat(id);
        return `${id.substr(0, 3).toLowerCase()}/${size}/${id}.${format}`;
    }
}
