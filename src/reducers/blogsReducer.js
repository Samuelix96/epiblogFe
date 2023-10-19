
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    blogs: [],
    data: null,
    isLoading: false,
    errors: null,
    updatePost: null,
    searchTerm: "",
    deleteData: null,
    currentPages: 1,
}


export const getBlogPostsFromApi = createAsyncThunk(
    "blogs/getAllBlogs",
    async (currentPages) =>
    {
        try
        {
            const response = await axios.get(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts?page=${ currentPages }`)
            
            return response.data
        } catch (error)
        {
            console.log("errore nel sistema del server", error)
        }
    }
)

export const getAllTotalBlogs = createAsyncThunk(
    "blogs/getAllBlogs",
    async (searchTerm) =>
    {
        try
        {
            const response = await axios.get(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/bytitle?title=${ searchTerm }`)
            return response.data
            
        } catch (error)
        {
            console.log("errore nel sistema del server", error)
        }
    }
)




export const postBlogs = createAsyncThunk(
    "post/postAllBlogs",
    async (finalBody) =>
    {
        try
        {
            const response = await axios.post(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/newCreate`, finalBody)
            return await response.data
        } catch (e)
        {
            console.log("errore nel sistema del server", e)
        }
    }
)

export const patchBlogs = createAsyncThunk(
    "patch/patchBlogsById",
    async ({ id, UpdatePost }) =>
    {
        try
        {
            const response = await axios.patch(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/update/${ id }`, UpdatePost)
            return response.data
        } catch (error)
        {
            console.log("errore nel sistema del server", error)
        }
    }
)

export const deleteBlogs = createAsyncThunk(
    "delete/deleteBlogsById",
    async (id) =>
    {
        try
        {
            const response = await axios.delete(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/delete/${ id }`)
            return response.data
        } catch (error)
        {
            console.log("errore nel sistema del server", error)
        }

    }
)

const blogsSlice = createSlice({
    name: "getBlogs",
    initialState,
    reducers: {
        setCurrentPages : (state, action) => {
            state.currentPages = action.payload
        },
        setPostData: (state, action) => 
        {
            state.postData = action.payload;
        },
        resetPostData: (state) =>
        {
            state.postData = "";
        },
        setUpdatePost: (state, action) =>
        {
            state.updatePost = action.payload;
        },
        resetUpdatePost: (state) =>
        {
            state.updatePost = "";
        },   
        setDeleteData: (state, action) =>
        {
            state.deleteData = action.payload;
        },
        resetDeleteData: (state) =>
        {
            state.deleteData = null;
        },
        setSearchTerm: (state, action) =>
        {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(getBlogPostsFromApi.pending, (state) =>
            {
                state.isLoading = true
            })
            .addCase(getBlogPostsFromApi.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.blogs = action.payload
            })
            .addCase(getBlogPostsFromApi.rejected, (state) =>
            {
                state.isLoading = false
                state.errors = "Errore durante la creazione dei dati dal server"
            })
            .addCase(postBlogs.pending, (state) =>
            {
                state.isLoading = true
            })
            .addCase(postBlogs.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(postBlogs.rejected, (state) =>
            {
                state.isLoading = false
                state.errors = "Errore durante la post dei dati al server"
            })
            .addCase(patchBlogs.pending, (state) =>
            {
                state.isLoading = true
            })
            .addCase(patchBlogs.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(patchBlogs.rejected, (state) =>
            {
                state.isLoading = false
                state.errors = "Errore durante la modifica dei dati dal server"
            })
            .addCase(deleteBlogs.pending, (state) =>
            {
                state.isLoading = true
            })
            .addCase(deleteBlogs.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(deleteBlogs.rejected, (state) =>
            {
                state.isLoading = false
                state.errors = "Errore durante la cancellazione del dato dal server"
            })
    }

})

export const {
    setPostData,
    resetPostData,
    setUpdatePost,
    resetUpdatePost,
    setDeleteData,
    resetDeleteData,
    setSearchTerm,
    setCurrentPages,
} = blogsSlice.actions;

export const allBlogs = (state) => state.blogsStore.blogs;
export const isBlogsLoading = (state) => state.blogsStore.isLoading;
export const blogsErrors = (state) => state.blogsStore.errors;
export const searchBlogs = (state) => state.blogsStore.searchTerm;
export const currentPageBlogs  = (state) => state.blogsStore.currentPages;
export const updatePostBlogs = (state) => state.blogsStore.updatePost;
export const postDataBlogs = (state) => state.blogsStore.postData;
export const deleteDataBlogs = (state) => state.blogsStore.deleteData;
export const currentData = (state) => state.blogsStore.data
export default blogsSlice.reducer
