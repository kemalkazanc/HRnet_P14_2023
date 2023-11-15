// DatePicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";

// Composant InputDatePicker qui utilise le DatePicker de MUI pour la sélection de date
// Composant pour selectionner la date
export default function InputDatePicker(props) {
  const { id, label, value, onChange, onError, helperText, minDate, maxDate } =
    props;

  // Rendu du composant DatePicker dans le cadre du composant LocalizationProvider,
  // qui utilise le système de date Dayjs (AdapterDayjs)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        onError={onError}
        // Configuration des slots et des propriétés de slot pour personnaliser le DatePicker
        slotProps={{
          actionBar: {
            actions: ["today", "clear"],
          },
          textField: {
            helperText: helperText,
          },
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
}
