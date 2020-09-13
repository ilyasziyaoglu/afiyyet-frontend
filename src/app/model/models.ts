export class Item {
    id: string;
    name: string;
    image: string;
    price: number;
    content: string;
    order: number;
    rate: number;
    likes: number;
    href: string;
}

export class Category {
    name: string;
    id: string;
    image: string;
    href: string;
    order: number;
    items: Item[];
}
