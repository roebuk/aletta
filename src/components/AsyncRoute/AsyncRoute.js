import React, { Component } from 'react'

class AsyncRoute extends Component {
  getInitialState () {
    return {
      loading: false
    }
  }
  componentDidMount () {
    this.props.loadingPromise.then(module => {
      this.component = module.default
      this.setState({loading: true})
    })
  }
  render () {
    if (this.state.loading) {
      return <this.component {...this.props.props} />
    } else {
      return <h2>Loading...</h2>
    }
  }
}

export default AsyncRoute
