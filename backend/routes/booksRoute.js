import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err) {
        console.log(err)
        response.status(500).send({ message: err.message })
    }
});

router.post("/", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required field : title, author and publishyear" })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (err) {
        console.log(err)
        response.status(500).send({ message: err.message })
    }
});

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (err) {
        console.log(err)
        response.status(500).send({ message: err.message })
    }
});

router.put("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required field : title, author and publishyear" })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        return response.status(200).send({ message: "Book updated Successfully" });

    } catch (err) {
        console.log(err)
        response.status(500).send({ message: err.message })
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        return response.status(200).send({ message: "Book deleted Successfully" });
    } catch (err) {
        console.log(err)
        response.status(500).send({ message: err.message })
    }
});


export default router;