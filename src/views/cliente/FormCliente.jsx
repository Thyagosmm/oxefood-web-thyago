import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

const EnderecoField = ({ endereco, onChange, onRemove }) => (
    <div style={{ marginBottom: '20px' }}>
        <Form.Group widths='equal'>
            <Form.Input
                fluid
                label='Rua'
                placeholder='Digite a rua'
                value={endereco.rua}
                onChange={e => onChange('rua', e.target.value)}
            />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Input
                fluid
                label='Número'
                placeholder='Digite o número'
                value={endereco.numero}
                onChange={e => onChange('numero', e.target.value)}
            />
            <Form.Input
                fluid
                label='Bairro'
                placeholder='Digite o bairro'
                value={endereco.bairro}
                onChange={e => onChange('bairro', e.target.value)}
            />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Input
                fluid
                label='CEP'
                placeholder='Digite o CEP'
                value={endereco.cep}
                onChange={e => onChange('cep', e.target.value)}
            />
            <Form.Input
                fluid
                label='Cidade'
                placeholder='Digite a cidade'
                value={endereco.cidade}
                onChange={e => onChange('cidade', e.target.value)}
            />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Input
                fluid
                label='Estado'
                placeholder='Digite o estado'
                value={endereco.estado}
                onChange={e => onChange('estado', e.target.value)}
            />
            <Form.Input
                fluid
                label='Complemento'
                placeholder='Digite o complemento'
                value={endereco.complemento}
                onChange={e => onChange('complemento', e.target.value)}
            />
        </Form.Group>
        <Button
            type="button"
            color='red'
            icon
            labelPosition='left'
            onClick={onRemove}
        >
            <Icon name='minus' />
            Remover Endereço
        </Button>
    </div>
);

export default function FormCliente() {
    const { state } = useLocation();
    const [idCliente, setIdCliente] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [enderecos, setEnderecos] = useState([]);

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8081/api/cliente/" + state.id)
                .then((response) => {
                    setIdCliente(response.data.id);
                    setNome(response.data.nome);
                    setCpf(response.data.cpf);
                    setDataNascimento(formatarData(response.data.dataNascimento));
                    setFoneCelular(response.data.foneCelular);
                    setFoneFixo(response.data.foneFixo);
                    setEnderecos(response.data.enderecos || []);
                });
        }
    }, [state]);

    function formatarData(dataParam) {
        if (!dataParam) return '';
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function salvar() {
        let clienteRequest = {
            nome,
            cpf,
            dataNascimento,
            foneCelular,
            foneFixo,
            enderecos
        };
    
        console.log('ClienteRequest:', clienteRequest); // Adicione esta linha para depuração
    
        if (idCliente) { // Alteração
            axios.put("http://localhost:8081/api/cliente/" + idCliente, clienteRequest)
                .then(() => { console.log('Cliente alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar cliente:', error) });
        } else { // Cadastro
            axios.post("http://localhost:8081/api/cliente", clienteRequest)
                .then(() => { console.log('Cliente cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o cliente:', error) });
        }
    }
    

    function adicionarEndereco() {
        setEnderecos([...enderecos, { rua: '', numero: '', bairro: '', cep: '', cidade: '', estado: '', complemento: '' }]);
    }

    function atualizarEndereco(index, campo, valor) {
        const novosEnderecos = [...enderecos];
        novosEnderecos[index][campo] = valor;
        setEnderecos(novosEnderecos);
    }

    function removerEndereco(index) {
        const novosEnderecos = enderecos.filter((_, i) => i !== index);
        setEnderecos(novosEnderecos);
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idCliente === undefined
                        ? <h2><span style={{ color: 'darkgray' }}>Cliente &nbsp;<Icon name='angle double right' size="small" /></span> Cadastro</h2>
                        : <h2><span style={{ color: 'darkgray' }}>Cliente &nbsp;<Icon name='angle double right' size="small" /></span> Alteração</h2>}
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            {enderecos.map((endereco, index) => (
                                <EnderecoField
                                    key={index}
                                    endereco={endereco}
                                    onChange={(campo, valor) => atualizarEndereco(index, campo, valor)}
                                    onRemove={() => removerEndereco(index)}
                                />
                            ))}
                            <Button
                                type="button"
                                color='green'
                                icon
                                labelPosition='left'
                                onClick={adicionarEndereco}
                            >
                                <Icon name='plus' />
                                Adicionar Endereço
                            </Button>
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
                                <Link to={'/list-cliente'}>Voltar</Link>
                            </Button>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={salvar}
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