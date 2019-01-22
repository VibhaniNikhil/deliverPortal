import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilterComponent extends Component {
    constructor(props){
        super(props);
        if (this.constructor === FilterComponent) {
            throw new Error('Cannot instantiate Filter component directly.'); 
        }
    }

    static propTypes = {
        name: PropTypes.string,
        displayName: PropTypes.string,
        value: PropTypes.any
    }

    getFilterValue(){
        throw new Error('getFilterValue is not implemented.');
    }
    
    isValid(){
        throw new Error('isValid is not implemented.');
    }

    render(){
        throw new Error('render is not implemented.');
        return null;
    }
}