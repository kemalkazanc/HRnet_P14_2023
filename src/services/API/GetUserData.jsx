import { createAsyncThunk } from "@reduxjs/toolkit";

// Création de l'action asynchrone GetUserData
export const GetUserData = createAsyncThunk(
  "user/load",
  async (userId, thunkAPI) => {
    // Construction de l'URL pour obtenir les données de l'utilisateur
    let url = `./userMockedDatas/${userId}/user.json`;

    try {
      // Effectue une requête HTTP vers l'URL
      const response = await fetch(url);

      // Analyse la réponse JSON en cas de succès
      let data = await response.json();

      // Si la réponse a un statut 200 (OK)
      if (response.status === 200) {
        // Stocke les données de l'utilisateur dans le localStorage
        localStorage.setItem("userID", data.userData.id);
        localStorage.setItem("userLastName", data.userData.lastName);
        localStorage.setItem("userFirstName", data.userData.firstName);

        // Retourne un objet contenant les données de l'utilisateur
        return { ...data };
      }
    } catch (error) {
      console.log("Error", error.response.data);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
