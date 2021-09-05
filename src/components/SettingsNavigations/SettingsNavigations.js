import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { userDataSelector } from "../../store";
import { initialsUser } from "../../config/utils";

import "./SettingsNavigations.css";

const SettingsNavigations = () => {
  const history = useHistory();
  const location = useLocation();
  const userData = useSelector(userDataSelector);

  const initials = initialsUser(userData?.fullName);
  const isActiveEditProfile = location.pathname.includes("/settings");
  const isActiveOrderHistory = location.pathname.includes("/orders");
  const isActiveFavourites = location.pathname.includes("/favorites");

  return (
    <div>
      <div className="profile-data">
        <div className="profile-avatar">
          <span className="profile-avatar__initials">{initials}</span>
        </div>
        <div className="user-name">{userData?.fullName}</div>
      </div>
      <div className="navigation">
        <div
          className={
            isActiveEditProfile
              ? "nav-rectangle nav-rectangle__active"
              : "nav-rectangle"
          }
          onClick={() => history.push("/settings")}
        >
          {isActiveEditProfile && (
            <>
              <div className="nav-rectangle__treangle" />
              <div className="nav-rectangle__border-treangle" />
            </>
          )}
          <span
            className={
              isActiveEditProfile
                ? "navigation__text navigation__text-active"
                : "navigation__text"
            }
          >
            Edit Account
          </span>
        </div>
        <div
          className={
            isActiveOrderHistory
              ? "nav-rectangle nav-rectangle__active"
              : "nav-rectangle"
          }
          onClick={() => history.push("/orders")}
        >
          {" "}
          {isActiveOrderHistory && (
            <>
              <div className="nav-rectangle__treangle" />
              <div className="nav-rectangle__border-treangle" />
            </>
          )}
          <span
            className={
              isActiveOrderHistory
                ? "navigation__text navigation__text-active"
                : "navigation__text"
            }
          >
            Orders History
          </span>
        </div>
        <div
          className={
            isActiveFavourites
              ? "nav-rectangle nav-rectangle__active"
              : "nav-rectangle"
          }
          onClick={() => history.push("/favorites")}
        >
          {" "}
          {isActiveFavourites && (
            <>
              <div className="nav-rectangle__treangle" />
              <div className="nav-rectangle__border-treangle" />
            </>
          )}
          <span
            className={
              isActiveFavourites
                ? "navigation__text navigation__text-active"
                : "navigation__text"
            }
          >
            Favourites
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsNavigations;
