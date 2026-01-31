// src/screens/LoginScreen.tsx
import PrimaryButton from "../PrimaryButton";
import logo from "../../media/logo.jpeg"
import google_logo from "../../media/Google__G__logo.svg.webp"
import apple_logo from "../../media/Apple_logo_grey.svg"

function GoLoginForm(){
  window.location.href = "/login"
}

const LoginScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-900 flex flex-col items-center p-6">
      <div className="mb-8 flex flex-col items-center">
        <img src={logo} alt="TAKI Logo" className="logo h-24 mx-auto" />
        <p className="text-text-100 text-center mt-4 text-lg">O seu destino é importante</p>
      </div>

      <div className="w-full max-w-md">
        <PrimaryButton className="w-full mb-4" onClick={GoLoginForm}>
          Criar conta / Entrar com número
        </PrimaryButton>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-muted-300"></div>
          <span className="mx-4 text-muted-300">ou</span>
          <div className="flex-grow border-t border-muted-300"></div>
        </div>

        <button className="w-full bg-bg-800 text-text-100 font-semibold py-3 px-6 rounded-lg mb-3 flex items-center justify-center">
          <img src={google_logo} alt="Google" className="w-5 h-5 mr-2" />
          Entrar com Google
        </button>
        <button className="w-full bg-bg-800 text-text-100 font-semibold py-3 px-6 rounded-lg flex items-center justify-center">
          <img src={apple_logo} alt="Apple" className="w-5 h-5 mr-2" />
          Entrar com Apple
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;