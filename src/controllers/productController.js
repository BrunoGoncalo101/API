import productService from "../services/productService.js";
import { broadcastMessage } from "../websockets/websockets.js";


const getProducts = async(req, res, next) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    }
    catch (err) {
        next(err);
    }
}

const getProductsGT20 = async (req, res, next) => {
    try {
        const price = parseFloat(req.params.value);
        const products = await productService.getProductsGT20(price);
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};


const broadcastClients = async (req, res, next) => {
  try {
    const wss = req.app.get("wss");

    if (!wss) {
      const error = new Error("Servidor WebSocket não inicializado");
      error.status = 500;
      return next(error);
    }

    broadcastMessage(wss, {
      type: "broadcast",
      message: "Mensagem enviada para todos os clientes",
    });

    res.status(200).json({
      message: "Broadcast enviado com sucesso",
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async(req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product)
            return next(new Error("Product not found"));
        res.status(200).json(product);
    }
    catch (err) {
        next(err);
    }
}

const createProduct = async(req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        // io.emit("productCreated", newProduct);
        res.status(201).json(newProduct);
    }
    catch (err) {
        next(err);
    }   
}

const updateProduct = async(req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) return next(new Error("Product not found"));
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        next(err);
    }
}

const deleteProduct = async(req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            let error = new Error("Product not found");
            error.status = 404;
            return next(error);
        }
        //sem corpo
        res.status(204).json(product);
        //com corpo
        res.status(200).json(product);
    }
    catch (err) {
        next(err);
    }
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsGT20,
  broadcastClients,
};


