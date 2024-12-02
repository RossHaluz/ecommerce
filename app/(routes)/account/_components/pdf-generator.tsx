import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Printer } from "lucide-react";
import { FC } from "react";

// Імпортуємо шрифт
import "@/public/fonts/Roboto-Regular-normal"; // Імпортуйте сам файл шрифта

interface OrderItem {
  id: string;
  product: {
    price: string;
    id: string;
    title: string;
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
  };
}

const PdfGenerator: FC<PdfGeneratorProps> = ({ item }) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    // Додаємо шрифт
    doc.addFileToVFS("Roboto-Regular-normal.ttf", "Roboto-Regular.js");

    // Додаємо шрифт в документ
    doc.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");

    // Встановлюємо шрифт
    doc.setFont("Roboto");

    let totalPrice = 0;

    // Заголовок
    autoTable(doc, {
      body: [
        [
          {
            content: "Накладна про замовлення",
            styles: {
              halign: "center",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
        ],
      ],
      theme: "plain",
      styles: {
        fillColor: "#343a40",
      },
    });

    // Інформація про продавця та покупця
    autoTable(doc, {
      body: [
        [
          {
            content: "AudiParts\nм. Хмельницький, Україна",
            styles: {
              halign: "left",
            },
          },
          {
            content: `Покупець:\n${item.firstName} ${item.lastName}\nТелефон: ${item.phone}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    // Інформація про замовлення
    autoTable(doc, {
      body: [
        [
          {
            content: `Номер замовлення: ${item.orderNumber}\nДата: ${new Date(
              item.createdAt
            ).toLocaleDateString()}`,
            styles: {
              halign: "left",
            },
          },
          {
            content: `Доставка: ${item.postService}, ${
              item.typeDelivary
            }\nАдреса: ${item.address || item.separation}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    // Таблиця товарів
    autoTable(doc, {
      head: [
        [
          "Артикул",
          "Назва товару",
          "Кількість",
          "Ціна за одиницю",
          "Загальна ціна",
        ],
      ],
      body: item.orderItems.map((orderItem) => {
        const itemTotal = orderItem.quantity * Number(orderItem.product.price);
        totalPrice += itemTotal;
        return [
          orderItem.product.article,
          orderItem.product.title,
          orderItem.quantity,
          `${Number(orderItem.product.price).toFixed(2)} грн`,
          `${itemTotal.toFixed(2)} грн`,
        ];
      }),
      theme: "striped",
      headStyles: {
        fillColor: "#343a40",
        textColor: "#ffffff",
      },
    });

    // Загальна вартість
    autoTable(doc, {
      body: [
        [
          {
            content: `Загальна вартість: ${totalPrice.toFixed(2)} грн`,
            styles: {
              halign: "right",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    // Збереження PDF
    doc.save(`Invoice_${item.orderNumber}.pdf`);
  };

  return (
    <Button variant="ghost" onClick={generatePdf}>
      <Printer color="#c0092a" />
    </Button>
  );
};

export default PdfGenerator;
