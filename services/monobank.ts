import axios from "axios";
import { toast } from "react-toastify";

interface createInvoiceProps {
    amount: number;
    merchantPaymInfo: {
        basketOrder: {
            name: string;
            qty: number;
            sum: number
            code: string
            icon?: string;
        }[]
    }
    redirectUrl: string;
    webHookUrl: string;
}

interface ApiResponse {
    invoiceId: string;
    pageUrl: string;
    }

export const monobankUrl = axios.create({
    baseURL: process.env.MONO_URL,
  });

  export const createInvoice = async (body: createInvoiceProps): Promise<ApiResponse | undefined> => {
    try {
        
        const resonce = await monobankUrl.post<ApiResponse>(`api/merchant/invoice/create`, body, {
            headers: {
                "X-Token": process.env.TOKEN_MONO,
                "Content-Type": "application/json"
        
            }
        });

        console.log(resonce);
        
        return resonce.data;
    } catch (error) {
        toast.error('Something went wrong...');
        return undefined;
    }
}
