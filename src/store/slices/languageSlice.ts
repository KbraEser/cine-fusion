import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  language: "tr-TR" | "en-US";
}

const initialState: LanguageState = {
  language: "en-US",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en-US" ? "tr-TR" : "en-US";
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
