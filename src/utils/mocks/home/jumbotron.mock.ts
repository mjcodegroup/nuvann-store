import { Category } from "@/contexts/categories/types";

const categoriesMock: Category[] = [
  {
    id: 1,
    name: "Laptòp",
    description: "desc",
    tags: ["tag1", "tag2"],
    image: {
      id: 1,
      title: 'laptop',
      url: "../assets/categories/laptop.svg",
      alt: "laptop",
    }

  },
  {
    id: 2,
    name: "Smatfòn",
    description: "desc",
    tags: ["tag1", "tag2"],
    image: {
      id: 1,
      title: 'laptop',
      url: "../assets/categories/phone.svg",
      alt: "laptop",
    }
  },
  {
    id: 3,
    name: "Tablèt",
    description: "desc",
    tags: ["tag1", "tag2"],
    image: {
      id: 1,
      title: 'laptop',
      url: "../assets/categories/ipad.svg",
      alt: "laptop",
    }
  },
  {
    id: 4,
    name: "Kas bloutouf ",
    description: "desc",
    tags: ["tag1", "tag2"],
    image: {
      id: 1,
      title: 'laptop',
      url: "../assets/categories/headset.svg",
      alt: "laptop",
    }
  },
  ]

  const jumDataMock = [
    {
      title: "Livrezon Rapid",
      transCode: "fast_delivery",
      Icon: "../assets/jumbs/delivery-plane.png"
    },
    {
      title: "Lajan Garanti",
      trasCode: "guaranteed_money",
      Icon: "../assets/jumbs/PaymentCard.png"
    },
    {
      title: "Peye an Sekirite",
      Icon: "../assets/jumbs/security.png"
    },
    {
      title: "Sipò 24/24",
      Icon: "../assets/jumbs/support.png"
    },
    {
      title: "Nou Rapid",
      Icon: "../assets/jumbs/faster.png"
    }
  ]

export  {
  categoriesMock,
  jumDataMock
};