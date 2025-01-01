import { SequelizeModule } from '@nestjs/sequelize';
import * as Models from '../model';
import { Op } from 'sequelize';

//const env = process.env.NODE_ENV.toLowerCase();
const env = 'test'.toLowerCase();
//eAZR0rJ3NLT8Xl3GbLEaZy
const allModels = [];
Object.keys(Models).forEach((model) => {
  allModels.push(Models[model]);
});
export default SequelizeModule.forRoot({
  models: allModels,
  autoLoadModels: false,
  synchronize: false,
  logging: false,
  operatorsAliases: {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
  },
});
