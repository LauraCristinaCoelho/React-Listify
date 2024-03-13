import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import People from "../../assets/people.svg";
import Arrow from "../../assets/arrow.svg";
import H1 from "../../components/Title";
import ContainerItems from "../../components/ContainerItems";
import Button from "../../components/Button";
import { Container, Image, InputLabel, Input } from "./styles";

function App() {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const inputName = useRef();
  const inputAge = useRef();

  async function addNewUser() {
    const { data: newUser } = await axios.post("http://localhost:3001/users", {
      name: inputName.current.value,
      age: inputAge.current.value
    });

    setUsers([...users, newUser]);

    history.push('/usuarios')
  };

  return (
    <Container>
      <Image src={People} alt="logo-imagem" />
      <ContainerItems>
        <H1>Olá!</H1>
        <InputLabel>Nome</InputLabel>
        <Input ref={inputName} placeholder="Nome" />
        <InputLabel>Idade</InputLabel>

        <Input ref={inputAge} placeholder="Idade" />
        <Button onClick={addNewUser}>
          Cadastrar<img src={Arrow} alt="seta" />
        </Button>
      </ContainerItems>
    </Container>
  );
}

export default App