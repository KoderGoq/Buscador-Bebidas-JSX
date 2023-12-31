import { Modal, Image } from 'react-bootstrap';
import useBebidas from '../hooks/useBebidas';



const ModalBebida = () => {

  const { modal, handleClickModal, receta, cargando } = useBebidas();

  const monstrarIngredientes = () => {
    let ingredientes = [];

    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
        )
      }
    }

    return ingredientes;
  }

  return (
    !cargando && (
      <Modal show={modal} onHide={handleClickModal}>
        <Image
          src={receta.strDrinkThumb}
          alt={`Imagen receta ${receta.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='p-3'>
            <h2>Instrucciones</h2>
            {receta.strInstructions}
            <h2>Ingredientes y Cantidades</h2>
            {monstrarIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}

export default ModalBebida