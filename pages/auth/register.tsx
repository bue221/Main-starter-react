import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  Stack,
  Typography,
  Button,
  Checkbox,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SelectController from "shared/components/Inputs/SelectController";
import TextFieldController from "shared/components/Inputs/TextFieldController";
import { supabase } from "supabase/config";

interface IForm {
  email: string;
  password: string;
  habeasData: boolean;
  documentType: number;
  document: number;
  nombre: string;
  phone: number;
}

const RegisterPage = () => {
  const [shownPass, setShowPass] = useState(false);

  const { handleSubmit, control, register, watch } = useForm<IForm>({
    defaultValues: {
      email: "",
      password: "",
      habeasData: true,
    },
  });

  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
    phone,
    document,
    nombre,
    documentType,
  }: IForm) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (user) {
      const { status, error } = await supabase.from("usuarios").insert({
        iduserauth: user?.id,
        nombre,
        correo: email,
        tipo_documento: documentType,
        numero_documento: document,
        telefono: phone,
      });
      if (status === 201) {
        toast.success("Usuario creado correctamente");
        router.push("/auth/login");
      } else {
        toast.error(error?.message);
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
      <Paper sx={{ px: 8, py: 4, my: 4 }}>
        <Stack justifyContent="center" alignItems="center">
          <Image src="/icon-512x512.png" alt="logo" width={200} height={200} />
          <Stack mt={2}>
            <Typography variant="h4" fontWeight="bold">
              Registrate en Rave Clud
            </Typography>
          </Stack>
          <Stack spacing={3} mt={6}>
            <TextFieldController
              name="nombre"
              label="Nombres y apellidos"
              type="text"
              control={control}
            />
            <SelectController
              label="Tipo de documento"
              control={control}
              name="documentType"
              items={[
                { label: "Cédula de ciudadanía", value: "CC" },
                { label: "Pasaporte", value: "Pasaporte" },
              ]}
            />
            <TextFieldController
              name="document"
              label="Número de documento"
              type="number"
              control={control}
            />
            <TextFieldController
              name="phone"
              label="Telefono"
              type="number"
              control={control}
            />
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
            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={watch("habeasData")}
                {...register("habeasData")}
              />
              <Typography>
                Acepta los{" "}
                <Typography
                  component="a"
                  href="https://sites.google.com/view/politica-datos-rave-clud/inicio"
                  target="__blank"
                  sx={{
                    textDecoration: "underline",
                    color: "secondary.main",
                  }}
                >
                  terminos y condiciones
                </Typography>
              </Typography>
            </Stack>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Registrarse
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
