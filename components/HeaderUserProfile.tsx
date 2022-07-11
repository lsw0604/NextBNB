import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Hamburger from "../public/static/svg/header/hamburger.svg";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import { useSelector } from "../store";

const HeaderUserProfile: React.FC = () => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpened) {
          setIsUserMenuOpened(false);
        }
      }}
    >
      <button>
        <Hamburger />
        <img 
          src={userProfileImage}
          className="header-user-profile-image"
          alt=""
        />
      </button>
      {isUserMenuOpened && (
        <ul className="header-usermenu">
          <li>숙소 관리</li>
          <Link href="/room/register/building">
            <a
              role="presentation"
              onClick={() => {
                setIsUserMenuOpened(false);
              }}
            >
              <li>숙소 등록하기</li>
            </a>
          </Link>
          <div className="header-usermenu-divider">
            <li role="presentation" onClick={logout}>
              로그아웃
            </li>
          </div>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;