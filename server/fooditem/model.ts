import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { FoodBank } from '../foodbank/model';

type FoodItem = {
    _id: Types.ObjectId;
    foodBankId: Types.ObjectId;
    name: string;
    quantity: number;
};

type PopulateFoodItem = {
    _id: Types.ObjectId;
    foodBankId: FoodBank;
    name: string;
    quantity: number;
};
