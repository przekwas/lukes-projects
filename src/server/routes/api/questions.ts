import TableRouter from 'tablerouter';
import { IQuestions, Questions } from '../../db';

export default new TableRouter<IQuestions>(Questions, {}).Router