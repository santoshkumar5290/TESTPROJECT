import React from 'react';
import { Dialog, CardMedia, IconButton, Typography, DialogContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import styles from '../styles';

const SensorModal = ({ classes, openInfo, closeInfo, info }) => (
  <Dialog open={openInfo} onClose={closeInfo} classes={{ paper: classes.modalDialogPaper }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <CardMedia className={classes.modalCardMedia} image={info.imageUrl} title={info.title}>
      <IconButton className={classes.mediaCloseIcon} onClick={closeInfo}>
        <Close />
      </IconButton>
      <Typography className={classes.mediaBrowseMsg} variant="p" component="p">
        {info.browseMsg}
      </Typography>
      <Typography className={classes.mediaStatusUid} variant="p" component="p">
        <span>{info.status}</span> <span>{info.uniqueId}</span>
      </Typography>
    </CardMedia>

    <DialogContent className={classes.modalDialogBody}>
      <Typography gutterBottom variant="h6" component="h6" color="primary">
        {info.title} <span className={classes.dataSize}>Byte: 0, Bit: 4</span>
      </Typography>
      <Typography gutterBottom variant="p" component="p" className={classes.infoValueDescp}>
        {info.description}
      </Typography>
      <Typography gutterBottom variant="h6" component="h6" color="primary">
        Last few Events
      </Typography>
      {info.eventLogs &&
        info.eventLogs.map(e => (
          <Typography variant="p" component="p" className={classes.eventList}>
            {e}
          </Typography>
        ))}
    </DialogContent>
  </Dialog>
);

export default withStyles(styles)(SensorModal);
