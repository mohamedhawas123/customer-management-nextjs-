import { baseUrl } from "@/constant/constant";
import { validateEmail, validatePhoneNumber } from "@/validation/errorValidation";
import router from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type CreateCustomerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateCustomerDialog: React.FC<CreateCustomerDialogProps> = ({ isOpen, onClose }) => {
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email" && value && !validateEmail(value)) {
      error = "Invalid email format";
    } else if (name === "phoneNumber" && value && !validatePhoneNumber(value)) {
      error = "Phone number must start with '+' and include digits only";
    }

    setNewCustomer({ ...newCustomer, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  
  //create customer
  const handleCreate = async () => {
    try {
      const response = await fetch(`${baseUrl}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        toast.success("Successfully created customer", {
          position: "top-right",
          autoClose: 3000,
        });
        const data = await response.json()
        const {id} = data
        router.push(`/${id}`)
        onClose();
      }
    } catch (e) {
      toast.error("Error at creating a new Customer", {
        position: "top-right",
        autoClose: 3000,
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "") || Object.values(newCustomer).some((value) => value === "");
  };

  return (
    isOpen && (
      <>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Create Customer</h2>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={newCustomer.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={newCustomer.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Email</label>
              <input
                type="text"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={newCustomer.email}
                onChange={handleChange}
              />
              {errors.email && (
              <div className="text-red-500 mt-1">{errors.email}</div>
            )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={newCustomer.phoneNumber}
                onChange={handleChange}
              />
               {errors.phoneNumber && (
              <div className="text-red-500 mt-1">{errors.phoneNumber}</div>
            )}
            </div>
            <div className="mb-4">
              <button
                type="button"
                className={`bg-blue-500 text-white py-2 px-4 mr-2 rounded-md ${hasErrors() ? 'disabled:opacity-50' : ''}`}
                onClick={handleCreate}
                disabled={hasErrors()}
              >
                Create
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-600 py-2 px-4 rounded-md"
                onClick={handleClose}
               
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        
      </>
    )
  );
};
