const styles = theme => ({
    // User Bar
    avtarList: {
        display: 'block',
        cursor: 'pointer',
        padding: 0,
        '& li': {
            padding: 0
        }
    },
    avtarListItem: {
        cursor: 'pointer'
    },
    avtarListItemImage: {

    },
    avtarListItemText: {
        '& span': {
            maxWidth: '145px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',            
        },
        '& h3': {
            color: theme.palette.textColor,
            fontSize: '19px'
        },
        '& p': {
            color: theme.palette.primaryTextColor,
            fontSize: '15px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
        }
    },
    upDownArrow: {
        width: 'auto',
        height: 'auto',
        '&:hover': {
            background: 'transparent'
        }
    },



    // User Dropdown
    menuListPaper: {
        marginLeft: '4px',
        marginTop: '74px',
        overflow: 'inherit',
        borderRadius: '6px',
        width: '280px',
        maxHeight: 'inherit',
        '&:before': {
            content: '""',
            display: 'block',
            width: 0,
            height: 0,
            position: 'absolute',
            right: 30,
            top: '-10px',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #FFF'
        }

    },
    menuListItem: {
        borderBottom: [[1, 'solid', theme.palette.border1Color]],
        height: "auto",
        padding: 0,
        whiteSpace: 'inherit',

        '&:hover:first-child, &:hover:last-child': {
            background: theme.palette.white,
            cursor: 'auto',
        }

    },
    menuListItemLink: {
        boxSizing: 'border-box',
        width: '100%',
        padding: '16px 24px',
        textDecoration: 'none',
        color: theme.palette.accent2Color,
        display: 'table',
        '&:hover': {
            textDecoration: 'none',
        }

    },

    menuListItemLinkCell: {
        display: 'table-cell',
        '&:first-child': {
            width: '24px',
            paddingRight: '12px'
        },
        '&:last-child': {
            textAlign: 'left'
        }
    },

    menuListItemIcon: {
        color: theme.palette.accent2Color,
        verticalAlign: 'middle',
        textAlign: 'left',
        margin: 0,
        padding: 0
    },
    menuListItemText: {
        color: theme.palette.accent2Color,
        verticalAlign: 'middle',
        margin: 0,
        padding: 0,
        textAlign: 'left',
        '& span': {
            color: theme.palette.accent2Color,
        },
        '&:first-child': { padding: 0, margin: 0 },
        '&:first-child': { padding: 0, margin: 0 },
        '& h3': { color: theme.palette.accent2Color }
    },

    menuListItemWelcomeText: {
        color: theme.palette.primary2Color,
        textAlign: 'center',
        margin: 0,
        padding: 0
    },

    menuListItemButton: {
        border: [[3, 'solid', theme.palette.primary2Color]],
        color: theme.palette.primary2Color,
        fontWeight: 'bold',
        display: 'block',
        width: '100%'
    },

    linkDisable: {
        pointerEvents: 'none',
        cursor: 'default',
        textDecoration: 'none'
    },

    activeLink: {

    },
})

export default styles
