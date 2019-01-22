import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

class DropdownMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default DropdownMenu;












// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing.unit * 2,
//   },
// });

// class DropdownMenu extends React.Component {
//   state = {
//     open: false,
//   };

//   handleToggle = () => {
//     this.setState(state => ({ open: !state.open }));
//   };

//   handleClose = event => {
//     if (this.anchorEl.contains(event.target)) {
//       return;
//     }

//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;

//     return (
//         <div>
//           {/* <Button
//             buttonRef={node => {
//               this.anchorEl = node;
//             }}
//             aria-owns={open ? 'menu-list-grow' : null}
//             aria-haspopup="true"
//             onClick={this.handleToggle}
//           >
//             Toggle Menu Grow
//           </Button> */}

//           <IconButton
//           aria-label="More"
//           aria-owns={open ? 'long-menu' : null}
//           aria-haspopup="true"
//           onClick={this.handleClick}
//         >
//           <MoreVertIcon />
//         </IconButton>

//           <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
//             {({ TransitionProps, placement }) => (
//               <Grow
//                 {...TransitionProps}
//                 id="menu-list-grow"
//                 style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//               >
//                 <Paper>
//                   <ClickAwayListener onClickAway={this.handleClose}>
//                     <MenuList>
//                       <MenuItem onClick={this.handleClose}>Profile</MenuItem>
//                       <MenuItem onClick={this.handleClose}>My account</MenuItem>
//                       <MenuItem onClick={this.handleClose}>Logout</MenuItem>
//                     </MenuList>
//                   </ClickAwayListener>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </div>
//     );
//   }
// }

// DropdownMenu.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DropdownMenu);
