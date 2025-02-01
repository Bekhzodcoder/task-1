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
      if (!user) throw new Error("Token mavjud emas!");
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

      message.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    mutate();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Добавить компанию"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={isLoading ? "Добавление..." : "Добавить компанию"}
      cancelText="Отмена"
      confirmLoading={isLoading}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Названия компании</label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Введите названия"
            status={errorFields.company ? "error" : ""}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Количество сотрудников
          </label>
          <Input
            type="number"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            placeholder="Введите количество"
            status={errorFields.count ? "error" : ""}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
