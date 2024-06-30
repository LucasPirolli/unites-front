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

export const getPesquisadores = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/pesquisador`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getPesquisadoresBySeqPes = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/pesquisador/SEQ_PES/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getPesquisadoresBySeqPro = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/pesquisador/SEQ_PRO/${id}`
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

export const getAreaAcademica = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/areaAcademica`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmpresa = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/empresa`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjetoBySeqUsu = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/projeto/SEQ_USU/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjetoBySeqPes = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/projeto/SEQ_PES/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPesquisaBySeqUsu = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/pesquisa/SEQ_USU/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPesquisaBySeqPro = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/pesquisa/SEQ_PRO/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPesquisadoresConectadosBySeqUsu = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/pesquisador/SEQ_USU/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjeto = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/projeto`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPesquisa = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/pesquisa`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getConexaoBySeqUsu = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/conexao/SEQ_USU/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getConexaoIncluindoBySeqUsu = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/conexao/incluindo/SEQ_USU/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFinanciamentoBySeqPro = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/financiamento/SEQ_PRO/${id}`
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

export const createInstituicao = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/instituicao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAreaAcademica = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/areaAcademica`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createEmpresa = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/empresa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createConexao = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/conexao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProjeto = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/projeto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPesquisa = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/pesquisa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateInstituicao = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/instituicao`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateAreaAcademica = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/areaAcademica`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateEmpresa = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/empresa`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/usuario`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePesquisa = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/pesquisa`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProjeto = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/projeto`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteInstituicao = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/instituicao/SEQ_INS/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};

export const deleteAreaAcademica = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/areaAcademica/SEQ_ARE/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};

export const deleteEmpresa = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/empresa/SEQ_EMP/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};

export const deleteConexao = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/usuario/conexao`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
