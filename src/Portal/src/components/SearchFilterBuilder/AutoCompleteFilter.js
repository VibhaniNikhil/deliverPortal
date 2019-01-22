
import React from 'react'
import FilterComponent from './FilterComponent.js'
import Chips from 'react-chips'
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
    chipContent: {
        margin: '20px -3px'
    },
    chipTag: {
        margin: '0 10px 10px 0', borderRadius: 0
    }
});

@withStyles(styles)
export default class AutoCompleteFilter extends FilterComponent {

    constructor(props) {
        super(props);
        this.state = {
          chips: this.props.value ? this.props.value : [],
          suggestion: [],
          multiple : !this.props.multiple ? false : true
        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onDeleteChip = this.onDeleteChip.bind(this);
        this.onRenderChip = this.onRenderChip.bind(this);
    }
    
    componentDidMount() {
        const { chips, multiple } = this.state;
        const { suggestion } = this.props;
        let suggestionData = suggestion.filter(x=> multiple?(chips.find(f=> f === x) != x) : x!==chips);
        this.setState({suggestion: suggestionData});
        
        this.props.onRef(this);
    }

    render(){
        
        const { classes } = this.props;
        
        return (
            <div>
               <Chips
                  onChange={this.onChangeValue}
                  suggestions={this.state.suggestion}
                  id="chipTag"
                  placeholder={this.props.placeholder}
                />
                <div className={classes.chipContent}>
                    {this.onRenderChip()}
                </div>
            </div>
        );
    }

    onRenderChip() {
        const { multiple } = this.state;
        
        if(multiple) {
            return (
                this.state.chips.map(val => 
                    <Chip
                        key={val}
                        label={val}                                
                        onDelete={(e) => this.onDeleteChip(val)}
                        style={{margin: '0 10px 10px 0', borderRadius: 0}}
                    />
                )
            )
        } else {
            return (
                this.state.chips!='' && <Chip
                    label={this.state.chips}
                    onDelete={(e) => this.onDeleteChip(this.state.chips)}
                    style={{margin: '0 10px 10px 0', borderRadius: 0}}
                />
            )
        }
    }

    onDeleteChip(data) {
        const { chips, suggestion, multiple } = this.state;

        if(multiple) {
            const chipData = [...chips];
            const chipToDelete = chipData.indexOf(data);
            chips.splice(chipToDelete, 1);
            suggestion.push(data);
            this.setState({chips, data});
        } else {
            this.setState({chips: '', suggestion: this.props.suggestion});
        }

    }    

    onChangeValue(data){
        const { chips, suggestion, multiple } = this.state;

        if(multiple) {
            chips.push(data[0]);
            const suggestionData = [...suggestion];
            const suggestionToDelete = suggestionData.indexOf(data[0]);
            suggestion.splice(suggestionToDelete, 1);    
            this.setState({chips, suggestion});
        } else {
            const suggestionData = this.props.suggestion.filter(x=> x!==data[0]);
            this.setState({chips: data[0], suggestion: suggestionData});
        }        
    }

    getFilterValue(){
        return this.state.chips;
    }

    isValid(){
        return this.state.chips && this.state.chips.length != 0;
    }
}