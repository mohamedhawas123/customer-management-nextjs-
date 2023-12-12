import Link from "next/link"
import { useEffect, useState } from "react";
import {CreateCustomerDialog} from "./createCustomerDialog";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/models/customer";

export const Header = ()=> {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter()
    

    const isLoggedIn = useSelector((state:RootState)=> state.isSignedIn)
    
    

    useEffect(()=> {
    if(isLoggedIn !=null) {
      dispatch({type: 'SIGN_IN'})
    }else {
        dispatch({type: 'SIGN_OUT'})

    }
    }, [])
    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
        router.push("/")
    };

    const handleSignout = async () => {
        await localStorage.removeItem("user")
        dispatch({type: 'SIGN_OUT'})
        router.push("/auth")

    }

    
    return (
        <>
        {isDialogOpen && (
        <CreateCustomerDialog isOpen={isDialogOpen} onClose={closeDialog} />
      )}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="text-xl font-semibold">Customer Management</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <li>
                    <button className="hover:text-blue-300" onClick={openDialog}>
                      <i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>
                      Create
                    </button>
                  </li>
                  <li>
                    <button onClick={handleSignout} className="hover:text-blue-300">
                      <i className="fa fa-sign-out mr-2" aria-hidden="true"></i>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : null}
            </ul>
          </nav>
        </div>
      </header>
        </>
        
    )
}