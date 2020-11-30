import { IContext } from '../interfaces';
import { courseLoader } from './loaders/courseLoader';

const context = async ({ req, res }: IContext): Promise<IContext> => {
  return { 
    res,
    req,
    courseLoader: courseLoader()
  };
};

export { context };
