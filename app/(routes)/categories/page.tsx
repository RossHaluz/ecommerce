import Section from '@/components/section'
import axios from 'axios'
import React from 'react'
import Categories from './_components/categories';

const CategoriesPage = async () => {
    const { data: categories } = await axios.get(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/categories/all`
      );

      
  return (
    <Section title='Категорії'>
      <Categories categories={categories}/>
    </Section>
  )
}

export default CategoriesPage
