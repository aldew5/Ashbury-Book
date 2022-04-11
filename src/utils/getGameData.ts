const getGameData = async (name: string) => {
    const request = await fetch(
        `${process.env.REACT_APP_API_URL}/gamedata/${name}`,
        {
            method: "GET",
            headers: {
                authorization: localStorage.getItem("token") as string,
            },
        }
    );
    const response = await request.json();

    return response.data;
};

export default getGameData;