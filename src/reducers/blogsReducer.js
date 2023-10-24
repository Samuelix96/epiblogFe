
import { createSlice, createAsyncThunk, autoBatchEnhancer } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    blogs: [],
    data: [],
    postData :{
        title: "",
        category: "",
        content: "",
        readTime: "",
        author : "",
        
    },
    isLoading: false,
    errors: null,
    refresh: false,
    searchTerm: null,
    currentPages: 1,
   
    currentId: null,
}


export const getBlogPostsFromApi = createAsyncThunk(
    "blogs/getPosts",
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
    async (postData) =>
    {
        try
        {
            const response = await axios.post(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/newCreate`, postData)
            return await response.data
        } catch (e)
        {
            console.log("errore nel sistema del server", e)
        }
    }
)

export const patchBlogs = createAsyncThunk(
    "patch/patchBlogsById",
    async ({ id, updatePost }) =>
    {
        try
        {
            const response = await axios.patch(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/update/${ id }`, updatePost)
            return response.data
        } catch (error)
        {
            console.log("errore nel sistema del server", error)
        }
    }
)

export const dataBlogsById = createAsyncThunk(
    "populateData/dataForUpdate",
    async ({id}) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/blogPosts/byid/${id}`)
            return response.data
        } catch (error) {
            
        }
    } 
)

export const deleteBlogs = createAsyncThunk(
    "delete/deleteBlogsById",
    async (postId) =>
    {
        try
        {
            const response = await axios.delete(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/delete/${ postId }`)
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
        setCurrentId : (state, action) => {
            state.currentId = action.payload
        },

        setCurrentPages : (state, action) => {
            state.currentPages = action.payload
        },
        setRefresh: (state, action) =>
        {
            state.refresh = action.payload;
        },

        resetUpdatePost: (state) =>
        {
            state.updatePost = "";
        }, 

        setSearchTerm: (state, action) =>
        {
            state.searchTerm = action.payload;
        },
        setResetPostData : (state) => {
            state.postData = {
                title: "",
                category: "",
                content: "",
                readTime: "",
                author: "",
               
              };
        },
        setPostData : (state, action) => {
            state.postData = { ...state.postData, ...action.payload }
        }
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
            .addCase(getAllTotalBlogs.pending, (state) =>
            {
                state.isLoading = true
            })
            .addCase(getAllTotalBlogs.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.blogs = action.payload
            })
            .addCase(getAllTotalBlogs.rejected, (state) =>
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
                state.blogs = action.payload
                state.postData = action.payload
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
            .addCase(deleteBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
                
            })
            .addCase(deleteBlogs.rejected, (state) =>
            {
                state.isLoading = false
                state.errors = "Errore durante la cancellazione del dato dal server"
            })
            .addCase(dataBlogsById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(dataBlogsById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload
            })
            .addCase(dataBlogsById.rejected, (state) => {
                state.isLoading = false;
                state.errors = "Errore nella  chiamata Get dei singolo post by Id"
            })
    }

})

export const {
    setPostData,
    resetPostData,
    setRefresh,
    resetUpdatePost,
    setDeleteData,
    resetDeleteData,
    setSearchTerm,
    setCurrentPages,
    setResetPostData,
    setCurrentId ,
} = blogsSlice.actions;

export const allBlogs = (state) => state.blogsStore.blogs;
export const allPostData = (state) => state.blogsStore.postData;
export const isBlogsLoading = (state) => state.blogsStore.isLoading;
export const blogsErrors = (state) => state.blogsStore.errors;
export const searchBlogs = (state) => state.blogsStore.searchTerm;
export const currentPageBlogs  = (state) => state.blogsStore.currentPages;
export const updatePostBlogs = (state) => state.blogsStore.refresh;
export const postDataBlogs = (state) => state.blogsStore.postData;
export const deleteDataBlogs = (state) => state.blogsStore.deleteData;
export const currentData = (state) => state.blogsStore.data;
export const catchId = (state) => state.blogsStore.currentId;
 
export default blogsSlice.reducer
