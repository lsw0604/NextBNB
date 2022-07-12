import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";

import Input from "../common/Input";
import Selector from "../common/Selector";
import Button from "../common/Button";

import palette from "../../styles/palette";

import { monthList, dayList, yearList } from "../../lib/staticData";
import { signupAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import { authActions } from "../../store/auth";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";

const Container = styled.form`
  width: 568px;
  padding: 32px;
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

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}


const PASSWORD_MIN_LENGTH = 8;
const disabledMonths = ["월"];
const disabledDays = ["일"];
const disabledYears = ["년"];

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();

  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastName ||
      password.includes(lastName) ||
      password.includes(email.split("@")[0]),
    [password, lastName, email]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  )

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };


  const validateSignUpForm = () => {
    if (!email || !lastName || !firstName || !password) {
      return false;
    };

    if (isPasswordHasNameOrEmail || isPasswordHasNumberOrSymbol || !isPasswordOverMinLength) {
      return false;
    };

    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastName,
          firstName,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
          ).toISOString(),
        };
        const { data } = await signupAPI(signUpBody);
  
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode("login"));
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input 
          placeholder="email" 
          type="email" 
          icon={<MailIcon />} 
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="need email"
        />
      </div>
      <div className="input-wrapper">
        <Input 
          placeholder="Last name" 
          icon={<PersonIcon />} 
          value={lastName}
          onChange={onChangeLastName}
          useValidation
          isValid={!!lastName}
          errorMessage="need lastName"
        />
      </div>
      <div className="input-wrapper">
        <Input 
          placeholder="First name" 
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
          useValidation
          isValid={!!firstName}
          errorMessage="need firstName"
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
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage="need password"
          onFocus={onFocusPassword}
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning 
            isValid={isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 반드시 포함하세요"
            />
          <PasswordWarning
            isValid={!isPasswordOverMinLength}
            text="비밀번호는 최소 8자리로 입력하세요."
          />
        </>
      )}
      <p className="sign-up-birthday-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. <br />
        생일은 다른 에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector 
            options={monthList}
            disabledOptions={disabledMonths}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector 
            options={dayList}
            disabledOptions={disabledDays}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector 
            options={yearList}
            disabledOptions={disabledYears}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">
          Sign Up
        </Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span 
          className="sign-up-modal-set-login" 
          role="presentation" 
          onClick={changeToLoginModal}
        >
          로그인
        </span>
      </p>
    </Container>
  ) 
};

export default SignUpModal;