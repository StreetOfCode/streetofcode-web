import {NextPage} from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const AdminApp = dynamic(() => import('../admin/AdminApp'), {ssr: false})

const AdminPage: NextPage = () => {
  return <AdminApp />
}


export default AdminPage
