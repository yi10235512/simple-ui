import { strFromU8, strToU8, zlibSync } from 'fflate';

export function utoa(data) {
    const buffer = strToU8(data);
    const zipped = zlibSync(buffer, { level: 9 });
    const binary = strFromU8(zipped, true);
    return btoa(binary);
}

