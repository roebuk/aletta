import React from 'react'
import { Route, Switch } from 'react-router'

import AsyncRoute from '../AsyncRoute/AsyncRoute'

import posts from '../../../blog-posts.json'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={props => <AsyncRoute props={Object.assign({}, props, posts)} loadingPromise={System.import('../Home/Home')} />} />
    <Route path='/about' component={props => <AsyncRoute props={props} loadingPromise={System.import('../About/About')} />} />
    <Route path='/post/:slug' component={props => {
      const post = posts.posts.filter(post => props.match.params.slug === post.slug)
      return <AsyncRoute props={Object.assign({}, props, {post: post[0]})} loadingPromise={System.import('../PostDetail/PostDetail')} />
    }} />
    <Route component={props => <AsyncRoute props={props} loadingPromise={System.import('../NotFound/NotFound')} />} />
  </Switch>
)

export default Routes
