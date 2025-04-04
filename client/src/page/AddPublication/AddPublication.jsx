import React, { useState } from "react";
import "./addPublication.scss";
import { Container, Stack, Grid } from "@mui/material";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import InputText from "../../components/InputText/InputText";
import { colorVar } from "../../style/colorVar";
import { addNewProductApi } from "../../services/callApiProducts";
import { useUserContext } from "../../context/User";
import Swal from "sweetalert2";

const AddPublication = () => {
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const { infoUser } = useUserContext();
  const [displayImage, setDisplayImage] = useState();

  const validTags = (tags) => {
    let bool = false;
    if (tags.trim() !== "") {
      return (bool = /^(?:[\p{L}]+(?:,[\p{L}]+)*)?$/u.test(tags));
    } else {
      return bool;
    }
  };

  // add new product
  const handleClick = () => {
    if (validTags(tags)) {
      let tagArray = [];
      tags.split(",").forEach((tag) => {
        tagArray.push(tag.trim());
      });

      if (tagArray.length > 5) {
        Swal.fire({
          text: "Le nombre de tags est limité à 5.",
          icon: "error",
        });
        return;
      }

      if (price < 0 || price === undefined || typeof price === "number") {
        Swal.fire({
          text: "Le prix ne peut pas être négatif et doit être un chiffre.",
          icon: "error",
        });
        return;
      }
      if (!file || !file2) {
        Swal.fire({
          text: `Veuillez ajouter ${
            !file ? "l'image format jpeg" : !file2 && "le fichier 3D .glb"
          }`,
          icon: "error",
        });
        return;
      }
      if (!description || description.trim() === "") {
        Swal.fire({
          text: `Veuillez ajouter une description au produit`,
          icon: "error",
        });
        return;
      }

      let data = {
        pseudo: infoUser.pseudo,
        description: description,
        tags: tagArray,
        files: [file, file2],
        price: price,
      };

      addNewProductApi(data)
        .then((data) => {
          data &&
            Swal.fire({
              title: data.data.message.msg,
              icon: "success",
            });
        })
        .catch((err) => {
          resetValue();
          Swal.fire({
            title: "Erreur lors de l'ajout du produit",
            icon: "error",
          });
          console.error("not add a new product: ", err);
        });
      resetValue();
    } else {
      Swal.fire({
        text: "Les tags doivent être séparés par une virgule, ne pas commencer ou finir par une virgule et les mots ne doivent pas contenir de caractère spéciaux ou de nombre.",
        icon: "error",
      });
    }
  };

  const resetValue = () => {
    setDescription("");
    setFile();
    setFile2();
    setPrice();
    setTags("");
    setDisplayImage();
  };
  // add file to the variable file or file2
  const addFileInput = (event, setFileFunc, typeFile) => {
    const selectedFile = event.target.files[0];
    const mo = 300;
    const maxSize = mo * 1024 * 1024; // 300 Mo

    if (selectedFile && selectedFile.name.split(".")[1] === typeFile) {
      if (selectedFile.size > maxSize) {
        Swal.fire({
          icon: "error",
          text: `La taille du fichier ne doit pas dépasser ${mo} Mo.`,
        });
      } else {
        setFileFunc(selectedFile);

        if (selectedFile.name.split(".")[1] === "jpeg") {
          setDisplayImage(selectedFile);
        }
      }
    } else {
      setFileFunc();
      setDisplayImage();
      Swal.fire({
        text: `Veuillez selectionner un fichier valide ou le type de fichier n'est pas correct. Importer un fichier ${typeFile} `,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Container
        className="page"
        maxWidth="100vw"
        sx={{ minHeight: "100%", display: "flex", justifyContent: "center" }}
      >
        <Stack
          margin={"0px 20px"}
          height={{ xs: "80vh", md: "70vh" }}
          width={{ xs: "100vw", lg: "90vw" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <h1 className="secondTitle" style={{ width: "100%" }}>
            Nouvelle Publication:
          </h1>

          <Grid
            position={"relative"}
            height={{ xs: "90%" }}
            width={"100%"}
            borderRadius={5}
            padding={{ xs: 3, md: 5, lg: 10 }}
            container
            sx={{ background: colorVar.backgroundPaleGrey }}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Grid
              item
              width={{ xs: "100%", md: "50%" }}
              height={{ xs: "40%", md: "100%" }}
              display={"flex"}
              flexDirection={"column"}
              alignItems={{ xs: "center", md: "start" }}
              justifyContent={{ xs: "space-evenly", md: "flex-start" }}
              gap={{ md: 18 }}
            >
              <textarea
                className="inputAddPubli textarea"
                placeholder="Description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Stack>
                <Stack flexDirection={"row"} gap={5}>
                  <InputText
                    placeholder={"Rentrez tags...."}
                    className={"inputAddPubli"}
                    value={tags}
                    setValue={setTags}
                  />
                  <InputText
                    placeholder={"Prix...."}
                    className={"inputAddPubli"}
                    value={price}
                    type={"number"}
                    setValue={setPrice}
                  />
                </Stack>
                <p style={{ fontSize: "10px", marginTop: "10px" }}>
                  *format des tags: "tags,tags"... (obligatoire)
                </p>
              </Stack>
            </Grid>

            <Grid
              item
              width={{ xs: "100%", md: "50%" }}
              height={{ xs: "50%", md: "70%", lg: "90%" }}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                sx={{
                  width: { sm: "280px", xs: "200px", md: "350px" },
                  height: { xs: "40%", sm: "120px", md: "140px" },
                  background: "grey",
                  marginTop: "10px",
                  borderRadius: 3,
                }}
              >
                {displayImage && (
                  <img
                    alt="image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    src={URL.createObjectURL(displayImage)}
                  />
                )}
              </Stack>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="file" className="labelAddFile">
                  {file ? file.name : "Importer image (jpeg)..."}
                </label>
                <input
                  type="file"
                  accept=".jpeg"
                  name="file"
                  id="file"
                  onChange={(e) => addFileInput(e, setFile, "jpeg")}
                  style={{ display: "none" }}
                />
              </div>

              <div>
                <label htmlFor="file2" className="labelAddFile">
                  {file2 ? file2.name : "Importer fichier 3D..."}
                </label>
                <input
                  type="file"
                  accept=".glb"
                  name="file2"
                  id="file2"
                  onChange={(e) => addFileInput(e, setFile2, "glb")}
                  style={{ display: "none" }}
                />
              </div>

              <p style={{ fontSize: "10px" }}>
                *choisissez votre image et le fichier3D... (obligatoire)
              </p>
            </Grid>
            <button
              className="buttonValidation buttonAddProduct"
              onClick={() => {
                handleClick();
              }}
            >
              Publier
            </button>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default AddPublication;
