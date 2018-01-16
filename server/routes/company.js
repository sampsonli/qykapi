/**
 * Created by lichun on 2018/1/16.
 */
import company from '../models/company'
const Router = require('koa-router')
const router = Router()

//后台管理
router.get('/list',async (ctx) => {
    ctx.body = await company.find().limit(1)
})

export default router