import { Request, Response, Errback, NextFunction } from 'express';

const databaseError = (
  error: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send('Alguma coisa deu errada no servidor');
};

export default databaseError;
