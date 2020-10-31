export class Product {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    description: string;
    likes: number;
    order: number;
    status: string;
    category: any;
    categoryName: string;
    type: string;
    startDate: string;
    expireDate: string;
    hasPortionOption: boolean;
    fakePrice: number;
}

export class Category {
    id: number;
    name: string;
    imgUrl: string;
    order: number;
    status: string;
    brand: Brand;
    products: Product[];
}

export class Brand {
    id: number;
    name: string;
    uniqueName: string;
    logoImgUrl: string;
    status: string;
}

export class Reservation {
    adultCount: number;
    brand: any;
    childCount: number;
    fullName: string;
    id: number;
    phoneNumber: string;
    reservationDate: string;
    specifications: string;
}
