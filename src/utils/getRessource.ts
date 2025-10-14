import type { Language } from "../contexts/LanguageContext";

const getRessource = async (ressourceName: string, lang: Language): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}ressources/json/${lang}/${ressourceName}.json`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getRessource;
