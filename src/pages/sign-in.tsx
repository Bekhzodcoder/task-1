
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
    console.log("Foydalanuvchi ma'lumotlari:", values);

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
      <Card className="w-full max-w-md shadow-xl">
        <h1 className="text-[36px] font-bold">Вход</h1>
        <Form form={form} name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="login"
            label="Логин"
            rules={[{ required: true, message: "Пожалуйста, введите логин" }]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <div className="flex justify-between items-center my-[20px]">
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-600">
              Регистрация
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              style={{
                backgroundColor: "#7CB305",
                height: "40px",
              }}
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
