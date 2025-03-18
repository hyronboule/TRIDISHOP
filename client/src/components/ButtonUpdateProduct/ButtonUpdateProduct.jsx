import React, { useState } from 'react'
import { Stack } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './buttonUpdateProduct.scss';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
// import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useUserContext } from '../../context/User';
// import reportForm from '../../services/reportProduct';
import { updateProductForm } from '../../services/updateProduct';
import { deleteConfirmation } from '../../services/deleteProduct';
import { useNavigate } from 'react-router-dom';


const ButtonUpdateProduct = ({ name, productId, setReload, tags }) => {
  const { infoUser } = useUserContext()
  const [nameUser, setNameUser] = useState(name)
  const {token} = useUserContext()
  const navigate = useNavigate()
  
  const deleteProduct = () => {
    // open a form for delete product
    deleteConfirmation(productId,token).then((result)=>{
      if (result) {
        // navigate to home page
        navigate('/home')
      }
    })
  }

  const updateProduct = () => {
    // open a form for update product
    setReload(false)
    updateProductForm(productId,token,tags).then((result) => {
      if (result === true) {        
        setReload(result)
      }
    });
  }

  // const reportProduct = () => {
  //   // open a form for reporting
  //   reportForm(nameFile)

  // }

  return (
    <>
      <Stack position={'absolute'} right={"15vw"} top={60} display={'flex'} flexDirection={'row'} gap={2}>
        {/* <button className='buttonUpdateProduct' onClick={() => {
          reportProduct()
        }}>
          <WarningAmberRoundedIcon fontSize='small' />
        </button> */}
        {
          infoUser.pseudo && nameUser === infoUser.pseudo &&   (
            <>
              <button className='buttonUpdateProduct' onClick={() => {
                deleteProduct()
              }}>
                <DeleteOutlinedIcon fontSize='small' />
              </button>
              <button className='buttonUpdateProduct' onClick={() => updateProduct()}>
                <CreateOutlinedIcon fontSize='small' />
              </button>
            </>
          )}
      </Stack>


    </>
  )
}

export default ButtonUpdateProduct