import React, { useEffect } from "react";
import Link from "next/link";

import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";
import useValidateMode from "../../../hooks/useValidateMode";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};
  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  prevHref: string;
  nextHref: string;
  isValid?: boolean;
};

const RegisterRoomFooter: React.FC<IProps> = ({ 
  prevHref, 
  nextHref,
  isValid = true,
}) => {
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const onClickNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      event.preventDefault();
      setValidateMode(true);
    }
  };

  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <a>
          <Button color="dark_cyan" onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;