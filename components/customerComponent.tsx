import { Customer } from "@/models/customer";
import Link from "next/link";

interface Props {
    initialData: Customer[];
    handleDeleteClick: (id: number) => void;
  }
  
  const CustomerTable: React.FC<Props> = ({ initialData, handleDeleteClick }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200">ID</th>
              <th className="px-4 py-2 bg-gray-200">First Name</th>
              <th className="px-4 py-2 bg-gray-200">Last Name</th>
              <th className="px-4 py-2 bg-gray-200">Email</th>
              <th className="px-4 py-2 bg-gray-200">Phone Number</th>
              <th className="px-4 py-2 bg-gray-200">Created At</th>
              <th className="px-4 py-2 bg-gray-200">Updated At</th>
              <th className="px-4 py-2 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((customer) => (
              <tr key={customer.id}>
                <td className="border px-4 py-2">{customer.id}</td>
                <td className="border px-4 py-2">{customer.firstName}</td>
                <td className="border px-4 py-2">{customer.lastName}</td>
                <td className="border px-4 py-2">{customer.email}</td>
                <td className="border px-4 py-2">{customer.phoneNumber}</td>
                <td className="border px-4 py-2">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(customer.updatedAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <Link href={`/${customer.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                    <button className="mr-2 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2.75 2a2.75 2.75 0 012.75 2.75v11.5a2.75 2.75 0 01-2.75 2.75h-7.5a2.75 2.75 0 01-2.75-2.75v-11.5a2.75 2.75 0 012.75-2.75h7.5zm13.61 7.19a1 1 0 010 1.41l-2 2a1 1 0 01-1.41 0L7 10.41l-1.18 1.18a1 1 0 01-1.41-1.41L5.59 9 4.41 7.82a1 1 0 111.41-1.41L7 7.59l1.18-1.18a1 1 0 011.41 1.41L8.41 9l1.18 1.18a1 1 0 01-.98 1.01 1 1 0 01-.43-.1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Edit
                    </button>
                  </Link>
  
                  <button className="text-red-500" onClick={() => handleDeleteClick(customer.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CustomerTable;
  