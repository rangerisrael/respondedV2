import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography } from "@mui/material";

const colors = [
    "hsl(239, 70%, 50%)",
    "hsl(36, 70%, 50%)",
    "hsl(118, 70%, 50%)",
    "hsl(118, 70%, 50%)",
    "hsl(173, 70%, 50%)",
    "hsl(234, 70%, 50%)",
];

const TotalReportsGraph = ({
    totalPendings,
    totalReports,
    totalResponds,
    totalDeclines,
}) => {
    const [summaryReport, setSummaryReport] = useState(null);
    useEffect(() => {
        setSummaryReport([
            {
                id: "totalDeclines",
                label: "Total Declines",
                value: totalDeclines,
                color: colors[1],
            },
            {
                id: "totalResponds",
                label: "Total ",
                value: totalResponds,
                color: colors[2],
            },
            {
                id: "totalPendings",
                label: "Total Pendings",
                value: totalPendings,
                color: colors[3],
            },
        ]);
    }, [totalReports]);

    return (
        <Box
            display="flex"
            height="270px"
            border="1px solid #B9B7BD"
            borderRadius="7px"
            justifyContent="space-between"
        >
            {/*Report Text Summary*/}
            <Box
                display="flex"
                flexDirection="column"
                gap={1}
                width="230px"
                padding="40px 0 40px 40px"
            >
                <Typography variant="h6" component="h3">
                    Reports Summary
                </Typography>
                <Typography>{`Total Reports: ${totalReports}`}</Typography>
                <Typography>{`Total Responds: ${totalResponds}`}</Typography>
                <Typography>{`Total Declines: ${totalDeclines}`}</Typography>
                <Typography>{`Total Pendings: ${totalPendings}`}</Typography>
            </Box>
            <Box width="500px">
                <ResponsivePie
                    data={summaryReport}
                    margin={{ top: 60, right: 100, bottom: 100, left: 100 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                    }}
                    defs={[
                        {
                            id: "dots",
                            type: "patternDots",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: "ruby",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "c",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "go",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "python",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "scala",
                            },
                            id: "lines",
                        },
                        {
                            match: {
                                id: "lisp",
                            },
                            id: "lines",
                        },
                        {
                            match: {
                                id: "elixir",
                            },
                            id: "lines",
                        },
                        {
                            match: {
                                id: "javascript",
                            },
                            id: "lines",
                        },
                    ]}
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000",
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </Box>
        </Box>
    );
};

export default TotalReportsGraph;
