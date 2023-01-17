import jwt from 'jsonwebtoken';
import { IUser } from "../Models/UserSchema";
import { reduce } from 'lodash';

export default(user: IUser) => {
    let token = jwt.sign(

        {
            data: reduce(user, (result: any, value: string, key: string) => {
                if(key !== 'password') {
                    result[key] = value;
                 }
                return result;
            }, {})
        },
        process.env.JWT_SECRET || "",
        {
        expiresIn: process.env.JWT_MAX_AGE,
        algorithm: 'HS256'
    }
    );

    return token
}