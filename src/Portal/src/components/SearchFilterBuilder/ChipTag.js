import React from 'react';
import PropTypes from 'prop-types';
import WhiteArrow from 'assets/images/arrow-white.png';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
  chipBtnGroup: {
    position: 'relative',
    top: 10,
    verticalAlign: 'middle',
    margin: '0 10px 10px 0',
    float: 'left'
  },
  chipInnerBtn: {
      background: '#0098D1',
      border: 'none',
      padding: '10px',
      cursor: 'pointer',
      color: '#FFFFFF',
      fontFamily: "Nunito Sans",
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '19px',
      top: '0px'
  },
  chipInnerBtnImg: {
      paddingLeft: 10
  }
});

function ChipTag({ id, label, onClick, onDelete, classes }) {  
  return (<span>
            <div className={classes.chipBtnGroup} id={id}>
              <button className={classes.chipInnerBtn} type="button" onClick={onDelete}>x</button>
              <button className={classes.chipInnerBtn} type="number" onClick={onClick}>{label}
                <img className={classes.chipInnerBtnImg} src={WhiteArrow} />
              </button>
            </div>
          </span>);
}

ChipTag.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

ChipTag.defaultProps = {
  label: 'Text',
};

export default withStyles(styles)(ChipTag);
