import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: { notes: [], updated: {} },
  reducers: {
    addNoteHandler(state, action) {
      state.notes = [...state.notes, action.payload];
    },
    updateNoteHandler(state, action) {
      const editedNote = state.notes.find((item) => item.id == action.payload);
      const updatedNotes = state.notes.filter(
        (item) => item.id != action.payload
      );

      state.notes = updatedNotes;
      state.updated = editedNote;
    },
    deleteNoteHandler(state, action) {
      state.notes = state.notes.filter((item) => item.id != action.payload);
    },
  },
});

export const { addNoteHandler, updateNoteHandler, deleteNoteHandler } =
  noteSlice.actions;

export default noteSlice.reducer;
