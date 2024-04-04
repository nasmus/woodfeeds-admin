import { Settings } from "@mui/icons-material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar } from "@mui/material";
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/MobileNavbar.css';
import { Store } from "../Store";
import SidebarRow from "./SidebarRow";

export default function MobileSidebar() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div>
      <Link to="#" className="ec-header-btn ec-side-toggle d-lg-none">
        <MenuIcon fontSize="large" onClick={showSidebar} className="m-2" />
      </Link>
      <div className="navbar">
        <div className={sidebar ? "nav-manu active" : "nav-manu"}>
          <div
            className="navbar-toggle absolute -right-5  top-3 hover:font-bold  "
            onClick={showSidebar}
          >
            <Link
              to="#"
              className="menu-bars relative text-cyan-600 hover:text-orange-600 "
            >
              <CloseIcon />
            </Link>
          </div>
          <div className="nav-manu-items flex flex-col justify-between">
            <div>
              <section className="border-b-2 flex items-center p-3 ">
                <div>
                  <Avatar />
                </div>
                <div className=" pl-3 ">
                  {userInfo ? (
                    <>
                      <p className="m-0 text-lg font-bold ">{userInfo.name}</p>
                      <p className="m-0 text-sm font-light ">{userInfo.role}</p>
                    </>
                  ) : (
                    <Link className="no-underline" to="/signin">
                      <p className="m-0 text-lg font-bold">Log In</p>
                    </Link>
                  )}
                </div>
              </section>
              <section className="border-b py-2">
                <div>
                  <Link className="dashboard" to="/dashboard">
                    <SidebarRow Icon={AppsIcon} title="DashBoard" />
                  </Link>
                  <Link className="sidebar__link" to="/product-upload">
                    <SidebarRow  Icon={RateReviewIcon} title="Prdouct Upload" />
                  </Link>

                  <Link className="sidebar__link" to="/productlist">
                    <SidebarRow
                      Icon={AlignHorizontalLeftIcon}
                      title="Product List"
                    />
                  </Link>
                  <Link className="sidebar__link" to="/alluserlist">
                    <SidebarRow Icon={AddToHomeScreenIcon} title="User List" />
                  </Link>

                  <Link className="sidebar__link" to="/orderlist">
                    <SidebarRow Icon={ShoppingCartIcon} title="Order List" />
                  </Link>
                  <Link className="sidebar__link" to="/category">
                    <SidebarRow Icon={AccountTreeIcon} title="Category" />
                  </Link>
                </div>
              </section>
            </div>
            <div className="pb-10 pl-4 ">
              {userInfo ? (
                <section className="bottom-8 text-slate-400">
                  <div className="flex ">
                    <Settings
                      fontSize="small"
                      className={`mt-2 text-slate-400 `}
                    />
                    <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                      <span className={`text-sm font-medium  `}>Setting</span>
                    </button>
                  </div>
                  <Link
                    className=" no-underline text-slate-400 hover:text-slate-400 "
                    to="/"
                    onClick={signOutHandler}
                  >
                    <div className="flex ">
                      <ExitToAppIcon
                        fontSize="small"
                        className={`mt-2 text-slate-400 `}
                      />
                      <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                        <span className={`text-sm font-medium`}>Logout</span>
                      </button>
                    </div>
                  </Link>
                </section>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
