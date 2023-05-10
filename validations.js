import { body } from 'express-validator';

export const loginValidation = [ 
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should contain at least 5 symbols').isLength({ min: 5}),
    
];

export const registerValidation = [ 
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should contain at least 5 symbols').isLength({ min: 5}),
    body('fullName', 'Enter name').isLength({ min: 3}),
    body('avatarUrl', 'Wrong picture link').optional(). isURL(),
];
export const postCreateValidation = [ 
    body('title', 'Enter article title').isLength({ min:3 }).isString(),
    body('text', 'Enter article text').isLength({ min:3 }).isString(),
    body('tags', 'Wrong tag format(Enter array)').optional().isString(),
    body('imageUrl', 'Wrong picture link').optional().isString(),
];