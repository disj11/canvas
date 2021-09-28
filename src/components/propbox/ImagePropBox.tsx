import PropBoxLayout from "./PropBoxLayout";
import {ImageUploadButton} from "../input";
import React from "react";
import PropBoxItem from "./PropBoxItem";
import {Grid} from "@material-ui/core";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";

const ImagePropBox = observer(() => {
    const {imageStore} = useStores();

    return (
        <PropBoxLayout>
            <PropBoxItem mb={3}>
                <ImageUploadButton
                    onChange={(files) => imageStore.upload(files)}
                />
            </PropBoxItem>
            <PropBoxItem>
                <Grid container={true} spacing={1}>
                    {imageStore.uploadedImages.map(image => (
                        <Grid
                            key={image.name}
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