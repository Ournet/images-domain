import { EntityValidator, Joi } from "@ournet/domain";
import { Image, IMAGE_FORMAT_INFO } from "./image";

export const IMAGE_MIN_WIDTH = 450;
export const IMAGE_MIN_HEIGHT = 450;

export class ImageValidator extends EntityValidator<Image> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[a-zA-Z0-9]{16,32}-[a-z0-9]{6}-[0-9]{3}[jp]$/),

    hash: Joi.string().regex(/^[a-zA-Z0-9]{16,32}$/),
    hosts: Joi.array().items(Joi.string().trim().min(4).max(100)).min(1).max(100),

    width: Joi.number().integer().min(IMAGE_MIN_WIDTH).max(10000),
    height: Joi.number().integer().min(IMAGE_MIN_HEIGHT).max(10000),
    length: Joi.number().integer().min(200),
    format: Joi.string().valid(IMAGE_FORMAT_INFO.map(item => item.format)),

    color: Joi.string().lowercase().hex().length(6),

    updatedAt: Joi.string().isoDate(),
    createdAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp().raw(),
};

const createSchema = Joi.object().keys({
    id: schema.id.required(),

    hash: schema.hash.required(),
    hosts: schema.hosts.required(),

    width: schema.width.required(),
    height: schema.height.required(),
    length: schema.length.required(),
    format: schema.format.required(),

    color: schema.color.required(),

    updatedAt: schema.updatedAt,
    createdAt: schema.createdAt.required(),
    expiresAt: schema.expiresAt.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        hosts: schema.hosts,

        width: schema.width,
        height: schema.height,
        length: schema.length,

        updatedAt: schema.updatedAt,
        expiresAt: schema.expiresAt,
    }).required(),
}).required();
