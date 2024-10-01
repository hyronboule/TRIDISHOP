import React from 'react'
import { useParams } from 'react-router-dom'

const DetailProduct = () => {
    const {ProductId} = useParams()
  return (
    <div>DetailProduct: {ProductId}</div>
  )
}

export default DetailProduct