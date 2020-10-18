import { IContext } from '../interfaces';

const context = async ({ req, res }: IContext): Promise<IContext> => {
  return { res, req };
};

export { context };
