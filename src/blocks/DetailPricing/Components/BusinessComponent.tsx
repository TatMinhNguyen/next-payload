"use client";

import Button from "@/common/Button";
import { useState } from "react";

type Props = {

}

type FormData = {
  name: string;
  phone: string;
  email: string;
};

export const BusinessComponent = ({ }: Props) => {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", form);
    // 👉 TODO: gọi API gửi dữ liệu
  };
  return (
    <div className="max-w-[496px] mx-auto bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-2xl p-6 text-center">
      <p className="mb-6 loading-[24px]">
        Quý khách vui lòng điền thông tin, đội ngũ Clickee sẽ nhanh chóng liên hệ và hỗ trợ tư vấn.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên liên hệ"
          className="w-full py-4 px-6 rounded-2xl bg-violet-100 outline-none focus:ring-1 focus:ring-violet-500"
        />

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="w-full py-4 px-6 rounded-2xl bg-violet-100 outline-none focus:ring-1 focus:ring-violet-500"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full py-4 px-6 rounded-2xl bg-violet-100 outline-none focus:ring-1 focus:ring-violet-500"
        />

        <Button
          type="submit"
          className="max-w-[200px] w-[100%] font-semibold transition"
          size="md"
          variant="navy"
        >
          GỬI
        </Button>
      </form>
    </div>
  );
}