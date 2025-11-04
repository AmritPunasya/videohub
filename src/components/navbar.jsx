import {AppBar, Typography,Box,Toolbar,Button,Chip} from "@mui/material"
import {PlayCircle,Home, Dashboard, AdminPanelSettings, Category, Login, Logout, PortableWifiOffOutlined, PersonAdd} from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"

import { Link, useNavigate } from "react-router-dom"

export function Navbar(){
   const {user,isAdmin,logout} = useAuth();
   const navigate = useNavigate();
   const handleLogout= ()=>{
             logout();
             navigate("/")
   }
    return(
        <AppBar  position="fixed" sx={{ backgroundColor: '#4483e3ff', boxShadow: 2}}>
           <Toolbar>
              <Box sx={{display:"flex",alignItems:"center"}}>
                   <PlayCircle sx={{mr:1,fontSize:25}}/>
                  <Typography variant="h6" component="div" sx={{fontWeight:600,mr:4}}>VideoHub</Typography>
              </Box>
              <Box sx={{flexGrow:1,display:"flex",gap:1}}>
                <Button 
                  color="inherit"
                  component={Link}
                  to="/"
                  startIcon={<Home/>}
                  sx={{textTransform:"none"}}
                >
                 Home
                </Button>
                
                {user && (
                  <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  startIcon={<Dashboard/>}
                   sx={{ textTransform: 'none' }}
                >
                  Dashbord
                </Button>
                
                {isAdmin &&(
                <Button
                 color="inherit"
                 component={Link}
                 to="/admin"
                 startIcon={<AdminPanelSettings/>}
                  sx={{ textTransform: 'none' }}
                >
                  Admin
                </Button>
                )}
                <Button
                 color="inherit"
                 component={Link}
                 to="/category"
                 startIcon={<Category/>}
                 sx={{ textTransform: 'none' }}
                >
                   Category
                </Button>
                <Button
                 color="inherit"
                 component={Link}
                 to="/profile"
                 startIcon={<PortableWifiOffOutlined/>}
                 sx={{ textTransform: 'none' }}
                 >

                  Profile
                 </Button>
                </>
                )}
                </Box>
               {user ? (
                <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                    <Typography>
                       {isAdmin ? user.id : user.user_name}
                       <Chip
                         label ={isAdmin?'Admin':'User'}
                           size="small"
                           sx={{
                             bgcolor: isAdmin ? '#3b88dfff' : '#3ea9ecff',
                             color: 'white',
                             fontWeight: 600,
                             height: 24,
                             ml:1
                          }}
                       />
                    </Typography>
                
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<Logout/>}
                >
                  Logout
                </Button>
                </Box> 
               ):(
                <Box>
                <Button
                 color="inherit"
                 component={Link}
                 to="/login"
                 startIcon={<Login/>}
                 sx={{textTransform:'none'}}
                >
                 Login
                </Button>
                <Button 
                 color="inherit"
                 component={Link}
                 to="/register"
                 startIcon={<PersonAdd/>}
                 sx={{textTransform:'none'}}
                >
                Register
                </Button>
                </Box>
               )

              }
           </Toolbar>
        </AppBar>
    )
}