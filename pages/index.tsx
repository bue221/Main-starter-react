import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { useRouter } from "next/router";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Rave Clud
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Rave Clud",
    description: [
      { label: "raveclud369@gmail.com", value: "mailto:raveclud369@gmail.com" },
      {
        label: "Contactanos",
        value:
          "https://wa.me/573057845144?text=Holaaaa%20estoy%20interesado%20en%20Rave%20Clud",
      },
    ],
  },
  {
    title: "Aspectos legales",
    description: [
      {
        label: "Políticas de privacidad",
        value: "https://sites.google.com/view/politica-datos-rave-clud/inicio",
      },
      {
        label: "Terminos y condiciones",
        value: "https://sites.google.com/view/politica-datos-rave-clud/inicio",
      },
    ],
  },
];

function PricingContent() {
  const router = useRouter();
  const tiers = [
    {
      title: "Unico Plan",
      price: "500",
      description: [
        "Seguimiento y acompañamiento",
        "Cuenta tipo organizador para gestionar eventos",
        "Entrega de CSV y reportes",
        "Generacion de QR'S",
        "Hablitación de lectura de QR'S",
      ],
      buttonText: "Crea tu cuenta",
      buttonVariant: "outlined",
      subheader: "",
      onClick: () => router.push("/auth/register"),
    },
    // {
    //   title: "Pro",
    //   subheader: "Most popular",
    //   price: "15",
    //   description: [
    //     "20 users included",
    //     "10 GB of storage",
    //     "Help center access",
    //     "Priority email support",
    //   ],
    //   buttonText: "Get started",
    //   buttonVariant: "contained",
    // },
    // {
    //   title: "Enterprise",
    //   price: "30",
    //   description: [
    //     "50 users included",
    //     "30 GB of storage",
    //     "Help center access",
    //     "Phone & email support",
    //   ],
    //   buttonText: "Contact us",
    //   buttonVariant: "outlined",
    // },
  ];
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Rave Clud
          </Typography>
          <nav></nav>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => router.push("/auth/login")}
          >
            Iniciar sesión
          </Button>
        </Toolbar>
      </AppBar>
      {/* hero */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          borderRadius: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "url(https://images.xceed.me/blog/wp-content/uploads/2017/09/29122057/10_10499542_10152668382583755_2186614163480345366_o.jpg)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                fontWeight={700}
                gutterBottom
              >
                Gestiona la generación de QR&apos;S para tus eventos
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Disminuye la complejidad en la logista de tus eventos techno y
                permite que tus asistentes sientan una mejora en su experiencia,
                haz parte del cambio
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  window.open(
                    "https://wa.me/573057845144?text=Holaaaa%20estoy%20interesado%20en%20Rave%20Clud"
                  )
                }
              >
                Contactanos !!!
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight={800}
        >
          Precios
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          A continuacion podrás observar nuestros tres tipos de planes, sus
          precios beneficios y facilidades
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          justifyContent="center"
        >
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier?.subheader || ""}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "white",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /por boleta
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as "outlined" | "contained"}
                    onClick={tier.onClick}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="xl"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.value}
                      variant="subtitle1"
                      color="text.secondary"
                      target={
                        item.label === "raveclud369@gmail.com" ? "" : "__blank"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
