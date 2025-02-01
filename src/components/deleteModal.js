import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { message, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Company from "../services/company";
import { InfoCircleOutlined } from "@ant-design/icons";
const ModalDeleteComponent = ({ open, setOpen, refetch, id }) => {
    const { user } = useSelector((state) => state.auth);
    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            if (!user)
                throw new Error("Token mavjud emas!");
            return await Company.delete(String(id), String(user));
        },
        onSuccess: () => {
            message.success("Компания делете!");
            setOpen(false);
            refetch();
        },
        onError: (err) => {
            message.error(err.response?.data?.message || "Ошибка!");
        },
    });
    const handleOk = () => {
        mutate();
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (_jsx(Modal, { title: "", open: open, onOk: handleOk, onCancel: handleCancel, okText: isLoading ? "Загрузка..." : "Да", cancelText: "\u041D\u0435\u0442", confirmLoading: isLoading, children: _jsxs("div", { className: "flex items-center gap-[10px] text-[20px] p-[20px]", children: [_jsx(InfoCircleOutlined, { className: "text-yellow-500" }), _jsx("p", { className: "text-[20px]", children: "\u0412\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C?" })] }) }));
};
export default ModalDeleteComponent;
