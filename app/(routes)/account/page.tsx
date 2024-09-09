import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import axios from "axios";
import AccountMobileNavigation from "./_components/account-mobile-navigation";
import AccountDescNavigation from "./_components/account-desc-navigation";

const AccountPage = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value;

 if(!token){
  return redirect('/')
 }

 axios.defaults.headers.common.Authorization = `Bearer ${token}` 

 const {data} = await axios.get(`${process.env.SERVER_URL}api/auth/current`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
 }) 

 const {data: ordersByUser} = await axios.get(`${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/orders?userEmail=${data?.user?.email}`);

  return (
    <div className="container pt-[10px] pb-[30px] lg:pt-[30px]">
   
      <AccountMobileNavigation token={token} user={data.user} ordersByUser={ordersByUser?.orders}/>
        <AccountDescNavigation token={token} user={data.user} ordersByUser={ordersByUser?.orders}/>
    </div>
  )
}

export default AccountPage
