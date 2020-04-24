import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionsRouter.get('/', (req, res) => {
  const transactions = transactionsRepository.all();
  const balance = transactionsRepository.getBalance();

  return res.json({ transactions, balance });
});

transactionsRouter.post('/', (req, res) => {
  try {
    const { title, value, type } = req.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return res.json(transaction);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionsRouter;
