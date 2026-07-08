import { products } from "./constants/constants.js";
import Product from './models/product.models.js';

const defaultData = async() => {
    try {
        // await Product.deleteMany({});
        await Product.insertMany(products)
        console.log('Data imported Successfully.');
        
    } catch (error) {
        console.log('Error while inserting default data in Database',error.message);
        
    }
}

export default defaultData;