import React, { Component } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import { MenuDefinition, MenuDefinitionType } from 'configuration/menu.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SidenavContent extends Component {
    componentDidMount() {
        const { history } = this.props;
        const that = this;
        const pathname = `#${history.location.pathname}`;// get current path

        const subMenuLi = document.querySelectorAll('.sub-menu > li');
        for (let i = 0; i < subMenuLi.length; i++) {
            subMenuLi[i].onclick = function (event) {
                event.stopPropagation();
            }
        }

        const menuLi = document.getElementsByClassName('menu');
        for (let i = 0; i < menuLi.length; i++) {
            menuLi[i].onclick = function (event) {
                for (let j = 0; j < menuLi.length; j++) {
                    const parentLi = that.closest(this, 'li');
                    if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
                        menuLi[j].classList.remove('open')
                    }
                }
                this.classList.toggle('open');
                event.stopPropagation();
            }
        }

        const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
        try {
            const activeNav = this.closest(activeLi, 'ul'); // select closest ul
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('open');
            } else {
                this.closest(activeLi, 'li').classList.add('open');
            }
        } catch (error) {

        }
    }

    closest(el, selector) {
        try {
            let matchesFn;
            // find vendor prefix
            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                if (typeof document.body[fn] == 'function') {
                    matchesFn = fn;
                    return true;
                }
                return false;
            });

            let parent;

            // traverse parents
            while (el) {
                parent = el.parentElement;
                if (parent && parent[matchesFn](selector)) {
                    return parent;
                }
                el = parent;
            }
        } catch (e) {

        }

        return null;
    }

    render() {
        return (
            <CustomScrollbars className=" scrollbar">
                <ul className="nav-menu">
                    {
                        MenuDefinition.map((item, index) => {
                            return this.renderMenuItem(item, index);
                        },
                        this)
                    }
                </ul>
            </CustomScrollbars>
        );
    }

    renderMenuItem(item, index) {
        switch (item.type) {
            case MenuDefinitionType.Divider:
                return (<hr key={index} className="side-nav-seperator" />);

            case MenuDefinitionType.Header:
                return <li key={index} className="nav-header"><IntlMessages id={item.text} /></li>;

            case MenuDefinitionType.Item:
                return (<li key={index}>
                    <NavLink className="prepend-icon" to={item.route}>
                        <i style={{ marginRight: '10px' }}>
                            <FontAwesomeIcon icon={["far", item.icon]} size="lg" />
                        </i>
                        <span className="nav-text"><IntlMessages id={item.text} /></span>
                    </NavLink>
                </li>);
        }

        return (<li>UNKNOWN MENU TYPE</li>)
    }
}

export default withRouter(SidenavContent);
