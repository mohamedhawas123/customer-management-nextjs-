import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Customer, CustomersType, RootState } from '@/models/customer'
import Link from 'next/link';
import { baseUrl } from '@/constant/constant';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import SearchInput from '@/components/searchComponent';
import CustomerTable from '@/components/customerComponent';




export default function Home({data, totalPages, error}: CustomersType) {

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedCustomerID, setSelectedCustomerID] = useState(0)
  const handleDeleteClick = (customerId:number) => {
    setSelectedCustomerID(customerId)
    setShowDeleteConfirmation(true);
  };
  const router = useRouter()
  const [initaldata, setInitalData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const isLogged = useSelector((state:RootState)=> state.isSignedIn)
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserame] = useState("")


  //get data with pagination and search
  const fetchData = async (page: number, searchTerm: string = '') => {
    try {
      const query = searchTerm ? `&keyword=${encodeURIComponent(searchTerm)}` : '';
      const response = await fetch(`${baseUrl}/customer?page=${page}${query}`);
      if (response.ok) {
        const newData = await response.json();
        setInitalData(newData.customers);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=> {
    if(isLogged ==null) {
      router.push("/auth")
    }
    fetchData(currentPage, searchTerm);
    const user = JSON.parse(localStorage.getItem("user") ?? "null")
    setUserame(user.username)

  },[searchTerm])

  //export csv
  const exportToExcel = (data:any, fileName:any) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    XLSX.writeFile(wb, fileName + ".xlsx");
  };

  

  //pagination function 
  const handlePageChange = (newPage:number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchData(newPage, searchTerm);
    }
  };

  // delete customer dialog
  const handleConfirmDelete = async () => {
    try{
      const response = await fetch(`${baseUrl}/customer/${selectedCustomerID}`, {
        method: 'DELETE',
        headers:{
          "Content-Type": "application/json"
        },
      })
      if(response.ok) {
        toast.success("Customer deleted successfully")
        fetchData(currentPage);

      }
    }
    catch(e) {
      toast.error("error at delete")
    }
    setShowDeleteConfirmation(false);
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

    
    {showDeleteConfirmation && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
      <p className="text-lg text-gray-800 mb-4">
        Are you sure you want to delete this customer?
      </p>
      <div className="flex justify-end">
        <button
          onClick={handleConfirmDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Yes
        </button>
        <button
          onClick={handleCancelDelete}
          className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}
      
     
      <div className="container mx-auto py-6 ">
      <SearchInput  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 className="text-2xl font-semibold mb-6">Welcome {userName}</h1>
      <button
      className="px-4 py-3 bg-green-500 text-white  rounded-md hover:bg-green-600 export"
      onClick={() => exportToExcel(initaldata, 'customers')}>
      Export to Excel
    </button>
    <CustomerTable initialData={initaldata} handleDeleteClick={handleDeleteClick} />

      </div>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

    </>
    
  );
}


export async function getServerSideProps(context:any) {
  const page = context.query.page || 1;

  try {
    const res = await fetch(`${baseUrl}/customer?page=${page}`);
    const { customers, totalPages } = await res.json(); 
    return { props: { data: customers, totalPages } };   
  } catch (e) {
    console.error(e); 
    return { props: { error: 'Failed to fetch data' } };
  }
}
