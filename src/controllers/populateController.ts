import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { IProduct } from '../types/productInterfaces';
import { randomBoolean } from '../utils/randomBooleanUtil';
import { getRandomTags } from '../utils/randomTagsUtil';
import populateService from '../services/populateService';
import { StatusCodes } from 'http-status-codes';

export const populateController = {
  populateDatabase: async (req: Request, res: Response) => {
    const n = !isNaN(+req.params.n) ? +req.params.n : 10;

    const products: IProduct[] = [];

    for (let i = 0; i < n; i++) {
      const name = faker.commerce.product();
      const image = faker.image.urlLoremFlickr({ category: name });
      const price = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
      const onSale = randomBoolean();
      const tags = getRandomTags(Math.floor(Math.random() * 4) + 1);
      const product = {
        name,
        onSale,
        price,
        image,
        tags,
        createdBy: req.user.userId,
      };
      products.push(product);
    }

    const createdProducts = await populateService.populateDatabase(products);

    res.status(StatusCodes.CREATED).json({ products: createdProducts });
  },
};
