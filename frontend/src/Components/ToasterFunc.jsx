import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToasterFunc = () => {
  return (
    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
            success: {
                duration: 2000,
                style: {
                background: 'green',
                color: 'white',
                },
            },
            error: {
                duration: 1500,
                style: {
                background: 'red',
                color: 'white',
                },
            },
        }}
    />
  )
}

export default ToasterFunc