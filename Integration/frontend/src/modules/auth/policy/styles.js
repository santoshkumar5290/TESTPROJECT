const styles = (theme) => ({

    pageContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: {
            image: 'url("images/login_bg_01.png")',
            color: '#029af5',
            repeat: 'no-repeat',
            position: 'center center',
            size: 'cover'
        },
        width: '100%',
        height: '100vh'
    },
    pageWindow: {
        display: 'block',
    },
    pageWrapper: {
        display: 'flex',
        maxWidth: '900px',
        maxHeight: '100%',
        padding: '20px',
        margin: '0 auto',
        boxSizing: 'border-box',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 3}px`,
    },
    gridWholeCol: {
        height: '100%',
    },
    paper: {
        padding: '40px',
        color: theme.palette.textColorDark,
        maxHeight: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto'
    },
    divider: {
        margin: `${theme.spacing.unit * 3}px 0`,
    },

    // Media Queries  ---------------------------------------------

    // --LG Up & Down
    [theme.breakpoints.up('lg')]: {

    },

    [theme.breakpoints.down('lg')]: {

    },

    // --MD Up & Down
    [theme.breakpoints.up('md')]: {
        pageWrapper: {
            padding: '40px',
        },
    },

    [theme.breakpoints.down('md')]: {
        pageWrapper: {
            padding: '20px',
        },
    },

    // --SM, XS Up & Down
    [theme.breakpoints.down('sm')]: {

    },

    [theme.breakpoints.down('xs')]: {

    },

});

export default styles