import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import 'react-big-calendar/lib/less/styles.less';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'styles/bootstrap.scss'
import 'styles/app.scss';
import 'styles/app-rtl.scss';
import blueTheme from '../themes/blueTheme';
import AppLocale from 'localization';

import indigoTheme from '../themes/blueTheme';
import darkTheme from '../themes/darkTheme';

import MainApp from 'views/App';
import SignIn from './SignIn';
import {setInitUrl} from 'actions/Auth';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
import 'constants/FontLibrary'
import RestrictedRoute from 'components/RestrictedRoute'




class App extends Component {

    componentWillMount() {
        if (this.props.initURL === '') {
            this.props.setInitUrl(this.props.history.location.pathname);
        }
    }

    render() {
        const {match, location, themeColor, isDarkTheme, locale, isLoggedIn, initURL, isDirectionRTL} = this.props;
        let applyTheme = createMuiTheme(blueTheme);
        if (isDirectionRTL) {
            applyTheme.direction = 'rtl';
            document.body.classList.add('rtl')
        } else {
            document.body.classList.remove('rtl');
            applyTheme.direction = 'ltr';
        }

        const currentAppLocale = AppLocale[locale.locale];
        return (
            <MuiThemeProvider theme={applyTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <IntlProvider
                        locale={currentAppLocale.locale}
                        messages={currentAppLocale.messages}>
                        <RTL>
                            <div className="app-main">
                                <Switch>

                                    {/* <Route path='/signin' component={SignIn}/>
                                    <Route path='/signup' component={SignUp}/> */}
                                    <Route path='/signin' component={SignIn}/>                             
                                    <RestrictedRoute path='/' isLoggedIn={true} component={MainApp}/>
                                    {/* <Route
                                        component={asyncComponent(() => 
                                        import('app/routes/extraPages/routes/404'))}/> */}
                                </Switch>
                            </div>
                        </RTL>
                    </IntlProvider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({settings, auth}) => {
    const {themeColor, sideNavColor, darkTheme, locale, isDirectionRTL} = settings;
    const {isLoggedIn, initURL} = auth;
    return {themeColor, sideNavColor, isDarkTheme: darkTheme, locale, isDirectionRTL, isLoggedIn, initURL}
};

export default connect(mapStateToProps, {setInitUrl})(App);
