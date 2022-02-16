export class Product{
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;

    constructor(){
        this.id = 0;
        this.name = 'Product1';
        this.price = 10;
        this.url = 'https://www.google.com.ua'
        this.description = 'Just a product'
    }
}