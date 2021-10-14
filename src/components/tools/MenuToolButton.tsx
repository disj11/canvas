import React from "react";
import withStyles from '@mui/styles/withStyles';
import Menu, {MenuProps} from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ToolButton from "./ToolButton";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {useStores} from "../../hooks/useStores";
import {FileUtils} from "../../utils/FileUtils";

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function MenuToolButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {canvasStore} = useStores();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFileOpen = () => {
        inputRef.current?.click();
        handleClose();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        e.target.value = "";

        if (!!file) {
            FileUtils.read(file).then(jsonString => {
                canvasStore.canvas.loadFromJSON(jsonString, () => {
                    //
                })
            }).catch(e => console.error(e));
        }
    }

    const handleSave = () => {
        FileUtils.writeText("canvas.json", JSON.stringify(canvasStore.canvas.toJSON()));
        handleClose();
    }

    const handleImageSave = () => {
        const fullQuality = canvasStore.canvas.toDataURL();
        FileUtils.write("canvas.png", fullQuality);
        handleClose();
    }

    return (
        <div>
            <input
                type={"file"}
                onChange={handleFileChange}
                ref={inputRef}
                style={{display: "none"}}
                accept="application/json"
            />
            <ToolButton icon={<MenuIcon/>} text={"메뉴"} onClick={handleClick}/>
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleFileOpen}>
                    <ListItemIcon>
                        <DescriptionIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="열기"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleSave}>
                    <ListItemIcon>
                        <SaveIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="저장"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleImageSave}>
                    <ListItemIcon>
                        <SaveAltIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="이미지로 저장"/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}