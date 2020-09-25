export class Item {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    description: string;
    order: number;
    likes: number;
    status: string;
    category: any;
}

export class Category {
    id: number;
    name: string;
    imgUrl: string;
    order: number;
    status: string;
    brand: Brand;
    items: Item[];
}

export class Brand {
    id: number;
    name: string;
    logoImgUrl: string;
    status: string;
}