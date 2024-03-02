import React from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormProduto() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
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
                  label="Titulo"
                  maxLength="100"
                  style={{ width: "610px" }}
                  placeholder="Informe o título do produto"
                ></Form.Input>

                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  style={{ width: "610px" }}
                  placeholder="Informe o código do produto"
                ></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.TextArea
                  fluid
                  label="Descrição"
                  style={{ width: "1230px" }}
                  placeholder="Informe a descrição do produto"
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Valor Unitário"
                  style={{ width: "400px" }}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Enrega Mínimo em Minutos"
                  placeholder="30"
                  style={{ width: "400px" }}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Máxima em Minutos"
                  placeholder="40"
                  style={{ width: "400px" }}
                ></Form.Input>
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
