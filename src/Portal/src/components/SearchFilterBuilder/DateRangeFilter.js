
import React , { Fragment, PureComponent } from 'react';
import FilterComponent from './FilterComponent.js'
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
    errorClass: {
        color: 'red'
    },
    datePicker: {
        margin: '0 10px 22px 0'
    }
});

@withStyles(styles)

export default class DateRangeFilter extends FilterComponent {

    constructor(props){
        super(props);
        this.state = {
            value : {
                startDate: this.props.value?this.props.value.startDate:null,
                endDate: this.props.value?this.props.value.endDate:null
            },
            errors: {}
        };
        
        this.onChangeValue = this.onChangeValue.bind(this);
    }
    
    componentDidMount() {
        this.props.onRef(this);
    }
    
    render(){     

        const { startDate, endDate } = this.state.value;
        const {classes} = this.props;
        
        return (
            <Fragment>
                <div className={classes.errorClass}>{this.state.errors.date}</div>
                  <div className={classes.datePicker}>
                    <DatePicker
                      label={this.props.starDatelabel}
                      maxDateMessage={this.props.starMaxDateMessage}
                      value={startDate}
                      format="DD/MM/YYYY"
                      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      onChange={e => this.onChangeValue(e, 'startDate')}
                      disablePast={true}
                      fullWidth={true}
                      autoOk={true}
                      animateYearScrolling
                    />
                  </div>
                  <div className={classes.datePicker}>
                    <DatePicker
                      label={this.props.endDatelabel}
                      maxDateMessage={this.props.endMaxDateMessage}
                      value={endDate}
                      format="DD/MM/YYYY"
                      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      onChange={e => this.onChangeValue(e, 'endDate')}
                      minDate={startDate}
                      disablePast={false}
                      fullWidth={true}
                      autoOk={true}
                      animateYearScrolling
                    />
                  </div>
            </Fragment>
        );
    }

    onChangeValue(date, dateName){        
        let { value } = this.state;
        value[dateName] = date;        
        this.setState({value});
    }

    getFilterValue(){
        return this.state.value;
    }

    isValid(){
        return this.state.value.startDate!=null && this.state.value.endDate!=null;
    }
}