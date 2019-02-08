/**
 * App routes
 * all react components relevant for router are imported
 */

import HomePage from '../page/Home'
import ErrorPage from '../page/Error'

import Les1 from '../page/Les1'
import Les2 from '../page/Les2'
import Les3 from '../page/Les3'
import Les4 from '../page/Les4'
import Les5 from '../page/Les5'
import Les6 from '../page/Les6'

/**
 * Routes
 * @param {Array} route: Array of objects
 * @param {String} route.path: use in Route component of react-router-dom
 * @param {String} route.type: used to decide what router prop to use
 * @param {String} route.label: used to create Link, if not provided item is not used as link
 * @param {Object} route.component: reference to React component to load
 * @param {Object} route.props: props to spread in Route component of react-router-dom
 */
const routes = [
  {
    path: '/',
    to: '/home',
    type: 'redirect',
    props: { exact: true }
  },
  {
    path: '/home',
    component: HomePage,
    label: 'Home',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/les1',
    component: Les1,
    label: 'Les 1',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/les2',
    component: Les2,
    label: 'Les 2',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/les3',
    component: Les3,
    label: 'Les 3',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/les4',
    component: Les4,
    label: 'Les 4',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/les5',
    component: Les5,
    label: 'Les 5',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/les6',
    component: Les6,
    label: 'Les 6',
    type: 'component',
    props: { exact: true }
  },
  {
    path: '/error/:id',
    component: ErrorPage,
    props: { exact: true },
    type: 'component'
  },
  { path: '', to: '/error/404', type: 'redirect' }
]

export default routes
