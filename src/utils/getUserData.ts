import { User } from "../interfaces/user";

const getUserData = async () => {
    const request = await fetch(`${process.env.REACT_APP_API_URL}/userdata`, {
        method: "GET",
        headers: {
            authorization: localStorage.getItem("token") as string,
        },
    });

    const response: {
        success: boolean;
        message: string;
        data: User;
    } = await request.json();

    return response.data;
}

export default getUserData;