import { Request, Response } from 'express';

const handleRouteError = (req: Request, res: Response) => {
  return res.status(404).send('Rota inexistente');
};

export default handleRouteError;
