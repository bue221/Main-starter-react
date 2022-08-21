import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

export default function HorizontalCard({ data }: any) {
  const router = useRouter();
  return (
    <Card
      sx={{ display: "flex", justifyContent: "space-around", maxWidth: 400 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data?.nombre}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={700}
            component="div"
          >
            Locación: {data?.locacion}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Organizador: {data?.organizador?.nombre}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button
            color="secondary"
            onClick={() => router.push(`/event/detail/${data?.id}`)}
          >
            Ver más
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/icon-512x512.png"
        alt="Live from space album cover"
      />
    </Card>
  );
}
