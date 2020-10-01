export class Item {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    description: string;
    likes: number;
    order: number;
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
    id: number;
    name: string;
    imgUrl: string;
    price: number
    description: string;
    likes: number;
    order: number;
    startDate: string;
    expireDate: string;
    status: string;

}
