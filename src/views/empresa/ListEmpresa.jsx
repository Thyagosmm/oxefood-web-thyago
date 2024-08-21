import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Table,
  Menu,
  Form,
  Segment,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListEmpresa() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [menuFiltro, setMenuFiltro] = useState();
  const [cnpj, setCnpj] = useState();
  const [site, setSite] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8081/api/empresa").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8081/api/empresa/" + idRemover)
      .then(() => {
        console.log("Empresa removida com sucesso.");
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao remover uma empresa.");
      });
    setOpenModal(false);
  }

  function handleMenuFiltro() {
    setMenuFiltro((prevState) => !prevState);
  }

  function handleChangeCnpj(value) {
    filtrarEmpresas(value, site);
  }

  function handleChangeSite(value) {
    filtrarEmpresas(cnpj, value);
  }

  async function filtrarEmpresas(cnpjParam, siteParam) {
    let formData = new FormData();

    if (cnpjParam) {
      setCnpj(cnpjParam);
      formData.append("cnpj", cnpjParam);
    }
    if (siteParam) {
      setSite(siteParam);
      formData.append("site", siteParam);
    }

    await axios
      .post("http://localhost:8081/api/empresa/filtrar", formData)
      .then((response) => {
        setLista(response.data);
      });
  }

  return (
    <div>
      <MenuSistema tela={"empresa"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Empresa </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Menu compact>
              <Menu.Item
                name="menuFiltro"
                active={menuFiltro === true}
                onClick={handleMenuFiltro}
              >
                <Icon name="filter" />
                Filtrar
              </Menu.Item>
            </Menu>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-empresa"
            />
            {menuFiltro && (
              <Segment>
                <Form className="form-filtros">
                  <Form.Group widths="equal">
                    <Form.Input
                      icon="search"
                      label="CNPJ:"
                      placeholder="Filtrar por CNPJ da Empresa"
                      labelPosition="left"
                    >
                      <InputMask
                        mask="99.999.999/9999-99"
                        value={cnpj}
                        onChange={(e) => handleChangeCnpj(e.target.value)}
                      />
                    </Form.Input>
                    <Form.Input
                      icon="search"
                      value={site}
                      onChange={(e) => handleChangeSite(e.target.value)}
                      label="Site:"
                      placeholder="Filtrar por Site da Empresa"
                      labelPosition="left"
                    />
                  </Form.Group>
                </Form>
              </Segment>
            )}

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome Empresarial</Table.HeaderCell>
                  <Table.HeaderCell>CNPJ</Table.HeaderCell>
                  <Table.HeaderCell>Site</Table.HeaderCell>
                  <Table.HeaderCell>Telefone</Table.HeaderCell>
                  <Table.HeaderCell>Telefone Alternativo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((empresa) => (
                  <Table.Row key={empresa.id}>
                    <Table.Cell>{empresa.nomeEmpresarial}</Table.Cell>
                    <Table.Cell>{empresa.cnpj}</Table.Cell>
                    <Table.Cell>{empresa.site}</Table.Cell>
                    <Table.Cell>{empresa.fone}</Table.Cell>
                    <Table.Cell>{empresa.foneAlternativo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados desta empresa"
                        icon
                      >
                        <Link
                          to="/form-empresa"
                          state={{ id: empresa.id }}
                          style={{ color: "green" }}
                        >
                          <Icon name="edit" />
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover esta empresa"
                        icon
                        onClick={() => confirmaRemover(empresa.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            {" "}
            Tem certeza que deseja remover esse registro?{" "}
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
