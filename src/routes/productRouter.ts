import express from 'express';
import productController from '../controllers/productController';
import uploadsController from '../controllers/uploadsController';
import { validateUploadedFiles } from '../middleware/validationMiddleware';
import {
  validateProductCreation,
  validateIdParam,
  validateProductUpdate,
} from '../middleware/validationMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';
import upload from '../middleware/multerMiddleware';

const router = express.Router();

router
  .route('/')
  .get([
    authorizePermissions('user', 'admin'),
    productController.getAllProducts,
  ])
  .post(
    authorizePermissions('user', 'admin'),
    upload.single('image'),
    validateUploadedFiles,
    validateProductCreation,
    productController.createProduct
  );

router.get('/userProducts', [
  authorizePermissions('user', 'admin'),
  productController.getUserProducts,
]);

router.get('/tags', [
  authorizePermissions('user', 'admin'),
  productController.getAllTags,
]);

router.post(
  '/uploadImage',
  authorizePermissions('user', 'admin'),
  validateUploadedFiles,
  uploadsController.uploadProductImage
);

router
  .route('/:id')
  .get(validateIdParam, productController.getOneProduct)
  .patch(
    upload.single('image'),
    validateUploadedFiles,
    validateProductUpdate,
    validateIdParam,
    productController.updateProduct
  )
  .delete(validateIdParam, productController.deleteProduct);

export default router;
