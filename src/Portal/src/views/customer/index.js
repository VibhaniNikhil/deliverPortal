import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { SearchFilterBuilder, SelectValue, StaticMultiSelectFilter, UserNameFilter, 
    DateRangeFilter, StaticSelectFilter, AutoCompleteFilter,  AddressFilter } from 'components/SearchFilterBuilder/index';

// import {
//     Area,
//     AreaChart,
//     Bar,
//     BarChart,
//     Cell,
//     Line,
//     LineChart,
//     Pie,
//     PieChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis
// } from 'recharts';

// import MonthlyRevenue from 'components/dashboard/default/MonthlyRevenue';
// import { chartDataWithoutAxis, data2 } from 'app/routes/dashboard/routes/ECommerce/data'
// import ReportBox from 'components/ReportBox/index';
// import InfoCard from 'components/InfoCard';
// import InFoWithBgImage from 'components/InFoWithBgImage';
// import UserDetailCard from 'components/UserDetailCard';
// import SimpleToDo from 'components/ToDoCard/index';
// import ChartCard from 'components/dashboard/Common/ChartCard';
// import SiteVisitor from 'components/dashboard/Common/SiteVisitor';
// import CardBox from 'components/CardBox';
// import UserDetailTable from 'components/dashboard/Common/UserDetailTable';
// import UserProfileCard from 'components/dashboard/Common/userProfileCard/UserProfileCard';
// import MarketingTable from 'components/dashboard/Common/MarketingTable';
// import PhotoCollage from 'components/dashboard/Common/PhotoCollage/index';
// import LatestNotifications from 'components/dashboard/Common/LatestNotifications';
// import RecentActivities from 'components/dashboard/Common/RecentActivities/index';
// import ProjectsList from 'components/dashboard/Common/ProjectsList';
// import YourDailyFeed from 'components/dashboard/Common/DailyFeed/index';
// import TimerView from 'components/dashboard/Common/TimerView/index';
// import SimpleMap from 'app/routes/map/routes/simple/Components/SimpleMap';
// import ContactCard from 'components/Cards/Contact';
// import SimpleCard from 'components/Cards/Sample/index';
// import PopularProduct from 'components/dashboard/Common/PopularProduct';
// import WeatherDetail from 'components/Weather/WeatherDetail';
// import LatestPosts from 'components/dashboard/Common/LatestPosts/index';
// import {
//     announcementsNotification,
//     appNotification,
//     latestPostList,
//     marketingData,
//     pieChartData,
//     products
// } from 'app/routes/dashboard/routes/Default/data';

import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';

import Format from 'services/Format.js'
import DropdownMenu from 'components/DropdownMenu'
import Avatar from '@material-ui/core/Avatar';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomerGridColumns = [
    {
        id: 'customerAvatar',
        numeric: false,
        disablePadding: false,
        label: '',
        "orderable": false,
        cellRender: function (column, item) {
            
            var initials = "?";

            if (item.FirstName && item.LastName && item.FirstName.length != 0 && item.LastName.length != 0) {
                initials = item.FirstName.substr(0, 1) + item.LastName.substr(0, 1)
            }

            return <Avatar className="bg-primary size-34"><h1 className="m-0 text-white">{initials}</h1></Avatar>
        }
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        "orderable": false,
        cellRender: function (column, item) {
            return Format.formatName(item);
        }
    },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address', "orderable": false },
    {
        id: 'phone', numeric: false, disablePadding: false, label: 'Phone', "orderable": false,
        cellRender: function (column, item) {
            return Format.formatPhone(item.Phone);
        }
    },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', "orderable": false },
    {
        id: 'action', 
        numeric: false, 
        disablePadding: false, 
        label: '', 
        "orderable": false,
        cellRender: function (column, item) {
            return (<DropdownMenu />);
        }
    },
];

import { DataGrid } from 'components/DataGrid'

const mockData = [
    { FirstName: 'John', LastName: 'Doe', Phone: "4075551212", email: "job.doe@hotmail.com" },
    { FirstName: 'Albert', LastName: 'Smith', Phone: "4075552222", email: "albert.doe@hotmail.com" },
];

class CustomerView extends React.Component {

    onOptionMenuSelect = event => {
        this.setState({ menuState: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ menuState: false });
    };

    filterChanged = (data) => {
        var filter = "";
        for (var index = 0; index < data.items.length; index++) {
            var item = data.items[index];      
            switch(item.name) {
                case 'name':
                filter += item.name + "=" + item.value.firstName+','+item.value.lastName + '&';            
                break;
                case 'addess':
                filter += item.name + "=" + item.value.lat+','+item.value.lng + '&';  
                break;
                case 'date':
                const {startDate, endDate} = item.value;
                filter += item.name + "=" + startDate +','+ endDate + '&';  
                break;            
                case 'multiSelect':
                let multiSelectValue = item.value.filter(x => x.isChecked === true).map(x=>x.value);
                filter += item.name + "=" + multiSelectValue + '&';
                break;
                default:
                filter += item.name + "=" + item.value + '&';  
            }
        }
        console.log(filter);
    }

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
            suggestion: ['32007', '32003', '32008', '32002', '32004']
        }
    }
    
    render() {

        const { anchorEl, menuState } = this.state;

        return (
            <div className="app-wrapper">
                <div className="dashboard animated slideInUpTiny animation-duration-3">

                    <ContainerHeader match={this.props.match} title='' />

                    <div className="row">                    
                        <div>
                            <SearchFilterBuilder onFilterChange={this.filterChanged.bind(this)}>
                                <UserNameFilter name="name" firstNamePlaceHolder="First Name" lastNamePlaceHolder="Last Name" displayName="Name" displayTitle="Customer Name" value=""/>
                                <AddressFilter name="addess" displayName="Address" displayTitle="Customer Address" value=""/>
                                <DateRangeFilter name="date" displayName="Date" starDatelabel="Start Date" starMaxDateMessage="Date must be less than today" endDatelabel="End Date" endMaxDateMessage="Date must be less than today" displayTitle="Date Range" value=""/>
                                <StaticMultiSelectFilter name="multiSelect" displayName="StaticMultiSelect" displayTitle="Multi Select Static">
                                    <SelectValue name="noSignatureRequired" displayName="No Signature Required" value="noSignatureRequired" isChecked={false}/>
                                    <SelectValue name="indirectSignatureRequired" displayName="Indirect Signature Required" value="indirectSignatureRequired" isChecked={false}/>
                                    <SelectValue name="directSignatureRequired" displayName="Direct Signature Required" value="directSignatureRequired" isChecked={false}/>
                                    <SelectValue name="adultSignatureRequired" displayName="Adult Signature Required" value="adultSignatureRequired" isChecked={false}/>
                                </StaticMultiSelectFilter>
                                <StaticSelectFilter name="staticSelect" label="Select Option" displayName="StaticSelect" displayTitle="Select Static">
                                    <SelectValue name="noSignatureRequired" displayName="No Signature Required" value="noSignatureRequired"/>
                                    <SelectValue name="indirectSignatureRequired" displayName="Indirect Signature Required" value="indirectSignatureRequired"/>
                                    <SelectValue name="directSignatureRequired" displayName="Direct Signature Required" value="directSignatureRequired"/>
                                    <SelectValue name="adultSignatureRequired" displayName="Adult Signature Required" value="adultSignatureRequired"/>
                                </StaticSelectFilter>
                                <AutoCompleteFilter name="autompleteMultiSelect" multiple={true} placeholder="Select Zip Code" displayName="AutompleteMultiSelect" displayTitle="Multi Select Autocomplete" value="" 
                                    suggestion={this.state.suggestion} />
                                <AutoCompleteFilter name="autompleteSelect" placeholder="Select Zip Code" displayName="AutompleteSelect" displayTitle="Select Autocomplete" value="" 
                                    suggestion={this.state.suggestion} />
                            </SearchFilterBuilder>
                        </div>
                        <DataGrid columns={CustomerGridColumns} data={mockData} />
                    </div>

                </div>
            </div>            
        );
    }
}

export default CustomerView;
