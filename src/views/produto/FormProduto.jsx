import axios from "axios";
import React, {useState} from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto() {

    const [titulo, setTitulo] = useState();
    const [codigoDoProduto, setCodigoDoProduto] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoDeEntregaMinimoEmMinutos, setTempoDeEntregaMinimoEmMinutos] = useState();
    const [tempoDeEntregaMaximoEmMinutos, setTempoDeEntregaMaximoEmMinutos] = useState();

    function salvar() {
        let produtoRequest = {
            titulo: titulo,
            codigoDoProduto: codigoDoProduto,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoDeEntregaMinimoEmMinutos: tempoDeEntregaMinimoEmMinutos,
            tempoDeEntregaMaximoEmMinutos: tempoDeEntregaMaximoEmMinutos
        }
    
        axios.post("http://localhost:8081/api/produto", produtoRequest)
        .then((response) => {
            console.log('Produto cadastrado com sucesso.')
        })
        .catch((error) => {
            console.log('Erro ao incluir um produto.')
        })
    }
    
    return (

        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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
                                Voltar
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
