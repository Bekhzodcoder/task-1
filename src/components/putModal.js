import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { message, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Company from "../services/company";
const ModalPutComponent = ({ open, setOpen, refetch, editData, }) => {
    const [companyName, setCompanyName] = useState('');
    const [employeeCount, setEmployeeCount] = useState(null);
    const [errorFields, setErrorFields] = useState({ company: false, count: false });
    useEffect(() => {
        if (editData) {
            setCompanyName(editData.name);
            setEmployeeCount(editData.count);
        }
    }, [editData]);
    const { user } = useSelector((state) => state.auth);
    const { mutate, isLoading } = useMutation({
        mutationFn: async (id) => {
            if (!user)
                throw new Error("Token mavjud emas!");
            return await Company.put({ id, name: companyName, count: Number(employeeCount) }, String(user));
        },
        onSuccess: () => {
            message.success("Компания успешно обновлена!");
            setOpen(false);
            setCompanyName("");
            setEmployeeCount(null);
            refetch();
            setErrorFields({ company: false, count: false });
        },
        onError: (err) => {
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
    return (_jsxs(Modal, { title: "", open: open, onOk: handleOk, onCancel: handleCancel, okText: isLoading ? "Обновление..." : "Обновить компанию", cancelText: "\u041E\u0442\u043C\u0435\u043D\u0430", confirmLoading: isLoading, className: "rounded-[2px]", children: [_jsx("h1", { className: "text-2xl font-semibold mb-4 px-[20px] py-[20px]", children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E" }), _jsxs("div", { className: "space-y-4 mt-[20px] border-b border-t border-gray-300", children: [_jsxs("div", { className: "space-y-2 flex items-center justify-between px-[20px] pt-[20px]", children: [_jsx("label", { className: "block text-[15px]", children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsx(Input, { value: companyName, className: "w-[50%] rounded-[4px]", onChange: (e) => setCompanyName(e.target.value), placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F", status: errorFields.company ? "error" : "" })] }), _jsxs("div", { className: "space-y-2 flex items-center justify-between px-[20px] pb-[20px]", children: [_jsx("label", { className: "block text-[15px]", children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432" }), _jsx(Input, { type: "number", className: "w-[50%] rounded-[4px]", value: employeeCount ?? "", onChange: (e) => setEmployeeCount(Number(e.target.value)), placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E", status: errorFields.count ? "error" : "" })] })] })] }));
};
export default ModalPutComponent;
