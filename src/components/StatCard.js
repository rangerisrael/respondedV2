import React from "react";
import { Box, Typography } from "@mui/material";

const StatCard = ({ icon, count, countLabel, bgColor }) => {
    return (
        <Box
            display="flex"
            my="5px"
            alignItems="center"
            width="230px"
            height="100px"
            p="15px"
            backgroundColor={bgColor}
            borderRadius="10px"
        >
            {icon}
            <Box ml="10px">
                <Typography color="#ffffff" fontSize="24px" lineHeight={1}>
                    {count || 0}
                </Typography>
                <Typography color="#ffffff" fontSize="14px" lineHeight={1}>
                    {countLabel}
                </Typography>
            </Box>
        </Box>
    );
};

export default StatCard;
