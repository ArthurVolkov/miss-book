import bookApp from './pages/book-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import bookDetails from './pages/book-details.cmp.js'
import bookAbout from './pages/book-about.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/about',
        component: bookAbout
    },
]

export const myRouter = new VueRouter({routes})