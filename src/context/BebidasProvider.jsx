import { useState, useEffect, createContext } from 'react';
import axios from 'axios';


const BebidasContext = createContext();

export const BebidasProvider = ({ children }) => {

  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaID, setBebidaID] = useState(null);
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);


  useEffect(() => {
    setCargando(true)
    const obtenerReceta = async () => {
      if (!bebidaID) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaID}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);


      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false)
      }
    }
    obtenerReceta();
  }, [bebidaID])

  const consultarBebida = async datos => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;

      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickModal = () => {
    setModal(!modal);
  }

  const handleBebidaID = id => {
    setBebidaID(id)
  }


  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleClickModal,
        modal,
        handleBebidaID,
        receta,
        cargando
      }}
    >
      {children}
    </BebidasContext.Provider>
  )
}


export default BebidasContext;