import { Router } from "express";
import { addTransaction, getTransactions, getTransaction,deleteTransaction } from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', verifyJWT, getTransactions);
router.route('/:transactionId')
  .get(verifyJWT, getTransaction)
  .delete(verifyJWT, deleteTransaction);
router.post('/add',verifyJWT, addTransaction);

export default router;