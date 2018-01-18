/**
 * Created by lichun on 2017/11/15.
 */
import Koa from 'koa';

import middleware from './middleware';
import routes from './routes';

import {connectDatabase} from './db'
connectDatabase('mongodb://localhost/xyjzfetch')

const app = new Koa();
app.use(middleware());

routes(app)

app.use(ctx => ctx.status = 404);

export default app;