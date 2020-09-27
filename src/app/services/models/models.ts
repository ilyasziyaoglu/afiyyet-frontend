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

export class Campaign {
    description: string;
    expireDate: string;
    id: number;
    imgUrl: string;
    likes: number;
    name: string;
    order: number;
    price: number
    startDate: string;
    status: string;

}
