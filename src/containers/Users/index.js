import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Avatar from "../../assets/avatar.svg";
import Arrow from "../../assets/arrow.svg";
import Trash from "../../assets/trash.svg";
import ContainerItems from "../../components/ContainerItems";
import Button from "../../components/Button";
import { Container, Image, User } from "./styles";
import H1 from "../../components/Title"

function Users() {
  const [users, setUsers] = useState([]);
  const history = useHistory()

  useEffect(() => {

    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users");

      setUsers(newUsers);
    }

    fetchUsers()
  }, [])

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)

    const newUsers = users.filter(user => user.id !== userId);

    setUsers(newUsers);
  };

  function goBackPage() {
    history.push('/')
  }


  return (
    <Container>
      <Image src={Avatar} alt="logo-imagem" />
    <ContainerItems isBlur={true} >
        <H1>Usuários</H1>


        <ul>
          {users.map((user) => (
            <User Key={user.id}>
              <p>{user.name}</p> <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)} ><img src={Trash} alt="lixeira" /></button>
            </User>
          ))}
        </ul>
        <Button isBack={true} onClick={goBackPage}>
          <img src={Arrow} alt="seta" />Voltar
        </Button>
      </ContainerItems>
    </Container>
  );
}

export default Users;