import React, { FC } from 'react'

interface ProductCharacteristicsProps {
  productCharacteristics: {
    id: string;
    name: string;
    characteristic: {
      name: string;
    }
  }[]
}

const ProductCharacteristics: FC<ProductCharacteristicsProps> = ({productCharacteristics}) => {
  return (
    <table className="table-auto w-full border-collapse">
    <tbody>
      {productCharacteristics?.map(item => (
        <tr key={item?.id} className="even:bg-[#7FAA841A] grid grid-cols-3">
             <td className="p-2 text-left">{item?.characteristic?.name}:</td>
          <td className="text-left p-2">{item?.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default ProductCharacteristics
