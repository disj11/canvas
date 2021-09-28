import {Button} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";

interface Props {
    onChange?: (files: File[]) => void;
}

const ImageUploadButton = ({onChange}: Props) => {
    const inputRef = React.useRef<null | HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const files = e.target.files ? Array.from(e.target.files) : [];
            onChange(files);
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type={"file"}
                style={{display: "none"}}
                accept={"image/*"}
                multiple={true}
                onChange={handleChange}
            />
            <Button
                variant={"contained"}
                color={"primary"}
                startIcon={<PublishIcon/>}
                onClick={() => inputRef.current?.click()}
            >
                이미지 추가
            </Button>
        </>
    )
}

export default ImageUploadButton;