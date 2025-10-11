import { productService } from "../services/product.service.js";

export const productController = {
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const { locale } = req.query;
      const product = await productService.getProductById(id, locale);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductsByCategory(req, res) {
    try {
      const slug = req.params.slug;
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 12;
      const q = req.query.q || undefined;
      const minPrice = req.query.min ? Number(req.query.min) : undefined;
      const maxPrice = req.query.max ? Number(req.query.max) : undefined;
      const locale = req.query.locale; // 'hy' | 'ru' | 'en' или undefined

      const result = await productService.getProductsByCategory({
        slug,
        page,
        pageSize,
        q,
        minPrice,
        maxPrice,
        locale,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getBestSellerProducts(req, res) {
    try {
      const locale = req.query.locale;
      const limit = Number(req.query.limit) || 12;

      const products = await productService.getBestSellerProducts({
        locale,
        limit,
      });

      res.json({ items: products, total: products.length });
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  },
};
