
import React from 'react'
import FilterComponent from './FilterComponent.js'
import TextField from '@material-ui/core/TextField';
import Autocomplete from 'react-google-autocomplete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme =>({
    root: {
        width: '100%', 
        padding: 10,
        paddingRight: 43
    },
    closeIcon: {
        position: 'absolute',
        float: 'right',        
        color: '#ababab',
        right: 43,
        top: 83,
        cursor: 'pointer',        
    }
});

@withStyles(styles)
export default class AddressFilter extends FilterComponent {
    
    constructor(props) {
        super(props);
        this.state = this.props.value?this.props.value : {
            address : '',
            lat: '',
            lng: ''
        }

        this.onPlaceSelect = this.onPlaceSelect.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onClearAddres = this.onClearAddres.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    
    render() {
        return (
            <div>               
                <Autocomplete
                    className={this.props.classes.root}                    
                    onChange={this.onChangeValue}
                    name="address"
                    autocomplete="onChange"
                    value={this.state.address}
                    onPlaceSelected={this.onPlaceSelect}
                    types={['(regions)']}
                />
                {this.state.address && <CloseIcon className={this.props.classes.closeIcon} onClick={this.onClearAddres}/>}
            </div>
        );
    }
    
    onPlaceSelect(place) {
      let address = place.formatted_address;
      let lat = place.geometry.location.lat()
      let lng = place.geometry.location.lng()
      
      this.setState({lat, lng, address});
    }
    
    onChangeValue(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    onClearAddres() {
        this.setState({
            address : '',
            lat: '',
            lng: ''    
        })
    }

    getFilterValue(){
        return this.state;
    }
    
    isValid(){
        return this.state.lat!='' && this.state.lng!='' && this.state.address!='';
    }
}


AddressFilter.propTypes = {
    classes: PropTypes.object.isRequired
}