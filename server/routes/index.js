// const router = 'koa-router'
import company  from './company'
const router = require('koa-router')
const Router = router()


export default (app) => {
    Router.use('/company',company.routes(),company.allowedMethods())
    app.use(Router.routes())
}