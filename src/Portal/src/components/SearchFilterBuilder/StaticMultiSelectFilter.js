
import React from 'react';
import FilterComponent from './FilterComponent.js'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class StaticMultiSelectFilter extends FilterComponent {
    
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value?this.props.value:[]
        };
        
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onRenderCheckBox = this.onRenderCheckBox.bind(this);
    }
    
    componentDidMount() {
        const { value } = this.state;
        
        this.props.children.map(x => {
            let index = value.find(f => f.name === x.props.name);
            let obj = {name: x.props.name, displayName: x.props.displayName, value: x.props.name, isChecked: x.props.isChecked};
            if(!index) {
                value.push(obj);
            }
        })
        
        this.setState({value});
        this.props.onRef(this);
    }
    
    render(){

        return (
            <div>
                {this.onRenderCheckBox()}
            </div>
        );
    }
    
    onRenderCheckBox() {
        return (this.state.value.map(x => { return (
                <FormControlLabel
                    key={x.name}
                    control={
                    <Checkbox
                        checked={x.isChecked}
                        onChange={(e) => this.onChangeValue(x.name, e)}
                        value={x.name}
                        color="primary"
                    />
                    }
                    label={x.displayName}
                />)
            }));
    }

    onChangeValue = (name, event) => {        
        let {value} = this.state;
        let index = value.findIndex(x => x.name === name);
        value[index].isChecked = event.target.checked;
        this.setState({value: value});
    }
    
    getFilterValue(){
        return this.state.value;
    }

    isValid(){
        return this.state.value.filter(x=>x.isChecked === true).length != 0;
    }
}