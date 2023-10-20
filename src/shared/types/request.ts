import { Request } from 'express';

export type Req<T, Params = Record<string, unknown>> = Request<Params, Record<string, unknown>, T>;
