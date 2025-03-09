import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, body } from 'express-validator';

export const validatePayload = <T>(fields: (keyof T)[]) => {
  const validations: ValidationChain[] = fields.map((field) =>
    body(String(field))
      .notEmpty()
      .withMessage(`${String(field)} is required`)
  );

  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, error: errors.array() });
    }

    next();
  };
};
