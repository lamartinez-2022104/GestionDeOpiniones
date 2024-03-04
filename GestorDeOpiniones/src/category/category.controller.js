'use strict'
import Category from './category.model.js'

export const save = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: 'Category saved successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving category'})
    }
}

export const update = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update or missing data'})
        let updateCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateCategory) return res.status(404).send({message: 'Category not found, not update'})
        return res.send({message: 'Category update successfully', updateCategory})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating category'})
    }
}

export const search = async (req, res) => {
    try {
        let category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error getting category' });
    }
};

export const deleteC = async(req, res)=>{
    try {
        let { id } = req.params
        let deleteCategory = await Category.deleteOne({_id: id})
        if(deleteCategory.deletedCount == 0) return res.status(404).send({message: 'Category not found, not deleted'})
        return res.send({message: 'Deleted category successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting category'})
    }
}
