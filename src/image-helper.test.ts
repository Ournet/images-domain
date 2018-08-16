
import test from 'ava';
import { ImageHelper } from './image-helper';
import { BuildImageParams } from './image';


test('build', t => {
    const data: BuildImageParams = {
        host: 'www.protv.md',
        hash: 'tf4345645f45f63f45',
        format: 'jpg',
        height: 500,
        width: 800,
        length: 23232
    };

    const image = ImageHelper.build(data);

    t.is(image.id, `${data.hash}-160j`);
    t.is(image.hosts[0], 'protv.md');
})
