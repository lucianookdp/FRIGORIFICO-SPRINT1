import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filtros from "../components/Filtros";
import { FiShoppingCart, FiRefreshCcw } from "react-icons/fi";
import api, { API_BASE } from "../api/api";
import "../styles/Orcamento.css";

const Orcamento = () => {
    const [produtos, setProdutos] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [baseFrigorifico, setBaseFrigorifico] = useState([]);
    const [baseAcougue, setBaseAcougue] = useState([]);
    const [filtroFrigorifico, setFiltroFrigorifico] = useState([]);
    const [filtroAcougue, setFiltroAcougue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [carrinho, setCarrinho] = useState([]);
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
    const [empresaSelecionada, setEmpresaSelecionada] = useState("");
    const [formulario, setFormulario] = useState({ nome: "", uf: "", cidade: "", email: "" });
    const [formularioEnviado, setFormularioEnviado] = useState(false);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [mensagem, setMensagem] = useState("");


    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            .then(res => res.json())
            .then(data => setEstados(data));
    }, []);

    useEffect(() => {
        if (formulario.uf) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formulario.uf}/municipios`)
                .then(res => res.json())
                .then(data => setCidades(data));
        } else {
            setCidades([]);
        }
    }, [formulario.uf]);

    useEffect(() => {
        let cancelado = false;

        const carregarProdutos = async () => {
            setLoading(true);
            try {
                const [resDestaques, resTodos] = await Promise.all([
                    api.get("/produtos/destaques"),
                    api.get("/produtos"),
                ]);

                if (cancelado) return;

                const todos = resTodos.data;
                const frigorifico = todos.filter((p) => p.local === "Frigorifico");
                const acougue = todos.filter((p) => p.local === "Acougue");

                setProdutos(todos);
                setDestaques(resDestaques.data);
                setBaseFrigorifico(frigorifico);
                setFiltroFrigorifico(frigorifico);
                setBaseAcougue(acougue);
                setFiltroAcougue(acougue);

                setTimeout(() => {
                    if (!cancelado) setLoading(false);
                }, 400);
            } catch (error) {
                if (!cancelado) {
                    console.error("Erro ao carregar produtos:", error);
                    setLoading(false);
                }
            }
        };

        carregarProdutos();
        return () => {
            cancelado = true;
        };
    }, []);

    const adicionarAoCarrinho = (produto) => {
        if (!empresaSelecionada) {
            setEmpresaSelecionada(produto.local);
        }
        if (produto.local !== empresaSelecionada) return;

        setCarrinho((anterior) => {
            const existente = anterior.find((p) => p.id === produto.id);
            let novaLista;
            if (existente) {
                novaLista = anterior.map((p) =>
                    p.id === produto.id ? { ...p, quantidade: Number(p.quantidade) + 1 } : p
                );
            } else {
                novaLista = [...anterior, { ...produto, quantidade: 1 }];
            }

            // Mostra a mensagem temporária
            setMensagem(`✔ Produto "${produto.titulo}" adicionado ao carrinho`);
            setTimeout(() => setMensagem(""), 3000); // Esconde após 3 segundos

            return novaLista;
        });
    };


    const removerDoCarrinho = (id) => {
        const atualizado = carrinho.filter((p) => p.id !== id);
        setCarrinho(atualizado);
        if (atualizado.length === 0) setEmpresaSelecionada("");
    };

    const atualizarQuantidade = (id, qtd) => {
        const quantidade = parseFloat(qtd);
        if (!isNaN(quantidade) && quantidade > 0) {
            setCarrinho((anterior) =>
                anterior.map((p) => (p.id === id ? { ...p, quantidade } : p))
            );
        }
    };

    const valorTotal = carrinho.reduce(
        (soma, p) => soma + Number(p.valorKg) * Number(p.quantidade),
        0
    ).toFixed(2);

    const enviarOrcamento = () => {
        if (!formulario.nome || !formulario.uf || !formulario.cidade || !formulario.email) {
            alert("Preencha todos os campos do formulário.");
            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email);
        if (!emailValido) {
            alert("Digite um email válido.");
            return;
        }

        setFormularioEnviado(true);
    };

    const finalizarOrcamento = async () => {
        const payload = {
            nome: formulario.nome,
            local: `${formulario.cidade} - ${formulario.uf}`,
            email: formulario.email,
            empresa: empresaSelecionada,
            produtos: carrinho.map((p) => ({
                id: p.id,
                quantidade: p.quantidade,
                valorKg: p.valorKg,
                local: p.local,
            })),
        };
        try {
            await api.post("/orcamentos", payload);

            const telefone =
                empresaSelecionada === "Frigorifico"
                    ? "554299388528"
                    : "554299061788";

            const produtosTexto = carrinho
                .map(
                    (p) =>
                        `• ${p.titulo}\n   Quantidade: ${p.quantidade}kg\n   Valor unitário: R$ ${Number(p.valorKg).toFixed(2)}`
                )
                .join("\n\n");

            const textoClaro = `Olá! Vim pelo site e desejo solicitar um orçamento.\n
📍 *Dados do Cliente*
Nome: ${formulario.nome}
Cidade: ${formulario.cidade} - ${formulario.uf}

🛒 *Produtos Selecionados*
${produtosTexto}

💰 *Total Geral*: R$ ${valorTotal}`;

            const texto = encodeURIComponent(textoClaro);

            window.open(
                `https://api.whatsapp.com/send?phone=${telefone}&text=${texto}`,
                "_blank"
            );
        } catch (err) {
            console.error("Erro ao enviar orçamento:", err);
            alert("Erro ao enviar o orçamento.");
        }

    };
    const renderFormulario = () => (
        <div className="formulario-orcamento">
            <h3>Preencha seus dados</h3>
            <input
                type="text"
                placeholder="Nome completo ou empresa"
                value={formulario.nome}
                onChange={(e) => {
                    const regex = /^[A-Za-zÀ-ú ]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                        setFormulario({ ...formulario, nome: e.target.value });
                    }
                }}
            />

            <select value={formulario.uf} onChange={(e) => setFormulario({ ...formulario, uf: e.target.value, cidade: "" })}>
                <option value="">Selecione o estado</option>
                {estados.map((estado) => (
                    <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                ))}
            </select>

            <select value={formulario.cidade} onChange={(e) => setFormulario({ ...formulario, cidade: e.target.value })}>
                <option value="">Selecione a cidade</option>
                {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                ))}
            </select>

            <input
                type="email"
                placeholder="Email"
                value={formulario.email}
                onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
            />
            <button onClick={enviarOrcamento}>Salvar e visualizar orçamento</button>
        </div>
    );
    const renderCarrinho = () => (
        <div className={`carrinho-popup ${mostrarCarrinho ? "ativo" : ""}`}>
            <button
                className="btn-fechar-carrinho"
                onClick={() => setMostrarCarrinho(false)}
                title="Fechar"
            >
                ×
            </button>

            <div className="carrinho-header">
                <h3>Itens do Orçamento ({empresaSelecionada})</h3>
                <button onClick={() => window.location.reload()} title="Recarregar">
                    <FiRefreshCcw size={20} />
                </button>
            </div>

            {carrinho.map((p) => (
                <div key={p.id} className="item-carrinho">
                    <span>{p.titulo}</span>
                    <input
                        type="number"
                        min="1"
                        value={p.quantidade}
                        onChange={(e) => atualizarQuantidade(p.id, e.target.value)}
                    />
                    <button onClick={() => removerDoCarrinho(p.id)}>Remover</button>
                </div>
            ))}

            {!formularioEnviado ? (
                renderFormulario()
            ) : (
                <div className="formulario-orcamento">
                    <h3>Resumo do orçamento</h3>
                    <p><strong>Cliente:</strong> {formulario.nome}</p>
                    <p><strong>Cidade:</strong> {formulario.cidade} - {formulario.uf}</p>
                    <p><strong>Email:</strong> {formulario.email}</p>
                    <p className="total">Total: R$ {valorTotal}</p>
                    <button onClick={finalizarOrcamento}>Enviar orçamento via WhatsApp</button>
                </div>
            )}
        </div>
    );


    const renderProduto = (produto) => {
        const desabilitado = empresaSelecionada && produto.local !== empresaSelecionada;
        return (
            <div key={produto.id} className={`card-produto ${desabilitado ? "desabilitado" : ""}`}>
                <img src={`${API_BASE}${produto.foto}`} />
                <h4>{produto.titulo}</h4>
                <p>{produto.descricao}</p>
                <span>{Number(produto.valorKg).toFixed(2)} R$/kg</span>
                <button
                    disabled={desabilitado}
                    onClick={() => adicionarAoCarrinho(produto)}
                >
                    Adicionar
                </button>
            </div>

        );
    };

    return (
        <div>
            <Header />

            {mensagem && (
                <div className="notificacao-carrinho">
                    {mensagem}
                </div>
            )}
            <section className="catalogo">
                <button
                    className="btn-carrinho-flutuante"
                    onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
                    title="Ver orçamento"
                >
                    <div className="icone-com-texto">
                        <FiShoppingCart size={32} />
                        <span className="texto-carrinho">Carrinho</span>

                        {carrinho.length > 0 && (
                            <span className="contador-carrinho">{carrinho.length}</span>
                        )}
                    </div>
                </button>



                {loading ? (
                    <div className="carregando">
                        <p>Carregando orçamento...</p>
                    </div>
                ) : (
                    <>
                        <h2>Produtos em Destaque</h2>
                        <div className="produtos-grid">
                            {destaques.length > 0 ? (
                                destaques.map(renderProduto)
                            ) : (
                                <p style={{ marginTop: "20px", color: "#666" }}>
                                    Nenhum produto em destaque no momento.
                                </p>
                            )}
                        </div>

                        <h2>Frigorífico</h2>
                        <div className="linha-filtros">
                            <Filtros produtos={baseFrigorifico} onFiltroAtualizado={setFiltroFrigorifico} classeExtra="filtros-catalogo" />
                        </div>
                        <div className="produtos-grid">
                            {filtroFrigorifico.length > 0 ? (
                                filtroFrigorifico.map(renderProduto)
                            ) : (
                                <p style={{ marginTop: "20px", color: "#666" }}>
                                    Nenhum produto do frigorífico encontrado.
                                </p>
                            )}
                        </div>

                        <h2>Açougue</h2>
                        <div className="linha-filtros">
                            <Filtros produtos={baseAcougue} onFiltroAtualizado={setFiltroAcougue} classeExtra="filtros-catalogo" />
                        </div>
                        <div className="produtos-grid">
                            {filtroAcougue.length > 0 ? (
                                filtroAcougue.map(renderProduto)
                            ) : (
                                <p style={{ marginTop: "20px", color: "#666" }}>
                                    Nenhum produto do açougue encontrado.
                                </p>
                            )}
                        </div>
                    </>
                )}
                {mostrarCarrinho && carrinho.length > 0 && renderCarrinho()}
            </section>
            <Footer />
        </div>
    );
};

export default Orcamento;
