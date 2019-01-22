
import React from 'react';
import FilterComponent from './FilterComponent.js'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default class StaticSelectFilter extends FilterComponent {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : ''
        };

        this.onChangeValue = this.onChangeValue.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    render(){
        return (
            <div>
                <FormLabel component="legend">{this.props.label}</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"                    
                    value={this.state.value}
                    onChange={this.onChangeValue}
                  >
                    {
                        this.props.children.map(f => 
                            <FormControlLabel key={f.props.name} value={f.props.value} control={<Radio color="primary"/>} label={f.props.displayName} />    
                        )
                    }                    
                  </RadioGroup>
            </div>
        );
    }

    onChangeValue= event => {        
        this.setState({value: event.target.value});
    }

    getFilterValue(){
        return this.state.value;
    }

    isValid(){
        return this.state.value && this.state.value.length != 0;
    }
}