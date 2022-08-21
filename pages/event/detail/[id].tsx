import { AddLocation, Person, ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WrapperAuth from "shared/components/Auth/WrapperAuth";
import MainLayout from "shared/components/layouts/MainLayout";
import { supabase } from "supabase/config";

const Detail = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const [event, setEvent] = useState<any>([]);

  const getEvent = async () => {
    try {
      const { data } = await supabase
        .from("eventos")
        .select(
          "*, organizador: usuarios(*), etapas!inner(*, asignaciones!inner(*, asistente: usuarios!inner(*) ))"
        )
        .filter("id", "eq", id);
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

  console.log(event);
  return (
    <WrapperAuth>
      <MainLayout>
        <Container maxWidth="md">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box component="img" src="/icon-512x512.png" maxWidth={400} />
          </Box>
          <Stack mb={10}>
            <Typography maxWidth="md" noWrap fontWeight={600} variant="h3">
              {event?.nombre}
            </Typography>
            <Typography noWrap fontWeight={300} variant="body1" my={2}>
              {event?.descripcion}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Box
                sx={{
                  backgroundColor: "rgb(250 123 167 / 47%)",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Person />
              </Box>
              <Stack>
                <Typography variant="subtitle1">
                  {event?.organizador?.nombre}
                </Typography>
                <Typography variant="subtitle2">
                  {event?.organizador?.correo}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: "rgb(250 123 167 / 47%)",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddLocation />
              </Box>
              <Typography variant="subtitle1">{event?.locacion}</Typography>
            </Stack>
            <Divider sx={{ my: 4 }} />
            <Typography
              maxWidth="md"
              noWrap
              fontWeight={600}
              variant="h4"
              textAlign="center"
            >
              Etapas
            </Typography>
            <Stack mt={2} mb={8}>
              {event?.etapas?.map((i: any, index: number) => (
                <Accordion key={index} sx={{ mb: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreOutlined />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography fontWeight={800}>{i?.nombre}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{i?.descripcion}</Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mt={3}
                    >
                      <Typography>{i?.aforo}</Typography>
                      <Typography>
                        {new Intl.NumberFormat("es-CO").format(i?.precio)}
                      </Typography>
                      <Button variant="contained">Ver mas</Button>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-around"
              position="fixed"
              bottom={0}
              left={0}
              width="100%"
              sx={{
                // border: "1px solid black",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                backgroundColor: "primary.main",
              }}
              py={2}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => push(`/qr/ticket/${event.id}`)}
              >
                Ver mi boleta !!
              </Button>
              <Button
                color="secondary"
                href={`https://wa.me/57${event?.organizador?.telefono}?text=Holaaaa%20estoy%20interesado%20en%20Rave%20Clud`}
                target="__blank"
              >
                Contactar organizador
              </Button>
            </Stack>
          </Stack>
        </Container>
      </MainLayout>
    </WrapperAuth>
  );
};

export default Detail;
