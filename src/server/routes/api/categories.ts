import TableRouter from 'tablerouter';
import { ICategories, Categories } from '../../db';

export default new TableRouter<ICategories>(Categories, {}).Router