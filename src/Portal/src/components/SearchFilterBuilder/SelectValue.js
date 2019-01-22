import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectValue extends Component {
    constructor(name, displayName, value, isChecked){
        super();
        this.name = name;
        this.displayName = displayName;
        this.value = value;
        this.isChecked = isChecked;
    }

    static propTypes = {
        name: PropTypes.string,
        displayName: PropTypes.string,
        value: PropTypes.string,
        isChecked: PropTypes.bool
    }
}