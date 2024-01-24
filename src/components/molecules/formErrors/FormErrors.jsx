import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";

export function FormErrors({ errors }) {
  if (Object.keys(errors).length === 0) {
    return null;
  }

  return Object.entries(errors).map(([fieldName, errorMessage]) => (
    <Alert key={fieldName} severity="error" sx={{ width: "100%" }}>
      {errorMessage}
    </Alert>
  ));
}
FormErrors.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string),
};
