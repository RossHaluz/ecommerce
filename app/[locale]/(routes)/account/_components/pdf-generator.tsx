import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/formatter";
import { Printer } from "lucide-react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface OrderItem {
  id: string;
  product: {
    price: string;
    id: string;
    title: string;
    catalog_number: string;
    article: string;
    images: {
      url: string;
    }[];
  };
  name: string;
  quantity: number;
  price: number;
}

interface PdfGeneratorProps {
  item: {
    id: string;
    city: string;
    firstName: string;
    lastName: string;
    phone: string;
    paymentMethod: string;
    orderNumber: string;
    postService: string;
    separation: string;
    address: string;
    typeDelivary: string;
    createdAt: string;
    comment: string;
    orderItems: OrderItem[];
    orderType: string;
    dropshipDetails: {
      clientFirstName: string;
      clientLastName: string;
      clientPhone: string;
    };
  };
}

const PdfContent = React.forwardRef<HTMLDivElement, PdfGeneratorProps>(
  ({ item }, ref) => {
    let totalPrice = 0;

    return (
      <div
        ref={ref}
        className="print-hidden"
        style={{
          padding: "50px",
          fontFamily: "Roboto, Arial, sans-serif",
          fontSize: "12px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              item?.orderType === "DROPSHIP"
                ? "repeat(4, 1fr)"
                : "repeat(3, 1fr)",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>№{item?.orderNumber}</span>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
          {/* Дропшипер або роздрібний клієнт */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontWeight: "bold" }}>
              {item?.orderType === "DROPSHIP" ? "ТА:" : "Покупець:"}
            </h3>
            <span>
              {item?.firstName} {item?.lastName}
            </span>
            <span>{item?.phone}</span>
          </div>
          {/* Коментар - якщо дропшипер, тут будуть дані його клієнта  */}
          {item?.orderType === "DROPSHIP" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontWeight: "bold" }}>Дані клієнта:</h3>
              <span>
                {item?.dropshipDetails?.clientFirstName}{" "}
                {item?.dropshipDetails?.clientLastName}
              </span>

              <span>{item?.dropshipDetails?.clientPhone}</span>
            </div>
          )}

          {/* Дані про даставку  */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{item.postService === "novaPoshta" && "Нова Пошта,"}</span>
            <span>{item.postService === "pickup" && "Самовивіз,"}</span>
            <span>{item.postService === "transporter" && "Перевізник,"}</span>
            {item?.postService !== "pickup" && (
              <>
                <span>{item?.city && `${item?.city},`}</span>
                <span> {item?.address ? item?.address : item?.separation}</span>
              </>
            )}
            {/* Спосіб оплати  */}
            <span>
              {item?.paymentMethod === "cashOnDelivary" &&
                "Оплата при отримані"}
              {item?.paymentMethod === "monobank" &&
                "Онлайн оплата через Monobank"}
              {item?.paymentMethod === "payByCard" && "Оплата на карту"}
            </span>
          </div>
        </div>

        {/* Таблиця товарів */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #343a40", padding: "8px" }}>
                Артикул
              </th>
              <th style={{ border: "1px solid #343a40", padding: "8px" }}>
                Каталожний номер
              </th>
              <th style={{ border: "1px solid #343a40", padding: "8px" }}>
                Назва товару
              </th>
              <th style={{ border: "1px solid #343a40", padding: "8px" }}>
                Кількість
              </th>
              <th style={{ border: "1px solid #343a40", padding: "8px" }}>
                Ціна за одиницю
              </th>
              <th style={{ border: "1px solid #343a40", padding: "8px" }}>
                Загальна ціна
              </th>
            </tr>
          </thead>
          <tbody>
            {item.orderItems.map((orderItem) => {
              const itemTotal = orderItem?.quantity * Number(orderItem?.price);
              totalPrice += itemTotal;

              return (
                <tr key={item?.id}>
                  <td style={{ border: "1px solid #343a40", padding: "8px" }}>
                    {orderItem.product.article}
                  </td>
                  <td style={{ border: "1px solid #343a40", padding: "8px" }}>
                    {orderItem.product?.catalog_number}
                  </td>
                  <td style={{ border: "1px solid #343a40", padding: "8px" }}>
                    {orderItem.product.title}
                  </td>
                  <td style={{ border: "1px solid #343a40", padding: "8px" }}>
                    {orderItem.quantity}
                  </td>
                  <td style={{ border: "1px solid #343a40", padding: "8px" }}>
                    {formatter.format(Number(orderItem.price))}
                  </td>
                  <td style={{ border: "1px solid #343a40", padding: "8px" }}>
                    {formatter.format(Number(itemTotal))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Загальна вартість */}
        <p style={{ textAlign: "right", fontSize: "12px", fontWeight: "bold" }}>
          Загальна вартість: {formatter.format(Number(totalPrice))}
        </p>

        {item?.comment && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>
              Коментарії:
            </h3>
            <p>{item?.comment}</p>
          </div>
        )}
      </div>
    );
  }
);

PdfContent.displayName = "PdfContent";

const PdfGenerator = ({ item }: PdfGeneratorProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Invoice_${item.orderNumber}`,
  });

  return (
    <>
      <PdfContent ref={contentRef} item={item} />
      <Button variant="ghost" onClick={() => handlePrint()}>
        <Printer color="#c0092a" />
      </Button>
    </>
  );
};

export default PdfGenerator;
