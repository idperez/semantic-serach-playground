import { connect } from '@planetscale/database'
import { v4 as uuidv4 } from 'uuid';

function generateUUID(): string {
    return uuidv4();
}

function planetScaleConnection() {
    const config = {
        host: process.env.PLANET_SCALE_HOST,
        username: process.env.PLANET_SCALE_USERNAME,
        password: process.env.PLANET_SCALE_PASSWORD
    }

    return connect(config);
}

export async function addVector(name: string, body: string): Promise<string> {
    const id = generateUUID();
    const connection = planetScaleConnection();
    await connection.execute('INSERT INTO vectors (name, body, uuid) VALUES (?, ?)', [name, body, id]);
    return id;
}
