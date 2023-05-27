import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
    return (
        <Box my="5px">
            <Typography variant="h5" component="h2">
                {title}
            </Typography>
            <Typography fontWeight={400} fontSize="16px">
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
