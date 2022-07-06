import React, { useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import Input from "../common/input";

const Container = styled.div`
  width: 568px;
  padding: 32px;
  height: 614px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }
  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  }

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input 
          placeholder="email" 
          type="email" 
          icon={<MailIcon />} 
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input 
          placeholder="Last name" 
          icon={<PersonIcon />} 
          value={lastName}
          onChange={onChangeLastName}
        />
      </div>
      <div className="input-wrapper">
        <Input 
          placeholder="First name" 
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input 
          placeholder="password" 
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            )
          } 
          value={password}
          onChange={onChangePassword}
        />
      </div>
    </Container>
  ) 
};

export default SignUpModal;