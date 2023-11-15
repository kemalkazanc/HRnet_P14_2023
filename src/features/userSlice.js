// Redux
import { createSlice } from "@reduxjs/toolkit";
// API
import { GetUserData } from "../services/API/GetUserData";

// État initial du slice utilisateur, chargé depuis le localStorage ou avec des valeurs par défaut
const initialState = {
  id: localStorage.getItem("userID") ?? null,
  firstName: localStorage.getItem("userFirstName") ?? null,
  lastName: localStorage.getItem("userLastName") ?? null,
  isFetching: false, // Indique si une requête est en cours
  isError: false, // Indique s'il y a une erreur
  errorMessage: "", // Message d'erreur en cas d'échec
  successMessage: "", // Message de succès
};

// Création d'un slice Redux pour gérer l'état utilisateur
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Gestion de l'état suite à des actions
    clearUserState: (state) => {
      // Suppression des données utilisateur du localStorage
      localStorage.removeItem("userID", "userFirstName", "userLastName");
      localStorage.removeItem("userFirstName");
      localStorage.removeItem("userLastName");
      // Réinitialisation de l'état
      return {
        ...state,
        id: "",
        firstName: "",
        lastName: "",
        isFetching: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
      };
    },
    logout: (state) => {
      // Effacement complet du localStorage
      localStorage.clear();
      // Réinitialisation de l'état
      return {
        ...state,
        id: "",
        firstName: "",
        lastName: "",
        isFetching: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Gestion de l'état suite aux retours d'API
    // Mise à jour des états
    builder
      .addCase(GetUserData.fulfilled, (state, { payload }) => {
        return {
          ...state,
          id: payload.userData.id,
          firstName: payload.userData.firstName,
          lastName: payload.userData.lastName,
          isFetching: false,
          successMessage: "Login success",
        };
      })
      .addCase(GetUserData.rejected, (state, { payload }) => {
        return {
          ...state,
          isFetching: false,
          isError: true,
          errorMessage: "Request rejected",
        };
      })
      .addCase(GetUserData.pending, (state) => {
        return {
          ...state,
          isFetching: true,
        };
      });
  },
});

// Actions pour gérer l'état utilisateur
export const { clearUserState, logout } = userSlice.actions;

// Sélecteur pour récupérer l'état utilisateur
export const userSelector = (state) => state.user;

// Reducer exporté pour être utilisé dans le store Redux
export default userSlice.reducer;
