import { message, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Company from "../services/company";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ModalComponentProps } from "../types/type";

const ModalDeleteComponent: React.FC<ModalComponentProps> = ({ open, setOpen, refetch, id }) => {

  const { user } = useSelector((state: RootState) => state.auth);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Token mavjud emas!");
      return await Company.delete(
        id,
        String(user)
      );
    },
    onSuccess: () => {
      message.success("Компания делете!");
      setOpen(false); 
      refetch();
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Ошибка!");
    },
  });

  const handleOk = () => {
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
      okText={isLoading ? "Загрузка..." : "Да"}
      cancelText="Нет"
      confirmLoading={isLoading}
    >
      <div className="flex items-center gap-[10px] text-[20px]">
      <InfoCircleOutlined className="text-yellow-500" />
      <p>Вы хотите удалить?</p>
      </div>
    </Modal>
  );
};

export default ModalDeleteComponent;
