/// <reference types="node" resolution-mode="require"/>
import { PathLike } from 'node:fs';
export declare class Writer {
    #private;
    constructor(filename: PathLike);
    write(data: string): Promise<void>;
}
