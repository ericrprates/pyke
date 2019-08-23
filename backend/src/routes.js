const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const authAdminMiddleware = require('./middlewares/auth')
const authUserMiddleware = require('./middlewares/authUser')

const PostController = require('./controllers/PostController')
const DisciplineController = require('./controllers/DisciplineController')
const TeacherController = require('./controllers/TeacherController')
const ClassController = require('./controllers/ClassController')
const SemesterController = require('./controllers/SemesterController')
const UserController = require('./controllers/UserController')
//USER AUTH
routes.post('/register', UserController.register)
routes.post('/authenticate', UserController.authenticate)

//POSTS
routes.get('/posts', PostController.index)
routes.get('/posts/:id/download', PostController.downloadFiles)

routes.use(authUserMiddleware)
routes.post('/posts', multer(multerConfig).array('files[]'), PostController.create)
routes.post('/posts/:id/like', PostController.like)
routes.post('/posts/:id/unlike', PostController.unlike)
routes.get('/posts/byUser', PostController.byUser)
routes.delete('/posts/:id', PostController.delete)

module.exports = routes
