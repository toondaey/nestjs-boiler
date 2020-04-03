import { join } from "path";
import { unlinkSync } from "fs";
import { fileSync } from "find";
import { v4 as uuid } from "uuid";

const postfix = 'test.sqlite';

/**
 * Delete database file.
 * @param path Database path.
 */
function _deleteFile(path: string) {
    unlinkSync(path);
}

/**
 * Create a new database name.
 * @param name Database file name.
 * @returns {string}
 */
export function createDbName(name?: string): string {
    return `${name || uuid().replace(/-/g, '')}-${postfix}`;
};

/**
 * Delete current database.
 * @param {string} name Database name.
 */
export function deleteDb(name?: string) {
    if (name) {
        return _deleteFile(join(process.cwd(), name));
    }

    const tesDbs = fileSync(new RegExp(`${postfix}$`), process.cwd());

    for (const db of tesDbs) {
        _deleteFile(db);
    }
}

