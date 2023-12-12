import { baseUrl } from "@/constant/constant";
import { CustomerType } from "@/models/customer"
import { useRouter } from "next/router"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const CustomerDetails = ({data, error}: CustomerType) => {

    const [editedData, setEditedData] = useState(data);
    const router = useRouter();
    const { customerId } = router.query;

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };
    const refreshPage = () => {
      router.replace(router.asPath);
    };

    const handleSave = async() => {
        try{

            const response = await fetch(`${baseUrl}/customer/${customerId}`, {
                method: 'PATCH',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(editedData)
            })
            if(response.ok){
                const updatedData = await response.json();
                setEditedData(updatedData)
                toast.success("Customer data updated successfully", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                  refreshPage()

            }else{
                console.error(`Failed to update customer data ${response}`);
                toast.error("Failed to update customer data", {
                    position: "top-right",
                    autoClose: 3000,
                  });
            }

        }catch(e){
            console.log(`An Error occurred ${e}`)
        }
    };

    const handleCancel = () => {
        setEditedData(data);
    };

    return (
    
            <div>
                <ToastContainer />
              {error ? (
                <div className="bg-red-500 text-white p-4">
                  An error occurred: {error}
                </div>
              ) : (
                <form className="bg-white p-6 shadow-md rounded-md">
                  <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      name="firstName"
                      value={editedData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      value={editedData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      value={editedData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      value={editedData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    
                    <div className="mb-4">
                        <button
                        type="button"
                        className="bg-blue-500 text-white py-2 px-4 mr-2 rounded-md"
                        
                        onClick={handleSave}
                        >
                        Save
                        </button>
                        <button
                        type="button"
                        className="bg-gray-300 text-gray-600 py-2 px-4 rounded-md"
                        onClick={handleCancel}
                        >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          
    )
}


export async function getServerSideProps(context:any) {
    const {customerId} = context.query

    try{

        const res =await fetch(`${baseUrl}/customer/${customerId}`)
        const data = await res.json()
        return {props:{data}}

    }catch(e) {
        return {props:{
            error: e
        }}
    }

}

export default CustomerDetails