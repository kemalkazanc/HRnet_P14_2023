// Redux
import { createSlice } from "@reduxjs/toolkit";

// État initial du slice des employés, chargé à partir du localStorage ou une liste vide
const initialState = {
  employees: JSON.parse(localStorage.getItem("employees")) ?? [],
};

// Création d'un "slice" de Redux pour gérer l'état des employés
// liste des actions "Ajouter / Supprimer / Réinitialiser" des employés
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees = [...state.employees, action.payload];
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },

    deleteEmployee: (state, action) => {
      let selected = action.payload;
      state.employees = state.employees.filter(
        (el) => !selected.includes(el.employeeID)
      );
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },

    clearEmployeeState: () => {
      return {
        employees: [],
      };
    },
  },
});

// Actions pour gérer l'état des employés
export const { addEmployee, deleteEmployee, clearEmployeeState } =
  employeesSlice.actions;

// Sélecteur pour récupérer l'état des employés
export const employeeSelector = (state) => state.employees;

// Reducer exporté pour être utilisé dans le store Redux
export default employeesSlice.reducer;
