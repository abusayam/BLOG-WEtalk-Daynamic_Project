const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const playgroundRoute = require('../playground/Play')

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/playground',
        handler: playgroundRoute
    },
    {
        path: '/',
        handler: (req, res, next) => {
   
            res.json({
                massage:' hello world'
            })
        }
    }
]


module.exports = app => {
    routes.forEach(r =>{
       if (r.path === '/') {
            app.get(r.path, r.handler)
       }else {
            app.use(r.path, r.handler)
       }
    })
}