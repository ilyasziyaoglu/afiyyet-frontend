export class Item {
    id: string;
    rate: number;
    likes: number;
    name: string;
    image: string;
    price: number;
    content: string;
    order: number;
}

export class Category {
    name: string;
    mainmedia: string;
    items: any[];
    order: number
}
