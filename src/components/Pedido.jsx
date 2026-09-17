import { useState } from "react"

//Array de objetos contendo o estado inicial do cardápio {[]}
const cardapio = [
    {id:1,nome: 'Combo 01', preco:25.00, disponivel:true, quantidade:0},
    {id:2,nome: 'Combo 02', preco:30.00, disponivel:true, quantidade:0},
    {id:3,nome: 'Combo 03', preco:35.00, disponivel:false, quantidade:0},
    {id:4,nome: 'Combo 04', preco:40.00, disponivel:true, quantidade:0},
]



const Pedido = () => {

    //HOOK - useState: manipula o estado da variável
    //Exemplos vai gerenciar a lista de itens do cardápio
    const [items,setItems]=useState(cardapio);
    const [status,setStatus]=useState("");
    const [enviar,setEnviar]=useState(false);

    //valor fixo adicionado ao total quando tiver itens no carrinho
    const taxaEntrega =5.00;

    //função que altera a quantidade do pedido
    const AlterarQuantidade =(id, valor)=>{
        setItems(prev=>
            //Map: percorre a lista para criar um novo array sem modificar o original
            prev.map(item=>
                //ternário: verifica se o item da iteração atual é o que deve ser alterado 
                //spread(...item) : adiciona o item a lista atual ou modifica
                //Math.max - objeto que garante que a quantidade nunca seja menor que 0
                //item: retorna o item intacto caso o id não corresponda
                item.id===id ? {...item,quantidade:Math.max(0,item.quantidade + valor)}:item
            )
        )
    }


    //Filter: seleciona apenas os produtos disponíveis e do carrinho
    const produtoDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    //REDUCE: calcula a soma dos itens (preço * quantidade)
    //e adiciona a taxa de entrega
    const subTotal = carrinho.reduce((ac,item)=> ac + item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega:0;

    //Simulação do ciclo de vida da entrega usando temporizadores assíncronos
    const confimarPedido =()=>{
        setEnviar(true);
        setStatus("Restaurante preparando o seu pedido")
        //Tudo que utiliza de tempo usa setTimeout (EX: após um tempo aparece uma msg)
        setTimeout(()=>{
            setStatus("Seu pedido saiu para entrega!");
            setEnviar(false);
        },5000)
        setTimeout(()=>{
            setStatus("Seu pedido foi entregue com sucesso!");
            setEnviar(false);
        },10000)//10 segundos

    }


  return (
    <>
      <div>
        <h1>Cardápio do Restaurante</h1>
        {produtoDisponiveis.map(produto => (
            <div key={produto.id}>
                <span>{produto.nome}(R${produto.preco.toFixed(2)})</span>
                <div>
                    <button onClick={()=>{AlterarQuantidade(produto.id, -1)}}>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={()=>{AlterarQuantidade(produto.id, +1)}}>+</button>
                </div>
            </div>
        ))}

        <hr>
        </hr>
        <h3>Resumo da entrega</h3>
        {carrinho.length === 0 ?(
            <p>Seu carrinho está vazio</p>
        ):(
            <>
            <ul>
                {carrinho.map(item =>(
                    <li key={item.id}>
                        {item.quantidade} X {item.nome} -R$ {(item.quantidade * item.preco).toFixed(2)}
                    </li>
                ))}
            </ul>

            <p>Subtotal R${subTotal.toFixed(2)}</p>
            <p>Taxa de entrega: R${taxaEntrega.toFixed(2)}</p>
            <p>Total R${total.toFixed(2)}</p>

            <button onClick={confimarPedido} disabled={enviar}>
                {enviar ?"Enviando...":"confirmar Pedido"}
            </button>
            </>
        )}
        {status && (
            <div> 
                <strong>Alerta:</strong> {status}
            </div>
        )}
      </div>
    </>
  )
}

export default Pedido
