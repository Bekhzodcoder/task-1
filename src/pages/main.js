import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModalDeleteComponent, ModalPutComponent, Navbar } from "../components";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Spin } from "antd";
import Company from "../services/company";
import { useSelector } from "react-redux";
const Main = () => {
    const [openPut, setOpenPut] = useState(false);
    const [editData, setEditData] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => state.auth);
    const handleEdit = (company) => {
        setOpenPut(true);
        setEditData(company);
    };
    const handleDelete = (company) => {
        setOpenDelete(true);
        setDeleteId(company?.id ?? "");
    };
    const { data, isLoading, isError, refetch } = useQuery(["companies", search], () => Company.get(String(user), search), {
        keepPreviousData: true,
    });
    const menu = (company) => (_jsx(Menu, { items: [
            {
                key: "1",
                label: (_jsx("div", { children: _jsxs("button", { onClick: () => handleEdit(company), className: "flex items-center gap-[10px]", children: [_jsx(EditOutlined, {}), _jsx("span", { children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C" })] }) })),
            },
            {
                key: "2",
                label: (_jsx("div", { children: _jsxs("button", { onClick: () => handleDelete(company), className: "flex items-center gap-[10px] text-red-500", children: [_jsx(DeleteOutlined, {}), _jsx("span", { children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }) })),
            },
        ] }));
    if (isLoading)
        return _jsx("div", { className: "flex items-center justify-center", children: _jsx(Spin, {}) });
    if (isError)
        return _jsx("h1", { className: "flex items-center justify-center", children: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430" });
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, { refetch: refetch }), _jsxs("div", { className: "xl:max-w-[1600px] mx-auto px-[10px]", children: [_jsx("input", { type: "text", placeholder: "\u041F\u043E\u0438\u0441\u043A...", value: search, onChange: (e) => setSearch(e.target.value), className: "border p-2 w-[300px] mb-[20px] rounded-lg outline-none" }), _jsx("div", { className: "border rounded-lg overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 border-b", children: [_jsx("th", { className: "text-left px-6 py-3", children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsx("th", { className: "text-left px-6 py-3", children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data?.map((company) => (_jsxs("tr", { className: "border-b last:border-b-0", children: [_jsx("td", { className: "px-6 py-4", children: company.name }), _jsxs("td", { className: "px-6 py-4", children: [company.count, " \u0447\u0435\u043B\u043E\u0432\u0435\u043A"] }), _jsx("td", { children: _jsx(Dropdown, { overlay: menu(company), trigger: ["click"], children: _jsx(MoreOutlined, { className: "cursor-pointer" }) }) })] }, company.id))) })] }) })] }), _jsx(ModalPutComponent, { open: openPut, setOpen: setOpenPut, refetch: refetch, editData: editData }), _jsx(ModalDeleteComponent, { open: openDelete, setOpen: setOpenDelete, refetch: refetch, id: deleteId })] }));
};
export default Main;
