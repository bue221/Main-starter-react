import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
// import { exportComponentAsPNG } from "react-component-export-image";
import QRCode from "react-qr-code";
import WrapperAuth from "shared/components/Auth/WrapperAuth";
import MainLayout from "shared/components/layouts/MainLayout";
import { supabase } from "supabase/config";

const Ticket = () => {
  const {
    query: { id },
  } = useRouter();

  const [event, setEvent] = useState<any>([]);

  const getEvent = async () => {
    try {
      const { data } = await supabase
        .from("eventos")
        .select(
          "*, organizador: usuarios(*), etapas!inner(*, asignaciones!inner(*, asistente: usuarios!inner(*) ))"
        )
        .filter("id", "eq", id)
        .filter("etapas.asignaciones.idusuario", "eq", 2);
      setEvent(data && data[0]);
    } catch (error) {
      setEvent([]);
    }
  };

  useEffect(() => {
    if (id) {
      getEvent();
    }
  }, [id]);

  const exportImageRef = useRef<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-component-export-image").then(
        (module) => (exportImageRef.current = module)
      );
    }
  }, []);

  const refTicket = useRef(null);
  const onDownload = () => {
    return exportImageRef.current?.exportComponentAsJPEG(refTicket, {
      fileName: `${event?.nombre}-ticket`,
    });
  };

  const valueTicket =
    event?.etapas?.map((i: any) => i.asignaciones.map((i: any) => i)) || [];

  return (
    <WrapperAuth>
      <MainLayout>
        <Stack pb={8}>
          <Typography variant="h3" textAlign="center" my={4}>
            Tu ticket
          </Typography>
          <Box
            ref={refTicket}
            className="container"
            display="flex"
            justifyContent="center"
          >
            <div className="item">
              <div className="item-right">
                <h2 className="num">
                  {event?.etapas?.length > 0 && event?.etapas[0]?.id}
                </h2>
                <span className="up-border"></span>
                <span className="down-border"></span>
              </div>

              <div className="item-left">
                <p className="event">Rave Clud EVENTO</p>
                <h2 className="title">{event?.nombre}</h2>

                <div className="sce">
                  <div className="icon">
                    <i className="fa fa-table"></i>
                  </div>
                  <p>
                    organizador <br /> {event?.organizador?.nombre}
                  </p>
                </div>
                <div className="fix"></div>
                <div className="loc">
                  <div className="icon">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <p>
                    Ubicación <br /> {event?.locacion}
                  </p>
                </div>
                <div className="fix"></div>
                <QRCode
                  value={
                    valueTicket?.length &&
                    valueTicket[0]?.length &&
                    valueTicket[0][0]?.id
                  }
                  size={200}
                />
              </div>
            </div>
          </Box>
          <Button onClick={onDownload}>Descargar mi boleta</Button>
        </Stack>
      </MainLayout>
    </WrapperAuth>
  );
};
export default Ticket;
