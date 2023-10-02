import React, { useState, useContext} from 'react';
import {Estado} from '../types/estados';
import { UserContext } from '../contexts/UserContext';




const FormularioRegistrar = () => {

  const dataCtx = useContext(UserContext)


  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [erroCep , setErroCep] = useState(false);
  const [confirmSenha, setConfirmSenha] = useState('');
  const [createLogin, setCreateLogin] = useState(false);

  const [myLocalStorage, setMyLocalStorage] = useState({
    user: '',
    password: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
  });

  const saveToLocalStorage = () => {
    localStorage.setItem('userData', JSON.stringify(myLocalStorage));
  };

  const limparCampo = () => {
    setCep('');
    setLogradouro('');
    setBairro('');
    setCidade('');
    setEstado('') ;
    setNumero('');
  }

  const cadastrarUsuario = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(dataCtx?.user && dataCtx?.password && dataCtx.email && cep && logradouro && bairro && cidade && estado && numero) {
      setMyLocalStorage({
        user: dataCtx?.user,
        password: dataCtx?.password,
        email: dataCtx?.email,
        cep: cep,
        logradouro: logradouro,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        numero: numero,
      });
      saveToLocalStorage();
      limparCampo();
      setCreateLogin(!createLogin);
    } else {
      window.alert('Preencha todos os campos para criar uma conta')
    }
    
  };
  saveToLocalStorage();
  
  const criarNovoUsuario = () => {
    const apply = confirm('Se criar um novo cadastro, o antigo será excluido')
    if(apply) {
      setCreateLogin(!createLogin)
    if(myLocalStorage) {
      setMyLocalStorage({
        user: '',
        password: '',
        email: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        numero: '',
      });
    }
    }
  }


  const estadosBrasil: Estado[] = [
    {value: '' , label: 'Selecione seu Estado'},
    { value: "AC", label:"Acre" },
    { value: "AL", label:"Alagoas"},
    {value:'AP',label:'Amapá'},
    {value:'AM',label:'Amazonas'  },
    {value:'BA',label:'Bahia'},
    {value:'CE',label:'Ceará'},
    {value:'DF',label:'Distrito Federal'},
    {value:'ES',label:'Espírito Santo'},
    {value:'GO',label:'Goiás'},
    {value:'MA',label:'Maranhão'},
    {value:'MT',label:'Mato Grosso do Sul'},
    {value:'MS',label:'Mato Grosso'},
    {value:'MG',label:'Minas Gerais'},
    {value:'PA',label:'Pará'},
    {value:'PB',label:'Paraíba'},
    {value:'PR',label:'Paraná'},
    {value:'PE',label:'Pernambuco'},
    {value:'PI',label:'Piauí'},
    {value:'RJ',label:'Rio de Janeiro'},
    {value:'RN',label:'Rio Grande do Norte'},
    {value:'RS',label:'Rio Grande do Sul'},
    {value:'RO',label:'Rondônia'},
    {value:'RR',label:'Roraima'},
    {value:'SC',label:'Santa Catarina'},
    {value:'SP',label:'São Paulo'},
    {value:'SE',label:'Sergipe'},
    {value:'TO',label:'Tocantins'},
  ]


  async function getCep(cep: string) {
    const cepValido = cep.toString();
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValido}/json/`);
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados do CEP');
      }
      if(response.status === 200) {
        const json = await response.json();
      setLogradouro(json.logradouro);
      setBairro(json.bairro);
      setCidade(json.localidade);
      setEstado(json.uf);
      setErroCep(false)
      }
    } catch (error) {
     setErroCep(true);
    }
  }
  function preecherEndereco(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
      getCep(cep);
  }




  return (
    <div>
       <section className='w-full flex flex-col justify-center items-center mt-10 mb-10'>
        <h1 className='text-center text-4xl text-sky-500 font-semibold mb-5'>Cadastro de usuário</h1>
          {!createLogin ? <form action="" className='bg-sky-600 flex flex-col p-3 w-[80vw] rounded-xl'>
            <label htmlFor="nome" className='text-white mt-3 text-sm'>Nome</label>
            <input type="text" id='nome' value={dataCtx?.user} onChange={({target}) => dataCtx?.setUser(target.value)}
            className='bg-red-300 border border-sky-200 
            outline-none rounded-md bg-transparent py-1 px-2 text-white'/>
            <label htmlFor="email" className='text-white mt-3 text-sm'>Email:</label>
            <input type="email" id='email' value={dataCtx?.email} onChange={({target}) => dataCtx?.setEmail(target.value)}
            className='bg-red-300 border border-sky-200 
            outline-none rounded-md bg-transparent py-1 px-2 text-white'/>
            <label htmlFor="senha" className='text-white mt-3 text-sm'>Senha:</label>
            <input type="password" id='senha' value={dataCtx?.password} onChange={({target}) => dataCtx?.setPassword(target.value)}
            className='bg-red-300 border border-sky-200 
            outline-none rounded-md bg-transparent py-1 px-2 text-white'/> 
            <label htmlFor="Confirmsenha" className='text-white mt-3 text-sm'>Confirme sua Senha:</label>
            <input type="password" id='Confirmsenha' value={confirmSenha} onChange={({target}) => setConfirmSenha(target.value)}
            className='bg-red-300 border border-sky-200
            outline-none rounded-md bg-transparent py-1 px-2 text-white'/>
            {dataCtx?.password === confirmSenha ? null : <span className='text-red-800 font-bold text-sm'>As duas senhas devem ser iguais</span>}
            <div className='mt-3 flex gap-1 items-center justify-center'>
              <label htmlFor="cep" className='text-white mt-3 text-sm'>CEP:</label>
              <input type="number" id='cep' placeholder='Somente numeros'
              className='bg-red-300 border border-sky-200 
              outline-none rounded-md bg-transparent py-1 px-2 
              text-white w-[50%] mt-3 placeholder:text-sm placeholder:text-[#ccc]' value={cep} onChange={({target}) => setCep(target.value)} />
              <button onClick={preecherEndereco}
              className='text-sm flex mt-3 ml-1 px-3 py-2 rounded-md text-white bg-sky-700'
              >Buscar CEP
              </button>
            </div>
              <span className='mt-1 ml-2 decoration-slice'>
                <a href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blank"
                className='text-sm text-white'
                >Não sei meu CEP
                </a>
              </span>
              { erroCep === true ? <span className='text-red-800 font-bold text-sm'>Insira um Cep Válido</span> : null}
            <label htmlFor="rua" className='text-white mt-3 text-sm'>Rua:</label>
            <input type="text" id='rua'
            className='bg-red-300 border border-sky-200 
            outline-none rounded-md bg-transparent py-1 px-2 text-white' value={logradouro} onChange={({target}) => setLogradouro(target.value)}/>
            <div className='flex items-center justify-center mt-3'>
              <div className='flex flex-col'>
              <label htmlFor="numero" className='text-white text-sm'>Número:</label>
              <input type="number" id='numero' value={numero} onChange={({target}) => setNumero(target.value)}
              className='bg-red-300 border border-sky-200
              outline-none rounded-md bg-transparent py-1 px-2 text-white w-[85%]'/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="complemento" className='text-white text-sm'>Complemento:</label>
              <input type="text" id='complemento'
              className='bg-red-300 border border-sky-200 
              outline-none rounded-md bg-transparent py-1 px-2 text-white flex-1'/>
              </div>
            </div>
            <label htmlFor="bairro" className='text-white mt-3 text-sm'>Bairro:</label>
            <input type="text" id='bairro' value={bairro} onChange={({target}) => setBairro(target.value)}
            className='bg-red-300 border border-sky-200 
            outline-none rounded-md bg-transparent py-1 px-2 text-white'/>
            <label htmlFor="cidade" className='text-white mt-3 text-sm'>Cidade:</label>
            <input type="text" id='cidade' value={cidade} onChange={({target}) => setCidade(target.value)}
            className='bg-red-300 border border-sky-200 
            outline-none rounded-md bg-transparent py-1 
            px-2 text-white'/>
            <label htmlFor="estado" 
            className='text-white mt-3 text-sm'>Estado:</label>
            <select name="estado" id="estado" value={estado} onChange={({target}) => setEstado(target.value)}>
              {estadosBrasil.map((estado) => (
                <option
                value={estado.value} 
                key={estado.value}>{estado.value} {estado.label}</option>
              ))}
            </select>
            <button className='text-sm mt-5 py-2 w-[50%] self-center rounded-md text-white bg-sky-700' onClick={cadastrarUsuario}>CADASTRAR-SE</button>
        </form> : <div className='flex flex-col w-full justify-center items-center gap-3'>
              <span>Cadastro Criado</span>
              <button onClick={criarNovoUsuario} className='border py-2 px-4 rounded-md bg-sky-600 text-white opacity-80 hover:opacity-100'>Criar novo Usuário</button>
          </div>}
    </section>
    </div>
  );
}

export default FormularioRegistrar;
