// email.jsx

import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
} from "@react-email/components";

const Email = ({ email, password }) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Has caído en una trampa, ten más cuidado</Preview>
      <Body>
        <Container style={container}>
          <Section>
            <Img style={img} src="../images/robo.jpg" />
            <Hr />
            <Text style={text}>
              Hola, este correo es para informate que a través del del engaño,
              se han podido robar tus datos para ingresar a la plataforma de
              Eminus. Debes tener más cuidado con las páginas a las que entras y
              en quién confias.
            </Text>
            <Hr />
            <Text style={text}>
              Tus credenciales son las siguiente: <br />
              Usuario: {email} <br />
              Contraseña: {password}
            </Text>
            <Hr />
            <Text style={text}>
              No te preocupes, tus contraseñan no se han almacenado en ningún
              lado, solamente se han procesado para poder enviarte este correo,
              tus credenciales siguen siendo seguras, solo no olvides siempre
              tener cuidado sobre en que páginas ingresas.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const text = {
  color: "#black",
  fontSize: "12px",
};

const img = {
  width: "100%",
  height: "auto",
  marginBottom: "10px",
  borderRadius: "4px",
};

const container = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  fontFamily: "Arial, sans-serif",
};

export default Email;
