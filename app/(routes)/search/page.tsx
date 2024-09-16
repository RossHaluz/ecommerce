import Section from '@/components/section'
import axios from 'axios'
import { cookies } from 'next/headers';

const SearchPage = async () => {
const cokieStore = cookies();
const searchValue = cokieStore.get('searchValue')?.value;

console.log('searchValue', searchValue);


    const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products`
      );

      
  return (
    <Section title={`Результати пошуку: ${searchValue}`}>
     <></>
    </Section>
  )
}

export default SearchPage
