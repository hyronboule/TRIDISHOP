import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './buttonUpdateProduct.scss';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useUserContext } from '../../context/User';
import reportForm from '../../services/reportProduct';
import { updateProductForm } from '../../services/updateProduct';
import { deleteConfirmation } from '../../services/deleteProduct';
import { useNavigate } from 'react-router-dom';


const ButtonUpdateProduct = ({ name, productId, setReload }) => {
  const { infoUser } = useUserContext()
  const [nameUser, setNameUser] = useState(name)
  const navigate = useNavigate()

  const deleteProduct = () => {
    // open a form for delete product
    deleteConfirmation(productId).then((result)=>{
      if (result) {
        // navigate to home page
        navigate('/')
      }
    })
  }

  const updateProduct = () => {
    // open a form for update product
    setReload(false)
    updateProductForm(productId).then((result) => {
      if (result === true) {        
        setReload(result)
      }
    });
  }

  const reportProduct = () => {
    // open a form for reporting
    reportForm(nameFile)

  }

  return (
    <>
      <Stack position={'absolute'} right={"15vw"} top={45} display={'flex'} flexDirection={'row'} gap={2}>
        <button className='buttonUpdateProduct' onClick={() => {
          reportProduct()
        }}>
          <WarningAmberRoundedIcon fontSize='small' />
        </button>
        {
          nameUser === infoUser.pseudo && (
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