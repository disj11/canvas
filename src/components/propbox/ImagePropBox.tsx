import PropBoxLayout from "./PropBoxLayout";
import {ImageUploadButton} from "../input";
import React from "react";
import PropBoxItem from "./PropBoxItem";
import {Grid} from "@material-ui/core";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";

interface LoadedImage {
    id: string;
    name: string;
    dataUrl: string;
}

const ImagePropBox = observer(() => {
    const {imageStore} = useStores();
    const [images, setImages] = React.useState<LoadedImage[]>([]);

    const readFileAsync = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject();
            reader.readAsDataURL(file);
        })
    }

    const handleImageFileChange = (files: File[]) => {
        files.forEach(async (file) => {
            const dataUrl = await readFileAsync(file);
            if (typeof dataUrl === "string") {
                setImages([...images, {
                    id: file.name,
                    name: file.name,
                    dataUrl: dataUrl,
                }]);
            }
        });
    }

    return (
        <PropBoxLayout>
            <PropBoxItem mb={3}>
                <ImageUploadButton
                    onChange={handleImageFileChange}
                />
            </PropBoxItem>
            <PropBoxItem>
                <Grid container={true} spacing={1}>
                    {images.map(image => (
                        <Grid
                            key={image.id}
                            item={true}
                            onClick={() => imageStore.addImage(image.dataUrl)}
                            style={{cursor: "pointer"}}
                        >
                            <img
                                src={image.dataUrl}
                                alt={image.name}
                                style={{
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </PropBoxItem>
        </PropBoxLayout>
    )
})

export default ImagePropBox;