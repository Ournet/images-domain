import { BuildImageParams, Image } from "./image";
import { ImageHelper } from "./image-helper";
import { ImageRepository } from "./image-repository";
import { uniq, RepositoryUpdateData } from "@ournet/domain";

export class SaveImageUseCase {
    constructor(private imageRep: ImageRepository) { }

    async execure(params: BuildImageParams): Promise<Image> {
        const newImage = ImageHelper.build(params);
        const id = newImage.id;

        const existingImage = await this.imageRep.getById(id);

        if (!existingImage) {
            return this.imageRep.create(newImage);
        }

        const hosts = uniq(existingImage.hosts.concat(newImage.hosts));

        const updateData: RepositoryUpdateData<Image> = {
            id,
            set: {
                updatedAt: new Date().toISOString(),
                expiresAt: newImage.expiresAt,
                hosts,
            }
        };

        return this.imageRep.update(updateData);
    }
}
