import React from "react";
import Axios from "axios";
import { API_TODO } from "../database/API";
import { Button, Form, InputGroup } from "react-bootstrap";
import "../CSS/todo_item.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // validasiTodo: [false, ""],
    };
  }
  onGetData = () => {
    Axios.get(`${API_TODO}/aktivitas`).then((res) => {
      return this.setState({ data: res.data }, () => {
        // console.log(this.state.data);
      });
    });
  };
  componentDidMount() {
    this.onGetData();
    // console.log(this.state.data);
  }
  onAdd = () => {
    let newTodo = this.refs.todoLists.value;

    let obj = {
      aktivitas: newTodo,
      keterangan: false,
    };
    if (newTodo === "") {
      alert("tolong isi aktivitas anda");
    } else {
      Axios.post(`${API_TODO}/aktivitas`, obj).then((res) => {
        // console.log(res);
        this.refs.todoLists.value = "";
        this.onGetData();
      });
    }
  };

  onDelete = (id) => {
    Axios.delete(`${API_TODO}/aktivitas/${id}`).then((res) => {
      this.onGetData();
    });
  };

  onCekList = (id) => {
    Axios.patch(`${API_TODO}/aktivitas/${id}`, { keterangan: true }).then(
      (res) => {
        this.onGetData();
      }
    );
  };

  render() {
    return (
      <div className="container_todo_item">
        {this.state.data.map((item, index) => {
          return (
            <div className="cart_todo_item" key={index}>
              <div className="cont-item">
                <p>{index + 1}.</p> <p>{item.aktivitas}</p>
              </div>
              <div className="cont-button">
                <Button
                  variant={item.keterangan ? "success" : "warning"}
                  onClick={() => this.onCekList(item.id)}
                >
                  {item.keterangan ? "done" : "ceklist"}
                </Button>
                <Button variant="danger" onClick={() => this.onDelete(item.id)}>
                  delete
                </Button>
              </div>
            </div>
          );
        })}
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="input aktivitas disini"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              ref="todoLists"
              // value={this.refs}
            />
            <InputGroup.Text id="basic-addon2" onClick={this.onAdd}>
              input
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default TodoItem;
