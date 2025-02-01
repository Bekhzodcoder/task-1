import { message, Modal, Input } from "antd";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Company from "../services/company";
import { ModalComponentProps } from "../types/type";

const ModalPutComponent: React.FC<ModalComponentProps> = ({
  open,
  setOpen,
  refetch,
  editData,
}) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [employeeCount, setEmployeeCount] = useState<number | null>(null);
  const [errorFields, setErrorFields] = useState({ company: false, count: false });

  useEffect(() => {
    if (editData) {
      setCompanyName(editData.name);
      setEmployeeCount(editData.count);
    }
  }, [editData]);

  const { user } = useSelector((state: RootState) => state.auth);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error("Token mavjud emas!");
      return await Company.put( { id, name: companyName, count: Number(employeeCount) }, String(user));
    },
    onSuccess: () => {
      message.success("Компания успешно обновлена!");
      setOpen(false); 
      setCompanyName("");
      setEmployeeCount(null);
      refetch();
      setErrorFields({ company: false, count: false });
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Ошибка!");
    },
  });

  const handleOk = () => {
    if (!companyName.trim() || employeeCount === null || isNaN(employeeCount)) {
      setErrorFields({
        company: !companyName.trim(),
        count: employeeCount === null || isNaN(employeeCount),
      });

      message.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    mutate(String(editData?.id));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (!editData) {
    return null;
  }

  return (
    <Modal
      title=""
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={isLoading ? "Обновление..." : "Обновить компанию"}
      cancelText="Отмена"
      confirmLoading={isLoading}
      className="rounded-[2px]"
    >
      <h1 className="text-2xl font-semibold mb-4 px-[20px] py-[20px]">Редактировать компанию</h1>
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
            className="w-[50%] rounded-[4px]"
            value={employeeCount ?? ""}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            placeholder="Введите количество"
            status={errorFields.count ? "error" : ""}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalPutComponent;
