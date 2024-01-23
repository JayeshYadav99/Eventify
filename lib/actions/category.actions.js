"use server"

import connectToDatabase from "../mongodb/database";
import { handleError } from "../utils"
import Category from "../mongodb/database/models/category.model.js";
export const createCategory = async({categoryName}) => {
console.log("categoryName",categoryName)
    try {
        await connectToDatabase();
        const newCategory = await Category.create({name:categoryName});
console.log("newCategory",newCategory)
const dbName = newCategory.db.db.databaseName;
console.log("Database Name:", dbName);

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error);
    }





}

export const getCategories = async() => {
    
        try {
            await connectToDatabase();
            const categories = await Category.find({});
    
            return JSON.parse(JSON.stringify(categories));
        } catch (error) {
            handleError(error);
        }
    }