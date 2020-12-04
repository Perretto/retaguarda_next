import Link from 'next/link';
import Head from 'next/head'; 
import "../css/theme.css";
import "../vendor/font-awesome-5/css/fontawesome-all.css"
import "../vendor/font-awesome-4.7/css/font-awesome.css"
import "../vendor/mdi-font/css/material-design-iconic-font.css"

import "../vendor/bootstrap-4.1/bootstrap.min.css"

import "../vendor/animsition/animsition.min.css"
import "../vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css"
import "../vendor/wow/animate.css"
import "../vendor/css-hamburgers/hamburgers.min.css"
import "../vendor/slick/slick.css"
import "../vendor/select2/select2.min.css"
import "../vendor/perfect-scrollbar/perfect-scrollbar.css"
import "../node_modules/izitoast/dist/css/iziToast.min.css"   
import "../js/login.js"

import Image from 'next/image'

function Login(){
    return (
        
        <div className="animsition">
            <Head>  
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta name="description" content="au theme template"/>
                <meta name="author" content="Hau Nguyen"/>
                <meta name="keywords" content="au theme template"/>
            
                <title>Login</title>             

            </Head>
            <div className="page-wrapper">
                <div className="page-content--bge5">
                    <div className="container">
                        <div className="login-wrap">
                            <div className="login-content">
                                <div className="login-logo">  
                                <Image src="http://www.octoplex.com.br/images/icon/logo.png" width={200}  height={50} />
                                    <div className=" ">
                                        <div className="form-group"  style={{textAlign: 'left'}}>
                                            <label>CNPJ</label>
                                            <input id="cnpj" className="au-input au-input--full" type="text" name="cnpj" placeholder="CNPJ"/>
                                        </div>
                                        <div className="form-group" style={{textAlign: 'left'}}>
                                            <label>Login</label>
                                            <input id="login" className="au-input au-input--full" type="text" name="login" placeholder="Login"/>
                                        </div>
                                        <div className="form-group" style={{textAlign: 'left'}}>
                                            <label>Senha</label>
                                            <input id="senha" className="au-input au-input--full" type="password" name="senha"
                                                placeholder="Senha"/>
                                        </div>

                                        <button onClick={() => { console.log("cliquei"); }}  className="btn btn-theme btn-block" href="index.html" type="button"><i className="fa fa-lock"></i> ENTRAR</button>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       )
}

export default Login