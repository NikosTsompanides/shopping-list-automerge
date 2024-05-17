type Item = {
    name: string, 
    quantity: number
} 

export type ShoppingList = {
    createdAt: Date,
    list: Array<Item>
}