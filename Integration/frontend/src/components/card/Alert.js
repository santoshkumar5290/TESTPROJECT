import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Card, CardContent, CardActions } from '@material-ui/core';
import Button from '../button/Button';

/**
 * styles jss
 */
const styles = theme => ({
  greetingCardPaper: { borderRadius: '10px' },
  greetingCard: { maxWidth: 360 },
  greetingCardMedia: {
    background: 'linear-gradient(45deg, #1a237e 0%, #2196f3 100%)',
    height: 128,
    position: 'relative',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      background: {
        image: 'url("images/white_stars.png")',
        repeat: 'no-repeat',
        position: 'center center',
        size: 'auto',
      },
    },
  },
  greetingCardContent: { padding: theme.spacing.unit * 4 },
  greetingCardActions: {
    flexDirection: 'column',
    padding: [0, theme.spacing.unit * 4, theme.spacing.unit * 4, theme.spacing.unit * 4],
    '& button': { width: '100%' },
  },
});

/**
 *
 * Alert Card JSX
 */
const AlertCard = ({ classes, content, onClick, open, actions }) => (
  <Dialog open={open} classes={{ paper: classes.greetingCardPaper }}>
    <Card className={classes.greetingCard}>
      <div className={classes.greetingCardMedia} title="Alert Card" />
      <CardContent className={classes.greetingCardContent}>{content}</CardContent>
      <CardActions className={classes.greetingCardActions}>
        {!actions ? (
          <Button onClick={onClick} fullWidth>
            Continue
          </Button>
        ) : (
          actions
        )}
      </CardActions>
    </Card>
  </Dialog>
);

export default withStyles(styles)(AlertCard);
