export interface Meal {
    id:number;
    name: string;
    description: string;
    ingrediants: ingrediants;
    img_url:string;
    // Add more properties if necessary
  }
  interface ingrediants {
    id: number;
    meal_id: number;
    name: string;
    quantity: number;
    measure: string;
    calory: number;
  }