import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  joot: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  media: {
    height: 140,
  },
}));

export default function GroupCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
            <div className={classes.joot}>
                <GroupAddIcon style={{ fontSize: 200 }}/>
            </div>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
  );
}
