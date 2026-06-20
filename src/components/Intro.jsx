import moviecards from '../assets/moviecards.png'
import logo from '../assets/logo.png'
export default function Intro() {
    return (
	<div className='title'>
	<img src={logo} alt="logo" className="mx-auto w-25 h-20"/>
	<img src={moviecards} alt="hero" className="mx-auto w-100 h-85" />
	<h1 className='text-center text-gradient'>the Next Movie awaits you!
	</h1>
	</div>
    )
}

