/**
 * Created by lichun on 2017/11/15.
 */
import app from './server/index'
app.listen(process.env.PORT || 8081, ()=> {
    console.log('success')
})