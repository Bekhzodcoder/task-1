import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./postModal";
const Navbar = ({ refetch }) => {
    const [open, setOpen] = useState(false);
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
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "bg-[#313131] py-[20px] px-[10px] mb-[30px]", children: _jsxs("div", { className: "flex items-center justify-between gap-[20px] flex-wrap xl:max-w-[1600px] mx-auto", children: [_jsx("h1", { className: "text-2xl font-semibold text-[#fff]", children: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsxs("div", { className: "flex items-center gap-[20px]", children: [_jsx("button", { onClick: logoutHandler, className: "rotate-[180deg] text-white", children: _jsx(LogoutOutlined, { className: "text-white text-[25px]" }) }), _jsx("button", { onClick: showModal, className: "flex items-center px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 transition-colors", children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F" })] })] }) }), _jsx(ModalComponent, { open: open, setOpen: setOpen, refetch: refetch })] }));
};
export default Navbar;
