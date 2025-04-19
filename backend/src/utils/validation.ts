import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  ValidationChain,
  body,
  query,
} from 'express-validator';

enum ValidatorType {
  QUERY = 'query',
  BODY = 'body',
}

type ValidatorProps<T> = {
  type: ValidatorType;
  fields: (keyof T)[];
};

const validator = <T>({ type, fields }: ValidatorProps<T>) => {
  const ValidatorFunctions: Record<
    ValidatorType,
    (key: string) => ValidationChain
  > = {
    [ValidatorType.BODY]: body,
    [ValidatorType.QUERY]: query,
  };

  const validations: ValidationChain[] = fields.map((field) =>
    ValidatorFunctions[type](String(field))
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

export const validatePayload = <T>(fields: (keyof T)[]) =>
  validator({ type: ValidatorType.BODY, fields });

export const validateQuery = <T>(fields: (keyof T)[]) =>
  validator({ type: ValidatorType.QUERY, fields });
