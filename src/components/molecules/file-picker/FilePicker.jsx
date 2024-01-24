import { useState } from "react";
import PropTypes from "prop-types";
import { useDropzone, ErrorCode } from "react-dropzone";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, lighten } from "@mui/material/styles";

const StyledDropzone = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  borderWidth: 2,
  borderRadius: 2,
  borderColor: theme.palette.primary.main,
  borderStyle: "dashed",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  outline: "none",
  transition: theme.transitions.create(["border-color", "background-color"]),
  cursor: "pointer",
  "&:hover": {
    borderColor: lighten(theme.palette.primary.main, 0.5),
    backgroundColor: lighten(theme.palette.primary.main, 0.99),
  },
}));

const MIME_MAP = {
  "text/csv": [".csv"],
  "application/vnd.ms-excel": [".csv"],
};

function mapMimeTypeToExtension(mimeType, existingExtensions = []) {
  if (existingExtensions.length > 0) {
    return existingExtensions;
  }
  return MIME_MAP[mimeType];
}

function showFileErrorAlert(errorCode) {
  switch (errorCode) {
    case ErrorCode.FileTooLarge:
      return alert("File is too large for virus scan!");
    case ErrorCode.FileInvalidType:
      return alert("File type is not supported!");
    case ErrorCode.TooManyFiles:
      return alert("Only one file is allowed!");
    default:
      return alert("An unknown error occurred!");
  }
}

function handleFileSelection(onAcceptedFiles, onRejectedFiles) {
  return (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const [rejectedFile] = rejectedFiles;
      onRejectedFiles(rejectedFiles);
      return showFileErrorAlert(rejectedFile.errors[0].code);
    }
    onAcceptedFiles(acceptedFiles);
  };
}

const dragActiveStyle = {
  borderColor: lighten("#8e227b", 0.5),
  backgroundColor: lighten("#8e227b", 0.99),
  fontWeight: "bold",
};

export function FilePicker({ onFileSelect, supportedFileTypes, maxFileSize }) {
  const [file, setFile] = useState(null);

  const onDrop = handleFileSelection(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      onFileSelect(acceptedFiles[0]);
    },
    () => {
      setFile(null);
    }
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: supportedFileTypes,
    maxSize: maxFileSize,
  });

  return (
    <Stack spacing={2}>
      <StyledDropzone
        {...getRootProps({
          style: {
            ...(isDragActive ? dragActiveStyle : {}),
          },
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the file here ...</Typography>
        ) : (
          <Typography>
            Drag and drop a file here, or click to select a file
          </Typography>
        )}
      </StyledDropzone>
      {file && (
        <Typography>
          <b>Selected File:</b> {file.name} ({file.size} bytes)
        </Typography>
      )}
      {supportedFileTypes && (
        <Typography>
          <b>Supported file types:</b>{" "}
          {Object.entries(supportedFileTypes)
            .map(([type, extensions]) =>
              mapMimeTypeToExtension(type, extensions)
            )
            .join(", ")}
        </Typography>
      )}
    </Stack>
  );
}

FilePicker.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  supportedFileTypes: PropTypes.object,
  maxFileSize: PropTypes.number,
};
