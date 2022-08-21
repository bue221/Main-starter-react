import { Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "redux/store/hooks";
import WrapperAuth from "shared/components/Auth/WrapperAuth";
import FileUploader from "shared/components/Inputs/FileUploader";
import TextFieldController from "shared/components/Inputs/TextFieldController";
import MainLayout from "shared/components/layouts/MainLayout";
import { supabase } from "supabase/config";

interface IForm {
  imagen: any;
  nombre: string;
  descripcion: string;
  locacion: string;
}

const create = () => {
  const { control, setValue, handleSubmit } = useForm<IForm>({});

  const idUser = useAppSelector((state) => state.user?.value?.id);
  const session = supabase.auth.session();
  console.log(session);
  const onSubmit = async (info: IForm) => {
    alert("hola");
    console.log(info);
    const image = info.imagen[0];
    console.log(image);
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${image.name}${id}`, image, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(error);

    const id = Math.random().toString(36).substr(2, 18);
    const { publicURL } = supabase.storage
      .from("images")
      .getPublicUrl(`public/${image.name}${id}`);

    if (publicURL) {
      const { status } = await supabase
        .from("eventos")
        .insert({ ...info, imagen: publicURL });
      if (status === 201) {
        toast.success("Evento creado");
      } else {
        toast.error("error");
      }
    } else {
      toast.error("Error 222");
    }
  };

  return (
    <WrapperAuth>
      <MainLayout>
        <Container maxWidth="sm">
          <Typography variant="h3" fontWeight="bold" my={8} textAlign="center">
            Crea tu evento
          </Typography>
          <Stack alignItems="center" justifyContent="center" spacing={4}>
            <FileUploader
              typeAcceptFiles={["JPG", "PNG"]}
              setValue={setValue}
              nameValue="imagen"
            />
            <TextFieldController
              control={control}
              name="nombre"
              label="Nombre del evento"
            />
            <TextFieldController
              control={control}
              name="descripcion"
              label="Descripción"
              multiline
              rows={4}
            />
            <TextFieldController
              control={control}
              name="locacion"
              label="Locación"
            />
            <Button onClick={handleSubmit(onSubmit)} variant="contained">
              Crear evento
            </Button>
          </Stack>
        </Container>
      </MainLayout>
    </WrapperAuth>
  );
};

export default create;
