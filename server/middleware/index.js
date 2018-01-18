import compose from 'koa-compose';
import convert from 'koa-convert';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';

export default function middleware() {
    return compose([
        logger(),
        helmet(), // reset HTTP headers (e.g. remove x-powered-by)
        convert(cors()),
        convert(bodyParser()),
        async (ctx, next) => {
            try {
                await next()
            } catch (e) {
                ctx.body = {
                    code: e.code || 500,
                    msg: e.message,
                    data: {}
                }
            }
        }
    ]);
}