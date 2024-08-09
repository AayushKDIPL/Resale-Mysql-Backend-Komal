import express from "express";
import SaleRentController from "../controllers/saleRent.js";
import multer from "multer";
import fs from "fs"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = `uploads/products`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },

  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + "webp");
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "images", maxCount: 10 },
]);

export const router = express.Router();

router.get("/", SaleRentController.getProducts);// Done
router.get("/:id", SaleRentController.getProduct);// Done
router.post("/", SaleRentController.addProduct);// Done
router.delete("/:id", SaleRentController.deleteProduct);// Done
