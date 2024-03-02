import React, { useState } from "react";
import InputMask from "react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  FormSelect,
  FormRadio,
} from "semantic-ui-react";

export default function FormProduto() {
  const [value, setValue] = useState(null);
  const handleChange = (e, { value }) => setValue(value);
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  style={{ width: "700px" }}
                ></Form.Input>

                <Form.Input
                  required
                  fluid
                  label="CPF"
                  style={{ width: "250px" }}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="RG"
                  style={{ width: "250px" }}
                ></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="DT Nascimento"
                  style={{ width: "235px" }}
                >
                  <InputMask placeholder="Ex: 20/03/1985" />
                </Form.Input>

                <Form.Input
                  required
                  fluid
                  label="Fone Celular"
                  style={{ width: "235px" }}
                >
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" style={{ width: "235px" }}>
                  <InputMask />
                </Form.Input>
                <Form.Input
                  fluid
                  label="QTD Entregas Realizadas"
                  style={{ width: "235px" }}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Valor Por Frete"
                  style={{ width: "235px" }}
                ></Form.Input>
              </Form.Group>

              <Form.Group width="equals">
                <Form.Input
                  required
                  fluid
                  label="Rua"
                  style={{ width: "910px" }}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Número"
                  style={{ width: "310px" }}
                ></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Bairro"
                  style={{ width: "600px" }}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Cidade"
                  style={{ width: "400px" }}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="CEP"
                  style={{ width: "200px" }}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <FormSelect
                  fluid
                  label="UF"
                  options={[
                    { key: "PB", text: "Paraíba", value: "PB" },
                    { key: "PE", text: "Pernambuco", value: "PE" },
                    { key: "RN", text: "Rio Grande do Norte", value: "RN" },
                  ]}
                  placeholder="Selecione"
                  style={{ width: "1230px" }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Complemento"
                  style={{ width: "1230px" }}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Field style={{ display: "flex", flexDirection: "row" }}>
                  <span style={{ marginRight: "10px" }}>Ativo:</span>
                  <Form.Radio
                    label="Sim"
                    name="radioGroup"
                    value="sim"
                    checked={value === "sim"}
                    onChange={handleChange}
                  />
                  <span style={{ marginRight: "10px" }}></span>
                  <Form.Radio
                    label="Não"
                    name="radioGroup"
                    value="nao"
                    checked={value === "nao"}
                    onChange={handleChange}
                  />
                </Form.Field>
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
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
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
