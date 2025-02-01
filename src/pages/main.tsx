import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Company from "../services/company";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ModalDeleteComponent, ModalPutComponent, Navbar } from "../components";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Spin } from "antd";
import { CompanyData } from "../types/type";


const Main: React.FC = () => {
  const [openPut, setOpenPut] = useState<boolean>(false);
  const [editData, setEditData] = useState<CompanyData>();

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);

  const handleEdit = (company: CompanyData) => {
    setOpenPut(true);
    setEditData(company);
  };

  const handleDelete = (company: CompanyData) => {
    setOpenDelete(true);
    setDeleteId(company.id);
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["companies", search],
    () => Company.get(String(user), search),
    {
      keepPreviousData: true,
    }
  );

  const menu = (company: CompanyData) => (
    <Menu items={[
      {
        key: "1",
        label: (
          <div className="flex flex-col gap-[10px]">
            <button onClick={() => handleEdit(company)}>
              <EditOutlined />
              <span>Изменить</span>
            </button>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div className="flex flex-col gap-[10px] text-red-500">
            <button onClick={() => handleDelete(company)}>
              <DeleteOutlined />
              <span>Удалить</span>
            </button>
          </div>
        ),
      },
    ]} />
  );
  

  if(isLoading) return <Spin />;
  if(isError) return <h1>Произошла ошибка</h1>;

  return (
    <>
      <Navbar refetch={refetch} />

      <div className="xl:max-w-[1600px] mx-auto px-[10px]">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-[300px] mb-[20px] rounded-lg outline-none"
        />
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-3">Названия компании</th>
                <th className="text-left px-6 py-3">Количество сотрудников</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map((company: CompanyData) => (
                  <tr key={company.id} className="border-b last:border-b-0">
                    <td className="px-6 py-4">{company.name}</td>
                    <td className="px-6 py-4">{company.count} человек</td>
                    <td>
                      <Dropdown overlay={menu(company)} trigger={["click"]}>
                        <MoreOutlined className="cursor-pointer" />
                      </Dropdown>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <ModalPutComponent open={openPut} setOpen={setOpenPut} refetch={refetch} editData={editData} />
      <ModalDeleteComponent open={openDelete} setOpen={setOpenDelete} refetch={refetch} id={deleteId} />
    </>
  );
};

export default Main;
