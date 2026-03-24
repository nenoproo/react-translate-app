import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <div className="flex flex-col items-center mt-13 mb-17">
            <img src={logo} className="mb-2 w-36 lg:w-46" alt="Logo" />
            <p className="text-text-muted text-xs lg:text-sm text-center">
                Fluent, fast, and artfully precise translator.
            </p>
        </div>
    )
}

export default Header;
