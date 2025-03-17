export interface CartItem {
    id:string,
    productId:string,
    title:string,
    imagesUrl:string[],
    quantity: number,
    price:number,
    color:string,
    size:string
    category: string,
    inStock: boolean
}