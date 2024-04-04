import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";


const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setTitle(response.data.title);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("An error occured");
                console.log(error);
            })
    }, [])
    const handleEditBook = () => {
        const data = {
            title, author, publishYear
        }
        setLoading(true);
        axios.put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book Edited Succesfully", { variant: "success" });
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error Occured while editing", { variant: "error" });
                // alert("An error occured :")
                console.log(error)
            })
    }
    return (
        <div className="p-4">
            <BackButton></BackButton>
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    ></input>
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    ></input>
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    ></input>
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
            </div>
        </div>
    )
}

export default EditBook;