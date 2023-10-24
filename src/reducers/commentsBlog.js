import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comment: [],
    loading: false,
    errors: null,
    commentsData: {
        userName: "",
        content: "",
        code: "",
    },
    confirmDelete: false,
    errorDelete: false,
}

export const getComments = createAsyncThunk(
    "getComments/comments",
    async ({ id }) =>
    {
        try
        {
            const response = await axios.get(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/${ id }/comments`)
            return response.data
        } catch (error)
        {
            console.log("Error internal get comments", error)
        }
    }
);

export const getByIdComments = createAsyncThunk(
    "getById/commentsById",
    async ({ id, commentsid }) =>
    {
        try
        {
            const response = await axios.get(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/${ id }/comments/${ commentsid }`)
            return response.data
        } catch (error)
        {
            console.log("Error in call get by Id to specific post ")
        }
    }
);

export const postComments = createAsyncThunk(
  "postComments/commentsPost",
  async ({ id, commentsData }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_SERVER_URL}/blogPosts/${id}/comments/create`,
        commentsData
      );
      return  await response.data;
    } catch (error) {
      console.log("Error in call post to comments", error);
      throw error;
    }
  }
);

  

  export const putComments = createAsyncThunk(
    "putComments/commentsUpdate",
    async ({ id, commentsid, updateComments }) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_SERVER_URL}/blogPosts/${id}/comments/${commentsid}`,
          updateComments
        );
        return response.data;
      } catch (error) {
        console.log("Error in call put", error);
        throw error;
      }
    }
  );


export const deleteComments = createAsyncThunk(
    "delete/commentsDelete",
    async ({ id, commentsid }) =>
    {
        try
        {
            const response = await axios.delete(`${ process.env.REACT_APP_BASE_SERVER_URL }/blogPosts/${ id }/comments/${ commentsid }`)
            return response.data
        } catch (error)
        {
            console.log("Error in call delete ")
        }
    }
);


const CommentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setLoading: (state, action) =>
        {
            state.loading = action.payload
        },
        MessageConfirm: (state, action) =>
        {
            state.confirmDelete = {
                alert: action.payload,
            };
        },
        NotDelete: (state, action) =>
        {
            state.errorDelete = {
                alert: action.payload
            }
        },
        resetData: (state, action) =>
        {
            state.commentsData = {
                userName: "",
                content: "",
                id: "",
            };
        },

        setCommentsData: (state, action) =>
        {
            state.commentsData = action.payload
        },
        setComment: (state, action) =>
        {
            state.comment = action.payload
        },
    },


    extraReducers: (builder) =>
    {
        builder
            .addCase(getComments.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(getComments.fulfilled, (state, action) =>
            {
                state.loading = false
                state.comment = action.payload
            })
            .addCase(getComments.rejected, (state) =>
            {
                state.loading = false
                state.errors = "Errore durante la creazione dei dati dal server"
            })
            .addCase(getByIdComments.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(getByIdComments.fulfilled, (state, action) =>
            {
                state.loading = false
                state.comment = action.payload
            })
            .addCase(getByIdComments.rejected, (state) =>
            {
                state.loading = false
                state.errors = "Errore durante la creazione dei dati dal server"
            })
            .addCase(postComments.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(postComments.fulfilled, (state, action) =>
            {
                state.loading = false
                state.comment = action.payload
                state.commentsData = action.payload
            })
            .addCase(postComments.rejected, (state) =>
            {
                state.loading = false
                state.errors = "Errore durante la post dei dati al server"
            })
            .addCase(putComments.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(putComments.fulfilled, (state, action) =>
            {
                state.loading = false
                state.comment = action.payload
            })
            .addCase(putComments.rejected, (state) =>
            {
                state.loading = false
                state.errors = "Errore durante la modifica dei dati dal server"
            })
            .addCase(deleteComments.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(deleteComments.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.comment = action.payload

            })
            .addCase(deleteComments.rejected, (state) =>
            {
                state.loading = false
                state.errors = "Errore durante la cancellazione del dato dal server"
            })

    }
})

export const { resetData, setComment, setCommentsData, MessageConfirm, NotDelete, setLoading } = CommentsSlice.actions;

export const allComments = (state) => state.comments.comment;
export const loadingComment = (state) => state.comments.loading;
export const errorsComment = (state) => state.comments.errors;
export const postDataComment = (state) => state.comments.commentsData;


export default CommentsSlice.reducer