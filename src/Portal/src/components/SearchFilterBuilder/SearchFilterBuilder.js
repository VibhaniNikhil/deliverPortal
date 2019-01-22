import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ChipTag from './ChipTag';
import Popover from '@material-ui/core/Popover';
import 'styles/search-filter-builder/css/style.css';
import { withStyles } from '@material-ui/core/styles';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import Styles from 'styles/search-filter-builder/js/searchFilterBuilderStyle';



class SearchBuildFilter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      filters: [ ],
      filterTypePopup: {
        open: false,
        filterName: null,
        anchorEl: null
      },
      filterPopup : {
        open: false,
        anchorEl: null
      }
    }
  }
  
  static propTypes = {
    onFilterChange: PropTypes.func
  }
  
  onRef(value){
    this.filterRef = value;
  }

  addFilter(name){

    const {filterPopup, filterTypePopup, filters} = this.state;
    
    // Find the filter in state, if the filter does not exist then
    // add it to the filter state collection.
    var filter = this.props.children.find(x => x.props.name === name);
    var filterState = this.state.filters.find(x => x.name === name);
    
    if (!filterState){
      filterState = { name: name, type: filter.type.name };      
      filters.push(filterState);
    }
    
    // hide the filter select popup, show the filter type popup, and set
    // the active filter to the one that was selected.
    filterPopup.open = false;
    setTimeout(() => {
      filterTypePopup.open = true;
      filterTypePopup.filterName = filterState.name;
      filterTypePopup.anchorEl = document.getElementById(name);
      this.setState({ filterTypePopup});
    })
    
    this.setState({ filterTypePopup, filterPopup, filters });
  }
  
  removeFilter(name){
    const { filterPopup, filterTypePopup, filters } = this.state;
    
    var filterIndex = filters.findIndex(x => x.name === name);
    var newFilters = filters.splice(filterIndex, 1);    
    
    filterTypePopup.filterName = null;
    filterTypePopup.open = false;
    filterPopup.open = false;
    
    this.setState({ filterTypePopup, filterPopup, newFilters });
    this.raiseFilterChanged();
  }
  
  applyFilter(){
    const { filterTypePopup, filters } = this.state;
    
    var filter = this.filterRef;    
    
    if (!filter.isValid()){
      return;
    }
    
    var filterState = filters.find(x => x.name === filter.props.name);
    filterTypePopup.filterName = null;
    filterTypePopup.open = false;
    filterState.value = filter.getFilterValue();
    this.setState({ filterTypePopup });
    
    this.raiseFilterChanged();
  }
  
  raiseFilterChanged(){
    const { filters } = this.state;
    
    if (!this.props.onFilterChange){
      return;
    }

    var data = {
      component: this,
      items: filters
    };

    this.props.onFilterChange(data);
  }

  showFilterTypeSelectPopup(name, popupAnchor){
    const { filterTypePopup, filterPopup, filters } = this.state;
    var filter = filters.find(f => f.name === name);
    if (!filter){
      filter = { name: name }
      filters.push(filter);
    }

    filterPopup.open = false;
    filterTypePopup.open = true;
    filterTypePopup.filterName = name;
    filterTypePopup.anchorEl = document.getElementById(name);

    this.setState({ filterTypePopup, filterPopup });
  }

  showFilterSelectPopup(popupAnchor){
    const { filterTypePopup, filterPopup } = this.state;

    filterTypePopup.open = false;
    filterPopup.open = true;
    filterPopup.anchorEl = popupAnchor;

    this.setState({ filterTypePopup, filterPopup });
  }

  onClickChip(name, event){
    this.showFilterTypeSelectPopup(name, event.currentTarget);
  }

  onClickChipDelete(name, event){
    this.removeFilter(name);
  }

  onClickFilterFieldAdd(name, event){
    this.addFilter(name);
  }

  onCloseFilterPopup(){
    const { filterTypePopup } = this.state;

    filterTypePopup.open = false;
    filterTypePopup.anchorEl = null;
    filterTypePopup.filterName = null;

    this.setState({ filterTypePopup });
  }

  onClickApplyFilter(name, event){
    this.applyFilter();
  }

  onClickRemoveFilter(name, event){
    this.removeFilter(name);
  }

  onClickFilterSelect(event){
    this.showFilterSelectPopup(event.currentTarget);
  }

  onCloseFilterSelectPopup(){
    const { filterPopup } = this.state;

    filterPopup.open = false;
    filterPopup.anchorEl = null;

    this.setState({ filterPopup });
  }

  renderFilterSearchTag(){
    return this.state.filters.map(x => {
      var filter = this.props.children.find(f => f.props.name === x.name);
      return <ChipTag 
        id={filter.props.name}
        key={filter.props.name}
        label={filter.props.displayName}
        onClick={this.onClickChip.bind(this, filter.props.name )}
        onDelete={this.onClickChipDelete.bind(this, filter.props.name )} />
    },
    this);
  }

  renderFilterPopupButtons = () => {
    return this.props.children.map((filter) =>{
      var filterState = this.state.filters[filter.props.name];
      if (filterState){
        return null;
      }      

      return <Button variant="outlined" key={filter.props.name} className={this.props.classes.button}
        onClick={this.onClickFilterFieldAdd.bind(this, filter.props.name)}>{filter.props.displayName}</Button>
  
    });
  }

  renderPopupBody(){
    const { filterTypePopup, filters } = this.state;
    var filter = null;
    
    if (!filterTypePopup.open){
      return;
    }
    
    // Need to get a reference to the filter control so can later call getValue and validate. 
    // Also need to set the currently selected value. Use the clone api to replace create a copy,
    // set the immutable value prop and get reference.
    var filterState = filters.find(x => x.name === filterTypePopup.filterName);
    
    filter = this.props.children.find(x => x.props.name === filterTypePopup.filterName);
    let staticMultiSelect = filter.props.displayTitle === 'StaticMultiSelect';
    
    return (
      <div>
        <p className={this.props.classes.filterByLabel}>{filter.props.displayTitle}</p>
        {React.cloneElement(filter, { onRef: this.onRef.bind(this), value: filterState ? filterState.value : null})}
        <div>
          <Button variant="contained" className={this.props.classes.applyFilterButton} onClick={this.onClickApplyFilter.bind(this, filter.props.name)}>Apply</Button>
          <Button className={this.props.classes.removeFilterButton} onClick={this.onClickRemoveFilter.bind(this, filter.props.name)}>Remove Filter</Button>
        </div>
      </div>
    )
  }

  render() {

    const { filterTypePopup, filterPopup } = this.state;
    
    const { classes } = this.props;
    
    return (
      <div >
        {/* Render the filter select dropdown and filter popup */}
        <Button variant="outlined" className={classes.button} onClick={this.onClickFilterSelect.bind(this)}>Filter <UnfoldMore className={classes.rightIcon} /></Button>

        {/* Render the active filters */}
        {this.renderFilterSearchTag()}
        <Popover
          id="simple-popper"
          open={filterPopup.open}
          anchorEl={filterPopup.anchorEl}
          onClose={this.onCloseFilterSelectPopup.bind(this)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          >
            <div className={classes.popoverContaint}>
              <p className={this.props.classes.filterByLabel}>Filter by</p>
              {this.renderFilterPopupButtons()}
            </div>
            
        </Popover>
        
        {/* The popover for editing the filter value.  */}
        <Popover
          open={filterTypePopup.open}
          anchorEl={filterTypePopup.anchorEl}
          onClose={this.onCloseFilterPopup.bind(this)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          className={classes.tagPopover}
          >
              <div className={classes.popoverContaint}>
                  { this.renderPopupBody() }
              </div>
            
          </Popover>
      </div>
    );
  }
}

SearchBuildFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(SearchBuildFilter);