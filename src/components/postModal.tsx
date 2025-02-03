import { message, Modal, Input } from "antd";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Company from "../services/company";
import { ModalComponentProps } from "../types/type";

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  setOpen,
  refetch,
}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [employeeCount, setEmployeeCount] = useState<number | undefined>(
    undefined
  );
  const [errorFields, setErrorFields] = useState({
    company: false,
    count: false,
  });

  const { user } = useSelector((state: RootState) => state.auth);

  // React Query mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Токен недоступен!");
      return await Company.post(
        { name: companyName, count: employeeCount || 0 },
        String(user)
      );
    },
    onSuccess: () => {
      message.success("Компания успешно добавлена!");
      setOpen(false);
      setCompanyName("");
      setEmployeeCount(undefined); // Reset employee count to undefined
      refetch();
      setErrorFields({ company: false, count: false });
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Ошибка!");
    },
  });

  const handleOk = () => {
    if (
      !companyName.trim() ||
      employeeCount === undefined ||
      isNaN(employeeCount)
    ) {
      setErrorFields({
        company: !companyName.trim(),
        count: employeeCount === undefined || isNaN(employeeCount),
      });

      message.error("Заполните все поля!");
      return;
    }

    mutate();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title=""
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={isLoading ? "Добавление..." : "Добавить компанию"}
      cancelText="Отмена"
      confirmLoading={isLoading}
      className="rounded-[2px]"
    >
      <h1 className="text-2xl font-semibold mb-4 px-[20px] py-[20px]">Добавить компанию</h1>
      <div className="space-y-4 mt-[20px] border-b border-t border-gray-300">
        <div className="space-y-2 flex items-center justify-between px-[20px] pt-[20px]">
          <label className="block text-[15px]">Названия компании</label>
          <Input
            value={companyName}
            className="w-[50%] rounded-[4px]"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Введите названия"
            status={errorFields.company ? "error" : ""}
          />
        </div>

        <div className="space-y-2 flex items-center justify-between px-[20px] pb-[20px]">
          <label className="block text-[15px]">
            Количество сотрудников
          </label>
          <Input
            type="number"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            placeholder="Введите количество"
            className="w-[50%] rounded-[4px]"
            status={errorFields.count ? "error" : ""}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;