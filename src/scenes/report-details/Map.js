import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Box } from "@mui/material";
import LoadingNotif from "../../components/LoadingNotif";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const Map = ({ reportData }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCQULinj8QffTOZbUWHBb8bAAWut97xbF4",
    });

    return (
        <>
            <Box
                display="flex"
                my="5px"
                flexDirection="column"
                width="100%"
                gap={2}
            >
                {isLoaded && reportData ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: parseFloat(reportData.lat),
                            lng: parseFloat(reportData.lng),
                        }}
                        zoom={10}
                    >
                        <MarkerF
                            position={{
                                lat: parseFloat(reportData.lat),
                                lng: parseFloat(reportData.lng),
                            }}
                        />
                    </GoogleMap>
                ) : (
                    <LoadingNotif />
                )}
            </Box>
        </>
    );
};

export default Map;
