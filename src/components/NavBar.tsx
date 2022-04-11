import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  }
  const handleHub = () => {
    navigate("/hub");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: ' #FF0000' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.title}>
            Ashbury Poker
          </Typography>
          <Button color="inherit" className={styles.hub} onClick={handleHub}>Hub</Button>
          <Button color="inherit" onClick={handleProfile}>Profile</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;