import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { mensagemErro, notifyError, notifySuccess } from "../util/util";

export default function FormEmpresa() {
  const { state } = useLocation();
  const [idEmpresa, setIdEmpresa] = useState();
  const [site, setSite] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [nomeEmpresarial, setNomeEmpresarial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [fone, setFone] = useState("");
  const [foneAlternativo, setFoneAlternativo] = useState("");

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8081/api/empresa/" + state.id)
        .then((response) => {
          setIdEmpresa(response.data.id);
          setSite(response.data.site);
          setCnpj(response.data.cnpj);
          setInscricaoEstadual(response.data.inscricaoEstadual);
          setNomeEmpresarial(response.data.nomeEmpresarial);
          setNomeFantasia(response.data.nomeFantasia);
          setFone(response.data.fone);
          setFoneAlternativo(response.data.foneAlternativo);
        });
    }
  }, [state]);

  function salvar() {
    let empresaRequest = {
      site: site,
      cnpj: cnpj,
      inscricaoEstadual: inscricaoEstadual,
      nomeEmpresarial: nomeEmpresarial,
      nomeFantasia: nomeFantasia,
      fone: fone,
      foneAlternativo: foneAlternativo,
    };

    if (idEmpresa != null) {
      // Alteração:
      axios
        .put("http://localhost:8081/api/empresa/" + idEmpresa, empresaRequest)
        .then((response) => {
          notifySuccess("Empresa alterada com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao alterar a empresa.");
        });
    } else {
      // Cadastro:
      axios
        .post("http://localhost:8081/api/empresa", empresaRequest)
        .then((response) => {
          notifySuccess("Empresa cadastrada com sucesso.");
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError(mensagemErro);
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"empresa"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEmpresa === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Empresa &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEmpresa !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Empresa &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome Empresarial"
                  maxLength="100"
                  value={nomeEmpresarial}
                  onChange={(e) => setNomeEmpresarial(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Nome Fantasia"
                  maxLength="100"
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input required fluid label="CNPJ">
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="Inscrição Estadual">
                  <InputMask
                    mask="999.999.999.999"
                    value={inscricaoEstadual}
                    onChange={(e) => setInscricaoEstadual(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="Fone" width={6}>
                  <InputMask
                    mask="(99)99999.9999"
                    value={fone}
                    onChange={(e) => setFone(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Alternativo" width={6}>
                  <InputMask
                    mask="(99)99999.9999"
                    value={foneAlternativo}
                    onChange={(e) => setFoneAlternativo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Input
                fluid
                label="Site"
                maxLength="100"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
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
                <Link to={"/list-empresa"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
