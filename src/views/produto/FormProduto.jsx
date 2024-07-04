import axios from "axios";
import React, { useEffect,useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState();
    const [codigoDoProduto, setCodigoDoProduto] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoDeEntregaMinimoEmMinutos, setTempoDeEntregaMinimoEmMinutos] = useState();
    const [tempoDeEntregaMaximoEmMinutos, setTempoDeEntregaMaximoEmMinutos] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8081/api/produto/" + state.id)
                .then((response) => {
                    setIdProduto(response.data.id);
                    setTitulo(response.data.titulo);
                    setCodigoDoProduto(response.data.codigoDoProduto);
                    setDescricao(response.data.descricao);
                    setValorUnitario(response.data.valorUnitario);
                    setTempoDeEntregaMinimoEmMinutos(response.data.tempoDeEntregaMinimoEmMinutos);
                    setTempoDeEntregaMaximoEmMinutos(response.data.tempoDeEntregaMaximoEmMinutos);
                })
        }
    }, [state]);

    function salvar() {
        let produtoRequest = {
            titulo: titulo,
            codigoDoProduto: codigoDoProduto,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoDeEntregaMinimoEmMinutos: tempoDeEntregaMinimoEmMinutos,
            tempoDeEntregaMaximoEmMinutos: tempoDeEntregaMaximoEmMinutos
        }

        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8081/api/produto/" + idProduto, produtoRequest)
            .then((response) => { console.log('Produto alterado com sucesso.') })
            .catch((error) => { console.log('Erro ao alterar um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8081/api/produto", produtoRequest)
            .then((response) => { console.log('Produto cadastrado com sucesso.') })
            .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
 }
 

    return (

        <div>
            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                { idProduto === undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                }
                { idProduto != undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                }
                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100">
                                    <InputMask
                                        placeholder="Informe o título do produto"
                                        value={titulo}
                                        onChange={e => setTitulo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'>
                                    <InputMask
                                        placeholder="Informe o código do produto"
                                        value={codigoDoProduto}
                                        onChange={e => setCodigoDoProduto(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    width={6}>
                                    <InputMask
                                        placeholder="Informe a descrição do produto"
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}>
                                    <InputMask
                                        value={valorUnitario}
                                        onChange={e => setValorUnitario(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Enrega Mínimo em Minutos'
                                    width={6}
                                >
                                    <InputMask
                                        placeholder="30"
                                        value={tempoDeEntregaMinimoEmMinutos}
                                        onChange={e => setTempoDeEntregaMinimoEmMinutos(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máxima em Minutos'
                                    width={6}
                                >
                                    <InputMask
                                        placeholder="40"
                                        value={tempoDeEntregaMaximoEmMinutos}
                                        onChange={e => setTempoDeEntregaMaximoEmMinutos(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
