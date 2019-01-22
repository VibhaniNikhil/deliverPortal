import React from 'react';
import IconButton from '@material-ui/core/IconButton';
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
// import {chartDataWithoutAxis, data2} from 'app/routes/dashboard/routes/ECommerce/data'
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
// import CafeCard from 'components/Cards/Cafe/index';
// import Statistics from 'components/dashboard/default/Statistics';
import ContainerHeader from 'components/ContainerHeader/index';
// import CardMenu from 'components/dashboard/Common/CardMenu';
// import Team from 'app/routes/extraPages/routes/aboutUs/Componets/Team';
// import CardHeader from 'components/dashboard/Common/CardHeader/index';
import IntlMessages from 'util/IntlMessages';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class HomeView extends React.Component {
    onOptionMenuSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = () => {
        this.setState({menuState: false});
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
        }
    }

    render() {
        const {anchorEl, menuState} = this.state;
        return (
            <div className="app-wrapper">
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard" />} />
home
                </div>
            </div>


        );
    }
}

export default HomeView;