import { Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import HorizontalCard from "shared/components/Surfaces/HorizontalCard";
import { supabase } from "../supabase/config";
import WrapperAuth from "shared/components/Auth/WrapperAuth";
import { useRouter } from "next/router";
import MainLayout from "shared/components/layouts/MainLayout";
import { useAppSelector } from "redux/store/hooks";
import BasicSpeedDial from "shared/components/Navigation/SpeedDial";
import { Box } from "@mui/system";

const Home: NextPage = () => {
  const [events, setEvents] = useState<any>([]);

  const user = useAppSelector((state) => state.user.value);
  const getEventsOr = async () => {
    try {
      const { data } = await supabase
        .from("eventos")
        .select(
          "*, organizador: usuarios(*), etapas!inner(*, asignaciones!inner(*, asistente: usuarios!inner(*) ))"
        )
        .filter("organizador.id", "eq", user.id);
      setEvents(data);
    } catch (error) {
      setEvents([]);
    }
  };
  const getEvents = async () => {
    try {
      const { data } = await supabase
        .from("eventos")
        .select(
          "*, organizador: usuarios(*), etapas!inner(*, asignaciones!inner(*, asistente: usuarios!inner(*) ))"
        )
        .filter(
          "etapas.asignaciones.asistente.correo",
          "eq",
          "aplazaj3@gmail.com"
        );
      setEvents(data);
    } catch (error) {
      setEvents([]);
    }
  };

  useEffect(() => {
    if (user?.id !== 1) {
      getEventsOr();
    } else {
      getEvents();
    }
  }, [user]);

  return (
    <WrapperAuth>
      <MainLayout>
        {/* <pre>{JSON.stringify(events, null, 4)}</pre> */}
        <Typography variant="h4" fontWeight="bold" textAlign="center" mt={4}>
          Mis eventos
        </Typography>
        <Stack mt={4} spacing={2} px={1}>
          {events?.map((i: any, index: number) => (
            <HorizontalCard key={index} data={i} />
          ))}
        </Stack>
        <Box position="fixed" bottom="2em" right="2em">
          <BasicSpeedDial />
        </Box>
      </MainLayout>
    </WrapperAuth>
  );
};

export default Home;
