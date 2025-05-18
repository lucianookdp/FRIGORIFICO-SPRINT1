import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import "../styles/Chatbot.css";

const Chatbot = () => {
    const [aberto, setAberto] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [historico, setHistorico] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [bloqueado, setBloqueado] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(null);

    const LIMITE_PERGUNTAS = 10;
    const TEMPO_BLOQUEIO_MINUTOS = 60;

    const formatarTempo = (totalSegundos) => {
        const h = Math.floor(totalSegundos / 3600);
        const m = Math.floor((totalSegundos % 3600) / 60);
        const s = totalSegundos % 60;
        const pad = (v) => v.toString().padStart(2, "0");

        return h > 0
            ? `${pad(h)}:${pad(m)}:${pad(s)}`
            : `${pad(m)}:${pad(s)}`;
    };

    const iniciarContador = (segundosIniciais) => {
        let tempo = segundosIniciais || TEMPO_BLOQUEIO_MINUTOS * 60;
        setTempoRestante(tempo);
        localStorage.setItem("chatbotTempoRestante", tempo.toString());

        const intervalo = setInterval(() => {
            tempo -= 1;
            setTempoRestante(tempo);
            localStorage.setItem("chatbotTempoRestante", tempo.toString());

            if (tempo <= 0) {
                clearInterval(intervalo);
                setBloqueado(false);
                setTempoRestante(null);
                setHistorico([]);
                localStorage.removeItem("chatbotContador");
                localStorage.removeItem("chatbotBloqueado");
                localStorage.removeItem("chatbotHistorico");
                localStorage.removeItem("chatbotTempoRestante");
            }
        }, 1000);
    };

    useEffect(() => {
        const salvo = localStorage.getItem("chatbotHistorico");
        if (salvo) setHistorico(JSON.parse(salvo));
    }, []);

    useEffect(() => {
        if (historico.length > 0) {
            localStorage.setItem("chatbotHistorico", JSON.stringify(historico));
        }
    }, [historico]);

    useEffect(() => {
        const bloqueio = localStorage.getItem("chatbotBloqueado");
        const tempoSalvo = localStorage.getItem("chatbotTempoRestante");

        if (bloqueio) {
            const dataBloqueio = new Date(bloqueio);
            const agora = new Date();
            const diffMs = agora - dataBloqueio;
            const limiteMs = TEMPO_BLOQUEIO_MINUTOS * 60 * 1000;

            if (diffMs < limiteMs) {
                setBloqueado(true);

                const restanteCalculado = Math.ceil((limiteMs - diffMs) / 1000);
                const restante = tempoSalvo ? Math.min(parseInt(tempoSalvo), restanteCalculado) : restanteCalculado;

                iniciarContador(restante);
            } else {
                localStorage.removeItem("chatbotContador");
                localStorage.removeItem("chatbotBloqueado");
                localStorage.removeItem("chatbotTempoRestante");
            }
        }
    }, []);

    useEffect(() => {
        if (aberto && historico.length === 0) {
            setHistorico([
                {
                    de: "bot",
                    texto:
                        "Olá! Sou seu assistente virtual. Você pode enviar até 10 perguntas. Após isso, será necessário aguardar um tempo."
                }
            ]);
        }
    }, [aberto, historico.length]);

    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;

        const contadorAtual = parseInt(localStorage.getItem("chatbotContador") || "0");
        if (contadorAtual >= LIMITE_PERGUNTAS) {
            setHistorico((prev) => [
                ...prev,
                {
                    de: "bot",
                    texto: "Você atingiu o limite de 10 perguntas. Aguarde 1 hora para continuar."
                }
            ]);
            setBloqueado(true);
            localStorage.setItem("chatbotBloqueado", new Date().toISOString());
            iniciarContador();
            return;
        }

        const novaPergunta = { de: "usuário", texto: mensagem };
        const novoHistorico = [...historico, novaPergunta];
        setHistorico(novoHistorico);
        setMensagem("");
        setCarregando(true);
        localStorage.setItem("chatbotContador", (contadorAtual + 1).toString());

        try {
            const resposta = await fetch("https://backendfrigorifico-production.up.railway.app/api/openai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pergunta: mensagem,
                    historico: novoHistorico
                        .filter((m) => m.de === "usuário" || m.de === "bot")
                        .slice(-10)
                        .map((m) => ({
                            role: m.de === "usuário" ? "user" : "assistant",
                            content: m.texto
                        }))
                })
            });

            const dados = await resposta.json();
            const respostaIA = { de: "bot", texto: dados.resposta || "Erro ao responder." };
            setHistorico((prev) => [...prev, respostaIA]);
        } catch (erro) {
            setHistorico((prev) => [
                ...prev,
                { de: "bot", texto: "Erro na conexão com o servidor. Tente novamente mais tarde." }
            ]);
        } finally {
            setCarregando(false);
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") enviarMensagem();
    };

    return (
        <>
            <div className="chatbot-botao" onClick={() => setAberto(!aberto)}>
                {aberto ? "✖" : (
                    <div className="chatbot-botao-conteudo">
                        <FaChevronUp className="seta-icone" />
                        <span>Fale com a gente</span>
                    </div>
                )}
            </div>

            {aberto && (
                <div className="chatbot-janela">
                    <div className="chatbot-cabecalho">Assistente Virtual - Frigorífico Padilha</div>

                    {bloqueado && tempoRestante !== null && (
                        <div className="chatbot-contador-bloqueio">
                            <p>Você atingiu o limite de uso.<br />Tente novamente em:</p>
                            <strong>{formatarTempo(tempoRestante)}</strong>
                        </div>

                    )}

                    <div className="chatbot-conversa">
                        {historico.map((msg, i) => (
                            <div key={i} className={`msg-wrapper ${msg.de}`}>
                                {msg.de === "bot" && (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                                        alt="Robô"
                                        className="chatbot-avatar"
                                    />
                                )}
                                <div className={`msg ${msg.de}`}>{msg.texto}</div>
                            </div>
                        ))}
                        {carregando && (
                            <div className="msg-wrapper bot">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                                    alt="Robô"
                                    className="chatbot-avatar"
                                />
                                <div className="msg bot">Digitando...</div>
                            </div>
                        )}
                    </div>

                    <div className="chatbot-entrada">
                        <input
                            type="text"
                            placeholder="Digite sua dúvida..."
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            onKeyDown={handleEnter}
                            disabled={bloqueado}
                        />
                        <button onClick={enviarMensagem} disabled={bloqueado}>
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
