export interface Customer {
    id: number; 
    firstName: string; 
    lastName: string;
    email: string; 
    phoneNumber: string; 
    createdAt: Date; 
    updatedAt: Date; 
}

export type CustomersType = {
    data: Customer[];
    totalPages: number;
    error: string;
  };
  

export type CustomerType=  {
    data: Customer;
    error:string
}

export type RootState = {
    isSignedIn: boolean;
  };

