import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./postModal";

interface NavbarProps {
  refetch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ refetch }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const logoutHandler = async () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    dispatch(logoutUser());
  };

  return (
    <>
      <header className="bg-[#313131] py-[20px] px-[10px] mb-[30px]">
        <div className="flex items-center justify-between xl:max-w-[1600px] mx-auto">
          <h1 className="text-2xl font-semibold text-[#fff]">Компании</h1>
          <div className="flex items-center gap-[20px]">
            <button
              onClick={logoutHandler}
              className="rotate-[180deg] text-white"
            >
              <LogoutOutlined className="text-white text-[25px]" />
            </button>
            <button
              onClick={showModal}
              className="flex items-center px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 transition-colors"
            >
              Добавить компания
            </button>
          </div>
        </div>
      </header>

      <ModalComponent open={open} setOpen={setOpen} refetch={refetch} />
    </>
  );
};

export default Navbar;
