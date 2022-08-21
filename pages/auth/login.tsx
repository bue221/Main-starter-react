import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextFieldController from "shared/components/Inputs/TextFieldController";
import { supabase } from "supabase/config";

interface IForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [shownPass, setShowPass] = useState(false);

  const { handleSubmit, control } = useForm<IForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const handleShown = () => setShowPass(!shownPass);

  const onSubmit = async ({ email, password }: IForm) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (user) {
      router.push("/home");
      toast.info("Bienvenido raver 👽");
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        borderRadius: 8,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ px: 8, py: 4 }}>
        <Stack justifyContent="center" alignItems="center">
          <Image src="/icon-512x512.png" alt="logo" width={200} height={200} />
          <Stack mt={2}>
            <Typography variant="h4" fontWeight="bold">
              Inicio de sesión
            </Typography>
          </Stack>
          <Stack spacing={3} mt={6}>
            <TextFieldController
              name="email"
              label="Correo electrónico"
              type="email"
              control={control}
            />
            <TextFieldController
              name="password"
              label="Contraseña"
              control={control}
              type={shownPass ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShown}
                      edge="end"
                    >
                      {shownPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Iniciar sesión
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => router.push("/auth/register")}
            >
              Registrarse
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage;
