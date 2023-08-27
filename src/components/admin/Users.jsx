import React from 'react'
import BasicTable from '../auth/ActiveUsers'
import { PrimaryButton } from './CommonStyled'
import { Link } from 'react-router-dom'
// import  from '../List/ProductTable'

const Users = () => {
  return (
    <div style={{margin:'2rem'}}>
      <Link to='/admin/summary'>
      <PrimaryButton>
Admin
</PrimaryButton>
      </Link>
      
      <BasicTable/>
    </div>
  )
}

export default Users