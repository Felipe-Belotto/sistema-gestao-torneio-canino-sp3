import UpdateUserForm from '@/components/update-user-form/update-user'
import React, { Suspense } from 'react'

interface Props{
  params: {id : string}
}

function UpdateId ({params} : Props) {
  return (
    <section className='flex'>
     
        <UpdateUserForm id={params.id}/>
   
    </section>
  )
}

export default UpdateId
