const getRessource = async (ressourceName: string): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}ressources/json/${ressourceName}.json`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getRessource;
