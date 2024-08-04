import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, FormRadio, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

const options = [
    { key: 'pe', text: 'Pernambuco', value: 'Pernambuco' },
    { key: 'rn', text: 'Rio Grande do Norte', value: 'Rio Grande do Norte' },
    { key: 'pb', text: 'Paraíba', value: 'Paraíba' },
];

export default function FormEntregador() {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorPorFrete, setValorPorFrete] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [ativo, setAtivo] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8081/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorPorFrete(response.data.valorPorFrete)
                    setRua(response.data.rua)
                    setNumero(response.data.numero)
                    setBairro(response.data.bairro)
                    setCidade(response.data.cidade)
                    setCep(response.data.cep)
                    setUf(response.data.uf)
                    setComplemento(response.data.complemento)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state]);

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function salvar() {
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorPorFrete: valorPorFrete,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            uf: uf,
            complemento: complemento,
            ativo: ativo
        }
        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8081/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { console.log('Entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8081/api/entregador", entregadorRequest)
                .then((response) => { console.log('Entregador cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }

    }

    return (

        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    { idEntregador === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idEntregador !== undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    width={10}
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={5}>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='RG'
                                    value={rg}
                                    width={5}
                                    onChange={e => setRg(e.target.value)}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={6}>
                                    <InputMask
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6}
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}>
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}
                                    value={valorPorFrete}
                                    onChange={e => setValorPorFrete(e.target.value)}>
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Rua'
                                    width={12}
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={5}
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}>
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={9}
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={9}
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={3}>
                                    <InputMask
                                        mask="99999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}/>
                                </Form.Input>
                            </Form.Group>

                            <Form.Select
                                fluid
                                label='UF'
                                width={50}
                                options={options}
                                placeholder="Selecione"
                                value={uf}
                                onChange={(e, { value }) => {
                                    setUf(value)
                                }}
                            />
                            <Form.Input
                                fluid
                                label='Complemento'
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}>
                            </Form.Input>

                            <Form.Group>
                                <label>Ativo</label>
                                <FormRadio
                                    label='Sim'
                                    checked={ativo}
                                    onChange={e => setAtivo(true)}
                                />
                                <FormRadio
                                    label='Não'
                                    checked={!ativo}
                                    onChange={e => setAtivo(false)}
                                />
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: "4%" }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="orange"
                            >
                                <Icon name="reply" />
                                <Link to={'/list-entregador'}>Voltar</Link>
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
