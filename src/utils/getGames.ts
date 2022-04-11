const getGames = async () => {
    const request = await fetch(
        `${process.env.REACT_APP_API_URL}/getGames`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const response = await request.json();
    
    return response.data;
};

export default getGames;