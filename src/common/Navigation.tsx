import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AdminIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Build';
import StateIcon from '@material-ui/icons/TrendingUpRounded';
import MessageIcon from '@material-ui/icons/Message';
import ResultIcon from '@material-ui/icons/TvOutlined';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});


// const DatamappingInfo: React.FunctionComponent<Props> = (props) => {
export default function Navigation (props: {
  numberPage: number, 
}) {
//export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.numberPage);

  return (
    <BottomNavigation
      
      onChange={(event, newValue) => {
        setValue(newValue);
        console.log("button " + newValue)
      }}
      showLabels
      value={value}
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/" label="Admin" icon={<AdminIcon />} />
      <BottomNavigationAction component={Link} to="/Message" label="Message" icon={<MessageIcon />} />
      <BottomNavigationAction component={Link} to="/Settings" label="Settings" icon={<SettingsIcon />} />
      <BottomNavigationAction component={Link} to="/Resultdata" label="Result" icon={<ResultIcon />} />
      <BottomNavigationAction component={Link} to="/State" label="State" icon={<StateIcon />} />
    </BottomNavigation>
  );
}
