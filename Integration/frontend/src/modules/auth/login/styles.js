const styles = (theme) => ({
    modalContainer: {
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
    modalWindow: {
        display: 'block',
    },
    modalWrapper: {
        display: 'block',
    },

    //Modal Header JSS
    modalHeader: {
        background: theme.palette.canvasColor,
        borderBottom: [
            [1, 'solid', theme.palette.border3Color]
        ],
        position: 'relative',
        '& h2': {
            margin: 0,
            color: theme.palette.textColorDark,
            '&:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 'calc(50% - 0)',
                backgroundColor: theme.palette.primary2Color,
            },
        },
        '& p': {
            margin: 0
        },
    },

    //Modal Form JSS
    modalBody: {
        background: theme.palette.canvasColor,
    },
    modalRow: {
        display: 'block',
        position: 'relative',
        '& p': {
            fontSize: '1.4rem',
            position: 'absolute',
            bottom: '-20px',
            width: '100%',
            '& span': {
                margin: 0,
                padding: 0
            }
        },
        '&:first-child > div, &:first-child > div > div': {
            marginTop: 0,
        },
        paddingBottom: 10,
        '&:last-child': {
            paddingTop: 20,
            paddingBottom: 20,
        }
    },
    passwordRow: {
        '& input': {
            width: 'calc(100% - 100px)',
        }
    },
    signInButton: {
        backgroundColor: theme.palette.primary2Color,
        border: 0,
        borderRadius: '6px',
        color: 'white',
        '&:hover': {
            background: theme.palette.secondary3Color,
        }
    },
    signInButtonDisabled: {
        color: '#FFF!important',
        backgroundColor: theme.palette.primary1Color,
        border: 0,
        borderRadius: '6px',
    },
    forgotButton: {
        position: 'absolute',
        right: 0,
        bottom: '40px',
        fontSize: '24px',
        lineHeight: '1.5',
        padding: 0,
        boxShadow: 'none',
        letterSpacing: 0,
        textTransform: 'inherit',
        '&:hover': {
            background: 'transparent',
            color: theme.palette.accent3Color,
        }

    },

    //Modal Footer JSS
    modalFooter: {
        background: theme.palette.secondary3Color,
    },
    clientLogo: {
        textAlign: 'left',
        color: theme.palette.primary2Color,
        transitionDuration: 300,
        height: '24px',
        color: theme.palette.primary2Color,
        verticalAlign: 'middle',
    },

    navList: {
        display: 'flex',
        flexDirection: 'row',
        float: 'right',
        padding: 0,
    },
    navItem: {
        width: 'auto',
        marginRight: 0,
        textAlign: 'center',
        padding: '3px 30px',
        '&:first-child': {
            paddingLeft: 0
        },
        '&:last-child': {
            borderRight: 0,
            paddingRight: 0
        },
        '& span': {
            color: theme.palette.primary2Color,
            opacity: '0.7',
        },
        '&:hover span': {
            opacity: '1',
        },
        '&:hover': {
            background: 'transparent'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            right: '0px',
            top: 'calc(50% - 7px);',
            height: '15px',
            borderRight: [1, 'solid', theme.palette.border1Color],
            opacity: '0.2',
        },
        '&:last-child:before': {
            display: 'none',
        }
    },
    navItemText: {
        padding: 0,
        '& h3': {
            color: theme.palette.alternateTextColor,
            position: 'relative',
            opacity: '0.2',
            fontWeight: '300'
        },
        '& h3:hover': {
            opacity: '0.3'
        }
    },




    // Media Queries  ---------------------------------------------

    // --LG Up & Down
    [theme.breakpoints.up('lg')]: {
        modalHeader: {
            padding: '32px 80px',
            '& h2': {
                '&:before': {
                    height: '45px',
                    width: '8px',
                }
            },
        },
        modalBody: {
            padding: '32px 80px'
        },
        modalFooter: {
            padding: '32px 80px'
        },
    },
    [theme.breakpoints.down('lg')]: {
        modalHeader: {
            padding: '24px 64px',
            '& h2': {
                '&:before': {
                    height: '35px',
                    width: '6px',
                }
            },
        },
        modalBody: {
            padding: '24px 64px'
        },
        modalFooter: {
            padding: '24px 64px'
        },
    },

    // --MD Up & Down
    [theme.breakpoints.up('md')]: {
        modalRow: {
            '& label': {
                fontSize: '22px',
                lineHeight: '1'
            },
            '& input': {
                fontSize: '2.6rem',
                lineHeight: '1.5'
            },            
        },
        signInButton: {
            padding: '16px 32px'
        },
        signInButtonDisabled: {
            padding: '16px 32px'
        },
        clientLogo: {
            fontSize: '96px',
        },
    },
    [theme.breakpoints.down('md')]: {
        signInButton: {
            padding: '12px 24px'
        },
        signInButtonDisabled: {
            padding: '12px 24px'
        },
        clientLogo: {
            fontSize: '60px',
        },
    },

    // --SM, XS Up & Down
    [theme.breakpoints.down('sm')]: {
        modalHeader: {
            padding: '24px 40px',
            '& h2': {
                '&:before': {
                    height: '25px',
                    width: '5px',
                }
            },
        },
        modalBody: {
            padding: '24px 40px',
        },
        modalFooter: {
            padding: '24px 40px',
        },
        clientLogo: {
            fontSize: '48px',
        },
    },
    [theme.breakpoints.down('xs')]: {
        modalHeader: {
            padding: '16px 32px',
        },
        modalBody: {
            padding: '16px 32px',
        },
        modalFooter: {
            padding: '16px 32px',
        },
        navItem: {
            padding: '3px 10px',
        }
    },

    '@media (min-width: 0px) and (max-width: 359px)': {
        navItem: {
            padding: '3px 7px',
            '& span': {
                fontSize: '13px',
                lineHeight: '2.0rem',
            }
        }
    },


    // --Media Queris for Height Mentainence.
    '@media screen and ( max-height: 639px )': {
        signInButton: {
            padding: '12px 24px'
        },
        signInButtonDisabled: {
            padding: '12px 24px'
        },

        modalHeader: {
            padding: '24px 40px',
            '& h2': {
                '&:before': {
                    height: '25px',
                    width: '5px',
                }
            },
        },
        modalBody: {
            padding: '24px 40px',
        },
        modalFooter: {
            padding: '24px 40px',
        },
        clientLogo: {
            fontSize: '48px',
        },
    },
    '@media screen and ( max-height: 589px )': {
        modalHeader: {
            padding: '16px 32px',
            '& h2': {
                '&:before': {
                    height: '25px',
                    width: '5px',
                }
            },
        },
        modalBody: {
            padding: '16px 32px',
        },
        modalFooter: {
            padding: '16px 32px',
        },
        signInButton: {
            padding: '12px 24px'
        },
        signInButtonDisabled: {
            padding: '12px 24px'
        },
        clientLogo: {
            fontSize: '48px',
        },

    },




});

export default styles