import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth";
const SignUp = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate, isLoading, error } = useMutation({
        mutationFn: async (values) => {
            return await AuthService.userRegister(values);
        },
        onSuccess: () => {
            message.success("Ro'yxatdan o'tish muvaffaqiyatli!");
            navigate("/sign-in");
        },
        onError: (err) => {
            message.error(err.response?.data?.message || "Xatolik yuz berdi!");
        },
    });
    const onFinish = (values) => {
        mutate(values);
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 sign", children: _jsxs(Card, { className: "w-full max-w-md shadow-xl rounded-[6px] mx-[15px]", children: [_jsx("h1", { className: "text-[36px] font-bold px-[20px] mb-[15px]", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), _jsxs(Form, { form: form, name: "register", onFinish: onFinish, layout: "vertical", size: "large", children: [_jsx(Form.Item, { name: "fullName", label: "\u0424.\u0418.\u041E", className: "px-[20px]", rules: [{ required: true, message: "Пожалуйста, введите Ф.И.О" }], children: _jsx(Input, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0424.\u0418.\u041E" }) }), _jsx(Form.Item, { name: "login", label: "\u041B\u043E\u0433\u0438\u043D", className: "px-[20px]", rules: [{ required: true, message: "Пожалуйста, введите логин" }], children: _jsx(Input, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D" }) }), _jsx(Form.Item, { name: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C", className: "px-[20px]", rules: [{ required: true, message: "Пожалуйста, введите пароль" }], children: _jsx(Input.Password, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" }) }), error && _jsx("p", { className: "text-red-500", children: error.response?.data?.message || "Xatolik yuz berdi!" }), _jsx("div", { className: "flex justify-between items-center my-[20px] px-[20px] mt-[30px] mb-[20px]", children: _jsx(Link, { to: "/sign-in", className: "text-blue-500 hover:text-blue-600 text-[17px]", children: "\u0412\u0445\u043E\u0434" }) }), _jsx(Form.Item, { className: "flex items-center justify-center border-t-2 border-gray-300 mb-[10px]", children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-fit h-[40px] bg-[#7CB305] px-[30px] mt-[15px]", loading: isLoading, children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }) })] })] }) }));
};
export default SignUp;
