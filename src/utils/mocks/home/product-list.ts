const productListMock = [
    {
        id: 42,
        name: "Ergonomic Linen Keyboard",
        description: "Enormous Cotton Clock",
        images: [
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/640/350",
            "https://picsum.photos/320/200",
            "https://picsum.photos/1280/1024"
        ],
        prices: {
            before: {
                raw: 9718.41,
                formatted: "USD 9718.41",
                discountPercent: 0
            },
            current: {
                raw: 9718.41,
                formatted: "USD 9718.41",
                discountPercent: 0
            }
        }
    },
    {
        id: 43,
        name: "Synergistic Steel Shoes",
        description: "Rustic Wool Watch",
        images: [
            "https://picsum.photos/720/348",
            "https://picsum.photos/640/350",
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/1280/1024"
        ],
        prices: {
            before: {
                raw: 7445.78,
                formatted: "USD 7445.78",
                discountPercent: 0
            },
            current: {
                raw: 7445.78,
                formatted: "USD 7445.78",
                discountPercent: 0
            }
        }
    },
    {
        id: 44,
        name: "Awesome Leather Bench",
        description: "Rustic Concrete Computer",
        images: [
            "https://picsum.photos/640/200",
            "https://picsum.photos/1680/1050",
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/640/480"
        ],
        prices: {
            before: {
                raw: 4029.95,
                formatted: "USD 4029.95",
                discountPercent: 0
            },
            current: {
                raw: 4029.95,
                formatted: "USD 4029.95",
                discountPercent: 0
            }
        }
    },
    {
        id: 45,
        name: "Aerodynamic Iron Pants",
        description: "Rustic Marble Bag",
        images: [
            "https://picsum.photos/640/480",
            "https://picsum.photos/1024/768",
            "https://picsum.photos/640/200",
            "https://picsum.photos/1600/1200"
        ],
        prices: {
            before: {
                raw: 10103.14,
                formatted: "USD 10103.14",
                discountPercent: 0
            },
            current: {
                raw: 10103.14,
                formatted: "USD 10103.14",
                discountPercent: 0
            }
        }
    },
    {
        id: 46,
        name: "Ergonomic Concrete Shirt",
        description: "Sleek Granite Bench",
        images: [
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/640/350",
            "https://picsum.photos/720/348",
            "https://picsum.photos/720/348"
        ],
        prices: {
            before: {
                raw: 4080.98,
                formatted: "USD 4080.98",
                discountPercent: 0
            },
            current: {
                raw: 4080.98,
                formatted: "USD 4080.98",
                discountPercent: 0
            }
        }
    },
    {
        id: 47,
        name: "Heavy Duty Concrete Pants",
        description: "Sleek Plastic Plate",
        images: [
            "https://picsum.photos/1680/1050",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/1920/1200",
            "https://picsum.photos/1680/1050"
        ],
        prices: {
            before: {
                raw: 1057.79,
                formatted: "USD 1057.79",
                discountPercent: 0
            },
            current: {
                raw: 1057.79,
                formatted: "USD 1057.79",
                discountPercent: 0
            }
        }
    },
    {
        id: 48,
        name: "Sleek Leather Lamp",
        description: "Sleek Steel Pants",
        images: [
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/320/200",
            "https://picsum.photos/720/348",
            "https://picsum.photos/640/480"
        ],
        prices: {
            before: {
                raw: 7076.99,
                formatted: "USD 7076.99",
                discountPercent: 0
            },
            current: {
                raw: 7076.99,
                formatted: "USD 7076.99",
                discountPercent: 0
            }
        }
    },
    {
        id: 51,
        name: "Small Plastic Pants",
        description: "Intelligent Plastic Bottle",
        images: [
            "https://picsum.photos/720/348",
            "https://picsum.photos/1024/768",
            "https://picsum.photos/1920/1200",
            "https://picsum.photos/640/200"
        ],
        prices: {
            before: {
                raw: 1356.9,
                formatted: "USD 1356.9",
                discountPercent: 0
            },
            current: {
                raw: 1356.9,
                formatted: "USD 1356.9",
                discountPercent: 0
            }
        }
    },
    {
        id: 52,
        name: "Fantastic Wool Hat",
        description: "Lightweight Wool Keyboard",
        images: [
            "https://picsum.photos/320/200",
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/640/480",
            "https://picsum.photos/1680/1050"
        ],
        prices: {
            before: {
                raw: 9658.63,
                formatted: "USD 9658.63",
                discountPercent: 0
            },
            current: {
                raw: 9658.63,
                formatted: "USD 9658.63",
                discountPercent: 0
            }
        }
    },
    {
        id: 53,
        name: "Practical Wooden Computer",
        description: "Durable Silk Pants",
        images: [
            "https://picsum.photos/1920/1200",
            "https://picsum.photos/640/350",
            "https://picsum.photos/1920/1200",
            "https://picsum.photos/320/200"
        ],
        prices: {
            before: {
                raw: 7495.31,
                formatted: "USD 7495.31",
                discountPercent: 0
            },
            current: {
                raw: 7495.31,
                formatted: "USD 7495.31",
                discountPercent: 0
            }
        }
    },
    {
        id: 54,
        name: "Heavy Duty Bronze Bag",
        description: "Incredible Granite Bag",
        images: [
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/320/200",
            "https://picsum.photos/640/480",
            "https://picsum.photos/1920/1200"
        ],
        prices: {
            before: {
                raw: 4164.35,
                formatted: "USD 4164.35",
                discountPercent: 0
            },
            current: {
                raw: 4164.35,
                formatted: "USD 4164.35",
                discountPercent: 0
            }
        }
    },
    {
        id: 55,
        name: "Fantastic Iron Wallet",
        description: "Small Copper Computer",
        images: [
            "https://picsum.photos/640/350",
            "https://picsum.photos/1366/768",
            "https://picsum.photos/320/200",
            "https://picsum.photos/1680/1050"
        ],
        prices: {
            before: {
                raw: 10256.06,
                formatted: "USD 10256.06",
                discountPercent: 0
            },
            current: {
                raw: 10256.06,
                formatted: "USD 10256.06",
                discountPercent: 0
            }
        }
    },
    {
        id: 56,
        name: "Incredible Cotton Car",
        description: "Small Cotton Hat",
        images: [
            "https://picsum.photos/320/200",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/720/348"
        ],
        prices: {
            before: {
                raw: 2786.92,
                formatted: "USD 2786.92",
                discountPercent: 0
            },
            current: {
                raw: 2786.92,
                formatted: "USD 2786.92",
                discountPercent: 0
            }
        }
    },
    {
        id: 57,
        name: "Awesome Granite Soap",
        description: "Heavy Duty Wooden Shirt",
        images: [
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/320/200",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/640/480"
        ],
        prices: {
            before: {
                raw: 10489.58,
                formatted: "USD 10489.58",
                discountPercent: 0
            },
            current: {
                raw: 10489.58,
                formatted: "USD 10489.58",
                discountPercent: 0
            }
        }
    },
    {
        id: 58,
        name: "Fantastic Cotton Soap",
        description: "Aerodynamic Granite Plate",
        images: [
            "https://picsum.photos/640/350",
            "https://picsum.photos/640/200",
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/320/200"
        ],
        prices: {
            before: {
                raw: 1438.15,
                formatted: "USD 1438.15",
                discountPercent: 0
            },
            current: {
                raw: 1438.15,
                formatted: "USD 1438.15",
                discountPercent: 0
            }
        }
    },
    {
        id: 59,
        name: "Awesome Cotton Table",
        description: "Ergonomic Marble Clock",
        images: [
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/1680/1050",
            "https://picsum.photos/1280/1024"
        ],
        prices: {
            before: {
                raw: 9866.79,
                formatted: "USD 9866.79",
                discountPercent: 0
            },
            current: {
                raw: 9866.79,
                formatted: "USD 9866.79",
                discountPercent: 0
            }
        }
    },
    {
        id: 60,
        name: "Awesome Cotton Table",
        description: "Ergonomic Marble Clock",
        images: [
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/1680/1050",
            "https://picsum.photos/1280/1024"
        ],
        prices: {
            before: {
                raw: 9866.79,
                formatted: "USD 9866.79",
                discountPercent: 0
            },
            current: {
                raw: 9866.79,
                formatted: "USD 9866.79",
                discountPercent: 0
            }
        }
    },
    {
        id: 61,
        name: "Awesome Cotton Table",
        description: "Ergonomic Marble Clock",
        images: [
            "https://picsum.photos/1280/1024",
            "https://picsum.photos/1600/1200",
            "https://picsum.photos/1680/1050",
            "https://picsum.photos/1280/1024"
        ],
        prices: {
            before: {
                raw: 9866.79,
                formatted: "USD 9866.79",
                discountPercent: 0
            },
            current: {
                raw: 9866.79,
                formatted: "USD 9866.79",
                discountPercent: 0
            }
        }
    }
]

export default productListMock;