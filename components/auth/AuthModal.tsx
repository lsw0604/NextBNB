import React from "react";
import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store";

interface IProps {
  closeModal: () => void;
};

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <div>
      {authMode === "signup" && <SignUpModal closeModal={closeModal}/>}
      {authMode === "login" && <div>Login</div>}
    </div>
  );
};

export default AuthModal;