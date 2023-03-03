
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import Profile from '../pages/Profile'
import VerifyAccount from '../pages/VerifyAccount'
import ResetPassword from '../pages/ForgotPassword/ResetPassword'
import CreatePost from '../pages/CreatePost'
import SearchResults from '../pages/SearchResults'
import AddPlace from '../pages/AddPlace'


const routesData = {
    publicRoutes: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
        },
        {
            path: '/verify-account',
            element: <VerifyAccount />
        }],
    privateRoutes: [
        {
            path: '/profile',
            element: <Profile />
        },
        {
            path: '/create-post',
            element: <CreatePost />
        },
        {
            path: '/search-results',
            element: <SearchResults />
        },
        {
            path: '/add-place',
            element: <AddPlace />
        }
    ],

}

export default routesData