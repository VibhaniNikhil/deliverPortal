import React from 'react';
import FilterComponent from './FilterComponent.js'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 10
  }
});

@withStyles(styles)
class UserNameFilter extends FilterComponent {
    
    constructor(props){
        super(props);        
        this.state = {
            value : {
                firstName: this.props.value?this.props.value.firstName:'',
                lastName: this.props.value?this.props.value.lastName:''
            }
        };
    
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    
    render(){
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.container}>
                     <TextField
                      id="outlined-bare"
                      variant="outlined"
                      fullWidth={true}
                      name="firstName"
                      value={this.state.value.firstName} 
                      placeholder="First Name" 
                      onChange={this.onChangeValue}
                    />
                </div>
                <div className={classes.container}>
                    <TextField
                      id="outlined-bare"
                      variant="outlined"
                      fullWidth={true}
                      name="lastName"
                      value={this.state.value.lastName} 
                      placeholder="Last Name" 
                      onChange={this.onChangeValue}
                    />
                </div>
            </div>
        );
    }
    
    onChangeValue(event){
        let {value} = this.state;
        value[event.target.name] = event.target.value;
        this.setState({value});
    }
    
    getFilterValue(){
        return this.state.value;
    }
    
    isValid(){
        return this.state.value.firstName!='' && this.state.value.lastName!='';
    }
    
}

export default UserNameFilter;