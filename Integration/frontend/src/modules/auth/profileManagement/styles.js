const styles = theme => ({
    wrapperPaper: {
        borderRadius: '6px',
        marginBottom: '48px'
    },
    wrapperContainer: {
        padding: [40]
    },

    tableHeaderPaper: {
        boxShadow: 'none',
        display: 'table',
        width: '100%',
        background: 'transparent',
        borderBottom: [[1, 'solid', theme.palette.border1Color]],
        '& p': {
            fontSize: '18px',
            color: theme.palette.primary1Color
        },
        '& h2': {
            fontSize: '22px',
            color: theme.palette.primary2Color,
            marginRight: '50px'
        }
    },
    tableHeaderToolbar: {
        display: 'table-row'
    },
    tableHeaderBlock: {
        display: 'table-cell',
        verticalAlign: 'middle',
        '& p, & h2': {
            display: 'inline'
        }
    },

    // Media Queries
    [theme.breakpoints.only('xl')]: {
        tableHeaderPaper: {
            padding: [24, 40],
        }
    },
    [theme.breakpoints.only('lg')]: {
        tableHeaderPaper: {
            padding: [16, 30],
        }
    },
    [theme.breakpoints.only('md')]: {
        tableHeaderPaper: {
            padding: [12, 20],
        }
    },

    [theme.breakpoints.between('xs', 'sm')]: {
        tableHeaderPaper: {
            padding: [12, 20],
        }
    },
    // Media Queries





})

export default styles;