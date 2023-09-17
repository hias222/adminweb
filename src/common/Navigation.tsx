import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AdminIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Build';
import StateIcon from '@mui/icons-material/TrendingUpRounded';
import MessageIcon from '@mui/icons-material/Message';
import ResultIcon from '@mui/icons-material/TvOutlined';
import CombinedIcon from '@mui/icons-material/MultilineChart';
import HiitIcon from '@mui/icons-material/SpeedRounded'

// const DatamappingInfo: React.FunctionComponent<Props> = (props) => {
export default function Navigation (props: {
  numberPage: number, 
}) {
//export default function Navigation() {
  const [value, setValue] = React.useState(props.numberPage);

  return (
    <BottomNavigation
      
      onChange={(event, newValue) => {
        setValue(newValue);
        console.log("button " + newValue)
      }}
      showLabels
      value={value}
    >
      <BottomNavigationAction component={Link} to="/" label="Admin" icon={<AdminIcon />} />
      <BottomNavigationAction component={Link} to="/Message" label="Message" icon={<MessageIcon />} />
      <BottomNavigationAction component={Link} to="/Settings" label="Settings" icon={<SettingsIcon />} />
      <BottomNavigationAction component={Link} to="/Resultdata" label="Result" icon={<ResultIcon />} />
      <BottomNavigationAction component={Link} to="/Combined" label="Combined" icon={<CombinedIcon />} />
      <BottomNavigationAction component={Link} to="/State" label="State" icon={<StateIcon />} />
      <BottomNavigationAction component={Link} to="/Hiit" label="Hiit" icon={<HiitIcon />} />
    </BottomNavigation>
  );
}
