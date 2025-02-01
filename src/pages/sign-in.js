import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserFailure, loginUserStart, loginUserSuccess } from "../slice/auth";
import AuthService from "../services/auth";
const SignIn = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { isLoading, loggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        dispatch(loginUserStart());
        try {
            const response = await AuthService.userLogin(values);
            dispatch(loginUserSuccess(response));
            navigate("/");
        }
        catch (error) {
            if (error instanceof Error) {
                dispatch(loginUserFailure(error.message));
            }
            else {
                dispatch(loginUserFailure("Kechirasiz xatolik sodir bo'ldi"));
            }
        }
    };
    useEffect(() => {
        if (loggedIn)
            navigate("/");
    }, [loggedIn]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 sign", children: _jsxs(Card, { className: "w-full max-w-md px-0 py-0 mx-[15px] rounded-[6px]", children: [_jsx("h1", { className: "text-[36px] font-bold px-[20px] mb-[15px]", children: "\u0412\u0445\u043E\u0434" }), _jsxs(Form, { form: form, name: "login", onFinish: onFinish, layout: "vertical", size: "large", children: [_jsx(Form.Item, { name: "login", label: "\u041B\u043E\u0433\u0438\u043D", className: "px-[20px]", rules: [{ required: true, message: "Пожалуйста, введите логин" }], children: _jsx(Input, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D", className: "rounded-[5px]" }) }), _jsx(Form.Item, { name: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C", className: "px-[20px]", rules: [{ required: true, message: "Пожалуйста, введите пароль" }], children: _jsx(Input.Password, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", className: "rounded-[5px]" }) }), _jsx("div", { className: "flex justify-between items-center mt-[30px] mb-[20px] px-[20px]", children: _jsx(Link, { to: "/sign-up", className: "text-blue-500 hover:text-blue-600 text-[17px]", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }) }), _jsx(Form.Item, { className: "flex justify-center items-center border-t-2 border-gray-300 mb-[10px]", children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-fit bg-[#7CB305] h-[40px] mt-[10px] px-[20px]", loading: isLoading, children: "\u0412\u0445\u043E\u0434" }) })] })] }) }));
};
export default SignIn;
