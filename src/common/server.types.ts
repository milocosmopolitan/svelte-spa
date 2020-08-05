import type { IncomingMessage, ServerResponse } from 'http';
export type NextHandler = VoidFunction | Promise<void>;
export type RequestHandler = (req: IncomingMessage, res: ServerResponse, next?: NextHandler) => void;
