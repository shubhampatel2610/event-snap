import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-center pt-5'>
            {children}
        </div>
    )
}

export default AuthLayout
