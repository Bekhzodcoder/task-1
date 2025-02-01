
import React, { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { loginUserFailure, loginUserStart, loginUserSuccess } from "../slice/auth";
import AuthService from "../services/auth";
import { LoginFormData } from "../types/type";



const SignIn: React.FC = () => {
  const [form] = Form.useForm<LoginFormData>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, loggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const onFinish = async(values: LoginFormData) => {
    dispatch(loginUserStart());

    try {
        const response = await AuthService.userLogin(values);
        dispatch(loginUserSuccess(response));
        navigate("/");
    } catch (error) {
        if (error instanceof Error) {
          dispatch(loginUserFailure(error.message));
        } else {
          dispatch(loginUserFailure("Kechirasiz xatolik sodir bo'ldi"));
        }
      }
  };

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 sign">
      <Card className="w-full max-w-md px-0 py-0 rounded-[6px]">

        <h1 className="text-[36px] font-bold px-[20px] mb-[15px]">Вход</h1>
        <Form form={form} name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="login"
            label="Логин"
            className="px-[20px]"
            rules={[{ required: true, message: "Пожалуйста, введите логин" }]}
          >
            <Input placeholder="Введите логин" className="rounded-[5px]" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            className="px-[20px]"
            rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
          >
            <Input.Password placeholder="Введите пароль" className="rounded-[5px]" />
          </Form.Item>

          <div className="flex justify-between items-center mt-[30px] mb-[20px] px-[20px]">
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-600 text-[17px]">
              Регистрация
            </Link>
          </div>

          <Form.Item className="flex justify-center items-center border-t-2 border-gray-300 mb-[10px]">
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit bg-[#7CB305] h-[40px] mt-[10px] px-[20px]"
              loading={isLoading}
            >
              Вход
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
