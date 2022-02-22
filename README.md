# Tiny Project API

## Todos

* Transfer all Bastion Tables
* Transfer all Pickem Tables
* Transfer all Chirper Tables
* Create Blog Tables

## Router Template

```js
import { Router } from 'express';
import { db } from '@/db';
import { isAdmin } from '@/middlewares';

export const namedRouter = Router();

namedRouter.route('*').post(isAdmin).put(isAdmin).delete(isAdmin);

namedRouter.get('/', async (req, res, next) => {});
namedRouter.post('/', async (req, res, next) => {});
namedRouter.put('/', async (req, res, next) => {});
namedRouter.delete('/', async (req, res, next) => {});
```