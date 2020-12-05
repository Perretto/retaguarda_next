import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

function Page() {
        const [ session, loading ] = useSession()
        return (<div> 
                    {!session && <>
                    Você não esta logado <br/>
                    <button onClick={() => signIn('auth0')}>Logar</button>
                    </>}
                    {session && <>
                    Você esta logado como {session.user.email} <br/> 
                    <button onClick={() => signOut()}>Deslogar</button>
                    </>}      
            </div>);
}

export default Page