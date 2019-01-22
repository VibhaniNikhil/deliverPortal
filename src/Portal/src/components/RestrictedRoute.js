import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'

class RestrictedRoute extends Component{
    render(){
        const { component: Component, roles, ...rest } = this.props;
        return <Route {...rest} render={(props) => 
            {
                if (!this.props.isLoggedIn){
                    return <Redirect to='/signin' />;
                }
                else if (
                    props.requiredRoles && 
                    props.requiredRoles.length !== 0 &&
                    !props.requiredRoles.every(x => auth.roles.find(r => r === x) != null)){
                        return <Redirect to='/accessdefined' />;
                }
                else{
                    return <Component {...props} />;
                }
            }} />;
    }
}

RestrictedRoute.propTypes = {
    component: PropTypes.element.isRequired,
    requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

RestrictedRoute.defaultProps = {
    requiredRoles: [],
};

const mapStateToProps = ({ auth }) => {
    const { roles, isLoggedIn } = auth;
    return { roles, isLoggedIn }
};
export default connect(mapStateToProps)(RestrictedRoute);