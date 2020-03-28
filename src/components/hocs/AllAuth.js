import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default ChildComponent => {
  class AllAuth extends Component {

    render() {
      // const { isSignedIn}=true
      let { isSignedIn } = this.props;

      if (!isSignedIn) {
        isSignedIn = localStorage.getItem('usdt') ? true : false;
      }
      switch (isSignedIn) {
        case false:
          return <Redirect to="/login" />;
        case null:
          return <Loader spinning={false} />;
        default:
          return <ChildComponent {...this.props} />;
      }

    }
  }

  function mapStateToProps({ auth: { isSignedIn, roleid } }) {
    return { isSignedIn, roleid };
  }

  return connect(mapStateToProps)(AllAuth)
};