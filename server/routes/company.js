/**
 * Created by lichun on 2018/1/16.
 */
import company from '../models/company'
const Router = require('koa-router')
const router = Router()

//按照公司名字查询
router.all('/query_by_name',async (ctx) => {
    let name = ctx.query.name || ctx.request.body.name
    let pn = parseInt(ctx.query.pn || ctx.request.body.pn) || 0
    let ps = parseInt(ctx.query.ps || ctx.request.body.ps) || 20
    ctx.body = ctx.body = {
        code: 100,
        msg: 'ok',
        data: {
            list: await company.find({name: eval(`/${name}/`)}, {name: 1}).skip(pn * ps).limit(ps)
        }
    }


})
// 按照资质查询
router.all('/query_by_zizhi',async (ctx) => {
    let zizhi1 = ctx.query.zizhi1 || ctx.request.body.zizhi1 || /.*/
    let zizhi2 = ctx.query.zizhi2 || ctx.request.body.zizhi2 || /.*/
    let pn = parseInt(ctx.query.pn || ctx.request.body.pn) || 0
    let ps = parseInt(ctx.query.ps || ctx.request.body.ps) || 20
    ctx.body = {
        code: 100,
        msg: 'ok',
        data: {
            list: await company.find({$and: [{'zizhi.name': zizhi1}, {'zizhi.name': zizhi2}]}, {name: 1, zizhi: 0}).skip(pn*ps).limit(ps)
        }
    }



})

router.all('/query_by_cid',async (ctx) => {
    let cid = ctx.query.cid || ctx.request.body.cid
    ctx.body = {
        code: 100,
        msg: 'ok',
        data: {
            list: await company.find({_id: cid}, {name: 1})
        }
    }



})

export default router