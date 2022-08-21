import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  Stack,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Paper,
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
  habeasData: boolean;
}

const RegisterPage = () => {
  const [shownPass, setShowPass] = useState(false);

  const { handleSubmit, control } = useForm<IForm>({
    defaultValues: {
      email: "",
      password: "",
      habeasData: true,
    },
  });

  const router = useRouter();

  const onSubmit = async ({ email, password }: IForm) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (user) {
      const { status } = await supabase
        .from("usuarios")
        .update({ iduserauth: user?.id })
        .ilike("correo", `%${email}%`);
      if (status === 200) {
        toast.success("Cambio de contraseña exitoso");
        router.push("/auth/login");
      }
    } else {
      toast.error(error?.message);
    }
  };

  const handleShown = () => setShowPass(!shownPass);

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
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              mb={2}
            >
              Holaa raver! 👽
            </Typography>
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              Estás a punto de obtener tu boleta, por favor cambia tu contraseña
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
              Cambiar contraseña
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => router.push("/auth/login")}
            >
              Iniciar sesión
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
