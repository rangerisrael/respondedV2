import { useState, useEffect } from "react";
import { parseResult } from "../helper";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase";

const usersRef = ref(db, "Registered Users");

export const useUserList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        setIsLoading(true);
        onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            console.log("res: ", users);

            const parsedRes = parseResult(users);
            setData(parsedRes);
            console.log("parse: ", parsedRes);
        });
    }, []);

    return { data, isLoading, setIsLoading };
};
