// Mui conponenets
import { TextField } from "@mui/material";

// Composant InputTextField qui encapsule la composante TextField de MUI
export default function InputTextField(props) {
  // Destructuration des propriétés (props) passées au composant
  const {
    isError,
    autoFocus,
    id,
    label,
    name,
    helperText,
    inputRef,
    onChange,
    value,
    type,
    errorUserId,
    errorName,
    errorLabel,
    errorHelperText,
  } = props;

  // Rendu conditionnel basé sur la présence d'une erreur
  return (
    <div>
      {isError ? (
        // Si une erreur est présente, rend un TextField avec l'attribut error activé
        <TextField
          error
          fullWidth
          required
          id={errorUserId}
          name={errorName}
          label={errorLabel}
          helperText={errorHelperText}
          inputRef={inputRef}
          onChange={onChange}
          value={value}
        />
      ) : (
        // Si aucune erreur n'est présente, rend un TextField standard
        <TextField
          fullWidth
          autoFocus={autoFocus}
          required
          id={id}
          label={label}
          name={name}
          variant="outlined"
          type={type}
          helperText={helperText}
          inputRef={inputRef}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}
