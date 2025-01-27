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
        <h1
          style={{
            textAlign: "center",
            color: "#343a40",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Накладна про замовлення №{item?.orderNumber}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <p>AudiParts</p>
            <p>м. Хмельницький, Україна</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "bold" }}>
              {item?.orderType === "RETAIL"
                ? "Покупець"
                : item?.orderType === "DROPSHIP" && "Дропшипер:"}
            </p>
            <p>
              {item.firstName} {item.lastName}
            </p>
            <p>Телефон: {item.phone}</p>
          </div>
          {item?.orderType === "DROPSHIP" && (
            <div style={{ textAlign: "right" }}>
              <h3 style={{ fontWeight: "bold" }}>Дані клієнат:</h3>
              <p>
                Ім&apos;я та прізвище: {item?.dropshipDetails?.clientFirstName}{" "}
                {item?.dropshipDetails?.clientLastName}
              </p>
              <p>Телефон: {item?.dropshipDetails?.clientPhone}</p>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <p>Номер замовлення: {item.orderNumber}</p>
            <p>Дата: {new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p>
              Доставка: {item.postService === "nova-poshta" && "Нова Пошта"},{" "}
              {item.typeDelivary}
            </p>
            <p>Адреса: {item.address || item.separation}</p>
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
            <tr style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Артикул
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Каталожний номер
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Назва товару
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Кількість
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Ціна за одиницю
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Загальна ціна
              </th>
            </tr>
          </thead>
          <tbody>
            {item.orderItems.map((orderItem) => {
              const itemTotal =
                orderItem.quantity * Number(orderItem.product.price);
              totalPrice += itemTotal;

              return (
                <tr key={item?.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderItem.product.article}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderItem.product?.catalog_number}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderItem.product.title}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderItem.quantity}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {formatter.format(Number(orderItem.product.price))}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {formatter.format(Number(itemTotal))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Загальна вартість */}
        <p style={{ textAlign: "right", fontSize: "14px", fontWeight: "bold" }}>
          Загальна вартість: {formatter.format(Number(totalPrice))}
        </p>
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
