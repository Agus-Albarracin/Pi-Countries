import './Footer.css'
import LogoLi from "../../img/linkedin-logo.png"
import LogoGithub from "../../img/github.png"

export default function Footer(){
    return(
        <div className='footer-container'>
            <div>
                <a href='https://www.linkedin.com/in/lerkor-online/'><img className='img-footer' src={LogoLi} alt='li-logo' width="50px" height="50px" /></a>
                <a href='https://github.com/lerkor-online'><img className='img-footer' src={LogoGithub} alt='github-logo' width="50px" height="50px" /></a>
            </div>
            <span className='text-footer'>
                Copyright © 2023 LerkorDev. All Rights Reserved
            </span>
        </div>
    )
}