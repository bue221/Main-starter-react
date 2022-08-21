import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React from "react";

import FileSvg from "./FileSvg";
import { IProps, mimeType, extensions } from "./interfaces";
import { useStyles } from "./styled";

const FileUploader: React.FC<IProps> = ({
  typeAcceptFiles,
  multiple = false,
  setValue,
  nameValue,
  loading,
}) => {
  const styles = useStyles();

  let accept: any = {};
  // eslint-disable-next-line no-unused-vars
  const makeAccept = typeAcceptFiles?.map(
    (type) => (accept[mimeType[type]] = extensions[type])
  );
  const { getRootProps, getInputProps, open, acceptedFiles, isDragActive } =
    useDropzone({
      accept,
      multiple,
      noClick: true,
      noKeyboard: true,
      onDrop: (files) => {
        if (setValue) setValue(nameValue, files);
      },
    });

  return (
    <>
      <Box>
        <Box
          sx={{
            borderColor:
              isDragActive || acceptedFiles.length > 0
                ? "primary.main"
                : "text.secondary",
            borderStyle: acceptedFiles.length > 0 ? "solid" : "dashed",
            ...styles.containerDropzone,
          }}
        >
          <Box
            {...getRootProps({ className: "dropzone" })}
            sx={styles.dropzone}
          >
            {loading ? (
              <>
                <CircularProgress color="primary" />
                <Typography
                  fontSize="12px"
                  color="text.secondary"
                  fontWeight={400}
                  lineHeight="18px"
                >
                  Cargando
                </Typography>
              </>
            ) : (
              <>
                <input {...getInputProps()} />
                <FileSvg />
                {acceptedFiles.length > 0 ? (
                  acceptedFiles.map((file, index) => (
                    <Typography
                      key={index}
                      fontSize="12px"
                      color="text.secondary"
                      fontWeight={400}
                      lineHeight="18px"
                    >
                      {file.name}
                    </Typography>
                  ))
                ) : (
                  <Typography
                    fontSize="12px"
                    color="text.secondary"
                    fontWeight={400}
                    lineHeight="18px"
                  >
                    Arrastra y suelta tu archivo aquí
                  </Typography>
                )}
                <Button variant="outlined" onClick={open}>
                  Seleccionar archivo
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Typography
          mt={2}
          textAlign="center"
          fontSize="12px"
          color="text.secondary"
          fontWeight={400}
          lineHeight="18px"
        >
          {`Archivos soportados: ${typeAcceptFiles?.join(", ")}`}
        </Typography>
      </Box>
    </>
  );
};

export default FileUploader;
