import {Book} from '../models/bookModels.js'

export const createBook = async(req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.content || !req.body.publishYear){
           return res.status(400).send({
            message: "Please fill in all required fields"
           })
        }

    const newBook = new {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        content: req.body.content,
        publishYear: req.body.publishYear
    }

    const book = await Book.create(newBook)
    return res.status(200).send(book)
    }catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

export const getBooks = async(req, res) => {
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books,
        })
    }catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

export const getBook = async(req, res) => {
    try{
        const {id} = req.params
        const books = await Book.findById(id)
        return res.status(200).json(books)
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

export const updateBook = async(req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.content || !req.body.publishYear){
            return res.status(400).send({
                message: "Please fill in all required fields"
            })
    }
    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if(!result){
        return res.status(404).json({message: "Book not found"})
    }
    return res.status(200).send({message: "Book updated successfully"})
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

export const deleteBook = async(req, res) => {
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({message: "Book not found"})
        }
        return res.status(200).send({message: "Book deleted successfully"})
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}