import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { logoutUser } from "../slices/authSlice";
import CallIcon from "@mui/icons-material/Call";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { AccountBalanceRounded, AccountBoxOutlined } from "@mui/icons-material";
import { VscAccount } from "react-icons/vsc";
const pages = ["Products", "Pricing", "Blog"];
const settings = [
  { one: "Profile" },
  { three: "Dashboard" },
  { four: "Login" },
  { five: "New Product" },
  { seven: "Admin" },
  { eight: "All Products" },

  { six: "Logout" },
];

function ResponsiveAppBar() {
  const user = useSelector((state) => state.auth);
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const [query, setQuery] = useState("");
  const [tours, setTours] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterItems(category, searchTerm);
  };

  const handleSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    filterItems(selectedCategory, searchTerm);
  };
  console.log("search", searchTerm);
  const filterItems = (category, searchTerm) => {
    const filtered =
      category === "All"
        ? filteredItems.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : items.filter(
            (item) =>
              item.category === category &&
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

    setFilteredItems(filtered);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `https://hustle-kenya-7azi.onrender.com/products/search${key}`
      );
      result = await result.json();
      if (result) {
        const results = result.filter((_, index) => index < 6);
        setTours(results);
      }
      console.log(` `, result);
    } else {
      setTours();
    }
  };

  const [data, setData] = useState([]);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/stats/hustle`
        );
        res.data.sort(compare);
        //   const result = res.data.filter((_, index) => index < 8);
        setFilteredItems(res.data);
        console.log("filterd", filteredItems);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://hustle-kenya-7azi.onrender.com/stats/hustle?q=${query}`
      );
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.error("logout success");
    navigate("/");
  };
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  }));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <h4 style={{ color: "red" }}>Choose</h4>

      <AppBar style={{ color: "black ", background: "white" }} position="fixed">

        <Container maxWidth="xl df">
          <Toolbar disableGutters>
          
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>


                </MenuItem> */}
                {/* ))} */}
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    {user._id && user.verified === true && (
                      <Link to="/profile">
                        <Typography textAlign="center">
                          {setting.one}
                        </Typography>
                      </Link>
                    )}

                    {user.isAdmin === true && (
                      <Link to={`/admin/summary`}>{setting.seven}</Link>
                    )}
                    <Link to="/products">
                      <Typography textAlign="center">
                        {setting.eight}
                      </Typography>
                    </Link>
                    {user._id ? (
                      <>
                        <Typography
                          onClick={() => handleLogout()}
                          textAlign="center"
                        >
                          {setting.six}
                        </Typography>
                      </>
                    ) : (
                      <Link to="/login">
                        <Typography textAlign="center">
                          {setting.four}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <div>
              <Link to='/'>

              
              <img style={{
                margin:'.2rem',
            width:'5rem',
            height:'4rem',
            border:'none',
            borderRadius:'50%',
            objectFit:'cover'
          }} src="https://res.cloudinary.com/pitz/image/upload/v1693046138/Capture01_hyu8ub.png" alt="" />
</Link>
              </div>
            <div className="main-nav">
             
              <div>
              <Link
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "black",
              }}
              to="/"
            >
              <h5
              className="logo-text"
                style={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginTop: "1rem",
                }}
              >
                EASYBUYENTERPRISES
              </h5>
            </Link>
              </div>
              <div>
              <Link to="/cart">
              <div
                style={{ marginLeft: "2rem", textDecoration: "none" }}
                className="nav-bag"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="rgb(48, 47, 47)"
                  className="bi bi-handbag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                </svg>
                <span className="bag-quantity">
                  <span>{cartTotalQuantity}</span>
                </span>
              </div>
            </Link>
              </div>
              <div>
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <div style={{ display: "flex",gap:'1rem' }}>
                  <div style={{display:'flex',gap:'.5rem'}}>
                   <VscAccount size={40} style={{cursor:'pointer', marginTop: ".6rem" }}
                                      onClick={handleOpenUserMenu}

                  /> <button onClick={handleOpenUserMenu} className="btn">
                    Accounts <span >V</span>
                    </button> 
                  </div>
          
                  <IconButton
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: ".5rem",
                      alignItems: "",
                    }}
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    {/* {user?.result?.name} */}
                    {/* <Avatar alt="" src={user?.img} /> */}
                  </IconButton>
                </div>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {user._id && (
                      <Link to="/profile">
                        <Typography textAlign="center">
                          {setting.one}
                        </Typography>
                      </Link>
                    )}

                    {user.isAdmin === true && (
                      <Link to={`/admin/summary`}>{setting.seven}</Link>
                    )}
                    {user._id ? (
                      <>
                        <Typography
                          onClick={() => handleLogout()}
                          textAlign="center"
                        >
                          {setting.six}
                        </Typography>
                        <></>
                        <div>
                          <Link to="/products">
                            <Typography textAlign="center">
                              {setting.eight}
                            </Typography>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <Link to="/login">
                        <Typography textAlign="center">
                          {setting.four}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
              </div>
            </div>
            
            

            {/* <Box
              sx={{ flexGrow: 1, ml: 20, display: { xs: "none", md: "flex" } }}
            >
              <Link
                style={{ marginLeft: "1rem", textDecoration: "none" }}
                to="/products"
              >
                All Products
              </Link>
            </Box> */}

           
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;

// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import styled from "styled-components";
// import { logoutUser } from "../slices/authSlice";
// import { toast } from "react-toastify";

// const NavBar = () => {
//   const dispatch = useDispatch();
//   const { cartTotalQuantity } = useSelector((state) => state.cart);
//   const auth = useSelector((state) => state.auth);
//    const navigate=useNavigate()
//   console.log(auth);

//   return (
//     <nav className="nav-bar">
//       <Link to="/">
//         <h4>Choose Shopsmat</h4>
//       </Link>
//       <Link to="/cart">
//         <div className="nav-bag">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="35"
//             height="35"
//             fill="currentColor"
//             className="bi bi-handbag-fill"
//             viewBox="0 0 16 16"
//           >
//             <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
//           </svg>
//           <span className="bag-quantity">
//             <span>{cartTotalQuantity}</span>
//           </span>
//         </div>
//       </Link>
//       {auth._id ? (
//         <Links>
//           {auth.isAdmin ? (
//             <>
//             {/* <div>
//               <Link to="/create-product">Post Products</Link>
//             </div> */}
//             <div style={{marginRight:'1rem'}}>
//               <Link  to="/admin/summary">Admin</Link>
//             </div>
//             </>
//           ) : null}

//           <div
//           style={{marginLeft:'1rem'}}
//             onClick={() => {
//               dispatch(logoutUser(null));
//               toast.warning("Logged out!", { position: "bottom-left" });
//               navigate('/')
//             }}
//           >
//             Logout
//           </div>
//           <AuthLinks>
//           <Link to="/create-product">New Product</Link>
//         </AuthLinks>
//         </Links>
//       ) : (
//         <AuthLinks>
//           <Link to="/login">Login</Link>
//         </AuthLinks>
//       )}
//     </nav>
//   );
// };

// export default NavBar;

// const AuthLinks = styled.div`
//   a {
//     &:last-child {
//       margin-left: 2rem;
//     }
//   }
// `;

// const Links = styled.div`
//   color: white;
//   display: flex;

//   div {
//     cursor: pointer;

//     &:last-child {
//       margin-left: 2rem;
//     }
//   }
// `;
