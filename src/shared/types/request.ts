import { Request } from 'express';

export type Req<T> = Request<Record<string, unknown>, Record<string, unknown>, T>;
