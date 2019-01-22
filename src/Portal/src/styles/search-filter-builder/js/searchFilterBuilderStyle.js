const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      float: 'left',
      textTransform: 'capitalize!important',
      borderRadius: 0
    },
    input: {
      display: 'none',
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    popoverContaint: {
      padding: 30,
      width: 342,
      float: 'left'
    },
    tagPopover: {
      minHeight: 208
    },
    removeFilterButton: {
      padding: '0!important',
      height: 40,
      width: 130,
      marginLeft: '10px !important',
      marginTop: '10px!important',
      textTransform: 'capitalize!important'
    },
    applyFilterButton: {
      width: 128,
      backgroundColor: '#E73838!important',
      color: '#FFFFFF!important',
      boxShadow: 'none!important',
      marginTop: '10px!important',
      textTransform: 'capitalize!important'
    },
    filterByLabel: {
      color: '#001E4C',
      fontFamily: "Nunito Sans",
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '24px',
      margin: '0 0 20px',
    }
  });

  export default styles