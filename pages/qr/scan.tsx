import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import WrapperAuth from "shared/components/Auth/WrapperAuth";
import MainLayout from "shared/components/layouts/MainLayout";

const Test = (props: any) => {
  const [data, setData] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data === "") {
      handleClose();
    } else {
      handleClickOpen();
    }
  }, [data]);

  return (
    <WrapperAuth>
      <MainLayout>
        <>
          <Container maxWidth="sm">
            <Typography my={4} variant="h3" fontWeight={600} textAlign="center">
              Escanea tu QR
            </Typography>
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result?.text);
                  alert(result);
                }

                if (error) {
                  console.info(error);
                }
              }}
              containerStyle={{ height: "50vh" }}
              videoContainerStyle={{ height: "50vh" }}
              videoStyle={{ height: "50vh" }}
              scanDelay={200}
              constraints={{ facingMode: "environment" }}
            />
            <p>{data}</p>
          </Container>
        </>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            El siguiente usuario cuenta con un QR valido
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si deseas ingresar a Andres Plaza identificado con la cedula
              1001298785 presiona ACEPTAR en caso contrario CANCELAR
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              CANCELAR
            </Button>
            <Button
              onClick={() => {
                setData("");
                handleClose();
              }}
              autoFocus
            >
              ACEPTAR
            </Button>
          </DialogActions>
        </Dialog>
      </MainLayout>
    </WrapperAuth>
  );
};
export default Test;
