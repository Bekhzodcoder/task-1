
import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth";
import { SignUpFormData } from "../types/type";

const SignUp: React.FC = () => {
  const [form] = Form.useForm<SignUpFormData>();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (values: SignUpFormData) => {
      return await AuthService.userRegister(values);
    },
    onSuccess: () => {
      message.success("Ro'yxatdan o'tish muvaffaqiyatli!");
      navigate("/sign-in");
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Xatolik yuz berdi!");
    },
  });

  const onFinish = (values: SignUpFormData) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 sign">
      <Card className="w-full max-w-md shadow-xl rounded-[6px] mx-[15px]">
        <h1 className="text-[36px] font-bold px-[20px] mb-[15px]">Регистрация</h1>
        <Form form={form} name="register" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item name="fullName" label="Ф.И.О" className="px-[20px]" rules={[{ required: true, message: "Пожалуйста, введите Ф.И.О" }]}>
            <Input placeholder="Введите Ф.И.О" />
          </Form.Item>

          <Form.Item name="login" label="Логин" className="px-[20px]" rules={[{ required: true, message: "Пожалуйста, введите логин" }]}>
            <Input placeholder="Введите логин" />
          </Form.Item>

          <Form.Item name="password" label="Пароль" className="px-[20px]" rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}>
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          {error && <p className="text-red-500">{(error as any).response?.data?.message || "Xatolik yuz berdi!"}</p>}

          <div className="flex justify-between items-center my-[20px] px-[20px] mt-[30px] mb-[20px]">
            <Link to="/sign-in" className="text-blue-500 hover:text-blue-600 text-[17px]">
              Вход
            </Link>
          </div>

          <Form.Item className="flex items-center justify-center border-t-2 border-gray-300 mb-[10px]">
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit h-[40px] bg-[#7CB305] px-[30px] mt-[15px]"
              loading={isLoading}
            >
              Регистрация
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
