import {  useState} from 'react'
import FormularioRegistrar from './FormularioRegistrar';


const Formulario = () => {


  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [logado, setLogado] = useState(false);

  const getLocalStorage = () => {
    const getLocal = localStorage.getItem('userData');
    if(getLocal) {
      return JSON.parse(getLocal)
    }
  }


  const handleEntrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUser('');
    setPassword('');
    if(user === getLocalStorage().email && password === getLocalStorage().password) {
      setLogado(true);
    } else {
      window.alert('Login ou Senha inválidos, crie uma nova conta!')
      setLogado(false);
    }
    if(user === '' || password === '') {
      window.alert('Este é um programa teste, se fez um cadastro e não consegue se logar, por favor, faça movamente')
      setLogado(false)
    }
  }

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLogado(!logado)
  }

  return (
    <section className='w-full flex flex-col justify-center items-center mt-10'>
      {!logado  ? <form action="" className='w-[80%] bg-sky-800 flex flex-col p-3 rounded-xl'>
        <label htmlFor="name" className='text-white'>Email:</label>
        <input type="text" id='name' className='bg-transparent border-sky-500 text-white py-1 outline-none focus:border-sky-600 px-2 border rounded-md' value={user} onChange={({target}) => setUser(target.value)} />
        <label htmlFor="password" className='text-white pt-2'>Senha:</label>
        <input type="password" id='password' className='bg-transparent border-sky-500 text-white py-1 outline-none focus:border-sky-600 px-2 border rounded-md' value={password} onChange={({target}) => setPassword(target.value)} />
        <span className='pt-1 pl-2 text-white decoration-solid text-sm'>Esqueci minha senha</span>
        <button className='self-center mt-4 bg-sky-400 text-white px-6 py-2 rounded-md opacity-80 hover:opacity-100' onClick={handleEntrar}>Entrar</button>
    </form> : <div className='w-[80%] flex flex-col justify-center items-center gap-3'>
        <span>Seja Bem-Vindo!</span>
        <span>Usuário: {getLocalStorage().user}</span>
        <span>Senha: {getLocalStorage().password}</span>
        <span>Email: {getLocalStorage().email}</span>
        <button onClick={handleBack} className='border py-2 px-10 rounded-md bg-sky-600 text-white opacity-80 hover:opacity-100'>VOLTAR</button>
      </div>}
    {!logado ? <FormularioRegistrar /> : null}
    </section>
  )
}

export default Formulario
