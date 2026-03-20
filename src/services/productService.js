import Product from "../models/product.js";

const getProducts = async() => {
    try {
        const products = await Product.find();
        return products;
    }
    catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
}

const getProductsGT20 = async (price) => {
    try {
        console.log("Fetching products with price greater than:", price);
        const products = await Product.find({ price: { $gt: price } });
        return products;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
};


const getProductById = async(id) => {
    try {
        const product = await Product.findById(id);
        return product;
    }
    catch (err) {
        console.error("Error fetching product by ID:", err);
        throw err;
    }
}

const createProduct = async(productData) => {
    try {
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        return savedProduct;
    }
    catch (err) {
        console.error("Error creating product:", err);
        throw err;
    }
}

const updateProduct = async(id, updateData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        return updatedProduct;
    }
    catch (err) {
        console.error("Error updating product:", err);
        throw err;
    }
}

const deleteProduct = async(id) => {
    try {
        return await Product.findByIdAndDelete(id);
    }
    catch (err) {
        console.error("Error deleting product:", err);
        throw err;
    }
}   

export default {
    getProducts,
    getProductsGT20,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct   
}


