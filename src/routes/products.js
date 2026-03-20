import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// Criar produto
router.post("/", productController.createProduct);

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erro interno do servidor
 */

// Listar produtos
router.get("/", productController.getProducts);

router.get("/broadcast", productController.broadcastClients);
// Listar produto
//  com preço superior a 20
router.get("/price/:value", productController.getProductsGT20);

// Obter produto por ID
router.get("/:id", productController.getProductById);


// Atualizar produto por ID
router.put("/:id", productController.updateProduct);

// Eliminar produto por ID
router.delete("/:id", productController.deleteProduct);

export default router;
