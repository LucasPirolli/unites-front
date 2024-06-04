console.log(import.meta.env.VITE_BASE_PATH);

export const getInstituicao = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/instituicao`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getGrauAcademico = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/grauAcademico`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getLogin = async (cpf, passwd) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_PATH
      }/usuario/login/COD_CPF_USU/${cpf}/COD_SENHA_USU/${passwd}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
