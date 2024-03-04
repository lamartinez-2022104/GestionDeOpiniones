'use strcit'

import Post from '../post/post.model.js'
import User from '../user/user.model.js'
import Comment from '../comment/comment.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body
        let user = await User.findOne({ _id: data.user })
        if (!user) return res.status(404).send({ message: 'User not found' })
        let post = await Post.findOne({ _id: data.post })
        if (!post) return res.status(404).send({ message: 'Post not found' })
        let comment = new Comment(data)
        await comment.save()
        return res.send({ message: 'Comment saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving comment', err })
    }
};

export const search = async (req, res) => {
    try {
        let comments = await Comment.find()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: 'Error getting comments' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateComment = await Comment.findOneAndUpdate(
            { _id: id},
            data,
            { new: true}
        ).populate('user', ['username'], 'post', ['title'])
        if (!updateComment) return res.status(404).send({ message: 'Comment not found, not update' })
        return res.send({message: 'Comment updated successfully', updateComment})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating comment' })
    }

}

export const deleteM = async (req, res) => {
    try {
        let { id } = req.params
        let deleteComment = await Comment.findOneAndDelete({ _id: id })
        if (!deleteComment) return res.status(404).send({message: 'Comment not foud, not deleted'})
        return res.send({message: 'Deleted Comment succesfully'})
    } catch (error){
        console.error(error)
        return send.status(500).send({message: 'error deleting Comment'})
    }
}